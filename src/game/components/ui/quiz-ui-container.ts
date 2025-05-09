// src/game/components/ui/quiz-ui-container.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('quiz-ui-container')
export class QuizUiContainer extends LitElement {

  @property({ type: Boolean, reflect: true })
  isFaded = false;

  static styles: CSSResultGroup = css`
    :host {
      /*
       * MODIFICACIÓN:
       * - Cambiado a position: fixed para anclarlo a la parte superior.
       * - Añadido 'top', 'left', 'transform' para centrarlo horizontalmente y fijar la distancia superior.
       * - Eliminado 'margin-top' ya que 'top' lo maneja.
       * - 'pointer-events: auto' se mantiene para que el contenedor sea interactivo por defecto.
       */
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed; /* Anclado al viewport */
      top: 7vh; /* Distancia fija desde la parte superior (ej. 5% de la altura del viewport) */
               /* Puedes cambiarlo a un valor en px si prefieres, ej: top: 20px; */
      left: 50%; /* Para centrar horizontalmente */
      transform: translateX(-50%); /* Para centrar horizontalmente */
      width: 90%;
      max-width: 600px;
      box-sizing: border-box;
      padding: 0 1rem;
      background-color: transparent;
      transition: opacity 0.25s ease-in-out;
      pointer-events: auto;
      z-index: 20; /* Asegurar que esté por encima del cat-display-area pero debajo de overlays */
    }

    :host([isFaded]) {
      opacity: 0.3;
      pointer-events: none;
    }

    .top-ui-container-internal {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;
    }

    .status-row-internal {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        gap: 0.5rem;
    }
    
    .ink-area-internal {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        margin-top: 0.5rem;
        /*
         * MODIFICACIÓN:
         * - Añadido min-height para reservar espacio para la etiqueta de tinta y la barra.
         * Ajusta este valor según el tamaño combinado de la etiqueta y la barra.
         * Por ejemplo, si la etiqueta es ~0.8rem y la barra ~0.5rem + gap, podría ser ~1.5rem o 2rem.
         */
        min-height: 2rem; /* Ejemplo: Ajusta este valor según sea necesario */
                          /* Esto asegura que el espacio esté siempre ocupado. */
    }


    .quiz-content-wrapper-internal {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      /*
       * MODIFICACIÓN:
       * - Añadido overflow-y: auto y max-height para que el contenido scrollee
       * si excede la altura disponible, manteniendo el contenedor principal fijo.
       * El max-height debe calcularse considerando la posición 'top' y el espacio
       * que quieras dejar en la parte inferior. (ej. 90vh - top - padding_inferior_deseado)
       */
      overflow-y: auto;
      max-height: calc(95vh - 5vh - 2rem); /* 95vh (altura casi total) - 5vh (top) - 2rem (padding inferior deseado) */
                                          /* Ajusta estos valores según tus necesidades */
      scrollbar-width: thin; /* Para Firefox */
      scrollbar-color: rgba(150,150,150,0.5) transparent; /* Para Firefox */
    }
    .quiz-content-wrapper-internal::-webkit-scrollbar {
        width: 8px;
    }
    .quiz-content-wrapper-internal::-webkit-scrollbar-thumb {
        background-color: rgba(150,150,150,0.5);
        border-radius: 4px;
    }
     .quiz-content-wrapper-internal::-webkit-scrollbar-track {
        background: transparent;
    }


    .quiz-scrollable-content-internal {
      width: 100%;
      padding: var(--gq-scrollable-content-glow-padding, 5px); /* Ajusta el valor según necesites */
      box-sizing: border-box;
    }

    .options-container-internal {
      display: flex;
      flex-direction: column;
      gap: var(--gq-options-gap, 0.75rem);
      width: 100%;
      margin-top: var(--gq-options-margin-top, 1rem);
      margin-bottom: var(--gq-options-margin-bottom, 1rem);
    }

    /*
     * MODIFICACIÓN:
     * - Eliminadas las media queries que ajustaban 'margin-top' ya que ahora se usa 'top' fijo.
     * - Se mantiene el ajuste de 'width' y 'padding' para pantallas pequeñas.
     */
    @media (max-width: 768px) {
      :host {
        padding: 0 0.5rem;
        width: calc(100% - 1rem); /* Ajustar para que el padding no cause overflow si el max-width es mayor */
        /* top: 7vh;  Si quieres un 'top' diferente para tablet, ajústalo aquí */
      }
    }
     @media (max-width: 480px) {
       :host {
         /* top: 5vh; Si quieres un 'top' diferente para móvil, ajústalo aquí */
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