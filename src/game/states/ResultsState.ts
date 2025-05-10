// src/game/states/ResultsState.ts

import type { IState } from '../StateMachine'; // La interfaz IState se importa directamente desde StateMachine.ts
import { GameManager } from '../GameManager';

// Para asegurar que el componente Lit se registre (se ejecuta el código del archivo):
import '../components/ui/results-screen.js'; // Sube un nivel a 'game/', luego a 'components/ui/' (o .ts)

// Para tipos, usando el barrel file:
import type { ResultsScreen } from '../components/ui'; // Sube un nivel a 'game/', luego a 'components/ui/' (usa index.ts)
export class ResultsState implements IState {
    private gameManager: GameManager;
    private finalScore: number = 0;
    private correctAnswers: number = 0;
    private totalQuestions: number = 0;
    private isNewHighScore: boolean = false;

    private resultsScreenElement: ResultsScreen | null = null;
    private continueHandler: (() => void) | null = null;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    enter(params?: { score: number, correct: number, total: number, isNewHighScore?: boolean }): void {
        console.log('ResultsState: enter', params);
        this.finalScore = params?.score ?? 0;
        this.correctAnswers = params?.correct ?? 0;
        this.totalQuestions = params?.total ?? 0;
        this.isNewHighScore = params?.isNewHighScore ?? false;

        this.gameManager.setBodyStateClass('results');
        // La lógica de mostrar/ocultar botones globales es manejada por `wrapEnter` en GameManager.

        const container = this.gameManager.getContainerElement();
        if (!container) {
            console.error("ResultsState: Contenedor principal no encontrado.");
            return;
        }

        container.innerHTML = ''; // Limpiar contenedor
        this.resultsScreenElement = document.createElement('results-screen') as ResultsScreen;

        // Pasar propiedades al componente Lit
        this.resultsScreenElement.finalScore = this.finalScore;
        this.resultsScreenElement.correctAnswers = this.correctAnswers;
        this.resultsScreenElement.totalQuestions = this.totalQuestions;
        this.resultsScreenElement.isNewHighScore = this.isNewHighScore;

        // Listener para el evento personalizado del botón de continuar
        this.continueHandler = () => {
            console.log("ResultsState: Evento 'continue-requested' recibido.");
            this.gameManager.getAudioManager().playSound('ui_confirm');
            // Decide a dónde ir después. Por ejemplo, volver al menú principal.
            // La transición de barrido se definirá preferentemente en el estado o al llamar a changeState.
            this.gameManager.getStateMachine().changeState('MainMenu', undefined, 'gq-wipe-transition');
        };

        this.resultsScreenElement.addEventListener('continue-requested', this.continueHandler);
        container.appendChild(this.resultsScreenElement);

        // Sonido de resultados o fin de nivel
        this.gameManager.getAudioManager().playSound('level_complete'); // O un sonido específico de resultados
    }

    exit(): void {
        console.log('ResultsState: exit');
        if (this.resultsScreenElement && this.continueHandler) {
            this.resultsScreenElement.removeEventListener('continue-requested', this.continueHandler);
        }
        this.resultsScreenElement = null;
        this.continueHandler = null;
        // El contenido del containerElement se limpia o se cubre por la StateMachine.
    }

    update(_deltaTime: number): void {
        // No se necesita acción por frame en este estado
    }
}