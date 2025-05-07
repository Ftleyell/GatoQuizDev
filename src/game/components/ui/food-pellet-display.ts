// src/game/components/ui/food-pellet-display.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('food-pellet-display')
export class FoodPelletDisplay extends LitElement {

  static styles: CSSResultGroup = css`
    :host {
      display: block; 
      position: absolute; 
      width: var(--gq-food-pellet-size, 8px);
      height: var(--gq-food-pellet-size, 8px);
      background-color: var(--gq-food-pellet-bg-color, #A0522D); 
      border-radius: 50%;
      z-index: var(--gq-food-pellet-z-index, 12);
      pointer-events: none; 
      box-shadow: var(--gq-food-pellet-shadow, 0px 1px 2px rgba(0, 0, 0, 0.5));
      will-change: transform, opacity; /* Añadido opacity */

      /* Estilos iniciales para animación de aparición */
      opacity: 0;
      transform: scale(0.3) translate(-166%, -166%); /* Moverlo fuera de la vista inicial y escalado pequeño */
                                                     /* El translate es -100% / 0.3 (escala) para compensar */
      transition: opacity 0.25s ease-out, transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    /* Estado cuando el pellet ha aparecido */
    :host(.spawned) {
      opacity: 1;
      /* El transform de posición se aplicará directamente en el style por CatFoodManager */
      /* Solo necesitamos resetear la escala de la animación de aparición */
      transform: scale(1); 
    }

    /* Clase intermedia para asegurar que la posición se aplique antes de la animación */
    :host(.appearing) {
        opacity: 0;
        /* Mantenemos la escala pequeña, pero la posición ya estará correcta (aplicada por style.transform) */
        transform: scale(0.3); 
    }
  `;

  render() {
    // El transform de posición se actualiza en CatFoodManager.update
    // El transform de la animación de aparición está en los estilos de :host y :host(.spawned)
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'food-pellet-display': FoodPelletDisplay;
  }
}
