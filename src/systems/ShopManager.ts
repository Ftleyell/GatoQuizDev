// src/systems/ShopManager.ts
import { ShopItemJsonData } from '../types/ShopItemData';
import { PlayerData } from '../game/PlayerData';
import { GameManager } from '../game/GameManager';
// Importar SOLO el componente ShopPopup y su tipo
import '../game/components/ui/shop-popup.ts'; // Importar para registrar <shop-popup>
import type { ShopPopup } from '../game/components/ui/shop-popup'; // Importar el tipo
// <-- AÑADIDO: Importar tipo del backdrop -->
import type { BlurBackdropComponent } from '../game/components/ui/blur-backdrop';

const SHOP_POPUP_ID = 'shop-popup';

export class ShopManager {
    private items: Map<string, ShopItemJsonData> = new Map();
    private playerData: PlayerData;
    private gameManager: GameManager;
    private shopPopupElement: ShopPopup | null = null;

    // Listener para el evento de compra del popup
    private buyRequestListener = (e: Event) => this.handleBuyRequest(e);
    // Listener para el evento de cierre del popup (si el popup lo emite)
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
        // Consideramos que está abierta si el componente existe y su propiedad isVisible es true
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
            // Pasamos la instancia completa de playerData
            popup.playerDataSnapshot = this.playerData;
            popup.isVisible = true; // Activar visibilidad del popup

            // Obtener y mostrar el backdrop como componente Lit
            // <-- MODIFICADO: Obtener y usar el componente backdrop -->
            const backdropComponent = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;
            if (backdropComponent) {
                backdropComponent.visible = true;
            } else {
                console.warn("ShopManager: Componente <blur-backdrop-component> no encontrado al abrir la tienda.");
            }
            // <-- FIN MODIFICADO -->

            // Asegurarse de que el listener de cierre esté añadido (getShopPopupElement ya lo hace)
            // this.addShopCloseListener(popup); // Ya no es necesario si getShopPopupElement siempre lo hace

        } catch (error) {
            console.error("[ShopManager] Error estableciendo props o visibilidad en <shop-popup>:", error);
            if (popup) popup.isVisible = false;
            // Asegurarse de ocultar el backdrop si falla la apertura del popup
             const backdropComponent = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;
             if (backdropComponent) backdropComponent.visible = false;
        }
    }


    public closeShop(): void {
        const popup = this.getShopPopupElement();
        // Solo proceder si el popup existe y está visible
        if (!popup || !popup.isVisible) return;

        popup.isVisible = false; // Ocultar el popup

        // Obtener el backdrop como componente Lit
        // <-- MODIFICADO: Obtener y usar el componente backdrop -->
        const backdropComponent = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;

        // Solo ocultar el backdrop si el overlay de explicación tampoco está visible
        // Usamos el UIManager para verificar el estado del overlay de explicación
        const explanationIsVisible = this.gameManager.getUIManager()?.isExplanationVisible() ?? false;

        if (backdropComponent && !explanationIsVisible) {
            backdropComponent.visible = false;
        }
        // <-- FIN MODIFICADO -->

        // Limpiar listener de cierre (opcional, getShopPopupElement podría gestionarlo)
        // this.removeShopCloseListener(popup); // Podría hacerse aquí o dejar que getShop lo re-añada
    }

    public updateShopUI(): void {
        if (!this.playerData) return;
        const popup = this.getShopPopupElement();
        if (popup && popup.isVisible) { // Solo actualizar si está visible
            // Asegurarse de que el snapshot se actualice con la instancia completa.
            popup.playerDataSnapshot = this.playerData;
        }
    }

    private handleBuyRequest = (e: Event) => {
        const event = e as CustomEvent;
        const itemIdToBuy = event.detail?.itemId;
        if (itemIdToBuy) {
            this.executePurchaseAction(itemIdToBuy);
        } else {
            console.warn("ShopManager: Evento 'buy-item-requested' capturado sin itemId.");
        }
    };

    // --- executePurchaseAction y acciones de compra (SIN CAMBIOS LÓGICOS) ---
    private executePurchaseAction(itemId: string): boolean {
        const itemData = this.items.get(itemId);
        if (!itemData) {
            console.error(`ShopManager: Ítem con ID '${itemId}' no encontrado.`);
            return false;
        }

        const cost = this._calculateItemCost(itemData, this.playerData);
        const canAfford = this.playerData.score >= cost;
        const passesPurchaseCheck = this._checkItemCanPurchase(itemData, this.playerData);
        const level = this._getItemLevel(itemData, this.playerData);
        const isMaxLevel = itemData.isLeveled && typeof itemData.maxLevel === 'number' && level >= itemData.maxLevel;
        const isAlreadyPurchasedNonLeveled = this._checkItemIsPurchased(itemData, this.playerData) && !itemData.isLeveled;

        if (isMaxLevel || isAlreadyPurchasedNonLeveled || !passesPurchaseCheck || !canAfford) {
            this.updateShopUI(); // Actualizar UI para reflejar por qué no se puede comprar
            this.gameManager.getAudioManager().playSound('incorrect');
            return false;
        }

        this.playerData.score -= cost;
        this.gameManager.updateExternalScoreUI(); // Notificar a GameManager para actualizar displays externos si los hubiera

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
        } catch (error) {
            console.error(`ShopManager: Error ejecutando acción ${actionId}:`, error);
            success = false;
        }

        if (!success) {
             // Si la acción falló (ej. ya estaba desbloqueado), revertir costo
             this.playerData.score += cost;
             this.gameManager.updateExternalScoreUI();
             console.warn(`ShopManager: Acción ${actionId} falló o no aplicó. Costo revertido.`);
             this.gameManager.getAudioManager().playSound('incorrect');
        } else {
             this.gameManager.getAudioManager().playSound('purchase');
        }
        // Siempre actualizar la UI después de intentar comprar
        this.updateShopUI();
        return success;
      }

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

      // --- Métodos helper (SIN CAMBIOS LÓGICOS) ---
      private _calculateItemCost(itemData: ShopItemJsonData, playerData: PlayerData): number { const costParams = itemData.cost; let cost = costParams.base; if (itemData.isLeveled) { const levelRef = itemData.levelRef; const currentLevel = levelRef ? (playerData as any)[levelRef] ?? 0 : 0; if (costParams.type === 'exponential' && typeof costParams.multiplier === 'number') { cost = costParams.base * Math.pow(costParams.multiplier, currentLevel); } else { cost = costParams.base + (costParams.perLevel ?? 0) * currentLevel; } } else if (costParams.levelRef && typeof costParams.perLevel === 'number') { const linkedLevel = (playerData as any)[costParams.levelRef] ?? 0; cost = costParams.base + costParams.perLevel * linkedLevel; } return Math.round(cost); }
      private _checkItemIsPurchased(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.isPurchasedCheck) return false; const check = itemData.isPurchasedCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') return false; switch (check.condition) { case 'isTrue': return currentValue === true; case 'isFalse': return currentValue === false; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; default: return false; } }
      private _checkItemCanPurchase(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.purchaseCheck) return true; const check = itemData.purchaseCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') { return false; } switch (check.condition) { case 'lessThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue < check.limit; case 'lessThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue <= check.limit; case 'isFalse': return currentValue === false; case 'isTrue': return currentValue === true; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; case 'greaterThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue >= check.limit; default: return false; } }
      private _getItemLevel(itemData: ShopItemJsonData, playerData: PlayerData): number { if (!itemData.isLeveled || !itemData.levelRef) return -1; return (playerData as any)[itemData.levelRef] ?? 0; }

    public destroy(): void {
        // Limpiar listeners del popup si existe
        const popup = this.getShopPopupElement();
        if (popup) {
            popup.removeEventListener('close-requested', this.closeRequestListener);
            popup.removeEventListener('buy-item-requested', this.buyRequestListener);
        }
        this.items.clear();
        this.shopPopupElement = null; // Limpiar referencia al elemento
        // No necesitamos limpiar referencias a playerData o gameManager aquí
        // si ShopManager se recrea cuando se necesita.
        console.log("ShopManager destruido.");
    }
}