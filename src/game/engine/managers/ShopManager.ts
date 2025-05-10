// src/game/engine/managers/ShopManager.ts

import type { ShopItemJsonData } from '../../../types'; // Sube tres niveles ('managers', 'engine', 'game') a src/, luego a 'types/' (usa index.ts)
import { PlayerData } from '../../PlayerData';          // Sube dos niveles ('engine', 'game') a src/, luego a 'game/'
import { GameManager } from '../../GameManager';       // Sube dos niveles ('engine', 'game') a src/, luego a 'game/'

// Para asegurar que el componente Lit se registre (se ejecuta el código del archivo):
import '../../components/ui/shop-popup.js'; // Sube dos niveles, entra a 'components/ui/' (o .ts)

// Para tipos, usando los barrel files:
import type { ShopPopup, ShopTooltip, BlurBackdropComponent } from '../../components/ui'; // Sube dos niveles, entra a 'components/ui/' (usa index.ts)

const SHOP_POPUP_ID = 'shop-popup';

export class ShopManager {
    private items: Map<string, ShopItemJsonData> = new Map();
    private playerData: PlayerData;
    private gameManager: GameManager;
    private shopPopupElement: ShopPopup | null = null;

    private buyRequestListener = (e: Event) => this.handleBuyRequest(e);
    private closeRequestListener = () => {
        // Llamar a GameManager para que maneje el cierre y la lógica de audio/UI global
        this.gameManager.handleShopCloseRequest();
    };


    constructor(playerData: PlayerData, gameManager: GameManager) {
        this.playerData = playerData;
        this.gameManager = gameManager;
        console.log('[ShopManager CONSTRUCTOR] Instanciado.'); // LOG AÑADIDO
    }

    public init(itemJsonData: ShopItemJsonData[]): void {
        console.log('[ShopManager INIT] Iniciando ShopManager...'); // LOG AÑADIDO
        this.items.clear();
        if (!Array.isArray(itemJsonData)) {
            console.error("ShopManager: Datos de ítems de tienda inválidos."); return;
        }
        itemJsonData.forEach(itemData => {
            if (itemData?.id && typeof itemData.id === 'string') {
                this.items.set(itemData.id, itemData);
            } else { console.warn("ShopManager: Ítem inválido o sin ID.", itemData); }
        });
        console.log(`[ShopManager INIT] ${this.items.size} ítems cargados.`); // LOG AÑADIDO
    }

    public getShopPopupElement(): ShopPopup | null {
        // console.log('[ShopManager getShopPopupElement] Solicitando elemento del popup...'); // LOG AÑADIDO (puede ser muy verboso)
        if (!this.shopPopupElement || !document.body.contains(this.shopPopupElement)) {
            // console.log('[ShopManager getShopPopupElement] Elemento no cacheado o no en DOM, buscando...'); // LOG AÑADIDO
            this.shopPopupElement = document.getElementById(SHOP_POPUP_ID) as ShopPopup | null;
            if (this.shopPopupElement) {
                // console.log('[ShopManager getShopPopupElement] Elemento encontrado. Re-adjuntando listeners.'); // LOG AÑADIDO
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
        // console.log(`[ShopManager isShopOpen] Popup: ${popup ? 'existe' : 'null'}, isVisible: ${popup?.isVisible}`); // LOG AÑADIDO (puede ser verboso)
        return popup?.isVisible || false;
    }

    public openShop(): void {
        console.log('[ShopManager openShop] Solicitud para abrir tienda.'); // LOG AÑADIDO
        const popup = this.getShopPopupElement();
        if (!popup) {
            console.error("ShopManager: No se pudo abrir la tienda, el elemento popup no existe.");
            return;
        }
        console.log('[ShopManager openShop] Elemento popup obtenido.'); // LOG AÑADIDO

        try {
            popup.items = Array.from(this.items.values());
            popup.playerDataSnapshot = this.playerData; // Pasar el objeto PlayerData directamente
            popup.updateTrigger = (popup.updateTrigger || 0) + 1;
            popup.isVisible = true;
            console.log(`[ShopManager openShop] Tienda configurada y visible. Trigger: ${popup.updateTrigger}`); // LOG AÑADIDO
            
            // GameManager se encargará de actualizar el backdrop y el fade
             this.gameManager.updateBackdropAndFadeState(); // Asegurarse que esto se llama desde GM
            
        } catch (error) {
            console.error("[ShopManager] Error estableciendo props o visibilidad en <shop-popup>:", error);
            if (popup) popup.isVisible = false;
             this.gameManager.updateBackdropAndFadeState();
        }
    }

    public closeShop(): void {
        console.log('[ShopManager closeShop] Solicitud para cerrar tienda.'); // LOG AÑADIDO
        const popup = this.getShopPopupElement();
        if (!popup || !popup.isVisible) {
            console.log('[ShopManager closeShop] Tienda ya cerrada o popup no existe.'); // LOG AÑADIDO
            return;
        }

        popup.isVisible = false;
        console.log('[ShopManager closeShop] Tienda marcada como no visible.'); // LOG AÑADIDO
         this.gameManager.updateBackdropAndFadeState(); // Asegurarse que esto se llama desde GM
    }

    public updateShopUI(): void {
        // console.log('[ShopManager updateShopUI] Solicitud para actualizar UI de la tienda.'); // LOG AÑADIDO (muy verboso)
        if (!this.playerData) {
            console.warn("[ShopManager] updateShopUI llamado sin playerData.");
            return;
        }
        const popup = this.getShopPopupElement();
        if (popup && popup.isVisible) {
            const currentLevel = this.playerData.comboMultiplierLevel; // Ejemplo
            // console.log(`[ShopManager DEBUG] updateShopUI: PlayerData level ANTES de pasar: ${currentLevel}`); // LOG DEBUG
            
            popup.playerDataSnapshot = this.playerData; // Pasar el objeto PlayerData directamente
            popup.updateTrigger = (popup.updateTrigger || 0) + 1;

            // console.log(`[ShopManager DEBUG] updateShopUI: Snapshot asignado, trigger incrementado a ${popup.updateTrigger}. Intentando forzar refresh del tooltip...`); // LOG DEBUG
            
            queueMicrotask(() => {
                const tooltip = popup.shadowRoot?.querySelector('shop-tooltip') as ShopTooltip | null;
                if (tooltip && typeof tooltip.forceRefresh === 'function') {
                    tooltip.forceRefresh();
                    //  console.log(`[ShopManager DEBUG] updateShopUI (microtask): tooltip.forceRefresh() LLAMADO.`); // LOG DEBUG
                } else if(tooltip) {
                    //  console.warn("[ShopManager DEBUG] updateShopUI (microtask): Tooltip encontrado pero no tiene el método forceRefresh(). Intentando requestUpdate..."); // LOG DEBUG
                     tooltip.requestUpdate();
                } else {
                    // console.warn("[ShopManager DEBUG] updateShopUI (microtask): No se pudo encontrar el componente shop-tooltip dentro del popup para forzar refresh. Forzando update del popup..."); // LOG DEBUG
                    popup.requestUpdate();
                }
            });
        } else {
            // console.log('[ShopManager updateShopUI] Tienda no visible, no se actualiza UI interna.'); // LOG AÑADIDO
        }
    }

    private handleBuyRequest = (e: Event) => {
        const event = e as CustomEvent;
        const itemIdToBuy = event.detail?.itemId;
        console.log(`[ShopManager handleBuyRequest] Solicitud de compra recibida para item ID: ${itemIdToBuy}`); // LOG AÑADIDO
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

        const levelRef = itemData.levelRef as keyof PlayerData | undefined;
        const levelBefore = levelRef ? this.playerData[levelRef] : 'N/A';
        console.log(`[ShopManager EXEC_PURCHASE] === INICIO COMPRA ===\n  Item: '${itemId}' (${itemData.name})\n  Nivel ANTES: ${levelBefore}\n  Puntos ANTES: ${this.playerData.score}`);

        const cost = this._calculateItemCost(itemData, this.playerData);
        const canAfford = this.playerData.score >= cost;
        const passesPurchaseCheck = this._checkItemCanPurchase(itemData, this.playerData);
        const currentLevel = this._getItemLevel(itemData, this.playerData);
        const isMaxLevel = itemData.isLeveled && typeof itemData.maxLevel === 'number' && currentLevel >= itemData.maxLevel;
        const isAlreadyPurchasedNonLeveled = this._checkItemIsPurchased(itemData, this.playerData) && !itemData.isLeveled;

        console.log(`[ShopManager EXEC_PURCHASE] Chequeos Pre-Compra:\n    Costo: ${cost}, Puntos: ${this.playerData.score}, Puede Pagar: ${canAfford}\n    Pasa Requisitos: ${passesPurchaseCheck}\n    Es Max Nivel: ${isMaxLevel}\n    Ya Comprado (no mejorable): ${isAlreadyPurchasedNonLeveled}`);

        if (isMaxLevel || isAlreadyPurchasedNonLeveled || !passesPurchaseCheck || !canAfford) {
             console.warn(`[ShopManager EXEC_PURCHASE] Compra RECHAZADA para '${itemId}'.`);
             this.updateShopUI();
             this.gameManager.getAudioManager().playSound('incorrect');
             return false;
        }

        this.playerData.score -= cost;
        this.gameManager.updateExternalScoreUI(); 
        console.log(`[ShopManager EXEC_PURCHASE] Costo ${cost} deducido. Puntos restantes: ${this.playerData.score}`);

        let success = false;
        const actionId = itemData.actionId;
        console.log(`[ShopManager EXEC_PURCHASE] Ejecutando ActionID: '${actionId}' para item '${itemId}'`);
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
            const levelAfter = levelRef && success ? this.playerData[levelRef] : (levelRef ? this.playerData[levelRef] : 'N/A'); // Mostrar nivel aunque falle si es mejorable
            console.log(`[ShopManager EXEC_PURCHASE] Acción '${actionId}' ejecutada. Resultado Éxito: ${success}. Nivel DESPUÉS: ${levelAfter}`);
        } catch (error) {
            console.error(`ShopManager: Error CRÍTICO ejecutando acción ${actionId}:`, error);
            success = false;
        }

        if (!success) {
             this.playerData.score += cost; 
             this.gameManager.updateExternalScoreUI();
             console.warn(`[ShopManager EXEC_PURCHASE] Acción '${actionId}' falló o no aplicó. Costo ${cost} REVERTIDO. Puntos ahora: ${this.playerData.score}`);
             this.gameManager.getAudioManager().playSound('incorrect');
        } else {
             console.log(`[ShopManager EXEC_PURCHASE] Compra EXITOSA de '${itemId}'.`);
             this.gameManager.getAudioManager().playSound('purchase');
        }
        
        console.log(`[ShopManager EXEC_PURCHASE] === FIN COMPRA === Item '${itemId}'. Llamando a updateShopUI.`);
        this.updateShopUI();
        return success;
    }

      private purchaseLifeAction(): boolean { this.playerData.lives++; this.gameManager.updateExternalLivesUI(); return true; }
      private purchaseShieldAction(): boolean { if(this.playerData.hasShield) return false; this.playerData.hasShield = true; this.gameManager.updateExternalShieldUI(true); return true; }
      private purchaseHintAction(): boolean { this.playerData.hintCharges++; this.gameManager.updateExternalHintUI(this.playerData.hintCharges); return true; }
      
      private purchaseUnlockDrawingAction(): boolean {
          console.log("[ShopManager purchaseUnlockDrawingAction] Iniciando acción.");
          if (this.playerData.isDrawingUnlocked) {
              console.log("[ShopManager purchaseUnlockDrawingAction] Dibujo ya desbloqueado, retornando false.");
              return false;
          }
          this.playerData.isDrawingUnlocked = true;
          console.log(`[ShopManager purchaseUnlockDrawingAction] PlayerData.isDrawingUnlocked establecido a: ${this.playerData.isDrawingUnlocked}`);
          let activationSuccessful = false;
          try {
              console.log("[ShopManager purchaseUnlockDrawingAction] Llamando a gameManager.enableDrawingFeature().");
              activationSuccessful = this.gameManager.enableDrawingFeature();
              console.log(`[ShopManager purchaseUnlockDrawingAction] gameManager.enableDrawingFeature() devolvió: ${activationSuccessful}`);
          } catch (e) {
              console.error("[ShopManager purchaseUnlockDrawingAction] Error capturado llamando a gameManager.enableDrawingFeature():", e);
              activationSuccessful = false;
          }
          if (!activationSuccessful) {
              console.warn("[ShopManager purchaseUnlockDrawingAction] Activación NO exitosa. Revirtiendo isDrawingUnlocked.");
              this.playerData.isDrawingUnlocked = false;
              console.log(`[ShopManager purchaseUnlockDrawingAction] PlayerData.isDrawingUnlocked REVERTIDO a: ${this.playerData.isDrawingUnlocked}`);
              return false;
          }
          console.log("[ShopManager purchaseUnlockDrawingAction] Activación exitosa, retornando true.");
          return true;
      }

      private purchaseComboMultiplierAction(): boolean { this.playerData.comboMultiplierLevel++; return true; }
      private purchaseInkCostReductionAction(): boolean { this.playerData.inkCostReductionLevel++; this.gameManager.updateInkUI(); return true; }
      private purchaseExtraCatSpawnAction(): boolean { this.playerData.extraCatSpawnLevel++; return true; }
      private purchaseMaxCatsIncreaseAction(): boolean { this.playerData.maxCatsLevel++; return true; }
      private purchaseMaxCatSizeAction(): boolean { this.playerData.maxCatSizeLevel++; return true; }
      
      private purchaseUnlockCatFoodAction(): boolean {
          console.log("[ShopManager purchaseUnlockCatFoodAction] Iniciando acción.");
          if (this.playerData.isCatFoodUnlocked) {
              console.log("[ShopManager purchaseUnlockCatFoodAction] Comida ya desbloqueada, retornando false.");
              return false;
          }
          this.playerData.isCatFoodUnlocked = true;
          console.log(`[ShopManager purchaseUnlockCatFoodAction] PlayerData.isCatFoodUnlocked establecido a: ${this.playerData.isCatFoodUnlocked}`);
          this.playerData.refillCatFood();
          console.log("[ShopManager purchaseUnlockCatFoodAction] Comida rellenada.");
          try {
            console.log("[ShopManager purchaseUnlockCatFoodAction] Llamando a gameManager.enableCatFoodFeature().");
            this.gameManager.enableCatFoodFeature();
            console.log("[ShopManager purchaseUnlockCatFoodAction] gameManager.enableCatFoodFeature() llamado.");
          } catch (e) {
            console.error("[ShopManager purchaseUnlockCatFoodAction] Error capturado llamando a gameManager.enableCatFoodFeature():", e);
            // No hay reversión aquí, pero el log es importante
          }
          console.log("[ShopManager purchaseUnlockCatFoodAction] Retornando true.");
          return true;
      }

      private purchaseRefillCatFoodAction(): boolean { if (this.playerData.currentCatFood >= this.playerData.getMaxCatFood()) return false; this.playerData.refillCatFood(); this.gameManager.updateCatFoodUI(); return true; }

      // --- Helpers (sin logs adicionales, ya que son internos y llamados por el flujo principal con logs) ---
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
        console.log("[ShopManager DESTROY] Listeners removidos, ítems limpiados y elemento del popup desreferenciado."); // LOG AÑADIDO
    }
}