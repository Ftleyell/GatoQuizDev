// src/systems/ShopManager.ts
import { ShopItemJsonData } from '../types/ShopItemData';
import { PlayerData } from '../game/PlayerData';
import { GameManager } from '../game/GameManager';
import '../game/components/ui/shop-popup.ts';
import type { ShopPopup } from '../game/components/ui/shop-popup';
// ---> AÑADIR IMPORT DEL TOOLTIP <---
import type { ShopTooltip } from '../game/components/ui/shop-tooltip';
// ---> FIN AÑADIR IMPORT <---
import type { BlurBackdropComponent } from '../game/components/ui/blur-backdrop';

const SHOP_POPUP_ID = 'shop-popup';

export class ShopManager {
    private items: Map<string, ShopItemJsonData> = new Map();
    private playerData: PlayerData;
    private gameManager: GameManager;
    private shopPopupElement: ShopPopup | null = null;

    private buyRequestListener = (e: Event) => this.handleBuyRequest(e);
    private closeRequestListener = () => this.closeShop();


    constructor(playerData: PlayerData, gameManager: GameManager) {
        this.playerData = playerData;
        this.gameManager = gameManager;
    }

    public init(itemJsonData: ShopItemJsonData[]): void {
        this.items.clear();
        if (!Array.isArray(itemJsonData)) {
            console.error("ShopManager: Datos de ítems de tienda inválidos."); return;
        }
        itemJsonData.forEach(itemData => {
            if (itemData?.id && typeof itemData.id === 'string') {
                this.items.set(itemData.id, itemData);
            } else { console.warn("ShopManager: Ítem inválido o sin ID.", itemData); }
        });
    }

    public getShopPopupElement(): ShopPopup | null {
        if (!this.shopPopupElement || !document.body.contains(this.shopPopupElement)) {
            this.shopPopupElement = document.getElementById(SHOP_POPUP_ID) as ShopPopup | null;
            if (this.shopPopupElement) {
                // Limpiar listeners existentes antes de añadir nuevos para evitar duplicados
                this.shopPopupElement.removeEventListener('close-requested', this.closeRequestListener);
                this.shopPopupElement.removeEventListener('buy-item-requested', this.buyRequestListener);
                // Añadir listeners
                this.shopPopupElement.addEventListener('close-requested', this.closeRequestListener);
                this.shopPopupElement.addEventListener('buy-item-requested', this.buyRequestListener);
            } else {
                console.error("ShopManager CRITICAL: Componente <shop-popup> con ID 'shop-popup' NO encontrado en el DOM.");
            }
        }
        return this.shopPopupElement;
    }

    public isShopOpen(): boolean {
        const popup = this.getShopPopupElement();
        return popup?.isVisible || false;
    }

    public openShop(): void {
        const popup = this.getShopPopupElement();
        if (!popup) {
            console.error("ShopManager: No se pudo abrir la tienda, el elemento popup no existe.");
            return;
        }

        try {
            popup.items = Array.from(this.items.values());
            popup.playerDataSnapshot = this.playerData; // Pasar la instancia original
            popup.updateTrigger = (popup.updateTrigger || 0) + 1; // Actualizar trigger inicial
            popup.isVisible = true; // Activar visibilidad del popup

            const backdropComponent = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;
            if (backdropComponent) {
                backdropComponent.visible = true;
            } else {
                console.warn("ShopManager: Componente <blur-backdrop-component> no encontrado al abrir la tienda.");
            }

        } catch (error) {
            console.error("[ShopManager] Error estableciendo props o visibilidad en <shop-popup>:", error);
            if (popup) popup.isVisible = false;
            const backdropComponent = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;
             if (backdropComponent) backdropComponent.visible = false;
        }
    }


    public closeShop(): void {
        const popup = this.getShopPopupElement();
        if (!popup || !popup.isVisible) return;

        popup.isVisible = false;

        const backdropComponent = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;
        const explanationIsVisible = this.gameManager.getUIManager()?.isExplanationVisible() ?? false;

        if (backdropComponent && !explanationIsVisible) {
            backdropComponent.visible = false;
        }
    }

    // --- MÉTODO CON LOGS DE DEBUG Y LLAMADA A forceRefresh ---
    public updateShopUI(): void {
        if (!this.playerData) {
            console.warn("[ShopManager] updateShopUI llamado sin playerData.");
            return;
        }
        const popup = this.getShopPopupElement();
        if (popup && popup.isVisible) {

            // ---> LOG AÑADIDO <---
            // Cambia 'comboMultiplierLevel' por la propiedad relevante si pruebas otra mejora
            const currentLevel = this.playerData.comboMultiplierLevel; // Ejemplo
            console.log(`[ShopManager DEBUG] updateShopUI: PlayerData level ANTES de pasar: ${currentLevel}`);
            // ---> FIN LOG <---

            // Usar la versión con trigger (más fiable con objetos mutables)
            popup.playerDataSnapshot = this.playerData;
            popup.updateTrigger = (popup.updateTrigger || 0) + 1;

            // ---> LOG AÑADIDO <---
            console.log(`[ShopManager DEBUG] updateShopUI: Snapshot asignado, trigger incrementado a ${popup.updateTrigger}. Intentando forzar refresh del tooltip...`);
            // ---> FIN LOG <---

            // Intentamos forzar refresh directamente en el tooltip como último recurso
            // Esperamos un microtask para dar tiempo a Lit a procesar el cambio de trigger en el popup
            queueMicrotask(() => {
                const tooltip = popup.shadowRoot?.querySelector('shop-tooltip') as ShopTooltip | null;
                if (tooltip && typeof tooltip.forceRefresh === 'function') {
                    tooltip.forceRefresh();
                     console.log(`[ShopManager DEBUG] updateShopUI (microtask): tooltip.forceRefresh() LLAMADO.`);
                } else if(tooltip) {
                     console.warn("[ShopManager DEBUG] updateShopUI (microtask): Tooltip encontrado pero no tiene el método forceRefresh(). Intentando requestUpdate...");
                     tooltip.requestUpdate(); // Fallback: forzar update del tooltip
                } else {
                    console.warn("[ShopManager DEBUG] updateShopUI (microtask): No se pudo encontrar el componente shop-tooltip dentro del popup para forzar refresh. Forzando update del popup...");
                    popup.requestUpdate(); // Fallback: forzar update del popup entero
                }
            });
        }
    }
    // --- FIN MÉTODO MODIFICADO ---

    private handleBuyRequest = (e: Event) => {
        const event = e as CustomEvent;
        const itemIdToBuy = event.detail?.itemId;
        if (itemIdToBuy) {
            this.executePurchaseAction(itemIdToBuy);
        } else {
            console.warn("ShopManager: Evento 'buy-item-requested' capturado sin itemId.");
        }
    };

    // --- executePurchaseAction con logs ---
    private executePurchaseAction(itemId: string): boolean {
        const itemData = this.items.get(itemId);
        if (!itemData) {
            console.error(`ShopManager: Ítem con ID '${itemId}' no encontrado.`);
            return false;
        }

        // ---> LOG AÑADIDO: Estado ANTES de la compra <---
        const levelRef = itemData.levelRef as keyof PlayerData | undefined;
        const levelBefore = levelRef ? this.playerData[levelRef] : 'N/A';
        console.log(`[ShopManager DEBUG exec] INTENTANDO COMPRA: Item '${itemId}', Nivel Actual: ${levelBefore}, Puntos Actuales: ${this.playerData.score}`);
        // ---> FIN LOG <---

        const cost = this._calculateItemCost(itemData, this.playerData);
        const canAfford = this.playerData.score >= cost;
        const passesPurchaseCheck = this._checkItemCanPurchase(itemData, this.playerData);
        const currentLevel = this._getItemLevel(itemData, this.playerData); // Usar helper por consistencia
        const isMaxLevel = itemData.isLeveled && typeof itemData.maxLevel === 'number' && currentLevel >= itemData.maxLevel;
        const isAlreadyPurchasedNonLeveled = this._checkItemIsPurchased(itemData, this.playerData) && !itemData.isLeveled;

        if (isMaxLevel || isAlreadyPurchasedNonLeveled || !passesPurchaseCheck || !canAfford) {
             console.warn(`[ShopManager DEBUG exec] Compra RECHAZADA para '${itemId}'. Razones: max=${isMaxLevel}, purchased=${isAlreadyPurchasedNonLeveled}, reqs=${passesPurchaseCheck}, afford=${canAfford}`);
             this.updateShopUI(); // Actualizar UI para reflejar el estado
             this.gameManager.getAudioManager().playSound('incorrect');
             return false;
        }

        // 1. Deducir costo
        this.playerData.score -= cost;
        this.gameManager.updateExternalScoreUI();
        console.log(`[ShopManager DEBUG exec] Costo ${cost} deducido. Puntos restantes: ${this.playerData.score}`);

        // 2. Ejecutar la acción específica de compra
        let success = false;
        const actionId = itemData.actionId;
        try {
            switch (actionId) {
                case 'purchaseLife':            success = this.purchaseLifeAction(); break;
                case 'purchaseShield':          success = this.purchaseShieldAction(); break;
                case 'purchaseHint':            success = this.purchaseHintAction(); break;
                case 'purchaseUnlockDrawing':   success = this.purchaseUnlockDrawingAction(); break;
                case 'purchaseUnlockCatFood':   success = this.purchaseUnlockCatFoodAction(); break;
                case 'purchaseRefillCatFood':   success = this.purchaseRefillCatFoodAction(); break;
                case 'purchaseComboMultiplier': success = this.purchaseComboMultiplierAction(); break;
                case 'purchaseInkCostReduction':success = this.purchaseInkCostReductionAction(); break;
                case 'purchaseExtraCatSpawn':   success = this.purchaseExtraCatSpawnAction(); break;
                case 'purchaseMaxCatsIncrease': success = this.purchaseMaxCatsIncreaseAction(); break;
                case 'purchaseMaxCatSize':      success = this.purchaseMaxCatSizeAction(); break;
                default: console.error(`ShopManager: Acción desconocida: ${actionId}`); success = false;
            }
            // ---> LOG AÑADIDO: Estado DESPUÉS de la acción <---
            const levelAfter = levelRef && success ? this.playerData[levelRef] : 'N/A (o falló)';
            console.log(`[ShopManager DEBUG exec] Acción ${actionId} ejecutada. Éxito: ${success}. Nuevo Nivel: ${levelAfter}`);
             // ---> FIN LOG <---
        } catch (error) {
            console.error(`ShopManager: Error ejecutando acción ${actionId}:`, error);
            success = false;
        }

        // 3. Manejar resultado y actualizar UI
        if (!success) {
             this.playerData.score += cost; // Revertir costo
             this.gameManager.updateExternalScoreUI();
             console.warn(`[ShopManager DEBUG exec] Acción ${actionId} falló o no aplicó. Costo ${cost} revertido. Puntos: ${this.playerData.score}`);
             this.gameManager.getAudioManager().playSound('incorrect');
        } else {
             console.log(`[ShopManager DEBUG exec] Compra EXITOSA de '${itemId}'.`);
             this.gameManager.getAudioManager().playSound('purchase');
        }

        // 4. Llamar a updateShopUI para reflejar los cambios (usará el trigger y forceRefresh)
        console.log(`[ShopManager DEBUG exec] Llamando a updateShopUI DESPUÉS de intento de compra de '${itemId}'.`);
        this.updateShopUI();
        return success;
    }
    // --- FIN executePurchaseAction ---

      // --- Acciones de Compra (sin cambios lógicos internos) ---
      private purchaseLifeAction(): boolean { this.playerData.lives++; this.gameManager.updateExternalLivesUI(); return true; }
      private purchaseShieldAction(): boolean { if(this.playerData.hasShield) return false; this.playerData.hasShield = true; this.gameManager.updateExternalShieldUI(true); return true; }
      private purchaseHintAction(): boolean { this.playerData.hintCharges++; this.gameManager.updateExternalHintUI(this.playerData.hintCharges); return true; }
      private purchaseUnlockDrawingAction(): boolean { if (this.playerData.isDrawingUnlocked) return false; this.playerData.isDrawingUnlocked = true; let activationSuccessful = false; try { activationSuccessful = this.gameManager.enableDrawingFeature(); } catch (e) { activationSuccessful = false; } if (!activationSuccessful) { this.playerData.isDrawingUnlocked = false; return false; } return true; }
      private purchaseComboMultiplierAction(): boolean { this.playerData.comboMultiplierLevel++; return true; }
      private purchaseInkCostReductionAction(): boolean { this.playerData.inkCostReductionLevel++; this.gameManager.updateInkUI(); return true; }
      private purchaseExtraCatSpawnAction(): boolean { this.playerData.extraCatSpawnLevel++; return true; }
      private purchaseMaxCatsIncreaseAction(): boolean { this.playerData.maxCatsLevel++; return true; }
      private purchaseMaxCatSizeAction(): boolean { this.playerData.maxCatSizeLevel++; return true; }
      private purchaseUnlockCatFoodAction(): boolean { if (this.playerData.isCatFoodUnlocked) return false; this.playerData.isCatFoodUnlocked = true; this.playerData.refillCatFood(); this.gameManager.enableCatFoodFeature(); return true; }
      private purchaseRefillCatFoodAction(): boolean { if (this.playerData.currentCatFood >= this.playerData.getMaxCatFood()) return false; this.playerData.refillCatFood(); this.gameManager.updateCatFoodUI(); return true; }

      // --- Métodos helper (SIN CAMBIOS) ---
      private _calculateItemCost(itemData: ShopItemJsonData, playerData: PlayerData): number { const costParams = itemData.cost; let cost = costParams.base; if (itemData.isLeveled) { const levelRef = itemData.levelRef; const currentLevel = levelRef ? (playerData as any)[levelRef] ?? 0 : 0; if (costParams.type === 'exponential' && typeof costParams.multiplier === 'number') { cost = costParams.base * Math.pow(costParams.multiplier, currentLevel); } else { cost = costParams.base + (costParams.perLevel ?? 0) * currentLevel; } } else if (costParams.levelRef && typeof costParams.perLevel === 'number') { const linkedLevel = (playerData as any)[costParams.levelRef] ?? 0; cost = costParams.base + costParams.perLevel * linkedLevel; } return Math.round(cost); }
      private _checkItemIsPurchased(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.isPurchasedCheck) return false; const check = itemData.isPurchasedCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') return false; switch (check.condition) { case 'isTrue': return currentValue === true; case 'isFalse': return currentValue === false; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; default: return false; } }
      private _checkItemCanPurchase(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.purchaseCheck) return true; const check = itemData.purchaseCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') { return false; } switch (check.condition) { case 'lessThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue < check.limit; case 'lessThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue <= check.limit; case 'isFalse': return currentValue === false; case 'isTrue': return currentValue === true; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; case 'greaterThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue >= check.limit; default: return false; } }
      private _getItemLevel(itemData: ShopItemJsonData, playerData: PlayerData): number { if (!itemData.isLeveled || !itemData.levelRef) return -1; return (playerData as any)[itemData.levelRef] ?? 0; }

    public destroy(): void {
        const popup = this.getShopPopupElement();
        if (popup) {
            popup.removeEventListener('close-requested', this.closeRequestListener);
            popup.removeEventListener('buy-item-requested', this.buyRequestListener);
        }
        this.items.clear();
        this.shopPopupElement = null;
        console.log("ShopManager destruido.");
    }
}