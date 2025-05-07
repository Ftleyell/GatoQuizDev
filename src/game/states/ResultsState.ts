// src/game/states/ResultsState.ts

import { IState } from '../StateMachine';
import { GameManager } from '../GameManager';
// <<< CAMBIO: Importar el componente Lit >>>
import '../components/ui/results-screen.ts';
import type { ResultsScreen } from '../components/ui/results-screen';
// <<< FIN CAMBIO >>>

export class ResultsState implements IState {
    private gameManager: GameManager;
    private finalScore: number = 0;
    private correctAnswers: number = 0;
    private totalQuestions: number = 0;
    private isNewHighScore: boolean = false;

    // <<< CAMBIO: Referencia al componente Lit y al handler >>>
    private resultsScreenElement: ResultsScreen | null = null;
    private continueHandler: (() => void) | null = null;
    // <<< FIN CAMBIO >>>

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    enter(params?: { score: number, correct: number, total: number, isNewHighScore?: boolean }): void {
        console.log('ResultsState: enter', params);
        this.finalScore = params?.score ?? 0;
        this.correctAnswers = params?.correct ?? 0;
        this.totalQuestions = params?.total ?? 0;
        this.isNewHighScore = params?.isNewHighScore ?? false;
        this.gameManager.setBodyStateClass('results'); // Aplicar clase al body

        const container = this.gameManager.getContainerElement();
        if (!container) {
            console.error("ResultsState: Contenedor principal no encontrado.");
            return;
        }

        // <<< CAMBIO: Crear e insertar el componente Lit >>>
        container.innerHTML = ''; // Limpiar contenedor
        this.resultsScreenElement = document.createElement('results-screen') as ResultsScreen;

        // Pasar propiedades
        this.resultsScreenElement.finalScore = this.finalScore;
        this.resultsScreenElement.correctAnswers = this.correctAnswers;
        this.resultsScreenElement.totalQuestions = this.totalQuestions;
        this.resultsScreenElement.isNewHighScore = this.isNewHighScore;

        // Añadir listener para el evento personalizado
        this.continueHandler = () => {
            console.log("ResultsState: Evento 'continue-requested' recibido.");
            this.gameManager.getAudioManager().playSound('ui_confirm');
            // Decidir a dónde ir después (Game Over o de vuelta al Menú/Quiz?)
            // Esta lógica podría necesitar ajustes basados en las reglas del juego.
            // Por ahora, asumimos que vuelve al menú principal.
            this.gameManager.create();
        };

        this.resultsScreenElement.addEventListener('continue-requested', this.continueHandler);

        container.appendChild(this.resultsScreenElement);
        // <<< FIN CAMBIO >>>

        // Lógica adicional (ej. sonido de resultados)
        this.gameManager.getAudioManager().playSound('level_complete'); // O un sonido específico de resultados
    }

    exit(): void {
        console.log('ResultsState: exit');
        // <<< CAMBIO: Limpiar listener del componente Lit >>>
        if (this.resultsScreenElement && this.continueHandler) {
            this.resultsScreenElement.removeEventListener('continue-requested', this.continueHandler);
        }
        this.resultsScreenElement = null; // Limpiar referencia
        this.continueHandler = null;
        // <<< FIN CAMBIO >>>
    }

    update(_deltaTime: number): void {
        // No se necesita acción por frame en este estado
    }
}