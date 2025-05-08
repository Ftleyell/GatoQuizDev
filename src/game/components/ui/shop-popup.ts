// src/game/components/ui/shop-popup.ts
import { LitElement, html, css, CSSResultGroup, PropertyValueMap, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import type { ShopItemJsonData } from '../../../types/ShopItemData';
import type { PlayerData } from '../../../game/PlayerData';
import './shop-item-card.ts';
import './shop-tooltip.ts'; // Asegúrate que tooltip esté importado
import { ShopTooltip } from './shop-tooltip'; // Importar la clase para el querySelector tipado

interface ItemsByCategory {
  [key: string]: ShopItemJsonData[];
}

const CATEGORY_ORDER: ReadonlyArray<string> = ['consumable', 'unlockable', 'upgradeable', 'general'];
const CATEGORY_TITLES: Readonly<{ [key: string]: string }> = {
  consumable: 'Consumibles',
  unlockable: 'Desbloqueables',
  upgradeable: 'Mejorables',
  general: 'General'
};

@customElement('shop-popup')
export class ShopPopup extends LitElement {

  @property({ type: Array }) items: ShopItemJsonData[] = [];
  @property({ type: Object }) playerDataSnapshot: PlayerData | null = null;
  @property({ type: Boolean, reflect: true, attribute: 'visible' }) isVisible = false;

  // Propiedad trigger (como discutimos)
  @property({ type: Number }) updateTrigger = 0;

  @state() private _selectedItemId: string | null = null;
  @state() private _itemsByCategory: ItemsByCategory = {};
  @state() private _selectedItemData: ShopItemJsonData | null = null;

  @query('.shop-content-box') private _shopContentBox!: HTMLElement;
  // Añadimos query para el tooltip interno
  @query('shop-tooltip') private _tooltipElement!: ShopTooltip | null;


  // --- Estilos CSS (sin cambios) ---
  static styles: CSSResultGroup = css`
    :host {
      /* El :host es el overlay que ocupa toda la pantalla */
      display: none;
      opacity: 0;
      visibility: hidden;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      justify-content: center; /* Centra .shop-content-box horizontalmente */
      align-items: center; /* Centra .shop-content-box verticalmente */
      text-align: center;
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s; /* Ajuste en transition */
      z-index: 101; /* Debe estar por encima del backdrop */
      padding: 1rem; /* Espacio para que el contenido no toque los bordes */
      box-sizing: border-box;
      pointer-events: none; /* Por defecto, no intercepta clics */
      overflow-y: auto; /* Permite scroll si el contenido es muy alto */
      font-family: var(--gq-shop-popup-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      /* El backdrop se maneja globalmente por GameManager/UIManager */
    }

    :host([visible]) {
      display: flex; /* Cambiado a flex para que align-items y justify-content funcionen */
      opacity: 1;
      visibility: visible;
      pointer-events: auto; /* Cuando está visible, el :host puede interceptar clics */
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0s; /* Ajuste en transition */
    }

    .shop-content-box {
      /* Estilos del contenido de la tienda */
      background-color: var(--gq-shop-popup-bg, rgba(17, 24, 39, 0.97));
      border-radius: var(--gq-shop-popup-border-radius, 1rem);
      border: var(--gq-shop-popup-border, 1px solid #4b5563);
      box-shadow: var(--gq-shop-popup-box-shadow, 0 0.625rem 1.875rem rgba(0, 0, 0, 0.6));
      width: 90%;
      max-width: var(--gq-shop-popup-max-width, 30.125rem);
      position: relative; /* Para el botón de cierre absoluto */
      color: var(--gq-shop-popup-text-color, #e5e7eb);
      max-height: 85vh; /* Limitar altura máxima */
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden; /* El scroll interno lo maneja .shop-items-container */
      margin: auto; /* Asegura centrado si el host es flex */
      pointer-events: auto; /* Asegurar que el contenido también reciba eventos */
    }
    .shop-close-btn {
      position: absolute;
      top: var(--gq-shop-popup-close-btn-top, 0.25rem);
      right: var(--gq-shop-popup-close-btn-right, 0.5rem);
      background: none; border: none;
      color: var(--gq-shop-popup-close-btn-text-color, #9ca3af);
      font-size: var(--gq-shop-popup-close-btn-font-size, 2rem);
      line-height: 1; cursor: pointer;
      transition: color 0.2s ease, transform 0.1s ease;
      padding: 0.25rem; z-index: 10;
      -webkit-tap-highlight-color: transparent;
    }
    .shop-close-btn:hover {
      color: var(--gq-shop-popup-close-btn-hover-text-color, var(--gq-shop-popup-text-color, #e5e7eb));
      transform: scale(1.1);
    }
    .shop-close-btn:active { transform: scale(0.95); }

    .shop-title-text, .shop-score-text, .shop-section-title {
      text-align: center; flex-shrink: 0;
      padding-left: 1rem; padding-right: 1rem; box-sizing: border-box;
    }
    .shop-title-text {
      font-family: var(--gq-shop-popup-title-font-family, var(--gq-shop-popup-font-family));
      font-size: var(--gq-shop-popup-title-font-size, 1.4rem);
      font-weight: var(--gq-shop-popup-title-font-weight, 700);
      margin-top: 0.8rem;
      margin-bottom: 0.4rem;
      color: var(--gq-shop-popup-title-text-color, var(--gq-shop-popup-text-color, #e5e7eb));
    }
    .shop-score-text {
      font-family: var(--gq-shop-popup-score-font-family, var(--gq-shop-popup-font-family));
      font-size: var(--gq-shop-popup-score-font-size, 0.9rem);
      font-weight: var(--gq-shop-popup-score-font-weight, 600);
      margin-bottom: 0.4rem;
      color: var(--gq-shop-popup-score-text-color, #a5b4fc);
    }
    .shop-items-container {
      overflow-y: auto; flex-grow: 1; display: flex; flex-direction: column;
      gap: 0.4rem; padding: 0 0.5rem 0.5rem 0.5rem; box-sizing: border-box;
      margin-bottom: 0; scrollbar-width: none; -ms-overflow-style: none;
    }
    .shop-items-container::-webkit-scrollbar { display: none; }
    .shop-section-title {
      font-family: var(--gq-shop-popup-section-title-font-family, var(--gq-shop-popup-font-family));
      font-size: var(--gq-shop-popup-section-title-font-size, 1rem);
      font-weight: var(--gq-shop-popup-section-title-font-weight, 600);
      color: var(--gq-shop-popup-section-title-color, #9ca3af);
      text-transform: uppercase;
      letter-spacing: 0.05em; margin-top: 0.5rem; margin-bottom: calc(0.4rem * 1.5);
      padding-bottom: 0.25rem;
      border-bottom: var(--gq-shop-popup-section-title-border-bottom, 1px solid #4b5563);
      padding-left: 0.5rem; padding-right: 0.5rem;
    }
    .shop-section-title:first-of-type { margin-top: 0; }
    .shop-section-items {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(4.5rem, 1fr));
      gap: 0.5rem; align-items: center; justify-items: center; padding: 0 0.3rem;
    }
    shop-tooltip {
      margin: var(--gq-shop-popup-tooltip-margin, 0.5rem);
      flex-shrink: 0;
    }
    @media (max-width: 768px) { /* Ajustado para tablets y móviles */
       :host { padding: 2vh 0.5rem; align-items: center; /* Mantener centrado vertical */ }
       .shop-content-box { max-height: 90vh; }
       .shop-section-items { grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr)); gap: 0.4rem; }
       shop-tooltip { margin: var(--gq-shop-popup-tooltip-tablet-margin, var(--gq-shop-popup-tooltip-margin, 0.4rem)); }
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._handleHostClick as EventListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleHostClick as EventListener);
  }

  // --- MÉTODO updated CON LOGS ---
  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    let needsInternalUpdate = false; // Flag para saber si necesitamos actualizar estados internos

    // ---> LOGS AÑADIDOS <---
    console.log(`%c[ShopPopup DEBUG] updated()`, 'color: blue; font-weight: bold;', "Cambios:", Array.from(changedProperties.keys()));

    if (changedProperties.has('playerDataSnapshot')) {
        const oldVal = changedProperties.get('playerDataSnapshot') as PlayerData | null;
        const newVal = this.playerDataSnapshot;
        // Compara un valor específico para ver si cambió
        const oldLevel = oldVal?.comboMultiplierLevel ?? 'N/A';
        const newLevel = newVal?.comboMultiplierLevel ?? 'N/A';
        console.log(`%c[ShopPopup DEBUG]   > playerDataSnapshot cambió. Nivel Combo Anterior: ${oldLevel}, Nuevo: ${newLevel}`, 'color: blue;');
        needsInternalUpdate = true; // Necesitamos pasar esto al tooltip
    }
    if (changedProperties.has('updateTrigger')) {
         console.log(`%c[ShopPopup DEBUG]   > updateTrigger cambió a: ${this.updateTrigger}`, 'color: blue;');
         needsInternalUpdate = true; // El trigger indica que PlayerData pudo haber cambiado
    }
    if (changedProperties.has('isVisible')) {
         console.log(`%c[ShopPopup DEBUG]   > isVisible cambió a: ${this.isVisible}`, 'color: blue;');
         // No necesariamente necesita actualizar el tooltip, pero sí re-render
    }
    if (changedProperties.has('items')) {
        console.log(`%c[ShopPopup DEBUG]   > items cambió.`, 'color: blue;');
        this._groupItemsByCategory();
        needsInternalUpdate = true; // Si cambian los items, podría afectar al tooltip si estaba seleccionado
    }
    if (changedProperties.has('_selectedItemId')) {
        console.log(`%c[ShopPopup DEBUG]   > _selectedItemId cambió a: ${this._selectedItemId}`, 'color: blue;');
        this._updateTooltipData(); // Actualiza qué item mostrar en el tooltip
        needsInternalUpdate = true; // Necesita actualizar el tooltip
    }
    // ---> FIN LOGS <---

    // Si algo relevante para el tooltip cambió, forzamos su refresco
    // Esto es redundante si la propiedad playerDataSnapshot se pasa correctamente
    // y el tooltip reacciona a ella, pero lo dejamos como seguridad extra por ahora.
    if (needsInternalUpdate && this._tooltipElement && typeof this._tooltipElement.forceRefresh === 'function') {
         console.log(`%c[ShopPopup DEBUG]   Forzando refresh del tooltip...`, 'color: blue;');
         // Puede ser útil esperar un microtask aquí también si forceRefresh causa problemas de timing
         // queueMicrotask(() => this._tooltipElement?.forceRefresh());
         this._tooltipElement.forceRefresh();
    }
  }
  // --- FIN MÉTODO updated ---


  private _groupItemsByCategory() {
    const grouped: ItemsByCategory = {};
    this.items.forEach(item => {
      const category = item.category || 'general';
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(item);
    });
    for (const category in grouped) {
        grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    }
    this._itemsByCategory = grouped;
  }

  private _updateTooltipData() {
    // Actualiza qué item se pasa al tooltip basado en la selección
    this._selectedItemData = this._selectedItemId ? this.items.find(item => item.id === this._selectedItemId) ?? null : null;
    // Forzar actualización del tooltip aquí también podría ser una opción,
    // aunque debería reaccionar al cambio de `itemData`
    // this._tooltipElement?.forceRefresh();
  }

  private _handleItemSelection(event: CustomEvent) {
    const itemId = event.detail?.itemId;
    // ---> LOG AÑADIDO <---
    console.log(`[ShopPopup DEBUG] _handleItemSelection: Ítem seleccionado/deseleccionado: ${itemId}`);
    // ---> FIN LOG <---
    if (this._selectedItemId === itemId) {
      this._selectedItemId = null; // Deseleccionar
    } else {
      this._selectedItemId = itemId; // Seleccionar
    }
    // El cambio en _selectedItemId disparará `updated` que llamará a `_updateTooltipData`
  }

  private _handleBuyRequest(event: CustomEvent) {
    const itemId = event.detail?.itemId;
     // ---> LOG AÑADIDO <---
    console.log(`[ShopPopup DEBUG] _handleBuyRequest: Recibido buy request para: ${itemId}`);
    // ---> FIN LOG <---
    if (itemId) {
      // Re-emitir para que GameManager lo capture
      this.dispatchEvent(new CustomEvent('buy-item-requested', { detail: { itemId: itemId }, bubbles: true, composed: true }));
    }
  }

  private _handleCloseClick() {
    console.log('[ShopPopup DEBUG] Botón X clickeado, emitiendo close-requested.');
    this.dispatchEvent(new CustomEvent('close-requested', {bubbles: true, composed: true}));
  }

  private _handleHostClick(event: MouseEvent) {
    if (event.target === this) {
       console.log('[ShopPopup DEBUG] Clic en host (fondo), emitiendo close-requested.');
      this.dispatchEvent(new CustomEvent('close-requested', {bubbles: true, composed: true}));
    }
  }

  // --- Render con la lógica de habilitación modificada ---
  render() {
    // ---> LOG AÑADIDO <---
    console.log(`%c[ShopPopup DEBUG] render() ejecutado. Item seleccionado: ${this._selectedItemId}`, 'color: green;');
    // ---> FIN LOG <---
    return html`
      <div class="shop-content-box">
        <button class="shop-close-btn" @click=${this._handleCloseClick} title="Cerrar Tienda (Esc)">&times;</button>
        <h2 class="shop-title-text">Tienda de Mejoras</h2>
        <p class="shop-score-text">Puntos: ${this.playerDataSnapshot?.score ?? 0}</p>

        <div class="shop-items-container">
          ${CATEGORY_ORDER.map(category => this._itemsByCategory[category] ? html`
            <h3 class="shop-section-title">${CATEGORY_TITLES[category] || category}</h3>
            <div class="shop-section-items">
              ${this._itemsByCategory[category].map(item => {
                // --- LÓGICA DE isDisabledCard MODIFICADA (Fase 2 del plan) ---
                const isPurchased = this.playerDataSnapshot ? this._checkItemIsPurchased(item, this.playerDataSnapshot) : false;
                const canPurchaseCheck = this.playerDataSnapshot ? this._checkItemCanPurchase(item, this.playerDataSnapshot) : true; // Default a true si no hay snapshot
                const level = this.playerDataSnapshot ? this._getItemLevel(item, this.playerDataSnapshot) : -1;
                const isMaxLevel = item.isLeveled && typeof item.maxLevel === 'number' && level >= item.maxLevel;

                // La tarjeta SÓLO se deshabilita (impide selección) si:
                // 1. Ha alcanzado el nivel máximo.
                // 2. Ya se compró y NO es mejorable.
                // 3. NO cumple con los requisitos previos (canPurchaseCheck es false).
                // ¡La falta de dinero NO la deshabilita!
                const isDisabledCard = isMaxLevel || (isPurchased && !item.isLeveled) || !canPurchaseCheck;
                // --- FIN LÓGICA MODIFICADA ---

                return html`
                  <shop-item-card
                    .itemId=${item.id}
                    .icon=${item.icon || '❓'}
                    ?isDisabled=${isDisabledCard} /* Usar la nueva variable */
                    ?isPurchased=${isPurchased && !item.isLeveled} /* Solo para estilo visual */
                    ?isMaxLevel=${isMaxLevel} /* Solo para estilo visual */
                    ?isSelected=${this._selectedItemId === item.id}
                    @item-selected=${this._handleItemSelection}
                  ></shop-item-card>
                `;
              })}
            </div>
          ` : nothing)}
        </div>

        <shop-tooltip
          .itemData=${this._selectedItemData}
          .playerDataSnapshot=${this.playerDataSnapshot} /* Pasa el snapshot */
          @buy-item-requested=${this._handleBuyRequest}
          id="internal-tooltip"
        ></shop-tooltip>
      </div>
    `;
  }

  // --- Helpers ---
  private _calculateItemCost(itemData: ShopItemJsonData, playerData: PlayerData): number { const costParams = itemData.cost; let cost = costParams.base; if (itemData.isLeveled) { const levelRef = itemData.levelRef; const currentLevel = levelRef ? (playerData as any)[levelRef] ?? 0 : 0; if (costParams.type === 'exponential' && typeof costParams.multiplier === 'number') { cost = costParams.base * Math.pow(costParams.multiplier, currentLevel); } else { cost = costParams.base + (costParams.perLevel ?? 0) * currentLevel; } } else if (costParams.levelRef && typeof costParams.perLevel === 'number') { const linkedLevel = (playerData as any)[costParams.levelRef] ?? 0; cost = costParams.base + costParams.perLevel * linkedLevel; } return Math.round(cost); }
  private _checkItemIsPurchased(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.isPurchasedCheck) return false; const check = itemData.isPurchasedCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') return false; switch (check.condition) { case 'isTrue': return currentValue === true; case 'isFalse': return currentValue === false; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; default: return false; } }
  private _checkItemCanPurchase(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.purchaseCheck) return true; const check = itemData.purchaseCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') { return false; } switch (check.condition) { case 'lessThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue < check.limit; case 'lessThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue <= check.limit; case 'isFalse': return currentValue === false; case 'isTrue': return currentValue === true; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; case 'greaterThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue >= check.limit; default: return false; } }
  private _getItemLevel(itemData: ShopItemJsonData, playerData: PlayerData): number { if (!itemData.isLeveled || !itemData.levelRef) return -1; return (playerData as any)[itemData.levelRef] ?? 0; }
}

declare global { interface HTMLElementTagNameMap { 'shop-popup': ShopPopup; } }