// src/types/IGameModule.ts
import type { EngineServices } from './EngineServices'; // Se creará a continuación

export interface GameResult {
    score: number;
    // Puedes añadir más datos relevantes del resultado del juego aquí
    [key: string]: any;
}

export interface IGameModule {
    /** Identificador único o nombre del módulo de juego. */
    getName(): string;

    /**
     * Carga los datos necesarios para el módulo (ej. preguntas, niveles).
     * @param data - Datos específicos del módulo, usualmente desde un JSON.
     */
    loadData(data: any): Promise<void>;

    /**
     * Inicializa el módulo de juego, preparando su UI y lógica.
     * @param engineServices - Objeto con acceso a los servicios del motor del juego.
     * @param uiHostElement - Elemento HTML donde el módulo debe renderizar su UI principal.
     */
    initialize(engineServices: EngineServices, uiHostElement: HTMLElement): Promise<void>;

    /** Comienza o reanuda la lógica principal del módulo de juego. */
    start(): void;

    /**
     * Actualiza el estado del módulo de juego. Se llama en cada frame del bucle principal.
     * @param deltaTime - Tiempo transcurrido desde el último frame, en segundos.
     */
    update(deltaTime: number): void;

    /** (Opcional) Pausa la lógica del módulo de juego. */
    pause?(): void;

    /** (Opcional) Reanuda la lógica del módulo de juego después de una pausa. */
    resume?(): void;

    /**
     * Finaliza el módulo de juego y devuelve los resultados.
     * @returns Una promesa que se resuelve con los resultados del juego.
     */
    end(): Promise<GameResult>;

    /** Limpia todos los recursos y listeners del módulo. */
    destroy(): void;
}