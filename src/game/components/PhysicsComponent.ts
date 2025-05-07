// src/game/components/PhysicsComponent.ts

import { IComponent } from './IComponent';
import Matter from 'matter-js'; // Importar directamente el namespace

/**
 * Componente que almacena la representación física de una entidad
 * usando Matter.js.
 */
export class PhysicsComponent implements IComponent {
  public readonly type = 'PhysicsComponent';
  public body: Matter.Body | null = null; // Referencia al cuerpo físico

  /**
   * Crea una instancia de PhysicsComponent.
   * @param body - (Opcional) El cuerpo de Matter.js a asociar inicialmente.
   */
  constructor(body?: Matter.Body) {
    this.body = body ?? null;
  }
}