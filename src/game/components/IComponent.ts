// src/game/components/IComponent.ts

/**
 * Interfaz base para todos los componentes de entidad.
 * Permite identificar el tipo de componente.
 */
export interface IComponent {
    // Propiedad de solo lectura para identificar el tipo de componente.
    readonly type: string;
  }