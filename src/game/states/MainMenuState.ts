// src/game/states/MainMenuState.ts

import type { IState } from '../StateMachine'; // Correcto
import { GameManager } from '../GameManager';   // Correcto

// Para asegurar que el componente Lit se registre (se ejecuta el código del archivo):
// La extensión .js es una convención común, pero .ts también puede funcionar dependiendo de tu configuración.
import '../components/ui/main-menu-screen.js'; // Sube un nivel a 'game/', luego a 'components/ui/'

// Para tipos, usando el barrel file:
import type { MainMenuScreen } from '../components/ui'; // Sube un nivel a 'game/', luego a 'components/ui/' (usa index.ts)

export class MainMenuState implements IState {
  private gameManager: GameManager;
  private startListener: (() => Promise<void>) | null = null; // Modificado para ser async
  private containerElement: HTMLElement | null = null;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
  }

  enter(params?: any): void {
    console.log('MainMenuState: enter', params);
    this.gameManager.setBodyStateClass('mainmenu-whiskers');
    this.containerElement = this.gameManager.getContainerElement();

    if (!this.containerElement) {
      console.error("MainMenuState: Contenedor principal #app no encontrado.");
      return;
    }

    // Limpiar el contenedor antes de añadir el nuevo componente
    this.containerElement.innerHTML = '';
    const mainMenuElement = document.createElement('main-menu-screen') as MainMenuScreen;

    // Pasar los mensajes de carga al componente
    mainMenuElement.loadingMessages = this.gameManager.getLoadingMessages();
    // Aquí podrías pasar otros datos al mainMenuElement si es necesario, como gameData.
    // Ejemplo:
    // mainMenuElement.gameData = {
    //   title: 'GatoQuiz Interactivo', // O obtener de alguna configuración
    //   version: '2.0.0',
    //   highScore: this.gameManager.getPlayerData()?.highScore ?? 0,
    //   lastScore: this.gameManager.getPlayerData()?.lastScore ?? 0,
    // };


    this.containerElement.appendChild(mainMenuElement);

    // La lógica de mostrar/ocultar botones globales es manejada por `wrapEnter` en GameManager.

    // Configurar el listener para el evento 'start-game-requested'
    // La función del listener ahora es async para permitir 'await' para tryResumeContext.
    this.startListener = async () => {
      console.log("MainMenuState: Evento 'start-game-requested' recibido desde <main-menu-screen>.");

      // --- Integración de la corrección de Audio ---
      // Intenta resumir el AudioContext después de la interacción del usuario (solicitud de inicio de juego)
      // Esto es crucial para que el audio funcione en navegadores con políticas de reproducción automática estrictas.
      try {
        if (this.gameManager.getAudioManager()) {
            await this.gameManager.getAudioManager().tryResumeContext();
            console.log("MainMenuState: Intento de reanudación del AudioContext completado.");
        } else {
            console.warn("MainMenuState: AudioManager no está disponible para reanudar el contexto.");
        }
      } catch (error) {
        console.error("MainMenuState: Error al intentar reanudar el AudioContext:", error);
      }
      // --- Fin de la integración de la corrección de Audio ---

      // Reproducir sonido de confirmación (ahora debería funcionar si el contexto se reanudó)
      this.gameManager.getAudioManager().playSound('ui_confirm');
      
      this.removeStartListeners(); // Limpiar este listener
      this.gameManager.start(); // Asegurar que el bucle de juego y físicas estén corriendo
      
      // Usar la transición de barrido definida en el plan y en getPreferredExitAnimation
      this.gameManager.getStateMachine().changeState(
          'QuizGameplay', // O el estado de carga/juego apropiado
          undefined,
          this.getPreferredExitAnimation?.() ?? 'default-animation' // Usar la animación preferida de salida o un valor por defecto
      );
    };

    mainMenuElement.addEventListener('start-game-requested', this.startListener as EventListener, { once: true });
    console.log("MainMenuState: Listener 'start-game-requested' (async) añadido a <main-menu-screen>.");
  }

  private removeStartListeners(): void {
    const mainMenuElement = this.containerElement?.querySelector('main-menu-screen');
    if (mainMenuElement && this.startListener) {
      // Asegúrate de castear el listener a EventListener si TypeScript se queja por la firma async
      mainMenuElement.removeEventListener('start-game-requested', this.startListener as EventListener);
      // console.log("MainMenuState: Listener 'start-game-requested' removido de <main-menu-screen>.");
    }
    this.startListener = null;
  }

  exit(): void {
    console.log('MainMenuState: exit');
    this.removeStartListeners();
    // `wrapEnter` en GameManager se encarga de la UI global.
    // El contenido de `this.containerElement` será limpiado por `StateMachine`
    // si la transición es `fade`, o cubierto por `DiagonalWipe`.
  }

  update(_deltaTime: number): void {
    // No se necesita acción por frame en este estado
  }

  public getPreferredExitAnimation?(): string {
    return 'gq-wipe-transition';
  }

  public getPreferredEnterAnimation?(): string {
    return 'gq-wipe-transition';
  }
}
