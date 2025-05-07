// src/game/components/RenderComponent.ts

import { IComponent } from './IComponent';

/**
 * Componente que almacena la información necesaria para renderizar
 * una entidad en la pantalla (ej: un elemento DOM).
 */
export class RenderComponent implements IComponent {
  public readonly type = 'RenderComponent';
  public element: HTMLElement | null = null; // Referencia al elemento visual (ej: un div)
  public isVisible: boolean = true; // Control básico de visibilidad
  // Podrían añadirse otras propiedades como: spriteKey, tintColor, zIndex, etc.

  /**
   * Crea una instancia de RenderComponent.
   * @param element - (Opcional) El elemento HTMLElement a asociar inicialmente.
   */
  constructor(element?: HTMLElement) {
    this.element = element ?? null;
  }
}