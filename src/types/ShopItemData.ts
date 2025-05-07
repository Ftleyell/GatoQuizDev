// src/types/ShopItemData.ts

/**
 * Estructura de los datos brutos de un ítem de tienda, tal como se cargan desde JSON.
 * Define los parámetros para calcular costos, efectos y condiciones.
 */
export interface ShopItemJsonData {
  /** Identificador único del ítem (ej: 'life', 'unlockDrawing', 'comboMultiplier') */
  id: string;

  /** Nombre del ítem que se mostrará en la UI (tooltip). */
  name: string;

  /** Icono o emoji para representar el ítem en la UI. */
  icon: string;

  /** (Opcional) Categoría a la que pertenece el ítem (para organizar la tienda). */
  category?: string;

  /** Indica si el ítem se puede comprar múltiples veces para subir de nivel. */
  isLeveled: boolean;

  /** (Opcional) Nivel máximo alcanzable si el ítem es 'isLeveled'. */
  maxLevel?: number;

  /** (Opcional) Clave en PlayerData que almacena el nivel actual de este ítem (si isLeveled). */
  levelRef?: string;

  /** Parámetros para calcular el costo actual del ítem. */
  cost: {
    /** Costo base inicial. */
    base: number;
    /** (Opcional) Tipo de cálculo para ítems mejorables ('linear' o 'exponential'). */
    type?: 'linear' | 'exponential';
    /** (Opcional) Incremento por nivel para costo 'linear'. */
    perLevel?: number;
    /** (Opcional) Multiplicador por nivel para costo 'exponential'. */
    multiplier?: number;
    /** (Opcional) Clave en PlayerData para calcular costo basado en otro valor (ej: costo de vida basado en vidas actuales). */
    levelRef?: string;
  };

  /** Plantilla de texto para mostrar el efecto, con placeholders como {lives}, {currentValue}, etc. */
  effectTemplate: string;

  /** (Opcional) Parámetros para verificar si el ítem se puede comprar (además del costo). */
  purchaseCheck?: {
    /** Condición a evaluar ('lessThan', 'isFalse', 'isTrue', etc.). */
    condition: 'lessThan' | 'lessThanOrEqual' | 'isFalse' | 'isTrue' | 'greaterThan' | 'greaterThanOrEqual';
    /** Clave en PlayerData cuyo valor se usará en la condición. */
    valueRef: string;
    /** (Opcional) Límite numérico para condiciones de comparación. */
    limit?: number;
  };

   /** (Opcional) Parámetros para verificar si el ítem ya está "comprado" o activo (para ítems no mejorables). */
  isPurchasedCheck?: {
      /** Condición a evaluar ('isTrue', 'isFalse', 'greaterThan', etc.). */
      condition: 'isTrue' | 'isFalse' | 'greaterThan';
      /** Clave en PlayerData cuyo valor se usará en la condición. */
      valueRef: string;
      /** (Opcional) Límite numérico para la condición 'greaterThan'. */
      limit?: number;
  };

  /** Identificador único de la función de acción a ejecutar en ShopManager al comprar. */
  actionId: string;
}
