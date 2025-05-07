// src/game/states/QuizGameplayState.ts

import { IState } from '../StateMachine';
import { GameManager } from '../GameManager';
import { UIManager } from '../../systems/UIManager';

interface QuestionOption { key: string; text: string; }
interface Question {
  id: number | string;
  text: string;
  options: QuestionOption[];
  correctAnswerKey: string;
  difficulty: string | number;
  explanation?: string;
}

const SIZE_INCREMENT_PER_CORRECT = 1;
const MAX_CORRECT_ANSWER_GROWTH = 4; 

export class QuizGameplayState implements IState {
  private gameManager: GameManager;
  private uiManager: UIManager;
  public currentQuestion: Question | null = null;
  private nextQuestionTimeoutId: number | null = null;
  public consecutiveCorrectAnswers: number = 0;
  private hintAppliedToQuestionId: number | string | null = null;
  private isWaitingForExplanationConfirm: boolean = false;
  private lastAnswerResultType: 'correct' | 'incorrect' | 'shield' | null = null;
  private isExitingOrChangingState: boolean = false; 

  private readonly BASE_POINTS_PER_CORRECT = 15;
  private readonly DIFFICULTY_BONUS: { [key: string]: number } = {
      "easy": 10, "1": 10, "2": 20, "medium": 30,
      "3": 30, "hard": 45, "4": 45, "5": 65
  };

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    try {
        this.uiManager = gameManager.getUIManager();
    } catch (error) {
        console.error("QuizGameplayState: Error crítico obteniendo UIManager.", error);
        throw error; 
    }
  }

  private selectRandomCatTemplateId(): string {
    const catManager = this.gameManager.getCatManager();
    const weightedTemplates = catManager.getSpawnableTemplatesWeighted();
    if (weightedTemplates.length === 0) { return 'common_cat'; } 
    const totalWeight = weightedTemplates.reduce((sum, t) => sum + t.weight, 0);
    if (totalWeight <= 0) { return weightedTemplates[0]?.id ?? 'common_cat'; } 
    const randomNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    for (const template of weightedTemplates) {
        cumulativeWeight += template.weight;
        if (randomNum < cumulativeWeight) { return template.id; }
    }
    return weightedTemplates[weightedTemplates.length - 1]?.id ?? 'common_cat'; 
  }

  enter(params?: any): void {
    console.log('[QuizGameplayState] enter() INICIADO.', params);
    this.isExitingOrChangingState = false; 
    // const containerElement = this.gameManager.getContainerElement(); // No se usa directamente aquí

    this.gameManager.setBodyStateClass('quizgameplay');
    this.gameManager.getPlayerData().reset();
    console.log("[QuizGameplayState] PlayerData reseteado.");
    this.consecutiveCorrectAnswers = 0;
    this.hintAppliedToQuestionId = null;
    this.isWaitingForExplanationConfirm = false;
    this.lastAnswerResultType = null;

    this.displayNextQuestion();
    console.log('[QuizGameplayState] enter() FINALIZADO.');
  }

  exit(): void {
    console.log('[QuizGameplayState] exit() INICIADO.');
    this.isExitingOrChangingState = true; 
    const containerElement = this.gameManager.getContainerElement();

    this.uiManager.clearQuizInterface(containerElement);

    if (this.nextQuestionTimeoutId) {
        clearTimeout(this.nextQuestionTimeoutId);
        this.nextQuestionTimeoutId = null;
        console.log("[QuizGameplayState] Timeout para siguiente pregunta cancelado en exit().");
    }

    this.uiManager.updateComboVisuals(0); 
    document.body.style.backgroundColor = ''; 
    const root = document.documentElement;
    root.style.removeProperty('--element-glow-intensity');
    root.style.removeProperty('--flare-intensity');
    root.style.removeProperty('--difficulty-glow-color');
    root.style.removeProperty('--difficulty-glow-blur');

    this.isWaitingForExplanationConfirm = false;
    this.hintAppliedToQuestionId = null;
    this.currentQuestion = null;
    this.lastAnswerResultType = null;
    console.log('[QuizGameplayState] exit() FINALIZADO.');
  }

  update(_deltaTime: number): void { 
    // No action needed
  }

  private calculateScore(difficulty: string | number, streakBefore: number): { totalPoints: number, basePoints: number, difficultyBonus: number, comboBonus: number } {
    const currentStreak = streakBefore + 1; 
    const basePoints = this.BASE_POINTS_PER_CORRECT * currentStreak;
    const difficultyBonus = this.DIFFICULTY_BONUS[difficulty] ?? this.DIFFICULTY_BONUS[1] ?? 0; 
    const actualComboMultiplier = this.gameManager.getPlayerData().getCurrentComboMultiplier(); 
    const comboBonus = Math.max(0, (basePoints + difficultyBonus) * (actualComboMultiplier - 1)); 
    const totalPoints = Math.round(basePoints + difficultyBonus + comboBonus);
    return { totalPoints, basePoints, difficultyBonus, comboBonus: Math.round(comboBonus) };
  }

  private handleCorrectAnswer(difficulty: string | number): void {
    console.log('[QuizGameplayState] handleCorrectAnswer() INICIADO.');
    if (this.isExitingOrChangingState) {
        console.log('[QuizGameplayState] handleCorrectAnswer() abortado: isExitingOrChangingState es true.');
        return;
    }
    this.lastAnswerResultType = 'correct'; 
    const scoreBreakdown = this.calculateScore(difficulty, this.consecutiveCorrectAnswers);
    this.consecutiveCorrectAnswers++;
    this.gameManager.getPlayerData().score += scoreBreakdown.totalPoints;
    this.gameManager.getInkManager().gainInkOnCorrectAnswer();

    this.uiManager.updateScoreDisplay(this.gameManager.getPlayerData().score);
    this.uiManager.updateComboVisuals(this.consecutiveCorrectAnswers);
    this.uiManager.updateInkBar();

    let feedbackMessage = `¡+${scoreBreakdown.totalPoints} Pts!`;
    let details = `(Base: ${scoreBreakdown.basePoints}, Dif: +${scoreBreakdown.difficultyBonus}`;
    const actualComboMultiplier = this.gameManager.getPlayerData().getCurrentComboMultiplier();
    if (scoreBreakdown.comboBonus > 0) { details += `, Combo x${actualComboMultiplier.toFixed(1)}: +${scoreBreakdown.comboBonus}`; }
    details += ')';
    feedbackMessage += ` ${details}`;
    this.uiManager.updateFeedback(feedbackMessage, 'correct');

    try { this.gameManager.getAudioManager().playSound('correct'); }
    catch(e) { console.error("Error sonido 'correct':", e); }

    try {
        this.gameManager.getCatManager().growExistingCats(SIZE_INCREMENT_PER_CORRECT, MAX_CORRECT_ANSWER_GROWTH);
    } catch (error) {
        console.error("Error llamando a catManager.growExistingCats:", error);
    }

    const catsToSpawn = this.gameManager.getPlayerData().getCatsPerCorrectAnswer();
    const selectedTemplateId = this.selectRandomCatTemplateId();

    if (selectedTemplateId) {
        for (let i = 0; i < catsToSpawn; i++) {
             try {
                 this.gameManager.getCatManager().addCat(selectedTemplateId);
             } catch (error) {
                 console.error(`Error al llamar a catManager.addCat (iteración ${i+1}/${catsToSpawn}):`, error);
             }
        }
    }
    console.log('[QuizGameplayState] handleCorrectAnswer() llamando a proceedToNextStep().');
    this.proceedToNextStep(); 
  }

  private handleIncorrectAnswer(): void {
    console.log('[QuizGameplayState] handleIncorrectAnswer() INICIADO.');
    if (this.isExitingOrChangingState) {
        console.log('[QuizGameplayState] handleIncorrectAnswer() abortado: isExitingOrChangingState es true.');
        return;
    }
    this.lastAnswerResultType = 'incorrect'; 
    const playerData = this.gameManager.getPlayerData();
    let gameOver = false;

    if (playerData.hasShield) {
        playerData.hasShield = false;
        this.uiManager.updateFeedback('¡Escudo Roto!', 'shield'); 
        this.uiManager.updateShieldIcon(false);
        this.gameManager.getAudioManager().playSound('shield_break');
        this.lastAnswerResultType = 'shield'; 
        console.log('[QuizGameplayState] Escudo usado.');
    } else {
        this.consecutiveCorrectAnswers = 0;
        this.gameManager.decrementLives(); 
        this.uiManager.updateComboVisuals(this.consecutiveCorrectAnswers); 
        this.gameManager.getAudioManager().playSound('incorrect');

        if (playerData.hintCharges > 0) {
             console.log("[QuizGameplayState] Respuesta incorrecta (sin escudo), reseteando cargas de pista.");
             playerData.hintCharges = 0;
             this.uiManager.updateHintIcon(0);
        }

        if (this.gameManager.getLives() <= 0) {
            gameOver = true;
            console.log('[QuizGameplayState] VIDAS AGOTADAS - GAME OVER.');
        }
    }

    this.hintAppliedToQuestionId = null; 

    if (gameOver) {
        this.isExitingOrChangingState = true; 
        console.log('[QuizGameplayState] Procesando Game Over...');
        this.uiManager.updateFeedback('¡Has perdido!', 'incorrect'); 
        if (this.nextQuestionTimeoutId) { 
            clearTimeout(this.nextQuestionTimeoutId); 
            this.nextQuestionTimeoutId = null;
            console.log("[QuizGameplayState] Timeout para siguiente pregunta cancelado por Game Over.");
        }
        
        setTimeout(() => {
            console.log("[QuizGameplayState] Timeout de Game Over: Verificando estado antes de cambiar...");
            if (this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') {
                 console.log("[QuizGameplayState] Timeout de Game Over: Cambiando a estado GameOverState.");
                 this.gameManager.getStateMachine().changeState('GameOver', { finalScore: playerData.score }, 'gq-wipe-transition');
            } else {
                 console.log("[QuizGameplayState] Timeout de Game Over: Estado ya cambió, no se transiciona a GameOverState.");
            }
        }, 1500); 
    } else {
        console.log('[QuizGameplayState] handleIncorrectAnswer() (no game over) llamando a proceedToNextStep().');
        this.proceedToNextStep(); 
    }
  }

  public proceedToNextStep(): void {
      console.log(`[QuizGameplayState] proceedToNextStep() INICIADO. isExitingOrChangingState: ${this.isExitingOrChangingState}, isWaitingForExplanationConfirm: ${this.isWaitingForExplanationConfirm}`);
      if (this.isExitingOrChangingState) {
          console.log('[QuizGameplayState] proceedToNextStep() abortado: isExitingOrChangingState es true.');
          return;
      }
      const explanation = this.currentQuestion?.explanation;
      const questionIdForLog = this.currentQuestion?.id || 'N/A';
      
      if (explanation && !this.isWaitingForExplanationConfirm) {
          console.log(`[QuizGameplayState] Pregunta ${questionIdForLog}: Mostrando explicación...`);
          this.isWaitingForExplanationConfirm = true;
          this.uiManager.showExplanation(explanation, () => {
              console.log(`[QuizGameplayState] Pregunta ${questionIdForLog}: Callback de showExplanation EJECUTADO.`);
              if (this.isExitingOrChangingState) {
                console.log(`[QuizGameplayState] Pregunta ${questionIdForLog}: Callback de showExplanation abortado: isExitingOrChangingState es true.`);
                return;
              } 
              this.isWaitingForExplanationConfirm = false;
              this.lastAnswerResultType = null; 
              console.log(`[QuizGameplayState] Pregunta ${questionIdForLog}: Callback de showExplanation llamando a scheduleNextQuestion(500).`);
              this.scheduleNextQuestion(500); 
          }, this.lastAnswerResultType); 
      }
      else if (!this.isWaitingForExplanationConfirm) {
          console.log(`[QuizGameplayState] Pregunta ${questionIdForLog}: No hay explicación o ya se está esperando. Programando siguiente pregunta directamente (delay 1500ms).`);
          this.lastAnswerResultType = null; 
          this.scheduleNextQuestion(1500); 
      } else {
          console.log(`[QuizGameplayState] Pregunta ${questionIdForLog}: proceedToNextStep(): Ya se está esperando confirmación de explicación. No se hace nada más.`);
      }
      console.log(`[QuizGameplayState] proceedToNextStep() FINALIZADO para pregunta ${questionIdForLog}.`);
  }

  private scheduleNextQuestion(delay: number): void {
    const questionIdForLog = this.currentQuestion?.id || 'N/A (previa)';
    console.log(`[QuizGameplayState] scheduleNextQuestion() INICIADO para pregunta ${questionIdForLog} con delay: ${delay}ms. isExitingOrChangingState: ${this.isExitingOrChangingState}`);
    if (this.isExitingOrChangingState) {
        console.log('[QuizGameplayState] scheduleNextQuestion() abortado: isExitingOrChangingState es true.');
        return;
    }

    if (this.nextQuestionTimeoutId) {
        console.log(`[QuizGameplayState] Limpiando timeout anterior: ${this.nextQuestionTimeoutId} antes de programar para ${questionIdForLog}.`);
        clearTimeout(this.nextQuestionTimeoutId);
        this.nextQuestionTimeoutId = null; 
    }
    
    this.nextQuestionTimeoutId = window.setTimeout(() => {
        const executedTimeoutId = this.nextQuestionTimeoutId; // Capturar el ID que se supone que es este timeout
        console.log(`[QuizGameplayState] TIMEOUT EJECUTADO para scheduleNextQuestion (ID esperado: ${executedTimeoutId}, ID actual en propiedad: ${this.nextQuestionTimeoutId}). Pregunta previa: ${questionIdForLog}`);
        
        // Importante: Anular this.nextQuestionTimeoutId ANTES de las verificaciones
        // para que si displayNextQuestion llama de nuevo a scheduleNextQuestion, no vea este ID como "pendiente".
        // Pero solo si este es el timeout que esperábamos.
        // Si this.nextQuestionTimeoutId ya es null o diferente, significa que otro timeout lo limpió o se reprogramó.
        // En este caso, este callback es de un timeout "obsoleto" y no debería actuar.
        if (this.nextQuestionTimeoutId !== executedTimeoutId && executedTimeoutId !== null) { // Si no es null, significa que este timeout específico fue el que se guardó
             // Esto es un chequeo extra, el null de arriba debería ser suficiente.
        }
        this.nextQuestionTimeoutId = null; // Marcar como no pendiente ANTES de proceder

        if (!this.isExitingOrChangingState && this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') {
            console.log("[QuizGameplayState] Timeout: Llamando a rAF para displayNextQuestion.");
            requestAnimationFrame(() => {
                if (!this.isExitingOrChangingState && this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') {
                    console.log("[QuizGameplayState] rAF: Llamando a displayNextQuestion.");
                    this.displayNextQuestion();
                } else {
                    console.log("[QuizGameplayState] displayNextQuestion abortado en rAF porque el estado cambió o se está saliendo. Estado actual FSM:", this.gameManager.getStateMachine().getCurrentStateName());
                }
            });
        } else {
            console.log("[QuizGameplayState] displayNextQuestion abortado en timeout porque el estado cambió o se está saliendo. Estado actual FSM:", this.gameManager.getStateMachine().getCurrentStateName());
        }
    }, delay);
    console.log(`[QuizGameplayState] Nueva pregunta programada con timeout ID: ${this.nextQuestionTimeoutId} para después de pregunta ${questionIdForLog}. Delay: ${delay}ms.`);
  }

  private displayNextQuestion(): void {
    console.log(`[QuizGameplayState] displayNextQuestion() INICIADO. isExitingOrChangingState: ${this.isExitingOrChangingState}`);
    if (this.isExitingOrChangingState) {
        console.log("[QuizGameplayState] displayNextQuestion abortado porque se está saliendo del estado.");
        return;
    }

    const quizSystem = this.gameManager.getQuizSystem();
    try {
        this.currentQuestion = quizSystem.selectNextQuestion();
        console.log(`[QuizGameplayState] Siguiente pregunta seleccionada: ID ${this.currentQuestion?.id || 'NINGUNA'}`);
    } catch (error) {
        console.error("[QuizGameplayState] Error seleccionando la siguiente pregunta:", error);
        this.uiManager.updateFeedback("Error al cargar la siguiente pregunta.", 'info');
        // Considerar si se debe intentar de nuevo o ir a un estado de error/resultados
        return;
    }

    if (!this.currentQuestion) {
        console.log("[QuizGameplayState] No quedan más preguntas disponibles. Transicionando a ResultsState.");
        this.isExitingOrChangingState = true; 
        this.uiManager.updateFeedback("¡Has completado todas las preguntas!", 'correct');
        setTimeout(() => {
            console.log("[QuizGameplayState] Timeout de fin de preguntas: Verificando estado antes de cambiar a Results...");
             if (this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') { 
                console.log("[QuizGameplayState] Timeout de fin de preguntas: Cambiando a estado ResultsState.");
                this.gameManager.getStateMachine().changeState('Results', { finalScore: this.gameManager.getPlayerData().score }, 'gq-wipe-transition');
             } else {
                console.log("[QuizGameplayState] Timeout de fin de preguntas: Estado ya cambió, no se transiciona a ResultsState.");
             }
        }, 1500);
        return;
    }

    this.hintAppliedToQuestionId = null; 

    const appContainer = this.gameManager.getContainerElement();
    if (!appContainer) {
        console.error("[QuizGameplayState] Contenedor #app no encontrado para displayNextQuestion.");
        return;
    }

    try {
        console.log(`[QuizGameplayState] Llamando a uiManager.buildQuizInterface para pregunta ID: ${this.currentQuestion.id}`);
        this.uiManager.buildQuizInterface(
            this.currentQuestion,
            appContainer, 
            this.handleOptionClick.bind(this),
            this.consecutiveCorrectAnswers
        );

        if (this.gameManager.getPlayerData().hintCharges > 0 && this.currentQuestion) {
             console.log("[QuizGameplayState] Aplicando visuales de pista.");
             this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey);
             this.hintAppliedToQuestionId = this.currentQuestion.id; 
        }
        console.log(`[QuizGameplayState] displayNextQuestion() FINALIZADO para pregunta ID: ${this.currentQuestion.id}`);

    } catch (error) {
        console.error("[QuizGameplayState] Error construyendo la interfaz del quiz:", error);
        this.uiManager.updateFeedback("Error al mostrar la pregunta.", 'info');
    }
  }

  public handleOptionClick(selectedKey: string): void {
    console.log(`[QuizGameplayState] handleOptionClick() INICIADO con key: ${selectedKey}. isExitingOrChangingState: ${this.isExitingOrChangingState}, isWaitingForExplanationConfirm: ${this.isWaitingForExplanationConfirm}, currentQuestion: ${!!this.currentQuestion}, nextQuestionTimeoutId: ${this.nextQuestionTimeoutId}`);
    
    // MODIFICACIÓN: Permitir el click si nextQuestionTimeoutId es null O si el click es para confirmar la explicación.
    // El problema original era que si nextQuestionTimeoutId no era null, se bloqueaba.
    // Pero si el timeout está corriendo para la *siguiente* pregunta (después de una explicación, por ej.),
    // y el usuario hace clic en una opción de la pregunta *actual* (lo cual no debería ser posible si las opciones están deshabilitadas),
    // entonces algo está mal. La condición principal es que no haya un timeout *activo* para la pregunta actual.
    // El `this.nextQuestionTimeoutId !== null` en la condición original podría ser demasiado restrictivo
    // si el timeout es para la *siguiente* pregunta y las opciones de la actual ya deberían estar deshabilitadas.
    // La clave es que `disableOptions()` se llame inmediatamente después de un click válido.

    if (this.isExitingOrChangingState || this.isWaitingForExplanationConfirm || !this.currentQuestion) {
         console.warn(`[QuizGameplayState] handleOptionClick ignorado: isExiting=${this.isExitingOrChangingState}, isWaitingExpl=${this.isWaitingForExplanationConfirm}, noCurrentQ=${!this.currentQuestion}`);
         return;
    }
    // Si hay un timeout pendiente, significa que ya se procesó una respuesta para la pregunta actual
    // y se está esperando para mostrar la siguiente. No se deberían procesar más clicks.
    if (this.nextQuestionTimeoutId !== null) {
        console.warn(`[QuizGameplayState] handleOptionClick ignorado: nextQuestionTimeoutId (${this.nextQuestionTimeoutId}) no es null, indicando que ya se procesó una respuesta o se está esperando la siguiente pregunta.`);
        return;
    }


    this.uiManager.disableOptions(); 
    console.log("[QuizGameplayState] Opciones deshabilitadas.");

    const quizSystem = this.gameManager.getQuizSystem();
    const isCorrect = quizSystem.validateAnswer(this.currentQuestion.id, selectedKey);
    const playerData = this.gameManager.getPlayerData();

    if (this.hintAppliedToQuestionId === this.currentQuestion.id) {
        if (playerData.hintCharges > 0) {
            playerData.hintCharges--;
            this.uiManager.updateHintIcon(playerData.hintCharges);
            console.log("[QuizGameplayState] Carga de pista descontada.");
        }
         this.hintAppliedToQuestionId = null; 
    }

    if (isCorrect === true) {
        console.log("[QuizGameplayState] Respuesta CORRECTA. Llamando a handleCorrectAnswer.");
        this.handleCorrectAnswer(this.currentQuestion.difficulty);
    } else if (isCorrect === false) {
        console.log("[QuizGameplayState] Respuesta INCORRECTA. Llamando a handleIncorrectAnswer.");
        this.handleIncorrectAnswer();
    } else {
        console.error("[QuizGameplayState] Error al validar la respuesta (isCorrect es null).");
        this.uiManager.updateFeedback("Error al validar la respuesta.", 'info');
        this.hintAppliedToQuestionId = null; 
        this.proceedToNextStep(); 
    }
    console.log(`[QuizGameplayState] handleOptionClick() FINALIZADO para key: ${selectedKey}.`);
  }

  public rebuildInterface(): void {
      console.log(`[QuizGameplayState] rebuildInterface() INICIADO. isExitingOrChangingState: ${this.isExitingOrChangingState}`);
      if (this.isExitingOrChangingState) return;
      const appContainer = this.gameManager.getContainerElement();
      if (this.currentQuestion && appContainer) {
          console.log("[QuizGameplayState] Reconstruyendo interfaz para pregunta ID:", this.currentQuestion.id);
          this.uiManager.buildQuizInterface(
              this.currentQuestion,
              appContainer,
              this.handleOptionClick.bind(this),
              this.consecutiveCorrectAnswers
          );
          if (this.hintAppliedToQuestionId === this.currentQuestion.id) {
               this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey);
          }
      } else {
          console.warn("[QuizGameplayState] No se puede reconstruir, falta pregunta actual o contenedor.");
      }
  }

  public getPreferredEnterAnimation?(): string {
    return 'gq-wipe-transition';
  }
  public getPreferredExitAnimation?(): string {
    return 'gq-wipe-transition';
  }
}
