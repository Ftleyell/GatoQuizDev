// src/game/states/QuizGameplayState.ts

// src/game/states/QuizGameplayState.ts

import type { IState } from '../StateMachine'; // Correcto
import { GameManager } from '../GameManager';   // Correcto

// Desde src/game/modules/quiz/ (usando su index.ts)
import { QuizGameModule } from '../modules/quiz';

// Desde src/types/ (usando su index.ts)
import type { EngineServices } from '../../types';

// Para asegurar que el componente Lit se registre (se ejecuta el código del archivo):
import '../components/ui/quiz-ui-container.js'; // Sube un nivel a 'game/', luego a 'components/ui/' (o .ts)

// Para tipos, usando el barrel file:
import type { QuizUiContainer } from '../components/ui'; // Sube un nivel a 'game/', luego a 'components/ui/' (usa index.ts)


export class QuizGameplayState implements IState {
  private gameManager: GameManager;
  public quizModule: QuizGameModule | null = null;
  private uiHostElement: HTMLElement | null = null; 

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    console.log('[QuizGameplayState] Constructor llamado.');
  }

  async enter(params?: any): Promise<void> {
    console.log('[QuizGameplayState] enter() INICIADO. Params:', params);
    this.gameManager.setBodyStateClass('quizgameplay');

    const mainAppContainer = this.gameManager.getContainerElement(); 
    if (!mainAppContainer) {
        console.error("[QuizGameplayState] CRÍTICO: No se pudo obtener el contenedor principal #app de GameManager. Transicionando a MainMenu.");
        this.gameManager.getStateMachine().changeState('MainMenu');
        return;
    }
    console.log('[QuizGameplayState] Contenedor principal #app obtenido:', mainAppContainer);
    mainAppContainer.innerHTML = ''; 
    console.log('[QuizGameplayState] Contenido de #app limpiado.');

    try {
        console.log("[QuizGameplayState] Creando elemento <quiz-ui-container>...");
        this.uiHostElement = document.createElement('quiz-ui-container') as QuizUiContainer;
        console.log('[QuizGameplayState] uiHostElement CREADO:', this.uiHostElement);
    } catch (e) {
        console.error("[QuizGameplayState] CRÍTICO: Error al crear el elemento <quiz-ui-container>.", e);
        this.gameManager.getStateMachine().changeState('MainMenu');
        return;
    }

    mainAppContainer.appendChild(this.uiHostElement); 
    console.log('[QuizGameplayState] uiHostElement AÑADIDO a mainAppContainer (#app).');

    this.quizModule = new QuizGameModule();
    console.log('[QuizGameplayState] Instancia de QuizGameModule creada.');

    try {
        const engineServices = this.gameManager.getEngineServices();
        if (!engineServices) {
            throw new Error("EngineServices no están disponibles desde GameManager en QuizGameplayState.");
        }
        console.log('[QuizGameplayState] EngineServices obtenidos.');

        console.log('[QuizGameplayState] Llamando a quizModule.loadData()...');
        await this.quizModule.loadData(null); 
        console.log('[QuizGameplayState] quizModule.loadData() completado.');

        console.log('[QuizGameplayState] Llamando a quizModule.initialize(). uiHostElement pasado:', this.uiHostElement);
        await this.quizModule.initialize(engineServices, this.uiHostElement);
        console.log('[QuizGameplayState] quizModule.initialize() completado.');
        
        console.log('[QuizGameplayState] Llamando a quizModule.start().');
        this.quizModule.start();
        console.log('[QuizGameplayState] quizModule.start() llamado.');

    } catch (error) {
        console.error("[QuizGameplayState] CRÍTICO: Error inicializando o iniciando QuizGameModule:", error);
        if (this.uiHostElement && mainAppContainer.contains(this.uiHostElement)) {
            mainAppContainer.removeChild(this.uiHostElement);
            console.log('[QuizGameplayState] uiHostElement removido de #app debido a error.');
        }
        this.uiHostElement = null; 
        this.gameManager.getStateMachine().changeState('MainMenu'); 
        return;
    }
    console.log('[QuizGameplayState] enter() FINALIZADO exitosamente.');
  }

  exit(): void {
    console.log('[QuizGameplayState] exit() INICIADO.');
    if (this.quizModule) {
      console.log('[QuizGameplayState] Llamando a quizModule.destroy().');
      this.quizModule.destroy(); 
      this.quizModule = null;
      console.log('[QuizGameplayState] quizModule destruido y seteado a null.');
    }

    // La StateMachine o la transición de barrido se encargarán de limpiar #app si es necesario.
    // No es necesario limpiar this.uiHostElement de mainAppContainer aquí explícitamente si
    // la transición (ej. wipe) ya limpia mainAppContainer.innerHTML.
    if (this.uiHostElement) {
        console.log('[QuizGameplayState] uiHostElement existe en exit. Será manejado por StateMachine/transición.');
    }
    this.uiHostElement = null; // Liberar referencia

    // GameManager -> GlobalUIManager se encarga de quitar el fade si estaba activo
    this.gameManager.getGlobalUIManager()?.setModuleUIsFaded(false);
    console.log('[QuizGameplayState] exit() FINALIZADO.');
  }

  update(deltaTime: number): void {
    // Este log puede ser muy verboso, activa solo si necesitas depurar el update loop.
    // console.log(`[QuizGameplayState] update() llamado con deltaTime: ${deltaTime}`);
    if (this.quizModule) {
      this.quizModule.update(deltaTime);
    }
  }

  public rebuildInterface(): void {
      console.log(`[QuizGameplayState] rebuildInterface() llamado.`);
      if (this.quizModule && typeof (this.quizModule as any).rebuildUI === 'function') {
          console.log(`[QuizGameplayState] Llamando a quizModule.rebuildUI().`);
          (this.quizModule as any).rebuildUI();
      } else if (this.quizModule && (this.quizModule as any).quizUIManager && typeof (this.quizModule as any).quizUIManager.buildQuizInterface === 'function') {
          console.warn("[QuizGameplayState] rebuildInterface: Módulo no tiene rebuildUI, intentando llamar a quizUIManager.buildQuizInterface.");
          const qModule = this.quizModule as any; 
          if (qModule.currentQuestion && this.uiHostElement) { // this.uiHostElement es el <quiz-ui-container>
            console.log(`[QuizGameplayState]   Reconstruyendo UI con pregunta actual: ${qModule.currentQuestion.id}`);
            qModule.quizUIManager.buildQuizInterface(
                qModule.currentQuestion,
                qModule.handleOptionClick.bind(qModule),
                qModule.consecutiveCorrectAnswers
            );
            const playerData = this.gameManager.getPlayerData(); 
            if (qModule.hintAppliedToQuestionId === qModule.currentQuestion.id && playerData.hintCharges > 0) {
                console.log(`[QuizGameplayState]   Re-aplicando visuales de pista.`);
                qModule.quizUIManager.applyHintVisuals(qModule.currentQuestion.correctAnswerKey);
            }
            if (qModule.isWaitingForExplanationConfirm && qModule.currentQuestion.explanation) {
                console.log(`[QuizGameplayState]   Re-mostrando explicación.`);
                qModule.quizUIManager.showExplanation(
                    qModule.currentQuestion.explanation,
                    () => { qModule.proceedToNextStep(); }, 
                    qModule.lastAnswerResultType
                );
            }
          } else {
            console.warn(`[QuizGameplayState]   No se pudo reconstruir: falta currentQuestion o uiHostElement.`);
          }
      } else {
          console.warn("[QuizGameplayState] No se puede reconstruir, módulo de quiz o su UIManager no está configurado correctamente para ello.");
      }
  }

  public getPreferredEnterAnimation?(): string { return 'gq-wipe-transition'; }
  public getPreferredExitAnimation?(): string { return 'gq-wipe-transition'; }
}