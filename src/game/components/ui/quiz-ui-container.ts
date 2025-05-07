// src/game/components/ui/quiz-ui-container.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('quiz-ui-container')
export class QuizUiContainer extends LitElement {

  @property({ type: Boolean, reflect: true })
  isFaded = false;

  static styles: CSSResultGroup = css`
    :host {
      /* Estilos base que antes estaban en .game-container de layout.css */
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 90%;
      max-width: 600px; /* O usar variable CSS de theme.json */
      box-sizing: border-box;
      padding: 0 1rem; /* Ajustar según sea necesario o usar variables */
      margin-top: 2vh;  /* Ajustar según sea necesario o usar variables */
      background-color: transparent; /* El fondo lo da el body o el tema */
      transition: opacity 0.25s ease-in-out;
      /* Por defecto, el contenedor es interactivo */
      pointer-events: auto;
    }

    :host([isFaded]) {
      opacity: 0.3;
      pointer-events: none;
    }

    /* Estructura interna similar a la que generaba UIManager */
    .top-ui-container-internal {
      /* Estilos para el contenedor de score, vidas, tinta */
      width: 100%;
      display: flex;
      flex-direction: column; /* O row, según el diseño de .top-ui-container */
      align-items: center;
      margin-bottom: 1rem; /* Espacio antes de la pregunta */
      /* background-color: var(--gq-top-ui-bg, transparent); */ /* Ejemplo de variable de tema */
    }

    .status-row-internal {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        gap: 0.5rem;
         /* background-color: var(--gq-status-row-bg, transparent); */
    }
    
    .ink-area-internal {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        margin-top: 0.5rem;
        /* background-color: var(--gq-ink-area-bg, transparent); */
    }


    .quiz-content-wrapper-internal {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .quiz-scrollable-content-internal {
      width: 100%;
    }

    .options-container-internal {
      /* Estilos para el contenedor de opciones si son necesarios aquí */
      display: flex;
      flex-direction: column;
      gap: var(--gq-options-gap, 0.75rem); /* Usar variable de tema */
      width: 100%;
      margin-top: var(--gq-options-margin-top, 1rem);
      margin-bottom: var(--gq-options-margin-bottom, 1rem);
    }

    /* Media queries para responsiveness dentro del componente */
    @media (max-width: 768px) {
      :host {
        padding: 0 0.5rem;
        width: 100%;
        max-width: none;
        margin-top: 7vh; /* Ajustado de layout.css */
      }
      .top-ui-container-internal {
        /* Ajustes si son necesarios */
      }
    }
     @media (max-width: 480px) {
       :host {
         margin-top: 5vh; /* Ajustado de layout.css */
       }
     }
  `;

  render() {
    return html`
      <div class="top-ui-container-internal" part="top-ui-container">
        <div class="status-row-internal" part="status-row">
            <slot name="lives-display"></slot>
            <slot name="score-display"></slot>
        </div>
        <div class="ink-area-internal" part="ink-area">
            <slot name="ink-label"></slot>
            <slot name="ink-bar"></slot>
        </div>
      </div>

      <div class="quiz-content-wrapper-internal" part="quiz-content-wrapper">
        <div class="quiz-scrollable-content-internal" part="quiz-scrollable-content">
          <slot name="question-display"></slot>
          <div class="options-container-internal" part="options-container">
            <slot name="options"></slot>
          </div>
          <slot name="feedback-area"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'quiz-ui-container': QuizUiContainer;
  }
}