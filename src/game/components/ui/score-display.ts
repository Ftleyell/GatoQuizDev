import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

const FLARE_START_STREAK = 1;
const FLARE_MAX_STREAK = 10;

// Constantes para la animación del puntaje
const SCORE_ANIM_STEP_FAST_THRESHOLD_1 = 50; // A partir de esta diferencia, el incremento es más rápido
const SCORE_ANIM_STEP_FAST_THRESHOLD_2 = 200;
const SCORE_ANIM_STEP_FAST_THRESHOLD_3 = 1000;
const SCORE_ANIM_STEP_FAST_THRESHOLD_4 = 5000;

const SCORE_ANIM_DIVISOR_1 = 5;
const SCORE_ANIM_DIVISOR_2 = 10;
const SCORE_ANIM_DIVISOR_3 = 20;
const SCORE_ANIM_DIVISOR_4 = 50;
const SCORE_ANIM_DIVISOR_5 = 100;


@customElement('score-display')
export class ScoreDisplay extends LitElement {

  @property({ type: Number }) score = 0;
  @property({ type: Number }) combo = 0;

  @state() private _flareIntensity = 0;
  @state() private _shouldPulse = false; // Para el pulso del text-shadow basado en combo
  @state() private _scoreColor = 'var(--gq-scoredisp-text-color-base, #f3f4f6)';
  @state() private _scoreWeight = 800;

  @state() private _displayScore: number = 0; // Puntuación que se muestra y anima
  @state() private _targetScore: number = 0; // Puntuación final a la que se anima
  @state() private _isAnimatingScore: boolean = false;
  private _scoreAnimationId: number | null = null;

  @query('#score-text-internal') private _scoreTextElement!: HTMLElement;
  @query('#score-pulse-internal') private _scorePulseElement!: HTMLElement;

  static styles: CSSResultGroup = css`
    :host {
      display: inline-flex;
      align-items: center;
      position: relative;
      font-family: var(--gq-scoredisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      /* Variable para el color del pulso pequeño */
      --gq-scoredisp-pulse-step-color: var(--gq-scoredisp-pulse-step-color-override, rgba(255, 220, 100, 0.6));
    }

    .score-emoji {
      font-size: var(--gq-scoredisp-emoji-size, 1.5rem);
      line-height: 1;
      margin-right: var(--gq-scoredisp-emoji-margin-right, 0.3rem);
      user-select: none;
    }

    #score-text-internal {
      transition: color 0.5s ease, font-weight 0.5s ease, text-shadow 0.6s ease-out;
      font-size: var(--gq-scoredisp-text-font-size, var(--score-font-size, 2rem));
      line-height: var(--gq-scoredisp-text-line-height, var(--score-line-height, 1.1));
      text-align: center;
      min-width: 1ch;
      user-select: none;
      /* font-weight y color se aplican dinámicamente */
      /* text-shadow se aplica dinámicamente mediante variables CSS inyectadas en render() */
    }

    /* Animación de pulso de texto original (basada en combo) */
    @keyframes pulseFlareInternal {
      0%, 100% { text-shadow: var(--final-flare-shadow); opacity: 1; }
      50% { text-shadow: var(--final-flare-shadow-pulse); opacity: 0.85; }
    }

    #score-text-internal.score-pulsing {
      animation: pulseFlareInternal 1.5s infinite ease-in-out;
    }

    /* Efecto de "sacudida" para cada incremento de puntuación */
    @keyframes scoreJolt {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(-1px, -1px) scale(1.03); } /* Ligera sacudida y aumento */
      50% { transform: translate(1px, 1px) scale(0.97); }  /* Sacudida en otra dirección y encogimiento */
      75% { transform: translate(1px, -1px) scale(1.02); }
    }
    #score-text-internal.score-increment-jolt {
      animation: scoreJolt 0.07s ease-in-out; /* Duración muy corta */
    }


    #score-pulse-internal {
      position: absolute;
      left: 50%; top: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 1px; height: 1px; /* El tamaño se controla con scale */
      border-radius: 50%;
      background-color: var(--gq-scoredisp-pulse-effect-bg, rgba(255, 255, 255, 0.7));
      opacity: 0;
      z-index: -1;
      pointer-events: none;
    }

    /* Animación de pulso grande original (al cambiar score, ahora opcional o para fin de animación) */
    @keyframes scorePulseAnimInternal {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0.7; }
      100% { transform: translate(-50%, -50%) scale(200); opacity: 0; }
    }
    #score-pulse-internal.pulsing {
        animation: scorePulseAnimInternal 0.6s ease-out forwards;
    }

    /* Animación de pulso PEQUEÑO para cada paso de la animación del score */
    @keyframes scoreStepPulseAnim {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
      100% { transform: translate(-50%, -50%) scale(60); opacity: 0; } /* Escala más pequeña y rápida */
    }
    #score-pulse-internal.pulsing-step {
      background-color: var(--gq-scoredisp-pulse-step-color); /* Color diferente para el pulso pequeño */
      animation: scoreStepPulseAnim 0.25s ease-out forwards; /* Animación más rápida */
    }

    @media (max-width: 768px) {
      .score-emoji { font-size: var(--gq-scoredisp-emoji-tablet-size, var(--gq-scoredisp-emoji-size, 1.3rem)); }
      #score-text-internal { font-size: var(--gq-scoredisp-text-tablet-font-size, var(--gq-scoredisp-text-font-size, 1.8rem)); }
    }
    @media (max-width: 480px) {
      .score-emoji { 
        font-size: var(--gq-scoredisp-emoji-mobile-size, var(--gq-scoredisp-emoji-tablet-size, 1.2rem));
        margin-right: var(--gq-scoredisp-emoji-mobile-margin-right, var(--gq-scoredisp-emoji-margin-right, 0.2rem));
      }
      #score-text-internal { font-size: var(--gq-scoredisp-text-mobile-font-size, var(--gq-scoredisp-text-tablet-font-size, 1.6rem)); }
    }
  `;

  constructor() {
    super();
    // _displayScore y _targetScore se inicializarán correctamente
    // cuando 'score' se establezca por primera vez o en connectedCallback.
  }

  connectedCallback() {
    super.connectedCallback();
    // Si el score ya tiene un valor al conectarse (ej. desde un atributo HTML),
    // inicializamos _displayScore y _targetScore con él.
    if (this.score !== undefined && !this._isAnimatingScore) {
        // Solo inicializar si no hay una animación en curso y _displayScore aún no refleja this.score
        if (this._displayScore !== this.score) {
            this._displayScore = this.score;
            this._targetScore = this.score;
        }
    }
  }

  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('combo')) {
      this._calculateEffects(); // Actualiza destello, pulso de texto, color, peso según el combo
    }

    if (changedProperties.has('score')) {
      const oldScoreValue = changedProperties.get('score') as number | undefined;
      const newScoreValue = this.score;

      if (oldScoreValue === undefined && newScoreValue !== undefined) {
        // Es la primera vez que se establece 'score' (o se establece desde undefined)
        this._displayScore = newScoreValue;
        this._targetScore = newScoreValue;
        this._isAnimatingScore = false;
        if (this._scoreAnimationId) {
          cancelAnimationFrame(this._scoreAnimationId);
          this._scoreAnimationId = null;
        }
        // Podríamos disparar un pulso inicial grande aquí si quisiéramos,
        // o simplemente dejar que la primera puntuación aparezca.
        // Por ahora, si la puntuación inicial es > 0, la animaremos.
        if (newScoreValue !== 0) { // Animar si el score inicial no es cero
             this._animateScoreUpdate(0, newScoreValue); // Animar desde 0 al valor inicial
        }

      } else if (newScoreValue !== oldScoreValue) {
        // 'score' ha cambiado, iniciar o redirigir la animación.
        // Animamos desde el valor actualmente mostrado (_displayScore) hacia el nuevo 'this.score'.
        this._animateScoreUpdate(this._displayScore, newScoreValue);
      }
    }
  }

  private _calculateEffects() {
    // Lógica para calcular intensidad del destello, pulso de texto, color y peso de la fuente
    // basado en this.combo. Esta función permanece igual.
    this._flareIntensity = this.combo < FLARE_START_STREAK ? 0 : Math.min((this.combo - FLARE_START_STREAK + 1) / (FLARE_MAX_STREAK - FLARE_START_STREAK + 1), 1);
    this._shouldPulse = this._flareIntensity > 0.3;

    const scoreIntensity = Math.min(this.combo / 10, 1);
    
    const baseWeight = parseFloat(getComputedStyle(this).getPropertyValue('--gq-scoredisp-font-weight-base').trim() || '700');
    const weightIncrement = parseFloat(getComputedStyle(this).getPropertyValue('--gq-scoredisp-font-weight-increment').trim() || '100');
    const maxWeightSteps = parseFloat(getComputedStyle(this).getPropertyValue('--gq-scoredisp-font-weight-max-steps').trim() || '2');
    this._scoreWeight = baseWeight + Math.floor(scoreIntensity * maxWeightSteps) * weightIncrement;

    const baseColor = getComputedStyle(this).getPropertyValue('--gq-scoredisp-text-color-base').trim() || '#f3f4f6';
    const comboHueOffset = parseFloat(getComputedStyle(this).getPropertyValue('--gq-scoredisp-text-color-combo-hue-offset').trim() || '180');
    const comboSaturation = getComputedStyle(this).getPropertyValue('--gq-scoredisp-text-color-combo-saturation').trim() || '80%';
    const comboLightnessBase = parseFloat(getComputedStyle(this).getPropertyValue('--gq-scoredisp-text-color-combo-lightness-base').trim() || '90');
    const comboLightnessFactor = parseFloat(getComputedStyle(this).getPropertyValue('--gq-scoredisp-text-color-combo-lightness-factor').trim() || '10');
    const bodyBgHueBase = parseFloat(getComputedStyle(this).getPropertyValue('--gq-body-bg-combo-hue-base').trim() || '220');

    const scoreLightness = comboLightnessBase + scoreIntensity * comboLightnessFactor;
    const currentBodyHue = (bodyBgHueBase + (this.combo * (parseFloat(getComputedStyle(this).getPropertyValue('--gq-combo-color-hue-increment').trim() || '10')))) % 360;
    const scoreHue = (currentBodyHue + comboHueOffset) % 360;
    
    this._scoreColor = (this.combo < 2) ? baseColor : `hsl(${scoreHue}, ${comboSaturation}, ${scoreLightness}%)`;
  }

  private _animateScoreUpdate(fromDisplayScore: number, toActualScore: number) {
    if (this._scoreAnimationId) {
      cancelAnimationFrame(this._scoreAnimationId);
    }

    // Aseguramos que _displayScore esté sincronizado con fromDisplayScore al inicio de una nueva animación.
    // Esto es importante si la animación se interrumpe y se reinicia.
    this._displayScore = fromDisplayScore;
    this._targetScore = toActualScore; // El objetivo final de esta secuencia de animación
    this._isAnimatingScore = true;

    const animationStep = () => {
      // Si this.score (la propiedad real) ha cambiado MIENTRAS esta animación se ejecuta,
      // debemos redirigir la animación hacia el nuevo valor de this.score.
      if (this._targetScore !== this.score) {
        if (this._scoreAnimationId) cancelAnimationFrame(this._scoreAnimationId);
        // Iniciar una nueva animación desde el _displayScore actual hacia el nuevo this.score
        this._animateScoreUpdate(this._displayScore, this.score);
        return;
      }

      const diff = this._targetScore - this._displayScore;

      if (diff === 0) {
        this._isAnimatingScore = false;
        this._scoreAnimationId = null;
        // Opcional: Disparar un pulso grande al final de la animación si se desea.
        // this._triggerPulseAnimation(); // El original grande
        this.requestUpdate(); // Asegurar que el estado final se renderice
        return;
      }

      let increment = 1;
      const absDiff = Math.abs(diff);

      // Ajustar el tamaño del incremento para que la animación no sea demasiado lenta en saltos grandes.
      // Cuanto mayor la diferencia, mayor el "paso" del contador.
      if (absDiff > SCORE_ANIM_STEP_FAST_THRESHOLD_4) increment = Math.floor(absDiff / SCORE_ANIM_DIVISOR_5);
      else if (absDiff > SCORE_ANIM_STEP_FAST_THRESHOLD_3) increment = Math.floor(absDiff / SCORE_ANIM_DIVISOR_4);
      else if (absDiff > SCORE_ANIM_STEP_FAST_THRESHOLD_2) increment = Math.floor(absDiff / SCORE_ANIM_DIVISOR_3);
      else if (absDiff > SCORE_ANIM_STEP_FAST_THRESHOLD_1) increment = Math.floor(absDiff / SCORE_ANIM_DIVISOR_2);
      else if (absDiff > 10) increment = Math.max(1, Math.floor(absDiff / SCORE_ANIM_DIVISOR_1));
      
      increment = Math.max(1, increment); // El incremento mínimo es 1

      if (diff < 0) increment = -increment; // Manejar decrementos

      // Asegurar que no nos pasemos del objetivo
      if (Math.abs(increment) > absDiff) {
        increment = diff;
      }

      this._displayScore += increment;
      this._triggerPerStepEffects(); // ¡Efectos visuales en cada paso!

      this.requestUpdate(); // Solicitar a LitElement que vuelva a renderizar
      this._scoreAnimationId = requestAnimationFrame(animationStep);
    };

    this._scoreAnimationId = requestAnimationFrame(animationStep);
  }

  private _triggerPerStepEffects() {
    // Efecto de "sacudida" en el texto
    if (this._scoreTextElement) {
      // Quitar la clase primero para reiniciar la animación si se llama muy rápido
      this._scoreTextElement.classList.remove('score-increment-jolt');
      void this._scoreTextElement.offsetWidth; // Forzar reflujo para reiniciar la animación CSS
      this._scoreTextElement.classList.add('score-increment-jolt');
    }

    // Efecto de pulso PEQUEÑO
    if (this._scorePulseElement) {
      this._scorePulseElement.classList.remove('pulsing-step');
      void this._scorePulseElement.offsetWidth; // Forzar reflujo
      this._scorePulseElement.classList.add('pulsing-step');
    }
  }
  
  // Esta es la animación de pulso grande original. Se puede llamar si es necesario.
  private _triggerPulseAnimation() {
    if (this._scorePulseElement) {
      this._scorePulseElement.classList.remove('pulsing');
      void this._scorePulseElement.offsetWidth; // Forzar reflujo
      this._scorePulseElement.classList.add('pulsing');
    }
  }

  render() {
    const flareShadowValue = `
      0 0 5px var(--gq-score-flare-color-1, transparent),
      0 0 10px var(--gq-score-flare-color-2, transparent),
      0 0 15px var(--gq-score-flare-color-3, transparent),
      0 0 20px var(--gq-score-flare-color-4, transparent)
    `;
    const flareShadowPulseValue = `
      0 0 5px var(--gq-score-flare-pulse-color-1, transparent),
      0 0 12px var(--gq-score-flare-pulse-color-2, transparent),
      0 0 18px var(--gq-score-flare-pulse-color-3, transparent),
      0 0 24px var(--gq-score-flare-pulse-color-4, transparent)
    `;

    return html`
      <style>
        :host {
          /* Inyectar las variables finales para la animación del texto (flare) */
          --final-flare-shadow: ${this._flareIntensity > 0 ? flareShadowValue : 'none'};
          --final-flare-shadow-pulse: ${this._flareIntensity > 0 ? flareShadowPulseValue : 'none'};
        }
        #score-text-internal {
          font-weight: ${this._scoreWeight};
          color: ${this._scoreColor};
          text-shadow: var(--final-flare-shadow);
        }
      </style>
      <span class="score-emoji" part="emoji" aria-hidden="true">⭐</span>
      <span
        id="score-text-internal"
        part="text"
        class="${this._shouldPulse ? 'score-pulsing' : ''} ${this._isAnimatingScore && this._displayScore !== this._targetScore ? '' : ''}"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        ${Math.round(this._displayScore)}
      </span>
      <div id="score-pulse-internal" part="pulse-effect" aria-hidden="true"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'score-display': ScoreDisplay;
  }
}
