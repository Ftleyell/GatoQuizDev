// src/game/GameManager.ts

// --- Sistemas y Managers del Motor ---
// Desde src/systems/ (usando su index.ts)
import { AudioManager, PhysicsManager, ThemeManager } from '../systems';
// Desde src/game/engine/managers/ (usando su index.ts)
import { CatManager, ShopManager, InkManager, CatFoodManager, ToolManager } from './engine/managers';
// Desde src/game/modules/quiz/ (usando su index.ts)
import { QuizSystem } from './modules/quiz';

// --- Gestores de UI del Motor ---
// Desde src/game/engine/ui/ (usando su index.ts)
import { GlobalUIManager } from './engine/ui';

// --- Datos y Estado del Juego ---
import { PlayerData } from './PlayerData';
import { StateMachine, type IState } from './StateMachine'; // Agrupada IState aquí

// --- Tipos Globales ---
// Desde src/types/ (usando su index.ts)
import type { EngineServices, CatTemplate, ShopItemJsonData, Theme } from '../types';

// --- Módulos de Juego y su UI ---
// Desde src/game/modules/quiz/ (usando su index.ts)
import type { QuizGameModule } from './modules/quiz';
// Desde src/game/modules/quiz/ui/ (usando su index.ts)
import { QuizUIManager } from './modules/quiz/ui'; // Asumiendo que se necesita la clase, no solo el tipo

// --- Estados del Juego ---
// Desde src/game/states/ (usando su index.ts)
import {
    LoadingState,
    MainMenuState,
    QuizGameplayState,
    ResultsState,
    GameOverState
} from './states';

// --- Componentes UI Globales (Registros y Tipos) ---
// Registros (side-effect imports - mantener rutas directas o usar .js según configuración)
import './components/ui/cat-display-area.ts';
import './components/ui/drawing-canvas-layer.ts';
import './components/ui/shop-button.ts';
import './components/ui/options-button-component.ts';
import './components/ui/options-menu-popup.ts';
import './components/ui/main-menu-screen.ts';
import './components/ui/diagonal-wipe.ts';
import './components/ui/combo-counter.ts';
import './components/ui/shop-popup.ts';
import './components/ui/explanation-overlay.ts';
import './components/ui/blur-backdrop.ts';

import type {
    CatDisplayArea,
    DrawingCanvasLayer,
    ShopButtonComponent,
    OptionsButtonComponent,
    OptionsMenuPopup,
    MainMenuScreen,
    DiagonalWipe,
    QuizUiContainer
} from './components/ui';


export class GameManager {
    // --- Gestores de Sistemas del Motor ---
    private physicsManager!: PhysicsManager;
    private quizSystem!: QuizSystem;
    private audioManager!: AudioManager;
    private catManager!: CatManager;
    private playerData!: PlayerData;
    private shopManager!: ShopManager;
    private inkManager!: InkManager;
    private themeManager!: ThemeManager;
    private catFoodManager!: CatFoodManager;

    // --- Gestores del Motor para UI Global y Herramientas ---
    private globalUIManager!: GlobalUIManager;
    private toolManager!: ToolManager;

    // --- Máquina de Estados ---
    private stateMachine!: StateMachine;

    // --- Elementos del DOM Globales y Contenedores ---
    private containerElement: HTMLElement;
    private catDisplayAreaElement!: CatDisplayArea;
    private drawingCanvasLayerElement: DrawingCanvasLayer | null = null;
    private diagonalWipeElement: DiagonalWipe | null = null;

    // --- Estado del Juego y Bucle ---
    private lastTimestamp: number = 0;
    private isRunning: boolean = false;
    private gameLoopRequestId?: number;
    private isCatBeingDragged: boolean = false;

    // --- Listeners de Eventos ---
    private keydownListener: ((event: KeyboardEvent) => void) | null = null;
    private themeChangeListener: EventListener | null = null;
    private shopButtonInteractionListener: (() => void) | null = null;
    private optionsButtonClickListener: (() => void) | null = null;
    private optionsPopupCloseListener: (() => void) | null = null;

    // --- Datos Cargados ---
    private loadingMessages: string[] = ["Desenredando la diversión..."];

    constructor(container: HTMLElement) {
        this.containerElement = container;
        console.log("GameManager: Constructor iniciado.");

        this.playerData = new PlayerData();
        this.audioManager = new AudioManager(); // AudioManager instanciado
        this.quizSystem = new QuizSystem();
        this.themeManager = new ThemeManager('body');
        
        this.globalUIManager = new GlobalUIManager(this);
        this.toolManager = new ToolManager(this);

        this.catManager = new CatManager(this.audioManager, this);
        this.shopManager = new ShopManager(this.playerData, this);
        this.inkManager = new InkManager(this);
        this.catFoodManager = new CatFoodManager(this);
        this.physicsManager = new PhysicsManager(this.catManager, this.catFoodManager, this);

        this.toolManager.setManagers(this.inkManager, this.catFoodManager, this.playerData);
        this.catManager.setPhysicsManager(this.physicsManager);
        this.inkManager.setPhysicsManager(this.physicsManager);

        this.stateMachine = new StateMachine();
        this.stateMachine.setAnimationContainer(this.containerElement);

        this.diagonalWipeElement = document.getElementById('diagonal-wipe-transition-element') as DiagonalWipe | null;
        if (!this.diagonalWipeElement) {
            console.warn("GameManager: Componente <diagonal-wipe> no encontrado en el DOM.");
        }
        this.stateMachine.setWipeComponent(this.diagonalWipeElement);

        const catDisplayArea = document.getElementById('cat-display-area-main') as CatDisplayArea | null;
        if (!catDisplayArea) {
            throw new Error("GameManager CRITICAL: <cat-display-area id='cat-display-area-main'> no encontrado.");
        }
        this.catDisplayAreaElement = catDisplayArea;
        this.catManager.setCatDisplayArea(this.catDisplayAreaElement);
        this.catFoodManager.setCatDisplayArea(this.catDisplayAreaElement);

        this.drawingCanvasLayerElement = document.getElementById('drawing-canvas-layer-main') as DrawingCanvasLayer | null;
        if (!this.drawingCanvasLayerElement) {
            console.warn("GameManager: <drawing-canvas-layer id='drawing-canvas-layer-main'> no encontrado.");
        }
        
        this.setupStates();
        console.log("GameManager: Constructor finalizado.");
    }

    public getEngineServices(): EngineServices {
        return {
            playerData: this.playerData,
            audioManager: this.audioManager,
            catManager: this.catManager,
            physicsManager: this.physicsManager,
            themeManager: this.themeManager,
            shopManager: this.shopManager,
            inkManager: this.inkManager,
            catFoodManager: this.catFoodManager,
            globalUI: this.globalUIManager,
            toolManager: this.toolManager,
            quizSystem: this.quizSystem,
            gameManager: this,
        };
    }

    public setBodyStateClass(stateName: string | null): void {
        const body = document.body;
        body.className.split(' ').forEach(cls => {
            if (cls.startsWith('state-')) body.classList.remove(cls);
        });
        if (stateName) {
            body.classList.add(`state-${stateName.toLowerCase()}`);
        }
    }

    public async init(): Promise<void> {
        console.log("GameManager: init() llamado.");
        
        // --- PUNTO CRÍTICO PARA EL AUDIO ---
        // Inicializar el AudioManager aquí. Esto crea el AudioContext.
        this.audioManager.init(); 
        console.log("GameManager: AudioManager.init() llamado.");
        // ------------------------------------

        this.playerData.reset();
        this.physicsManager.init(this.catDisplayAreaElement);
        await this.inkManager.init();
        this.catFoodManager.init();

        this.toolManager.showToolControls(false);
        this.globalUIManager.showShopButton(false);
        this.globalUIManager.showOptionsButton(false);
        this.globalUIManager.updateBackdropVisibility();

        this.addThemeChangeListener();
        await this.preload(); // preload ahora puede cargar sonidos de forma segura
        this.addKeyboardListener();
        this.setupGlobalUICListeners();
        console.log("GameManager: init() completado.");
    }

    public create(): void {
        console.log("GameManager: create() llamado (transicionando a MainMenu).");
        this.quizSystem.resetAvailableQuestions();
        this.catManager.removeAllCats();

        if (this.shopManager.isShopOpen()) this.handleShopCloseRequest();
        if (this.globalUIManager.isOptionsMenuOpen()) this.closeOptionsMenu();

        this.stateMachine.changeState('MainMenu', undefined, 'gq-wipe-transition');
    }
    
    private setupStates(): void {
        console.log("GameManager: setupStates() iniciando.");
        const loadingState = new LoadingState(this);
        const mainMenuState = new MainMenuState(this);
        const quizGameplayState = new QuizGameplayState(this);
        const resultsState = new ResultsState(this);
        const gameOverState = new GameOverState(this);

        const wrapEnter = (state: IState, showShopBtn: boolean, showToolCtrl: boolean, showOptionsBtn: boolean) => {
            const originalEnter = state.enter.bind(state);
            return async (params?: any): Promise<void> => {
                try {
                    const result = originalEnter(params);
                    if (result instanceof Promise) {
                        await result;
                    }
                } catch (e) {
                    console.error(`GameManager: Error en enter() para ${state.constructor.name}:`, e);
                }

                if (state instanceof MainMenuState) {
                    const mainMenuElement = this.containerElement.querySelector('main-menu-screen') as MainMenuScreen | null;
                    if (mainMenuElement) {
                        mainMenuElement.loadingMessages = this.getLoadingMessages();
                    }
                }

                this.getGlobalUIManager().showShopButton(showShopBtn);
                this.getGlobalUIManager().showOptionsButton(showOptionsBtn);
                this.getToolManager().showToolControls(showToolCtrl);

                if (showToolCtrl && state instanceof QuizGameplayState) {
                    this.getToolManager().updateControlVisibilityBasedOnUnlocks();
                    this.getToolManager().updateCatFoodUIToolButton();
                }
                this.getToolManager().updateToolButtonActiveStates();
                this.getGlobalUIManager().updateBackdropVisibility();
            };
        };

        const wrapExit = (state: IState) => {
            const originalExit = state.exit.bind(state);
            return () => { try { originalExit(); } catch (e) { console.error(`GameManager: Error en exit() para ${state.constructor.name}:`, e); }};
        };

        loadingState.enter = wrapEnter(loadingState, false, false, false);
        loadingState.exit = wrapExit(loadingState);
        mainMenuState.enter = wrapEnter(mainMenuState, false, false, false);
        mainMenuState.exit = wrapExit(mainMenuState);
        quizGameplayState.enter = wrapEnter(quizGameplayState, true, true, true);
        quizGameplayState.exit = wrapExit(quizGameplayState);
        resultsState.enter = wrapEnter(resultsState, false, false, false);
        resultsState.exit = wrapExit(resultsState);
        gameOverState.enter = wrapEnter(gameOverState, false, false, false);
        gameOverState.exit = wrapExit(gameOverState);

        this.stateMachine.addState('Loading', loadingState);
        this.stateMachine.addState('MainMenu', mainMenuState);
        this.stateMachine.addState('QuizGameplay', quizGameplayState);
        this.stateMachine.addState('Results', resultsState);
        this.stateMachine.addState('GameOver', gameOverState);

        this.stateMachine.addState('__shutdown__', {
            enter: () => {
                this.toolManager.showToolControls(false);
                this.globalUIManager.showShopButton(false);
                this.globalUIManager.showOptionsButton(false);
            },
            exit: () => {}, update: () => {}
        });
        console.log("GameManager: setupStates() completado.");
    }
    
    public async preload(): Promise<void> {
        console.log("GameManager: preload() iniciando.");
        // Asegurarse que AudioManager esté inicializado antes de cargar sonidos.
        // Esto ya se hace en GameManager.init(), así que aquí es seguro.
        
        // Ejemplo de cómo cargarías sonidos (asegúrate que las rutas sean correctas)
        // await this.audioManager.loadSound('ui_confirm', `${cleanBaseUrl}/audio/ui_confirm.mp3`);
        // await this.audioManager.loadSound('ui_cancel', `${cleanBaseUrl}/audio/ui_cancel.mp3`);
        // await this.audioManager.loadSound('ui_select', `${cleanBaseUrl}/audio/ui_select.mp3`);
        // Añade aquí todos los sonidos que necesites precargar.

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

            if (!Array.isArray(questionData) || !Array.isArray(templateData) || !Array.isArray(shopItemJsonData) || !Array.isArray(themeData) || !Array.isArray(loadingMessagesData)) {
                throw new Error('Formato de datos JSON inválido en uno o más archivos.');
            }
            if (!(await this.quizSystem.loadQuestionsData(questionData))) throw new Error("Fallo al procesar preguntas.");
            this.catManager.loadTemplates(templateData as CatTemplate[]);
            this.shopManager.init(shopItemJsonData as ShopItemJsonData[]);
            if (!(await this.themeManager.loadThemesData(themeData as Theme[]))) throw new Error("Fallo al procesar temas.");
            this.loadingMessages = loadingMessagesData as string[];
            if (this.loadingMessages.length === 0) this.loadingMessages = ["Cargando michi-diversión..."];
            console.log("GameManager: preload() de datos JSON completado exitosamente.");
        } catch (error: any) {
            console.error('GameManager: Error CRÍTICO durante preload:', error);
            this.containerElement.innerHTML = `Error cargando assets: ${error.message}. Revisa la consola.`;
            throw error;
        }
    }

    public start(): void {
        if (this.isRunning) return;
        console.log("GameManager: start() - Iniciando bucle de juego y físicas.");
        this.isRunning = true;
        this.lastTimestamp = performance.now();
        this.physicsManager.start();
        this.gameLoopRequestId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    public stop(): void {
        if (!this.isRunning) return;
        console.log("GameManager: stop() - Deteniendo bucle de juego y físicas.");
        this.isRunning = false;
        if (this.gameLoopRequestId) cancelAnimationFrame(this.gameLoopRequestId);
        this.gameLoopRequestId = undefined;
        this.physicsManager.stop();
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
            console.error("GameManager: Error en gameLoop update:", error);
            this.stop();
        }
    }

    public shutdown(): void {
        console.log("GameManager: shutdown() iniciando.");
        this.stop();
        this.toolManager.showToolControls(false);
        this.globalUIManager.showShopButton(false);
        this.globalUIManager.showOptionsButton(false);
        this.removeKeyboardListener();
        this.removeThemeChangeListener();
        this.removeGlobalUICListeners();
        this.physicsManager.shutdown();
        const currentStateName = this.stateMachine.getCurrentStateName();
        if (currentStateName && currentStateName !== '__shutdown__') {
            try { this.stateMachine.getCurrentState()?.exit(); }
            catch (e) { console.warn("GameManager: Error en exit() del estado durante shutdown:", e); }
        }
        this.stateMachine.changeState('__shutdown__');
        this.catManager.removeAllCats();
        this.inkManager.destroy();
        this.shopManager.destroy();
        this.catFoodManager.destroy();
        this.containerElement.innerHTML = '';
        this.setBodyStateClass(null);
        document.querySelector('combo-counter')?.remove();
        this.globalUIManager.resetWipe();
        console.log("GameManager: shutdown() completado.");
    }

    // --- Getters ---
    public getGlobalUIManager(): GlobalUIManager { return this.globalUIManager; }
    public getToolManager(): ToolManager { return this.toolManager; }
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
    public getCatDisplayArea(): CatDisplayArea { return this.catDisplayAreaElement; }
    public getDrawingCanvasLayer(): DrawingCanvasLayer | null { return this.drawingCanvasLayerElement; }
    public getLoadingMessages(): string[] { return this.loadingMessages.length > 0 ? this.loadingMessages : ["Cargando..."]; }

    public isGamePausedForOverlay(): boolean {
        const currentState = this.stateMachine.getCurrentState() as any; 
        const currentModule = currentState?.quizUIManager as QuizUIManager | null;
        if (currentModule && typeof currentModule.isExplanationVisible === 'function') {
             return currentModule.isExplanationVisible();
        }
        return false;
    }

    public updateBackdropAndFadeState(): void {
        this.globalUIManager.updateBackdropVisibility(); 
        const shopIsOpen = this.shopManager.isShopOpen();
        const optionsAreOpen = this.globalUIManager.isOptionsMenuOpen();
        const isModuleOverlayVisible = this.isGamePausedForOverlay();

        const shouldFadeModuleUI = shopIsOpen || optionsAreOpen || isModuleOverlayVisible;
        this.globalUIManager.setModuleUIsFaded(shouldFadeModuleUI);

        this.updateGlobalButtonsState();
    }

    private async toggleOptionsMenu(): Promise<void> { // Convertido a async
        const isCurrentlyOpen = this.globalUIManager.isOptionsMenuOpen();
        
        // Intentar resumir el contexto de audio si se está abriendo el menú
        if (!isCurrentlyOpen) {
            await this.audioManager.tryResumeContext();
        }

        this.globalUIManager.toggleOptionsMenu(!isCurrentlyOpen);
        this.audioManager.playSound(!isCurrentlyOpen ? 'ui_confirm' : 'ui_cancel');
        
        this.updateBackdropAndFadeState();
    }

    private async closeOptionsMenu(): Promise<void> { // Convertido a async
        const wasMenuOpen = this.globalUIManager.isOptionsMenuOpen();
        if (wasMenuOpen) {
            // No es necesario tryResumeContext aquí ya que estamos cerrando.
            this.globalUIManager.toggleOptionsMenu(false);
            // El sonido ya se maneja en toggleOptionsMenu o debería ser consistente.
            // this.audioManager.playSound('ui_cancel'); // Podría ser redundante si toggleOptionsMenu lo hace
            this.updateBackdropAndFadeState();
        } else {
            this.updateBackdropAndFadeState(); 
        }
    }
    
    public async handleShopButtonInteraction(): Promise<void> { // Convertido a async
        // Intenta resumir el contexto de audio ANTES de cualquier lógica de la tienda o reproducción de sonido.
        await this.audioManager.tryResumeContext();

        if (!this.shopManager.isShopOpen()) {
             this.shopManager.openShop();
             this.audioManager.playSound('ui_confirm'); // Reproduce el sonido después de intentar resumir
             this.updateBackdropAndFadeState();
        }
    }

    public async handleShopCloseRequest(): Promise<void> { // Convertido a async
        if (this.shopManager.isShopOpen()) {
            // No es estrictamente necesario tryResumeContext al cerrar, pero no hace daño.
            // await this.audioManager.tryResumeContext(); 
            this.shopManager.closeShop();
            this.audioManager.playSound('ui_cancel');
            this.updateBackdropAndFadeState();
        }
    }
    
    public async openShop(): Promise<void> { // Convertido a async
        // Intenta resumir el contexto de audio ANTES de cualquier lógica de la tienda o reproducción de sonido.
        await this.audioManager.tryResumeContext();

        if (this.shopManager && !this.shopManager.isShopOpen()) {
            this.shopManager.openShop();
            this.audioManager.playSound('ui_confirm');
            this.updateBackdropAndFadeState();
        }
    }

    private updateGlobalButtonsState(): void {
        const shopIsOpen = this.shopManager.isShopOpen();
        const optionsAreOpen = this.globalUIManager.isOptionsMenuOpen();
        const isModuleOverlayVisible = this.isGamePausedForOverlay();
        const isAnyPopupBlockingInteractions = shopIsOpen || optionsAreOpen || isModuleOverlayVisible || this.isCatBeingDragged;

        const currentStateName = this.stateMachine.getCurrentStateName();
        const isGameplayActive = currentStateName === 'QuizGameplay';

        this.globalUIManager.setShopButtonDisabled(isAnyPopupBlockingInteractions || !isGameplayActive);
        this.globalUIManager.showShopButton(isGameplayActive); 

        this.globalUIManager.setOptionsButtonDisabled(isAnyPopupBlockingInteractions || !isGameplayActive);
        this.globalUIManager.showOptionsButton(isGameplayActive);

        this.toolManager.updateToolButtonActiveStates();
    }

    private addThemeChangeListener(): void {
        this.removeThemeChangeListener(); 
        this.themeChangeListener = (_event: Event) => {
            const currentState = this.stateMachine.getCurrentState() as any;
            if (currentState && typeof currentState.rebuildInterface === 'function') {
                currentState.rebuildInterface();
            } else if (currentState?.quizModule && typeof currentState.quizModule.rebuildUI === 'function') {
                currentState.quizModule.rebuildUI();
            }

            if (this.shopManager.isShopOpen()) {
                this.shopManager.updateShopUI();
            }
            const optionsPopup = document.getElementById('options-menu-popup-global') as OptionsMenuPopup | null;
            if (optionsPopup?.isVisible) {
                optionsPopup.requestUpdate(); 
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
        this.keydownListener = async (event: KeyboardEvent) => { // Convertido a async
            if (event.key === 'Escape') {
                if (this.globalUIManager.isOptionsMenuOpen()) { await this.closeOptionsMenu(); return; }
                if (this.shopManager.isShopOpen()) { 
                    await this.handleShopCloseRequest();
                    return; 
                }
                const currentState = this.stateMachine.getCurrentState() as any;
                const currentModule = currentState?.quizModule as QuizGameModule | null;
                if (currentModule && typeof currentModule.handleEscapeKey === 'function') {
                    if (currentModule.handleEscapeKey()) { 
                        this.updateBackdropAndFadeState();
                        return;
                    }
                }
            }
            const isAnyPopupTrulyOpen = this.shopManager.isShopOpen() ||
                                      this.globalUIManager.isOptionsMenuOpen() ||
                                      this.isGamePausedForOverlay();
            if (isAnyPopupTrulyOpen || this.isCatBeingDragged) return;
            
            // Intenta resumir el contexto de audio en otras interacciones de teclado si es relevante
            // await this.audioManager.tryResumeContext(); // Considera si esto es necesario para cada tecla

            const currentStateName = this.stateMachine.getCurrentStateName();
            if (currentStateName === 'QuizGameplay') {
                switch (event.key.toLowerCase()) {
                    case 'b': this.toolManager.activateBrush(); break;
                    case 'c':
                        if (this.playerData.isDrawingUnlocked && this.playerData.inkSpentSinceLastClear > 0) {
                            this.inkManager.clearInkLines();
                        }
                        break;
                    case 'f': this.toolManager.activateCatFood(); break;
                    case 's': 
                        const shopBtn = document.getElementById('shop-button-global') as ShopButtonComponent | null;
                        if (shopBtn && !shopBtn.disabled) await this.handleShopButtonInteraction();
                        break;
                    case 'o': 
                        const optionsBtn = document.getElementById('settings-options-button-global') as OptionsButtonComponent | null;
                        if (optionsBtn && !optionsBtn.disabled) await this.toggleOptionsMenu();
                        break;
                    case 't': 
                        await this.audioManager.tryResumeContext(); // Específico para acción con sonido
                        this.themeManager.cycleTheme(); this.audioManager.playSound('ui_select'); 
                        break;
                }
            } else if (['MainMenu', 'GameOver', 'Results'].includes(currentStateName || '')) {
                 if (event.key.toLowerCase() === 't') { 
                    await this.audioManager.tryResumeContext(); // Específico para acción con sonido
                    this.themeManager.cycleTheme(); this.audioManager.playSound('ui_select'); 
                }
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

        const shopButton = document.getElementById('shop-button-global') as ShopButtonComponent | null;
        if (shopButton) {
            this.shopButtonInteractionListener = () => this.handleShopButtonInteraction(); // Esto ya es async
            shopButton.addEventListener('shop-button-interaction', this.shopButtonInteractionListener);
        }

        const optionsButton = document.getElementById('settings-options-button-global') as OptionsButtonComponent | null;
        if (optionsButton) {
            this.optionsButtonClickListener = () => this.toggleOptionsMenu(); // Esto ya es async
            optionsButton.addEventListener('options-button-clicked', this.optionsButtonClickListener);
        }

        const optionsPopup = document.getElementById('options-menu-popup-global') as OptionsMenuPopup | null;
        if (optionsPopup) {
            this.optionsPopupCloseListener = () => this.closeOptionsMenu(); // Esto ya es async
            optionsPopup.addEventListener('options-close-requested', this.optionsPopupCloseListener);
        }
    }

    private removeGlobalUICListeners(): void {
        const shopButton = document.getElementById('shop-button-global') as ShopButtonComponent | null;
        if (shopButton && this.shopButtonInteractionListener) {
            shopButton.removeEventListener('shop-button-interaction', this.shopButtonInteractionListener);
        }
        this.shopButtonInteractionListener = null;

        const optionsButton = document.getElementById('settings-options-button-global') as OptionsButtonComponent | null;
        if (optionsButton && this.optionsButtonClickListener) {
            optionsButton.removeEventListener('options-button-clicked', this.optionsButtonClickListener);
        }
        this.optionsButtonClickListener = null;

        const optionsPopup = document.getElementById('options-menu-popup-global') as OptionsMenuPopup | null;
        if (optionsPopup && this.optionsPopupCloseListener) {
            optionsPopup.removeEventListener('options-close-requested', this.optionsPopupCloseListener);
        }
        this.optionsPopupCloseListener = null;
    }
    
    public updateInkUI(): void {
        this.toolManager.updateToolButtonActiveStates(); 
        const quizUiInstance = this.getContainerElement().querySelector('quiz-ui-container') as QuizUiContainer | null;
        const quizModule = (this.stateMachine.getCurrentState() as any)?.quizModule as QuizGameModule | null;
        const quizUIManager = quizModule?.quizUIManager as any; 

        if (quizUIManager && typeof quizUIManager.updateInkBar === 'function') {
            quizUIManager.updateInkBar();
            quizUIManager.updateInkVisibility(this.playerData.isDrawingUnlocked);
        }
    }

    public updateExternalLivesUI(): void { 
        const quizModule = (this.stateMachine.getCurrentState() as any)?.quizModule as QuizGameModule | null;
        const quizUIManager = quizModule?.quizUIManager as any;
        if (quizUIManager && typeof quizUIManager.updateLivesInQuizUI === 'function') {
            quizUIManager.updateLivesInQuizUI(this.playerData.lives, this.playerData.hasShield, this.playerData.hintCharges);
        }
        this.globalUIManager.updateLivesDisplay(this.playerData.lives, this.playerData.hasShield, this.playerData.hintCharges);
    }

    public updateExternalShieldUI(isActive: boolean): void { 
        const quizModule = (this.stateMachine.getCurrentState() as any)?.quizModule as QuizGameModule | null;
        const quizUIManager = quizModule?.quizUIManager as any;
        if (quizUIManager && typeof quizUIManager.updateLivesInQuizUI === 'function') {
            quizUIManager.updateLivesInQuizUI(this.playerData.lives, isActive, this.playerData.hintCharges);
        }
        this.globalUIManager.updateShieldIcon(isActive);
    }

    public updateExternalHintUI(charges: number): void { 
        const quizModule = (this.stateMachine.getCurrentState() as any)?.quizModule as QuizGameModule | null;
        const quizUIManager = quizModule?.quizUIManager as any;
        if (quizUIManager && typeof quizUIManager.updateLivesInQuizUI === 'function') {
            quizUIManager.updateLivesInQuizUI(this.playerData.lives, this.playerData.hasShield, charges);
        }
        this.globalUIManager.updateHintIcon(charges);
    }

    public updateExternalScoreUI(): void { 
        const currentState = this.stateMachine.getCurrentState() as any;
        let currentCombo = 0;
        if (currentState instanceof QuizGameplayState && currentState.quizModule) {
            currentCombo = currentState.quizModule.consecutiveCorrectAnswers || 0;
        }
        
        this.globalUIManager.updateScoreDisplay(this.playerData.score, currentCombo);
        
        const quizUIManager = (currentState?.quizModule as QuizGameModule | null)?.quizUIManager;
        if (quizUIManager && typeof quizUIManager.updateScoreInQuizUI === 'function') {
            quizUIManager.updateScoreInQuizUI(this.playerData.score, currentCombo);
        }
    }

    public updateCatFoodUI(): void { 
        this.toolManager.updateCatFoodUIToolButton(); 
        this.toolManager.updateToolButtonActiveStates(); 
    }

    public setCatDragState(isDragging: boolean): void {
        this.isCatBeingDragged = isDragging;
        this.updateGlobalButtonsState(); 
        if (this.drawingCanvasLayerElement) {
            this.drawingCanvasLayerElement.isPointerLockdown = isDragging;
        }
    }

    public isACatBeingDragged(): boolean {
        return this.isCatBeingDragged;
    }
    
    public getLives(): number { return this.playerData.lives; }
    public decrementLives(): void { 
        if (this.playerData.lives > 0) {
            this.playerData.lives--;
            this.updateExternalLivesUI();
        }
    }
    public incrementLives(): void { 
        this.playerData.lives++;
        this.updateExternalLivesUI();
    }
    public enableDrawingFeature(): boolean { 
        try {
            this.toolManager.updateControlVisibilityBasedOnUnlocks();
            this.toolManager.updateToolButtonActiveStates();
            this.updateInkUI();
            return true;
        } catch(e) { console.error("GameManager: Error habilitando la función de dibujo:", e); return false; }
    }
    public enableCatFoodFeature(): void { 
        try {
            this.catFoodManager.enable(); 
            this.toolManager.updateControlVisibilityBasedOnUnlocks();
            this.toolManager.updateToolButtonActiveStates();
            this.updateCatFoodUI();
        } catch(e) { console.error("GameManager: Error habilitando la función de comida para gatos:", e); }
    }

    public moduleFinished(result?: { gameOver?: boolean, score?: number, correct?: number, total?: number, isNewHighScore?: boolean }): void {
        console.log("[GameManager] moduleFinished llamado con resultado:", result);
        const finalScore = result?.score !== undefined ? result.score : this.playerData.score;
        let isNewHighScoreCalculated = false; 
        if (result?.isNewHighScore !== undefined) {
            isNewHighScoreCalculated = result.isNewHighScore;
        }

        if (result?.gameOver) {
            this.stateMachine.changeState('GameOver', {
                score: finalScore,
                isNewHighScore: isNewHighScoreCalculated
            }, 'gq-wipe-transition');
        } else {
            this.stateMachine.changeState('Results', {
                score: finalScore,
                correct: result?.correct ?? 0,
                total: result?.total ?? 0,
                isNewHighScore: isNewHighScoreCalculated
            }, 'gq-wipe-transition');
        }
    }
}
