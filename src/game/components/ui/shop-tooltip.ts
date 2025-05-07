// src/game/components/ui/shop-tooltip.ts
import { LitElement, html, css, CSSResultGroup, PropertyValueMap, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ShopItemJsonData } from '../../../types/ShopItemData'; 
import type { PlayerData } from '../../../game/PlayerData'; 

@customElement('shop-tooltip')
export class ShopTooltip extends LitElement {

  @property({ type: Object }) itemData: ShopItemJsonData | null = null;
  @property({ type: Object }) playerDataSnapshot: PlayerData | null = null;
  @property({ type: Boolean }) isVisible = false; // Esta propiedad es la que controla el atributo 'visible'

  @state() private _itemName = '...';
  @state() private _itemLevelText = '';
  @state() private _itemEffectText = 'Selecciona un ítem para ver detalles.';
  @state() private _itemCostText = '';
  @state() private _itemStatusText = '';
  @state() private _isBuyButtonDisabled = true;
  @state() private _buyButtonIcon = '💰';

  static styles: CSSResultGroup = css`
    :host {
      /* Estilos del :host sin cambios respecto a tu versión funcional */
      display: block; 
      position: relative; 
      background-color: var(--gq-shop-tooltip-bg, rgba(31, 41, 55, 0.98));
      border: var(--gq-shop-tooltip-border, 1px solid #6b7280);
      border-radius: var(--gq-shop-tooltip-border-radius, 0.85rem);
      color: var(--gq-shop-tooltip-text-color, #d1d5db);
      font-family: var(--gq-shop-tooltip-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-shop-tooltip-font-size, 0.75rem);
      text-align: left;
      box-shadow: var(--gq-shop-tooltip-box-shadow, 0 -0.3125rem 0.625rem rgba(0,0,0,0.2));
      box-sizing: border-box;
      padding: var(--gq-shop-tooltip-padding-y, 0.6rem) var(--gq-shop-tooltip-padding-x, 0.8rem);
      padding-right: calc(var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem) + var(--gq-shop-tooltip-padding-x, 1rem));
      min-height: 4rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s ease, visibility 0s linear 0.2s;
      pointer-events: none; 
    }

    :host([visible]) {
      opacity: 1;
      visibility: visible;
      pointer-events: auto; 
      transition: opacity 0.2s ease, visibility 0s linear 0s;
    }

    .tooltip-item-name {
      font-size: var(--gq-shop-tooltip-name-font-size, 0.9rem);
      font-weight: var(--gq-shop-tooltip-name-font-weight, 600);
      color: var(--gq-shop-tooltip-name-text-color, #f9fafb);
      margin-bottom: 0.15rem; display: block;
    }
    .tooltip-item-level {
      font-size: var(--gq-shop-tooltip-level-font-size, 0.7rem);
      font-weight: var(--gq-shop-tooltip-level-font-weight, 700);
      color: var(--gq-shop-tooltip-level-text-color, #6ee7b7);
      margin-bottom: 0.15rem; display: block;
    }
    .tooltip-item-level[hidden] { display: none; }

    .tooltip-item-effect {
      font-size: var(--gq-shop-tooltip-effect-font-size, 0.7rem);
      margin-bottom: 0.3rem; display: block; line-height: 1.3;
    }
    .tooltip-item-cost {
      font-size: var(--gq-shop-tooltip-cost-font-size, 0.8rem);
      font-weight: var(--gq-shop-tooltip-cost-font-weight, 600);
      color: var(--gq-shop-tooltip-cost-text-color, #facc15);
      display: block;
    }
    .tooltip-item-status {
      font-size: var(--gq-shop-tooltip-status-font-size, 0.75rem);
      font-style: italic;
      color: var(--gq-shop-tooltip-status-text-color, #fca5a5);
      margin-top: 0.3rem; display: block;
    }
     .tooltip-item-status[hidden] { display: none; }

    .tooltip-buy-btn {
      position: absolute; top: 0; right: 0; bottom: 0;
      min-width: var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem);
      width: auto; height: 100%;
      padding: 0 var(--gq-shop-tooltip-buy-btn-padding-x, 1rem);
      margin: 0; transform: none; display: flex;
      justify-content: center; align-items: center;
      background-color: var(--gq-shop-tooltip-buy-btn-bg, #4b5563);
      color: var(--gq-shop-tooltip-buy-btn-icon-color, #facc15);
      border: none;
      border-left: var(--gq-shop-tooltip-buy-btn-border-left, 1px solid rgba(107, 114, 128, 0.7));
      border-radius: 0 var(--gq-shop-tooltip-border-radius, 0.85rem) var(--gq-shop-tooltip-border-radius, 0.85rem) 0;
      box-shadow: var(--gq-shop-tooltip-buy-btn-box-shadow, inset 1px 0 2px rgba(0,0,0,0.2));
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
      font-size: var(--gq-shop-tooltip-buy-btn-icon-size, 3.4rem);
      font-weight: bold; line-height: 1;
      -webkit-tap-highlight-color: transparent;
      z-index: 1; opacity: 1;
      appearance: none; -webkit-appearance: none;
    }

    .tooltip-buy-btn[disabled] {
      background-color: var(--gq-shop-tooltip-buy-btn-disabled-bg, rgba(55, 65, 81, 0.6));
      color: var(--gq-shop-tooltip-buy-btn-disabled-icon-color, #6b7280);
      cursor: not-allowed; box-shadow: none;
      border-left-color: var(--gq-shop-tooltip-buy-btn-disabled-border-left, rgba(75, 85, 99, 0.5));
    }

    .tooltip-buy-btn:not([disabled]):hover {
      background-color: var(--gq-shop-tooltip-buy-btn-hover-bg, #5a6677);
      color: var(--gq-shop-tooltip-buy-btn-hover-icon-color, #fff);
      box-shadow: var(--gq-shop-tooltip-buy-btn-hover-box-shadow, inset 1px 0 3px rgba(0,0,0,0.3));
    }
    .tooltip-buy-btn:not([disabled]):active {
      background-color: var(--gq-shop-tooltip-buy-btn-active-bg, #6b778a);
      box-shadow: var(--gq-shop-tooltip-buy-btn-active-box-shadow, inset 1px 0 2px rgba(0,0,0,0.3));
    }
  `;

  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    let needsInternalStateUpdate = false;

    if (changedProperties.has('itemData')) {
        console.log('[shop-tooltip] itemData changed:', this.itemData);
        needsInternalStateUpdate = true;
    }
    if (changedProperties.has('playerDataSnapshot')) {
        console.log('[shop-tooltip] playerDataSnapshot changed.');
        needsInternalStateUpdate = true;
    }

    if (changedProperties.has('isVisible')) {
        console.log('[shop-tooltip] isVisible property changed to:', this.isVisible, '. Toggling [visible] attribute.');
        this.toggleAttribute('visible', this.isVisible);
        // Si se vuelve visible y ya tenemos itemData, forzamos la actualización del estado interno
        // para asegurar que el contenido se renderice correctamente.
        if (this.isVisible && this.itemData) {
            needsInternalStateUpdate = true;
        }
        // Si se oculta, limpiamos el estado interno para que muestre el mensaje por defecto la próxima vez.
        if (!this.isVisible) {
             console.log('[shop-tooltip] Hiding, resetting internal state.');
             this._itemName = '...';
             this._itemLevelText = '';
             this._itemEffectText = 'Selecciona un ítem para ver detalles.';
             this._itemCostText = '';
             this._itemStatusText = '';
             this._isBuyButtonDisabled = true;
             this._buyButtonIcon = '💰';
             // No llamamos a _updateInternalState() aquí para evitar que intente procesar itemData null
             // y potencialmente sobreescribir el estado de "limpieza" si itemData aún no es null.
             // El requestUpdate al final se encargará de re-renderizar con este estado limpio.
        }
    }

    if (needsInternalStateUpdate) {
        console.log('[shop-tooltip] Calling _updateInternalState()');
        this._updateInternalState();
    }
  }

  private _updateInternalState() {
    console.log('[shop-tooltip] _updateInternalState called. itemData:', this.itemData, 'playerDataSnapshot:', !!this.playerDataSnapshot);
    if (!this.itemData || !this.playerDataSnapshot) {
      console.log('[shop-tooltip] No itemData or playerDataSnapshot, setting default state.');
      this._itemName = '...';
      this._itemLevelText = '';
      this._itemEffectText = 'Selecciona un ítem para ver detalles.';
      this._itemCostText = '';
      this._itemStatusText = '';
      this._isBuyButtonDisabled = true;
      this._buyButtonIcon = '💰';
      return;
    }

    const cost = this._calculateItemCost(this.itemData, this.playerDataSnapshot);
    const isAffordable = this.playerDataSnapshot.score >= cost;
    const isPurchased = this._checkItemIsPurchased(this.itemData, this.playerDataSnapshot);
    const canPurchaseCheck = this._checkItemCanPurchase(this.itemData, this.playerDataSnapshot);
    const level = this._getItemLevel(this.itemData, this.playerDataSnapshot);
    const isMaxLevel = this.itemData.isLeveled && typeof this.itemData.maxLevel === 'number' && level >= this.itemData.maxLevel;
    const isCurrentlyPurchasable = !isMaxLevel && !(isPurchased && !this.itemData.isLeveled) && canPurchaseCheck && isAffordable;

    this._itemName = this.itemData.name;
    this._itemEffectText = this._formatEffectText(this.itemData, this.playerDataSnapshot);
    this._itemLevelText = (this.itemData.isLeveled && level >= 0) ? `Nivel: ${level}` : '';
    this._itemCostText = isMaxLevel ? "Nivel Máximo" : `Costo: ${cost}`;

    let statusText = '';
    if (isMaxLevel) { statusText = "Nivel Máximo Alcanzado"; }
    else if (isPurchased && !this.itemData.isLeveled) { statusText = "Ya comprado / Activo"; }
    else if (!canPurchaseCheck && !isMaxLevel) { statusText = "No disponible"; }
    else if (!isAffordable) { statusText = "Puntos insuficientes"; }
    this._itemStatusText = statusText;

    this._isBuyButtonDisabled = !isCurrentlyPurchasable;
    this._buyButtonIcon = isMaxLevel || (isPurchased && !this.itemData.isLeveled) ? '✔️' : '💰';
    console.log('[shop-tooltip] Internal state updated. Name:', this._itemName, 'Buy button disabled:', this._isBuyButtonDisabled);
  }

  // --- Métodos Helper (sin cambios) ---
  private _calculateItemCost(itemData: ShopItemJsonData, playerData: PlayerData): number { const costParams = itemData.cost; let cost = costParams.base; if (itemData.isLeveled) { const levelRef = itemData.levelRef; const currentLevel = levelRef ? (playerData as any)[levelRef] ?? 0 : 0; if (costParams.type === 'exponential' && typeof costParams.multiplier === 'number') { cost = costParams.base * Math.pow(costParams.multiplier, currentLevel); } else { cost = costParams.base + (costParams.perLevel ?? 0) * currentLevel; } } else if (costParams.levelRef && typeof costParams.perLevel === 'number') { const linkedLevel = (playerData as any)[costParams.levelRef] ?? 0; cost = costParams.base + costParams.perLevel * linkedLevel; } return Math.round(cost); }
  private _formatEffectText(itemData: ShopItemJsonData, playerData: PlayerData): string { let text = itemData.effectTemplate; text = text.replace('{lives}', playerData.lives.toString()); if (text.includes('{isActive}')) { const valueRef = itemData.isPurchasedCheck?.valueRef; const isActive = valueRef ? !!(playerData as any)[valueRef] : false; text = text.replace('{isActive}', isActive ? '(Activo)' : ''); } if (text.includes('{isUnlocked}')) { const valueRef = itemData.isPurchasedCheck?.valueRef; const isUnlocked = valueRef ? !!(playerData as any)[valueRef] : false; text = text.replace('{isUnlocked}', isUnlocked ? '(Desbloqueado)' : ''); } if (text.includes('{charges}')) { const valueRef = itemData.isPurchasedCheck?.valueRef; const charges = valueRef ? (playerData as any)[valueRef] ?? 0 : 0; text = text.replace('{charges}', charges > 0 ? `(Cargas: ${charges})` : ''); } if (text.includes('{currentValue}')) { let currentValue: string | number = '?'; if (itemData.id === 'comboMultiplier') { currentValue = playerData.getCurrentComboMultiplier().toFixed(1); } else if (itemData.id === 'inkCostReduction') { currentValue = playerData.getCurrentInkCostPerPixel().toFixed(2); } else if (itemData.id === 'extraCat') { currentValue = playerData.getCatsPerCorrectAnswer(); } else if (itemData.id === 'maxCats') { currentValue = playerData.getMaxCatsAllowed(); } else if (itemData.id === 'maxCatSize') { currentValue = playerData.getCurrentMaxSizeLimit(); } else if (itemData.id === 'refillCatFood') { currentValue = playerData.currentCatFood; } text = text.replace('{currentValue}', currentValue.toString()); } return text; }
  private _checkItemIsPurchased(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.isPurchasedCheck) return false; const check = itemData.isPurchasedCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') return false; switch (check.condition) { case 'isTrue': return currentValue === true; case 'isFalse': return currentValue === false; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; default: return false; } }
  private _checkItemCanPurchase(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.purchaseCheck) return true; const check = itemData.purchaseCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') { return false; } switch (check.condition) { case 'lessThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue < check.limit; case 'lessThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue <= check.limit; case 'isFalse': return currentValue === false; case 'isTrue': return currentValue === true; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; case 'greaterThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue >= check.limit; default: return false; } }
  private _getItemLevel(itemData: ShopItemJsonData, playerData: PlayerData): number { if (!itemData.isLeveled || !itemData.levelRef) return -1; return (playerData as any)[itemData.levelRef] ?? 0; }

  private _handleBuyClick(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
    if (this._isBuyButtonDisabled || !this.itemData) {
      return;
    }
    console.log('[shop-tooltip] buy-item-requested evento emitido para:', this.itemData.id);
    this.dispatchEvent(new CustomEvent('buy-item-requested', {
      detail: { itemId: this.itemData.id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    console.log('[shop-tooltip] render() llamado. isVisible:', this.isVisible, 'itemData:', !!this.itemData);
    const levelTemplate = this._itemLevelText ? html`<span class="tooltip-item-level" part="level">${this._itemLevelText}</span>` : nothing;
    const statusTemplate = this._itemStatusText ? html`<span class="tooltip-item-status" part="status">${this._itemStatusText}</span>` : nothing;

    return html`
      <div part="content-area">
        <span class="tooltip-item-name" part="name">${this._itemName}</span>
        ${levelTemplate}
        <span class="tooltip-item-effect" part="effect">${this._itemEffectText}</span>
        <span class="tooltip-item-cost" part="cost">${this._itemCostText}</span>
        ${statusTemplate}
      </div>
      <button
        class="tooltip-buy-btn"
        part="buy-button"
        ?disabled=${this._isBuyButtonDisabled}
        @click=${this._handleBuyClick}
        @touchstart=${this._handleBuyClick}
      >
        ${this._buyButtonIcon}
      </button>
    `;
  }
}
