// src/game/components/ui/quiz-ui-container.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property, query }  from 'lit/decorators.js';

@customElement('quiz-ui-container')
export class QuizUiContainer extends LitElement {

  @property({ type: Boolean, reflect: true })
  isFaded = false;

  // Query para los elementos internos del Shadow DOM
  @query('.top-ui-container-internal') private _topUiContainer!: HTMLElement;
  @query('.status-row-internal') private _statusRow!: HTMLElement;
  @query('.ink-area-internal') private _inkArea!: HTMLElement;
  @query('.quiz-content-wrapper-internal') private _quizContentWrapper!: HTMLElement;
  @query('.options-container-internal') private _optionsContainer!: HTMLElement;


  static styles: CSSResultGroup = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed; 
      top: 7vh; 
      left: 50%; 
      transform: translateX(-50%); 
      width: 90%;
      max-width: 600px;
      box-sizing: border-box;
      padding: 0 1rem;
      background-color: transparent; /* El fondo real lo dará el tema o los elementos internos */
      transition: opacity 0.25s ease-in-out;
      pointer-events: auto;
      z-index: 20; 
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
      margin-bottom: 1rem; /* Espacio antes del contenido principal del quiz */
      flex-shrink: 0; /* Evitar que este contenedor se encoja */
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
        min-height: 2rem; /* Espacio reservado para etiqueta de tinta y barra */
    }

    .quiz-content-wrapper-internal {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: auto; /* Permitir scroll si el contenido de la pregunta+opciones es muy largo */
      /* max-height calculado para permitir scroll sin que el contenedor entero se mueva */
      /* (95vh total viewport - 7vh (top de :host) - 1rem (padding :host) - X (espacio para top-ui) - Y (espacio para feedback)) */
      /* Es un cálculo aproximado, ajustar X e Y según sea necesario. */
      /* Podríamos usar flex-grow: 1 en este wrapper y overflow en el :host si fuera más simple */
      max-height: calc(93vh - 7vh - 2rem - 5rem); /* Ejemplo: 93vh - top - padding - (altura aprox top-ui + feedback) */
      scrollbar-width: thin; 
      scrollbar-color: rgba(150,150,150,0.5) transparent; 
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

    /* Este es el contenedor real donde QuizUIManager pondrá el question-display y options-container */
    .quiz-scrollable-content-internal {
      width: 100%;
      padding: var(--gq-scrollable-content-glow-padding, 5px); 
      box-sizing: border-box;
      display: flex; /* Para permitir que question-display y options-container se apilen verticalmente */
      flex-direction: column;
      align-items: center;
    }

    /* Este div .options-container-internal es el que QuizUIManager busca por clase */
    .options-container-internal {
      display: flex;
      flex-direction: column;
      gap: var(--gq-options-gap, 0.75rem);
      width: 100%;
      margin-top: var(--gq-options-margin-top, 1rem);
      margin-bottom: var(--gq-options-margin-bottom, 1rem);
    }

    @media (max-width: 768px) {
      :host {
        padding: 0 0.5rem;
        width: calc(100% - 1rem); 
      }
       .quiz-content-wrapper-internal {
         max-height: calc(93vh - 7vh - 1rem - 5rem); /* Ajustar padding para tablet */
       }
    }
     @media (max-width: 480px) {
       .quiz-content-wrapper-internal {
         max-height: calc(95vh - 7vh - 1rem - 4rem); /* Ajustar para móvil, quizá menos espacio para top-ui */
       }
     }
  `;

  constructor() {
    super();
    console.log('QuizUiContainer: Constructor - Elemento creado pero aún no en DOM o actualizado.');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('QuizUiContainer: connectedCallback - Elemento conectado al DOM.');
  }

  firstUpdated() {
    console.log('QuizUiContainer: firstUpdated INICIADO.');
    // Verificar si los elementos consultados con @query están disponibles
    console.log('QuizUiContainer: Elementos internos post-@query:');
    console.log('  _topUiContainer:', this._topUiContainer);
    console.log('  _statusRow (dentro de topUiContainer):', this._statusRow); // Esto podría ser null si no está directo en shadowRoot
    console.log('  _inkArea (dentro de topUiContainer):', this._inkArea); // Idem
    console.log('  _quizContentWrapper:', this._quizContentWrapper);
    console.log('  _optionsContainer (dentro de quizContentWrapper y quizScrollableContent):', this._optionsContainer); // Idem, verificar anidación
    
    // Es posible que para elementos anidados, @query no funcione como se espera directamente.
    // El log importante será el de QuizUIManager cuando intente `shadowRoot.querySelector('.options-container-internal')`
    console.log('QuizUiContainer: firstUpdated FINALIZADO.');
  }

  render() {
    console.log('QuizUiContainer: render() llamado.');
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