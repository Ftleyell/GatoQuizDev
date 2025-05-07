// src/game/components/ValueComponent.ts

import { IComponent } from './IComponent';

/**
 * Componente que almacena valores asociados a la entidad,
 * como rareza, valor en puntos, tamaño actual y nivel de crecimiento.
 */
export class ValueComponent implements IComponent {
  public readonly type = 'ValueComponent';
  public rarity: number = 0;
  public scoreValue: number = 0;
  public currentSize: number = 0;
  public growthLevel: number = 0; // <-- AÑADIDO: Para limitar el crecimiento

  /**
   * Crea una instancia de ValueComponent.
   * @param rarity - Nivel de rareza inicial.
   * @param scoreValue - Valor en puntos inicial.
   * @param initialSize - Tamaño inicial del gato.
   * @param initialGrowthLevel - Nivel de crecimiento inicial (normalmente 0). // <-- AÑADIDO
   */
  constructor(
      rarity: number = 0,
      scoreValue: number = 0,
      initialSize: number = 0,
      initialGrowthLevel: number = 0 // <-- AÑADIDO
    ) {
    this.rarity = rarity;
    this.scoreValue = scoreValue;
    this.currentSize = initialSize;
    this.growthLevel = initialGrowthLevel; // <-- AÑADIDO
  }
}