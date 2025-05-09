// src/game/GameManager.ts

// --- Importaciones de Sistemas y Tipos ---
import { PhysicsManager } from '../systems/PhysicsManager';
import { QuizSystem } from '../systems/QuizSystem';
import { StateMachine, IState } from './StateMachine';
import { AudioManager } from '../systems/AudioManager';
import { CatManager } from '../systems/CatManager';
import { ShopManager } from '../systems/ShopManager';
import { PlayerData } from './PlayerData';
import { CatTemplate } from '../types/CatTemplate';
import { ShopItemJsonData } from '../types/ShopItemData';
import { InkManager } from '../systems/InkManager';
import { UIManager } from '../systems/UIManager';
import { ThemeManager } from '../systems/ThemeManager';
import { Theme } from '../types/Theme';
import { CatFoodManager } from '../systems/CatFoodManager';

// --- Importaciones de Estados ---
import { LoadingState } from './states/LoadingState';
import { MainMenuState } from './states/MainMenuState';
import { QuizGameplayState } from './states/QuizGameplayState';
import { ResultsState } from './states/ResultsState';
import { GameOverState } from './states/GameOverState';

// --- Importaciones de Componentes UI y sus Tipos ---
import './components/ui/tool-button.ts';
import './components/ui/combo-counter.ts';
import './components/ui/cat-display-area.ts';
import './components/ui/drawing-canvas-layer.ts';
import './components/ui/shop-button.ts';
import './components/ui/shop-popup.ts';
import './components/ui/main-menu-screen.ts';
import './components/ui/quiz-ui-container.ts';
import './components/ui/diagonal-wipe.ts';
import './components/ui/blur-backdrop.ts';
import './components/ui/options-button-component.ts';
import './components/ui/options-menu-popup.ts';

import type { ToolButton } from './components/ui/tool-button';
import type { CatDisplayArea } from './components/ui/cat-display-area';
import type { QuizUiContainer } from './components/ui/quiz-ui-container';
import type { DrawingCanvasLayer } from './components/ui/drawing-canvas-layer';
import type { ShopButtonComponent } from './components/ui/shop-button';
import type { ShopPopup } from './components/ui/shop-popup';
import type { MainMenuScreen } from './components/ui/main-menu-screen';
import type { DiagonalWipe } from './components/ui/diagonal-wipe';
import type { BlurBackdropComponent } from './components/ui/blur-backdrop';
import type { OptionsButtonComponent } from './components/ui/options-button-component';
import type { OptionsMenuPopup } from './components/ui/options-menu-popup';


/**
 * Define la estructura para las referencias a los elementos de control de herramientas.
 */
type ControlElements = {
    controlsContainer: HTMLElement | null;
    drawingButtonsContainer: HTMLElement | null;
    catFoodUiContainer: HTMLElement | null;
    brushToolButton: ToolButton | null;
    clearInkToolButton: ToolButton | null;
    catFoodToolButton: ToolButton | null;
};

export class GameManager {
    // --- Referencias a Sistemas ---
    private physicsManager!: PhysicsManager;
    private quizSystem!: QuizSystem;
    private stateMachine!: StateMachine;
    private audioManager!: AudioManager;
    private catManager!: CatManager;
    private playerData!: PlayerData;
    private shopManager!: ShopManager;
    private inkManager!: InkManager;
    private uiManager!: UIManager;
    private themeManager!: ThemeManager;
    private catFoodManager!: CatFoodManager;

    // --- Referencias a Elementos UI Clave ---
    private catDisplayAreaElement!: CatDisplayArea;
    private drawingCanvasLayerElement: DrawingCanvasLayer | null = null;
    private containerElement: HTMLElement;
    private gameUiContainer: QuizUiContainer | null = null;
    private diagonalWipeElement: DiagonalWipe | null = null;
    private blurBackdrop: BlurBackdropComponent | null = null;

    // --- Referencias a componentes de Opciones ---
    private optionsButtonInstance: OptionsButtonComponent | null = null;
    private optionsPopupInstance: OptionsMenuPopup | null = null;

    // --- Estado del Juego ---
    private lastTimestamp: number = 0;
    private isRunning: boolean = false;
    private gameLoopRequestId?: number;

    // --- Listeners y Referencias a Controles ---
    private keydownListener: ((event: KeyboardEvent) => void) | null = null;
    private controlElements: ControlElements;
    private themeChangeListener: EventListener | null = null;
    private shopButtonInstance: ShopButtonComponent | null = null;
    private shopButtonInteractionListener: (() => void) | null = null;
    private shopCloseRequestListener: (() => void) | null = null;
    private optionsButtonClickListener: (() => void) | null = null;
    private optionsPopupCloseListener: (() => void) | null = null;

    private loadingMessages: string[] = ["Desenredando la diversión..."];
    private _lastToolToggleTime: number = 0;
    private readonly TOOL_TOGGLE_DEBOUNCE_MS = 300;

    constructor(container: HTMLElement) {
        this.containerElement = container;

        this.audioManager = new AudioManager();
        this.quizSystem = new QuizSystem();
        this.playerData = new PlayerData();
        this.themeManager = new ThemeManager('body');
        this.catManager = new CatManager(this.audioManager, this);
        this.uiManager = new UIManager(this);
        this.shopManager = new ShopManager(this.playerData, this);
        this.inkManager = new InkManager(this);
        this.catFoodManager = new CatFoodManager(this);
        this.physicsManager = new PhysicsManager(this.catManager, this.catFoodManager, this);

        this.stateMachine = new StateMachine();
        this.stateMachine.setAnimationContainer(this.containerElement);

        this.diagonalWipeElement = document.getElementById('diagonal-wipe-transition-element') as DiagonalWipe | null;
        if (!this.diagonalWipeElement || !(this.diagonalWipeElement instanceof HTMLElement && 'playIn' in this.diagonalWipeElement)) {
            console.error("GameManager CRITICAL: Componente <diagonal-wipe id='diagonal-wipe-transition-element'> no encontrado o inválido.");
            this.diagonalWipeElement = null;
        }
        this.stateMachine.setWipeComponent(this.diagonalWipeElement);

        const catDisplayArea = document.getElementById('cat-display-area-main') as CatDisplayArea | null;
        if (!catDisplayArea || !(catDisplayArea instanceof HTMLElement && 'clearAllEntityElements' in catDisplayArea)) {
            console.error("GameManager CRITICAL: <cat-display-area id='cat-display-area-main'> no encontrado o inválido.");
            throw new Error("<cat-display-area> no encontrado y es esencial.");
        }
        this.catDisplayAreaElement = catDisplayArea;

        this.drawingCanvasLayerElement = document.getElementById('drawing-canvas-layer-main') as DrawingCanvasLayer | null;
        if (this.drawingCanvasLayerElement && !(this.drawingCanvasLayerElement instanceof HTMLElement && 'resizeCanvas' in this.drawingCanvasLayerElement)) {
            console.warn("GameManager: drawingCanvasLayerElement no parece ser una instancia válida de DrawingCanvasLayer.");
        }

        this.catManager.setCatDisplayArea(this.catDisplayAreaElement);
        this.catFoodManager.setCatDisplayArea(this.catDisplayAreaElement);
        this.catManager.setPhysicsManager(this.physicsManager);
        this.inkManager.setPhysicsManager(this.physicsManager);

        this.controlElements = {
            controlsContainer: document.getElementById('right-controls'),
            drawingButtonsContainer: document.getElementById('drawing-buttons-container'),
            catFoodUiContainer: document.getElementById('cat-food-ui-container'),
            brushToolButton: document.querySelector<ToolButton>('tool-button[toolId="brush"]'),
            clearInkToolButton: document.querySelector<ToolButton>('tool-button[toolId="clear-ink"]'),
            catFoodToolButton: document.querySelector<ToolButton>('tool-button[toolId="cat-food"]'),
        };
        if (!this.controlElements.controlsContainer ||
            !this.controlElements.drawingButtonsContainer ||
            !this.controlElements.catFoodUiContainer ||
            !this.controlElements.brushToolButton ||
            !this.controlElements.clearInkToolButton ||
            !this.controlElements.catFoodToolButton) {
            console.warn("GameManager: Uno o más elementos de control UI no fueron encontrados en el DOM.");
        }
        this.setupStates();
    }

    public setBodyStateClass(stateName: string | null): void {
        const body = document.body;
        body.className.split(' ').forEach(cls => {
            if (cls.startsWith('state-')) {
                body.classList.remove(cls);
            }
        });
        if (stateName) {
            body.classList.add(`state-${stateName.toLowerCase()}`);
        }
    }

    public async init(): Promise<void> {
        this.playerData.reset();
        this.physicsManager.init(this.catDisplayAreaElement);
        this.catFoodManager.init();

        this.blurBackdrop = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;
        if (!this.blurBackdrop) {
            console.warn("GameManager (init): Componente <blur-backdrop-component> no encontrado.");
        }

        this.optionsButtonInstance = document.getElementById('settings-options-button-global') as OptionsButtonComponent | null;
        this.optionsPopupInstance = document.getElementById('options-menu-popup-global') as OptionsMenuPopup | null;

        if (!this.optionsButtonInstance || !this.optionsPopupInstance) {
            console.error("GameManager (init): No se encontraron los componentes de opciones (botón o popup). La funcionalidad de opciones no estará disponible.");
        } else {
            this.optionsPopupInstance.audioManagerInstance = this.audioManager;
            this.optionsPopupInstance.themeManagerInstance = this.themeManager;
            (this.optionsPopupInstance as any).gameManagerInstance = this;
            console.log("GameManager (init): Instancias de AudioManager y ThemeManager pasadas a OptionsMenuPopup.");
        }

        this.shopButtonInstance = document.getElementById('shop-button-global') as ShopButtonComponent | null;
        if (!this.shopButtonInstance) {
            console.info("GameManager (init): Botón de tienda global no encontrado inicialmente. Se creará si es necesario.");
        }

        this.hideToolControls();
        this.hideShopButton();
        this.hideOptionsButton();
        this.addThemeChangeListener();
        await this.preload();
        this.setupToolButtonListeners();
        this.addKeyboardListener();
        this.setupGlobalUICListeners();
    }

    public create(): void {
        console.log("GameManager: create() - Iniciando reseteo...");
        this.quizSystem.resetAvailableQuestions();
        this.catManager.removeAllCats();

        if (this.shopManager) {
             this.shopManager.closeShop();
             console.log("GameManager: create() - ShopManager.closeShop() llamado.");
        } else {
             console.warn("GameManager: create() - ShopManager no disponible para cerrar tienda.");
        }
        if (this.optionsPopupInstance?.isVisible) {
            this.closeOptionsMenu();
        }

        this.hideToolControls();
        this.hideShopButton();
        this.hideOptionsButton();

        if (!document.querySelector('combo-counter')) {
             document.body.appendChild(document.createElement('combo-counter'));
        }

        this.stateMachine.changeState('MainMenu', undefined, 'gq-wipe-transition');
        console.log("GameManager: create() - Reseteo completado, transicionando a MainMenu.");
    }

    private setupStates(): void {
        const loadingState = new LoadingState(this);
        const mainMenuState = new MainMenuState(this);
        const quizGameplayState = new QuizGameplayState(this);
        const resultsState = new ResultsState(this);
        const gameOverState = new GameOverState(this);

        const wrapEnter = (state: IState, showShopBtn: boolean, showToolCtrl: boolean, showOptionsBtn: boolean) => {
            const originalEnter = state.enter.bind(state);
            return (params?: any) => {
                try { originalEnter(params); }
                catch (e) { console.error(`Error en enter() para ${state.constructor.name}:`, e); }

                if (state instanceof QuizGameplayState) {
                    this.gameUiContainer = this.containerElement.querySelector('quiz-ui-container');
                } else if (state instanceof MainMenuState) {
                    const mainMenuElement = this.containerElement.querySelector('main-menu-screen') as MainMenuScreen | null;
                    if (mainMenuElement) {
                        mainMenuElement.loadingMessages = this.getLoadingMessages();
                    }
                }

                if (showShopBtn) this.showShopButton();
                else this.hideShopButton();

                // <<< INICIO CAMBIO VISIBILIDAD BOTÓN OPCIONES >>>
                if (showOptionsBtn) this.showOptionsButton();
                else this.hideOptionsButton();
                // <<< FIN CAMBIO VISIBILIDAD BOTÓN OPCIONES >>>

                if (showToolCtrl) {
                    this.showToolControls();
                    if (state instanceof QuizGameplayState) {
                        this.updateCatFoodUI();
                    }
                } else {
                    this.hideToolControls();
                }
                this.updateGlobalButtonsState(); // Esta función también debe ser ajustada
            };
        };

        const wrapExit = (state: IState) => {
            const originalExit = state.exit.bind(state);
            return () => {
                try { originalExit(); }
                catch (e) { console.error(`Error en exit() para ${state.constructor.name}:`, e); }
                if (state instanceof QuizGameplayState) {
                    this.gameUiContainer = null;
                }
            };
        };

        // <<< INICIO CAMBIO VISIBILIDAD BOTÓN OPCIONES (en parámetros de wrapEnter) >>>
        loadingState.enter = wrapEnter(loadingState, false, false, false);
        loadingState.exit = wrapExit(loadingState);
        mainMenuState.enter = wrapEnter(mainMenuState, false, false, false); // Opciones NO visible
        mainMenuState.exit = wrapExit(mainMenuState);
        quizGameplayState.enter = wrapEnter(quizGameplayState, true, true, true); // Opciones SÍ visible
        quizGameplayState.exit = wrapExit(quizGameplayState);
        resultsState.enter = wrapEnter(resultsState, false, false, false); // Opciones NO visible
        resultsState.exit = wrapExit(resultsState);
        gameOverState.enter = wrapEnter(gameOverState, false, false, false); // Opciones NO visible
        // <<< FIN CAMBIO VISIBILIDAD BOTÓN OPCIONES >>>

        this.stateMachine.addState('Loading', loadingState);
        this.stateMachine.addState('MainMenu', mainMenuState);
        this.stateMachine.addState('QuizGameplay', quizGameplayState);
        this.stateMachine.addState('Results', resultsState);
        this.stateMachine.addState('GameOver', gameOverState);

        this.stateMachine.addState('__shutdown__', {
            enter: () => { this.hideToolControls(); this.hideShopButton(); this.hideOptionsButton(); },
            exit: () => {},
            update: () => {}
        });
    }

    public async preload(): Promise<void> {
        const baseUrl = import.meta.env.BASE_URL;
        const cleanBaseUrl = baseUrl === '/' ? '' : (baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl);
        const urls = {
            questions: `${cleanBaseUrl}/data/questions.json`,
            templates: `${cleanBaseUrl}/data/cat_templates.json`,
            shopItems: `${cleanBaseUrl}/data/shop_items.json`,
            themes: `${cleanBaseUrl}/data/themes.json`,
            loadingMessages: `${cleanBaseUrl}/data/loading_messages.json`
        };
        try {
            const responses = await Promise.all(Object.values(urls).map(url => fetch(url)));
            responses.forEach((res, i) => {
                if (!res.ok) throw new Error(`HTTP ${res.status} cargando ${Object.values(urls)[i]}`);
            });
            const [questionData, templateData, shopItemJsonData, themeData, loadingMessagesData] = await Promise.all(responses.map(res => res.json()));
            if (!Array.isArray(questionData) || !Array.isArray(templateData) ||
                !Array.isArray(shopItemJsonData) || !Array.isArray(themeData) ||
                !Array.isArray(loadingMessagesData)) {
                throw new Error('Formato de datos JSON inválido.');
            }
            if (!(await this.quizSystem.loadQuestionsData(questionData))) throw new Error("Fallo al procesar preguntas.");
            this.catManager.loadTemplates(templateData as CatTemplate[]);
            this.shopManager.init(shopItemJsonData as ShopItemJsonData[]);
            if (!(await this.themeManager.loadThemesData(themeData as Theme[]))) throw new Error("Fallo al procesar temas.");
            this.loadingMessages = loadingMessagesData as string[];
            if (this.loadingMessages.length === 0) {
                this.loadingMessages = ["Cargando michi-diversión..."];
            }
             console.log("GameManager: Preload completado exitosamente.");
        } catch (error: any) {
            console.error('GameManager: Error durante preload:', error);
            this.containerElement.innerHTML = `Error cargando assets: ${error.message}. Revisa la consola.`;
            throw error;
        }
    }

    public start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTimestamp = performance.now();
        this.physicsManager.start();
        this.gameLoopRequestId = requestAnimationFrame(this.gameLoop.bind(this));
        console.log("GameManager: Ciclo de juego iniciado.");
    }

    public stop(): void {
        if (!this.isRunning) return;
        this.isRunning = false;
        if (this.gameLoopRequestId) {
            cancelAnimationFrame(this.gameLoopRequestId);
        }
        this.gameLoopRequestId = undefined;
        this.physicsManager.stop();
        console.log("GameManager: Ciclo de juego detenido.");
    }

    private gameLoop(timestamp: number): void {
        if (!this.isRunning) return;
        const deltaTime = (timestamp - this.lastTimestamp) / 1000.0;
        this.lastTimestamp = timestamp;
        const clampedDeltaTime = Math.min(deltaTime, 0.1);
        this.update(clampedDeltaTime);
        this.gameLoopRequestId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    public update(deltaTime: number): void {
        try {
            this.stateMachine.update(deltaTime);
            this.catManager.updateCats(deltaTime);
            this.catFoodManager.update(deltaTime);
        } catch (error) {
            console.error("Error en gameLoop update:", error);
            this.stop();
        }
    }

    public shutdown(): void {
        console.log("GameManager: Iniciando shutdown...");
        this.stop();
        this.hideToolControls();
        this.hideShopButton();
        this.hideOptionsButton();
        this.removeKeyboardListener();
        this.removeThemeChangeListener();
        this.removeGlobalUICListeners();
        this.physicsManager.shutdown();

        const currentStateName = this.stateMachine.getCurrentStateName();
        if (currentStateName && currentStateName !== '__shutdown__') {
            try { this.stateMachine.getCurrentState()?.exit(); }
            catch (e) { console.warn("Error en exit() del estado durante shutdown:", e) }
        }
        this.stateMachine.changeState('__shutdown__');

        this.catManager.removeAllCats();
        this.inkManager.destroy();
        this.shopManager.destroy();
        this.catFoodManager.destroy();

        this.containerElement.innerHTML = '';
        this.gameUiContainer = null;
        this.setBodyStateClass(null);
        document.querySelector('combo-counter')?.remove();
        this.diagonalWipeElement?.reset();
        this.blurBackdrop = null;

        console.log("GameManager: Shutdown completado.");
    }

    public getUIManager(): UIManager {
        if (!this.uiManager) throw new Error("UIManager no inicializado en GameManager.");
        return this.uiManager;
    }
    public getQuizUiContainerElement(): QuizUiContainer | null {
        if (!this.gameUiContainer || !this.containerElement.contains(this.gameUiContainer)) {
            this.gameUiContainer = this.containerElement.querySelector('quiz-ui-container');
        }
        return this.gameUiContainer;
    }

    public setQuizUiFaded(isFaded: boolean): void {
        const quizUi = this.getQuizUiContainerElement();
        if (quizUi) { quizUi.isFaded = isFaded; }
    }

    public setCatDragState(isDragging: boolean): void {
        this.setQuizUiFaded(isDragging);
        if (this.drawingCanvasLayerElement) {
            this.drawingCanvasLayerElement.isPointerLockdown = isDragging;
            if (!isDragging && this.inkManager) { this.inkManager.updateCanvasActiveState(); }
        }
    }

    public resetGame(): void {
        console.log("GameManager: resetGame() - Iniciando reseteo completo...");
        this.stop();
        if (this.playerData) {
            this.playerData.reset();
        }
        if (this.quizSystem) {
            this.quizSystem.resetAvailableQuestions();
        }
        if (this.catManager) {
            this.catManager.removeAllCats();
        }
        if (this.inkManager) {
            this.inkManager.destroy();
        }
        if (this.catFoodManager) {
            this.catFoodManager.destroy();
        }
        if (this.shopManager) {
            this.shopManager.closeShop();
        }
        if (this.optionsPopupInstance?.isVisible) {
            this.closeOptionsMenu();
        }
        this.hideToolControls();
        this.hideShopButton();
        this.hideOptionsButton();
        this.gameUiContainer = null;
        document.querySelector('combo-counter')?.remove();
        this.stateMachine.changeState('MainMenu', undefined, 'gq-wipe-transition');
    }

    // --- Métodos para mostrar/ocultar controles y botones ---
    private showToolControls(): void {
        const container = this.controlElements.controlsContainer;
        if (container) {
            container.classList.remove('hidden');
            this.updateControlVisibilityBasedOnUnlocks();
        } else {
            console.warn("[GameManager] Contenedor de controles (#right-controls) no encontrado.");
        }
    }

    private hideToolControls(): void {
        const container = this.controlElements.controlsContainer;
        if (container) {
            container.classList.add('hidden');
        }
    }

    private showShopButton(): void {
        if (!this.shopButtonInstance) {
             this.shopButtonInstance = document.getElementById('shop-button-global') as ShopButtonComponent | null;
             if (!this.shopButtonInstance) {
                 console.warn("GameManager: shop-button-global no encontrado, creando dinámicamente. Revisa index.html.");
                 const shopButton = document.createElement('shop-button-component') as ShopButtonComponent;
                 shopButton.id = 'shop-button-global';
                 shopButton.titleText = "Abrir Tienda (S)";
                 document.body.appendChild(shopButton);
                 this.shopButtonInstance = shopButton;
             }
             if (this.shopButtonInstance && !this.shopButtonInteractionListener) {
                this.shopButtonInteractionListener = () => this.handleShopButtonInteraction();
                this.shopButtonInstance.addEventListener('shop-button-interaction', this.shopButtonInteractionListener);
             }
        }
        if (this.shopButtonInstance) {
            this.shopButtonInstance.classList.remove('hidden');
        }
        // El estado (disabled) se actualiza en updateGlobalButtonsState
    }

    private hideShopButton(): void {
        if (this.shopButtonInstance) {
            this.shopButtonInstance.classList.add('hidden');
        }
    }

    private showOptionsButton(): void {
        if (this.optionsButtonInstance) {
            this.optionsButtonInstance.classList.remove('hidden');
        }
    }

    private hideOptionsButton(): void {
        if (this.optionsButtonInstance) {
            this.optionsButtonInstance.classList.add('hidden');
        }
    }
    // --- Fin Métodos para mostrar/ocultar ---


    public updateBackdropAndFadeState(): void {
        const shopIsOpen = this.shopManager.isShopOpen();
        const optionsAreOpen = this.optionsPopupInstance?.isVisible ?? false;
        const explanationIsVisible = this.uiManager.isExplanationVisible();

        const isAnyPopupOpen = shopIsOpen || optionsAreOpen || explanationIsVisible;

        if (this.blurBackdrop) {
            this.blurBackdrop.visible = isAnyPopupOpen;
        } else {
            // console.warn("[GameManager] updateBackdropAndFadeState: blurBackdrop es null.");
        }

        this.setQuizUiFaded(isAnyPopupOpen);
        this.updateGlobalButtonsState();
    }

    // <<< MODIFICADO >>> toggleOptionsMenu
    private toggleOptionsMenu(): void {
        if (!this.optionsPopupInstance) { 
            console.warn("GameManager: No se puede alternar el menú de opciones, falta el popup.");
            return;
        }

        const currentVisibility = this.optionsPopupInstance.isVisible;
        const newState = !currentVisibility;

        this.optionsPopupInstance.isVisible = newState; 

        if (newState) { 
            this.optionsPopupInstance.initialVolume = this.audioManager.getVolume();
            this.optionsPopupInstance.initiallyMuted = this.audioManager.isMuted();
            this.audioManager.playSound('ui_confirm');
        }
        
        this.updateBackdropAndFadeState(); 
    }

    // <<< MODIFICADO Y CORREGIDO >>> closeOptionsMenu
    private closeOptionsMenu(): void {
        if (this.optionsPopupInstance) { 
            if (this.optionsPopupInstance.isVisible) { 
                this.optionsPopupInstance.isVisible = false; 
            }
            this.updateBackdropAndFadeState();
        }
    }
    // <<< FIN MODIFICADO Y CORREGIDO >>>

    private handleShopButtonInteraction(): void {
        const audioManager = this.getAudioManager();
        if (!audioManager.isReady()) { audioManager.init(); }
        if (!this.shopManager.isShopOpen()) {
             this.openShop();
             audioManager?.playSound('ui_confirm');
        }
    }

    private handleShopCloseRequest(): void {
        this.closeShop();
    }

    private addShopCloseListener(popupElement: ShopPopup): void {
        this.removeShopCloseListener(popupElement);
        this.shopCloseRequestListener = () => this.handleShopCloseRequest();
        popupElement.addEventListener('close-requested', this.shopCloseRequestListener);
    }

     private removeShopCloseListener(popupElement: ShopPopup): void {
         if (popupElement && this.shopCloseRequestListener) {
             popupElement.removeEventListener('close-requested', this.shopCloseRequestListener);
         }
     }

    public openShop(): void {
        if (this.shopManager) {
            this.shopManager.openShop();
            this.updateBackdropAndFadeState();
        } else {
            console.warn("GameManager: openShop() llamado pero ShopManager no está disponible.");
        }
    }

    public closeShop(): void {
        if (this.shopManager) {
            this.shopManager.closeShop();
            this.updateBackdropAndFadeState();
        } else {
            console.warn("GameManager: closeShop() llamado pero ShopManager no está disponible.");
        }
    }

    // <<< INICIO CAMBIO VISIBILIDAD BOTÓN OPCIONES (en updateGlobalButtonsState) >>>
    private updateGlobalButtonsState(): void {
        const isShopOpen = this.shopManager.isShopOpen();
        const isOptionsOpen = this.optionsPopupInstance?.isVisible ?? false;
        const isExplanationVisible = this.uiManager.isExplanationVisible();
        const isAnyPopupOpen = isShopOpen || isOptionsOpen || isExplanationVisible;

        const currentStateName = this.stateMachine.getCurrentStateName();
        const isGameplay = currentStateName === 'QuizGameplay';
        // const isMainMenu = currentStateName === 'MainMenu'; // No se usa más para optionsButton
        // const isResults = currentStateName === 'Results';   // No se usa más para optionsButton
        // const isGameOver = currentStateName === 'GameOver'; // No se usa más para optionsButton

        if (this.shopButtonInstance) {
            this.shopButtonInstance.disabled = isAnyPopupOpen || !isGameplay;
            this.shopButtonInstance.classList.toggle('hidden', !isGameplay);
        }

        if (this.optionsButtonInstance) {
            // Botón de opciones solo visible en Gameplay
            const shouldBeVisibleForState = isGameplay; 
            this.optionsButtonInstance.disabled = (isShopOpen || isExplanationVisible) || !shouldBeVisibleForState; // Deshabilitado si otros popups están abiertos o no es gameplay
            this.optionsButtonInstance.classList.toggle('hidden', !shouldBeVisibleForState);
        }
        this.updateToolButtonStates();
    }
    // <<< FIN CAMBIO VISIBILIDAD BOTÓN OPCIONES >>>

    public updateControlVisibilityBasedOnUnlocks(): void {
        const drawingUnlocked = this.playerData.isDrawingUnlocked;
        const catFoodUnlocked = this.playerData.isCatFoodUnlocked;
        if (this.controlElements.drawingButtonsContainer) {
            this.controlElements.drawingButtonsContainer.classList.toggle('hidden', !drawingUnlocked);
        }
        if (this.controlElements.catFoodUiContainer) {
            this.controlElements.catFoodUiContainer.classList.toggle('hidden', !catFoodUnlocked);
        }
        this.updateToolButtonStates();
    }

    private addThemeChangeListener(): void {
        this.removeThemeChangeListener();
        this.themeChangeListener = (_event: Event) => {
            const currentState = this.stateMachine.getCurrentState();
            if (currentState instanceof QuizGameplayState) {
                this.uiManager.rebuildInterface();
            }
            if (this.shopManager.isShopOpen()) {
                this.shopManager.updateShopUI();
            }
            if (this.optionsPopupInstance?.isVisible) {
                this.optionsPopupInstance.requestUpdate();
            }
        };
        document.addEventListener('theme-changed', this.themeChangeListener);
    }
    private removeThemeChangeListener(): void {
        if (this.themeChangeListener) {
            document.removeEventListener('theme-changed', this.themeChangeListener);
            this.themeChangeListener = null;
        }
    }

    private addKeyboardListener(): void {
        this.removeKeyboardListener();
        this.keydownListener = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (this.optionsPopupInstance?.isVisible) {
                    this.closeOptionsMenu(); 
                    return;
                }
                if (this.shopManager.isShopOpen()) {
                    this.closeShop(); 
                    this.audioManager.playSound('ui_cancel'); 
                    return;
                }
            }

            const isAnyPopupTrulyOpen = this.shopManager.isShopOpen() || (this.optionsPopupInstance?.isVisible ?? false) || this.uiManager.isExplanationVisible();
            if (isAnyPopupTrulyOpen) return;

            const currentStateName = this.stateMachine.getCurrentStateName();
            if (currentStateName === 'QuizGameplay') {
                switch (event.key.toLowerCase()) {
                    case 'b': this.activateBrush(); break;
                    case 'c':
                        if (this.playerData.isDrawingUnlocked && this.playerData.inkSpentSinceLastClear > 0) {
                            this.inkManager.clearInkLines();
                        }
                        break;
                    case 'f': this.activateCatFood(); break;
                    case 's':
                        if (this.shopButtonInstance && !this.shopButtonInstance.disabled) {
                            this.handleShopButtonInteraction();
                        }
                        break;
                    case 'o': // Atajo para opciones durante el quiz
                        if (this.optionsButtonInstance && !this.optionsButtonInstance.disabled) {
                            this.toggleOptionsMenu();
                        }
                        break;
                    case 't': this.themeManager.cycleTheme(); break; // Mantener atajo de tema en quiz
                }
            } else if (['MainMenu', 'GameOver', 'Results'].includes(currentStateName || '')) {
                 // Atajos solo para tema y opciones si el botón de opciones estuviera visible en esos estados (actualmente no)
                 if (event.key.toLowerCase() === 't') {
                    this.themeManager.cycleTheme();
                }
                // Ya no se necesita el atajo 'o' aquí si el botón de opciones no está visible
                //  if (event.key.toLowerCase() === 'o') {
                //         if (this.optionsButtonInstance && !this.optionsButtonInstance.disabled) {
                //             this.toggleOptionsMenu();
                //         }
                //  }
            }
        };
        window.addEventListener('keydown', this.keydownListener);
    }

    private removeKeyboardListener(): void {
        if (this.keydownListener) {
            window.removeEventListener('keydown', this.keydownListener);
            this.keydownListener = null;
        }
    }

    private setupGlobalUICListeners(): void {
        this.removeGlobalUICListeners();

        if (this.shopButtonInstance) {
            this.shopButtonInteractionListener = () => this.handleShopButtonInteraction();
            this.shopButtonInstance.addEventListener('shop-button-interaction', this.shopButtonInteractionListener);
        } else {
            console.warn("GameManager: shopButtonInstance es null en setupGlobalUICListeners. No se pudo añadir listener.");
        }

        const shopPopup = this.shopManager.getShopPopupElement();
        if (shopPopup) {
            this.addShopCloseListener(shopPopup);
        }

        if (this.optionsButtonInstance) {
            this.optionsButtonClickListener = () => this.toggleOptionsMenu();
            this.optionsButtonInstance.addEventListener('options-button-clicked', this.optionsButtonClickListener);
        } else {
            console.warn("GameManager: optionsButtonInstance es null en setupGlobalUICListeners. No se pudo añadir listener.");
        }

        if (this.optionsPopupInstance) {
            this.optionsPopupCloseListener = () => this.closeOptionsMenu();
            this.optionsPopupInstance.addEventListener('options-close-requested', this.optionsPopupCloseListener);
        } else {
            console.warn("GameManager: optionsPopupInstance es null en setupGlobalUICListeners. No se pudo añadir listener.");
        }
    }

    private removeGlobalUICListeners(): void {
        if (this.shopButtonInstance && this.shopButtonInteractionListener) {
            this.shopButtonInstance.removeEventListener('shop-button-interaction', this.shopButtonInteractionListener);
            this.shopButtonInteractionListener = null;
        }
        const shopPopup = this.shopManager?.getShopPopupElement();
        if (shopPopup && this.shopCloseRequestListener) {
            shopPopup.removeEventListener('close-requested', this.shopCloseRequestListener);
            this.shopCloseRequestListener = null;
        }

        if (this.optionsButtonInstance && this.optionsButtonClickListener) {
            this.optionsButtonInstance.removeEventListener('options-button-clicked', this.optionsButtonClickListener);
            this.optionsButtonClickListener = null;
        }
        if (this.optionsPopupInstance && this.optionsPopupCloseListener) {
            this.optionsPopupInstance.removeEventListener('options-close-requested', this.optionsPopupCloseListener);
            this.optionsPopupCloseListener = null;
        }
    }


    public getLives(): number { return this.playerData.lives; }
    public decrementLives(): void { if (this.playerData.lives > 0) { this.playerData.lives--; this.updateExternalLivesUI(); } }
    public incrementLives(): void { this.playerData.lives++; this.updateExternalLivesUI(); }
    public enableDrawingFeature(): boolean { try { this.inkManager.init(); this.updateInkUI(); this.updateControlVisibilityBasedOnUnlocks(); return true; } catch(e) { console.error("GameManager: Error habilitando dibujo:", e); return false; } }
    public enableCatFoodFeature(): void { try { this.catFoodManager.enable(); this.updateCatFoodUI(); this.updateControlVisibilityBasedOnUnlocks(); } catch(e) { console.error("GameManager: Error habilitando comida:", e); } }
    public updateInkUI(): void { this.uiManager.updateInkVisibility(this.playerData.isDrawingUnlocked); this.uiManager.updateInkBar(); this.updateToolButtonStates(); }
    public updateExternalLivesUI(): void { this.uiManager.updateLivesDisplay(this.playerData.lives); }
    public updateExternalShieldUI(isActive: boolean): void { this.uiManager.updateShieldIcon(isActive); }
    public updateExternalHintUI(charges: number): void { this.uiManager.updateHintIcon(charges); }
    public updateExternalScoreUI(): void { this.uiManager.updateScoreDisplay(this.playerData.score); }
    public updateCatFoodUI(): void { this.uiManager.updateCatFoodBar(this.playerData.currentCatFood, this.playerData.getMaxCatFood()); this.updateToolButtonStates(); }

    public activateBrush(): void {
        const now = Date.now();
        if (now - this._lastToolToggleTime < this.TOOL_TOGGLE_DEBOUNCE_MS) return;
        this._lastToolToggleTime = now;
        if (!this.playerData.isDrawingUnlocked) return;
        if (this.catFoodManager.isActive) this.catFoodManager.toggleActive(false);
        this.inkManager.toggleBrush();
        this.updateGlobalButtonsState();
    }

    public activateCatFood(): void {
        const now = Date.now();
        if (now - this._lastToolToggleTime < this.TOOL_TOGGLE_DEBOUNCE_MS) return;
        this._lastToolToggleTime = now;
        if (!this.playerData.isCatFoodUnlocked) return;
        if (this.inkManager.isBrushActive) this.inkManager.toggleBrush(false);
        this.catFoodManager.toggleActive();
        this.updateGlobalButtonsState();
    }

    public updateToolButtonStates(): void {
        const isAnyPopupOpen = this.shopManager.isShopOpen() || (this.optionsPopupInstance?.isVisible ?? false) || this.uiManager.isExplanationVisible();

        if (this.controlElements.brushToolButton) {
            this.controlElements.brushToolButton.active = this.inkManager.isBrushActive;
            this.controlElements.brushToolButton.disabled = isAnyPopupOpen || !this.playerData.isDrawingUnlocked || (this.playerData.currentInk <= 0 && !this.inkManager.isBrushActive);
        }
        if (this.controlElements.clearInkToolButton) {
            this.controlElements.clearInkToolButton.disabled = isAnyPopupOpen || !this.playerData.isDrawingUnlocked || this.playerData.inkSpentSinceLastClear <= 0;
        }
        if (this.controlElements.catFoodToolButton) {
            this.controlElements.catFoodToolButton.active = this.catFoodManager.isActive;
            this.controlElements.catFoodToolButton.disabled = isAnyPopupOpen || !this.playerData.isCatFoodUnlocked || (this.playerData.currentCatFood <= 0 && !this.catFoodManager.isActive);
            this.uiManager.updateCatFoodBar(this.playerData.currentCatFood, this.playerData.getMaxCatFood());
        }
    }

    private setupToolButtonListeners = (): void => {
        this.controlElements.brushToolButton?.addEventListener('tool-activated', () => this.activateBrush());
        this.controlElements.clearInkToolButton?.addEventListener('tool-activated', () => {
            if (this.playerData.isDrawingUnlocked && this.playerData.inkSpentSinceLastClear > 0) {
                this.inkManager.clearInkLines();
            }
        });
        this.controlElements.catFoodToolButton?.addEventListener('tool-activated', () => this.activateCatFood());
    };

    public getQuizSystem(): QuizSystem { return this.quizSystem; }
    public getPhysicsManager(): PhysicsManager { return this.physicsManager; }
    public getStateMachine(): StateMachine { return this.stateMachine; }
    public getAudioManager(): AudioManager { return this.audioManager; }
    public getCatManager(): CatManager { return this.catManager; }
    public getShopManager(): ShopManager { return this.shopManager; }
    public getPlayerData(): PlayerData { return this.playerData; }
    public getInkManager(): InkManager { return this.inkManager; }
    public getThemeManager(): ThemeManager { return this.themeManager; }
    public getCatFoodManager(): CatFoodManager { return this.catFoodManager; }
    public getContainerElement(): HTMLElement { return this.containerElement; }
    public getCurrentState(): IState | null { return this.stateMachine.getCurrentState(); }
    public getControlElements(): ControlElements { return this.controlElements; }
    public getCatDisplayArea(): CatDisplayArea { return this.catDisplayAreaElement; }
    public getDrawingCanvasLayer(): DrawingCanvasLayer | null { return this.drawingCanvasLayerElement; }
    public getLoadingMessages(): string[] { return this.loadingMessages.length > 0 ? this.loadingMessages : ["Cargando..."]; }
}