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
import type { BlurBackdropComponent } from '../game/components/ui/blur-backdrop'; // Importar tipo

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
     * Construye la interfaz del quiz para la pregunta dada.
     * Incluye la lógica para mezclar el orden de los botones de opción.
     */
    public buildQuizInterface(question: Question, containerElement: HTMLElement, onOptionClick: (key: string) => void, currentCombo: number): void {
        if (!question) { console.error("UIManager: Intento de construir UI sin pregunta."); return; }
        this.clearQuizInterface(containerElement); // Limpiar interfaz anterior
        this.optionClickCallback = onOptionClick; // Guardar callback para clics en opciones
        const elementsMap: Partial<UIElementsMap> = { optionButtons: [] }; // Mapa para referencias a elementos
        const playerData = this.gameManager.getPlayerData();

        try {
            // Crear contenedor principal del UI del quiz
            const quizUiContainerElement = document.createElement('quiz-ui-container') as QuizUiContainer;
            containerElement.appendChild(quizUiContainerElement);
            elementsMap.quizUiContainer = quizUiContainerElement;

            // Crear y añadir elementos de UI (vidas, puntaje, tinta, pregunta)
            const livesDisplayElement = document.createElement('lives-display') as LivesDisplay;
            livesDisplayElement.lives = this.gameManager.getLives(); livesDisplayElement.hasShield = playerData.hasShield; livesDisplayElement.hintCharges = playerData.hintCharges; livesDisplayElement.slot = "lives-display";
            quizUiContainerElement.appendChild(livesDisplayElement); elementsMap.livesDisplay = livesDisplayElement;

            const scoreDisplayElement = document.createElement('score-display') as ScoreDisplay;
            scoreDisplayElement.score = playerData.score; scoreDisplayElement.combo = currentCombo; scoreDisplayElement.slot = "score-display";
            quizUiContainerElement.appendChild(scoreDisplayElement); elementsMap.scoreDisplay = scoreDisplayElement;

            const inkLabel = document.createElement('div');
            inkLabel.id = 'ink-label'; inkLabel.className = 'ink-label-base hidden'; inkLabel.textContent = "Tinta"; inkLabel.slot = "ink-label";
            quizUiContainerElement.appendChild(inkLabel); elementsMap.inkLabel = inkLabel;

            const inkBarElement = document.createElement('ink-bar') as InkBar;
            inkBarElement.currentInk = playerData.currentInk; inkBarElement.maxInkPerBar = playerData.INK_BAR_CAPACITY; inkBarElement.classList.add('hidden'); inkBarElement.slot = "ink-bar";
            quizUiContainerElement.appendChild(inkBarElement); elementsMap.inkBarContainer = inkBarElement;

            const questionDisplayElement = document.createElement('quiz-question-display') as QuizQuestionDisplay;
            questionDisplayElement.difficulty = question.difficulty; questionDisplayElement.questionText = question.text; questionDisplayElement.slot = "question-display";
            quizUiContainerElement.appendChild(questionDisplayElement); elementsMap.questionBox = questionDisplayElement;


            // --- INICIO: Lógica para mezclar opciones ---
            const shuffledOptions = [...question.options]; // Copiar array original
            // Aplicar Fisher-Yates shuffle a la copia
            for (let i = shuffledOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
            }
            console.log(`[UIManager] Opciones mezcladas para pregunta ${question.id}. Orden original:`, question.options.map(o=>o.key), `Orden mezclado:`, shuffledOptions.map(o=>o.key));
            // --- FIN: Lógica para mezclar opciones ---


            // --- BUCLE MODIFICADO: Crear botones desde el array mezclado ---
            shuffledOptions.forEach(option => {
                 if (!option?.key || typeof option.text === 'undefined') {
                     console.warn("Opción de pregunta inválida:", option);
                     return; // Saltar opción inválida
                 }
                const button = document.createElement('quiz-option-button') as QuizOptionButton;
                button.optionKey = option.key;
                button.optionText = option.text;
                button.disabled = false;
                button.hinted = false;
                button.slot = "options"; // Asignar al slot correcto en quiz-ui-container
                // Añadir listener para el evento personalizado 'option-selected' del botón
                button.addEventListener('option-selected', (e) => {
                    const event = e as CustomEvent;
                    if (this.optionClickCallback && event.detail?.key) {
                        this.optionClickCallback(event.detail.key); // Llamar al callback pasado desde QuizGameplayState
                    }
                });
                quizUiContainerElement.appendChild(button); // Añadir botón al contenedor
                elementsMap.optionButtons!.push(button); // Guardar referencia al botón
            });
            // --- FIN BUCLE MODIFICADO ---

            // Crear y añadir área de feedback
            const feedbackAreaElement = document.createElement('feedback-area') as FeedbackArea;
            feedbackAreaElement.slot = "feedback-area";
            quizUiContainerElement.appendChild(feedbackAreaElement); elementsMap.feedbackArea = feedbackAreaElement;

            // Obtener referencias a elementos globales (overlay, backdrop)
            elementsMap.explanationOverlayComponent = document.getElementById('explanation-overlay-component') as ExplanationOverlayComponent | null;
            elementsMap.blurBackdrop = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;

            // Logs para verificar referencias a elementos globales
            console.log(`[UIManager] buildQuizInterface: explanationOverlayComponent encontrado? ${!!elementsMap.explanationOverlayComponent}, blurBackdrop encontrado? ${!!elementsMap.blurBackdrop}`);
            if(elementsMap.explanationOverlayComponent) {
              console.log(`[UIManager] buildQuizInterface: Overlay Instance ID: ${elementsMap.explanationOverlayComponent.id}`);
            }
            if (!elementsMap.blurBackdrop) { console.warn("UIManager: Componente <blur-backdrop-component> no encontrado al construir UI."); }
            else if (!(elementsMap.blurBackdrop instanceof HTMLElement && 'visible' in elementsMap.blurBackdrop)) { console.error("UIManager: El elemento #blur-backdrop NO es una instancia válida de BlurBackdropComponent."); elementsMap.blurBackdrop = null; }

        } catch (error) {
            console.error("Error crítico construyendo la interfaz del quiz:", error);
            containerElement.innerHTML = `<p style="color: red; text-align: center; padding: 1rem;">Error al construir la interfaz. Revisa consola.</p>`;
            return; // Salir si hay error crítico
        }

        // Guardar referencias a los elementos creados
        this.currentUIElements = elementsMap as UIElementsMap; // Asegurar que el tipo es correcto

        // Actualizar el estado inicial de la UI con los datos actuales
        this.updateScoreDisplay(playerData.score);
        this.updateLivesDisplay(this.gameManager.getLives());
        this.updateShieldIcon(playerData.hasShield);
        this.updateHintIcon(playerData.hintCharges);
        this.updateInkBar();
        this.updateInkVisibility(playerData.isDrawingUnlocked);
        if (elementsMap.questionBox) this.updateDifficultyLabel(question.difficulty);
        this.updateComboVisuals(currentCombo);
        this.updateCatFoodBar(playerData.currentCatFood, playerData.getMaxCatFood());
        this.toggleCatFoodUIVisibility(playerData.isCatFoodUnlocked);
        this.updateFeedback('', null); // Limpiar feedback inicial
        // Aplicar estilos específicos del tema a elementos no-Lit si es necesario
        const activeTheme = this.gameManager.getThemeManager()?.getActiveTheme();
        this.applyThemeStylesToNonLitElements(activeTheme ? activeTheme.elements : null);
    }

    /**
     * Aplica clases o texto definidos en el tema a elementos HTML estándar (no-Lit).
     * @param themeElements - Objeto con definiciones de elementos del tema activo.
     */
    private applyThemeStylesToNonLitElements(themeElements: Partial<Theme['elements']> | null): void {
        const inkLabelElement = this.currentUIElements.inkLabel;
        // Aplicar estilos a la etiqueta de tinta si existe y está definida en el tema
        if (inkLabelElement && themeElements?.inkLabel) {
            const inkLabelThemeDef = themeElements.inkLabel;
            // Aplicar clases CSS del tema
            if (inkLabelThemeDef.themeClass) {
                 inkLabelElement.className = 'ink-label-base'; // Resetear a clase base
                 const baseHidden = inkLabelElement.classList.contains('hidden'); // Guardar estado hidden
                 // Añadir cada clase definida en el tema
                 inkLabelThemeDef.themeClass.split(' ').filter(cls => cls).forEach(cls => {
                     if (!inkLabelElement.classList.contains(cls)) inkLabelElement.classList.add(cls);
                 });
                 // Reaplicar hidden si estaba oculto
                 if(baseHidden) inkLabelElement.classList.add('hidden');
            }
            // Aplicar texto del tema si está definido
             if (inkLabelThemeDef.text !== undefined && inkLabelElement.textContent !== inkLabelThemeDef.text) {
                 inkLabelElement.textContent = inkLabelThemeDef.text;
             }
            // Asegurar visibilidad correcta basada en si el dibujo está desbloqueado
            this.updateInkVisibility(this.gameManager.getPlayerData().isDrawingUnlocked);
        }
        // Añadir lógica similar para otros elementos no-Lit si fuera necesario
    }

    /**
     * Limpia la interfaz del quiz del contenedor especificado.
     * @param containerElement - El elemento HTML que contiene la interfaz del quiz.
     */
    public clearQuizInterface(containerElement: HTMLElement): void {
        this.removeExplanationListener(); // Limpiar listener de confirmación de explicación
        this.currentUIElements = {}; // Resetear mapa de referencias
        this.optionClickCallback = null; // Limpiar callback de opciones
        // Buscar y remover el contenedor específico del UI del quiz
        const quizContainer = containerElement.querySelector('quiz-ui-container');
        if (quizContainer) {
            containerElement.removeChild(quizContainer);
        }
    }

    // --- Métodos de actualización de UI (sin cambios lógicos) ---
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
    public enableOptions(): void { this.currentUIElements.optionButtons?.forEach(btn => { if (btn) { btn.disabled = btn.hinted; } }); } // Habilitar solo si no está hinted
    public applyHintVisuals(correctKey: string): void { let incorrectOptionsHinted = 0; const optionsToHint = 1; const buttons = this.currentUIElements.optionButtons; if (!buttons || buttons.length <= 1) return; const shuffledButtons = [...buttons].sort(() => 0.5 - Math.random()); shuffledButtons.forEach(btn => { if (incorrectOptionsHinted >= optionsToHint) return; if (btn && btn.optionKey !== correctKey && !btn.hinted) { btn.hinted = true; incorrectOptionsHinted++; } }); }
    private toggleCatFoodUIVisibility(show: boolean): void { const catFoodUiContainer = this.gameManager.getControlElements().catFoodUiContainer; if (catFoodUiContainer) { catFoodUiContainer.classList.toggle('hidden', !show); } }
    public updateCatFoodBar(currentAmount: number, maxAmount: number): void { const catFoodButton = this.gameManager.getControlElements().catFoodToolButton; if (catFoodButton) { const percentage = maxAmount > 0 ? Math.max(0, Math.min(100, (currentAmount / maxAmount) * 100)) : 0; catFoodButton.progressPercentage = percentage; } }


    /**
     * Muestra el overlay de explicación.
     * @param explanation - El texto de la explicación a mostrar.
     * @param onConfirm - Callback a ejecutar cuando el usuario confirma (cierra) la explicación.
     * @param resultType - El tipo de resultado ('correct', 'incorrect', 'shield') para estilizar el overlay.
     */
    public showExplanation(
        explanation: string,
        onConfirm: () => void,
        resultType?: 'correct' | 'incorrect' | 'shield' | 'info' | null
    ): void {
        console.log("[UIManager] showExplanation llamada.");
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        const backdropComponent = this.currentUIElements?.blurBackdrop;

        if (overlayComponent) {
            this.externalConfirmCallback = onConfirm; // Guardar el callback externo
            // Mapear tipo de resultado para el componente
            const finalResultTypeForComponent: ExplanationResultType = (resultType === 'info' || resultType === undefined) ? null : resultType;

            // Asignar propiedades y hacer visible el overlay
            overlayComponent.explanationText = explanation;
            overlayComponent.resultType = finalResultTypeForComponent;
            overlayComponent.isVisible = true;

            console.log("[UIManager] Añadiendo listener 'confirm-clicked' a overlayComponent...");
            this.addExplanationListener(overlayComponent); // Añadir listener para confirmación

            // Mostrar el backdrop si existe
            if (backdropComponent) {
                backdropComponent.visible = true;
            } else {
                 console.warn("[UIManager] BackdropComponent no encontrado al intentar hacerlo visible.");
            }
            console.log("[UIManager] showExplanation: Propiedad isVisible del overlay establecida a true.");

        } else {
            console.warn("UIManager: Componente de explicación no encontrado, confirmando directamente.");
            onConfirm(); // Ejecutar callback directamente si no hay overlay
        }
    }

    /**
     * Oculta el overlay de explicación.
     */
    public hideExplanation(): void {
        console.log("[UIManager] --> hideExplanation() LLAMADA <--");
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        const backdropComponent = this.currentUIElements?.blurBackdrop;

        console.log("[UIManager] hideExplanation: Removiendo listener...");
        this.removeExplanationListener(); // Siempre intentar remover listener

        // Verificar si la tienda está abierta
        const shopIsVisible = this.gameManager.getShopManager()?.isShopOpen() ?? false;

        // Ocultar backdrop solo si la tienda NO está visible
        if (backdropComponent && !shopIsVisible) {
            console.log("[UIManager] hideExplanation: Estableciendo backdrop.visible = false");
            backdropComponent.visible = false;
        } else if (!backdropComponent) {
             console.warn("[UIManager] hideExplanation: backdropComponent no encontrado.");
        } else if (shopIsVisible) {
             console.log("[UIManager] hideExplanation: No ocultando backdrop porque la tienda está visible.");
        }

        // Ocultar overlay
        if (overlayComponent) {
            overlayComponent.isVisible = false;
        } else {
             console.warn("[UIManager] hideExplanation: overlayComponent no encontrado.");
        }
         console.log("[UIManager] hideExplanation FINALIZADA.");
    }

    /** Añade el listener para el evento de confirmación del overlay */
    private addExplanationListener(overlayComponent: ExplanationOverlayComponent): void {
        this.removeExplanationListener(); // Asegurar limpieza previa
        if (!overlayComponent || !this.externalConfirmCallback) {
            console.warn("[UIManager] No se pudo añadir listener: overlayComponent o externalConfirmCallback es null.");
            return;
        }
        // Crear el listener que llamará al callback externo y ocultará el overlay
        this.explanationConfirmListener = () => {
            console.log("[UIManager] >> LISTENER 'confirm-clicked' RECIBIDO <<");
            if (this.externalConfirmCallback) {
                try {
                    console.log("[UIManager] Llamando a externalConfirmCallback...");
                    this.externalConfirmCallback(); // Ejecutar acción de QuizGameplayState
                    console.log("[UIManager] externalConfirmCallback finalizado.");
                 }
                catch (e) { console.error("[UIManager] Error en callback onConfirm:", e); }
            } else {
                console.warn("[UIManager] 'confirm-clicked' recibido pero externalConfirmCallback es null.");
            }
            this.hideExplanation(); // Ocultar overlay DESPUÉS de ejecutar el callback
        };
        // Añadir el listener al componente (se dispara una sola vez si 'once' está en el componente)
        overlayComponent.addEventListener('confirm-clicked', this.explanationConfirmListener); // Asumiendo que el listener interno del overlay maneja el {once: true} o lógica similar
        console.log("[UIManager] Listener 'confirm-clicked' AÑADIDO a:", overlayComponent.id);
    }

    /** Remueve el listener del evento de confirmación del overlay */
    private removeExplanationListener(): void {
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        if (overlayComponent && this.explanationConfirmListener) {
            overlayComponent.removeEventListener('confirm-clicked', this.explanationConfirmListener);
            console.log("[UIManager] Listener 'confirm-clicked' REMOVIDO de:", overlayComponent.id);
        }
        this.explanationConfirmListener = null; // Limpiar referencia al listener
        // NO limpiar externalConfirmCallback aquí, podría necesitarse si la UI se reconstruye
    }

    /** Verifica si el overlay de explicación está visible */
    public isExplanationVisible(): boolean {
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        return overlayComponent?.isVisible ?? false;
    }

    /**
     * Reconstruye la interfaz del quiz (usado después de cambios de tema, etc.).
     * Asegura que el estado del overlay de explicación se restaure si estaba visible.
     */
    public rebuildInterface(): void {
        const currentState = this.gameManager.getCurrentState();
        if (currentState instanceof QuizGameplayState && currentState.currentQuestion) {
            const appContainer = this.gameManager.getContainerElement();
            if (appContainer) {
                // Guardar estado actual del overlay antes de limpiar
                const isExplanationCurrentlyVisible = this.isExplanationVisible();
                const originalConfirmCallback = this.externalConfirmCallback; // Guardar callback
                const savedResultType = this.lastShownResultType;

                // Construir la nueva interfaz
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
                }

                // Restaurar el overlay de explicación si estaba visible
                if (isExplanationCurrentlyVisible && currentState.currentQuestion.explanation) {
                    console.log("[UIManager] Reconstruyendo interfaz: Restaurando explicación visible.");
                    // Definir callback por defecto robusto
                    const confirmCallback = originalConfirmCallback ?? (() => {
                         console.warn("[UIManager] Callback por defecto ejecutado al reconstruir interfaz con expl visible.");
                         const currentFsmState = this.gameManager.getStateMachine().getCurrentState();
                         if (currentFsmState instanceof QuizGameplayState) {
                             currentFsmState.proceedToNextStep();
                         }
                     });
                    // Volver a mostrar la explicación con el texto y callback correctos
                    this.showExplanation(
                        currentState.currentQuestion.explanation,
                        confirmCallback,
                        savedResultType
                    );
                }
            }
        }
     }

} // Fin de la clase UIManager