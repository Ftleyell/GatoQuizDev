// src/game/components/ui/feedback-area.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

// Ya no necesitamos typeToClassMap si los colores se aplican directamente
// a través de variables o una clase única por tipo que use variables.

@customElement('feedback-area')
export class FeedbackArea extends LitElement {

  @property({ type: String }) message = '';
  @property({ type: String }) type: 'correct' | 'incorrect' | 'shield' | 'info' | null = null;

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      margin-top: var(--gq-feedback-margin-top, 1rem);
      height: var(--gq-feedback-height, 2rem);
      box-sizing: border-box;
      transition: opacity 0.3s ease-out;
      opacity: 1;
    }

    :host(:empty) .feedback-text { /* Ocultar si el mensaje está vacío */
        opacity: 0;
    }
    :host([message=""]) .feedback-text { /* Alternativa si :empty no funciona bien con slots/propiedades */
        opacity: 0;
    }


    .feedback-text {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: var(--gq-feedback-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-feedback-font-size, 1.125rem);
      font-weight: var(--gq-feedback-font-weight, 700);
      text-align: center;
      line-height: 1;
      transition: color 0.3s ease, opacity 0.3s ease; /* Añadido opacity */
      opacity: 1; /* Visible por defecto si tiene mensaje */
    }

    /* Aplicar color basado en el tipo usando una clase o directamente la variable */
    .feedback-text.correct { color: var(--gq-feedback-text-color-correct, #4ade80); }
    .feedback-text.incorrect { color: var(--gq-feedback-text-color-incorrect, #f87171); }
    .feedback-text.shield { color: var(--gq-feedback-text-color-shield, #60a5fa); }
    .feedback-text.info { color: var(--gq-feedback-text-color-info, #9ca3af); }
    .feedback-text:not(.correct):not(.incorrect):not(.shield):not(.info) {
        color: var(--gq-feedback-text-color-default, var(--gq-body-text-color, #e5e7eb)); /* Un color por defecto */
    }


    @media (max-width: 768px) {
        .feedback-text {
            font-size: var(--gq-feedback-desktop-font-size, var(--gq-feedback-font-size, 1rem));
        }
    }
  `;

  render() {
    const classes = {
      'feedback-text': true,
      'correct': this.type === 'correct',
      'incorrect': this.type === 'incorrect',
      'shield': this.type === 'shield',
      'info': this.type === 'info',
    };

    return html`
      <div class=${classMap(classes)} part="text">
        ${this.message || ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'feedback-area': FeedbackArea;
  }
}