// src/systems/ShopManager.ts
import { ShopItemJsonData } from '../types/ShopItemData';
import { PlayerData } from '../game/PlayerData';
import { GameManager } from '../game/GameManager';
// Importar SOLO el componente ShopPopup y su tipo
import '../game/components/ui/shop-popup.ts'; // Importar para registrar <shop-popup>
import type { ShopPopup } from '../game/components/ui/shop-popup'; // Importar el tipo

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
                this.shopPopupElement.removeEventListener('close-requested', this.closeRequestListener);
                this.shopPopupElement.removeEventListener('buy-item-requested', this.buyRequestListener);
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
            return;
        }
    
        try {
            popup.items = Array.from(this.items.values());
            // --- CAMBIO PRINCIPAL AQUÍ ---
            // Pasamos la instancia completa de playerData, no una copia superficial.
            // Los componentes Lit (shop-popup, shop-tooltip) ahora tendrán acceso
            // a los métodos y propiedades readonly de PlayerData.
            popup.playerDataSnapshot = this.playerData; 
            // --- FIN DEL CAMBIO ---
            popup.isVisible = true; 
    
            const backdrop = document.getElementById('blur-backdrop');
            if (backdrop) {
                backdrop.style.display = 'block';
                void backdrop.offsetHeight; 
                backdrop.classList.add('visible');
            }
        } catch (error) {
            console.error("[ShopManager] Error estableciendo props o visibilidad en <shop-popup>:", error);
            if (popup) popup.isVisible = false; 
        }
    }

    public closeShop(): void {
        const popup = this.getShopPopupElement();
        if (!popup || !popup.isVisible) return;

        popup.isVisible = false; 

        const backdrop = document.getElementById('blur-backdrop');
        const explanationOverlay = document.getElementById('explanation-overlay');
        if (backdrop && (!explanationOverlay || !explanationOverlay.classList.contains('visible'))) {
            backdrop.classList.remove('visible');
        }
    }

    public updateShopUI(): void {
        if (!this.playerData) return;
        const popup = this.getShopPopupElement();
        if (popup) {
            // --- CAMBIO PRINCIPAL AQUÍ (también) ---
            // Asegurarse de que el snapshot se actualice con la instancia completa.
            popup.playerDataSnapshot = this.playerData;
            // --- FIN DEL CAMBIO ---
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

    private executePurchaseAction(itemId: string): boolean {
        const itemData = this.items.get(itemId); 
        if (!itemData) { 
            console.error(`ShopManager: Ítem con ID '${itemId}' no encontrado.`);
            return false; 
        }
        
        // PlayerData es la instancia completa, por lo que los métodos y propiedades son accesibles.
        const cost = this._calculateItemCost(itemData, this.playerData);
        const canAfford = this.playerData.score >= cost;
        const passesPurchaseCheck = this._checkItemCanPurchase(itemData, this.playerData);
        const level = this._getItemLevel(itemData, this.playerData);
        const isMaxLevel = itemData.isLeveled && typeof itemData.maxLevel === 'number' && level >= itemData.maxLevel;
        const isAlreadyPurchasedNonLeveled = this._checkItemIsPurchased(itemData, this.playerData) && !itemData.isLeveled;

        if (isMaxLevel || isAlreadyPurchasedNonLeveled || !passesPurchaseCheck || !canAfford) {
            this.updateShopUI(); 
            this.gameManager.getAudioManager().playSound('incorrect'); 
            return false;
        }

        this.playerData.score -= cost; 
        this.gameManager.updateExternalScoreUI();

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
             this.playerData.score += cost; 
             this.gameManager.updateExternalScoreUI();
             console.warn(`ShopManager: Acción ${actionId} falló. Costo revertido.`);
             this.gameManager.getAudioManager().playSound('incorrect');
        } else {
             this.gameManager.getAudioManager().playSound('purchase');
        }
        this.updateShopUI(); 
        return success;
      }

      // Acciones de compra (sin cambios, pero ahora operan sobre la instancia real de PlayerData)
      private purchaseLifeAction(): boolean { this.playerData.lives++; this.gameManager.updateExternalLivesUI(); return true; }
      private purchaseShieldAction(): boolean { this.playerData.hasShield = true; this.gameManager.updateExternalShieldUI(true); return true; }
      private purchaseHintAction(): boolean { this.playerData.hintCharges++; this.gameManager.updateExternalHintUI(this.playerData.hintCharges); return true; }
      private purchaseUnlockDrawingAction(): boolean { if (this.playerData.isDrawingUnlocked) return false; this.playerData.isDrawingUnlocked = true; let activationSuccessful = false; try { activationSuccessful = this.gameManager.enableDrawingFeature(); } catch (e) { activationSuccessful = false; } if (!activationSuccessful) { this.playerData.isDrawingUnlocked = false; return false; } return true; }
      private purchaseComboMultiplierAction(): boolean { this.playerData.comboMultiplierLevel++; return true; }
      private purchaseInkCostReductionAction(): boolean { this.playerData.inkCostReductionLevel++; this.gameManager.updateInkUI(); return true; }
      private purchaseExtraCatSpawnAction(): boolean { this.playerData.extraCatSpawnLevel++; return true; }
      private purchaseMaxCatsIncreaseAction(): boolean { this.playerData.maxCatsLevel++; return true; }
      private purchaseMaxCatSizeAction(): boolean { this.playerData.maxCatSizeLevel++; return true; }
      private purchaseUnlockCatFoodAction(): boolean { if (this.playerData.isCatFoodUnlocked) return false; this.playerData.isCatFoodUnlocked = true; this.playerData.refillCatFood(); this.gameManager.enableCatFoodFeature(); return true; }
      private purchaseRefillCatFoodAction(): boolean { if (this.playerData.currentCatFood >= this.playerData.getMaxCatFood()) return false; this.playerData.refillCatFood(); this.gameManager.updateCatFoodUI(); return true; }

      // Métodos helper (sin cambios, pero ahora operan sobre la instancia real de PlayerData)
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
    }
}
