// src/game/states/MainMenuState.ts

import { IState } from '../StateMachine';
import { GameManager } from '../GameManager';
// Importar el componente Lit <main-menu-screen> y su tipo
import '../components/ui/main-menu-screen';
import type { MainMenuScreen } from '../components/ui/main-menu-screen';

export class MainMenuState implements IState {
  private gameManager: GameManager;
  // Listener para el evento personalizado del componente Lit <main-menu-screen>
  private startListener: (() => void) | null = null;
  private containerElement: HTMLElement | null = null;
  // Las propiedades sparkleIntervalId y hasStarted ahora son manejadas internamente por MainMenuScreen.

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
  }

  enter(params?: any): void {
    console.log('MainMenuState: enter', params);
    this.gameManager.setBodyStateClass('mainmenu-whiskers'); // Establece clase para estilos de fondo/globales
    this.containerElement = this.gameManager.getContainerElement();

    if (!this.containerElement) {
      console.error("MainMenuState: Contenedor principal #app no encontrado.");
      return;
    }

    // Limpiar el contenedor antes de añadir el nuevo componente
    this.containerElement.innerHTML = ''; 
    const mainMenuElement = document.createElement('main-menu-screen') as MainMenuScreen;
    
    // Pasar los mensajes de carga al componente (si es necesario)
    mainMenuElement.loadingMessages = this.gameManager.getLoadingMessages();
    
    this.containerElement.appendChild(mainMenuElement);

    if (mainMenuElement) {
      // Configurar el listener para el evento 'start-game-requested' emitido por <main-menu-screen>
      this.startListener = () => {
        console.log("MainMenuState: Evento 'start-game-requested' recibido desde <main-menu-screen>.");
        this.gameManager.getAudioManager().playSound('ui_confirm'); // Sonido de confirmación
        
        this.removeStartListeners(); // Limpiar este listener específico
                // Reinicia el ciclo principal del juego (requestAnimationFrame y físicas)
                this.gameManager.start(); 
        console.log("MainMenuState: Iniciando transición con BARRIDO a QuizGameplay...");
        // --- CAMBIO CLAVE: Usar la transición de barrido ---
        // Se pasa 'gq-wipe-transition' como clase de animación de salida (y/o entrada).
        // La StateMachine interpretará esto para usar el componente DiagonalWipe.
        this.gameManager.getStateMachine().changeState(
            'QuizGameplay', 
            undefined, // No hay parámetros de entrada para QuizGameplay en este caso
            'gq-wipe-transition' // Especifica que la salida de MainMenu debe usar el barrido
                                 // Opcionalmente, también se puede pasar como animación de entrada para QuizGameplay
                                 // si se desea que el barrido también "revele" el nuevo estado.
                                 // Si solo se quiere que cubra, solo es necesario en la salida.
                                 // Para un efecto completo de cubrir y luego revelar:
                                 // 'gq-wipe-transition', 'gq-wipe-transition'
        );
      };
      
      // Añadir el listener al componente Lit (se ejecutará una sola vez)
      mainMenuElement.addEventListener('start-game-requested', this.startListener, { once: true });
      console.log("MainMenuState: Listener 'start-game-requested' añadido a <main-menu-screen>.");

    } else {
      console.error("MainMenuState: Error al encontrar <main-menu-screen> después de añadirlo al DOM.");
    }
    // La lógica de efectos visuales como destellos y carga de fuentes ahora está encapsulada
    // dentro del componente <main-menu-screen>.
  }

  /**
   * Remueve los listeners de eventos para evitar fugas de memoria.
   */
  private removeStartListeners(): void {
    // Buscar el elemento Lit por si acaso (necesario si se llama desde fuera de enter/exit)
    const mainMenuElement = this.containerElement?.querySelector('main-menu-screen');
    if (mainMenuElement && this.startListener) {
      // Remover específicamente el listener de nuestro evento personalizado
      mainMenuElement.removeEventListener('start-game-requested', this.startListener);
      console.log("MainMenuState: Listener 'start-game-requested' removido de <main-menu-screen>.");
    }
    // Limpiar la referencia a la función listener
    this.startListener = null;
  }

  exit(): void {
    console.log('MainMenuState: exit');
    this.removeStartListeners(); // Asegurarse de limpiar listeners al salir
    
    // No es necesario limpiar el innerHTML del containerElement aquí si la StateMachine
    // se encarga de la transición del contenido de #app. La StateMachine lo hará
    // después de que la animación de salida (el barrido) haya cubierto la pantalla.
    
    if (this.containerElement) {
        this.containerElement.style.cursor = ''; // Restaurar cursor por si acaso
    }
    // this.containerElement = null; // No anular si #app es el contenedor persistente de la StateMachine
  }

  update(_deltaTime: number): void {
    // No se necesita acción por frame en este estado
  }

  /**
   * (Opcional pero recomendado) Define la animación de salida preferida para este estado.
   * La StateMachine usará esto si no se fuerza otra animación en changeState.
   */
  public getPreferredExitAnimation?(): string {
    return 'gq-wipe-transition'; // Indicar que queremos usar el barrido al salir de este estado.
  }

  /**
   * (Opcional) Define la animación de entrada preferida para este estado.
   * Si se vuelve a este estado desde otro, se podría usar el barrido.
   */
  public getPreferredEnterAnimation?(): string {
    return 'gq-wipe-transition'; // Indicar que queremos usar el barrido al entrar a este estado.
  }
}
