// src/game/components/ui/tool-button.ts
import { LitElement, html, css, CSSResultGroup, nothing } from 'lit'; // Asegúrate de importar 'nothing'
import { customElement, property } from 'lit/decorators.js';

@customElement('tool-button')
export class ToolButton extends LitElement {

  @property({ type: String }) toolId = '';
  @property({ type: String }) icon = '❓';
  @property({ type: String }) titleText = '';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) active = false;

  // NUEVA PROPIEDAD para el progreso de la barra de comida
  @property({ type: Number, attribute: 'progress-percentage' })
  progressPercentage = 0;

  private _isProcessingInteraction = false;

  static styles: CSSResultGroup = css`
    :host {
      display: inline-flex; justify-content: center; align-items: center;
      width: var(--gq-toolbtn-size, 3rem);
      height: var(--gq-toolbtn-size, 3rem);
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      background-color: var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8));
      color: var(--gq-toolbtn-text-color, #e5e7eb);
      border: var(--gq-toolbtn-border, 2px solid #4b5563);
      border-radius: var(--gq-toolbtn-border-radius, 0.5rem);
      padding: var(--gq-toolbtn-padding, 0.5rem);
      font-size: var(--gq-toolbtn-font-size, 1.1rem);
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.1s ease,
                  opacity 0.2s ease;
      box-shadow: var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3));
      position: relative; /* Necesario para la barra de progreso interna */
      overflow: hidden; /* Para que la barra no se salga del borde redondeado */
    }

    .tool-button-internal {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      background: transparent; border: none; padding: 0; margin: 0;
      font: inherit; color: inherit; cursor: inherit; outline: none;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
      position: relative; /* Para que el icono esté sobre la barra */
      z-index: 1; /* Icono encima de la barra */
    }

    /* Hover general */
    :host(:not([disabled]):not([active]):hover) {
      background-color: var(--gq-toolbtn-hover-bg, rgba(31, 41, 55, 0.9));
      border-color: var(--gq-toolbtn-hover-border-color, #6b7280);
    }

    /* Active general (presionado, no el estado "activo" de la herramienta) */
    :host(:not([disabled]):active) { /* Se aplica si no está deshabilitado, incluso si está "active" */
      transform: scale(0.95);
      background-color: var(--gq-toolbtn-pressed-bg, rgba(55, 65, 81, 0.9));
    }

    /* Estado deshabilitado */
    :host([disabled]) {
      opacity: var(--gq-toolbtn-disabled-opacity, 0.5);
      cursor: not-allowed;
      transform: none !important;
      background-color: var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8)));
      border-color: var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border-color, #4b5563));
      box-shadow: var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3));
    }
     :host([disabled]:hover) { /* Evitar cambios en hover si está deshabilitado */
       background-color: var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8)));
       border-color: var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border-color, #4b5563));
     }

    /* --- ESTILOS DE ESTADO ACTIVO (Herramienta seleccionada) --- */
    :host([active]) {
      border-color: var(--gq-toolbtn-active-border-color, #a78bfa);
      box-shadow: var(--gq-toolbtn-active-box-shadow, 0 0 8px rgba(167, 139, 250, 0.5));
      background-color: var(--gq-toolbtn-active-bg-color, rgba(167, 139, 250, 0.3));
    }

    /* Pincel Activo */
    :host([toolId="brush"][active]) {
        border-color: var(--gq-toolbtn-brush-active-border-color, var(--gq-toolbtn-active-border-color, #a78bfa));
        box-shadow: var(--gq-toolbtn-brush-active-box-shadow, var(--gq-toolbtn-active-box-shadow, 0 0 8px rgba(167, 139, 250, 0.5)));
        background-color: var(--gq-toolbtn-brush-active-bg-color, var(--gq-toolbtn-active-bg-color, rgba(167, 139, 250, 0.3)));
    }

     /* Comida Activa */
     :host([toolId="cat-food"][active]) {
        border-color: var(--gq-toolbtn-catfood-active-border-color, rgb(245, 99, 31));
        background-color: var(--gq-toolbtn-catfood-active-bg-color, rgba(245, 136, 63, 0.8));
        box-shadow: var(--gq-toolbtn-catfood-active-box-shadow, 0 0 8px rgba(223, 167, 12, 0.5));
     }

    /* Estilos para estado presionado MIENTRAS está activo (toolId genérico) */
     :host([active]:active) {
       background-color: var(--gq-toolbtn-active-pressed-bg, rgba(140, 110, 240, 0.5));
     }
      /* Comida Activa y Presionada */
      :host([toolId="cat-food"][active]:active) {
        background-color: var(--gq-toolbtn-catfood-active-pressed-bg, var(--gq-toolbtn-catfood-active-bg-color, rgba(245, 136, 63, 0.8)));
      }
      /* Pincel Activo y Presionado */
      :host([toolId="brush"][active]:active) {
        background-color: var(--gq-toolbtn-brush-active-pressed-bg, var(--gq-toolbtn-active-pressed-bg, rgba(140, 110, 240, 0.5)));
      }

    /* --- INICIO: Estilos de cat_food.css integrados para la barra --- */
    .cat-food-bar-container {
      position: absolute;
      /* Ajustar estos valores según sea necesario o hacerlos variables CSS */
      bottom: var(--gq-catfood-bar-bottom-offset, 0.2rem); /* Reducido para mejor ajuste */
      left: var(--gq-catfood-bar-left-offset, 0.25rem);   /* Reducido para mejor ajuste */
      right: var(--gq-catfood-bar-right-offset, 0.25rem);  /* Reducido para mejor ajuste */
      height: var(--gq-catfood-bar-height, 0.5rem);    /* Reducido para mejor ajuste */
      background-color: var(--gq-catfood-bar-bg, #374151);
      /* Usar el mismo borde que el botón padre, o uno específico */
      border: var(--gq-catfood-bar-border, 1px solid #4b5563);
      border-radius: var(--gq-catfood-bar-border-radius, 0.25rem); /* Un poco menos redondeado que el botón */
      overflow: hidden;
      pointer-events: none; /* Para que no interfiera con el click del botón */
      z-index: 0; /* Detrás del contenido del botón (.tool-button-internal) */
    }

    .cat-food-bar-fill {
      height: 100%;
      background: var(--gq-catfood-bar-fill-bg, linear-gradient(to right, #f97316, #fcd34d));
      border-radius: inherit; /* Heredar el redondeo del contenedor de la barra */
      transition: width 0.3s ease-out;
    }
    /* --- FIN: Estilos de cat_food.css integrados --- */

    @media (min-width: 768px) {
      :host {
        width: var(--gq-toolbtn-desktop-size, var(--gq-toolbtn-size, 3.5rem));
        height: var(--gq-toolbtn-desktop-size, var(--gq-toolbtn-size, 3.5rem));
        font-size: var(--gq-toolbtn-desktop-font-size, var(--gq-toolbtn-font-size, 1.2rem));
        padding: var(--gq-toolbtn-desktop-padding, var(--gq-toolbtn-padding, 0.6rem));
      }
       /* Los estilos para :active y :hover ya están definidos globalmente */
    }
  `;

  render() {
    const catFoodBarTemplate = this.toolId === 'cat-food' && !this.disabled
      ? html`
          <div class="cat-food-bar-container" part="cat-food-bar-container">
            <div
              class="cat-food-bar-fill"
              part="cat-food-bar-fill"
              style="width: ${this.progressPercentage}%;"
            ></div>
          </div>
        `
      : nothing;

    return html`
      <button
        class="tool-button-internal"
        title=${this.titleText || this.toolId}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
        aria-label=${this.titleText || this.toolId}
        tabindex="-1"
      >
        ${this.icon}
      </button>
      ${catFoodBarTemplate}
    `;
  }

  constructor() {
    super();
    // El _handleClick se mantiene como estaba
  }

  private _handleClick(event: MouseEvent | TouchEvent) {
    if (event.type === 'touchstart') {
      event.preventDefault();
    }
    if (this._isProcessingInteraction || this.disabled) {
      return;
    }
    this._isProcessingInteraction = true;
    this.dispatchEvent(new CustomEvent('tool-activated', {
      detail: { toolId: this.toolId },
      bubbles: true,
      composed: true
    }));
    requestAnimationFrame(() => {
      this._isProcessingInteraction = false;
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tool-button': ToolButton;
  }
}