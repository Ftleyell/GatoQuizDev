// src/game/components/ui/cat-entity-display.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cat-entity-display')
export class CatEntityDisplay extends LitElement {

  @property({ type: Number })
  size = 50; 

  @property({ type: String, attribute: 'image-url' })
  imageUrl = '';

  @property({ type: String, attribute: 'background-color-fallback' })
  backgroundColorFallback = 'var(--gq-cat-fallback-bg, #ccc)'; 

  @property({ type: String, attribute: 'glow-class' })
  glowClass = ''; 

  static styles: CSSResultGroup = css`
    :host {
      display: block; 
      position: absolute; 
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      cursor: grab;
      pointer-events: auto; 
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      will-change: transform, width, height, box-shadow, opacity; /* Añadido opacity */
      box-shadow: var(--gq-cat-base-shadow, inset -2px -2px 5px rgba(0,0,0,0.3));
      /* Estilos iniciales para animación de aparición */
      opacity: 0;
      transform: scale(0.5) translate(-100%, -100%); /* Moverlo fuera de la vista inicial y escalado */
      transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                  box-shadow 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out;
    }

    /* Estado cuando el gato ha aparecido */
    :host(.spawned) {
      opacity: 1;
      /* El transform de posición y rotación se aplicará directamente en el style por CatManager */
      /* Solo necesitamos resetear la escala de la animación de aparición */
      transform: scale(1); 
    }
    
    /* Clase intermedia para asegurar que la posición se aplique antes de la animación */
    :host(.appearing) {
        opacity: 0;
        /* Mantenemos la escala pequeña, pero la posición ya estará correcta */
        transform: scale(0.5); 
    }


    /* Estilos de Brillo (Glow) */
    :host(.glow-gray) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-gray-blur, 10px) var(--gq-cat-glow-gray-spread, 4px) var(--gq-cat-glow-gray-color, rgba(180, 180, 180, 0.7));
    }
    :host(.glow-green) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-green-blur, 12px) var(--gq-cat-glow-green-spread, 5px) var(--gq-cat-glow-green-color, rgba(0, 255, 0, 0.7));
    }
    :host(.glow-blue) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-blue-blur, 12px) var(--gq-cat-glow-blue-spread, 5px) var(--gq-cat-glow-blue-color, rgba(0, 150, 255, 0.7));
    }
    :host(.glow-violet) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-violet-blur, 14px) var(--gq-cat-glow-violet-spread, 6px) var(--gq-cat-glow-violet-color, rgba(180, 0, 255, 0.65));
    }
    :host(.glow-orange) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-orange-blur, 15px) var(--gq-cat-glow-orange-spread, 7px) var(--gq-cat-glow-orange-color, rgba(255, 140, 0, 0.7));
    }
  `;

  protected updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties); 
    if (changedProperties.has('glowClass')) {
      const oldGlowClass = changedProperties.get('glowClass') as string | undefined;
      if (oldGlowClass && oldGlowClass !== this.glowClass) {
        this.classList.remove(oldGlowClass);
      }
      if (this.glowClass) {
        this.classList.add(this.glowClass);
      }
    }
    // La animación de spawn se maneja por clases 'appearing' y 'spawned'
    // y el transform de posición/rotación se aplica directamente al style por CatManager.
  }

  render() {
    this.style.width = `${this.size}px`;
    this.style.height = `${this.size}px`;
    this.style.backgroundImage = this.imageUrl ? `url('${this.imageUrl}')` : 'none';
    this.style.backgroundColor = this.imageUrl ? 'transparent' : this.backgroundColorFallback;
    
    // El transform de posición y rotación se actualiza en CatManager.updateCats
    // El transform de la animación de aparición está en los estilos de :host y :host(.spawned)
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cat-entity-display': CatEntityDisplay;
  }
}
