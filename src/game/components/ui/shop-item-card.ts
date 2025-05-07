// src/game/components/ui/shop-item-card.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('shop-item-card')
export class ShopItemCard extends LitElement {

  // --- Propiedades (Inputs) --- (sin cambios)
  @property({ type: String }) itemId = '';
  @property({ type: String }) icon = '❓';
  @property({ type: Boolean, reflect: true }) isDisabled = false;
  @property({ type: Boolean, reflect: true }) isPurchased = false;
  @property({ type: Boolean, reflect: true }) isMaxLevel = false;
  @property({ type: Boolean, reflect: true }) isSelected = false;

  static styles: CSSResultGroup = css`
    :host {
      display: flex; 
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      width: 100%;
      max-width: var(--gq-shop-card-max-width, 6rem); /* Puede ser variable */
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      border-radius: var(--gq-shop-card-border-radius, 0.75rem);
      background-color: var(--gq-shop-card-bg, rgba(55, 65, 81, 0.7));
      border: var(--gq-shop-card-border, 2px solid #4b5563);
      box-shadow: var(--gq-shop-card-box-shadow, 0 0.125rem 0.25rem rgba(0,0,0,0.3));
      transition: transform 0.2s ease, background-color 0.2s ease,
                  border-color 0.2s ease, box-shadow 0.2s ease,
                  opacity 0.2s ease;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
    }

    .shop-item-icon {
      font-size: var(--gq-shop-card-icon-font-size, clamp(1.2rem, 5vmin, 1.8rem));
      line-height: 1;
      user-select: none;
      color: var(--gq-shop-card-icon-color, inherit); /* Permite tematizar color del icono */
    }

    :host(:not([isDisabled]):not([isPurchased]):not([isMaxLevel]):not([isSelected]):hover) {
      background-color: var(--gq-shop-card-hover-bg, rgba(75, 85, 99, 0.8));
      border-color: var(--gq-shop-card-hover-border-color, var(--gq-shop-card-border-color, #60a5fa)); /* Ejemplo de un color de borde en hover */
    }

    :host(:not([isDisabled]):not([isPurchased]):not([isMaxLevel]):not([isSelected]):active) {
      transform: scale(0.95);
      background-color: var(--gq-shop-card-active-bg, rgba(75, 85, 99, 0.9));
    }

    :host([isDisabled]) {
      opacity: var(--gq-shop-card-disabled-opacity, 0.5);
      cursor: default;
      border-color: var(--gq-shop-card-disabled-border-color, #374151);
      background-color: var(--gq-shop-card-disabled-bg, var(--gq-shop-card-bg)); /* Mantener bg o cambiarlo */
    }
    :host([isDisabled]:active), :host([isDisabled]:hover) {
      transform: none;
      background-color: var(--gq-shop-card-disabled-bg, var(--gq-shop-card-bg));
      border-color: var(--gq-shop-card-disabled-border-color, #374151);
      box-shadow: var(--gq-shop-card-box-shadow, 0 0.125rem 0.25rem rgba(0,0,0,0.3));
    }

    :host([isPurchased]) {
      opacity: var(--gq-shop-card-purchased-opacity, 0.7);
      cursor: default;
      border-color: var(--gq-shop-card-purchased-border-color, #f59e0b);
    }
    /* ... (estados :active y :hover para [isPurchased] y [isMaxLevel] de forma similar a [isDisabled]) ... */

    :host([isMaxLevel]) {
      opacity: var(--gq-shop-card-maxlevel-opacity, 0.8);
      cursor: default;
      border-color: var(--gq-shop-card-maxlevel-border-color, #34d399);
    }
    
    :host([isDisabled]:not([isPurchased]):not([isMaxLevel])) {
       border-color: var(--gq-shop-card-disabled-nootherstate-border-color, #374151);
       opacity: var(--gq-shop-card-disabled-nootherstate-opacity, 0.5);
    }

    :host([isSelected]) {
      border-color: var(--gq-shop-card-selected-border-color, #facc15);
      box-shadow: var(--gq-shop-card-selected-box-shadow, 0 0 0.5rem rgba(250, 204, 21, 0.6), 0 0.25rem 0.5rem rgba(0,0,0,0.4));
      transform: scale(1.05);
      background-color: var(--gq-shop-card-selected-bg, var(--gq-shop-card-hover-bg)); /* Un fondo ligeramente diferente para seleccionado */
    }
     :host([isSelected]:active) {
       transform: scale(1.02);
     }

     @media (max-width: 480px) {
        :host {
            border-radius: var(--gq-shop-card-mobile-border-radius, 0.5rem);
        }
        .shop-item-icon {
            font-size: var(--gq-shop-card-mobile-icon-font-size, clamp(1rem, 4.5vmin, 1.5rem));
        }
     }
  `;
  // --- render() y _handleClick() sin cambios ---
  render() {
    return html`
      <span class="shop-item-icon" part="icon">${this.icon}</span>
    `;
  }
  constructor() {
    super();
    this.addEventListener('click', this._handleClick);
    this.addEventListener('touchstart', this._handleClick, { passive: false });
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('touchstart', this._handleClick);
  }
  private _handleClick(event: MouseEvent | TouchEvent) {
    event.stopPropagation(); // Detiene la propagación del clic
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
    const functionallyDisabled = this.isDisabled || this.isPurchased || this.isMaxLevel;
    if (!functionallyDisabled) {
      this.dispatchEvent(new CustomEvent('item-selected', {
        detail: { itemId: this.itemId },
        bubbles: true,
        composed: true
      }));
    }
  }
}

// Declaración global
declare global {
  interface HTMLElementTagNameMap {
    'shop-item-card': ShopItemCard;
  }
}