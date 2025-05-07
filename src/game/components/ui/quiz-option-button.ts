// src/game/components/ui/quiz-option-button.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('quiz-option-button')
export class QuizOptionButton extends LitElement {

  @property({ type: String }) optionKey = '';
  @property({ type: String }) optionText = 'Opción';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) hinted = false;
  // La propiedad 'theme' se elimina

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      width: 100%;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }

    .option-button-internal {
      /* Layout y Alineación */
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: var(--gq-opt-btn-min-height, 3rem);
      height: auto;
      padding: var(--gq-opt-btn-padding, 0.8rem 0.8rem);
      box-sizing: border-box;

      /* Texto */
      text-align: center;
      white-space: normal;
      word-wrap: break-word;
      word-break: break-word;
      line-height: var(--gq-opt-btn-line-height, 1.3);
      font-family: var(--gq-opt-btn-font-family, 'Poppins', sans-serif);
      font-weight: var(--gq-opt-btn-font-weight, 600);
      font-size: var(--gq-opt-btn-font-size, 0.95rem);
      color: var(--gq-opt-btn-text-color, #FFFFFF);

      /* Apariencia Base */
      border: var(--gq-opt-btn-border, none);
      border-radius: var(--gq-opt-btn-border-radius, 0.6rem);
      cursor: pointer;
      background: var(--gq-opt-btn-bg, linear-gradient(to right, #3b82f6, #2563eb));
      box-shadow: var(--gq-opt-btn-box-shadow, 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1));

      /* Transiciones */
      transition: background-image 0.3s ease, background-color 0.3s ease,
                  color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease,
                  transform 0.15s ease, opacity 0.2s ease;
      opacity: 1;
    }

    /* Hover (no deshabilitado, no hinted) */
    /* Usamos :host para los estados reflejados */
    :host(:not([disabled]):not([hinted])) .option-button-internal:hover {
      background: var(--gq-opt-btn-hover-bg, linear-gradient(to right, #60a5fa, #3b82f6));
      transform: var(--gq-opt-btn-hover-transform, translateY(-2px));
      box-shadow: var(--gq-opt-btn-hover-box-shadow, 0 6px 15px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.1));
      color: var(--gq-opt-btn-hover-text-color, var(--gq-opt-btn-text-color, #FFFFFF)); /* Permite sobreescribir color de texto en hover */
    }

    /* Active (no deshabilitado, no hinted) */
    :host(:not([disabled]):not([hinted])) .option-button-internal:active {
      background: var(--gq-opt-btn-active-bg, var(--gq-opt-btn-bg, linear-gradient(to right, #2563eb, #1d4ed8))); /* Fallback a bg normal si active-bg no está */
      transform: var(--gq-opt-btn-active-transform, translateY(0px) scale(0.98));
      box-shadow: var(--gq-opt-btn-active-box-shadow, 0 2px 5px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(0, 0, 0, 0.1));
    }

    /* Estado Deshabilitado */
    :host([disabled]) .option-button-internal {
      cursor: not-allowed;
      opacity: var(--gq-opt-btn-disabled-opacity, 0.6) !important;
      transform: none !important;
      background: var(--gq-opt-btn-disabled-bg, linear-gradient(to right, #9ca3af, #6b7280));
      box-shadow: var(--gq-opt-btn-disabled-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      color: var(--gq-opt-btn-disabled-text-color, var(--gq-opt-btn-text-color, #FFFFFF));
      border: var(--gq-opt-btn-disabled-border, var(--gq-opt-btn-border, none));
    }

    /* Estado Hinted */
    :host([hinted]) .option-button-internal {
      cursor: not-allowed;
      opacity: var(--gq-opt-btn-hinted-opacity, 0.45) !important;
      transform: none !important;
      background: var(--gq-opt-btn-hinted-bg, linear-gradient(to right, #6b7280, #4b5563));
      box-shadow: var(--gq-opt-btn-hinted-box-shadow, var(--gq-opt-btn-disabled-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1)));
      color: var(--gq-opt-btn-hinted-text-color, var(--gq-opt-btn-disabled-text-color, var(--gq-opt-btn-text-color, #FFFFFF)));
      border: var(--gq-opt-btn-hinted-border, var(--gq-opt-btn-disabled-border, var(--gq-opt-btn-border, none)));
    }

    /* Media Queries para Desktop (usando variables específicas si existen) */
    @media (min-width: 768px) {
      .option-button-internal {
        padding: var(--gq-opt-btn-desktop-padding, var(--gq-opt-btn-padding, 0.9rem 1rem));
        min-height: var(--gq-opt-btn-desktop-min-height, var(--gq-opt-btn-min-height, 3.5rem));
        font-size: var(--gq-opt-btn-desktop-font-size, var(--gq-opt-btn-font-size, 1rem));
        border-radius: var(--gq-opt-btn-desktop-border-radius, var(--gq-opt-btn-border-radius, 0.75rem));
      }
    }
  `;

  render() {
    // El 'themeClass' se elimina del botón interno
    return html`
      <button
        class="option-button-internal" 
        ?disabled=${this.disabled || this.hinted}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
      >
        ${this.optionText}
      </button>
    `;
  }

  private _handleClick(event: MouseEvent | TouchEvent) {
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
    if (this.disabled || this.hinted) {
      return;
    }
    this.dispatchEvent(new CustomEvent('option-selected', {
      detail: { key: this.optionKey },
      bubbles: true,
      composed: true
    }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiz-option-button': QuizOptionButton;
  }
}