
import type { IState } from '../StateMachine'; // Correcto, IState es una interfaz
import { GameManager } from '../GameManager';   // Correcto

// Para asegurar que el componente Lit se registre (se ejecuta el código del archivo):
import '../components/ui/game-over-screen.js'; // Sube un nivel a 'game/', luego a 'components/ui/' (o .ts)

// Para tipos, usando el barrel file:
import type { GameOverScreen } from '../components/ui'; // Sube un nivel a 'game/', luego a 'components/ui/' (usa index.ts)
export class GameOverState implements IState {
    private gameManager: GameManager;
    private finalScore: number = 0;
    private isNewHighScore: boolean = false; // Esta propiedad ya estaba, la mantenemos
    private gameOverScreenElement: GameOverScreen | null = null;
    private restartHandler: (() => void) | null = null;
    // El menuHandler se elimina porque el botón de menú ya no está en esta pantalla por defecto

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    enter(params?: { score: number, isNewHighScore?: boolean }): void {
        console.log('GameOverState: enter', params);
        this.finalScore = params?.score ?? 0;
        // Determinar si es nuevo récord. Esto debería pasarse desde donde se transiciona a GameOver.
        // Si no se pasa, asumimos que no lo es, o se podría calcular aquí si PlayerData tuviera el highScore.
        this.isNewHighScore = params?.isNewHighScore ?? false;

        this.gameManager.setBodyStateClass('gameover');
        // La lógica de mostrar/ocultar botones globales es manejada por `wrapEnter` en GameManager.

        const container = this.gameManager.getContainerElement();
        if (!container) {
            console.error("GameOverState: Contenedor principal no encontrado.");
            return;
        }

        container.innerHTML = ''; // Limpiar el contenedor antes de añadir la pantalla de Game Over
        this.gameOverScreenElement = document.createElement('game-over-screen') as GameOverScreen;

        // Pasar las propiedades al componente Lit
        this.gameOverScreenElement.finalScore = this.finalScore;
        this.gameOverScreenElement.isNewHighScore = this.isNewHighScore;

        // Listener para el botón de reinicio
        this.restartHandler = () => {
            console.log("GameOverState: Evento 'restart-game-requested' recibido.");
            this.gameManager.getAudioManager().playSound('ui_confirm');
            // Forzar recarga completa de la página para un reinicio limpio
            window.location.reload();
        };
        this.gameOverScreenElement.addEventListener('restart-game-requested', this.restartHandler);

        // El botón de menú principal ya no está en esta pantalla según tu game-over-screen.ts
        // Si se reintroduce, se añadiría un listener similar para 'main-menu-requested'.

        container.appendChild(this.gameOverScreenElement);

        // Sonido de game over
        this.gameManager.getAudioManager().playSound('game_over');
    }

    exit(): void {
        console.log('GameOverState: exit');
        if (this.gameOverScreenElement) {
            if (this.restartHandler) {
                this.gameOverScreenElement.removeEventListener('restart-game-requested', this.restartHandler);
            }
            // Si se añade el botón de menú, remover su listener aquí también.
        }
        this.gameOverScreenElement = null;
        this.restartHandler = null;
        // El contenido del containerElement se limpia o se cubre por la StateMachine.
    }

    update(_deltaTime: number): void {
        // No action needed
    }
}