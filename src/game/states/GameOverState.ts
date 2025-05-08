// src/game/states/GameOverState.ts

import { IState } from '../StateMachine';
import { GameManager } from '../GameManager';
import '../components/ui/game-over-screen.ts';
import type { GameOverScreen } from '../components/ui/game-over-screen';

export class GameOverState implements IState {
    private gameManager: GameManager;
    private finalScore: number = 0;
    private isNewHighScore: boolean = false;
    private gameOverScreenElement: GameOverScreen | null = null;
    private restartHandler: (() => void) | null = null;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    enter(params?: { score: number, isNewHighScore?: boolean }): void {
        console.log('GameOverState: enter', params);
        this.finalScore = params?.score ?? 0;
        this.isNewHighScore = params?.isNewHighScore ?? false;
        this.gameManager.setBodyStateClass('gameover');

        const container = this.gameManager.getContainerElement();
        if (!container) {
            console.error("GameOverState: Contenedor principal no encontrado.");
            return;
        }

        container.innerHTML = '';
        this.gameOverScreenElement = document.createElement('game-over-screen') as GameOverScreen;
        this.gameOverScreenElement.finalScore = this.finalScore;
        this.gameOverScreenElement.isNewHighScore = this.isNewHighScore;

        // --- Modificación aquí dentro de restartHandler ---
        this.restartHandler = () => {
            console.log("GameOverState: Evento 'restart-game-requested' recibido. Forzando recarga de página.");
            this.gameManager.getAudioManager().playSound('ui_confirm'); // Tocar sonido antes de recargar

            // Forzar recarga completa de la página
            window.location.reload();

            // La línea anterior fue: this.gameManager.resetGame();
        };
        // --- Fin Modificación ---

        this.gameOverScreenElement.addEventListener('restart-game-requested', this.restartHandler);

        container.appendChild(this.gameOverScreenElement);

        this.gameManager.getAudioManager().playSound('game_over');
    }

    exit(): void {
        console.log('GameOverState: exit');
        // Limpiar listener al salir (aunque la página se recargará antes si se hace clic)
        if (this.gameOverScreenElement) {
            if (this.restartHandler) {
                this.gameOverScreenElement.removeEventListener('restart-game-requested', this.restartHandler);
            }
        }
        this.gameOverScreenElement = null;
        this.restartHandler = null;
    }

    update(_deltaTime: number): void {
        // No action needed
    }
}