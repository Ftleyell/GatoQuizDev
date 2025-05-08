// src/systems/UIManager.ts

import { GameManager } from '../game/GameManager';
import { Theme } from '../types/Theme';
import { QuizGameplayState } from '../game/states/QuizGameplayState';
import { LitElement } from 'lit';

// Importar componentes Lit y tipos
import '../game/components/ui/quiz-option-button.ts';
import type { QuizOptionButton } from '../game/components/ui/quiz-option-button';
import '../game/components/ui/score-display.ts';
import type { ScoreDisplay } from '../game/components/ui/score-display';
import '../game/components/ui/lives-display.ts';
import type { LivesDisplay } from '../game/components/ui/lives-display';
import '../game/components/ui/ink-bar.ts';
import type { InkBar } from '../game/components/ui/ink-bar';
import '../game/components/ui/quiz-question-display.ts';
import type { QuizQuestionDisplay } from '../game/components/ui/quiz-question-display';
import type { ComboCounter } from '../game/components/ui/combo-counter';
import '../game/components/ui/feedback-area.ts';
import type { FeedbackArea } from '../game/components/ui/feedback-area';
import type { ToolButton } from '../game/components/ui/tool-button';
import '../game/components/ui/quiz-ui-container.ts';
import type { QuizUiContainer } from '../game/components/ui/quiz-ui-container';
import '../game/components/ui/explanation-overlay.ts';
import type { ExplanationOverlayComponent, ExplanationResultType } from '../game/components/ui/explanation-overlay.ts';
import type { BlurBackdropComponent } from '../game/components/ui/blur-backdrop';

// Tipos locales
interface QuestionOption { key: string; text: string; }
interface Question { id: number | string; text: string; options: QuestionOption[]; correctAnswerKey: string; difficulty: string | number; explanation?: string; }

// Constantes para efectos visuales
const FLARE_START_STREAK = 1;
const FLARE_MAX_STREAK = 10;
const ELEMENT_GLOW_START_STREAK = 2;
const ELEMENT_GLOW_MAX_STREAK = 10;
const BG_COLOR_START_STREAK = 1;
const BG_COLOR_MAX_STREAK = 20;

// Tipo para mapear elementos UI internos
type UIElementsMap = {
    quizUiContainer: QuizUiContainer | null;
    livesDisplay: LivesDisplay | null;
    scoreDisplay: ScoreDisplay | null;
    inkLabel: HTMLElement | null;
    inkBarContainer: InkBar | null;
    questionBox: QuizQuestionDisplay | null;
    optionsContainer: HTMLElement | null; // Contenedor para los botones
    optionButtons: QuizOptionButton[];
    feedbackArea: FeedbackArea | null;
    explanationOverlayComponent: ExplanationOverlayComponent | null;
    blurBackdrop: BlurBackdropComponent | null;
}

export class UIManager {
    private gameManager: GameManager;
    private currentUIElements: Partial<UIElementsMap> = {};
    private optionClickCallback: ((key: string) => void) | null = null;
    private explanationConfirmListener: (() => void) | null = null;
    private externalConfirmCallback: (() => void) | null = null;
    private lastShownResultType: 'correct' | 'incorrect' | 'shield' | 'info' | null = null;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
        console.log("UIManager Creado.");
    }

    /**
     * Construye o actualiza la interfaz del quiz para la pregunta dada.
     */
    public buildQuizInterface(question: Question, containerElement: HTMLElement, onOptionClick: (key: string) => void, currentCombo: number): void {
        if (!question) { console.error("UIManager: Intento de construir UI sin pregunta."); return; }
        this.optionClickCallback = onOptionClick;
        const playerData = this.gameManager.getPlayerData();

        // 1. Crear/Obtener el Contenedor Principal y Elementos Persistentes
        let quizUiContainerElement = this.currentUIElements.quizUiContainer;
        if (!quizUiContainerElement || !containerElement.contains(quizUiContainerElement)) {
            console.log("[UIManager] Creando nuevo quiz-ui-container y elementos estructurales.");
            containerElement.innerHTML = ''; // Limpiar el contenedor #app solo si se recrea todo
            quizUiContainerElement = document.createElement('quiz-ui-container') as QuizUiContainer;
            containerElement.appendChild(quizUiContainerElement);
            this.currentUIElements = { quizUiContainer: quizUiContainerElement, optionButtons: [] }; // Resetear referencias

            // Crear y añadir elementos persistentes
            this.currentUIElements.livesDisplay = document.createElement('lives-display') as LivesDisplay;
            this.currentUIElements.livesDisplay.slot = "lives-display";
            quizUiContainerElement.appendChild(this.currentUIElements.livesDisplay);

            this.currentUIElements.scoreDisplay = document.createElement('score-display') as ScoreDisplay;
            this.currentUIElements.scoreDisplay.slot = "score-display";
            quizUiContainerElement.appendChild(this.currentUIElements.scoreDisplay);

            this.currentUIElements.inkLabel = document.createElement('div');
            this.currentUIElements.inkLabel.id = 'ink-label';
            this.currentUIElements.inkLabel.className = 'ink-label-base hidden';
            this.currentUIElements.inkLabel.textContent = "Tinta";
            this.currentUIElements.inkLabel.slot = "ink-label";
            quizUiContainerElement.appendChild(this.currentUIElements.inkLabel);

            this.currentUIElements.inkBarContainer = document.createElement('ink-bar') as InkBar;
            this.currentUIElements.inkBarContainer.classList.add('hidden');
            this.currentUIElements.inkBarContainer.slot = "ink-bar";
            quizUiContainerElement.appendChild(this.currentUIElements.inkBarContainer);

            this.currentUIElements.questionBox = document.createElement('quiz-question-display') as QuizQuestionDisplay;
            this.currentUIElements.questionBox.slot = "question-display";
            quizUiContainerElement.appendChild(this.currentUIElements.questionBox);

            // Crear el DIV contenedor para las opciones y aplicarle estilos flex
            this.currentUIElements.optionsContainer = document.createElement('div');
            this.currentUIElements.optionsContainer.slot = "options";
            // *** Aplicar estilos de layout al contenedor de opciones ***
            this.currentUIElements.optionsContainer.style.display = 'flex';
            this.currentUIElements.optionsContainer.style.flexDirection = 'column';
            // Usar la variable CSS para el gap, si existe, o un fallback
            const optionsGap = getComputedStyle(document.documentElement).getPropertyValue('--gq-options-gap').trim() || '0.75rem';
            this.currentUIElements.optionsContainer.style.gap = optionsGap;
            this.currentUIElements.optionsContainer.style.width = '100%'; // Asegurar ancho completo
            // *** Fin aplicación de estilos ***
            quizUiContainerElement.appendChild(this.currentUIElements.optionsContainer);


            this.currentUIElements.feedbackArea = document.createElement('feedback-area') as FeedbackArea;
            this.currentUIElements.feedbackArea.slot = "feedback-area";
            quizUiContainerElement.appendChild(this.currentUIElements.feedbackArea);

            // Obtener referencias globales una vez
            this.currentUIElements.explanationOverlayComponent = document.getElementById('explanation-overlay-component') as ExplanationOverlayComponent | null;
            this.currentUIElements.blurBackdrop = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;

        } else {
            console.log("[UIManager] Reutilizando quiz-ui-container existente.");
        }

        // 2. Actualizar Elementos Persistentes (Siempre)
        if (this.currentUIElements.livesDisplay) {
            this.currentUIElements.livesDisplay.lives = this.gameManager.getLives();
            this.currentUIElements.livesDisplay.hasShield = playerData.hasShield;
            this.currentUIElements.livesDisplay.hintCharges = playerData.hintCharges;
        }
        if (this.currentUIElements.scoreDisplay) {
            this.currentUIElements.scoreDisplay.score = playerData.score;
            this.currentUIElements.scoreDisplay.combo = currentCombo;
        }
        if (this.currentUIElements.inkBarContainer) {
            this.currentUIElements.inkBarContainer.currentInk = playerData.currentInk;
            this.currentUIElements.inkBarContainer.maxInkPerBar = playerData.INK_BAR_CAPACITY;
        }
        if (this.currentUIElements.inkLabel) {
            this.updateInkVisibility(playerData.isDrawingUnlocked);
        }

        // 3. Actualizar Elementos Específicos de la Pregunta
        if (this.currentUIElements.questionBox) {
            this.currentUIElements.questionBox.difficulty = question.difficulty;
            this.currentUIElements.questionBox.questionText = question.text;
        } else { console.error("UIManager: Referencia a questionBox no encontrada."); }

        // 4. Limpiar y Reconstruir Opciones
        if (this.currentUIElements.optionsContainer) {
            this.currentUIElements.optionsContainer.innerHTML = ''; // Limpiar opciones anteriores
            this.currentUIElements.optionButtons = []; // Resetear array

            // Mezclar y Crear nuevos botones
            const shuffledOptions = [...question.options];
            for (let i = shuffledOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
            }

            shuffledOptions.forEach(option => {
                if (!option?.key || typeof option.text === 'undefined') {
                    console.warn("Opción de pregunta inválida:", option); return;
                }
                const button = document.createElement('quiz-option-button') as QuizOptionButton;
                button.optionKey = option.key; button.optionText = option.text;
                button.disabled = false; button.hinted = false;
                button.addEventListener('option-selected', (e) => {
                    const event = e as CustomEvent;
                    if (this.optionClickCallback && event.detail?.key) {
                        this.optionClickCallback(event.detail.key);
                    }
                });
                // Añadir al contenedor de opciones (que ya tiene el slot y los estilos flex)
                this.currentUIElements.optionsContainer!.appendChild(button);
                this.currentUIElements.optionButtons!.push(button);
            });
        } else { console.error("UIManager: Contenedor de opciones no encontrado."); }

        // 5. Limpiar Feedback Area
        if (this.currentUIElements.feedbackArea) { this.updateFeedback('', null); }

        // 6. Actualizar Efectos Visuales Generales
        this.updateComboVisuals(currentCombo);
        this.updateCatFoodBar(playerData.currentCatFood, playerData.getMaxCatFood());
        this.toggleCatFoodUIVisibility(playerData.isCatFoodUnlocked);

        // 7. Aplicar Estilos de Tema
        const activeTheme = this.gameManager.getThemeManager()?.getActiveTheme();
        this.applyThemeStylesToNonLitElements(activeTheme ? activeTheme.elements : null);
    }


    /**
     * Aplica clases o texto definidos en el tema a elementos HTML estándar (no-Lit).
     */
    private applyThemeStylesToNonLitElements(themeElements: Partial<Theme['elements']> | null): void {
        const inkLabelElement = this.currentUIElements.inkLabel;
        if (inkLabelElement && themeElements?.inkLabel) {
            const inkLabelThemeDef = themeElements.inkLabel;
            if (inkLabelThemeDef.themeClass) {
                 inkLabelElement.className = 'ink-label-base'; // Resetear a clase base
                 const baseHidden = inkLabelElement.classList.contains('hidden'); // Guardar estado hidden
                 inkLabelThemeDef.themeClass.split(' ').filter(cls => cls).forEach(cls => {
                     if (!inkLabelElement.classList.contains(cls)) inkLabelElement.classList.add(cls);
                 });
                 if(baseHidden) inkLabelElement.classList.add('hidden');
            }
             if (inkLabelThemeDef.text !== undefined && inkLabelElement.textContent !== inkLabelThemeDef.text) {
                 inkLabelElement.textContent = inkLabelThemeDef.text;
             }
            this.updateInkVisibility(this.gameManager.getPlayerData().isDrawingUnlocked);
        }
    }

   /**
     * Limpia elementos específicos de la pregunta (opciones, feedback) y callbacks.
     * Mantiene los elementos persistentes y el contenedor principal.
     */
    public clearQuizInterface(containerElement: HTMLElement): void {
        console.log("[UIManager] clearQuizInterface llamado (limpieza parcial).");
        this.removeExplanationListener();
        this.optionClickCallback = null;

        if (this.currentUIElements.optionsContainer) {
            this.currentUIElements.optionsContainer.innerHTML = '';
            console.log("[UIManager] Contenedor de opciones limpiado.");
        } else { console.warn("[UIManager] optionsContainer no encontrado en clearQuizInterface."); }

        this.currentUIElements.optionButtons = [];

        if (this.currentUIElements.feedbackArea) {
            this.updateFeedback('', null);
             console.log("[UIManager] Área de feedback reseteada.");
        }

        // NO removemos el quizUiContainer
        // NO reseteamos todo currentUIElements, solo 'optionButtons' y 'feedbackArea'
    }

    // --- Métodos de actualización de UI (sin cambios) ---
    public updateComboVisuals(combo: number): void {
        const root = document.documentElement; const comboCounterElement = document.querySelector('combo-counter') as ComboCounter | null; const scoreDisplayElement = this.currentUIElements?.scoreDisplay; if (!root) { return; }
        const flareIntensity = combo < FLARE_START_STREAK ? 0 : Math.min((combo - FLARE_START_STREAK + 1) / (FLARE_MAX_STREAK - FLARE_START_STREAK + 1), 1); root.style.setProperty('--flare-intensity', flareIntensity.toFixed(3));
        const glowIntensity = combo < ELEMENT_GLOW_START_STREAK ? 0 : Math.min((combo - ELEMENT_GLOW_START_STREAK + 1) / (ELEMENT_GLOW_MAX_STREAK - ELEMENT_GLOW_START_STREAK + 1), 1); root.style.setProperty('--element-glow-intensity', glowIntensity.toFixed(3));
        if (comboCounterElement) { comboCounterElement.combo = combo; } if (scoreDisplayElement) { scoreDisplayElement.combo = combo; }
        const bgStreakRatio = Math.min(Math.max(0, combo - BG_COLOR_START_STREAK) / (BG_COLOR_MAX_STREAK - BG_COLOR_START_STREAK), 1); const bgIntensity = bgStreakRatio * bgStreakRatio;
        const computedRootStyle = getComputedStyle(root); const baseHue = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-hue-base').trim() || '220'); const baseSaturation = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-saturation-base').trim() || '30'); const saturationFactor = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-saturation-factor').trim() || '50'); const baseLightness = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-lightness-base').trim() || '10'); const lightnessFactor = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-lightness-factor').trim() || '15'); const comboHueIncrement = parseFloat(computedRootStyle.getPropertyValue('--gq-combo-color-hue-increment').trim() || '10');
        const targetHue = (baseHue + (combo * comboHueIncrement)) % 360; const saturation = baseSaturation + bgIntensity * saturationFactor; const lightness = baseLightness + bgIntensity * lightnessFactor; document.body.style.backgroundColor = `hsl(${targetHue.toFixed(0)}, ${saturation.toFixed(0)}%, ${lightness.toFixed(0)}%)`;
    }
    public updateScoreDisplay(score: number): void { this.currentUIElements?.scoreDisplay?.setAttribute('score', score.toString()); }
    public updateLivesDisplay(lives: number): void { this.currentUIElements?.livesDisplay?.setAttribute('lives', lives.toString()); }
    public updateShieldIcon(isActive: boolean): void { this.currentUIElements?.livesDisplay?.toggleAttribute('hasShield', isActive); }
    public updateHintIcon(charges: number): void { this.currentUIElements?.livesDisplay?.setAttribute('hintCharges', charges.toString()); }
    public updateInkBar(): void { const inkBar = this.currentUIElements?.inkBarContainer; if (inkBar) { inkBar.currentInk = this.gameManager.getPlayerData().currentInk; } }
    public updateInkVisibility(isUnlocked: boolean): void { this.currentUIElements?.inkLabel?.classList.toggle('hidden', !isUnlocked); this.currentUIElements?.inkBarContainer?.classList.toggle('hidden', !isUnlocked); }
    public updateDifficultyLabel(difficultyValue: string | number): void { this.currentUIElements?.questionBox?.setAttribute('difficulty', String(difficultyValue)); }
    public updateFeedback(message: string, type: 'correct' | 'incorrect' | 'shield' | 'info' | null): void { const feedbackArea = this.currentUIElements?.feedbackArea; if (feedbackArea) { feedbackArea.message = message; feedbackArea.type = type; } this.lastShownResultType = type; }
    public disableOptions(): void { this.currentUIElements.optionButtons?.forEach(btn => { if (btn) { btn.disabled = true; } }); }
    public enableOptions(): void { this.currentUIElements.optionButtons?.forEach(btn => { if (btn) { btn.disabled = btn.hinted; } }); }
    public applyHintVisuals(correctKey: string): void { let incorrectOptionsHinted = 0; const optionsToHint = 1; const buttons = this.currentUIElements.optionButtons; if (!buttons || buttons.length <= 1) return; const shuffledButtons = [...buttons].sort(() => 0.5 - Math.random()); shuffledButtons.forEach(btn => { if (incorrectOptionsHinted >= optionsToHint) return; if (btn && btn.optionKey !== correctKey && !btn.hinted) { btn.hinted = true; incorrectOptionsHinted++; } }); }
    private toggleCatFoodUIVisibility(show: boolean): void { const catFoodUiContainer = this.gameManager.getControlElements().catFoodUiContainer; if (catFoodUiContainer) { catFoodUiContainer.classList.toggle('hidden', !show); } }
    public updateCatFoodBar(currentAmount: number, maxAmount: number): void { const catFoodButton = this.gameManager.getControlElements().catFoodToolButton; if (catFoodButton) { const percentage = maxAmount > 0 ? Math.max(0, Math.min(100, (currentAmount / maxAmount) * 100)) : 0; catFoodButton.progressPercentage = percentage; } }

    // --- Gestión del Overlay de Explicación (sin cambios) ---
    public showExplanation( explanation: string, onConfirm: () => void, resultType?: 'correct' | 'incorrect' | 'shield' | 'info' | null ): void {
        console.log("[UIManager] showExplanation llamada.");
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        const backdropComponent = this.currentUIElements?.blurBackdrop;

        if (overlayComponent) {
            this.externalConfirmCallback = onConfirm;
            const finalResultTypeForComponent: ExplanationResultType = (resultType === 'info' || resultType === undefined) ? null : resultType;
            overlayComponent.explanationText = explanation;
            overlayComponent.resultType = finalResultTypeForComponent;
            overlayComponent.isVisible = true;
            console.log("[UIManager] Añadiendo listener 'confirm-clicked' a overlayComponent...");
            this.addExplanationListener(overlayComponent);
            if (backdropComponent) { backdropComponent.visible = true; }
            else { console.warn("[UIManager] BackdropComponent no encontrado al intentar hacerlo visible."); }
            console.log("[UIManager] showExplanation: Propiedad isVisible del overlay establecida a true.");
        } else {
            console.warn("UIManager: Componente de explicación no encontrado, confirmando directamente.");
            onConfirm();
        }
    }
    public hideExplanation(): void {
        console.log("[UIManager] --> hideExplanation() LLAMADA <--");
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        const backdropComponent = this.currentUIElements?.blurBackdrop;
        console.log("[UIManager] hideExplanation: Removiendo listener...");
        this.removeExplanationListener();
        const shopIsVisible = this.gameManager.getShopManager()?.isShopOpen() ?? false;
        if (backdropComponent && !shopIsVisible) {
            console.log("[UIManager] hideExplanation: Estableciendo backdrop.visible = false");
            backdropComponent.visible = false;
        } else if (!backdropComponent) { console.warn("[UIManager] hideExplanation: backdropComponent no encontrado."); }
        else if (shopIsVisible) { console.log("[UIManager] hideExplanation: No ocultando backdrop porque la tienda está visible."); }
        if (overlayComponent) { overlayComponent.isVisible = false; }
        else { console.warn("[UIManager] hideExplanation: overlayComponent no encontrado."); }
         console.log("[UIManager] hideExplanation FINALIZADA.");
    }
    private addExplanationListener(overlayComponent: ExplanationOverlayComponent): void {
        this.removeExplanationListener();
        if (!overlayComponent || !this.externalConfirmCallback) {
            console.warn("[UIManager] No se pudo añadir listener: overlayComponent o externalConfirmCallback es null."); return;
        }
        this.explanationConfirmListener = () => {
            console.log("[UIManager] >> LISTENER 'confirm-clicked' RECIBIDO <<");
            if (this.externalConfirmCallback) {
                try {
                    console.log("[UIManager] Llamando a externalConfirmCallback...");
                    this.externalConfirmCallback();
                    console.log("[UIManager] externalConfirmCallback finalizado.");
                 }
                catch (e) { console.error("[UIManager] Error en callback onConfirm:", e); }
            } else { console.warn("[UIManager] 'confirm-clicked' recibido pero externalConfirmCallback es null."); }
            this.hideExplanation();
        };
        overlayComponent.addEventListener('confirm-clicked', this.explanationConfirmListener);
        console.log("[UIManager] Listener 'confirm-clicked' AÑADIDO a:", overlayComponent.id);
    }
    private removeExplanationListener(): void {
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        if (overlayComponent && this.explanationConfirmListener) {
            overlayComponent.removeEventListener('confirm-clicked', this.explanationConfirmListener);
            console.log("[UIManager] Listener 'confirm-clicked' REMOVIDO de:", overlayComponent.id);
        }
        this.explanationConfirmListener = null;
    }
    public isExplanationVisible(): boolean {
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        return overlayComponent?.isVisible ?? false;
    }

    /**
     * Reconstruye la interfaz del quiz (usado después de cambios de tema, etc.).
     * Utiliza la lógica actualizada de buildQuizInterface que preserva elementos.
     */
     public rebuildInterface(): void {
        console.log("[UIManager] rebuildInterface llamado.");
        const currentState = this.gameManager.getCurrentState();
        if (currentState instanceof QuizGameplayState && currentState.currentQuestion) {
            const appContainer = this.gameManager.getContainerElement();
            if (appContainer) {
                const isExplanationCurrentlyVisible = this.isExplanationVisible();
                const originalConfirmCallback = this.externalConfirmCallback;
                const savedResultType = this.lastShownResultType;

                // Llamar a buildQuizInterface, que ahora reutilizará/actualizará elementos
                console.log("[UIManager] Reconstruyendo: Llamando a buildQuizInterface...");
                this.buildQuizInterface(
                    currentState.currentQuestion,
                    appContainer,
                    currentState.handleOptionClick.bind(currentState),
                    currentState.consecutiveCorrectAnswers
                );

                // Reaplicar estado de pista si es necesario
                const hintWasApplied = (currentState as any).hintAppliedToQuestionId === currentState.currentQuestion.id;
                if (hintWasApplied && this.gameManager.getPlayerData().hintCharges > 0) {
                    this.applyHintVisuals(currentState.currentQuestion.correctAnswerKey);
                     console.log("[UIManager] Reconstruyendo: Estado de pista reaplicado.");
                }

                // Restaurar el overlay si estaba visible
                if (isExplanationCurrentlyVisible && currentState.currentQuestion.explanation) {
                    console.log("[UIManager] Reconstruyendo: Restaurando explicación visible.");
                    const confirmCallback = originalConfirmCallback ?? (() => {
                         console.warn("[UIManager] Callback por defecto ejecutado al reconstruir interfaz con expl visible.");
                         const currentFsmState = this.gameManager.getStateMachine().getCurrentState();
                         if (currentFsmState instanceof QuizGameplayState) { currentFsmState.proceedToNextStep(); }
                     });
                    this.showExplanation(
                        currentState.currentQuestion.explanation, confirmCallback, savedResultType
                    );
                } else {
                     console.log("[UIManager] Reconstruyendo: No se necesita restaurar explicación.");
                }
                 console.log("[UIManager] rebuildInterface finalizado.");
            } else {
                console.error("[UIManager] rebuildInterface: appContainer no encontrado.");
            }
        } else {
             console.warn("[UIManager] rebuildInterface: No en QuizGameplayState o sin pregunta actual.");
        }
     }

} // Fin de la clase UIManager