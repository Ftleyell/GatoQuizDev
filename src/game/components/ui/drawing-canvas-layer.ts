// src/game/components/ui/drawing-canvas-layer.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('drawing-canvas-layer')
export class DrawingCanvasLayer extends LitElement {

  @query('canvas')
  private _canvasElement!: HTMLCanvasElement;
  private _canvasContext: CanvasRenderingContext2D | null = null;

  @property({ type: Boolean, reflect: true })
  isActive = false;

  @property({ type: Boolean, reflect: true })
  isPointerLockdown = false; 

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none; /* Por defecto, no interactivo */
      z-index: var(--gq-drawing-canvas-z-default, 15); 
      background-color: transparent;
    }

    /* Cuando el pincel está activo Y no hay un bloqueo de puntero */
    :host([isActive]:not([isPointerLockdown])) {
      pointer-events: auto;
      cursor: var(--gq-drawing-canvas-cursor-active, crosshair);
      z-index: var(--gq-drawing-canvas-z-active, 25); 
    }

    /* Cuando hay un bloqueo de puntero (ej. arrastrando un gato), siempre no interactivo */
    :host([isPointerLockdown]) {
      pointer-events: none !important; 
      cursor: default; 
    }

    canvas {
      width: 100%;
      height: 100%;
      display: block; 
    }
  `;

  constructor() {
    super();
    console.log('DrawingCanvasLayer: Constructor - Elemento creado pero aún no en DOM o actualizado.');
  }

  connectedCallback(): void {
    super.connectedCallback();
    console.log('DrawingCanvasLayer: connectedCallback - Elemento conectado al DOM.');
  }

  firstUpdated() {
    console.log('DrawingCanvasLayer: firstUpdated INICIADO.');
    if (this._canvasElement) {
        console.log('DrawingCanvasLayer: _canvasElement ENCONTRADO en firstUpdated:', this._canvasElement);
        this._canvasContext = this._canvasElement.getContext('2d');
        if (!this._canvasContext) {
            console.error('DrawingCanvasLayer: No se pudo obtener el contexto 2D del _canvasElement.');
        } else {
            console.log('DrawingCanvasLayer: Contexto 2D OBTENIDO exitosamente.');
        }
        // Emitir evento DESPUÉS de intentar obtener el contexto
        this.dispatchEvent(new CustomEvent('canvas-ready', { bubbles: true, composed: true }));
        console.log('DrawingCanvasLayer: Evento "canvas-ready" EMITIDO.');
    } else {
        console.error('DrawingCanvasLayer: _canvasElement es null/undefined en firstUpdated. @query("canvas") pudo haber fallado o el canvas no está en el template en este punto.');
        // Aunque _canvasElement sea undefined, igual emitimos 'canvas-ready' para desbloquear InkManager,
        // pero InkManager fallará al no obtener contexto. Esto ayuda a identificar el problema aquí.
        this.dispatchEvent(new CustomEvent('canvas-ready', { bubbles: true, composed: true }));
        console.warn('DrawingCanvasLayer: Evento "canvas-ready" EMITIDO a pesar de no encontrar _canvasElement (para depuración).');
    }
    this.resizeCanvas(); 
    console.log('DrawingCanvasLayer: firstUpdated FINALIZADO.');
  }

  public getCanvasElement(): HTMLCanvasElement | null {
    // console.log('DrawingCanvasLayer: getCanvasElement() llamado, devuelve:', this._canvasElement || null);
    return this._canvasElement ?? null;
  }

  public getContext(): CanvasRenderingContext2D | null {
    // console.log('DrawingCanvasLayer: getContext() llamado, devuelve:', this._canvasContext || null);
    return this._canvasContext ?? null;
  }

  public resizeCanvas(): void {
    if (this._canvasElement) {
      this._canvasElement.width = window.innerWidth;
      this._canvasElement.height = window.innerHeight;
      // console.log('DrawingCanvasLayer: Canvas redimensionado a', this._canvasElement.width, 'x', this._canvasElement.height);
      this.dispatchEvent(new CustomEvent('canvas-resized', { bubbles: true, composed: true }));
    } else {
      // console.warn('DrawingCanvasLayer: resizeCanvas llamado pero _canvasElement no está disponible.');
    }
  }

  render() {
    // console.log('DrawingCanvasLayer: render() llamado.');
    return html`<canvas></canvas>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'drawing-canvas-layer': DrawingCanvasLayer;
  }
}