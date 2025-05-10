// src/game/modules/quiz/ui/QuizUIManager.ts

import type { QuizGameModule } from '..'; // Sube un nivel a 'quiz/' (usa index.ts)
import type { EngineServices, Theme } from '../../../../types'; // Sube 4 niveles a 'src/', luego a 'types/' (usa index.ts)

// Para tipos de componentes UI, usando el barrel file:
import type {
    QuizUiContainer,
    QuizQuestionDisplay,
    QuizOptionButton,
    FeedbackArea,
    InkBar,
    ScoreDisplay,
    LivesDisplay,
    ExplanationOverlayComponent,
    ExplanationResultType // Asumiendo que ExplanationResultType se exporta desde explanation-overlay.ts y por ende desde components/ui/index.ts
} from '../../../components/ui'; // Sube 3 niveles ('quiz/', 'modules/', 'game/') a src/, luego a 'components/ui/' (usa index.ts)

// Importar los componentes Lit para asegurar que estén definidos antes de createElement
// Estas rutas son correctas y ya apuntan a la carpeta de componentes UI.
// No se pueden agrupar más ya que son importaciones por sus efectos secundarios (registro del componente).
import '../../../components/ui/quiz-question-display.ts';
import '../../../components/ui/quiz-option-button.ts';
import '../../../components/ui/feedback-area.ts';
import '../../../components/ui/ink-bar.ts';
import '../../../components/ui/score-display.ts';
import '../../../components/ui/lives-display.ts';
// Si ExplanationOverlayComponent también necesita ser registrado para ser creado con document.createElement,
// deberías añadir su importación aquí también, por ejemplo:
// import '../../../components/ui/explanation-overlay.ts';
// Sin embargo, en tu GameManager.ts, parece que 'explanation-overlay-component' ya está en el index.html,
// por lo que su definición se carga globalmente y no necesitaría una importación de registro aquí.

interface QuestionOption { key: string; text: string; }
interface Question { id: number | string; text: string; options: QuestionOption[]; correctAnswerKey: string; difficulty: string | number; explanation?: string; }

type QuizModuleUIElementsMap = {
    quizUiContainer: QuizUiContainer | null;
    scoreDisplay: ScoreDisplay | null; // AÑADIDO
    livesDisplay: LivesDisplay | null; // AÑADIDO
    inkLabel: HTMLElement | null;
    inkBarContainer: InkBar | null;
    questionBox: QuizQuestionDisplay | null;
    optionsContainer: HTMLElement | null;
    optionButtons: QuizOptionButton[];
    feedbackArea: FeedbackArea | null;
    explanationOverlayComponent: ExplanationOverlayComponent | null;
}

const BG_COLOR_START_STREAK = 1;
const BG_COLOR_MAX_STREAK = 5;

export class QuizUIManager {
    private module: QuizGameModule;
    private engineServices: EngineServices;
    private uiHostElement: QuizUiContainer;
    private currentUIElements: Partial<QuizModuleUIElementsMap> = {};
    private isFullyInitialized: boolean = false;

    private optionClickCallbackForModule: ((key: string) => void) | null = null;
    private explanationConfirmListener: (() => void) | null = null;
    private externalConfirmCallbackForModule: (() => void) | null = null;
    private lastShownResultTypeForModule: ExplanationResultType = null;


    constructor(quizModule: QuizGameModule, engineServices: EngineServices, uiHostElement: HTMLElement) {
        this.module = quizModule;
        this.engineServices = engineServices;
        this.uiHostElement = uiHostElement as QuizUiContainer;
        console.log("QuizUIManager: Constructor llamado. uiHostElement:", this.uiHostElement ? this.uiHostElement.tagName : 'null');
    }

    public async performFullInitialization(): Promise<void> {
        if (this.isFullyInitialized) {
            console.log("QuizUIManager: performFullInitialization llamado pero ya está inicializado.");
            return;
        }
        console.log("QuizUIManager: performFullInitialization() INICIADO.");
        if (!(this.uiHostElement instanceof HTMLElement && (this.uiHostElement as any).updateComplete !== undefined)) {
            console.error("QuizUIManager CRITICAL: uiHostElement no es un LitElement válido o falta updateComplete.");
            this.isFullyInitialized = false;
            return;
        }

        console.log("QuizUIManager: Esperando a uiHostElement.updateComplete...");
        try {
            await this.uiHostElement.updateComplete;
            console.log("QuizUIManager: uiHostElement.updateComplete RESUELTO.");
        } catch (error) {
            console.error("QuizUIManager: Error esperando uiHostElement.updateComplete:", error);
            this.isFullyInitialized = false;
            return;
        }
        
        this.initializeUIReferences();
        this.isFullyInitialized = true;
        console.log("QuizUIManager: performFullInitialization() FINALIZADO.");
    }


    private initializeUIReferences(): void {
        console.log("QuizUIManager: initializeUIReferences() INICIADO.");
        this.currentUIElements.quizUiContainer = this.uiHostElement;

        const shadowRoot = this.uiHostElement.shadowRoot;
        if (!shadowRoot) {
            console.error("QuizUIManager CRITICAL: uiHostElement.shadowRoot NO ENCONTRADO.");
            return;
        }
        console.log("QuizUIManager: ShadowRoot del uiHostElement ENCONTRADO.");

        // Para elementos que ESPERAMOS que estén en el Shadow DOM de quiz-ui-container
        this.currentUIElements.optionsContainer = shadowRoot.querySelector('[part="options-container"]') as HTMLElement | null;
        console.log("QuizUIManager: optionsContainer (buscando part='options-container' en shadowRoot) encontrado:", this.currentUIElements.optionsContainer);

        if (!this.currentUIElements.optionsContainer) {
             console.error("QuizUIManager CRITICAL: No se encontró el div con part='options-container' DENTRO DEL SHADOW DOM de quiz-ui-container.");
        }
        
        // Para los elementos que se asignarán a slots, los crearemos si no existen y los añadiremos al uiHostElement (Light DOM)
        // No es necesario buscarlos primero en el shadowRoot si se van a crear y asignar a slots.
        this.currentUIElements.explanationOverlayComponent = document.getElementById('explanation-overlay-component') as ExplanationOverlayComponent | null;
        console.log("QuizUIManager: ExplanationOverlayComponent global:", this.currentUIElements.explanationOverlayComponent ? 'ENCONTRADO' : 'NO ENCONTRADO');
        
        this.currentUIElements.optionButtons = [];
        console.log("QuizUIManager: initializeUIReferences() FINALIZADO (elementos de slot se crearán/asignarán en buildQuizInterface).");
    }

    public async buildQuizInterface(
        question: Question,
        onOptionClick: (key: string) => void,
        currentCombo: number
    ): Promise<void> {
        console.log("QuizUIManager: buildQuizInterface() INICIADO. Pregunta ID:", question?.id);
        
        if (!this.isFullyInitialized) {
            console.log("QuizUIManager: buildQuizInterface esperando a performFullInitialization...");
            await this.performFullInitialization();
            if (!this.isFullyInitialized) {
                 console.error("QuizUIManager CRITICAL: Falló performFullInitialization en buildQuizInterface.");
                 return;
            }
        }
        
        if (!question) { 
            console.error("QuizUIManager CRITICAL: buildQuizInterface llamado SIN PREGUNTA."); 
            this.clearQuizInterfaceContent(); 
            return; 
        }
        if (!this.uiHostElement) { // this.currentUIElements.quizUiContainer es this.uiHostElement
            console.error("QuizUIManager CRITICAL: uiHostElement (quizUiContainer) no está disponible.");
            return;
        }
        this.optionClickCallbackForModule = onOptionClick;
        const playerData = this.engineServices.playerData;

        // --- Score Display (slot="score-display") ---
        let scoreDisp = this.uiHostElement.querySelector('[slot="score-display"]') as ScoreDisplay | null;
        if (!scoreDisp) {
            console.log("QuizUIManager: Creando ScoreDisplay (porque no existe en el slot).");
            scoreDisp = document.createElement('score-display') as ScoreDisplay;
            scoreDisp.slot = "score-display";
            this.uiHostElement.appendChild(scoreDisp);
        }
        this.currentUIElements.scoreDisplay = scoreDisp;
        this.updateScoreInQuizUI(playerData.score, currentCombo); // Actualizar con datos iniciales

        // --- Lives Display (slot="lives-display") ---
        let livesDisp = this.uiHostElement.querySelector('[slot="lives-display"]') as LivesDisplay | null;
        if (!livesDisp) {
            console.log("QuizUIManager: Creando LivesDisplay (porque no existe en el slot).");
            livesDisp = document.createElement('lives-display') as LivesDisplay;
            livesDisp.slot = "lives-display";
            this.uiHostElement.appendChild(livesDisp);
        }
        this.currentUIElements.livesDisplay = livesDisp;
        this.updateLivesInQuizUI(playerData.lives, playerData.hasShield, playerData.hintCharges); // Actualizar

        // --- Ink Label (slot="ink-label") ---
        let inkLabel = this.uiHostElement.querySelector('[slot="ink-label"]') as HTMLElement | null;
        if (!inkLabel) {
            console.log("QuizUIManager: Creando inkLabel (porque no existe en el slot).");
            inkLabel = document.createElement('div');
            inkLabel.id = 'quiz-module-ink-label-dynamic'; // Darle un ID diferente si es necesario para estilos
            inkLabel.slot = "ink-label";
            this.uiHostElement.appendChild(inkLabel);
        }
        this.currentUIElements.inkLabel = inkLabel;
        this.currentUIElements.inkLabel.className = 'ink-label-base'; 
        this.currentUIElements.inkLabel.textContent = "Tinta";

        // --- Ink Bar (slot="ink-bar") ---
        let inkBar = this.uiHostElement.querySelector('[slot="ink-bar"]') as InkBar | null;
        if (!inkBar) {
            console.log("QuizUIManager: Creando inkBarContainer (porque no existe en el slot).");
            inkBar = document.createElement('ink-bar') as InkBar;
            inkBar.slot = "ink-bar";
            this.uiHostElement.appendChild(inkBar);
        }
        this.currentUIElements.inkBarContainer = inkBar;
        this.updateInkBar();
        this.updateInkVisibility(playerData.isDrawingUnlocked);

        // --- Question Display (slot="question-display") ---
        let questionBox = this.uiHostElement.querySelector('[slot="question-display"]') as QuizQuestionDisplay | null;
        if (!questionBox) {
            console.log("QuizUIManager: Creando questionBox (porque no existe en el slot).");
            questionBox = document.createElement('quiz-question-display') as QuizQuestionDisplay;
            questionBox.slot = "question-display";
            this.uiHostElement.appendChild(questionBox);
        }
        this.currentUIElements.questionBox = questionBox;
        console.log(`QuizUIManager: Asignando a questionBox - Dificultad: ${question.difficulty}, Texto: "${question.text.substring(0,30)}..."`);
        this.currentUIElements.questionBox.difficulty = question.difficulty;
        this.currentUIElements.questionBox.questionText = question.text;

        // --- Options Container y Botones ---
        const optionsHost = this.currentUIElements.optionsContainer; 
        if (!optionsHost) {
            console.error("QuizUIManager CRITICAL: El optionsContainer (div con part='options-container') NO FUE ENCONTRADO. No se pueden crear botones de opción.");
            return; 
        }
        console.log("QuizUIManager: Limpiando opciones anteriores de optionsHost:", optionsHost.tagName, optionsHost.className);
        optionsHost.innerHTML = ''; 
        this.currentUIElements.optionButtons = [];

        const shuffledOptions = [...question.options].sort(() => 0.5 - Math.random());
        // console.log("QuizUIManager: Opciones barajadas:", shuffledOptions.map(o => o.key));

        shuffledOptions.forEach(option => {
            if (!option?.key || typeof option.text === 'undefined') {
                console.warn("QuizUIManager: Opción inválida o sin datos, omitiendo:", option);
                return;
            }
            const button = document.createElement('quiz-option-button') as QuizOptionButton;
            button.optionKey = option.key;
            button.optionText = option.text;
            button.disabled = false;
            button.hinted = false;
            button.addEventListener('option-selected', (e) => {
                const event = e as CustomEvent;
                if (this.optionClickCallbackForModule && event.detail?.key) {
                    this.optionClickCallbackForModule(event.detail.key);
                }
            });
            optionsHost.appendChild(button); 
            this.currentUIElements.optionButtons!.push(button);
        });
        console.log(`QuizUIManager: ${this.currentUIElements.optionButtons?.length || 0} botones de opción creados y añadidos a optionsHost.`);

        // --- Feedback Area (slot="feedback-area") ---
        let feedbackArea = this.uiHostElement.querySelector('[slot="feedback-area"]') as FeedbackArea | null;
        if (!feedbackArea) {
            console.log("QuizUIManager: Creando feedbackArea (porque no existe en el slot).");
            feedbackArea = document.createElement('feedback-area') as FeedbackArea;
            feedbackArea.slot = "feedback-area";
            this.uiHostElement.appendChild(feedbackArea);
        }
        this.currentUIElements.feedbackArea = feedbackArea;
        this.updateFeedback('', null); 

        this.updateComboBodyBackground(currentCombo);
        const activeTheme = this.engineServices.themeManager.getActiveTheme();
        this.applyThemeStylesToQuizElements(activeTheme ? activeTheme.elements : null);

        console.log("QuizUIManager: buildQuizInterface() FINALIZADO.");
    }

    // NUEVOS MÉTODOS PARA ACTUALIZAR SCORE Y VIDAS EN LA UI DEL QUIZ
    public updateScoreInQuizUI(score: number, combo: number): void {
        if (this.currentUIElements.scoreDisplay) {
            this.currentUIElements.scoreDisplay.score = score;
            this.currentUIElements.scoreDisplay.combo = combo;
            // console.log(`QuizUIManager: ScoreDisplay actualizado. Score: ${score}, Combo: ${combo}`);
        } else {
            console.warn("QuizUIManager: Intento de actualizar score, pero scoreDisplay no está referenciado.");
        }
        // La lógica de actualizar el comboCounter GLOBAL y los efectos CSS globales sigue en GlobalUIManager.
        // GlobalUIManager.updateScoreDisplay se encarga de eso.
        this.engineServices.globalUI.updateScoreDisplay(score, combo);
    }

    public updateLivesInQuizUI(lives: number, hasShield: boolean, hintCharges: number): void {
        if (this.currentUIElements.livesDisplay) {
            this.currentUIElements.livesDisplay.lives = lives;
            this.currentUIElements.livesDisplay.hasShield = hasShield;
            this.currentUIElements.livesDisplay.hintCharges = hintCharges;
            // console.log(`QuizUIManager: LivesDisplay actualizado. Vidas: ${lives}, Escudo: ${hasShield}, Pistas: ${hintCharges}`);
        } else {
            console.warn("QuizUIManager: Intento de actualizar vidas, pero livesDisplay no está referenciado.");
        }
    }
    // --- FIN NUEVOS MÉTODOS ---

    private applyThemeStylesToQuizElements(themeElements: Partial<Theme['elements']> | null): void {
        const inkLabelElement = this.currentUIElements.inkLabel;
        if (inkLabelElement && themeElements?.inkLabel) {
            const def = themeElements.inkLabel;
            const baseClasses = ['ink-label-base']; 
            if (inkLabelElement.classList.contains('hidden')) { 
                baseClasses.push('hidden');
            }
            inkLabelElement.className = ''; 
            baseClasses.forEach(cls => inkLabelElement.classList.add(cls));

            if (def.themeClass) {
                def.themeClass.split(' ').filter(Boolean).forEach(cls => inkLabelElement.classList.add(cls));
            }
            if (def.text !== undefined) { 
                inkLabelElement.textContent = def.text;
            }
        }
    }

    public updateInkBar(): void {
        const inkBar = this.currentUIElements.inkBarContainer;
        if (inkBar && this.engineServices.playerData) { 
            inkBar.currentInk = this.engineServices.playerData.currentInk;
            inkBar.maxInkPerBar = this.engineServices.playerData.INK_BAR_CAPACITY;
        }
    }

    public updateInkVisibility(isUnlocked: boolean): void {
        this.currentUIElements.inkLabel?.classList.toggle('hidden', !isUnlocked);
        this.currentUIElements.inkBarContainer?.classList.toggle('hidden', !isUnlocked);
    }

    public updateFeedback(message: string, type: ExplanationResultType): void {
        const feedbackArea = this.currentUIElements.feedbackArea;
        if (feedbackArea) {
            feedbackArea.message = message;
            feedbackArea.type = type;
        }
        this.lastShownResultTypeForModule = type;
    }

    public disableOptions(): void {
        this.currentUIElements.optionButtons?.forEach(btn => { if (btn) { btn.disabled = true; } });
    }

    public applyHintVisuals(correctKey: string): void {
        let incorrectOptionsHinted = 0;
        const optionsToHint = 1; 
        const buttons = this.currentUIElements.optionButtons;
        if (!buttons || buttons.length <= 1) {
            return;
        }

        const shuffledButtons = [...buttons].sort(() => 0.5 - Math.random());
        shuffledButtons.forEach(btn => {
            if (incorrectOptionsHinted >= optionsToHint) return;
            if (btn && btn.optionKey !== correctKey && !btn.hinted) {
                btn.hinted = true;
                incorrectOptionsHinted++;
            }
        });
    }

    public showExplanation(
        explanation: string,
        onConfirm: () => void,
        resultType?: ExplanationResultType
    ): void {
        console.log(`QuizUIManager: showExplanation. Tipo resultado: ${resultType}, Explicación: "${explanation.substring(0,50)}..."`);
        const overlayComponent = this.currentUIElements.explanationOverlayComponent;
        if (overlayComponent) {
            this.externalConfirmCallbackForModule = onConfirm;
            const finalResultTypeForOverlay: ExplanationResultType = (resultType === 'info' || resultType === undefined) ? null : resultType;
            overlayComponent.explanationText = explanation;
            overlayComponent.resultType = finalResultTypeForOverlay;
            overlayComponent.isVisible = true; 
            this.addExplanationListener(overlayComponent);
            this.engineServices.globalUI.updateBackdropVisibility(); 
            this.engineServices.globalUI.setModuleUIsFaded(true); 
            console.log("QuizUIManager: Overlay de explicación configurado y visible.");
        } else {
            console.warn("QuizUIManager: ExplanationOverlayComponent no encontrado, confirmando directamente.");
            onConfirm(); 
        }
    }

    public hideExplanation(): void {
        console.log("QuizUIManager: hideExplanation llamado.");
        this.removeExplanationListener();
        const overlayComponent = this.currentUIElements.explanationOverlayComponent;
        if (overlayComponent) {
            overlayComponent.isVisible = false;
            console.log("QuizUIManager: Overlay de explicación ocultado.");
        }
        this.engineServices.globalUI.updateBackdropVisibility();
        this.engineServices.globalUI.setModuleUIsFaded(false); 
    }

    private addExplanationListener(overlayComponent: ExplanationOverlayComponent): void {
        this.removeExplanationListener(); 
        if (!overlayComponent || !this.externalConfirmCallbackForModule) return;

        console.log("QuizUIManager: Añadiendo listener 'confirm-clicked' al overlay de explicación.");
        this.explanationConfirmListener = () => {
            console.log("QuizUIManager: Evento 'confirm-clicked' del overlay de explicación CAPTURADO.");
            if (this.externalConfirmCallbackForModule) {
                try { this.externalConfirmCallbackForModule(); }
                catch (e) { console.error("QuizUIManager: Error en callback onConfirm de explicación:", e); }
            }
            this.hideExplanation(); 
        };
        overlayComponent.addEventListener('confirm-clicked', this.explanationConfirmListener);
    }

    private removeExplanationListener(): void {
        const overlayComponent = this.currentUIElements.explanationOverlayComponent;
        if (overlayComponent && this.explanationConfirmListener) {
            console.log("QuizUIManager: Removiendo listener 'confirm-clicked' del overlay de explicación.");
            overlayComponent.removeEventListener('confirm-clicked', this.explanationConfirmListener);
        }
        this.explanationConfirmListener = null;
    }

    public isExplanationVisible(): boolean {
        const visible = this.currentUIElements.explanationOverlayComponent?.isVisible ?? false;
        return visible;
    }

    public updateComboBodyBackground(combo: number): void {
        const root = document.documentElement;
        const computedRootStyle = getComputedStyle(root);
        const baseHue = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-hue-base').trim() || '220');
        const baseSaturation = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-saturation-base').trim() || '30');
        const saturationFactor = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-saturation-factor').trim() || '50');
        const baseLightness = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-lightness-base').trim() || '10');
        const lightnessFactor = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-lightness-factor').trim() || '15');
        const comboHueIncrement = parseFloat(computedRootStyle.getPropertyValue('--gq-combo-color-hue-increment').trim() || '10'); 

        const bgStreakRatio = Math.min(Math.max(0, combo - BG_COLOR_START_STREAK) / (BG_COLOR_MAX_STREAK - BG_COLOR_START_STREAK), 1);
        const bgIntensity = bgStreakRatio * bgStreakRatio; 

        const targetHue = (baseHue + (combo * comboHueIncrement)) % 360;
        const saturation = Math.min(100, baseSaturation + bgIntensity * saturationFactor);
        const lightness = Math.min(100, baseLightness + bgIntensity * lightnessFactor);
        document.body.style.backgroundColor = `hsl(${targetHue.toFixed(0)}, ${saturation.toFixed(0)}%, ${lightness.toFixed(0)}%)`;
    }

    private clearQuizInterfaceContent(): void {
        console.log("QuizUIManager: clearQuizInterfaceContent() llamado para limpiar UI del quiz.");
        const { scoreDisplay, livesDisplay, questionBox, optionsContainer, feedbackArea, inkLabel, inkBarContainer } = this.currentUIElements;
        
        // Limpiar o resetear los componentes creados dinámicamente si existen
        if (scoreDisplay) {
            // Si se van a remover del DOM, no es necesario resetearlos individualmente.
            // Si se reutilizan, sí:
            // scoreDisplay.score = 0; scoreDisplay.combo = 0;
            scoreDisplay.remove(); // Remover si se crean siempre nuevos
        }
        if (livesDisplay) {
            // livesDisplay.lives = 0; livesDisplay.hasShield = false; livesDisplay.hintCharges = 0;
            livesDisplay.remove();
        }
        if (questionBox) {
            // questionBox.questionText = ''; questionBox.difficulty = '1'; 
            questionBox.remove();
        }
        if (optionsContainer) { // Este es el div, no los botones
            optionsContainer.innerHTML = ''; 
        }
        this.currentUIElements.optionButtons = []; // Los botones dentro de optionsContainer se eliminan con innerHTML
        if (feedbackArea) {
            // feedbackArea.message = ''; feedbackArea.type = null;
            feedbackArea.remove();
        }
        if (inkLabel) {
            // inkLabel.textContent = '';
            inkLabel.remove();
        }
        if (inkBarContainer) {
            // inkBarContainer.currentInk = 0;
            inkBarContainer.remove();
        }
        // Resetear las referencias para que se creen de nuevo en la próxima buildQuizInterface
        this.currentUIElements.scoreDisplay = null;
        this.currentUIElements.livesDisplay = null;
        this.currentUIElements.questionBox = null;
        // optionsContainer se busca cada vez, no necesita resetearse aquí si es parte del shadowDOM
        this.currentUIElements.feedbackArea = null;
        this.currentUIElements.inkLabel = null;
        this.currentUIElements.inkBarContainer = null;
    }

    public destroy(): void {
        console.log("QuizUIManager: destroy() llamado.");
        this.clearQuizInterfaceContent(); 
        this.removeExplanationListener(); 
        this.optionClickCallbackForModule = null; 
        this.externalConfirmCallbackForModule = null;
        this.currentUIElements = {}; 
        this.isFullyInitialized = false; 
        console.log("QuizUIManager: Destruido.");
    }
}