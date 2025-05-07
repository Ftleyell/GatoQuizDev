// src/game/components/ui/diagonal-wipe.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Nombres de las animaciones CSS (deben coincidir con los definidos en animations.css)
const WIPE_IN_ANIMATION_NAME_CONST = 'sweep-in-tl-to-br';
const WIPE_OUT_ANIMATION_NAME_CONST = 'sweep-out-towards-br';

/**
 * DiagonalWipe: Un componente Lit para mostrar una transición de barrido diagonal.
 */
@customElement('diagonal-wipe')
export class DiagonalWipe extends LitElement {

  @property({ type: Boolean, reflect: true })
  visible = false;

  static styles: CSSResultGroup = css`
    :host {
      display: block; 
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: var(--gq-wipe-color, #2c3e50); 
      z-index: var(--gq-wipe-z-index, 1000); 
      pointer-events: none; 
      clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);
      visibility: hidden; 
    }

    :host([visible]) {
      visibility: visible; 
    }

    :host(.animate-in) {
      animation-name: sweep-in-tl-to-br; /* Nombre literal de la animación */
      animation-duration: var(--gq-wipe-in-duration, 0.6s);
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }

    :host(.animate-out) {
      animation-name: sweep-out-towards-br; /* Nombre literal de la animación */
      animation-duration: var(--gq-wipe-out-duration, 0.6s);
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  `;

  public async playIn(): Promise<void> {
    console.log('[DiagonalWipe] playIn() INICIADO.');
    return new Promise((resolve) => {
      this.classList.remove('animate-out'); 
      this.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)'; 
      this.visible = true; 
      void this.offsetWidth; 

      const onAnimationEnd = (event: AnimationEvent) => {
        if (event.animationName === WIPE_IN_ANIMATION_NAME_CONST) {
          this.removeEventListener('animationend', onAnimationEnd);
          this.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
          console.log('[DiagonalWipe] playIn() FINALIZADO - Promesa resuelta.');
          resolve();
        } else {
          console.log(`[DiagonalWipe] playIn() animationend para OTRA animación: ${event.animationName}`);
        }
      };
      this.addEventListener('animationend', onAnimationEnd);
      this.classList.add('animate-in'); 
      console.log('[DiagonalWipe] Clase "animate-in" añadida.');
    });
  }

  public async playOut(): Promise<void> {
    console.log('[DiagonalWipe] playOut() INICIADO.');
    return new Promise((resolve) => {
      if (!this.visible) { 
        console.log('[DiagonalWipe] playOut() llamado pero no visible, resolviendo inmediatamente.');
        resolve();
        return;
      }
      this.classList.remove('animate-in'); 
      this.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
      void this.offsetWidth; 

      const onAnimationEnd = (event: AnimationEvent) => {
        if (event.animationName === WIPE_OUT_ANIMATION_NAME_CONST) {
          this.removeEventListener('animationend', onAnimationEnd);
          this.reset(); 
          console.log('[DiagonalWipe] playOut() FINALIZADO - Promesa resuelta.');
          resolve();
        } else {
           console.log(`[DiagonalWipe] playOut() animationend para OTRA animación: ${event.animationName}`);
        }
      };
      this.addEventListener('animationend', onAnimationEnd);
      this.classList.add('animate-out'); 
      console.log('[DiagonalWipe] Clase "animate-out" añadida.');
    });
  }

  public reset(): void {
    console.log('[DiagonalWipe] reset() llamado.');
    this.classList.remove('animate-in', 'animate-out');
    this.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)';
    this.visible = false; 
  }

  render() {
    return html``; 
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'diagonal-wipe': DiagonalWipe;
  }
}
