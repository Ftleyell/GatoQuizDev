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
    
      firstUpdated() {
        if (this._canvasElement) {
          this._canvasContext = this._canvasElement.getContext('2d');
          if (!this._canvasContext) {
            console.error('DrawingCanvasLayer: No se pudo obtener el contexto 2D.');
          }
          this.dispatchEvent(new CustomEvent('canvas-ready', { bubbles: true, composed: true }));
        }
        this.resizeCanvas(); 
      }
    
      public getCanvasElement(): HTMLCanvasElement | null {
        return this._canvasElement ?? null;
      }
    
      public getContext(): CanvasRenderingContext2D | null {
        return this._canvasContext ?? null;
      }
    
      public resizeCanvas(): void {
        if (this._canvasElement) {
          this._canvasElement.width = window.innerWidth;
          this._canvasElement.height = window.innerHeight;
          this.dispatchEvent(new CustomEvent('canvas-resized', { bubbles: true, composed: true }));
        }
      }
    
      render() {
        return html`<canvas></canvas>`;
      }
    }
    
    declare global {
      interface HTMLElementTagNameMap {
        'drawing-canvas-layer': DrawingCanvasLayer;
      }
    }
    