// src/game/modules/quiz/QuizGameModule.ts
import type { IGameModule, GameResult, EngineServices } from '../../../types'; // Sube 3 niveles ('quiz/', 'modules/', 'game/') a src/, luego a 'types/' (usa index.ts)
import type { QuizSystem } from '.'; // Usa el index.ts de la carpeta actual ('quiz/') que ahora exporta QuizSystem
import { QuizUIManager } from './ui'; // Entra a 'ui/' (usa el index.ts de 'ui/' que exporta QuizUIManager)
import type { PlayerData } from '../../PlayerData'; // Sube dos niveles ('modules/', 'game/') a src/, luego a 'game/'

// Tipos específicos del Quiz
interface QuestionOption { key: string; text: string; }
interface Question {
  id: number | string;
  text: string;
  options: QuestionOption[];
  correctAnswerKey: string;
  difficulty: string | number;
  explanation?: string;
}

export class QuizGameModule implements IGameModule {
    private engineServices!: EngineServices;
    private uiHostElement!: HTMLElement; 
    private quizSystem!: QuizSystem;     
    public quizUIManager!: QuizUIManager; 
    private playerData!: PlayerData;     

    public currentQuestion: Question | null = null; 
    private isWaitingForExplanationConfirm: boolean = false; 
    private lastAnswerResultType: 'correct' | 'incorrect' | 'shield' | null = null; 
    public consecutiveCorrectAnswers: number = 0; 
    private hintAppliedToQuestionId: number | string | null = null; 
    private nextQuestionTimeoutId: number | null = null; 
    private isModuleActive: boolean = false; 

    private readonly BASE_POINTS_PER_CORRECT = 15;
    private readonly DIFFICULTY_BONUS: { [key: string]: number } = {
        "easy": 10, "1": 10, "2": 20, "medium": 30,
        "3": 30, "hard": 45, "4": 45, "5": 65
    };
    private readonly SIZE_INCREMENT_PER_CORRECT = 1;
    private readonly MAX_CORRECT_ANSWER_GROWTH = 4;

    private questionsAnsweredCorrectly: number = 0;
    private questionsAttemptedInModule: number = 0;

    constructor() {
        console.log("QuizGameModule: Constructor llamado.");
    }

    getName(): string {
        return "GatoQuizModule";
    }

    async loadData(_data: any): Promise<void> {
        console.log("QuizGameModule: loadData() llamado. Datos recibidos:", _data);
        // La carga de datos de QuizSystem se maneja externamente y se accede en initialize.
    }

    async initialize(engineServices: EngineServices, uiHostElement: HTMLElement): Promise<void> {
        console.log("QuizGameModule: initialize() INICIADO. uiHostElement recibido:", uiHostElement, "EngineServices:", engineServices);
        this.engineServices = engineServices;
        this.uiHostElement = uiHostElement; 

        if (!this.engineServices.quizSystem) {
            console.error("QuizGameModule CRITICAL: QuizSystem no fue provisto por EngineServices.");
            throw new Error("QuizGameModule: QuizSystem no fue provisto por EngineServices.");
        }
        this.quizSystem = this.engineServices.quizSystem;
        console.log("QuizGameModule: QuizSystem obtenido:", this.quizSystem);

        if (!this.engineServices.playerData) {
            console.error("QuizGameModule CRITICAL: PlayerData no fue provisto por EngineServices.");
            throw new Error("QuizGameModule: PlayerData no fue provisto por EngineServices.");
        }
        this.playerData = this.engineServices.playerData;
        console.log("QuizGameModule: PlayerData obtenido:", this.playerData);
        
        try {
            this.quizUIManager = new QuizUIManager(this, this.engineServices, this.uiHostElement);
            console.log("QuizGameModule: QuizUIManager instanciado:", this.quizUIManager ? 'OK' : 'FALLO');
        } catch (error) {
            console.error("QuizGameModule CRITICAL: Error instanciando QuizUIManager:", error);
            throw error; // Relanzar para que QuizGameplayState lo maneje
        }

        this.consecutiveCorrectAnswers = 0;
        this.hintAppliedToQuestionId = null;
        this.isWaitingForExplanationConfirm = false;
        this.lastAnswerResultType = null;
        if (this.nextQuestionTimeoutId) {
            clearTimeout(this.nextQuestionTimeoutId);
            this.nextQuestionTimeoutId = null;
        }
        this.isModuleActive = false;
        this.questionsAnsweredCorrectly = 0;
        this.questionsAttemptedInModule = 0;

        console.log("QuizGameModule: initialize() FINALIZADO.");
    }

    start(): void {
        console.log("QuizGameModule: start() INICIADO.");
        if (!this.quizSystem || !this.quizUIManager || !this.playerData) {
            console.error("QuizGameModule: No se puede iniciar, dependencias no listas (QuizSystem, QuizUIManager, o PlayerData).");
            return;
        }
        this.isModuleActive = true;
        console.log("QuizGameModule: Llamando a quizSystem.resetAvailableQuestions().");
        this.quizSystem.resetAvailableQuestions(); 
        
        console.log("QuizGameModule: Llamando a displayNextQuestion() desde start().");
        this.displayNextQuestion();

        // Actualizar UI global al inicio del módulo
        console.log("QuizGameModule: Actualizando UI global desde start().");
        this.engineServices.globalUI.updateScoreDisplay(this.playerData.score, this.consecutiveCorrectAnswers);
        this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives, this.playerData.hasShield, this.playerData.hintCharges);
        this.engineServices.toolManager.updateControlVisibilityBasedOnUnlocks();
        this.engineServices.toolManager.updateToolButtonActiveStates();
        
        this.quizUIManager.updateInkBar();
        this.quizUIManager.updateInkVisibility(this.playerData.isDrawingUnlocked);
        console.log("QuizGameModule: start() FINALIZADO.");
    }

    update(_deltaTime: number): void {
        if (!this.isModuleActive) return;
        // Lógica de actualización si es necesaria
    }

    async end(): Promise<GameResult> {
        console.log("QuizGameModule: end() llamado. Preparando resultados del módulo...");
        this.isModuleActive = false; 
        if (this.nextQuestionTimeoutId) { 
            clearTimeout(this.nextQuestionTimeoutId);
            this.nextQuestionTimeoutId = null;
        }

        const gameResult: GameResult = {
            score: this.playerData.score,
            correctAnswersCount: this.questionsAnsweredCorrectly,
            totalQuestionsAttempted: this.questionsAttemptedInModule,
        };
        console.log("QuizGameModule: Resultados finales del módulo:", gameResult);
        return gameResult; 
    }

    destroy(): void {
        console.log("QuizGameModule: destroy() INICIADO.");
        this.isModuleActive = false;
        if (this.nextQuestionTimeoutId) {
            clearTimeout(this.nextQuestionTimeoutId);
            this.nextQuestionTimeoutId = null;
        }
        if (this.quizUIManager) {
            console.log("QuizGameModule: Llamando a quizUIManager.destroy().");
            this.quizUIManager.destroy(); 
        }
        console.log("QuizGameModule: destroy() FINALIZADO.");
    }

    private displayNextQuestion(): void {
        console.log("QuizGameModule: displayNextQuestion() INICIADO.");
        if (!this.isModuleActive) {
            console.log("QuizGameModule: displayNextQuestion() abortado, módulo no activo.");
            return;
        }
        console.log("QuizGameModule: Intentando seleccionar siguiente pregunta desde QuizSystem...");
        this.currentQuestion = this.quizSystem.selectNextQuestion();
        // Usar JSON.stringify para ver el contenido de la pregunta o si es null
        console.log("QuizGameModule: Pregunta seleccionada:", this.currentQuestion ? JSON.stringify(this.currentQuestion.id) : null);


        if (!this.currentQuestion) {
            console.warn("QuizGameModule: No hay más preguntas disponibles. Módulo finalizando.");
            this.isModuleActive = false; // Marcar como inactivo antes de llamar a GameManager
            this.engineServices.audioManager.playSound('level_complete');
            
            const currentPlayerData = this.engineServices.gameManager.getPlayerData(); // Obtener datos actualizados
            const isNewHighScore = currentPlayerData.score > (currentPlayerData as any).highScore; // Necesitaríamos un getter para highScore
            
            console.log("QuizGameModule: Llamando a gameManager.moduleFinished() por falta de preguntas.");
            this.engineServices.gameManager.moduleFinished({
                score: currentPlayerData.score,
                correct: this.questionsAnsweredCorrectly,
                total: this.questionsAttemptedInModule,
                isNewHighScore: isNewHighScore 
            });
            return;
        }

        this.questionsAttemptedInModule++;
        this.hintAppliedToQuestionId = null; 
        this.isWaitingForExplanationConfirm = false;

        if (this.quizUIManager) {
             console.log(`QuizGameModule: PREGUNTA OBTENIDA (ID: ${this.currentQuestion.id}). Llamando a quizUIManager.buildQuizInterface...`);
             this.quizUIManager.buildQuizInterface(
                 this.currentQuestion,
                 this.handleOptionClick.bind(this), 
                 this.consecutiveCorrectAnswers
             );
             if (this.playerData.hintCharges > 0 && this.currentQuestion) {
                console.log("QuizGameModule: Aplicando visuales de pista.");
                this.quizUIManager.applyHintVisuals(this.currentQuestion.correctAnswerKey);
                this.hintAppliedToQuestionId = this.currentQuestion.id;
             }
             console.log("QuizGameModule: Actualizando UI global desde displayNextQuestion().");
             this.engineServices.globalUI.updateScoreDisplay(this.playerData.score, this.consecutiveCorrectAnswers);
             this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives, this.playerData.hasShield, this.playerData.hintCharges);
        } else {
            console.error("QuizGameModule CRITICAL: quizUIManager no disponible para displayNextQuestion.");
        }
        console.log("QuizGameModule: displayNextQuestion() FINALIZADO.");
    }

    private handleOptionClick(selectedKey: string): void {
        console.log(`QuizGameModule: handleOptionClick llamado con key: '${selectedKey}'. currentQuestion: ${this.currentQuestion?.id}, isModuleActive: ${this.isModuleActive}, isWaitingForExplanationConfirm: ${this.isWaitingForExplanationConfirm}, nextQuestionTimeoutId: ${this.nextQuestionTimeoutId}`);
        if (!this.currentQuestion || !this.isModuleActive || this.isWaitingForExplanationConfirm || this.nextQuestionTimeoutId !== null) {
            console.log("QuizGameModule: handleOptionClick ignorado (condiciones no cumplidas).");
            return;
        }
        console.log("QuizGameModule: Deshabilitando opciones...");
        this.quizUIManager.disableOptions(); 

        const isCorrect = this.quizSystem.validateAnswer(this.currentQuestion.id, selectedKey);
        console.log(`QuizGameModule: Respuesta validada para pregunta ${this.currentQuestion.id}. Es correcta: ${isCorrect}`);

        if (this.hintAppliedToQuestionId === this.currentQuestion.id) {
            if (this.playerData.hintCharges > 0) {
                this.playerData.hintCharges--;
                console.log(`QuizGameModule: Carga de pista consumida. Restantes: ${this.playerData.hintCharges}`);
                this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives, this.playerData.hasShield, this.playerData.hintCharges);
            }
            this.hintAppliedToQuestionId = null;
        }

        if (isCorrect) {
            console.log("QuizGameModule: Llamando a handleCorrectAnswer.");
            this.handleCorrectAnswer(this.currentQuestion.difficulty);
        } else {
            console.log("QuizGameModule: Llamando a handleIncorrectAnswer.");
            this.handleIncorrectAnswer();
        }
    }

    private calculateScore(difficulty: string | number, streakBefore: number): { totalPoints: number, basePoints: number, difficultyBonus: number, comboBonus: number } {
        const currentStreak = streakBefore + 1;
        const basePoints = this.BASE_POINTS_PER_CORRECT * currentStreak;
        const difficultyBonus = this.DIFFICULTY_BONUS[difficulty] ?? this.DIFFICULTY_BONUS[1] ?? 0;
        const actualComboMultiplier = this.playerData.getCurrentComboMultiplier();
        const comboBonus = Math.max(0, (basePoints + difficultyBonus) * (actualComboMultiplier - 1));
        const totalPoints = Math.round(basePoints + difficultyBonus + comboBonus);
        // console.log(`calculateScore: diff=${difficulty}, streak=${currentStreak}, base=${basePoints}, diffBonus=${difficultyBonus}, comboMult=${actualComboMultiplier.toFixed(1)}, comboBonus=${comboBonus.toFixed(0)}, total=${totalPoints}`);
        return { totalPoints, basePoints, difficultyBonus, comboBonus: Math.round(comboBonus) };
    }

    private handleCorrectAnswer(difficulty: string | number): void {
        this.lastAnswerResultType = 'correct';
        this.questionsAnsweredCorrectly++;
        const scoreBreakdown = this.calculateScore(difficulty, this.consecutiveCorrectAnswers);
        this.consecutiveCorrectAnswers++;
        this.playerData.score += scoreBreakdown.totalPoints;
        console.log(`QuizGameModule: Respuesta CORRECTA. Puntos ganados: ${scoreBreakdown.totalPoints}. Score total: ${this.playerData.score}. Racha: ${this.consecutiveCorrectAnswers}`);

        this.engineServices.inkManager.gainInkOnCorrectAnswer(); 
        this.engineServices.globalUI.updateScoreDisplay(this.playerData.score, this.consecutiveCorrectAnswers);
        this.quizUIManager.updateInkBar();

        let feedbackMessage = `¡+${scoreBreakdown.totalPoints} Pts!`;
        let details = `(Base: ${scoreBreakdown.basePoints}, Dif: +${scoreBreakdown.difficultyBonus}`;
        const actualComboMultiplier = this.playerData.getCurrentComboMultiplier();
        if (scoreBreakdown.comboBonus > 0) { details += `, Combo x${actualComboMultiplier.toFixed(1)}: +${scoreBreakdown.comboBonus}`; }
        details += ')';
        feedbackMessage += ` ${details}`;
        this.quizUIManager.updateFeedback(feedbackMessage, 'correct');

        this.engineServices.audioManager.playSound('correct');
        this.engineServices.catManager.growExistingCats(this.SIZE_INCREMENT_PER_CORRECT, this.MAX_CORRECT_ANSWER_GROWTH);

        const catsToSpawn = this.playerData.getCatsPerCorrectAnswer();
        const catManager = this.engineServices.catManager;
        const weightedTemplates = catManager.getSpawnableTemplatesWeighted();
        let selectedTemplateId = 'common_cat'; 
        if (weightedTemplates.length > 0) {
            const totalWeight = weightedTemplates.reduce((sum, t) => sum + t.weight, 0);
            if (totalWeight > 0) {
                let randomNum = Math.random() * totalWeight;
                for (const template of weightedTemplates) {
                    randomNum -= template.weight;
                    if (randomNum <= 0) { selectedTemplateId = template.id; break; }
                }
            } else if (weightedTemplates.length > 0) { selectedTemplateId = weightedTemplates[0].id; }
        }
        // console.log(`QuizGameModule: Spawneando ${catsToSpawn} gato(s) del tipo ${selectedTemplateId}.`);
        for (let i = 0; i < catsToSpawn; i++) {
            this.engineServices.catManager.addCat(selectedTemplateId);
        }

        this.proceedToNextStep(); 
    }

    private handleIncorrectAnswer(): void {
        this.lastAnswerResultType = 'incorrect';
        let gameOver = false;
        console.log("QuizGameModule: Respuesta INCORRECTA.");

        if (this.playerData.hasShield) { 
            this.playerData.hasShield = false;
            this.quizUIManager.updateFeedback('¡Escudo Roto!', 'shield');
            this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives, false, this.playerData.hintCharges);
            this.engineServices.audioManager.playSound('shield_break');
            this.lastAnswerResultType = 'shield';
            console.log("QuizGameModule: Escudo utilizado.");
        } else { 
            this.consecutiveCorrectAnswers = 0;
            this.playerData.lives--;
            console.log(`QuizGameModule: Vida perdida. Vidas restantes: ${this.playerData.lives}. Racha reseteada.`);
            this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives, false, this.playerData.hintCharges);
            this.engineServices.globalUI.updateScoreDisplay(this.playerData.score, 0); 

            this.engineServices.audioManager.playSound('incorrect');
            if (this.playerData.hintCharges > 0) { 
                this.playerData.hintCharges = 0;
                this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives, this.playerData.hasShield, 0);
                console.log("QuizGameModule: Pistas perdidas por respuesta incorrecta.");
            }
            if (this.playerData.lives <= 0) {
                gameOver = true;
                console.log("QuizGameModule: GAME OVER.");
            }
        }
        this.hintAppliedToQuestionId = null;

        if (gameOver) {
            this.isModuleActive = false;
            this.quizUIManager.updateFeedback('¡Has perdido!', 'incorrect');
            if (this.nextQuestionTimeoutId) { clearTimeout(this.nextQuestionTimeoutId); this.nextQuestionTimeoutId = null; }

             setTimeout(() => {
                 if (this.isModuleActive) return; // Doble chequeo por si algo cambió el estado
                 console.log("QuizGameModule: Llamando a gameManager.moduleFinished() por GAME OVER.");
                 const currentPlayerData = this.engineServices.gameManager.getPlayerData();
                 const isNewHighScore = currentPlayerData.score > (currentPlayerData as any).highScore;

                 this.engineServices.gameManager.moduleFinished({
                    gameOver: true,
                    score: currentPlayerData.score,
                    correct: this.questionsAnsweredCorrectly,
                    total: this.questionsAttemptedInModule,
                    isNewHighScore: isNewHighScore
                 });
             }, 1500);
        } else {
            this.proceedToNextStep();
        }
    }

    private proceedToNextStep(): void {
        console.log(`QuizGameModule: proceedToNextStep. isModuleActive: ${this.isModuleActive}, isWaitingForExplanationConfirm: ${this.isWaitingForExplanationConfirm}`);
        if (!this.isModuleActive || this.isWaitingForExplanationConfirm) return;

        const explanation = this.currentQuestion?.explanation;
        const scheduleNext = () => {
            this.lastAnswerResultType = null; // Limpiar para la siguiente pregunta/explicación
            const delay = explanation && this.isWaitingForExplanationConfirm ? 500 : 1500; // Menor delay si la explicación ya se mostró
            console.log(`QuizGameModule: Programando siguiente pregunta con delay de ${delay}ms.`);
            this.scheduleNextQuestion(delay);
        };

        if (explanation) {
            console.log(`QuizGameModule: Mostrando explicación: "${explanation}"`);
            this.isWaitingForExplanationConfirm = true;
            this.quizUIManager.showExplanation(explanation, () => {
                console.log("QuizGameModule: Confirmación de explicación recibida.");
                if (!this.isModuleActive) { 
                    console.log("QuizGameModule: Confirmación de explicación recibida pero módulo ya no está activo. No se programará siguiente pregunta.");
                    return; 
                }
                this.isWaitingForExplanationConfirm = false;
                scheduleNext();
            }, this.lastAnswerResultType);
        } else {
            console.log("QuizGameModule: No hay explicación, procediendo directamente a programar siguiente pregunta.");
            scheduleNext();
        }
    }

    private scheduleNextQuestion(delay: number): void {
        if (!this.isModuleActive) {
             console.log("QuizGameModule: scheduleNextQuestion abortado, módulo no activo.");
            return;
        }
        if (this.nextQuestionTimeoutId) { clearTimeout(this.nextQuestionTimeoutId); }
        console.log(`QuizGameModule: Siguiente pregunta se mostrará en ${delay}ms.`);
        this.nextQuestionTimeoutId = window.setTimeout(() => {
            this.nextQuestionTimeoutId = null;
            if (this.isModuleActive) { // Volver a chequear antes de llamar
                requestAnimationFrame(() => { // Usar rAF para asegurar que el navegador está listo para pintar
                    if (this.isModuleActive) {
                        console.log("QuizGameModule: Timeout completado, llamando a displayNextQuestion() vía rAF.");
                        this.displayNextQuestion();
                    } else {
                        console.log("QuizGameModule: Timeout completado, pero módulo ya no activo en rAF. No se llama a displayNextQuestion().");
                    }
                });
            } else {
                console.log("QuizGameModule: Timeout completado, pero módulo ya no activo. No se llama a displayNextQuestion().");
            }
        }, delay);
    }

    public handleEscapeKey(): boolean {
        if (this.isModuleActive && this.isWaitingForExplanationConfirm && this.quizUIManager.isExplanationVisible()) {
            console.log("QuizGameModule: Escape presionado, cerrando explicación.");
            this.quizUIManager.hideExplanation(); // Esto debería llamar al callback de confirmación eventualmente
            // El callback de confirmación llamará a proceedToNextStep
            return true; // Escape fue manejado
        }
        return false; // Escape no fue manejado por este módulo
    }

    public rebuildUI(): void {
        console.log("QuizGameModule: rebuildUI() llamado (ej. por cambio de tema).");
        if (this.isModuleActive && this.quizUIManager && this.currentQuestion) {
            this.quizUIManager.buildQuizInterface(
                this.currentQuestion,
                this.handleOptionClick.bind(this),
                this.consecutiveCorrectAnswers
            );
            // Re-aplicar estados visuales si es necesario
            const playerData = this.engineServices.playerData; // Usar la instancia correcta
            if (this.hintAppliedToQuestionId === this.currentQuestion.id && playerData.hintCharges > 0) {
                 console.log("QuizGameModule rebuildUI: Re-aplicando visuales de pista.");
                this.quizUIManager.applyHintVisuals(this.currentQuestion.correctAnswerKey);
            }
            if (this.isWaitingForExplanationConfirm && this.currentQuestion.explanation) {
                console.log("QuizGameModule rebuildUI: Re-mostrando explicación.");
                // El callback debe ser el original que llama a proceedToNextStep
                const originalConfirmCallback = () => {
                    if (!this.isModuleActive) return;
                    this.isWaitingForExplanationConfirm = false;
                    this.proceedToNextStep();
                };
                this.quizUIManager.showExplanation(
                    this.currentQuestion.explanation,
                    originalConfirmCallback,
                    this.lastAnswerResultType
                );
            }
        } else {
            console.warn("QuizGameModule rebuildUI: No se puede reconstruir UI, módulo no activo, UIManager no disponible o sin pregunta actual.");
        }
    }
}