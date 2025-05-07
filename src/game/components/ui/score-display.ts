    // src/game/components/ui/score-display.ts
    import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
    import { customElement, property, state, query } from 'lit/decorators.js';
    
    const FLARE_START_STREAK = 1;
    const FLARE_MAX_STREAK = 10;
    
    @customElement('score-display')
    export class ScoreDisplay extends LitElement {
    
      @property({ type: Number }) score = 0;
      @property({ type: Number }) combo = 0;
    
      @state() private _flareIntensity = 0;
      @state() private _shouldPulse = false;
      @state() private _scoreColor = 'var(--gq-scoredisp-text-color-base, #f3f4f6)';
      @state() private _scoreWeight = 800;
    
      @query('#score-text-internal') private _scoreTextElement!: HTMLElement;
      @query('#score-pulse-internal') private _scorePulseElement!: HTMLElement;
    
      static styles: CSSResultGroup = css`
        :host {
          display: inline-flex;
          align-items: center;
          position: relative;
          font-family: var(--gq-scoredisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
        }
    
        .score-emoji {
          font-size: var(--gq-scoredisp-emoji-size, 1.5rem);
          line-height: 1;
          margin-right: var(--gq-scoredisp-emoji-margin-right, 0.3rem);
          user-select: none;
        }
    
        #score-text-internal {
          transition: color 0.5s ease, font-weight 0.5s ease, text-shadow 0.6s ease-out;
          font-size: var(--gq-scoredisp-text-font-size, var(--score-font-size, 2rem)); /* Usa var global o local */
          line-height: var(--gq-scoredisp-text-line-height, var(--score-line-height, 1.1)); /* Usa var global o local */
          text-align: center;
          min-width: 1ch;
          user-select: none;
          /* font-weight y color se aplican dinámicamente */
          /* text-shadow se aplica dinámicamente mediante variables CSS inyectadas en render() */
        }
    
        /* Animación movida desde base.css y adaptada */
        @keyframes pulseFlareInternal { /* Renombrada para evitar colisión si base.css aún la tiene */
          0%, 100% { text-shadow: var(--final-flare-shadow); opacity: 1; }
          50% { text-shadow: var(--final-flare-shadow-pulse); opacity: 0.85; }
        }
    
        #score-text-internal.score-pulsing {
          animation: pulseFlareInternal 1.5s infinite ease-in-out;
        }
    
        #score-pulse-internal {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 1px; height: 1px;
          border-radius: 50%;
          background-color: var(--gq-scoredisp-pulse-effect-bg, rgba(255, 255, 255, 0.7));
          opacity: 0;
          z-index: -1;
          pointer-events: none;
        }
    
        /* Animación movida desde base.css */
        @keyframes scorePulseAnimInternal { /* Renombrada */
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) scale(200); opacity: 0; }
        }
    
        #score-pulse-internal.pulsing {
           animation: scorePulseAnimInternal 0.6s ease-out forwards;
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
    
      protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);
        if (changedProperties.has('combo')) {
          this._calculateEffects();
        }
        if (changedProperties.has('score') && changedProperties.get('score') !== undefined) {
          this._triggerPulseAnimation();
        }
      }
    
      private _calculateEffects() {
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
    
      private _triggerPulseAnimation() {
        if (this._scorePulseElement) {
          this._scorePulseElement.classList.remove('pulsing');
          void this._scorePulseElement.offsetWidth; // Forzar reflujo
          this._scorePulseElement.classList.add('pulsing');
        }
      }
    
      render() {
        // Las variables globales --flare-shadow y --flare-shadow-pulse se leen desde :root
        // y se usan para definir --final-flare-shadow y --final-flare-shadow-pulse localmente.
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
              /* Inyectar las variables finales para la animación del texto */
              /* Estas variables locales usan las globales definidas en themes.json o base.css */
              --final-flare-shadow: ${this._flareIntensity > 0 ? flareShadowValue : 'none'};
              --final-flare-shadow-pulse: ${this._flareIntensity > 0 ? flareShadowPulseValue : 'none'};
            }
            #score-text-internal {
              font-weight: ${this._scoreWeight};
              color: ${this._scoreColor};
              text-shadow: var(--final-flare-shadow); /* Usa la variable local */
            }
          </style>
          <span class="score-emoji" part="emoji">⭐</span>
          <span
            id="score-text-internal"
            part="text"
            class="${this._shouldPulse ? 'score-pulsing' : ''}"
          >
            ${this.score}
          </span>
          <div id="score-pulse-internal" part="pulse-effect"></div>
        `;
      }
    }
    
    declare global {
      interface HTMLElementTagNameMap {
        'score-display': ScoreDisplay;
      }
    }
    