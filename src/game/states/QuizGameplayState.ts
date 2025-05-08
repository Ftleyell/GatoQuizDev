// src/game/states/QuizGameplayState.ts

import { IState } from '../StateMachine';
import { GameManager } from '../GameManager';
import { UIManager } from '../../systems/UIManager';
import { QuizSystem } from '../../systems/QuizSystem'; // Asegúrate de importar QuizSystem

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
  private quizSystem: QuizSystem;
  public currentQuestion: Question | null = null;
  private nextQuestionTimeoutId: number | null = null;
  public consecutiveCorrectAnswers: number = 0;
  private hintAppliedToQuestionId: number | string | null = null;
  // Flag para controlar si estamos esperando la confirmación del overlay
  private isWaitingForExplanationConfirm: boolean = false; // <<< IMPORTANTE
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
        this.quizSystem = gameManager.getQuizSystem();
    } catch (error) {
        console.error("QuizGameplayState: Error crítico obteniendo UIManager o QuizSystem.", error);
        throw error;
    }
  }

  // --- selectRandomCatTemplateId (sin cambios) ---
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

  // --- enter (sin cambios) ---
  enter(params?: any): void {
    console.log('[QuizGameplayState] enter() INICIADO.', params);
    this.isExitingOrChangingState = false;
    this.gameManager.setBodyStateClass('quizgameplay');
    this.gameManager.getPlayerData().reset();
    console.log("[QuizGameplayState] PlayerData reseteado.");
    this.consecutiveCorrectAnswers = 0;
    this.hintAppliedToQuestionId = null;
    this.isWaitingForExplanationConfirm = false; // <<< Asegurar que inicia en false
    this.lastAnswerResultType = null;
    if (this.nextQuestionTimeoutId) {
        clearTimeout(this.nextQuestionTimeoutId);
        this.nextQuestionTimeoutId = null;
        console.warn("[QuizGameplayState] Timeout pendiente cancelado en enter().");
    }
    this.displayNextQuestion();
    console.log('[QuizGameplayState] enter() FINALIZADO.');
  }

  // --- exit (sin cambios) ---
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
    this.isWaitingForExplanationConfirm = false; // <<< Asegurar que termina en false
    this.hintAppliedToQuestionId = null;
    this.currentQuestion = null;
    this.lastAnswerResultType = null;
    console.log('[QuizGameplayState] exit() FINALIZADO.');
  }

  // --- update (sin cambios) ---
  update(_deltaTime: number): void { /* No action needed */ }

  // --- calculateScore (sin cambios) ---
  private calculateScore(difficulty: string | number, streakBefore: number): { totalPoints: number, basePoints: number, difficultyBonus: number, comboBonus: number } {
    const currentStreak = streakBefore + 1;
    const basePoints = this.BASE_POINTS_PER_CORRECT * currentStreak;
    const difficultyBonus = this.DIFFICULTY_BONUS[difficulty] ?? this.DIFFICULTY_BONUS[1] ?? 0;
    const actualComboMultiplier = this.gameManager.getPlayerData().getCurrentComboMultiplier();
    const comboBonus = Math.max(0, (basePoints + difficultyBonus) * (actualComboMultiplier - 1));
    const totalPoints = Math.round(basePoints + difficultyBonus + comboBonus);
    return { totalPoints, basePoints, difficultyBonus, comboBonus: Math.round(comboBonus) };
  }

  // --- handleCorrectAnswer (sin cambios) ---
  private handleCorrectAnswer(difficulty: string | number): void {
    console.log('[QuizGameplayState] handleCorrectAnswer() INICIADO.');
    if (this.isExitingOrChangingState) { console.log('[QuizGameplayState] handleCorrectAnswer() abortado: isExitingOrChangingState es true.'); return; }
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
    try { this.gameManager.getAudioManager().playSound('correct'); } catch(e) { console.error("Error sonido 'correct':", e); }
    try { this.gameManager.getCatManager().growExistingCats(SIZE_INCREMENT_PER_CORRECT, MAX_CORRECT_ANSWER_GROWTH); } catch (error) { console.error("Error llamando a catManager.growExistingCats:", error); }
    const catsToSpawn = this.gameManager.getPlayerData().getCatsPerCorrectAnswer();
    const selectedTemplateId = this.selectRandomCatTemplateId();
    if (selectedTemplateId) { for (let i = 0; i < catsToSpawn; i++) { try { this.gameManager.getCatManager().addCat(selectedTemplateId); } catch (error) { console.error(`Error al llamar a catManager.addCat (iteración ${i+1}/${catsToSpawn}):`, error); } } }
    // *** CONSOLE LOG AÑADIDO ***
    console.log('[QuizGameplayState] handleCorrectAnswer() llamando a proceedToNextStep().');
    this.proceedToNextStep();
  }

  // --- handleIncorrectAnswer (sin cambios) ---
  private handleIncorrectAnswer(): void {
    console.log('[QuizGameplayState] handleIncorrectAnswer() INICIADO.');
    if (this.isExitingOrChangingState) { console.log('[QuizGameplayState] handleIncorrectAnswer() abortado: isExitingOrChangingState es true.'); return; }
    this.lastAnswerResultType = 'incorrect';
    const playerData = this.gameManager.getPlayerData();
    let gameOver = false;
    if (playerData.hasShield) {
        playerData.hasShield = false; this.uiManager.updateFeedback('¡Escudo Roto!', 'shield'); this.uiManager.updateShieldIcon(false); this.gameManager.getAudioManager().playSound('shield_break'); this.lastAnswerResultType = 'shield'; console.log('[QuizGameplayState] Escudo usado.');
    } else {
        this.consecutiveCorrectAnswers = 0; this.gameManager.decrementLives(); this.uiManager.updateComboVisuals(this.consecutiveCorrectAnswers); this.gameManager.getAudioManager().playSound('incorrect');
        if (playerData.hintCharges > 0) { console.log("[QuizGameplayState] Respuesta incorrecta (sin escudo), reseteando cargas de pista."); playerData.hintCharges = 0; this.uiManager.updateHintIcon(0); }
        if (this.gameManager.getLives() <= 0) { gameOver = true; console.log('[QuizGameplayState] VIDAS AGOTADAS - GAME OVER.'); }
    }
    this.hintAppliedToQuestionId = null;
    if (gameOver) {
        this.isExitingOrChangingState = true; console.log('[QuizGameplayState] Procesando Game Over...'); this.uiManager.updateFeedback('¡Has perdido!', 'incorrect');
        if (this.nextQuestionTimeoutId) { clearTimeout(this.nextQuestionTimeoutId); this.nextQuestionTimeoutId = null; console.log("[QuizGameplayState] Timeout para siguiente pregunta cancelado por Game Over."); }
        setTimeout(() => {
            console.log("[QuizGameplayState] Timeout de Game Over: Verificando estado antes de cambiar...");
            if (this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') { console.log("[QuizGameplayState] Timeout de Game Over: Cambiando a estado GameOverState."); this.gameManager.getStateMachine().changeState('GameOver', { score: playerData.score }, 'gq-wipe-transition'); }
            else { console.log("[QuizGameplayState] Timeout de Game Over: Estado ya cambió, no se transiciona a GameOverState."); }
        }, 1500);
    } else {
        // *** CONSOLE LOG AÑADIDO ***
        console.log('[QuizGameplayState] handleIncorrectAnswer() (no game over) llamando a proceedToNextStep().');
        this.proceedToNextStep();
    }
  }

  // --- proceedToNextStep (MODIFICADO con logs) ---
  public proceedToNextStep(): void {
      const questionIdForLog = this.currentQuestion?.id || 'N/A';
      console.log(`[QuizGameplayState] proceedToNextStep() INICIADO para pregunta ${questionIdForLog}. isExiting: ${this.isExitingOrChangingState}, isWaitingExpl: ${this.isWaitingForExplanationConfirm}`); // <<< LOG EXISTENTE

      if (this.isExitingOrChangingState) {
          console.log(`[QuizGameplayState] proceedToNextStep() abortado (pregunta ${questionIdForLog}): isExitingOrChangingState es true.`); // <<< LOG EXISTENTE
          return;
      }
      // *** CONSOLE LOG AÑADIDO ***
      if (this.isWaitingForExplanationConfirm) {
          console.log(`[QuizGameplayState] proceedToNextStep() (pregunta ${questionIdForLog}): Ya esperando confirmación de explicación. NO SE HACE NADA MÁS.`); // <<< LOG MODIFICADO
          return;
      }

      const explanation = this.currentQuestion?.explanation;

      const scheduleNext = () => {
          // *** CONSOLE LOG AÑADIDO ***
          console.log(`[QuizGameplayState] scheduleNext() INTERNO llamado (después de pregunta ${questionIdForLog}). Programando siguiente pregunta.`);
          this.lastAnswerResultType = null;
          const delay = explanation ? 500 : 1500; // Delay corto si hubo expl, largo si no
          this.scheduleNextQuestion(delay);
      };

      if (explanation) {
          // *** CONSOLE LOG AÑADIDO ***
          console.log(`[QuizGameplayState] Pregunta ${questionIdForLog}: Mostrando explicación. SET isWaitingForExplanationConfirm = true.`);
          this.isWaitingForExplanationConfirm = true; // <<< Establecer el flag ANTES de mostrar

          const explanationCallback = () => {
              // *** CONSOLE LOG AÑADIDO ***
              console.log(`[QuizGameplayState] ** explanationCallback EJECUTADO ** (pregunta ${questionIdForLog}). SET isWaitingForExplanationConfirm = false.`);
              if (this.isExitingOrChangingState) {
                  console.log(`[QuizGameplayState] explanationCallback abortado (pregunta ${questionIdForLog}): isExitingOrChangingState es true.`);
                  this.isWaitingForExplanationConfirm = false; // <<< Asegurar reset incluso si aborta
                  return;
              }
              this.isWaitingForExplanationConfirm = false; // <<< Resetear el flag AQUI
              scheduleNext(); // Programar la siguiente pregunta DESPUÉS de la confirmación
          };

          try {
            // *** CONSOLE LOG AÑADIDO ***
            console.log(`[QuizGameplayState] Llamando a uiManager.showExplanation para pregunta ${questionIdForLog}.`);
            this.uiManager.showExplanation(explanation, explanationCallback, this.lastAnswerResultType);
          } catch (error){
            console.error(`[QuizGameplayState] Error llamando a uiManager.showExplanation:`, error);
            // Si falla mostrar la explicación, ¿qué hacemos? ¿Procedemos o nos detenemos?
            // Por ahora, procedemos para no bloquear el juego.
            this.isWaitingForExplanationConfirm = false; // <<< Asegurar reset en caso de error
            scheduleNext();
          }
      } else {
          // *** CONSOLE LOG AÑADIDO ***
          console.log(`[QuizGameplayState] Pregunta ${questionIdForLog}: No hay explicación. Llamando a scheduleNext directamente.`);
          scheduleNext();
      }
      console.log(`[QuizGameplayState] proceedToNextStep() FINALIZADO para pregunta ${questionIdForLog}.`); // <<< LOG EXISTENTE
  }
  // --- FIN proceedToNextStep ---

  // --- scheduleNextQuestion (sin cambios) ---
  private scheduleNextQuestion(delay: number): void {
    const questionIdForLog = this.currentQuestion?.id || 'N/A (previa)';
    console.log(`[QuizGameplayState] scheduleNextQuestion() INICIADO para pregunta ${questionIdForLog} con delay: ${delay}ms. isExiting: ${this.isExitingOrChangingState}`);
    if (this.isExitingOrChangingState) { console.log('[QuizGameplayState] scheduleNextQuestion() abortado: isExitingOrChangingState es true.'); return; }
    if (this.nextQuestionTimeoutId) { console.log(`[QuizGameplayState] Limpiando timeout anterior: ${this.nextQuestionTimeoutId} antes de programar para ${questionIdForLog}.`); clearTimeout(this.nextQuestionTimeoutId); }
    this.nextQuestionTimeoutId = window.setTimeout(() => {
        const executedTimeoutId = this.nextQuestionTimeoutId;
        this.nextQuestionTimeoutId = null;
        console.log(`[QuizGameplayState] TIMEOUT EJECUTADO (ID: ${executedTimeoutId}) para scheduleNextQuestion. Pregunta previa: ${questionIdForLog}`);
        if (!this.isExitingOrChangingState && this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') {
            console.log("[QuizGameplayState] Timeout: Llamando a displayNextQuestion.");
            requestAnimationFrame(() => {
                 if (!this.isExitingOrChangingState && this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') { this.displayNextQuestion(); }
                 else { console.log("[QuizGameplayState] displayNextQuestion abortado en rAF porque el estado cambió o se está saliendo."); }
            });
        } else { console.log("[QuizGameplayState] displayNextQuestion abortado en timeout porque el estado cambió o se está saliendo. Estado FSM:", this.gameManager.getStateMachine().getCurrentStateName()); }
    }, delay);
    console.log(`[QuizGameplayState] Nueva pregunta programada con timeout ID: ${this.nextQuestionTimeoutId} para después de pregunta ${questionIdForLog}. Delay: ${delay}ms.`);
  }

  // --- displayNextQuestion (sin cambios respecto a la última versión) ---
  private displayNextQuestion(): void {
    console.log(`[QuizGameplayState] displayNextQuestion() INICIADO. isExiting: ${this.isExitingOrChangingState}`);
    if (this.isExitingOrChangingState) { console.log("[QuizGameplayState] displayNextQuestion abortado porque se está saliendo del estado."); return; }

    try {
        this.currentQuestion = this.quizSystem.selectNextQuestion();
        console.log(`[QuizGameplayState] Siguiente pregunta seleccionada: ID ${this.currentQuestion?.id || 'NINGUNA'}`);
    } catch (error) {
        console.error("[QuizGameplayState] Error seleccionando la siguiente pregunta:", error);
        this.uiManager.updateFeedback("Error al cargar la siguiente pregunta.", 'info');
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
                const totalQuestionsAnswered = this.quizSystem.getTotalQuestionsCount();
                const playerData = this.gameManager.getPlayerData();
                // TODO: Implementar un conteo real de respuestas correctas en PlayerData o GameManager
                console.warn("[QuizGameplayState] Estimando respuestas correctas basado en puntaje. Implementar conteo real.");
                const estimatedCorrect = Math.round(playerData.score / (this.BASE_POINTS_PER_CORRECT * 1.2));

                this.gameManager.getStateMachine().changeState(
                    'Results',
                    {
                        score: playerData.score,
                        correct: estimatedCorrect,
                        total: totalQuestionsAnswered
                    },
                    'gq-wipe-transition'
                );
             } else {
                console.log("[QuizGameplayState] Timeout de fin de preguntas: Estado ya cambió, no se transiciona a ResultsState.");
             }
        }, 1500);
        return;
    }
    this.hintAppliedToQuestionId = null;
    const appContainer = this.gameManager.getContainerElement();
    if (!appContainer) { console.error("[QuizGameplayState] Contenedor #app no encontrado para displayNextQuestion."); return; }
    try {
        console.log(`[QuizGameplayState] Llamando a uiManager.buildQuizInterface para pregunta ID: ${this.currentQuestion.id}`);
        this.uiManager.buildQuizInterface( this.currentQuestion, appContainer, this.handleOptionClick.bind(this), this.consecutiveCorrectAnswers );
        if (this.gameManager.getPlayerData().hintCharges > 0 && this.currentQuestion) { console.log("[QuizGameplayState] Aplicando visuales de pista."); this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey); this.hintAppliedToQuestionId = this.currentQuestion.id; }
        console.log(`[QuizGameplayState] displayNextQuestion() FINALIZADO para pregunta ID: ${this.currentQuestion.id}`);
    } catch (error) { console.error("[QuizGameplayState] Error construyendo la interfaz del quiz:", error); this.uiManager.updateFeedback("Error al mostrar la pregunta.", 'info'); }
  }
  // --- FIN displayNextQuestion ---

  // --- handleOptionClick (MODIFICADO con logs) ---
  public handleOptionClick(selectedKey: string): void {
    const questionIdForLog = this.currentQuestion?.id || 'N/A';
    // *** CONSOLE LOG AÑADIDO ***
    console.log(`[QuizGameplayState] handleOptionClick() INICIADO con key: ${selectedKey} para pregunta ${questionIdForLog}. isExiting: ${this.isExitingOrChangingState}, isWaitingExpl: ${this.isWaitingForExplanationConfirm}, timeoutId: ${this.nextQuestionTimeoutId}`);

    // *** Chequeo más estricto: AÑADIDO isWaitingForExplanationConfirm ***
    if (!this.currentQuestion || this.isExitingOrChangingState || this.isWaitingForExplanationConfirm || this.nextQuestionTimeoutId !== null) {
        console.warn(`[QuizGameplayState] handleOptionClick IGNORADO (pregunta ${questionIdForLog}): noCurrentQ=${!this.currentQuestion}, isExiting=${this.isExitingOrChangingState}, isWaitingExpl=${this.isWaitingForExplanationConfirm}, timeoutPending=${this.nextQuestionTimeoutId !== null}`);
        return;
    }

    // *** CONSOLE LOG AÑADIDO ***
    console.log(`[QuizGameplayState] handleOptionClick: PROCEDIENDO con validación para pregunta ${questionIdForLog}.`);
    this.uiManager.disableOptions();
    console.log(`[QuizGameplayState] Opciones deshabilitadas para pregunta ${questionIdForLog}.`); // Log existente

    const isCorrect = this.quizSystem.validateAnswer(this.currentQuestion.id, selectedKey);
    const playerData = this.gameManager.getPlayerData();

    // Descontar pista si se usó (sin cambios)
    if (this.hintAppliedToQuestionId === this.currentQuestion.id) {
        if (playerData.hintCharges > 0) {
            playerData.hintCharges--;
            this.uiManager.updateHintIcon(playerData.hintCharges);
            console.log("[QuizGameplayState] Carga de pista descontada.");
        }
        this.hintAppliedToQuestionId = null;
    }

    // Procesar resultado (sin cambios)
    if (isCorrect === true) {
        console.log(`[QuizGameplayState] Respuesta CORRECTA (pregunta ${questionIdForLog}). Llamando a handleCorrectAnswer.`);
        this.handleCorrectAnswer(this.currentQuestion.difficulty);
    } else if (isCorrect === false) {
        console.log(`[QuizGameplayState] Respuesta INCORRECTA (pregunta ${questionIdForLog}). Llamando a handleIncorrectAnswer.`);
        this.handleIncorrectAnswer();
    } else {
        console.error(`[QuizGameplayState] Error al validar la respuesta (isCorrect es null) para pregunta ${questionIdForLog}.`);
        this.uiManager.updateFeedback("Error al validar la respuesta.", 'info');
        this.hintAppliedToQuestionId = null;
        this.proceedToNextStep(); // Intentar avanzar a la siguiente pregunta en caso de error de validación
    }
    console.log(`[QuizGameplayState] handleOptionClick() FINALIZADO para key: ${selectedKey} (pregunta ${questionIdForLog}).`); // Log existente
  }
  // --- FIN handleOptionClick ---

  // --- rebuildInterface (sin cambios) ---
  public rebuildInterface(): void {
      console.log(`[QuizGameplayState] rebuildInterface() INICIADO. isExitingOrChangingState: ${this.isExitingOrChangingState}`);
      if (this.isExitingOrChangingState) return;
      const appContainer = this.gameManager.getContainerElement();
      if (this.currentQuestion && appContainer) {
          console.log("[QuizGameplayState] Reconstruyendo interfaz para pregunta ID:", this.currentQuestion.id);
          const isExplanationCurrentlyVisible = this.uiManager.isExplanationVisible();
          const originalConfirmCallback = (this.uiManager as any).externalConfirmCallback;
          const savedResultType = this.lastAnswerResultType;

          this.uiManager.buildQuizInterface(
              this.currentQuestion,
              appContainer,
              this.handleOptionClick.bind(this),
              this.consecutiveCorrectAnswers
          );
          if (this.hintAppliedToQuestionId === this.currentQuestion.id) {
               this.uiManager.applyHintVisuals(this.currentQuestion.correctAnswerKey);
          }
            if (isExplanationCurrentlyVisible && this.currentQuestion.explanation) {
                console.log("[UIManager] Reconstruyendo interfaz: Restaurando explicación visible.");
                const confirmCallback = originalConfirmCallback ?? (() => {
                     if (this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') {
                         this.proceedToNextStep();
                     }
                 });
                this.uiManager.showExplanation(
                    this.currentQuestion.explanation,
                    confirmCallback,
                    savedResultType
                );
            }
      } else {
          console.warn("[QuizGameplayState] No se puede reconstruir, falta pregunta actual o contenedor.");
      }
  }

  public getPreferredEnterAnimation?(): string { return 'gq-wipe-transition'; }
  public getPreferredExitAnimation?(): string { return 'gq-wipe-transition'; }
}