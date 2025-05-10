// src/systems/QuizSystem.ts

// Definición de las interfaces (sin cambios)
interface QuestionOption {
    key: string;
    text: string;
  }

  interface Question {
    id: number | string;
    text: string;
    options: QuestionOption[];
    correctAnswerKey: string;
    difficulty: string | number;
    explanation?: string;
  }

  /**
  * QuizSystem: Gestiona la carga, selección y validación de preguntas del quiz.
  */
  export class QuizSystem {
    private allQuestions: Question[] = [];
    private availableQuestions: Question[] = [];
    private currentQuestion: Question | null = null;
    private isLoading: boolean = false;
    private lastError: string | null = null;

    constructor() {
        // console.log('QuizSystem Creado.');
    }

    // --- loadQuestionsData (sin cambios) ---
    public async loadQuestionsData(data: any[]): Promise<boolean> {
        if (this.isLoading) {
            console.warn('QuizSystem: Ya hay una carga en progreso.');
            return false;
        }
        this.isLoading = true;
        this.lastError = null;
        this.allQuestions = [];

        try {
            if (!Array.isArray(data)) {
                throw new Error('Los datos de preguntas proporcionados no son un array válido.');
            }

            this.allQuestions = data as Question[];
            this.resetAvailableQuestions();

            console.log(`QuizSystem: ${this.allQuestions.length} preguntas procesadas exitosamente desde datos pre-cargados.`);
            this.isLoading = false;
            return true;

        } catch (error) {
            console.error('QuizSystem: Error al procesar los datos de preguntas:', error);
            this.lastError = error instanceof Error ? error.message : String(error);
            this.isLoading = false;
            this.allQuestions = [];
            this.availableQuestions = [];
            return false;
        }
    }

    // --- selectNextQuestion (sin cambios) ---
    public selectNextQuestion(difficulty?: string): Question | null {
        if (this.allQuestions.length === 0 && !this.isLoading) {
            console.error('QuizSystem: No hay preguntas cargadas o procesadas.');
            return null;
        }
        if (this.isLoading) {
            console.warn('QuizSystem: Las preguntas aún se están procesando.');
            return null;
        }

        let potentialQuestions = this.availableQuestions;

        if (difficulty) {
            potentialQuestions = potentialQuestions.filter(q => String(q.difficulty) === String(difficulty));
        }

        if (potentialQuestions.length === 0) {
            console.warn(`QuizSystem: No quedan preguntas disponibles` + (difficulty ? ` con dificultad '${difficulty}'.` : '.') + " Reseteando lista...");
            this.resetAvailableQuestions();
            potentialQuestions = this.availableQuestions;
            if (difficulty) {
                potentialQuestions = potentialQuestions.filter(q => String(q.difficulty) === String(difficulty));
            }
            if (potentialQuestions.length === 0) {
                 console.error(`QuizSystem: No se encontraron preguntas con dificultad '${difficulty}' incluso después de resetear.`);
                 return null;
            }
        }

        const randomIndex = Math.floor(Math.random() * potentialQuestions.length);
        this.currentQuestion = potentialQuestions[randomIndex];
        this.availableQuestions = this.availableQuestions.filter(q => q.id !== this.currentQuestion?.id);
        return this.currentQuestion;
    }

    // --- validateAnswer (sin cambios) ---
    public validateAnswer(questionId: number | string, selectedKey: string | null): boolean | null {
        const questionToValidate = this.allQuestions.find(q => q.id === questionId);
        if (!questionToValidate) {
            console.error(`QuizSystem: No se encontró la pregunta con ID '${questionId}' para validar.`);
            return null;
        }
        if (selectedKey === null) { return false; }
        const isCorrect = questionToValidate.correctAnswerKey === selectedKey;
        return isCorrect;
    }

    // --- getCurrentQuestion (sin cambios) ---
    public getCurrentQuestion(): Question | null {
        return this.currentQuestion;
    }

    // --- resetAvailableQuestions (sin cambios) ---
    public resetAvailableQuestions(): void {
        this.availableQuestions = [...this.allQuestions];
        this.currentQuestion = null;
        // console.log(`QuizSystem: Lista de preguntas disponibles reseteada (${this.availableQuestions.length} preguntas).`);
    }

    // --- getLastError (sin cambios) ---
    public getLastError(): string | null {
        return this.lastError;
    }

    // --- isLoadingQuestions (sin cambios) ---
    public isLoadingQuestions(): boolean {
        return this.isLoading;
    }

    // >>> NUEVOS MÉTODOS <<<
    /**
     * Devuelve el número total de preguntas cargadas.
     * @returns {number} El número total de preguntas.
     */
    public getTotalQuestionsCount(): number {
        return this.allQuestions.length;
    }

    /**
     * Devuelve el número de preguntas que aún no se han seleccionado en el ciclo actual.
     * @returns {number} El número de preguntas disponibles.
     */
    public getAvailableQuestionsCount(): number {
        return this.availableQuestions.length;
    }
    // >>> FIN NUEVOS MÉTODOS <<<
  }