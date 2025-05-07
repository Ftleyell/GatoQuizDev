// src/game/components/ui/ink-bar.ts
import { LitElement, html, css, CSSResultGroup, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Ya no necesitamos DEFAULT_RAINBOW_COLORS ni DEFAULT_BACKGROUND_COLOR aquí,
// vendrán de los fallbacks de las variables CSS.

@customElement('ink-bar')
export class InkBar extends LitElement {

  @property({ type: Number }) currentInk = 0;
  @property({ type: Number }) maxInkPerBar = 1000;
  // La propiedad rainbowColors y defaultBgColor se eliminan, se controlarán por variables CSS.

  @state() private _fullBarsCompleted = 0;
  @state() private _currentBarPercentage = 0;
  // Los colores _containerBgColor y _segmentBgColor se aplicarán directamente
  // a través de variables CSS en el style del host y del segmento.

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      width: var(--gq-inkbar-width, 120px);
      height: var(--gq-inkbar-height, 12px);
      border-radius: var(--gq-inkbar-border-radius, 6px);
      overflow: hidden;
      position: relative;
      border: var(--gq-inkbar-border, 1px solid #4b5563);
      /* background-color se establece dinámicamente a través de --final-container-bg-color */
      transition: background-color 0.3s ease-out;
      box-sizing: border-box;
      background-color: var(--final-container-bg-color); /* Variable que se actualizará en render */
    }

    .ink-bar-segment {
      position: absolute;
      top: 0; left: 0;
      height: 100%;
      border-radius: inherit;
      /* background-color se establece dinámicamente a través de --final-segment-bg-color */
      width: 0%; /* Se actualiza con style property */
      transition: width 0.3s ease-out, background-color 0.3s ease-out;
      background-color: var(--final-segment-bg-color); /* Variable que se actualizará en render */
    }
  `;

  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('currentInk') || changedProperties.has('maxInkPerBar')) {
      this._calculateBarState();
      // Se necesita solicitar un update para que el render() coja los nuevos colores para las variables CSS locales
      this.requestUpdate();
    }
  }

  private _getRainbowColor(index: number, fallback: string): string {
    const computedStyle = getComputedStyle(this);
    // Intentar obtener --gq-inkbar-rainbow-color-N+1 porque los arrays son 0-indexados
    return computedStyle.getPropertyValue(`--gq-inkbar-rainbow-color-${index + 1}`).trim() || fallback;
  }

  private _calculateBarState() {
    const ink = Math.max(0, this.currentInk);
    const capacity = this.maxInkPerBar > 0 ? this.maxInkPerBar : 1000;
    
    // Asumimos que hay al menos un color de arcoíris definido como fallback
    const numColors = 7; // O leer cuántas variables --gq-inkbar-rainbow-color-N están definidas

    this._fullBarsCompleted = Math.floor(ink / capacity);
    const remainderInk = ink % capacity;

    if (ink === 0) {
        this._currentBarPercentage = 0;
        this._fullBarsCompleted = 0;
    } else if (remainderInk === 0) {
        this._currentBarPercentage = 100;
        this._fullBarsCompleted = Math.max(0, Math.floor(ink / capacity) - 1);
    } else {
        this._currentBarPercentage = (remainderInk / capacity) * 100;
    }
    // Los colores se resuelven en render() para construir las variables CSS locales
  }

  render() {
    const defaultBg = getComputedStyle(this).getPropertyValue('--gq-inkbar-bg-default').trim() || '#374151';
    const fallbackRainbowColor = getComputedStyle(this).getPropertyValue('--gq-inkbar-rainbow-color-1').trim() || '#a78bfa';
    const numColors = 7; // O un método más dinámico para contar las variables --gq-inkbar-rainbow-color-N

    const containerBgColor = this._fullBarsCompleted > 0
      ? this._getRainbowColor((this._fullBarsCompleted - 1) % numColors, defaultBg)
      : defaultBg;

    const segmentBgColor = this._getRainbowColor(this._fullBarsCompleted % numColors, fallbackRainbowColor);

    return html`
      <style>
        :host {
          /* Estas variables son locales al shadow DOM y se usan por los estilos estáticos */
          --final-container-bg-color: ${containerBgColor};
          --final-segment-bg-color: ${segmentBgColor};
        }
      </style>
      <div
        class="ink-bar-segment"
        part="segment"
        style="width: ${this._currentBarPercentage}%;"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-bar': InkBar;
  }
}