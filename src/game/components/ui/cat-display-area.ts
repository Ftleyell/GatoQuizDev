// src/game/components/ui/cat-display-area.ts
import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, query } from 'lit/decorators.js'; // Asegúrate de importar query

@customElement('cat-display-area')
export class CatDisplayArea extends LitElement {

  // Query para obtener una referencia al contenedor interno del shadow DOM
  @query('.entities-host-container')
  private _internalContainer!: HTMLDivElement;

  static styles: CSSResultGroup = css`
    :host {
      display: block;
      position: fixed; /* Ocupa toda la pantalla y está detrás de otros elementos UI */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /* Permite eventos de puntero por defecto. 
        Esto es importante para que Matter.js MouseConstraint funcione si se adjunta aquí,
        o para que los eventos de clic para soltar comida (si se manejan aquí) funcionen.
        Los elementos individuales de gato (cat-entity-display) tendrán su propio pointer-events: auto.
      */
      pointer-events: auto; 
      z-index: var(--gq-cat-display-z-index, 10); /* Ajusta según sea necesario, debe estar detrás de la UI principal */
      overflow: hidden; /* Evita barras de scroll si los gatos se salen un poco */
    }

    .entities-host-container {
      width: 100%;
      height: 100%;
      position: relative; /* Necesario para posicionar los gatos absolutamente dentro */
      /* Si este contenedor necesita ser clickeable (ej. para soltar comida), 
        asegúrate que no esté cubierto por otros elementos transparentes
        que bloqueen los clics.
      */
    }
  `;

  /**
   * Se llama después de que el componente se renderiza por primera vez.
   * Aquí nos aseguramos de que _internalContainer esté disponible.
   */
  protected firstUpdated() {
    // _internalContainer es inicializado por el decorador @query.
    // Podemos verificarlo aquí si es necesario, aunque @query usualmente lo maneja.
    if (!this._internalContainer) {
        console.error("CatDisplayArea: El contenedor interno '.entities-host-container' no fue encontrado en el shadow DOM después del primer renderizado.");
    }
  }

  /**
   * Añade un elemento HTML (como un <cat-entity-display>) al contenedor interno de esta área.
   * @param element - El elemento HTML a añadir.
   */
  public addEntityElement(element: HTMLElement) {
    if (this._internalContainer) {
      this._internalContainer.appendChild(element);
    } else {
      // Esto podría pasar si se llama antes de firstUpdated o si @query falla.
      console.error("CatDisplayArea: _internalContainer no está disponible. No se pudo añadir el elemento:", element);
      // Como fallback, intentar añadir al shadowRoot directamente, aunque es menos ideal.
      // this.shadowRoot?.appendChild(element); 
    }
  }

  /**
   * Remueve un elemento HTML del contenedor interno de esta área.
   * @param element - El elemento HTML a remover.
   */
  public removeEntityElement(element: HTMLElement) {
    if (this._internalContainer && this._internalContainer.contains(element)) {
      this._internalContainer.removeChild(element);
    } else if (this.shadowRoot?.contains(element)) {
      // Fallback si el elemento fue añadido directamente al shadowRoot (no debería pasar con la lógica actual)
      console.warn("CatDisplayArea: Elemento no encontrado en _internalContainer, intentando remover del shadowRoot.");
      this.shadowRoot.removeChild(element);
    } else {
      // console.warn("CatDisplayArea: Se intentó remover un elemento que no es hijo del contenedor interno o del shadowRoot:", element);
    }
  }

  /**
   * Limpia todos los elementos de entidad del contenedor interno.
   * Este es el método que estaba causando el error.
   */
  public clearAllEntityElements() {
    if (this._internalContainer) {
      this._internalContainer.innerHTML = ''; // Forma simple y efectiva de remover todos los hijos
      console.log("CatDisplayArea: Todos los elementos de entidad han sido limpiados.");
    } else {
      console.warn("CatDisplayArea: _internalContainer no disponible al intentar clearAllEntityElements.");
    }
  }

  /**
   * Devuelve el contenedor interno donde se alojan las entidades.
   * Puede ser usado por otros sistemas (ej. CatFoodManager) para adjuntar listeners
   * o interactuar con el área de fondo.
   * @returns El elemento HTMLDivElement del contenedor interno, o null si no está disponible.
   */
  public getInternalContainer(): HTMLDivElement | null {
    return this._internalContainer || null;
  }

  render() {
    return html`
      <div class="entities-host-container">
        </div>
    `;
  }
}

// Definición global para que TypeScript reconozca el tag <cat-display-area> en HTML y en querySelector.
declare global {
  interface HTMLElementTagNameMap {
    'cat-display-area': CatDisplayArea;
  }
}
