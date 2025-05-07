// src/systems/QuizSystem.ts

// Definición de las interfaces (pueden ir en un archivo separado de tipos, ej: types/quiz.d.ts)
interface QuestionOption {
    key: string;
    text: string;
  }
  
  interface Question {
    id: number | string;
    text: string;
    options: QuestionOption[];
    correctAnswerKey: string;
    difficulty: string | number; // Aceptar string o número
    explanation?: string; // Opcional
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
        // console.log('QuizSystem Creado.'); // Menos verboso
    }
  
    // --- Método NUEVO para procesar datos ya cargados ---
    public async loadQuestionsData(data: any[]): Promise<boolean> {
        if (this.isLoading) {
            console.warn('QuizSystem: Ya hay una carga en progreso.');
            return false;
        }
        // console.log(`QuizSystem: Procesando datos de preguntas pre-cargados...`); // Menos verboso
        this.isLoading = true;
        this.lastError = null;
        this.allQuestions = []; // Limpiar preguntas anteriores
  
        try {
            // Validación básica
            if (!Array.isArray(data)) {
                throw new Error('Los datos de preguntas proporcionados no son un array válido.');
            }
            // TODO: Validación más profunda de cada objeto de pregunta
  
            // Asignar los datos cargados
            this.allQuestions = data as Question[]; // Usar type assertion
            this.resetAvailableQuestions(); // Inicializar lista de disponibles
  
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
  
    /**
     * Selecciona la siguiente pregunta disponible, opcionalmente filtrando por dificultad.
     * Si no quedan preguntas, resetea la lista y selecciona una.
     * @param difficulty - (Opcional) La dificultad deseada.
     * @returns La pregunta seleccionada (Question) o null si no hay preguntas cargadas en absoluto.
     */
    public selectNextQuestion(difficulty?: string): Question | null {
        if (this.allQuestions.length === 0 && !this.isLoading) {
            console.error('QuizSystem: No hay preguntas cargadas o procesadas. Llama a loadQuestionsData() después de cargar los datos.');
            return null;
        }
        if (this.isLoading) {
            console.warn('QuizSystem: Las preguntas aún se están procesando.');
            return null;
        }
  
        let potentialQuestions = this.availableQuestions;
  
        // Filtrar por dificultad si se especifica
        if (difficulty) {
            potentialQuestions = potentialQuestions.filter(q => String(q.difficulty) === String(difficulty)); // Comparar como strings por si acaso
        }
  
        // *** INICIO MODIFICACIÓN: Lógica de ciclo ***
        // Si no quedan preguntas (en general o de la dificultad pedida)
        if (potentialQuestions.length === 0) {
            console.warn(`QuizSystem: No quedan preguntas disponibles` + (difficulty ? ` con dificultad '${difficulty}'.` : '.') + " Reseteando lista...");
            this.resetAvailableQuestions(); // Rellenar la lista de disponibles
  
            // Volver a intentar filtrar si se pidió una dificultad específica
            potentialQuestions = this.availableQuestions;
            if (difficulty) {
                potentialQuestions = potentialQuestions.filter(q => String(q.difficulty) === String(difficulty));
            }
  
            // Si AÚN no hay preguntas después de resetear (ej: se pidió dificultad inexistente), devolver null
            if (potentialQuestions.length === 0) {
                 console.error(`QuizSystem: No se encontraron preguntas con dificultad '${difficulty}' incluso después de resetear.`);
                 // Podríamos seleccionar una pregunta aleatoria de cualquier dificultad como fallback
                 // potentialQuestions = this.availableQuestions;
                 // if (potentialQuestions.length === 0) return null; // Si no hay NINGUNA pregunta
                 return null; // Por ahora, devolvemos null si la dificultad no existe post-reset
            }
        }
        // *** FIN MODIFICACIÓN ***
  
        // Seleccionar una pregunta aleatoria de las disponibles (filtradas o reseteadas)
        const randomIndex = Math.floor(Math.random() * potentialQuestions.length);
        this.currentQuestion = potentialQuestions[randomIndex];
  
        // Remover la pregunta seleccionada de la lista de disponibles (para evitar repetición inmediata)
        this.availableQuestions = this.availableQuestions.filter(q => q.id !== this.currentQuestion?.id);
  
        // console.log(`QuizSystem: Pregunta seleccionada (ID: ${this.currentQuestion?.id}, Dificultad: ${this.currentQuestion?.difficulty}). Quedan ${this.availableQuestions.length} disponibles.`); // Menos verboso
        return this.currentQuestion;
    }
  
    /**
     * Valida si la clave de respuesta seleccionada es correcta para una pregunta específica.
     * @param questionId - El ID de la pregunta.
     * @param selectedKey - La clave de la opción seleccionada.
     * @returns boolean - true si es correcta, false si es incorrecta. Null si la pregunta no se encuentra.
     */
    public validateAnswer(questionId: number | string, selectedKey: string | null): boolean | null {
        // Buscar en la lista completa de preguntas, no solo en las disponibles
        const questionToValidate = this.allQuestions.find(q => q.id === questionId);
  
        if (!questionToValidate) {
            console.error(`QuizSystem: No se encontró la pregunta con ID '${questionId}' para validar.`);
            return null;
        }
  
        if (selectedKey === null) {
            // console.log(`QuizSystem: Respuesta nula recibida para pregunta ID '${questionId}'. Considerada incorrecta.`); // Menos verboso
            return false;
        }
  
        const isCorrect = questionToValidate.correctAnswerKey === selectedKey;
        // console.log(`QuizSystem: Validando ID ${questionId}. Seleccionado: '${selectedKey}', Correcto: '${questionToValidate.correctAnswerKey}'. Resultado: ${isCorrect}`); // Log menos verboso
        return isCorrect;
    }
  
    /**
     * Obtiene la pregunta actualmente seleccionada.
     * @returns La pregunta actual o null.
     */
    public getCurrentQuestion(): Question | null {
        return this.currentQuestion;
    }
  
    /**
     * Resetea la lista de preguntas disponibles, copiando desde la lista completa.
     */
    public resetAvailableQuestions(): void {
        this.availableQuestions = [...this.allQuestions]; // Crear una nueva copia
        this.currentQuestion = null; // Asegurarse de limpiar la pregunta actual también
        console.log(`QuizSystem: Lista de preguntas disponibles reseteada (${this.availableQuestions.length} preguntas).`);
    }
  
    /**
     * Obtiene el último error ocurrido durante la carga/procesamiento.
     * @returns El mensaje de error o null.
     */
    public getLastError(): string | null {
        return this.lastError;
    }
  
    /**
     * Verifica si el sistema está actualmente procesando preguntas.
     * @returns true si está procesando, false en caso contrario.
     */
    public isLoadingQuestions(): boolean {
        return this.isLoading;
    }
  }
  