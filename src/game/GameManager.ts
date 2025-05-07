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
// Importar los archivos de los componentes para asegurar su registro (efecto secundario)
import './components/ui/tool-button.ts';
import './components/ui/combo-counter.ts';
import './components/ui/cat-display-area.ts'; // <--- IMPORTANTE: Asegurar registro
import './components/ui/drawing-canvas-layer.ts';
import './components/ui/shop-button.ts';
import './components/ui/shop-popup.ts'; // Aunque se obtiene por ID, su definición debe cargarse
import './components/ui/main-menu-screen.ts'; // Para cuando StateMachine lo crea
import './components/ui/quiz-ui-container.ts'; // Para cuando StateMachine lo crea
import './components/ui/diagonal-wipe.ts'; 

// Importar tipos después de los componentes
import type { ToolButton } from './components/ui/tool-button';
import type { CatDisplayArea } from './components/ui/cat-display-area';
import type { QuizUiContainer } from './components/ui/quiz-ui-container';
import type { DrawingCanvasLayer } from './components/ui/drawing-canvas-layer';
import type { ShopButtonComponent } from './components/ui/shop-button';
import type { ShopPopup } from './components/ui/shop-popup';
import type { MainMenuScreen } from './components/ui/main-menu-screen';
import type { DiagonalWipe } from './components/ui/diagonal-wipe'; 

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

/**
 * GameManager: Orquesta todos los sistemas, la máquina de estados y el ciclo de vida del juego.
 */
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
    private containerElement: HTMLElement; // El elemento #app, usado para transiciones
    private gameUiContainer: QuizUiContainer | null = null; // Contenedor específico del UI del Quiz
    private diagonalWipeElement: DiagonalWipe | null = null; // Referencia al componente Lit de barrido

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

    // --- Mensajes de Carga ---
    private loadingMessages: string[] = ["Desenredando la diversión..."];

    // --- Constantes y Debounce ---
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
        if (!this.diagonalWipeElement) {
            console.error("GameManager CRITICAL: Componente <diagonal-wipe id='diagonal-wipe-transition-element'> no encontrado en el DOM.");
        } else {
             // Verificar que sea realmente una instancia de DiagonalWipe
             if (!(this.diagonalWipeElement instanceof HTMLElement && 'playIn' in this.diagonalWipeElement && 'playOut' in this.diagonalWipeElement)) {
                console.error("GameManager CRITICAL: diagonalWipeElement NO es una instancia válida de DiagonalWipe. Métodos playIn/playOut faltantes.", this.diagonalWipeElement);
                this.diagonalWipeElement = null; // Anular si no es válido para evitar errores posteriores
             }
        }
        this.stateMachine.setWipeComponent(this.diagonalWipeElement); 

        const catDisplayArea = document.getElementById('cat-display-area-main') as CatDisplayArea | null;
        if (!catDisplayArea) {
            console.error("GameManager CRITICAL: <cat-display-area id='cat-display-area-main'> no encontrado.");
            throw new Error("<cat-display-area> no encontrado y es esencial.");
        }
         // Verificar que sea realmente una instancia de CatDisplayArea
        if (!(catDisplayArea instanceof HTMLElement && 'clearAllEntityElements' in catDisplayArea)) {
            console.error("GameManager CRITICAL: catDisplayAreaElement NO es una instancia válida de CatDisplayArea. Método clearAllEntityElements faltante.", catDisplayArea);
            throw new Error("catDisplayAreaElement no es una instancia válida de CatDisplayArea.");
        }
        this.catDisplayAreaElement = catDisplayArea;


        this.drawingCanvasLayerElement = document.getElementById('drawing-canvas-layer-main') as DrawingCanvasLayer | null;
        if (this.drawingCanvasLayerElement && !(this.drawingCanvasLayerElement instanceof HTMLElement && 'resizeCanvas' in this.drawingCanvasLayerElement)) {
            console.warn("GameManager: drawingCanvasLayerElement no parece ser una instancia válida de DrawingCanvasLayer.");
            // Podría no ser crítico si no se usa inmediatamente o si se setea más tarde.
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
        this.hideToolControls();    
        this.hideShopButton();      
        this.addThemeChangeListener(); 
        await this.preload();       
        this.setupToolButtonListeners(); 
        this.addKeyboardListener();  
    }

    public create(): void {
        this.quizSystem.resetAvailableQuestions(); 
        this.catManager.removeAllCats();           
        this.hideToolControls();                   
        this.hideShopButton();                     
        
        if (!document.querySelector('combo-counter')) {
             document.body.appendChild(document.createElement('combo-counter'));
        }
        this.stateMachine.changeState('MainMenu', undefined, 'gq-wipe-transition');
    }

    private setupStates(): void {
        const loadingState = new LoadingState(this);
        const mainMenuState = new MainMenuState(this);
        const quizGameplayState = new QuizGameplayState(this);
        const resultsState = new ResultsState(this);
        const gameOverState = new GameOverState(this);
    
        const wrapEnter = (state: IState, showShopBtn: boolean, showToolCtrl: boolean) => {
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
    
                if (showToolCtrl) {
                    this.showToolControls();
                    if (state instanceof QuizGameplayState) { 
                        this.updateCatFoodUI(); 
                    }
                } else {
                    this.hideToolControls();
                }
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
    
        loadingState.enter = wrapEnter(loadingState, false, false);
        loadingState.exit = wrapExit(loadingState);
        mainMenuState.enter = wrapEnter(mainMenuState, false, false);
        mainMenuState.exit = wrapExit(mainMenuState);
        quizGameplayState.enter = wrapEnter(quizGameplayState, true, true);
        quizGameplayState.exit = wrapExit(quizGameplayState);
        resultsState.enter = wrapEnter(resultsState, false, false); 
        resultsState.exit = wrapExit(resultsState);
        gameOverState.enter = wrapEnter(gameOverState, false, false); 
        gameOverState.exit = wrapExit(gameOverState);
    
        this.stateMachine.addState('Loading', loadingState);
        this.stateMachine.addState('MainMenu', mainMenuState);
        this.stateMachine.addState('QuizGameplay', quizGameplayState);
        this.stateMachine.addState('Results', resultsState);
        this.stateMachine.addState('GameOver', gameOverState);

        this.stateMachine.addState('__shutdown__', {
            enter: () => { this.hideToolControls(); this.hideShopButton(); },
            exit: () => {},
            update: () => {}
        });
    }

    public async preload(): Promise<void> {
        const baseUrl = import.meta.env.BASE_URL; 
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl; 
        
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
    }

    public stop(): void {
        if (!this.isRunning) return;
        this.isRunning = false;
        if (this.gameLoopRequestId) {
            cancelAnimationFrame(this.gameLoopRequestId); 
        }
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
            console.error("Error en gameLoop update:", error);
            this.stop(); 
        }
    }

    public shutdown(): void {
        this.stop(); 
        this.hideToolControls(); 
        this.hideShopButton();
        this.removeKeyboardListener(); 
        this.removeThemeChangeListener();
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

    private showShopButton(): void {
        if (!this.shopButtonInstance) { 
            const shopButton = document.createElement('shop-button-component') as ShopButtonComponent;
            shopButton.id = 'shop-button-global'; 
            shopButton.titleText = "Abrir Tienda (S)"; 
            document.body.appendChild(shopButton);
            this.shopButtonInstance = shopButton;

            this.shopButtonInteractionListener = () => this.handleShopButtonInteraction();
            shopButton.addEventListener('shop-button-interaction', this.shopButtonInteractionListener);
        }
        
        this.shopButtonInstance.classList.remove('hidden'); 
        
        this.updateShopButtonState(); 
        const popup = this.shopManager.getShopPopupElement();
        if (popup) this.addShopCloseListener(popup);
    }

    private hideShopButton(): void {
        if (this.shopButtonInstance) {
            this.removeShopButtonListener(); 
            const popup = this.shopManager.getShopPopupElement();
            if(popup) this.removeShopCloseListener(popup);

            this.shopButtonInstance.classList.add('hidden'); 
        }
    }

    private handleShopButtonInteraction(): void {
        const audioManager = this.getAudioManager();
        if (!audioManager.isReady()) { audioManager.init(); }

        if (!this.shopManager.isShopOpen()) {
             this.openShop(); 
             audioManager?.playSound('ui_confirm');
        }
    }

    private removeShopButtonListener(): void {
        if (this.shopButtonInstance && this.shopButtonInteractionListener) {
            this.shopButtonInstance.removeEventListener('shop-button-interaction', this.shopButtonInteractionListener);
            this.shopButtonInteractionListener = null;
        }
    }

    private handleShopCloseRequest(): void {
        this.closeShop();
        this.getAudioManager().playSound('ui_cancel');
    }
    
    private addShopCloseListener(popupElement: ShopPopup): void {
        this.removeShopCloseListener(popupElement); 
        this.shopCloseRequestListener = () => this.handleShopCloseRequest();
        popupElement.addEventListener('close-requested', this.shopCloseRequestListener);
    }
    
     private removeShopCloseListener(popupElement: ShopPopup): void {
         if (popupElement && this.shopCloseRequestListener) {
             popupElement.removeEventListener('close-requested', this.shopCloseRequestListener);
             this.shopCloseRequestListener = null;
         }
     }

    public openShop(): void {
        this.shopManager.openShop(); 
        const popup = this.shopManager.getShopPopupElement();
        if(popup) {
            popup.classList.remove('hidden'); 
            this.addShopCloseListener(popup);
        }
        this.updateShopButtonState(); 
    }

    public closeShop(): void {
        this.shopManager.closeShop(); 
        const popup = this.shopManager.getShopPopupElement();
        if(popup) {
             // popup.classList.add('hidden'); // Opcional
        }
        requestAnimationFrame(() => { 
             this.updateShopButtonState(); 
        });
    }

    private updateShopButtonState(): void {
        if (this.shopButtonInstance) {
            this.shopButtonInstance.disabled = this.shopManager.isShopOpen();
        }
    }

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
                if (this.shopManager.isShopOpen()) {
                    this.closeShop();
                    this.audioManager.playSound('ui_cancel');
                    return; 
                }
                const explanationOverlay = document.getElementById('explanation-overlay');
                if (explanationOverlay && explanationOverlay.classList.contains('visible') && !explanationOverlay.classList.contains('hidden')) {
                    return;
                }
            }

            if (this.shopManager.isShopOpen()) return;
            const explanationOverlay = document.getElementById('explanation-overlay');
            if (explanationOverlay && explanationOverlay.classList.contains('visible') && !explanationOverlay.classList.contains('hidden')) return;


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
                    case 't': this.themeManager.cycleTheme(); break;
                }
            } else if (['MainMenu', 'GameOver', 'Results'].includes(currentStateName || '')) {
                 if (event.key.toLowerCase() === 't') {
                    this.themeManager.cycleTheme();
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
            this.inkManager.init(); 
            this.updateInkUI(); 
            this.updateControlVisibilityBasedOnUnlocks(); 
            return true;
        } catch(e) {
            console.error("GameManager: Error habilitando dibujo:", e);
            return false;
        }
    }
    public enableCatFoodFeature(): void {
        try {
            this.catFoodManager.enable();
            this.updateCatFoodUI(); 
            this.updateControlVisibilityBasedOnUnlocks(); 
        } catch(e) {
            console.error("GameManager: Error habilitando comida:", e);
        }
    }

    public updateInkUI(): void { this.uiManager.updateInkVisibility(this.playerData.isDrawingUnlocked); this.uiManager.updateInkBar(); this.updateToolButtonStates(); }
    public updateExternalLivesUI(): void { this.uiManager.updateLivesDisplay(this.playerData.lives); }
    public updateExternalShieldUI(isActive: boolean): void { this.uiManager.updateShieldIcon(isActive); }
    public updateExternalHintUI(charges: number): void { this.uiManager.updateHintIcon(charges); }
    public updateExternalScoreUI(): void { this.uiManager.updateScoreDisplay(this.playerData.score); }
    public updateCatFoodUI(): void {
        this.uiManager.updateCatFoodBar(this.playerData.currentCatFood, this.playerData.getMaxCatFood());
        this.updateToolButtonStates(); 
    }

    public activateBrush(): void {
        const now = Date.now();
        if (now - this._lastToolToggleTime < this.TOOL_TOGGLE_DEBOUNCE_MS) return;
        this._lastToolToggleTime = now;

        if (!this.playerData.isDrawingUnlocked) return;
        if (this.catFoodManager.isActive) this.catFoodManager.toggleActive(false); 
        this.inkManager.toggleBrush(); 
    }

    public activateCatFood(): void {
        const now = Date.now();
        if (now - this._lastToolToggleTime < this.TOOL_TOGGLE_DEBOUNCE_MS) return;
        this._lastToolToggleTime = now;

        if (!this.playerData.isCatFoodUnlocked) return;
        if (this.inkManager.isBrushActive) this.inkManager.toggleBrush(false); 
        this.catFoodManager.toggleActive(); 
    }

    public updateToolButtonStates(): void {
        if (this.controlElements.brushToolButton) {
            this.controlElements.brushToolButton.active = this.inkManager.isBrushActive;
            this.controlElements.brushToolButton.disabled = !this.playerData.isDrawingUnlocked || (this.playerData.currentInk <= 0 && !this.inkManager.isBrushActive);
        }
        if (this.controlElements.clearInkToolButton) {
            this.controlElements.clearInkToolButton.disabled = !this.playerData.isDrawingUnlocked || this.playerData.inkSpentSinceLastClear <= 0;
        }
        if (this.controlElements.catFoodToolButton) {
            this.controlElements.catFoodToolButton.active = this.catFoodManager.isActive;
            this.controlElements.catFoodToolButton.disabled = !this.playerData.isCatFoodUnlocked || (this.playerData.currentCatFood <= 0 && !this.catFoodManager.isActive);
        }
        this.updateShopButtonState();
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

    // --- Getters públicos ---
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
