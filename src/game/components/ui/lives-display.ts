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
      gap: var(--gq-livesdisp-gap, 0.5rem);
      font-family: var(--gq-livesdisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      color: var(--gq-livesdisp-text-color, #f3f4f6);
      user-select: none;
    }

    .lives-stack {
      position: relative; /* Contenedor para posicionar el número absolutamente */
      display: inline-flex; /* Para que el tamaño se ajuste al contenido (el corazón) */
      justify-content: center;
      align-items: center;
      /* El tamaño del stack será dictado por el tamaño del corazón */
      width: var(--gq-livesdisp-icon-size, 1.8rem);
      height: var(--gq-livesdisp-icon-size, 1.8rem);
    }

    #lives-count-internal {
      position: absolute; /* Posicionar sobre el corazón */
      top: 56%;
      left: 50%;
      transform: translate(-50%, -50%); /* Centrar exactamente sobre el corazón */
      font-size: var(--gq-livesdisp-count-font-size, var(--gq-livesdisp-icon-size, 1.8rem));
      font-weight: var(--gq-livesdisp-count-font-weight, 700);
      color: var(--gq-livesdisp-text-color, #f3f4f6); /* Asegurar que el color del texto sea visible */
      z-index: 1; /* Asegurar que esté por encima del corazón */
      line-height: 1; /* Para un centrado vertical más predecible del texto */
      text-align: center;
      /* Opcional: añadir una pequeña sombra al texto para mejorar la legibilidad sobre el corazón */
      text-shadow:
                -2px -2px 0 #000,
                2px -2px 0 #000,
                -2px 2px 0 #000,
                2px 2px 0 #000,
                -3px 0px 0 #000,
                3px 0px 0 #000,
                0px -3px 0 #000,
                0px 3px 0 #000;
    }

    .life-emoji {
      font-size: 2.6rem; /* Tamaño base del corazón */
      line-height: 1;
      color: var(--gq-livesdisp-heart-color, #f43f5e);
      animation: pulseHeart 1.5s infinite ease-in-out;
      user-select: none;
      /* Asegurar que el emoji en sí esté centrado si tiene espaciado interno */
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @keyframes pulseHeart {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }

    .status-icon {
      font-size: var(--gq-livesdisp-icon-size, 1.8rem); /* Los iconos de estado también usan esta variable */
      line-height: 1;
      margin-left: var(--gq-livesdisp-status-icon-margin-left, 0.2rem);
      display: inline-block;
      user-select: none;
    }

    .shield-icon {
      filter: drop-shadow(0 0 3px var(--gq-livesdisp-shield-icon-shadow-color, rgba(59, 130, 246, 0.7)));
      animation: shieldPulse 2s infinite ease-in-out;
    }

    .hint-icon {
      filter: drop-shadow(0 0 3px var(--gq-livesdisp-hint-icon-shadow-color, rgba(250, 204, 21, 0.7)));
      animation: hintPulse 1.8s infinite ease-in-out;
    }

    @keyframes shieldPulse {
      0%, 100% { transform: scale(1); opacity: 0.9; }
      50% { transform: scale(1.1); opacity: 1; }
    }
    @keyframes hintPulse {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
      50% { transform: scale(1.08) rotate(5deg); opacity: 1; }
    }

    [hidden] { display: none !important; }
`;

  render() {
    const showHintIcon = this.hintCharges > 0;
    return html`
      <div class="lives-stack" part="lives-stack">
        <span class="life-emoji" part="heart-icon">❤️</span>
        <span id="lives-count-internal" part="count">${this.lives}</span>
      </div>
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
