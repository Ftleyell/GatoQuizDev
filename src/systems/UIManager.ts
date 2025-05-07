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
    explanationOverlay: HTMLElement | null;
    explanationText: HTMLElement | null;
    explanationStatusText: HTMLElement | null;
    blurBackdrop: HTMLElement | null;
}

export class UIManager {
    private gameManager: GameManager;
    private currentUIElements: Partial<UIElementsMap> = {}; 
    private optionClickCallback: ((key: string) => void) | null = null; 
    // MODIFICACIÓN: Hacer el listener una propiedad de instancia para facilitar la limpieza
    private explanationConfirmHandler: ((event: MouseEvent | TouchEvent | KeyboardEvent) => void) | null = null;
    private explanationConfirmCallback: (() => void) | null = null; // Guardar el callback onConfirm
    private explanationListenerAdded: boolean = false;
    private lastShownResultType: 'correct' | 'incorrect' | 'shield' | 'info' | null = null;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
        console.log("UIManager Creado.");
    }

    // --- buildQuizInterface y otros métodos de actualización de UI permanecen igual ---
    // (Se omite el código idéntico para brevedad)
    public buildQuizInterface(question: Question, containerElement: HTMLElement, onOptionClick: (key: string) => void, currentCombo: number): void {
        if (!question) {
            console.error("UIManager: Intento de construir UI sin pregunta.");
            return;
        }
        this.clearQuizInterface(containerElement); 
        this.optionClickCallback = onOptionClick;

        const elementsMap: Partial<UIElementsMap> = { optionButtons: [] }; 
        const playerData = this.gameManager.getPlayerData();

        try {
            const quizUiContainerElement = document.createElement('quiz-ui-container') as QuizUiContainer;
            containerElement.appendChild(quizUiContainerElement); 
            elementsMap.quizUiContainer = quizUiContainerElement;

            const livesDisplayElement = document.createElement('lives-display') as LivesDisplay;
            livesDisplayElement.lives = this.gameManager.getLives();
            livesDisplayElement.hasShield = playerData.hasShield;
            livesDisplayElement.hintCharges = playerData.hintCharges;
            livesDisplayElement.slot = "lives-display"; 
            quizUiContainerElement.appendChild(livesDisplayElement);
            elementsMap.livesDisplay = livesDisplayElement;

            const scoreDisplayElement = document.createElement('score-display') as ScoreDisplay;
            scoreDisplayElement.score = playerData.score;
            scoreDisplayElement.combo = currentCombo;
            scoreDisplayElement.slot = "score-display";
            quizUiContainerElement.appendChild(scoreDisplayElement);
            elementsMap.scoreDisplay = scoreDisplayElement;

            const inkLabel = document.createElement('div');
            inkLabel.id = 'ink-label'; 
            inkLabel.className = 'ink-label-base hidden'; 
            inkLabel.textContent = "Tinta";
            inkLabel.slot = "ink-label";
            quizUiContainerElement.appendChild(inkLabel);
            elementsMap.inkLabel = inkLabel;

            const inkBarElement = document.createElement('ink-bar') as InkBar;
            inkBarElement.currentInk = playerData.currentInk;
            inkBarElement.maxInkPerBar = playerData.INK_BAR_CAPACITY;
            inkBarElement.classList.add('hidden'); 
            inkBarElement.slot = "ink-bar";
            quizUiContainerElement.appendChild(inkBarElement);
            elementsMap.inkBarContainer = inkBarElement;

            const questionDisplayElement = document.createElement('quiz-question-display') as QuizQuestionDisplay;
            questionDisplayElement.difficulty = question.difficulty;
            questionDisplayElement.questionText = question.text;
            questionDisplayElement.slot = "question-display";
            quizUiContainerElement.appendChild(questionDisplayElement);
            elementsMap.questionBox = questionDisplayElement;

            question.options.forEach(option => {
                if (!option?.key || typeof option.text === 'undefined') {
                    console.warn("Opción de pregunta inválida:", option);
                    return;
                }
                const button = document.createElement('quiz-option-button') as QuizOptionButton;
                button.optionKey = option.key;
                button.optionText = option.text;
                button.disabled = false;
                button.hinted = false;
                button.slot = "options"; 
                button.addEventListener('option-selected', (e) => {
                    const event = e as CustomEvent;
                    if (this.optionClickCallback && event.detail?.key) {
                        this.optionClickCallback(event.detail.key);
                    }
                });
                quizUiContainerElement.appendChild(button); 
                elementsMap.optionButtons!.push(button); 
            });

            const feedbackAreaElement = document.createElement('feedback-area') as FeedbackArea;
            feedbackAreaElement.slot = "feedback-area";
            quizUiContainerElement.appendChild(feedbackAreaElement);
            elementsMap.feedbackArea = feedbackAreaElement;

            // Obtener referencias a elementos globales (explicación, backdrop)
            elementsMap.explanationOverlay = document.getElementById('explanation-overlay');
            elementsMap.explanationText = document.getElementById('explanation-text-content');
            elementsMap.explanationStatusText = null; // Se crea dinámicamente si es necesario
            elementsMap.blurBackdrop = document.getElementById('blur-backdrop');

        } catch (error) {
           console.error("Error crítico construyendo la interfaz del quiz con quiz-ui-container:", error);
           containerElement.innerHTML = `<p style="color: red; text-align: center; padding: 1rem;">Error al construir la interfaz del quiz. Revisa la consola.</p>`;
           return;
        }

        this.currentUIElements = elementsMap as UIElementsMap; 

        // Actualizar displays iniciales
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

    private applyThemeStylesToNonLitElements(themeElements: Partial<Theme['elements']> | null): void {
        const inkLabelElement = this.currentUIElements.inkLabel;
        if (inkLabelElement && themeElements?.inkLabel) { // Asumiendo 'inkLabel' como key en Theme['elements']
            const inkLabelThemeDef = themeElements.inkLabel;
            // Limpiar clases de tema anteriores si es necesario (requiere patrón o lista)
            // inkLabelElement.className = 'ink-label-base'; // Reset
            if (inkLabelThemeDef.themeClass) {
                inkLabelThemeDef.themeClass.split(' ').filter(cls => cls).forEach(cls => {
                    if (!inkLabelElement.classList.contains(cls)) inkLabelElement.classList.add(cls);
                });
            }
            if (inkLabelThemeDef.initialDisplay !== undefined) {
                inkLabelElement.style.display = inkLabelThemeDef.initialDisplay;
            }
             if (inkLabelThemeDef.text !== undefined && inkLabelElement.textContent !== inkLabelThemeDef.text) {
                inkLabelElement.textContent = inkLabelThemeDef.text;
            }
        }
    }

    public clearQuizInterface(containerElement: HTMLElement): void {
        this.removeExplanationListener(); // Asegurar limpieza del listener de explicación
        this.clearExplanationStatus();    
        this.currentUIElements = {}; 
        this.optionClickCallback = null;
        // Limpiar solo el contenido específico del quiz si containerElement es #app
        // Si se usa un componente contenedor como <quiz-ui-container>, remover ese componente es suficiente.
        const quizContainer = containerElement.querySelector('quiz-ui-container');
        if (quizContainer) {
            containerElement.removeChild(quizContainer);
        } else {
            // Si no se usa el contenedor, limpiar el innerHTML como antes (menos ideal)
            // containerElement.innerHTML = '';
        }
    }

    public updateComboVisuals(combo: number): void {
         const root = document.documentElement;
         const comboCounterElement = document.querySelector('combo-counter') as ComboCounter | null;
         const scoreDisplayElement = this.currentUIElements?.scoreDisplay;

         if (!root) { return; }

         const flareIntensity = combo < FLARE_START_STREAK ? 0 : Math.min((combo - FLARE_START_STREAK + 1) / (FLARE_MAX_STREAK - FLARE_START_STREAK + 1), 1);
         root.style.setProperty('--flare-intensity', flareIntensity.toFixed(3));
         
         const glowIntensity = combo < ELEMENT_GLOW_START_STREAK ? 0 : Math.min((combo - ELEMENT_GLOW_START_STREAK + 1) / (ELEMENT_GLOW_MAX_STREAK - ELEMENT_GLOW_START_STREAK + 1), 1);
         root.style.setProperty('--element-glow-intensity', glowIntensity.toFixed(3));

         if (comboCounterElement) { comboCounterElement.combo = combo; }
         if (scoreDisplayElement) { scoreDisplayElement.combo = combo; } 
         
         const bgStreakRatio = Math.min(Math.max(0, combo - BG_COLOR_START_STREAK) / (BG_COLOR_MAX_STREAK - BG_COLOR_START_STREAK), 1);
         const bgIntensity = bgStreakRatio * bgStreakRatio;

         const computedRootStyle = getComputedStyle(root);
         const baseHue = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-hue-base').trim() || '220');
         const baseSaturation = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-saturation-base').trim() || '30');
         const saturationFactor = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-saturation-factor').trim() || '50');
         const baseLightness = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-lightness-base').trim() || '10');
         const lightnessFactor = parseFloat(computedRootStyle.getPropertyValue('--gq-body-bg-combo-lightness-factor').trim() || '15');
         const comboHueIncrement = parseFloat(computedRootStyle.getPropertyValue('--gq-combo-color-hue-increment').trim() || '10');

         const targetHue = (baseHue + (combo * comboHueIncrement)) % 360;
         const saturation = baseSaturation + bgIntensity * saturationFactor;
         const lightness = baseLightness + bgIntensity * lightnessFactor;
         
         document.body.style.backgroundColor = `hsl(${targetHue.toFixed(0)}, ${saturation.toFixed(0)}%, ${lightness.toFixed(0)}%)`;
    }

    public updateScoreDisplay(score: number): void {
        this.currentUIElements?.scoreDisplay?.setAttribute('score', score.toString());
    }

    public updateLivesDisplay(lives: number): void {
        this.currentUIElements?.livesDisplay?.setAttribute('lives', lives.toString());
    }

    public updateShieldIcon(isActive: boolean): void {
        this.currentUIElements?.livesDisplay?.toggleAttribute('hasShield', isActive);
    }

    public updateHintIcon(charges: number): void {
        this.currentUIElements?.livesDisplay?.setAttribute('hintCharges', charges.toString());
    }
    
    public updateInkBar(): void {
        const inkBar = this.currentUIElements?.inkBarContainer;
        if (inkBar) {
             inkBar.currentInk = this.gameManager.getPlayerData().currentInk;
        }
    }
    
    public updateInkVisibility(isUnlocked: boolean): void {
        this.currentUIElements?.inkLabel?.classList.toggle('hidden', !isUnlocked);
        this.currentUIElements?.inkBarContainer?.classList.toggle('hidden', !isUnlocked);
    }
    
    public updateDifficultyLabel(difficultyValue: string | number): void {
        this.currentUIElements?.questionBox?.setAttribute('difficulty', String(difficultyValue));
    }

    public updateFeedback(message: string, type: 'correct' | 'incorrect' | 'shield' | 'info' | null): void {
        const feedbackArea = this.currentUIElements?.feedbackArea;
        if (feedbackArea) {
            feedbackArea.message = message;
            feedbackArea.type = type;
        }
        this.lastShownResultType = type;
    }

    public disableOptions(): void {
        this.currentUIElements.optionButtons?.forEach(btn => {
            if (btn) { btn.disabled = true; }
        });
    }

    public enableOptions(): void {
        this.currentUIElements.optionButtons?.forEach(btn => {
            if (btn) {
                btn.disabled = btn.hinted; // Solo re-habilitar si NO está hinted
            }
        });
    }

    public applyHintVisuals(correctKey: string): void {
        let incorrectOptionsHinted = 0;
        const optionsToHint = 1; 
        const buttons = this.currentUIElements.optionButtons;

        if (!buttons || buttons.length <= 1) return;

        const shuffledButtons = [...buttons].sort(() => 0.5 - Math.random());

        shuffledButtons.forEach(btn => {
            if (incorrectOptionsHinted >= optionsToHint) return;
            if (btn && btn.optionKey !== correctKey && !btn.hinted) { 
                btn.hinted = true; 
                incorrectOptionsHinted++;
            }
        });
    }

    // --- Métodos para manejar el overlay de explicación (REVISADOS) ---
    public showExplanation(
        explanation: string,
        onConfirm: () => void, // El callback a ejecutar cuando se confirma
        resultType?: 'correct' | 'incorrect' | 'shield' | 'info' | null
    ): void {
        console.log("[UIManager] showExplanation() INICIADO.");
        const overlay = this.currentUIElements?.explanationOverlay; 
        const textElement = this.currentUIElements?.explanationText;
        const backdrop = this.currentUIElements?.blurBackdrop;
        const overlayContentWrapper = overlay?.querySelector('.overlay-content-wrapper') as HTMLElement | null;

        this.clearExplanationStatus(); // Limpiar estado anterior

        if (overlay && textElement && backdrop && overlayContentWrapper) {
            textElement.textContent = explanation;
            this.explanationConfirmCallback = onConfirm; // Guardar el callback

            // Crear y añadir el texto de estado (Correcto/Incorrecto/Escudo)
            if (resultType && resultType !== 'info') {
                const statusElement = document.createElement('p');
                statusElement.id = 'explanation-status-text'; 
                let statusText = '', statusClass = '', statusIcon = '';
                switch (resultType) {
                    case 'correct':   statusText = "¡Respuesta Correcta!"; statusClass = 'explanation-status-correct'; statusIcon = '✅'; break;
                    case 'incorrect': statusText = "Respuesta Incorrecta"; statusClass = 'explanation-status-incorrect'; statusIcon = '❌'; break;
                    case 'shield':    statusText = "¡Escudo Activado!";    statusClass = 'explanation-status-shield'; statusIcon = '🛡️'; break;
                }
                statusElement.innerHTML = `${statusIcon} ${statusText}`;
                statusElement.classList.add('explanation-status-base', statusClass); 
                overlayContentWrapper.insertBefore(statusElement, textElement); 
                this.currentUIElements.explanationStatusText = statusElement; 
            }

            // Mostrar backdrop y overlay
            backdrop.classList.remove('hidden'); // Quitar clase hidden si la tenía
            overlay.classList.remove('hidden');
            backdrop.style.display = 'block';
            overlay.style.display = 'flex'; 
            requestAnimationFrame(() => { 
                backdrop.classList.add('visible');
                overlay.classList.add('visible');
                console.log("[UIManager] Backdrop y Overlay de explicación visibles.");
                // Añadir listeners DESPUÉS de que sea visible
                this.addExplanationListener();
            });

        } else {
            console.warn("UIManager: Elementos del overlay de explicación no encontrados, confirmando directamente.");
            onConfirm(); // Ejecutar callback si no se puede mostrar
        }
    }
    
    // Función separada para añadir listeners
    private addExplanationListener(): void {
        if (this.explanationListenerAdded) {
             console.log("[UIManager] Listener de explicación ya añadido.");
             return; // Ya está añadido
        }
        const overlay = this.currentUIElements?.explanationOverlay;
        if (!overlay || !this.explanationConfirmCallback) return;

        console.log("[UIManager] Añadiendo listener de confirmación de explicación.");
        // Crear el handler aquí
        this.explanationConfirmHandler = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
            console.log(`[UIManager] Evento de confirmación recibido: ${event.type}`);
            if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Escape') {
                console.log(`[UIManager] Keydown ignorado: ${event.key}`);
                return; // Ignorar teclas no deseadas
            }
            
            event.stopPropagation(); // Detener propagación para no afectar otros listeners
            if (event.type !== 'keydown') event.preventDefault(); // Prevenir scroll/zoom en touch/click

            // Llamar al callback guardado y luego ocultar
            if (this.explanationConfirmCallback) {
                console.log("[UIManager] Llamando al callback onConfirm de la explicación.");
                try {
                    this.explanationConfirmCallback();
                } catch (e) {
                    console.error("[UIManager] Error en el callback onConfirm de la explicación:", e);
                }
                this.explanationConfirmCallback = null; // Limpiar callback después de usarlo
            }
            this.hideExplanation(); // Ocultar el overlay
        };
        
        // Usar { once: true } para que se limpien solos después de la primera ejecución
        overlay.addEventListener('click', this.explanationConfirmHandler, { capture: true, once: true });
        overlay.addEventListener('touchstart', this.explanationConfirmHandler, { passive: false, capture: true, once: true });
        window.addEventListener('keydown', this.explanationConfirmHandler, { capture: true, once: true });
        this.explanationListenerAdded = true;
    }

    public hideExplanation(): void {
        console.log("[UIManager] hideExplanation() INICIADO.");
        const overlay = this.currentUIElements?.explanationOverlay;
        const backdrop = this.currentUIElements?.blurBackdrop;
        
        this.removeExplanationListener(); // Limpiar listeners explícitamente
        this.clearExplanationStatus();    

        if (overlay && backdrop) {
            overlay.classList.remove('visible');
            
            const shopPopup = document.getElementById('shop-popup'); 
            if (!shopPopup || !shopPopup.hasAttribute('visible')) {
                backdrop.classList.remove('visible');
            } else {
                 console.log("[UIManager] Backdrop no ocultado porque la tienda está visible.");
            }

            const onTransitionEnd = (event?: TransitionEvent) => {
                if (event && (event.target !== overlay || event.propertyName !== 'opacity')) return;
                console.log("[UIManager] Transición de ocultar explicación finalizada.");
                if (overlay) {
                     overlay.style.display = 'none';
                     overlay.classList.add('hidden'); // Re-añadir clase hidden
                }
                if (!shopPopup || !shopPopup.hasAttribute('visible')) {
                    if (backdrop) {
                        backdrop.style.display = 'none';
                        backdrop.classList.add('hidden'); // Re-añadir clase hidden
                    }
                }
                if (overlay) overlay.removeEventListener('transitionend', onTransitionEnd);
            };
            
            // Verificar si hay una transición definida, si no, ocultar directamente
            const duration = parseFloat(getComputedStyle(overlay).transitionDuration) * 1000;
            if (duration > 0) {
                overlay.addEventListener('transitionend', onTransitionEnd, { once: true });
                 // Fallback por si transitionend no se dispara
                 setTimeout(() => {
                     if (overlay?.classList.contains('visible')) { /* Aún visible, no hacer nada */ }
                     else { onTransitionEnd(); } 
                 }, duration + 100); 
            } else {
                 console.log("[UIManager] Sin transición CSS para ocultar explicación, ocultando directamente.");
                 onTransitionEnd(); // Ocultar inmediatamente si no hay transición
            }
        }
         console.log("[UIManager] hideExplanation() FINALIZADO.");
    }
    
    // Método explícito para remover listeners
    private removeExplanationListener(): void {
        const overlay = this.currentUIElements?.explanationOverlay;
        if (this.explanationConfirmHandler) {
            console.log("[UIManager] Removiendo listener de confirmación de explicación.");
            if (overlay) {
                overlay.removeEventListener('click', this.explanationConfirmHandler, { capture: true });
                overlay.removeEventListener('touchstart', this.explanationConfirmHandler, { capture: true });
            }
            window.removeEventListener('keydown', this.explanationConfirmHandler, { capture: true });
            this.explanationConfirmHandler = null;
        }
        this.explanationListenerAdded = false; // Marcar como no añadido
    }
    
    private clearExplanationStatus(): void {
        const statusElement = this.currentUIElements?.explanationStatusText;
        if (statusElement && statusElement.parentNode) {
            statusElement.parentNode.removeChild(statusElement);
        }
        if (this.currentUIElements) { 
            this.currentUIElements.explanationStatusText = null;
        }
    }

     private toggleCatFoodUIVisibility(show: boolean): void {
        const catFoodUiContainer = this.gameManager.getControlElements().catFoodUiContainer;
        if (catFoodUiContainer) {
            catFoodUiContainer.classList.toggle('hidden', !show);
        }
    }
    
     public updateCatFoodBar(currentAmount: number, maxAmount: number): void {
        const catFoodButton = this.gameManager.getControlElements().catFoodToolButton;
        if (catFoodButton) { 
            const percentage = maxAmount > 0
                ? Math.max(0, Math.min(100, (currentAmount / maxAmount) * 100))
                : 0;
            catFoodButton.progressPercentage = percentage;
        } else {
            // console.warn("UIManager: No se encontró el <tool-button toolId='cat-food'> para actualizar la barra."); // Log menos verboso
        }
    }

     public rebuildInterface(): void {
        const currentState = this.gameManager.getCurrentState();
        if (currentState instanceof QuizGameplayState && currentState.currentQuestion) {
            const appContainer = this.gameManager.getContainerElement();
            if (appContainer) {
                const explanationOverlay = this.currentUIElements?.explanationOverlay;
                const isExplanationVisible = explanationOverlay?.classList.contains('visible') ?? false;

                // Reconstruir UI principal
                this.buildQuizInterface(
                    currentState.currentQuestion,
                    appContainer,
                    currentState.handleOptionClick.bind(currentState), 
                    currentState.consecutiveCorrectAnswers
                );

                // Re-aplicar pista visual
                const hintWasApplied = (currentState as any).hintAppliedToQuestionId === currentState.currentQuestion.id;
                if (hintWasApplied && this.gameManager.getPlayerData().hintCharges > 0) {
                    this.applyHintVisuals(currentState.currentQuestion.correctAnswerKey);
                }

                // Restaurar explicación si estaba visible
                if (isExplanationVisible && currentState.currentQuestion.explanation) {
                    console.log("[UIManager] Reconstruyendo interfaz: Restaurando explicación visible.");
                    this.showExplanation(
                        currentState.currentQuestion.explanation,
                        () => { 
                            if (this.gameManager.getStateMachine().getCurrentStateName() === 'QuizGameplay') {
                                 (this.gameManager.getCurrentState() as QuizGameplayState).proceedToNextStep();
                            }
                        },
                        this.lastShownResultType 
                    );
                }
            }
        }
    }
}

