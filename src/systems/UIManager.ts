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

    // --- buildQuizInterface ---
    public buildQuizInterface(question: Question, containerElement: HTMLElement, onOptionClick: (key: string) => void, currentCombo: number): void {
        if (!question) { console.error("UIManager: Intento de construir UI sin pregunta."); return; }
        this.clearQuizInterface(containerElement);
        this.optionClickCallback = onOptionClick;
        const elementsMap: Partial<UIElementsMap> = { optionButtons: [] };
        const playerData = this.gameManager.getPlayerData();
        try {
            const quizUiContainerElement = document.createElement('quiz-ui-container') as QuizUiContainer;
            containerElement.appendChild(quizUiContainerElement);
            elementsMap.quizUiContainer = quizUiContainerElement;

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

            question.options.forEach(option => {
                 if (!option?.key || typeof option.text === 'undefined') { console.warn("Opción de pregunta inválida:", option); return; }
                const button = document.createElement('quiz-option-button') as QuizOptionButton;
                button.optionKey = option.key; button.optionText = option.text; button.disabled = false; button.hinted = false; button.slot = "options";
                button.addEventListener('option-selected', (e) => { const event = e as CustomEvent; if (this.optionClickCallback && event.detail?.key) { this.optionClickCallback(event.detail.key); } });
                quizUiContainerElement.appendChild(button); elementsMap.optionButtons!.push(button);
            });

            const feedbackAreaElement = document.createElement('feedback-area') as FeedbackArea;
            feedbackAreaElement.slot = "feedback-area";
            quizUiContainerElement.appendChild(feedbackAreaElement); elementsMap.feedbackArea = feedbackAreaElement;

            // Guardar referencias y verificar
            elementsMap.explanationOverlayComponent = document.getElementById('explanation-overlay-component') as ExplanationOverlayComponent | null;
            elementsMap.blurBackdrop = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;

            console.log(`[UIManager] buildQuizInterface: explanationOverlayComponent encontrado? ${!!elementsMap.explanationOverlayComponent}, blurBackdrop encontrado? ${!!elementsMap.blurBackdrop}`);
            if(elementsMap.explanationOverlayComponent) {
              console.log(`[UIManager] buildQuizInterface: Overlay Instance ID: ${elementsMap.explanationOverlayComponent.id}`);
            }

            if (!elementsMap.blurBackdrop) { console.warn("UIManager: Componente <blur-backdrop-component> no encontrado al construir UI."); }
            else if (!(elementsMap.blurBackdrop instanceof HTMLElement && 'visible' in elementsMap.blurBackdrop)) { console.error("UIManager: El elemento #blur-backdrop NO es una instancia válida de BlurBackdropComponent."); elementsMap.blurBackdrop = null; }

        } catch (error) {
            console.error("Error crítico construyendo la interfaz del quiz:", error);
            containerElement.innerHTML = `<p style="color: red; text-align: center; padding: 1rem;">Error al construir la interfaz. Revisa consola.</p>`;
            return;
        }
        this.currentUIElements = elementsMap as UIElementsMap;

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
        this.updateFeedback('', null);
        const activeTheme = this.gameManager.getThemeManager()?.getActiveTheme();
        this.applyThemeStylesToNonLitElements(activeTheme ? activeTheme.elements : null);
    }

     // --- applyThemeStylesToNonLitElements ---
    private applyThemeStylesToNonLitElements(themeElements: Partial<Theme['elements']> | null): void {
        const inkLabelElement = this.currentUIElements.inkLabel;
        if (inkLabelElement && themeElements?.inkLabel) {
            const inkLabelThemeDef = themeElements.inkLabel;
            if (inkLabelThemeDef.themeClass) {
                 inkLabelElement.className = 'ink-label-base'; // Reset base class
                 const baseHidden = inkLabelElement.classList.contains('hidden');
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

    // --- clearQuizInterface ---
    public clearQuizInterface(containerElement: HTMLElement): void {
        this.removeExplanationListener();
        this.currentUIElements = {};
        this.optionClickCallback = null;
        const quizContainer = containerElement.querySelector('quiz-ui-container');
        if (quizContainer) { containerElement.removeChild(quizContainer); }
    }

    // --- Métodos de actualización (sin cambios en la lógica principal) ---
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


    // --- showExplanation ---
    public showExplanation(
        explanation: string,
        onConfirm: () => void,
        resultType?: 'correct' | 'incorrect' | 'shield' | 'info' | null
    ): void {
        console.log("[UIManager] showExplanation llamada.");
        const overlayId = this.currentUIElements?.explanationOverlayComponent?.id ?? 'NINGUNA';
        const backdropId = this.currentUIElements?.blurBackdrop?.id ?? 'NINGUNA';
        console.log(`[UIManager] Referencia actual a overlay: ${overlayId}`);
        console.log(`[UIManager] Referencia actual a backdrop: ${backdropId}`);

        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        const backdropComponent = this.currentUIElements?.blurBackdrop;

        if (overlayComponent) {
            this.externalConfirmCallback = onConfirm;
            const finalResultTypeForComponent: ExplanationResultType = (resultType === 'info' || resultType === undefined) ? null : resultType;

            console.log(`[UIManager] **ANTES** de setear isVisible: overlayComponent (${overlayId}).isVisible = ${overlayComponent.isVisible}`);
            overlayComponent.explanationText = explanation;
            overlayComponent.resultType = finalResultTypeForComponent;
            overlayComponent.isVisible = true;
            requestAnimationFrame(() => {
                 console.log(`[UIManager] **DESPUÉS** (rAF) de setear isVisible: overlayComponent (${overlayId}).isVisible = ${overlayComponent.isVisible}, Atributo [visible]? ${overlayComponent.hasAttribute('visible')}`);
            });

            console.log("[UIManager] Añadiendo listener 'confirm-clicked' a overlayComponent...");
            this.addExplanationListener(overlayComponent); // Asegurarse de que el listener se añade al elemento actual

            if (backdropComponent) {
                console.log(`[UIManager] Estableciendo backdropComponent (${backdropId}).visible = true`);
                backdropComponent.visible = true;
            } else {
                 console.warn("[UIManager] BackdropComponent no encontrado al intentar hacerlo visible.");
            }
            console.log("[UIManager] showExplanation: Propiedad isVisible del overlay establecida a true.");

        } else {
            console.warn("UIManager: Componente de explicación no encontrado, confirmando directamente.");
            onConfirm();
        }
    }

    // --- hideExplanation ---
    public hideExplanation(): void {
        console.log("[UIManager] --> hideExplanation() LLAMADA <--"); // <-- LOG AÑADIDO
        const overlayId = this.currentUIElements?.explanationOverlayComponent?.id ?? 'NINGUNA';
        console.log(`[UIManager] Referencia actual a overlay en hide: ${overlayId}`);

        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        const backdropComponent = this.currentUIElements?.blurBackdrop;

        console.log("[UIManager] hideExplanation: Removiendo listener...");
        this.removeExplanationListener(); // Siempre intentar remover listener

        const shopIsVisible = this.gameManager.getShopManager()?.isShopOpen() ?? false;
        console.log(`[UIManager] hideExplanation: Shop is visible? ${shopIsVisible}`);

        if (backdropComponent && !shopIsVisible) {
            console.log("[UIManager] hideExplanation: Estableciendo backdrop.visible = false");
            backdropComponent.visible = false;
        } else if (!backdropComponent) {
             console.warn("[UIManager] hideExplanation: backdropComponent no encontrado.");
        } else if (shopIsVisible) {
             console.log("[UIManager] hideExplanation: No ocultando backdrop porque la tienda está visible.");
        }

        if (overlayComponent) {
            console.log(`[UIManager] hideExplanation: **ANTES** de setear isVisible a false: overlayComponent (${overlayId}).isVisible = ${overlayComponent.isVisible}`);
            overlayComponent.isVisible = false;
            requestAnimationFrame(() => {
                 console.log(`[UIManager] hideExplanation: **DESPUÉS** (rAF) de setear isVisible a false: overlayComponent (${overlayId}).isVisible = ${overlayComponent.isVisible}, Atributo [visible]? ${overlayComponent.hasAttribute('visible')}`);
            });
        } else {
             console.warn("[UIManager] hideExplanation: overlayComponent no encontrado.");
        }
         console.log("[UIManager] hideExplanation FINALIZADA.");
    }

    // --- addExplanationListener / removeExplanationListener ---
    private addExplanationListener(overlayComponent: ExplanationOverlayComponent): void {
        this.removeExplanationListener(); // Siempre remover antes de añadir
        if (!overlayComponent || !this.externalConfirmCallback) {
            console.warn("[UIManager] No se pudo añadir listener: overlayComponent o externalConfirmCallback es null.");
            return;
        }
        this.explanationConfirmListener = () => {
            console.log("[UIManager] >> LISTENER 'confirm-clicked' RECIBIDO <<"); // <-- LOG AÑADIDO
            if (this.externalConfirmCallback) {
                try {
                    console.log("[UIManager] Llamando a externalConfirmCallback...");
                    this.externalConfirmCallback(); // Llamar al callback de QuizGameplayState
                    console.log("[UIManager] externalConfirmCallback finalizado.");
                 }
                catch (e) { console.error("[UIManager] Error en callback onConfirm:", e); }
            } else {
                console.warn("[UIManager] 'confirm-clicked' recibido pero externalConfirmCallback es null.");
            }
            this.hideExplanation(); // Ocultar el overlay DESPUÉS de ejecutar el callback
        };
        overlayComponent.addEventListener('confirm-clicked', this.explanationConfirmListener, { once: true });
        console.log("[UIManager] Listener 'confirm-clicked' AÑADIDO a:", overlayComponent.id);
    }

    private removeExplanationListener(): void {
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        if (overlayComponent && this.explanationConfirmListener) {
            overlayComponent.removeEventListener('confirm-clicked', this.explanationConfirmListener);
            console.log("[UIManager] Listener 'confirm-clicked' REMOVIDO de:", overlayComponent.id); // Mantén este log si quieres
        }
        // Limpiar SÓLO la referencia al listener, NO al callback externo
        this.explanationConfirmListener = null;
        // Elimina o comenta esta línea:
        // this.externalConfirmCallback = null; // <-- ¡¡¡ELIMINAR ESTA LÍNEA!!!
    }

    // --- isExplanationVisible ---
    public isExplanationVisible(): boolean {
        const overlayComponent = this.currentUIElements?.explanationOverlayComponent;
        return overlayComponent?.isVisible ?? false;
    }

    // --- rebuildInterface ---
    public rebuildInterface(): void {
        const currentState = this.gameManager.getCurrentState();
        if (currentState instanceof QuizGameplayState && currentState.currentQuestion) {
            const appContainer = this.gameManager.getContainerElement();
            if (appContainer) {
                const isExplanationCurrentlyVisible = this.isExplanationVisible();
                const originalConfirmCallback = this.externalConfirmCallback; // Guardar el callback *antes* de limpiar
                const savedResultType = this.lastShownResultType;

                // Construir la nueva interfaz (esto limpia listeners del overlay antiguo si clearQuizInterface los quita)
                this.buildQuizInterface(
                    currentState.currentQuestion,
                    appContainer,
                    currentState.handleOptionClick.bind(currentState),
                    currentState.consecutiveCorrectAnswers
                );

                // Reaplicar estado de pista si era necesario
                const hintWasApplied = (currentState as any).hintAppliedToQuestionId === currentState.currentQuestion.id;
                if (hintWasApplied && this.gameManager.getPlayerData().hintCharges > 0) {
                    this.applyHintVisuals(currentState.currentQuestion.correctAnswerKey);
                }

                // Si la explicación estaba visible, volver a mostrarla con el callback guardado
                if (isExplanationCurrentlyVisible && currentState.currentQuestion.explanation) {
                    console.log("[UIManager] Reconstruyendo interfaz: Restaurando explicación visible.");
                    // Definir el callback por defecto aquí por si originalConfirmCallback es null
                    const confirmCallback = originalConfirmCallback ?? (() => {
                         console.warn("[UIManager] Callback por defecto ejecutado al reconstruir interfaz con explicación visible.");
                         if (this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') {
                             (this.gameManager.getCurrentState() as QuizGameplayState).proceedToNextStep();
                         }
                     });
                    this.showExplanation(
                        currentState.currentQuestion.explanation,
                        confirmCallback, // Usar el callback guardado (o el default)
                        savedResultType
                    );
                }
            }
        }
     }
} // Fin de la clase UIManager