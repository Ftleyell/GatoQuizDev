// src/game/components/ui/shop-button.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('shop-button-component')
export class ShopButtonComponent extends LitElement {

  @property({ type: String }) titleText = 'Abrir Tienda (S)';
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles: CSSResultGroup = css`
    :host {
      /* --- INICIO: Posicionamiento Fijo (Se mantiene) --- */
      position: fixed;
      top: var(--gq-shopbtn-pos-top, 0.8rem); /* Ajustado para estar más arriba */
      right: var(--gq-shopbtn-pos-right, 0.8rem); /* Ajustado */
      z-index: var(--gq-shopbtn-z-index, 31);
      pointer-events: auto;
      /* --- FIN: Posicionamiento Fijo --- */

      display: inline-flex;
      justify-content: center;
      align-items: center;
      /* --- INICIO: Estilos de Apariencia (Usando vars --gq-toolbtn como fallback/base) --- */
      width: var(--gq-shopbtn-size, var(--gq-toolbtn-size, 3rem)); /* Usa var de toolbtn como fallback */
      height: var(--gq-shopbtn-size, var(--gq-toolbtn-size, 3rem));
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      background-color: var(--gq-shopbtn-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8)));
      color: var(--gq-shopbtn-text-color, var(--gq-toolbtn-text-color, #e5e7eb));
      border: var(--gq-shopbtn-border, var(--gq-toolbtn-border, 2px solid #4b5563));
      border-radius: var(--gq-shopbtn-border-radius, var(--gq-toolbtn-border-radius, 0.5rem));
      padding: var(--gq-shopbtn-padding, var(--gq-toolbtn-padding, 0.5rem));
      font-size: var(--gq-shopbtn-font-size, var(--gq-toolbtn-font-size, 1.1rem));
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.1s ease,
                  opacity 0.2s ease;
      box-shadow: var(--gq-shopbtn-box-shadow, var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3)));
      /* --- FIN: Estilos de Apariencia --- */
    }

    .shop-button-internal {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      background: transparent; border: none; padding: 0; margin: 0;
      font: inherit; color: inherit; cursor: inherit; outline: none;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
    }

    /* Contenido del icono (se mantiene igual) */
    .shop-button-internal::before {
      content: var(--gq-shop-button-icon-content, '🛒'); /* Icono por defecto */
      font-family: var(--gq-shop-button-font-family, inherit);
    }

    /* Hover (usando vars de toolbtn como fallback) */
    :host(:not([disabled]):hover) {
      background-color: var(--gq-shopbtn-hover-bg, var(--gq-toolbtn-hover-bg, rgba(31, 41, 55, 0.9)));
      border-color: var(--gq-shopbtn-hover-border-color, var(--gq-toolbtn-hover-border-color, #6b7280)));
      /* Opcional: Añadir un ligero scale en hover si se desea */
      /* transform: scale(1.05); */
    }

    /* Active (presionado) (usando vars de toolbtn como fallback) */
    :host(:not([disabled]):active) {
      transform: scale(0.95); /* Similar a tool-button */
      background-color: var(--gq-shopbtn-pressed-bg, var(--gq-toolbtn-pressed-bg, rgba(55, 65, 81, 0.9)));
    }

    /* Estado deshabilitado (usando vars de toolbtn como fallback) */
    :host([disabled]) {
      opacity: var(--gq-shopbtn-disabled-opacity, var(--gq-toolbtn-disabled-opacity, 0.5));
      cursor: not-allowed;
      transform: none !important;
      background-color: var(--gq-shopbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8))));
      border-color: var(--gq-shopbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border, 2px solid #4b5563)));
      box-shadow: var(--gq-shopbtn-box-shadow, var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3)));
    }
     :host([disabled]:hover) { /* Evitar cambios en hover si está deshabilitado */
       background-color: var(--gq-shopbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg)));
       border-color: var(--gq-shopbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color));
     }

    /* --- INICIO: Media Queries (Adaptado de tool-button) --- */
    /* Desktop/Tablet (usando vars desktop de toolbtn como fallback) */
    @media (min-width: 769px) { /* Umbral mayor para asegurar que no choque con los controles centrales en tablet */
      :host {
        width: var(--gq-shopbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        height: var(--gq-shopbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        font-size: var(--gq-shopbtn-desktop-font-size, var(--gq-toolbtn-desktop-font-size, 1.2rem));
        padding: var(--gq-shopbtn-desktop-padding, var(--gq-toolbtn-desktop-padding, 0.6rem));
         /* Mantener posición fija */
        top: var(--gq-shopbtn-pos-top-desktop, var(--gq-shopbtn-pos-top, 0.8rem));
        right: var(--gq-shopbtn-pos-right-desktop, var(--gq-shopbtn-pos-right, 0.8rem));
      }
    }

    /* Tablet (puede heredar de base o usar vars específicas si existen) */
     @media (min-width: 481px) and (max-width: 768px) {
        :host {
            /* Usar valores base o definir --gq-shopbtn-size-tablet, etc. si es necesario */
            /* Mantener posición fija */
            top: var(--gq-shopbtn-pos-top-tablet, var(--gq-shopbtn-pos-top, 0.6rem));
            right: var(--gq-shopbtn-pos-right-tablet, var(--gq-shopbtn-pos-right, 0.6rem));
        }
     }

    /* Móvil (usando vars mobile de toolbtn como fallback) */
    @media (max-width: 480px) {
      :host {
        width: var(--gq-shopbtn-size-mobile, var(--gq-toolbtn-size, 3rem));
        height: var(--gq-shopbtn-size-mobile, var(--gq-toolbtn-size, 3rem));
        font-size: var(--gq-shopbtn-font-size-mobile, var(--gq-toolbtn-font-size, 1.1rem));
        padding: var(--gq-shopbtn-padding-mobile, var(--gq-toolbtn-padding, 0.5rem));
        /* Mantener posición fija */
        top: var(--gq-shopbtn-pos-top-mobile, 0.5rem);
        right: var(--gq-shopbtn-pos-right-mobile, 0.5rem);
      }
    }
    /* --- FIN: Media Queries --- */
  `;

  // El resto de la clase (render, _handleClick) no necesita cambios

  render() {
    return html`
      <button
        class="shop-button-internal"
        title=${this.titleText}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
        aria-label=${this.titleText}
        tabindex="0"
      >
        </button>
    `;
  }

  private _handleClick(event: MouseEvent | TouchEvent) {
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    if (this.disabled) {
      return;
    }
    // Emitir un evento genérico para que GameManager lo capture
    this.dispatchEvent(new CustomEvent('shop-button-interaction', {
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'shop-button-component': ShopButtonComponent;
  }
}