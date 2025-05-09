// src/game/components/ui/options-menu-popup.ts
import { LitElement, html, css, CSSResultGroup, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
// Asegúrate que las rutas a tus managers sean correctas
import type { AudioManager } from '../../../systems/AudioManager';
import type { ThemeManager } from '../../../systems/ThemeManager';
import type { GameManager } from '../../GameManager'; // Para el sonido de UI

@customElement('options-menu-popup')
export class OptionsMenuPopup extends LitElement {

  @property({ type: Boolean, reflect: true })
  isVisible = false;

  // Propiedades para recibir el estado inicial del AudioManager
  // Estas se establecen desde GameManager cuando el popup se hace visible
  @property({ type: Number })
  initialVolume = 1;

  @property({ type: Boolean })
  initiallyMuted = false;

  // Referencias a managers (se pasarán desde GameManager)
  public audioManagerInstance?: AudioManager;
  public themeManagerInstance?: ThemeManager;
  public gameManagerInstance?: GameManager; // Para acceder a sonidos genéricos de UI si es necesario

  @state() private _currentVolume = 1;
  @state() private _isMuted = false;

  static styles: CSSResultGroup = css`
    :host {
      display: none; /* Oculto por defecto */
      position: fixed;
      inset: 0; /* Cubre toda la pantalla */
      justify-content: center;
      align-items: center;
      z-index: 101; /* Encima del backdrop, similar a shop-popup */
      pointer-events: none; /* El host no intercepta por defecto, el contenido sí */
      font-family: var(--gq-font-primary, 'Poppins', sans-serif);
    }
    :host([isVisible]) {
      display: flex;
      pointer-events: auto; /* Cuando es visible, el host puede interceptar para cerrar al hacer clic fuera */
    }

    .options-popup-content {
      /* Variables de tema con fallbacks a las de shop-popup o valores genéricos */
      background-color: var(--gq-options-popup-bg, var(--gq-shop-popup-bg, rgba(30, 40, 55, 0.97)));
      border-radius: var(--gq-options-popup-border-radius, var(--gq-shop-popup-border-radius, 1rem));
      border: var(--gq-options-popup-border, var(--gq-shop-popup-border, 1px solid #5a6b80));
      box-shadow: var(--gq-options-popup-box-shadow, var(--gq-shop-popup-box-shadow, 0 0.5rem 1.5rem rgba(0, 0, 0, 0.5)));
      color: var(--gq-options-popup-text-color, var(--gq-shop-popup-text-color, #dde1e7));
      
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem; /* Espacio entre elementos del menú */
      min-width: 280px;
      max-width: calc(100% - 2rem); /* Evita que toque los bordes en pantallas pequeñas */
      pointer-events: auto; /* El contenido sí es interactivo */
      position: relative; /* Para el botón de cierre absoluto */
      box-sizing: border-box;
    }

    .options-popup-title {
      font-size: var(--gq-options-popup-title-font-size, 1.4rem);
      font-weight: var(--gq-options-popup-title-font-weight, 700);
      text-align: center;
      margin: 0 0 0.5rem 0;
      color: var(--gq-options-popup-title-text-color, var(--gq-shop-popup-title-text-color, inherit));
    }

    .options-popup-close-btn {
      position: absolute;
      top: var(--gq-options-popup-close-btn-top, 0.3rem);
      right: var(--gq-options-popup-close-btn-right, 0.6rem);
      background: none;
      border: none;
      color: var(--gq-options-popup-close-btn-text-color, var(--gq-shop-popup-close-btn-text-color, #a0aec0));
      font-size: var(--gq-options-popup-close-btn-font-size, 2.2rem);
      line-height: 1;
      cursor: pointer;
      padding: 0.25rem;
      transition: color 0.2s ease;
    }
    .options-popup-close-btn:hover {
      color: var(--gq-options-popup-close-btn-hover-text-color, var(--gq-shop-popup-close-btn-hover-text-color, #e2e8f0));
    }

    .option-item {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .option-item label {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--gq-options-popup-label-color, inherit);
    }

    input[type="range"] {
      width: 100%;
      cursor: pointer;
      accent-color: var(--gq-slider-thumb-color, #fb923c); /* Color principal del slider */
      background: transparent; /* Para mejor control de track en algunos navegadores */
    }

    /* Estilos para el track del slider */
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 0.5rem;
      cursor: pointer;
      background: var(--gq-slider-track-color, #374151);
      border-radius: 0.25rem;
      border: 1px solid var(--gq-slider-track-border-color, #4b5563);
    }
    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 0.5rem;
      cursor: pointer;
      background: var(--gq-slider-track-color, #374151);
      border-radius: 0.25rem;
      border: 1px solid var(--gq-slider-track-border-color, #4b5563);
    }

    /* Estilos para el thumb (la bolita) del slider */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.2rem;
      height: 1.2rem;
      background: var(--gq-slider-thumb-color, #fb923c);
      border-radius: 50%;
      cursor: pointer;
      margin-top: -0.375rem; /* Ajustar verticalmente: (track_height - thumb_height) / 2  (considerando borde) */
      border: 2px solid var(--gq-slider-thumb-border-color, #f9fafb);
      box-shadow: 0 0 3px rgba(0,0,0,0.3);
    }
    input[type="range"]::-moz-range-thumb {
      width: 1.1rem; /* Ajustar para Firefox si es necesario */
      height: 1.1rem;
      background: var(--gq-slider-thumb-color, #fb923c);
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid var(--gq-slider-thumb-border-color, #f9fafb);
      box-shadow: 0 0 3px rgba(0,0,0,0.3);
    }
    input[type="range"]:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px var(--gq-slider-focus-ring-color, rgba(251, 146, 60, 0.5));
    }
    input[type="range"]:focus::-moz-range-thumb {
        box-shadow: 0 0 0 3px var(--gq-slider-focus-ring-color, rgba(251, 146, 60, 0.5));
    }


    .options-button {
      padding: 0.7rem 1.2rem;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: var(--gq-options-button-border-radius, var(--gq-opt-btn-border-radius, 0.6rem));
      border: var(--gq-options-button-border, var(--gq-opt-btn-border, none));
      background: var(--gq-options-button-bg, var(--gq-opt-btn-bg, linear-gradient(to right, #4f46e5, #7c3aed)));
      color: var(--gq-options-button-text-color, var(--gq-opt-btn-text-color, #FFFFFF));
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
      text-align: center;
      box-shadow: var(--gq-options-button-box-shadow, var(--gq-opt-btn-box-shadow, 0 3px 7px rgba(0,0,0,0.2)));
    }
    .options-button:hover {
      background: var(--gq-options-button-hover-bg, var(--gq-opt-btn-hover-bg, linear-gradient(to right, #6366f1, #8b5cf6)));
      box-shadow: var(--gq-options-button-hover-box-shadow, 0 4px 10px rgba(0,0,0,0.25));
      transform: translateY(-1px);
    }
    .options-button:active {
      transform: translateY(0px) scale(0.98);
      box-shadow: var(--gq-options-button-active-box-shadow, 0 1px 3px rgba(0,0,0,0.2));
    }

    @media (max-width: 480px) {
        .options-popup-content {
            padding: 1rem;
            gap: 1rem;
            min-width: calc(100% - 2rem);
        }
        .options-popup-title {
            font-size: 1.2rem;
        }
        .option-item label {
            font-size: 0.85rem;
        }
        .options-button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
        }
    }
  `;

  // Se llama cuando las propiedades `initialVolume` o `initiallyMuted` cambian.
  // Esto sucede cuando GameManager abre el popup y le pasa los valores actuales.
  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('initialVolume')) {
      this._currentVolume = this.initialVolume;
    }
    if (changedProperties.has('initiallyMuted')) {
      this._isMuted = this.initiallyMuted;
    }
  }


  connectedCallback() {
    super.connectedCallback();
    // Escuchar clics en el host para cerrar si se hace clic fuera del contenido
    // Se hace directamente en el host porque es el que recibe el evento si el clic es en el "fondo"
    this.addEventListener('click', this._handleHostClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleHostClick);
  }

  private _handleHostClick(event: MouseEvent) {
    if (event.target === this) { // Si el clic fue en el host mismo (el fondo)
      this._closePopup();
    }
  }

  private _handleVolumeChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this._currentVolume = parseFloat(target.value);
    this.audioManagerInstance?.setVolume(this._currentVolume);

    // Si el usuario mueve el slider y estaba muteado, quitar el mute
    if (this._isMuted && this._currentVolume > 0.00001) {
        this._isMuted = false;
        // No es necesario llamar a audioManagerInstance.toggleMute aquí,
        // setVolume ya debería manejar el desmuteo si el volumen es > 0.
        // O, si toggleMute es el único que maneja el flag 'isCurrentlyMuted' en AudioManager,
        // entonces sí deberías llamarlo:
        // this.audioManagerInstance?.toggleMute(false);
    } else if (!this._isMuted && this._currentVolume <= 0.00001) {
        // Si mueve el slider a 0 y no estaba muteado, mutearlo
        this._isMuted = true;
        // this.audioManagerInstance?.toggleMute(true);
    }
    this.requestUpdate(); // Para que el label del porcentaje se actualice
  }

  private _toggleMute() {
    if (!this.audioManagerInstance) return;

    const newMuteState = !this._isMuted;
    this.audioManagerInstance.toggleMute(newMuteState);
    this._isMuted = this.audioManagerInstance.isMuted(); // Sincronizar con el estado real del AudioManager

    // Si se desmuteó, asegurarse que el volumen no sea 0 y actualizar el slider
    if (!this._isMuted) {
        this._currentVolume = this.audioManagerInstance.getVolume();
        if (this._currentVolume <= 0.00001) { // Si el volumen era 0 (o muy bajo)
            const defaultUnmuteVolume = 0.5; // O el `volumeBeforeMute` de AudioManager
            this.audioManagerInstance.setVolume(defaultUnmuteVolume);
            this._currentVolume = defaultUnmuteVolume;
        }
    }
    this.requestUpdate(); // Para actualizar el texto del botón y el slider si es necesario
  }

  private _changeTheme() {
    this.themeManagerInstance?.cycleTheme();
    this.gameManagerInstance?.getAudioManager()?.playSound('ui_confirm');
  }

  private _closePopup() {
    if (!this.isVisible) return; // Evitar múltiples eventos si ya está cerrando
    this.isVisible = false;
    this.dispatchEvent(new CustomEvent('options-close-requested', { bubbles: true, composed: true }));
    this.gameManagerInstance?.getAudioManager()?.playSound('ui_cancel');
  }

  render() {
    if (!this.isVisible) {
      return nothing;
    }

    return html`
      <div class="options-popup-content" @click=${(e: Event) => e.stopPropagation()}>
        <button class="options-popup-close-btn" @click=${this._closePopup} title="Cerrar Opciones (Esc)" aria-label="Cerrar Opciones">&times;</button>
        <h2 class="options-popup-title">Opciones</h2>

        <div class="option-item">
          <label for="volume-slider">Volumen: ${this._isMuted ? 'Silenciado' : Math.round(this._currentVolume * 100) + '%'}</label>
          <input
            type="range"
            id="volume-slider"
            min="0"
            max="1"
            step="0.01"
            .value="${this._isMuted ? '0' : this._currentVolume.toString()}"
            ?disabled="${this._isMuted}"
            @input="${this._handleVolumeChange}"
            aria-label="Control de volumen"
          />
        </div>

        <div class="option-item">
          <button class="options-button" @click="${this._toggleMute}" aria-pressed="${this._isMuted}">
            ${this._isMuted ? 'Activar Sonido' : 'Silenciar'}
          </button>
        </div>

        <div class="option-item">
          <button class="options-button" @click="${this._changeTheme}">
            Cambiar Tema
          </button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'options-menu-popup': OptionsMenuPopup;
  }
}