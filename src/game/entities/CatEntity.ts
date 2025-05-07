// src/game/entities/CatEntity.ts

import { IComponent } from '../components/IComponent'; // Importar interfaz base
import { PhysicsComponent } from '../components/PhysicsComponent';
import { RenderComponent } from '../components/RenderComponent';
import { ValueComponent } from '../components/ValueComponent';
// Importar otros componentes si se definen

/**
 * Representa una entidad Gato en el juego.
 * Agrupa varios componentes que definen su comportamiento y estado.
 */
export class CatEntity {
  public readonly id: string | number; // Identificador único para la entidad

  // Componentes principales (se podrían añadir más)
  public physics: PhysicsComponent;
  public render: RenderComponent;
  public value: ValueComponent;
  // Ejemplo: public state: StateComponent;

  /**
   * Crea una nueva instancia de CatEntity.
   * @param id - El identificador único para esta entidad.
   * @param physicsComp - La instancia del componente físico.
   * @param renderComp - La instancia del componente de renderizado.
   * @param valueComp - La instancia del componente de valor.
   */
  constructor(
    id: string | number,
    physicsComp: PhysicsComponent,
    renderComp: RenderComponent,
    valueComp: ValueComponent
    // , otrosComponentes...
  ) {
    this.id = id;
    this.physics = physicsComp;
    this.render = renderComp;
    this.value = valueComp;
    // this.state = stateComp;
  }

  /**
   * Obtiene un componente asociado a esta entidad por su tipo.
   * Útil en sistemas que operan sobre componentes específicos.
   * @param type - El string que identifica el tipo de componente (ej: 'PhysicsComponent').
   * @returns La instancia del componente si existe en esta entidad, o undefined.
   */
  public getComponent<T extends IComponent>(type: string): T | undefined {
    // Iterar sobre las propiedades de componente conocidas
    if (type === this.physics.type && this.physics instanceof PhysicsComponent) {
        return this.physics as unknown as T;
    }
    if (type === this.render.type && this.render instanceof RenderComponent) {
        return this.render as unknown as T;
    }
    if (type === this.value.type && this.value instanceof ValueComponent) {
        return this.value as unknown as T;
    }
    // Añadir checks para otros componentes aquí...

    // Si no se encuentra, devolver undefined
    return undefined;
  }

  // Se podrían añadir métodos helper como:
  // hasComponent(type: string): boolean { /* ... */ }
  // addComponent(component: IComponent): void { /* ... */ } // (Más complejo, requeriría un mapa interno)
}