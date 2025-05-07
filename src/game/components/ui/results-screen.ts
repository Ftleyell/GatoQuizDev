// src/game/components/ui/results-screen.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('results-screen')
export class ResultsScreen extends LitElement {

  @property({ type: Number }) finalScore = 0;
  @property({ type: Number }) correctAnswers = 0;
  @property({ type: Number }) totalQuestions = 0;
  @property({ type: Boolean }) isNewHighScore = false;

  static styles: CSSResultGroup = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      padding: 2rem;
      box-sizing: border-box;
      text-align: center;
      background-color: var(--gq-results-bg, rgba(31, 41, 55, 0.95));
      color: var(--gq-results-text-color, #e5e7eb);
      font-family: var(--gq-results-font-primary, var(--gq-font-primary, 'Poppins', sans-serif));
      gap: 1.5rem;
      -webkit-tap-highlight-color: transparent;
    }

    .results-title {
      font-family: var(--gq-results-font-display, var(--gq-font-display, 'Pacifico', cursive));
      font-size: clamp(2.8rem, 14vmin, 5.5rem);
      color: var(--gq-results-title-color, #6ee7b7);
      text-shadow: 1px 1px 4px rgba(0,0,0,0.4); /* Podría ser variable: --gq-results-title-shadow */
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }

    .stats-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      background-color: var(--gq-results-stats-bg, rgba(17, 24, 39, 0.6));
      padding: 1.5rem 2rem;
      border-radius: 0.75rem; /* Variable: --gq-results-stats-border-radius */
      border: var(--gq-results-stats-border, 1px solid #4b5563);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
    }

    .stat-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--gq-results-stat-label-color, #9ca3af);
    }

    .stat-value {
      font-size: clamp(1.8rem, 7vmin, 2.8rem);
      font-weight: 700;
      line-height: 1;
    }

    .stat-value.score { color: var(--gq-results-stat-value-score-color, #facc15); }
    .stat-value.accuracy { color: var(--gq-results-stat-value-accuracy-color, #6ee7b7); }

    .new-highscore-indicator {
      font-size: 1rem; font-weight: 700;
      color: var(--gq-results-highscore-text-color, var(--gq-gameover-highscore-text-color, #4ade80));
      background-color: var(--gq-results-highscore-bg, var(--gq-gameover-highscore-bg, rgba(16, 185, 129, 0.2)));
      padding: 0.3rem 0.8rem; border-radius: 0.5rem;
      border: var(--gq-results-highscore-border, var(--gq-gameover-highscore-border, 1px solid #34d399));
      margin-top: 1rem;
      animation: pulseGreenResults 1.8s infinite ease-in-out; /* Podría usar la misma anim de gameover */
    }

    @keyframes pulseGreenResults {
      0%, 100% { transform: scale(1); box-shadow: 0 0 5px var(--gq-results-highscore-glow-color, var(--gq-gameover-highscore-glow-color, rgba(74, 222, 128, 0.5))); }
      50% { transform: scale(1.05); box-shadow: 0 0 10px var(--gq-results-highscore-glow-color-pulse, var(--gq-gameover-highscore-glow-color-pulse, rgba(74, 222, 128, 0.8))); }
    }
    
    .continue-button {
      font-family: var(--gq-results-continue-btn-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-results-continue-btn-font-size, 1.1rem);
      font-weight: var(--gq-results-continue-btn-font-weight, 600);
      padding: var(--gq-results-continue-btn-padding, 0.9rem 2rem);
      border-radius: var(--gq-results-continue-btn-border-radius, 0.5rem);
      border: none;
      cursor: pointer; 
      transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
      box-shadow: var(--gq-results-continue-btn-box-shadow, 0 3px 6px rgba(0,0,0,0.2));
      background-color: var(--gq-results-continue-btn-bg, #60a5fa);
      color: var(--gq-results-continue-btn-text-color, #1e3a8a);
      margin-top: 1rem;
      -webkit-tap-highlight-color: transparent;
    }
    .continue-button:hover {
       transform: var(--gq-results-continue-btn-hover-transform, translateY(-2px));
       box-shadow: var(--gq-results-continue-btn-hover-box-shadow, 0 5px 10px rgba(0,0,0,0.3));
       background-color: var(--gq-results-continue-btn-hover-bg, #93c5fd);
    }
     .continue-button:active {
       transform: var(--gq-results-continue-btn-active-transform, translateY(0px) scale(0.98));
       box-shadow: var(--gq-results-continue-btn-active-box-shadow, 0 2px 4px rgba(0,0,0,0.2));
    }

     @media (max-width: 480px) {
        :host { gap: 1rem; padding: 1.5rem 1rem; }
        .results-title { font-size: clamp(2.2rem, 12vmin, 4.5rem); }
        .stats-container { padding: 1rem 1.5rem; gap: 0.8rem; }
        .stat-label { font-size: 0.9rem; }
        .stat-value { font-size: clamp(1.5rem, 6vmin, 2.2rem); }
        .new-highscore-indicator { font-size: 0.9rem; margin-top: 0.8rem; }
        .continue-button { 
            width: 80%; 
            font-size: var(--gq-results-continue-btn-mobile-font-size, 1rem);
            padding: var(--gq-results-continue-btn-mobile-padding, 0.8rem 1.5rem);
        }
     }
  `;

  private _handleContinueClick() {
    this.dispatchEvent(new CustomEvent('continue-requested', { bubbles: true, composed: true }));
  }

  render() {
    const accuracy = this.totalQuestions > 0 ? ((this.correctAnswers / this.totalQuestions) * 100).toFixed(0) : 0;
    return html`
      <h1 class="results-title">Resultados</h1>
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-label">Puntaje Final</span>
          <span class="stat-value score">${this.finalScore}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Precisión</span>
          <span class="stat-value accuracy">${accuracy}%</span>
          <span class="stat-label" style="font-size: 0.8rem; color: #6b7280;">(${this.correctAnswers} / ${this.totalQuestions})</span>
        </div>
      </div>
      ${this.isNewHighScore ? html`
        <span class="new-highscore-indicator">¡Nuevo Récord! 🏆</span>
      ` : ''}
      <button class="action-button continue-button" @click=${this._handleContinueClick}>
        Continuar
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'results-screen': ResultsScreen;
  }
}