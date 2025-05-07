// src/game/components/ui/combo-counter.ts
import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Las constantes se pueden convertir en fallbacks de variables CSS
// const COMBO_BASE_FONT_SIZE_REM = 3.0; // Fallback para --gq-combo-font-size-base
// const COMBO_FONT_INCREMENT_REM = 0.5; // Fallback para --gq-combo-font-size-increment
// const COMBO_MAX_SIZE_STREAK = 10; // Se mantiene en JS por ahora
// const COMBO_HUE_INCREMENT = 35;   // Fallback para --gq-combo-color-hue-increment

@customElement('combo-counter')
export class ComboCounter extends LitElement {

  @property({ type: Number }) combo = 0;

  @state() private _isVisible = false;
  // _fontSizeRem y _textColor se aplicarán directamente en el style del host

  static styles: CSSResultGroup = css`
    :host {
      position: fixed;
      bottom: var(--gq-combo-position-bottom, 0.5rem);
      left: var(--gq-combo-position-left, 0.5rem);
      z-index: 2;
      pointer-events: none;
      transition: font-size 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  color 0.4s ease-out,
                  opacity 0.3s ease-out,
                  transform 0.3s ease-out;
      font-family: var(--gq-combo-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-weight: var(--gq-combo-font-weight, 900);
      text-shadow: var(--gq-combo-text-shadow, 1px 1px 5px rgba(0,0,0,0.5));
      white-space: nowrap;
      opacity: 0;
      transform: scale(0.8) translateY(10px);
      will-change: transform, opacity, font-size, color;
      /* font-size y color se aplican en _updateVisuals */
    }

    :host([visible]) {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    @media (min-width: 768px) {
       :host {
         bottom: var(--gq-combo-desktop-position-bottom, var(--gq-combo-position-bottom, 1rem));
         left: var(--gq-combo-desktop-position-left, var(--gq-combo-position-left, 1rem));
       }
    }
  `;

  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('combo')) {
      this._updateVisuals();
    }
  }

  private _updateVisuals() {
    this._isVisible = this.combo > 0;
    this.toggleAttribute('visible', this._isVisible);

    let fontSizeRem = parseFloat(getComputedStyle(this).getPropertyValue('--gq-combo-font-size-base').trim() || '3.0');
    let textColor = 'transparent';

    if (this._isVisible) {
      const COMBO_MAX_SIZE_STREAK = 10; // Se puede mantener o hacer variable también
      const sizeIncrementFactor = parseFloat(getComputedStyle(this).getPropertyValue('--gq-combo-font-size-increment').trim() || '0.5');
      const sizeIncrease = Math.min(Math.max(0, this.combo - 1), COMBO_MAX_SIZE_STREAK);
      fontSizeRem = parseFloat(getComputedStyle(this).getPropertyValue('--gq-combo-font-size-base').trim() || '3.0') + sizeIncrease * sizeIncrementFactor;

      const comboHueIncrement = parseFloat(getComputedStyle(this).getPropertyValue('--gq-combo-color-hue-increment').trim() || '35');
      const comboSaturation = getComputedStyle(this).getPropertyValue('--gq-combo-color-saturation').trim() || '100%';
      const comboLightness = getComputedStyle(this).getPropertyValue('--gq-combo-color-lightness').trim() || '65%';
      
      const comboHue = (this.combo * comboHueIncrement) % 360;
      textColor = `hsl(${comboHue}, ${comboSaturation}, ${comboLightness})`;
    }
    
    this.style.fontSize = `${fontSizeRem}rem`;
    this.style.color = textColor;
  }

  render() {
    return html`${this._isVisible ? `x${this.combo}` : ''}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'combo-counter': ComboCounter;
  }
}