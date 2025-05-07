// src/game/states/GameOverState.ts

import { IState } from '../StateMachine';
import { GameManager } from '../GameManager';
// <<< CAMBIO: Importar el componente Lit >>>
import '../components/ui/game-over-screen.ts';
import type { GameOverScreen } from '../components/ui/game-over-screen';
// <<< FIN CAMBIO >>>

export class GameOverState implements IState {
    private gameManager: GameManager;
    private finalScore: number = 0;
    private isNewHighScore: boolean = false;
    // <<< CAMBIO: Referencia al componente Lit y a los handlers >>>
    private gameOverScreenElement: GameOverScreen | null = null;
    private restartHandler: (() => void) | null = null;
    private menuHandler: (() => void) | null = null;
    // <<< FIN CAMBIO >>>

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    enter(params?: { score: number, isNewHighScore?: boolean }): void {
        console.log('GameOverState: enter', params);
        this.finalScore = params?.score ?? 0;
        this.isNewHighScore = params?.isNewHighScore ?? false;
        this.gameManager.setBodyStateClass('gameover'); // Aplicar clase al body

        const container = this.gameManager.getContainerElement();
        if (!container) {
            console.error("GameOverState: Contenedor principal no encontrado.");
            return;
        }

        // <<< CAMBIO: Crear e insertar el componente Lit >>>
        container.innerHTML = ''; // Limpiar contenedor
        this.gameOverScreenElement = document.createElement('game-over-screen') as GameOverScreen;

        // Pasar propiedades
        this.gameOverScreenElement.finalScore = this.finalScore;
        this.gameOverScreenElement.isNewHighScore = this.isNewHighScore;

        // Añadir listeners para los eventos personalizados
        this.restartHandler = () => {
            console.log("GameOverState: Evento 'restart-game-requested' recibido.");
            this.gameManager.getAudioManager().playSound('ui_confirm');
            this.gameManager.getStateMachine().changeState('QuizGameplay'); // Reiniciar el juego
        };
        this.menuHandler = () => {
            console.log("GameOverState: Evento 'main-menu-requested' recibido.");
            this.gameManager.getAudioManager().playSound('ui_cancel'); // Sonido diferente para volver al menú
            this.gameManager.create(); // Volver al menú principal (reinicia estado)
        };

        this.gameOverScreenElement.addEventListener('restart-game-requested', this.restartHandler);
        this.gameOverScreenElement.addEventListener('main-menu-requested', this.menuHandler);

        container.appendChild(this.gameOverScreenElement);
        // <<< FIN CAMBIO >>>

        // Lógica adicional (ej. sonido de game over)
        this.gameManager.getAudioManager().playSound('game_over');
    }

    exit(): void {
        console.log('GameOverState: exit');
        // <<< CAMBIO: Limpiar listeners del componente Lit >>>
        if (this.gameOverScreenElement) {
            if (this.restartHandler) {
                this.gameOverScreenElement.removeEventListener('restart-game-requested', this.restartHandler);
            }
            if (this.menuHandler) {
                this.gameOverScreenElement.removeEventListener('main-menu-requested', this.menuHandler);
            }
        }
        this.gameOverScreenElement = null; // Limpiar referencia
        this.restartHandler = null;
        this.menuHandler = null;
        // <<< FIN CAMBIO >>>

        // Limpiar contenedor (opcional, buildQuizInterface ya lo hace)
        // const container = this.gameManager.getContainerElement();
        // if (container) container.innerHTML = '';
    }

    update(_deltaTime: number): void {
        // No se necesita acción por frame en este estado
    }
}