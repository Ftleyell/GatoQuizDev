// src/game/components/ui/options-button-component.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('options-button-component')
export class OptionsButtonComponent extends LitElement {

  @property({ type: String }) titleText = 'Abrir Opciones (O)'; // Ejemplo de tecla de acceso rápido
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) icon = '⚙️'; // Icono por defecto

  static styles: CSSResultGroup = css`
    :host {
      position: fixed; /* Posicionamiento fijo */
      /* Por defecto: Esquina superior izquierda */
      top: var(--gq-optionsbtn-pos-top, 0.8rem);
      left: var(--gq-optionsbtn-pos-left, 0.8rem);
      /* Si quisieras que por defecto sea bottom-left, cambiarías 'top' por 'bottom' */
      /* bottom: var(--gq-optionsbtn-pos-bottom, 0.8rem); */
      /* left: var(--gq-optionsbtn-pos-left, 0.8rem); */

      z-index: var(--gq-optionsbtn-z-index, 31); /* Similar a shop-button */
      pointer-events: auto;

      /* Estilos base tomados de tool-button/shop-button */
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: var(--gq-optionsbtn-size, var(--gq-toolbtn-size, 3rem));
      height: var(--gq-optionsbtn-size, var(--gq-toolbtn-size, 3rem));
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      background-color: var(--gq-optionsbtn-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8))); /* Variable específica con fallback a toolbtn */
      color: var(--gq-optionsbtn-text-color, var(--gq-toolbtn-text-color, #e5e7eb));
      border: var(--gq-optionsbtn-border, var(--gq-toolbtn-border, 2px solid #4b5563));
      border-radius: var(--gq-optionsbtn-border-radius, var(--gq-toolbtn-border-radius, 0.5rem));
      padding: var(--gq-optionsbtn-padding, var(--gq-toolbtn-padding, 0.5rem));
      font-size: var(--gq-optionsbtn-icon-font-size, var(--gq-toolbtn-font-size, 1.1rem));
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.1s ease,
                  opacity 0.2s ease;
      box-shadow: var(--gq-optionsbtn-box-shadow, var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3)));
    }

    .options-button-internal {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      background: transparent; border: none; padding: 0; margin: 0;
      font: inherit; color: inherit; cursor: inherit; outline: none;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
    }

    /* Hover (usando vars específicas con fallback a toolbtn) */
    :host(:not([disabled]):hover) {
      background-color: var(--gq-optionsbtn-hover-bg, var(--gq-toolbtn-hover-bg, rgba(31, 41, 55, 0.9)));
      border-color: var(--gq-optionsbtn-hover-border-color, var(--gq-toolbtn-hover-border-color, #6b7280));
    }

    /* Active (presionado) (usando vars específicas con fallback a toolbtn) */
    :host(:not([disabled]):active) {
      transform: scale(0.95);
      background-color: var(--gq-optionsbtn-pressed-bg, var(--gq-toolbtn-pressed-bg, rgba(55, 65, 81, 0.9)));
    }

    /* Estado deshabilitado (usando vars específicas con fallback a toolbtn) */
    :host([disabled]) {
      opacity: var(--gq-optionsbtn-disabled-opacity, var(--gq-toolbtn-disabled-opacity, 0.5));
      cursor: not-allowed;
      transform: none !important;
      background-color: var(--gq-optionsbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg)));
      border-color: var(--gq-optionsbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border)));
    }
     :host([disabled]:hover) {
       background-color: var(--gq-optionsbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg)));
       border-color: var(--gq-optionsbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color));
     }

    /* --- Media Queries para Posicionamiento y Tamaño --- */
    /* Desktop (769px en adelante) - Esquina Superior Izquierda por defecto */
    @media (min-width: 769px) {
      :host {
        width: var(--gq-optionsbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        height: var(--gq-optionsbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        font-size: var(--gq-optionsbtn-icon-desktop-font-size, var(--gq-toolbtn-desktop-font-size, 1.2rem));
        padding: var(--gq-optionsbtn-desktop-padding, var(--gq-toolbtn-desktop-padding, 0.6rem));
        
        /* Replicar valores de shopbtn-pos-top-desktop y shopbtn-pos-right-desktop pero para top y left */
        top: var(--gq-optionsbtn-pos-top-desktop, var(--gq-shopbtn-pos-top-desktop, 0.8rem));
        left: var(--gq-optionsbtn-pos-left-desktop, var(--gq-shopbtn-pos-right-desktop, 0.8rem)); /* Usa el valor de 'right' del shop button para 'left' */
        /* Si necesitas que esté en otra esquina, ajusta top/left/bottom/right aquí */
        /* Ejemplo para bottom-left:
        bottom: var(--gq-optionsbtn-pos-bottom-desktop, var(--gq-shopbtn-pos-bottom-desktop, 0.8rem)); 
        left: var(--gq-optionsbtn-pos-left-desktop, var(--gq-shopbtn-pos-right-desktop, 0.8rem));
        top: auto; right: auto; 
        */
      }
    }

    /* Tablet (481px a 768px) - Esquina Superior Izquierda por defecto */
     @media (min-width: 481px) and (max-width: 768px) {
        :host {
            /* Usar valores base o definir vars específicas para tablet */
            width: var(--gq-optionsbtn-tablet-size, var(--gq-toolbtn-size, 3rem));
            height: var(--gq-optionsbtn-tablet-size, var(--gq-toolbtn-size, 3rem));
            font-size: var(--gq-optionsbtn-icon-tablet-font-size, var(--gq-toolbtn-font-size, 1.1rem));
            padding: var(--gq-optionsbtn-tablet-padding, var(--gq-toolbtn-padding, 0.5rem));

            /* Replicar valores de shopbtn-pos-top-tablet y shopbtn-pos-right-tablet pero para top y left */
            top: var(--gq-optionsbtn-pos-top-tablet, var(--gq-shopbtn-pos-top-tablet, 0.6rem));
            left: var(--gq-optionsbtn-pos-left-tablet, var(--gq-shopbtn-pos-right-tablet, 0.6rem));
            /* Ejemplo para bottom-left:
            bottom: var(--gq-optionsbtn-pos-bottom-tablet, var(--gq-shopbtn-pos-bottom-tablet, 0.6rem));
            left: var(--gq-optionsbtn-pos-left-tablet, var(--gq-shopbtn-pos-right-tablet, 0.6rem));
            top: auto; right: auto;
            */
        }
     }

    /* Móvil (hasta 480px) - Esquina Superior Izquierda por defecto */
    @media (max-width: 480px) {
      :host {
        width: var(--gq-optionsbtn-mobile-size, var(--gq-toolbtn-size-mobile, 3rem)); /* Ajustado para coincidir con shop-button */
        height: var(--gq-optionsbtn-mobile-size, var(--gq-toolbtn-size-mobile, 3rem));
        font-size: var(--gq-optionsbtn-icon-mobile-font-size, var(--gq-toolbtn-font-size-mobile, 1.1rem));
        padding: var(--gq-optionsbtn-mobile-padding, var(--gq-toolbtn-padding-mobile, 0.5rem));

        /* Replicar valores de shopbtn-pos-top-mobile y shopbtn-pos-right-mobile pero para top y left */
        top: var(--gq-optionsbtn-pos-top-mobile, var(--gq-shopbtn-pos-top-mobile, 0.1rem));
        left: var(--gq-optionsbtn-pos-left-mobile, var(--gq-shopbtn-pos-right-mobile, 0.1rem));
        /* Ejemplo para bottom-left:
        bottom: var(--gq-optionsbtn-pos-bottom-mobile, var(--gq-shopbtn-pos-bottom-mobile, 0.1rem));
        left: var(--gq-optionsbtn-pos-left-mobile, var(--gq-shopbtn-pos-right-mobile, 0.1rem));
        top: auto; right: auto;
        */
      }
    }
  `;

  render() {
    return html`
      <button
        class="options-button-internal"
        title=${this.titleText}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
        aria-label=${this.titleText}
        tabindex="0"
      >
        ${this.icon}
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
    this.dispatchEvent(new CustomEvent('options-button-clicked', {
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'options-button-component': OptionsButtonComponent;
  }
}