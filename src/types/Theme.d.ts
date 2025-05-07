// src/types/Theme.d.ts

/**
 * Define la estructura de un elemento específico de la UI dentro de un tema.
 * Todas las propiedades son opcionales, ya que un tema puede definir solo algunas.
 */
export interface ThemeElementDefinition {
  baseClass?: string;
  themeClass?: string;
  wrapperClass?: string;
  contentClass?: string;
  backdropClass?: string;
  difficultyLabelClass?: string;
  questionTextClass?: string;
  optionButtonClass?: string;
  feedbackAreaClass?: string;
  backgroundPatternClass?: string;
  initialDisplay?: string;
  text?: string;
}

/**
* Define la estructura completa de un tema.
*/
export interface Theme {
  id: string;
  name: string;
  description: string;

  /**
   * (Opcional) Clases CSS y otras propiedades para aplicar a elementos HTML estándar (no-Lit).
   * Utiliza una firma de índice para permitir cualquier clave de string, donde el valor esperado
   * es una ThemeElementDefinition o undefined.
   * También puedes listar claves específicas conocidas (como quizWrapper) para mejor
   * autocompletado y seguridad de tipo en otros lugares si accedes directamente a ellas.
   */
  elements?: {
      [elementKey: string]: ThemeElementDefinition | undefined; // Firma de índice general
      quizWrapper?: ThemeElementDefinition; // Ejemplo de clave específica conocida
      // Podrías añadir otras claves específicas aquí si son comunes y quieres tipado estricto para ellas:
      // topUIContainer?: ThemeElementDefinition;
      // inkLabel?: ThemeElementDefinition;
  };

  /**
   * (Obligatorio) Definiciones de variables CSS para este tema.
   * Estas variables serán aplicadas globalmente y usadas por los componentes Lit.
   */
  cssVariables: {
      [key: string]: string; // Ejemplo: { "--gq-text-color": "#FFFFFF", "--gq-primary-bg": "blue" }
  };
}
