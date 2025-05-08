// src/game/components/ui/shop-tooltip.ts
import { LitElement, html, css, CSSResultGroup, PropertyValueMap, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// ---> AÑADIR classMap <---
import { classMap } from 'lit/directives/class-map.js';
// ---> FIN AÑADIR classMap <---
import type { ShopItemJsonData } from '../../../types/ShopItemData';
import type { PlayerData } from '../../../game/PlayerData';

const DEFAULT_EMPTY_MESSAGE = 'Selecciona un ítem para ver sus detalles.';
// ---> NUEVO TIPO: Para el estado del botón <---
type BuyButtonState = 'affordable' | 'unaffordable' | 'disabled' | 'empty';
// ---> FIN NUEVO TIPO <---

@customElement('shop-tooltip')
export class ShopTooltip extends LitElement {

  @property({ type: Object }) itemData: ShopItemJsonData | null = null;
  @property({ type: Object }) playerDataSnapshot: PlayerData | null = null;

  // Estados internos existentes
  @state() private _itemName = '...';
  @state() private _itemLevelText = '';
  @state() private _itemEffectText = DEFAULT_EMPTY_MESSAGE;
  @state() private _itemCostText = '';
  @state() private _itemStatusText = ''; // Ya no mostrará "Puntos insuficientes"
  @state() private _isBuyButtonDisabled = true; // Para la funcionalidad real del botón
  @state() private _buyButtonIcon = '💰';
  @state() private _isEmpty = true;

  // ---> NUEVO ESTADO para controlar el estilo visual del botón <---
  @state() private _buyButtonState: BuyButtonState = 'empty';
  // ---> FIN NUEVO ESTADO <---


  // --- Estilos CSS MODIFICADOS ---
  static styles: CSSResultGroup = css`
    :host {
      /* ... (Estilos :host y estado [empty] sin cambios) ... */
      display: block; position: relative;
      background-color: var(--gq-shop-tooltip-bg, rgba(31, 41, 55, 0.98));
      border: var(--gq-shop-tooltip-border, 1px solid #6b7280);
      border-radius: var(--gq-shop-tooltip-border-radius, 0.85rem);
      color: var(--gq-shop-tooltip-text-color, #d1d5db);
      font-family: var(--gq-shop-tooltip-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-shop-tooltip-font-size, 0.60rem);
      text-align: left;
      box-shadow: var(--gq-shop-tooltip-box-shadow, 0 -0.3125rem 0.625rem rgba(0,0,0,0.2));
      box-sizing: border-box;
      padding: var(--gq-shop-tooltip-padding-y, 0.6rem) var(--gq-shop-tooltip-padding-x, 0.8rem);
      padding-right: calc(var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem) + var(--gq-shop-tooltip-padding-x, 1rem));
      pointer-events: auto;
      min-height: 8rem;

    }
    :host([empty]) .tooltip-item-name { /* ... */ color: var(--gq-shop-tooltip-empty-name-color, var(--gq-shop-tooltip-name-text-color, #ababab)); font-style: italic; }
    :host([empty]) .tooltip-item-effect { /* ... */ color: var(--gq-shop-tooltip-empty-effect-color, var(--gq-shop-tooltip-text-color, #9ca3af)); font-style: italic; text-align: center; margin-top: 0.5rem; }
    :host([empty]) .tooltip-item-level, :host([empty]) .tooltip-item-cost, :host([empty]) .tooltip-item-status { display: none; }
    :host([empty]) .tooltip-buy-btn { opacity: 0.3; cursor: default; pointer-events: none; }

    /* Estilos internos (name, level, effect, cost, status - sin cambios) */
    .tooltip-item-name { /* ... */ font-size: var(--gq-shop-tooltip-name-font-size, 0.9rem); font-weight: var(--gq-shop-tooltip-name-font-weight, 600); color: var(--gq-shop-tooltip-name-text-color, #f9fafb); margin-bottom: 0.15rem; display: block; }
    .tooltip-item-level { /* ... */ font-size: var(--gq-shop-tooltip-level-font-size, 0.7rem); font-weight: var(--gq-shop-tooltip-level-font-weight, 700); color: var(--gq-shop-tooltip-level-text-color, #6ee7b7); margin-bottom: 0.15rem; display: block; }
    .tooltip-item-level[hidden] { display: none; }
    .tooltip-item-effect { /* ... */ font-size: var(--gq-shop-tooltip-effect-font-size, 0.7rem); margin-bottom: 0.3rem; display: block; line-height: 1.3; }
    .tooltip-item-cost { /* ... */ font-size: var(--gq-shop-tooltip-cost-font-size, 0.8rem); font-weight: var(--gq-shop-tooltip-cost-font-weight, 600); color: var(--gq-shop-tooltip-cost-text-color, #facc15); display: block; }
    .tooltip-item-status { /* ... */ font-size: var(--gq-shop-tooltip-status-font-size, 0.75rem); font-style: italic; color: var(--gq-shop-tooltip-status-text-color, #fca5a5); margin-top: 0.3rem; display: block; }
    .tooltip-item-status[hidden] { display: none; }

    /* --- Estilos Botón de Compra MODIFICADOS --- */
    .tooltip-buy-btn {
      /* Estilos base (posición, tamaño, fuente, etc. - sin cambios) */
      position: absolute; top: 0; right: 0; bottom: 0;
      min-width: var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem);
      width: auto; height: 100%;
      margin: 0; transform: none; display: flex;
      justify-content: center; align-items: center;
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

      /* Color de fondo y de icono por defecto (cuando no aplica ninguno de los estados) */
      background-color: var(--gq-shop-tooltip-buy-btn-bg, #4b5563);
      color: var(--gq-shop-tooltip-buy-btn-icon-color, #facc15);
    }

    /* Estado: Comprable (Affordable) */
    .tooltip-buy-btn.affordable {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-affordable, #10B981);
      color: var(--gq-shop-tooltip-buy-btn-icon-color-affordable, #FFFFFF);
      cursor: pointer; /* Asegurar cursor pointer */
    }
    .tooltip-buy-btn.affordable:hover {
      background-color: var(--gq-shop-tooltip-buy-btn-hover-bg-affordable, #059669);
      /* color: var(--gq-shop-tooltip-buy-btn-hover-icon-color-affordable, var(--gq-shop-tooltip-buy-btn-icon-color-affordable, #FFFFFF)); */
      box-shadow: var(--gq-shop-tooltip-buy-btn-hover-box-shadow, inset 1px 0 3px rgba(0,0,0,0.3));
    }
    .tooltip-buy-btn.affordable:active {
      background-color: var(--gq-shop-tooltip-buy-btn-active-bg, var(--gq-shop-tooltip-buy-btn-hover-bg-affordable, #059669)); /* Reutilizar hover o definir active específico */
      box-shadow: var(--gq-shop-tooltip-buy-btn-active-box-shadow, inset 1px 0 2px rgba(0,0,0,0.3));
    }

    /* Estado: No Comprable por Puntos (Unaffordable) */
    .tooltip-buy-btn.unaffordable {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-unaffordable, #EF4444);
      color: var(--gq-shop-tooltip-buy-btn-icon-color-unaffordable, #FFFFFF);
      cursor: not-allowed; /* Cursor indica no comprable */
      opacity: 0.8; /* Ligeramente más tenue que affordable */
    }
    /* Evitar cambios de hover/active si no es comprable */
    .tooltip-buy-btn.unaffordable:hover,
    .tooltip-buy-btn.unaffordable:active {
        background-color: var(--gq-shop-tooltip-buy-btn-bg-unaffordable, #EF4444); /* Mantiene color rojo */
        color: var(--gq-shop-tooltip-buy-btn-icon-color-unaffordable, #FFFFFF);
        box-shadow: var(--gq-shop-tooltip-buy-btn-box-shadow, inset 1px 0 2px rgba(0,0,0,0.2)); /* Sombra base */
        transform: none; /* Sin efecto de escala/movimiento */
    }


    /* Estado: Deshabilitado por otras razones (MaxLevel, Purchased, ReqNotMet) */
    /* Usamos la clase 'disabled-state' para el estilo visual, */
    /* mientras que el atributo 'disabled' maneja la funcionalidad */
    .tooltip-buy-btn.disabled-state {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-disabled, rgba(55, 65, 81, 0.6));
      color: var(--gq-shop-tooltip-buy-btn-disabled-icon-color, #6b7280);
      cursor: not-allowed;
      opacity: 0.6; /* Opacidad de deshabilitado */
      box-shadow: none;
      border-left-color: var(--gq-shop-tooltip-buy-btn-disabled-border-left, rgba(75, 85, 99, 0.5));
    }
    .tooltip-buy-btn.disabled-state:hover,
    .tooltip-buy-btn.disabled-state:active {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-disabled, rgba(55, 65, 81, 0.6));
      color: var(--gq-shop-tooltip-buy-btn-disabled-icon-color, #6b7280);
      transform: none;
      box-shadow: none;
    }
    /* --- FIN Estilos Botón de Compra MODIFICADOS --- */
  `;

  connectedCallback(): void {
    super.connectedCallback();
    this._updateInternalState();
    this.toggleAttribute('empty', this._isEmpty);
  }

  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    let needsInternalStateUpdate = false;
    // Logs de DEBUG (mantener por ahora)
    console.log(`%c[ShopTooltip DEBUG] updated()`, 'color: orange; font-weight: bold;', "Cambios:", Array.from(changedProperties.keys()));
    if (changedProperties.has('playerDataSnapshot')) {
        const oldVal = changedProperties.get('playerDataSnapshot') as PlayerData | null;
        const newVal = this.playerDataSnapshot;
        const oldLevel = oldVal?.comboMultiplierLevel ?? 'N/A';
        const newLevel = newVal?.comboMultiplierLevel ?? 'N/A';
        console.log(`%c[ShopTooltip DEBUG]   > playerDataSnapshot cambió. Nivel Combo Anterior: ${oldLevel}, Nuevo: ${newLevel}. Llamando a _updateInternalState...`, 'color: orange;');
        needsInternalStateUpdate = true;
    }
    if (changedProperties.has('itemData')) {
        console.log(`%c[ShopTooltip DEBUG]   > itemData cambió a ID: ${this.itemData?.id ?? 'null'}. Llamando a _updateInternalState...`, 'color: orange;');
        needsInternalStateUpdate = true;
    }

    if (needsInternalStateUpdate) {
        this._updateInternalState();
        this.toggleAttribute('empty', this._isEmpty);
    }
  }

  /** Forzar el recálculo y actualización del estado interno del tooltip. */
  public forceRefresh(): void {
      console.log(`%c[ShopTooltip DEBUG] forceRefresh() llamado.`, 'color: orange; font-weight: bold;');
      this._updateInternalState();
      this.toggleAttribute('empty', this._isEmpty);
      this.requestUpdate();
  }

  // --- MÉTODO _updateInternalState MODIFICADO ---
  private _updateInternalState() {
    const levelBeforeCalc = this.itemData?.levelRef && this.playerDataSnapshot ? this.playerDataSnapshot[this.itemData.levelRef as keyof PlayerData] : 'N/A';
    console.log(`%c[ShopTooltip DEBUG internalState] INICIO _updateInternalState. Item ID: ${this.itemData?.id ?? 'null'}, Snapshot Nivel (${this.itemData?.levelRef ?? '?'}): ${levelBeforeCalc}`, 'color: purple;');

    this._isEmpty = !this.itemData;

    if (this._isEmpty || !this.playerDataSnapshot) {
      // Estado Vacío
      this._itemName = 'Tienda';
      this._itemLevelText = '';
      this._itemEffectText = DEFAULT_EMPTY_MESSAGE;
      this._itemCostText = '';
      this._itemStatusText = '';
      this._isBuyButtonDisabled = true; // Botón funcionalmente deshabilitado
      this._buyButtonState = 'empty';   // Estado visual 'empty'
      this._buyButtonIcon = '🐈';
      console.log(`%c[ShopTooltip DEBUG internalState] FIN Estado Vacío aplicado.`, 'color: purple;');
    } else {
      // Estado con Ítem Seleccionado
      const item = this.itemData!;
      const player = this.playerDataSnapshot!;

      const cost = this._calculateItemCost(item, player);
      const isAffordable = player.score >= cost;
      const isPurchased = this._checkItemIsPurchased(item, player);
      const canPurchaseCheck = this._checkItemCanPurchase(item, player);
      const level = this._getItemLevel(item, player);
      const isMaxLevel = item.isLeveled && typeof item.maxLevel === 'number' && level >= item.maxLevel;
      const isCurrentlyPurchasable = !isMaxLevel && !(isPurchased && !item.isLeveled) && canPurchaseCheck && isAffordable;

      // --- Lógica Modificada ---
      // 1. Calcular estado funcional del botón
      this._isBuyButtonDisabled = !isCurrentlyPurchasable;

      // 2. Calcular estado VISUAL del botón
      if (isMaxLevel || (isPurchased && !item.isLeveled) || !canPurchaseCheck) {
          this._buyButtonState = 'disabled'; // Deshabilitado por razón distinta al costo
      } else if (isAffordable) {
          this._buyButtonState = 'affordable'; // Se puede comprar
      } else {
          this._buyButtonState = 'unaffordable'; // No se puede por puntos
      }

      // 3. Actualizar textos (sin "Puntos insuficientes")
      this._itemName = item.name;
      this._itemEffectText = this._formatEffectText(item, player);
      this._itemLevelText = (item.isLeveled && level >= 0) ? `Nivel: ${level}` : '';
      this._itemCostText = isMaxLevel ? "Nivel Máximo" : `Costo: ${cost}`;

      let statusText = '';
      if (isMaxLevel) { statusText = "Nivel Máximo Alcanzado"; }
      else if (isPurchased && !item.isLeveled) { statusText = "Ya comprado / Activo"; }
      else if (!canPurchaseCheck && !isMaxLevel) { statusText = "No disponible"; }
      // Ya no ponemos el texto de puntos insuficientes aquí
      this._itemStatusText = statusText;

      // 4. Icono del botón
      this._buyButtonIcon = isMaxLevel || (isPurchased && !item.isLeveled) ? '✔️' : '💰';
      // --- Fin Lógica Modificada ---

       console.log(`%c[ShopTooltip DEBUG internalState] FIN Calculado: Nivel Txt='${this._itemLevelText}', Costo Txt='${this._itemCostText}', Btn Func Disabled=${this._isBuyButtonDisabled}, Btn Visual State='${this._buyButtonState}'`, 'color: purple;');
    }
  }
  // --- FIN MÉTODO _updateInternalState ---


  // --- Métodos Helper (sin cambios) ---
  private _calculateItemCost(itemData: ShopItemJsonData, playerData: PlayerData): number { const costParams = itemData.cost; let cost = costParams.base; if (itemData.isLeveled) { const levelRef = itemData.levelRef; const currentLevel = levelRef ? (playerData as any)[levelRef] ?? 0 : 0; if (costParams.type === 'exponential' && typeof costParams.multiplier === 'number') { cost = costParams.base * Math.pow(costParams.multiplier, currentLevel); } else { cost = costParams.base + (costParams.perLevel ?? 0) * currentLevel; } } else if (costParams.levelRef && typeof costParams.perLevel === 'number') { const linkedLevel = (playerData as any)[costParams.levelRef] ?? 0; cost = costParams.base + costParams.perLevel * linkedLevel; } return Math.round(cost); }
  private _formatEffectText(itemData: ShopItemJsonData, playerData: PlayerData): string { let text = itemData.effectTemplate; text = text.replace('{lives}', playerData.lives.toString()); if (text.includes('{isActive}')) { const valueRef = itemData.isPurchasedCheck?.valueRef; const isActive = valueRef ? !!(playerData as any)[valueRef] : false; text = text.replace('{isActive}', isActive ? '(Activo)' : ''); } if (text.includes('{isUnlocked}')) { const valueRef = itemData.isPurchasedCheck?.valueRef; const isUnlocked = valueRef ? !!(playerData as any)[valueRef] : false; text = text.replace('{isUnlocked}', isUnlocked ? '(Desbloqueado)' : ''); } if (text.includes('{charges}')) { const valueRef = itemData.isPurchasedCheck?.valueRef; const charges = valueRef ? (playerData as any)[valueRef] ?? 0 : 0; text = text.replace('{charges}', charges > 0 ? `(Cargas: ${charges})` : ''); } if (text.includes('{currentValue}')) { let currentValue: string | number = '?'; if (itemData.id === 'comboMultiplier') { currentValue = playerData.getCurrentComboMultiplier().toFixed(1); } else if (itemData.id === 'inkCostReduction') { currentValue = playerData.getCurrentInkCostPerPixel().toFixed(2); } else if (itemData.id === 'extraCat') { currentValue = playerData.getCatsPerCorrectAnswer(); } else if (itemData.id === 'maxCats') { currentValue = playerData.getMaxCatsAllowed(); } else if (itemData.id === 'maxCatSize') { currentValue = playerData.getCurrentMaxSizeLimit(); } else if (itemData.id === 'refillCatFood') { currentValue = playerData.currentCatFood; } text = text.replace('{currentValue}', currentValue.toString()); } return text; }
  private _checkItemIsPurchased(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.isPurchasedCheck) return false; const check = itemData.isPurchasedCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') return false; switch (check.condition) { case 'isTrue': return currentValue === true; case 'isFalse': return currentValue === false; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; default: return false; } }
  private _checkItemCanPurchase(itemData: ShopItemJsonData, playerData: PlayerData): boolean { if (!itemData.purchaseCheck) return true; const check = itemData.purchaseCheck; const valueRef = check.valueRef; const currentValue = (playerData as any)[valueRef]; if (typeof currentValue === 'undefined') { return false; } switch (check.condition) { case 'lessThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue < check.limit; case 'lessThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue <= check.limit; case 'isFalse': return currentValue === false; case 'isTrue': return currentValue === true; case 'greaterThan': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue > check.limit; case 'greaterThanOrEqual': return typeof currentValue === 'number' && typeof check.limit === 'number' && currentValue >= check.limit; default: return false; } }
  private _getItemLevel(itemData: ShopItemJsonData, playerData: PlayerData): number { if (!itemData.isLeveled || !itemData.levelRef) return -1; return (playerData as any)[itemData.levelRef] ?? 0; }


  private _handleBuyClick(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    if (event.type === 'touchstart') { event.preventDefault(); }
    // La condición aquí usa el estado funcional _isBuyButtonDisabled
    if (this._isBuyButtonDisabled || this._isEmpty || !this.itemData) {
      return;
    }
    this.dispatchEvent(new CustomEvent('buy-item-requested', {
      detail: { itemId: this.itemData.id },
      bubbles: true,
      composed: true
    }));
  }

  // --- Render MODIFICADO para usar classMap en el botón ---
  render() {
    const levelTemplate = html`<span class="tooltip-item-level" part="level">${this._itemLevelText}</span>`;
    const costTemplate = html`<span class="tooltip-item-cost" part="cost">${this._itemCostText}</span>`;
    const statusTemplate = html`<span class="tooltip-item-status" part="status">${this._itemStatusText}</span>`;

    // Crear mapa de clases para el botón de compra
    const buyButtonClasses = {
        'tooltip-buy-btn': true,
        'affordable': this._buyButtonState === 'affordable',
        'unaffordable': this._buyButtonState === 'unaffordable',
        'disabled-state': this._buyButtonState === 'disabled',
        'empty-state': this._buyButtonState === 'empty', // Podrías añadir estilos específicos para empty
    };

    return html`
      <div part="content-area">
        <span class="tooltip-item-name" part="name">${this._itemName}</span>
        ${this._itemLevelText ? levelTemplate : nothing}
        <span class="tooltip-item-effect" part="effect">${this._itemEffectText}</span>
        ${this._itemCostText ? costTemplate : nothing}
        ${this._itemStatusText ? statusTemplate : nothing}
      </div>
      <button
        class=${classMap(buyButtonClasses)} /* Aplicar clases dinámicas */
        part="buy-button"
        ?disabled=${this._isBuyButtonDisabled || this._isEmpty} /* Controla si se puede hacer clic */
        @click=${this._handleBuyClick}
        @touchstart=${this._handleBuyClick}
        aria-label="Comprar ${this._itemName || 'ítem'}"
      >
        ${this._buyButtonIcon}
      </button>
    `;
  }
  // --- FIN Render MODIFICADO ---
}

declare global { interface HTMLElementTagNameMap { 'shop-tooltip': ShopTooltip; } }