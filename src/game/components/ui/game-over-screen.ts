// src/game/components/ui/game-over-screen.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('game-over-screen')
export class GameOverScreen extends LitElement {

  @property({ type: Number }) finalScore = 0;
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
      background-color: var(--gq-gameover-bg, rgba(17, 24, 39, 0.9));
      color: var(--gq-gameover-text-color, #e5e7eb);
      font-family: var(--gq-gameover-font-primary, var(--gq-font-primary, 'Poppins', sans-serif));
      gap: 1.5rem;
      -webkit-tap-highlight-color: transparent;
    }

    .game-over-title {
      font-family: var(--gq-gameover-font-display, var(--gq-font-display, 'Pacifico', cursive));
      font-size: clamp(3rem, 15vmin, 6rem);
      color: var(--gq-gameover-title-color, #f87171);
      text-shadow: var(--gq-gameover-title-shadow, 2px 2px 5px rgba(0,0,0,0.5));
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }

    .score-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .final-score-label {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--gq-gameover-score-label-color, #9ca3af);
    }

    .final-score-value {
      font-size: clamp(2.5rem, 10vmin, 4rem);
      font-weight: 700;
      color: var(--gq-gameover-score-value-color, #facc15);
      line-height: 1;
    }

    .new-highscore-indicator {
      font-size: 1rem;
      font-weight: 700;
      color: var(--gq-gameover-highscore-text-color, #4ade80);
      background-color: var(--gq-gameover-highscore-bg, rgba(16, 185, 129, 0.2));
      padding: 0.3rem 0.8rem;
      border-radius: 0.5rem;
      border: var(--gq-gameover-highscore-border, 1px solid #34d399);
      margin-top: 0.5rem;
      animation: pulseGreen 1.8s infinite ease-in-out;
    }

    @keyframes pulseGreen { /* Se puede mantener local o globalizar si se usa en más sitios */
      0%, 100% { transform: scale(1); box-shadow: 0 0 5px var(--gq-gameover-highscore-glow-color, rgba(74, 222, 128, 0.5)); }
      50% { transform: scale(1.05); box-shadow: 0 0 10px var(--gq-gameover-highscore-glow-color-pulse, rgba(74, 222, 128, 0.8)); }
    }

    .button-container {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .action-button {
      font-family: var(--gq-gameover-button-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-gameover-button-font-size, 1rem);
      font-weight: var(--gq-gameover-button-font-weight, 600);
      padding: var(--gq-gameover-button-padding, 0.8rem 1.5rem);
      border-radius: var(--gq-gameover-button-border-radius, 0.5rem);
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
      box-shadow: var(--gq-gameover-button-box-shadow, 0 3px 6px rgba(0,0,0,0.2));
      -webkit-tap-highlight-color: transparent;
    }
    .action-button:hover {
       transform: var(--gq-gameover-button-hover-transform, translateY(-2px));
       box-shadow: var(--gq-gameover-button-hover-box-shadow, 0 5px 10px rgba(0,0,0,0.3));
    }
     .action-button:active {
       transform: var(--gq-gameover-button-active-transform, translateY(0px) scale(0.98));
       box-shadow: var(--gq-gameover-button-active-box-shadow, 0 2px 4px rgba(0,0,0,0.2));
    }

    .restart-button {
      background-color: var(--gq-gameover-restart-btn-bg, #34d399);
      color: var(--gq-gameover-restart-btn-text-color, #064e3b);
    }
    .restart-button:hover { background-color: var(--gq-gameover-restart-btn-hover-bg, #6ee7b7); }

    .menu-button {
      background-color: var(--gq-gameover-menu-btn-bg, #60a5fa);
      color: var(--gq-gameover-menu-btn-text-color, #1e3a8a);
    }
     .menu-button:hover { background-color: var(--gq-gameover-menu-btn-hover-bg, #93c5fd); }

     @media (max-width: 480px) {
        /* Las media queries pueden ajustar fallbacks o usar variables específicas para móvil */
        :host { gap: 1rem; padding: 1rem; }
        .game-over-title { font-size: clamp(2.5rem, 13vmin, 5rem); }
        .final-score-label { font-size: 1rem; }
        .final-score-value { font-size: clamp(2rem, 9vmin, 3.5rem); }
        .new-highscore-indicator { font-size: 0.9rem; }
        .button-container { flex-direction: column; width: 80%; }
        .action-button { 
            width: 100%; 
            font-size: var(--gq-gameover-button-mobile-font-size, 0.9rem);
            padding: var(--gq-gameover-button-mobile-padding, 0.7rem 1rem);
        }
     }
  `;

  private _handleRestartClick() {
    this.dispatchEvent(new CustomEvent('restart-game-requested', { bubbles: true, composed: true }));
  }

  private _handleMenuClick() {
    this.dispatchEvent(new CustomEvent('main-menu-requested', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <h1 class="game-over-title">¡Fin del Juego!</h1>
      <div class="score-container">
        <span class="final-score-label">Puntaje Final</span>
        <span class="final-score-value">${this.finalScore}</span>
        ${this.isNewHighScore ? html`
          <span class="new-highscore-indicator">¡Nuevo Récord! 🏆</span>
        ` : ''}
      </div>
      <div class="button-container">
        <button class="action-button restart-button" @click=${this._handleRestartClick}>
          Reiniciar Partida
        </button>
        <button class="action-button menu-button" @click=${this._handleMenuClick}>
          Menú Principal
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'game-over-screen': GameOverScreen;
  }
}