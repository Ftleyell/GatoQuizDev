    // src/game/components/ui/lives-display.ts
    import { LitElement, html, css, CSSResultGroup } from 'lit';
    import { customElement, property } from 'lit/decorators.js';
    
    @customElement('lives-display')
    export class LivesDisplay extends LitElement {
    
      @property({ type: Number }) lives = 3;
      @property({ type: Boolean }) hasShield = false;
      @property({ type: Number }) hintCharges = 0;
    
      static styles: CSSResultGroup = css`
        :host {
          display: inline-flex;
          align-items: center;
          gap: var(--gq-livesdisp-gap, 0.3rem);
          font-family: var(--gq-livesdisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
          color: var(--gq-livesdisp-text-color, #f3f4f6);
          user-select: none;
        }
    
        .life-emoji {
          font-size: var(--gq-livesdisp-icon-size, 1.3rem);
          line-height: 1;
          color: var(--gq-livesdisp-heart-color, #f43f5e);
          animation: pulseHeart 1.5s infinite ease-in-out; /* Animación aplicada aquí */
          user-select: none;
        }
    
        /* Animación movida desde base.css */
        @keyframes pulseHeart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
    
        #lives-count-internal {
          font-size: var(--gq-livesdisp-count-font-size, 1.3rem);
          font-weight: var(--gq-livesdisp-count-font-weight, 700);
          min-width: 1ch;
          text-align: left;
        }
    
        .status-icon {
          font-size: var(--gq-livesdisp-icon-size, 1.3rem);
          line-height: 1;
          margin-left: var(--gq-livesdisp-status-icon-margin-left, 0.3rem);
          display: inline-block;
          user-select: none;
        }
    
        .shield-icon {
          filter: drop-shadow(0 0 3px var(--gq-livesdisp-shield-icon-shadow-color, rgba(59, 130, 246, 0.7)));
          animation: shieldPulse 2s infinite ease-in-out; /* Animación aplicada aquí */
        }
    
        .hint-icon {
          filter: drop-shadow(0 0 3px var(--gq-livesdisp-hint-icon-shadow-color, rgba(250, 204, 21, 0.7)));
          animation: hintPulse 1.8s infinite ease-in-out; /* Animación aplicada aquí */
        }
    
        /* Animaciones movidas desde base.css */
        @keyframes shieldPulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes hintPulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
          50% { transform: scale(1.08) rotate(5deg); opacity: 1; }
        }
    
        [hidden] { display: none !important; }
    
        @media (max-width: 768px) {
          .life-emoji, #lives-count-internal, .status-icon {
            font-size: var(--gq-livesdisp-icon-tablet-size, var(--gq-livesdisp-icon-size, 1.1rem));
          }
          :host {
             gap: var(--gq-livesdisp-tablet-gap, var(--gq-livesdisp-gap, 0.2rem));
          }
           .status-icon {
             margin-left: var(--gq-livesdisp-status-icon-tablet-margin-left, var(--gq-livesdisp-status-icon-margin-left, 0.2rem));
          }
        }
        @media (max-width: 480px) {
          .life-emoji, #lives-count-internal, .status-icon {
            font-size: var(--gq-livesdisp-icon-mobile-size, var(--gq-livesdisp-icon-tablet-size, 1rem));
          }
        }
      `;
    
      render() {
        const showHintIcon = this.hintCharges > 0;
        return html`
          <span class="life-emoji" part="heart-icon">❤️</span>
          <span id="lives-count-internal" part="count">${this.lives}</span>
          <span
            class="status-icon shield-icon"
            part="shield-icon"
            ?hidden=${!this.hasShield}
            title="Escudo Activo"
          >🛡️</span>
          <span
            class="status-icon hint-icon"
            part="hint-icon"
            ?hidden=${!showHintIcon}
            title="Pista Disponible"
          >💡</span>
        `;
      }
    }
    
    declare global {
      interface HTMLElementTagNameMap {
        'lives-display': LivesDisplay;
      }
    }
    