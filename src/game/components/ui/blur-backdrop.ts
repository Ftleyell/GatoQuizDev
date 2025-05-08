// src/game/components/ui/blur-backdrop.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('blur-backdrop-component')
export class BlurBackdropComponent extends LitElement {

  @property({ type: Boolean, reflect: true })
  visible = false;

  static styles: CSSResultGroup = css`
    :host {
      display: block; /* Cambiado de none para que la transición funcione */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--gq-backdrop-bg-color, rgba(17, 24, 39, 0.5)); /* Themed */
      backdrop-filter: blur(var(--gq-backdrop-blur-radius, 5px)); /* Themed */
      -webkit-backdrop-filter: blur(var(--gq-backdrop-blur-radius, 5px));
      opacity: 0;
      visibility: hidden; /* Oculto por defecto */
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s; /* Ocultar visibility después de opacidad */
      pointer-events: none;
      z-index: 100; /* Mantenemos el z-index original */
      will-change: opacity; /* Optimización para la transición */
    }

    :host([visible]) {
      opacity: 1;
      visibility: visible; /* Visible cuando el atributo está presente */
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0s; /* Mostrar visibility inmediatamente */
      /* Mantenemos pointer-events: none; el backdrop nunca debe ser interactivo */
    }
  `;

  // No es necesario un render complejo, el host aplica el efecto
  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'blur-backdrop-component': BlurBackdropComponent;
  }
}