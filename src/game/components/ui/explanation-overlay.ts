// src/game/components/ui/explanation-overlay.ts
import { LitElement, html, css, CSSResultGroup, nothing, PropertyValueMap } from 'lit';
import { query } from 'lit/decorators.js'; // Asegúrate de que query esté importado
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ExplanationResultType = 'correct' | 'incorrect' | 'shield' | 'info' | null;

@customElement('explanation-overlay-component')
export class ExplanationOverlayComponent extends LitElement {

  // --- Propiedades y State (sin cambios) ---
  @property({ type: String }) explanationText = '';
  @property({ type: String }) resultType: ExplanationResultType = null;
  @property({ type: Boolean /*, reflect: true */ }) isVisible = false;

  @state() private _statusText: string = '';
  @state() private _statusIcon: string = '';
  @state() private _statusClass: string = '';

  // --- Query para obtener referencia al wrapper ---
  @query('.overlay-content-wrapper') private _contentWrapper!: HTMLElement;

  // --- Estilos CSS (CORREGIDOS) ---
  static styles: CSSResultGroup = css`
    :host {
      /* El host cubre toda la pantalla dinámica y tiene padding */
      display: flex; position: fixed; inset: 0; width: 100%; height: 100dvh;
      justify-content: center; align-items: center; text-align: center;
      z-index: 101; padding: 1rem; box-sizing: border-box;
      opacity: 0; visibility: hidden; pointer-events: none;
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s;
      font-family: var(--gq-font-primary, 'Poppins', sans-serif);
    }
    :host([visible]) {
      opacity: 1; visibility: visible; pointer-events: auto;
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0s;
    }

    /* --- INICIO CAMBIOS CSS --- */
    .overlay-content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      max-width: 650px;
      /* Cambiamos max-height a porcentaje relativo al host (que tiene padding) */
      max-height: 90%;
      /* min-height: 150px; /* Quitamos min-height para simplificar */
      box-sizing: border-box;
      pointer-events: auto;
      background-color: var(--gq-expl-bg, rgba(17, 24, 39, 0.85));
      border: var(--gq-expl-border, 1px solid rgba(75, 85, 99, 0.5));
      padding: clamp(1rem, 3vh, 1.5rem) clamp(1rem, 4vw, 2rem);
      border-radius: var(--gq-expl-border-radius, 0.75rem);
      /* overflow: hidden; /* Quitamos esto */
    }

    .explanation-status-base {
      flex-shrink: 0; /* Evita que el estado se encoja */
      width: auto;
      max-width: 100%;
      box-sizing: border-box;
      font-size: clamp(1.1rem, 3vw + 0.5rem, 1.4rem); font-weight: 800; margin-bottom: clamp(0.6rem, 2.5vh, 0.8rem);
      padding: 0.3rem 0.8rem; border-radius: 0.5rem; display: inline-block;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); line-height: 1.3;
      color: var(--gq-expl-text-color, white); position: relative; z-index: 1;
    }
    /* ... Clases status-correct, status-incorrect, status-shield ... */
    .status-correct { background-color: var(--gq-expl-status-correct-bg, rgba(16, 185, 129, 0.8)); border: var(--gq-expl-status-correct-border, 1px solid #34d399); }
    .status-incorrect { background-color: var(--gq-expl-status-incorrect-bg, rgba(239, 68, 68, 0.8)); border: var(--gq-expl-status-incorrect-border, 1px solid #f87171); }
    .status-shield { background-color: var(--gq-expl-status-shield-bg, rgba(59, 130, 246, 0.8)); border: var(--gq-expl-status-shield-border, 1px solid #93c5fd); }


    .explanation-text {
      flex-grow: 1; /* Debe crecer */
      flex-shrink: 1; /* Debe poder encogerse */
      min-height: 0;  /* Fundamental para que flex-shrink funcione */
      overflow-y: auto; /* Scroll interno vertical */
      width: 100%;
      box-sizing: border-box;
      position: relative; z-index: 1;
      pointer-events: auto;
      color: var(--gq-expl-text-color, white); font-size: clamp(0.9rem, 2.5vw + 0.4rem, 1.1rem);
      line-height: 1.5; font-weight: 600; text-shadow: var(--gq-expl-text-shadow, 1px 1px 3px rgba(0,0,0,0.7));
      background-color: transparent; border: none;
      padding-top: 0.5rem; padding-bottom: 0.5rem; /* Padding interno para el scroll */
      scrollbar-width: thin;
      scrollbar-color: rgba(150,150,150,0.5) transparent;
    }
    .explanation-text::-webkit-scrollbar { width: 6px; }
    .explanation-text::-webkit-scrollbar-thumb { background-color: rgba(150,150,150,0.5); border-radius: 3px; }
    .explanation-text::-webkit-scrollbar-track { background: transparent; }

    .continue-prompt {
      flex-shrink: 0; /* Evita que el prompt se encoja */
      margin-top: clamp(0.8rem, 3vh, 1.2rem); font-size: clamp(0.7rem, 1.5vw + 0.3rem, 0.85rem);
      color: var(--gq-expl-prompt-text-color, rgba(229, 231, 235, 0.7)); font-weight: 400;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5); animation: fadeInOut 2s infinite ease-in-out;
      position: relative; z-index: 1;
      pointer-events: none;
    }
    /* --- FIN CAMBIOS CSS --- */

    @keyframes fadeInOut { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  `;

  // --- Lógica del componente (TypeScript) ---
  // (Sin cambios respecto a la versión anterior)
  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('resultType')) {
      this._updateStatusContent();
    }
    if (changedProperties.has('isVisible')) {
        const oldValue = changedProperties.get('isVisible');
        if (this.isVisible) { this.setAttribute('visible', ''); }
        else { this.removeAttribute('visible'); }
        this._handleVisibilityChange();
    }
  }

  private _updateStatusContent(): void {
    switch (this.resultType) {
      case 'correct': this._statusText = "¡Respuesta Correcta!"; this._statusIcon = '✅'; this._statusClass = 'status-correct'; break;
      case 'incorrect': this._statusText = "Respuesta Incorrecta"; this._statusIcon = '❌'; this._statusClass = 'status-incorrect'; break;
      case 'shield': this._statusText = "¡Escudo Activado!"; this._statusIcon = '🛡️'; this._statusClass = 'status-shield'; break;
      default: this._statusText = ''; this._statusIcon = ''; this._statusClass = '';
    }
  }

   private _handleVisibilityChange(): void {
      const listener = this._handleConfirm as EventListener;
      const keydownTarget = window;
      const clickTouchTarget = this; // Escuchar en el host para clics en el fondo

      if (this.isVisible) {
          // Añadir listeners si no están ya añadidos
          if (!this.hasAttribute('listeners-added')) {
              clickTouchTarget.addEventListener('click', listener);
              clickTouchTarget.addEventListener('touchstart', listener, { passive: false });
              keydownTarget.addEventListener('keydown', listener);
              this.setAttribute('listeners-added', '');
          }
      } else {
          // Remover listeners si están añadidos
          if (this.hasAttribute('listeners-added')) {
              clickTouchTarget.removeEventListener('click', listener);
              clickTouchTarget.removeEventListener('touchstart', listener);
              keydownTarget.removeEventListener('keydown', listener);
              this.removeAttribute('listeners-added');
          }
      }
  }

  private _handleConfirm = (event: Event) => {
      if (!this.isVisible) { return; }

      // Verificar si el evento es de teclado O si es un click/touch DIRECTAMENTE en el host (fondo)
      const isClickOnHost = (event instanceof MouseEvent || event instanceof TouchEvent) && event.target === this;
      const isKeyEvent = event instanceof KeyboardEvent;

      // Si NO es una tecla válida Y NO es un clic en el host, ignorar.
      if (!isKeyEvent && !isClickOnHost) {
          return;
      }

      // Verificar las teclas permitidas si es un evento de teclado
      if (isKeyEvent) {
          const key = event.key;
          if (key !== 'Enter' && key !== ' ' && key !== 'Escape') {
             return;
          }
      }

      // Detener la propagación y prevenir default
      event.stopPropagation();
      if (event.type === 'touchstart' || event.type === 'click') {
        event.preventDefault();
      }

      // Disparar el evento personalizado
      this.dispatchEvent(new CustomEvent('confirm-clicked', { bubbles: true, composed: true }));
  };

  // Limpiar listeners al desconectar el elemento
  disconnectedCallback(): void {
      super.disconnectedCallback();
      if (this.hasAttribute('listeners-added')) {
          const listener = this._handleConfirm as EventListener;
          this.removeEventListener('click', listener);
          this.removeEventListener('touchstart', listener);
          window.removeEventListener('keydown', listener);
          this.removeAttribute('listeners-added');
      }
  }

  // Renderizar el HTML del componente
  render() {
    const statusClasses = {
      'explanation-status-base': true,
      [this._statusClass]: !!this._statusClass,
    };
    return html`
      <div class="overlay-content-wrapper" part="wrapper">
        ${this._statusText ? html`
          <p class=${classMap(statusClasses)} part="status">
            ${this._statusIcon} ${this._statusText}
          </p>
        ` : nothing}
        <div class="explanation-text" part="text" tabindex="0"> ${this.explanationText}
        </div>
        <p class="continue-prompt" part="prompt">(Toca para continuar ...)</p> </div>
    `;
  }
} // Fin de la clase

// Definición global para TypeScript
declare global {
  interface HTMLElementTagNameMap {
    'explanation-overlay-component': ExplanationOverlayComponent;
  }
}