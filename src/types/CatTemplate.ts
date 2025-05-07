// src/types/CatTemplate.ts

/**
 * Opciones específicas de configuración para el componente físico (Matter.Body)
 * basadas en la plantilla.
 */
export interface CatPhysicsOptions {
    restitution?: number;
    friction?: number;
    frictionAir?: number;
    density?: number;
    // Ejemplo: Podrías añadir 'slop', 'timeScale', etc. si el GDD lo requiere.
    // Ver Matter.IBodyDefinition para más opciones: https://brm.io/matter-js/docs/classes/Body.html#interfaces
  }
  
  /**
   * Opciones específicas de configuración para el componente de renderizado
   * basadas en la plantilla.
   */
  export interface CatRenderOptions {
    backgroundColor?: string; // Color de fondo si falla la imagen o no se usa
    spriteKey?: string;     // Identificador para un sprite (si usas texture atlases)
    imageUrl?: string;      // URL directa a una imagen (ej: cataas.com)
    glowClass?: string;     // Clase CSS para aplicar efecto de brillo (ej: 'glow-rare')
    // Ejemplo: Podrías añadir 'scale', 'opacity', 'zIndex', etc.
  }
  
  /**
   * Define la estructura de una plantilla de Gato.
   * Estas plantillas se cargarían desde un archivo JSON externo.
   */
  export interface CatTemplate {
    /** Identificador único de la plantilla (ej: 'common_cat', 'rare_blue') */
    id: string;
  
    /** Nivel numérico de rareza (influencia ValueComponent y posiblemente apariencia) */
    rarity: number;
  
    /** Tamaño inicial (diámetro en píxeles) del gato */
    initialSize: number;
  
    /** Valor en puntos al 'liberar' el gato (opcional) */
    scoreValue?: number;
  
    /** Opciones específicas para la configuración del cuerpo físico */
    physicsOptions?: CatPhysicsOptions;
  
    /** Opciones específicas para la configuración visual */
    renderOptions?: CatRenderOptions;

    /** Probabilidad relativa de aparición (mayor número = más probable). */
    spawnWeight?: number; // <-- AÑADIDO

    // Aquí podrías añadir más propiedades definidas en el GDD 2.6,
    // como por ejemplo:
    // canMerge?: boolean;
    // mergeThreshold?: number;
    // specialAbility?: string;
  }
