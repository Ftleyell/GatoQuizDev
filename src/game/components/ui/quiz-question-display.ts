    // src/game/components/ui/quiz-question-display.ts
    import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
    import { customElement, property, state } from 'lit/decorators.js';
    
    const DIFFICULTY_LEVELS_CONFIG: { [key: string | number]: { name: string; classSuffix: string; } } = {
        1: { name: "COMÚN", classSuffix: "1" },
        2: { name: "POCO COMÚN", classSuffix: "2" },
        3: { name: "RARA", classSuffix: "3" },
        4: { name: "ÉPICA", classSuffix: "4" },
        5: { name: "LEGENDARIA", classSuffix: "5" },
        "easy": { name: "FÁCIL", classSuffix: "easy" },
        "medium": { name: "MEDIO", classSuffix: "medium" },
        "hard": { name: "DIFÍCIL", classSuffix: "hard" },
    };
    
    @customElement('quiz-question-display')
    export class QuizQuestionDisplay extends LitElement {
    
      @property({ type: String }) difficulty: string | number = '1';
      @property({ type: String }) questionText = 'Cargando pregunta...';
    
      @state() private _difficultyName = DIFFICULTY_LEVELS_CONFIG[1].name;
      @state() private _difficultyClassSuffix = DIFFICULTY_LEVELS_CONFIG[1].classSuffix;
    
      static styles: CSSResultGroup = css`
        :host {
          display: block;
          width: 100%;
          margin-bottom: var(--gq-qbox-margin-bottom, 1.5rem);
          box-sizing: border-box;
        }
    
        .question-box-internal {
          width: 100%;
          min-height: var(--gq-qbox-min-height, 5em);
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--gq-qbox-border-radius, 0.75rem);
          padding: var(--gq-qbox-padding, 1rem);
          gap: var(--gq-qbox-gap, 0.4rem);
          box-sizing: border-box;
          background-color: var(--gq-qbox-bg, rgba(17, 24, 39, 0.85));
          border: var(--gq-qbox-border, 1px solid rgba(75, 85, 99, 0.5));
          box-shadow: var(--gq-qbox-inset-shadow, inset 0 1px 2px rgba(0,0,0,0.2)),
                      0 0 var(--gq-element-glow-blur-radius, calc(var(--element-glow-intensity, 0) * 18px)) var(--gq-element-glow-spread-radius, calc(var(--element-glow-intensity, 0) * 4px)) var(--gq-element-glow-color, hsla(50, 100%, 60%, calc(var(--element-glow-intensity, 0) * 0.6)));
          transition: box-shadow 0.5s ease-out, background-color 0.3s ease, border 0.3s ease;
          overflow: hidden; 
          position: relative; 
        }
        
        .card__content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: inherit;
          position: relative; 
          z-index: 2; 
        }
    
        .difficulty-label {
          text-align: center;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
          font-family: var(--gq-qbox-diff-label-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
          font-size: var(--gq-qbox-diff-label-font-size, 0.65rem);
          font-weight: var(--gq-qbox-diff-label-font-weight, 700);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: var(--gq-qbox-diff-label-padding, 0.1rem 0.4rem);
          border-radius: var(--gq-qbox-diff-label-border-radius, 0.25rem);
          line-height: 1.2;
          transition: color 0.3s ease, background-color 0.3s ease, text-shadow 0.3s ease;
          text-shadow: 0 0 var(--gq-difficulty-label-glow-blur, var(--difficulty-glow-blur, 0px)) var(--gq-difficulty-label-glow-color, var(--difficulty-glow-color, transparent)), /* Usar variables globales o locales */
                       0 0 calc(var(--gq-difficulty-label-glow-blur, var(--difficulty-glow-blur, 0px)) * 1.5) var(--gq-difficulty-label-glow-color, var(--difficulty-glow-color, transparent));
          flex-shrink: 0;
          margin-bottom: var(--gq-qbox-diff-label-margin-bottom, 0.3rem);
          /* Considerar una animación de pulso si es necesario */
          /* animation: var(--gq-qbox-diff-label-animation, none); */
        }
    
        /* Animación de pulso (si un tema lo define mediante variables o si se activa por clase) */
        @keyframes difficultyPulse { /* Movida aquí */
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        /* .difficulty-label.pulse-animation { animation: difficultyPulse 1.2s infinite ease-in-out; } */
    
        .difficulty-level-1 { color: var(--gq-qbox-diff-1-text-color, #9ca3af); background-color: var(--gq-qbox-diff-1-bg-color, rgba(107, 114, 128, 0.2)); }
        .difficulty-level-2 { color: var(--gq-qbox-diff-2-text-color, #34d399); background-color: var(--gq-qbox-diff-2-bg-color, rgba(16, 185, 129, 0.2)); }
        .difficulty-level-3 { color: var(--gq-qbox-diff-3-text-color, #60a5fa); background-color: var(--gq-qbox-diff-3-bg-color, rgba(59, 130, 246, 0.2)); }
        .difficulty-level-4 { color: var(--gq-qbox-diff-4-text-color, #c4b5fd); background-color: var(--gq-qbox-diff-4-bg-color, rgba(167, 139, 250, 0.2)); }
        .difficulty-level-5 { color: var(--gq-qbox-diff-5-text-color, #fbbf24); background-color: var(--gq-qbox-diff-5-bg-color, rgba(245, 158, 11, 0.2)); }
        .difficulty-level-easy { color: var(--gq-qbox-diff-easy-text-color, var(--gq-qbox-diff-2-text-color, #34d399)); background-color: var(--gq-qbox-diff-easy-bg-color, var(--gq-qbox-diff-2-bg-color, rgba(16, 185, 129, 0.2))); }
        .difficulty-level-medium { color: var(--gq-qbox-diff-medium-text-color, var(--gq-qbox-diff-3-text-color, #60a5fa)); background-color: var(--gq-qbox-diff-medium-bg-color, var(--gq-qbox-diff-3-bg-color, rgba(59, 130, 246, 0.2))); }
        .difficulty-level-hard { color: var(--gq-qbox-diff-hard-text-color, var(--gq-qbox-diff-4-text-color, #c4b5fd)); background-color: var(--gq-qbox-diff-hard-bg-color, var(--gq-qbox-diff-4-bg-color, rgba(167, 139, 250, 0.2))); }
            
        .question-text {
          font-family: var(--gq-qbox-text-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
          font-size: var(--gq-qbox-text-font-size, 1.1rem);
          font-weight: var(--gq-qbox-text-font-weight, 600);
          line-height: var(--gq-qbox-text-line-height, 1.5);
          color: var(--gq-qbox-text-color, #e5e7eb);
          text-align: center;
          width: 100%;
          word-break: break-word;
          hyphens: auto;
          flex-grow: 1;
        }
    
        @media (max-width: 768px) {
          .question-box-internal { 
            padding: var(--gq-qbox-tablet-padding, var(--gq-qbox-padding, 0.8rem));
            min-height: var(--gq-qbox-tablet-min-height, var(--gq-qbox-min-height, 4.5em));
          }
          .difficulty-label { 
            font-size: var(--gq-qbox-diff-label-tablet-font-size, var(--gq-qbox-diff-label-font-size, 0.6rem));
            padding: var(--gq-qbox-diff-label-tablet-padding, var(--gq-qbox-diff-label-padding, 0.1rem 0.35rem));
          }
          .question-text { 
            font-size: var(--gq-qbox-text-tablet-font-size, var(--gq-qbox-text-font-size, 1rem));
            line-height: var(--gq-qbox-text-tablet-line-height, var(--gq-qbox-text-line-height, 1.4));
          }
        }
         @media (max-width: 480px) {
          .question-box-internal { 
            padding: var(--gq-qbox-mobile-padding, var(--gq-qbox-tablet-padding, 0.6rem));
            min-height: var(--gq-qbox-mobile-min-height, var(--gq-qbox-tablet-min-height, 4em));
          }
          .difficulty-label { 
            font-size: var(--gq-qbox-diff-label-mobile-font-size, var(--gq-qbox-diff-label-tablet-font-size, 0.55rem));
          }
          .question-text { 
            font-size: var(--gq-qbox-text-mobile-font-size, var(--gq-qbox-text-tablet-font-size, 0.9rem));
          }
        }
      `;
    
      protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);
        if (changedProperties.has('difficulty')) {
          this._updateDifficultyDisplayData();
        }
      }
    
      private _updateDifficultyDisplayData() {
        const config = DIFFICULTY_LEVELS_CONFIG[this.difficulty] || DIFFICULTY_LEVELS_CONFIG[1];
        this._difficultyName = config.name;
        this._difficultyClassSuffix = config.classSuffix;
      }
    
      render() {
        const difficultyClass = `difficulty-level-${this._difficultyClassSuffix}`;
        return html`
          <div class="question-box-internal">
            <div class="card__content">
              <span
                class="difficulty-label ${difficultyClass}"
                part="difficulty"
              >
                Pregunta: ${this._difficultyName}
              </span>
              <p class="question-text" part="text">
                ${this.questionText}
              </p>
            </div>
          </div>
        `;
      }
    }
    
    declare global {
      interface HTMLElementTagNameMap {
        'quiz-question-display': QuizQuestionDisplay;
      }
    }
    