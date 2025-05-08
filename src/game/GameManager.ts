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
    drawingButtonsContainer: HTMLElement | null; // Referencia al contenedor específico
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

        // Inicialización de sistemas (orden puede importar)
        this.audioManager = new AudioManager();
        this.quizSystem = new QuizSystem();
        this.playerData = new PlayerData();
        this.themeManager = new ThemeManager('body'); // Aplica temas al body
        this.catManager = new CatManager(this.audioManager, this);
        this.uiManager = new UIManager(this); // UIManager necesita GameManager
        this.shopManager = new ShopManager(this.playerData, this); // ShopManager necesita PlayerData y GameManager
        this.inkManager = new InkManager(this); // InkManager necesita GameManager (para PlayerData y UIManager)
        this.catFoodManager = new CatFoodManager(this); // CatFoodManager necesita GameManager
        this.physicsManager = new PhysicsManager(this.catManager, this.catFoodManager, this); // PhysicsManager necesita CatManager, CatFoodManager y GameManager

        // Configuración de StateMachine
        this.stateMachine = new StateMachine();
        this.stateMachine.setAnimationContainer(this.containerElement); // Usar #app para transiciones

        // Obtener wipe component
        this.diagonalWipeElement = document.getElementById('diagonal-wipe-transition-element') as DiagonalWipe | null;
        if (!this.diagonalWipeElement || !(this.diagonalWipeElement instanceof HTMLElement && 'playIn' in this.diagonalWipeElement)) {
            console.error("GameManager CRITICAL: Componente <diagonal-wipe id='diagonal-wipe-transition-element'> no encontrado o inválido.");
            this.diagonalWipeElement = null;
        }
        this.stateMachine.setWipeComponent(this.diagonalWipeElement);

        // Obtener Cat Display Area
        const catDisplayArea = document.getElementById('cat-display-area-main') as CatDisplayArea | null;
        if (!catDisplayArea || !(catDisplayArea instanceof HTMLElement && 'clearAllEntityElements' in catDisplayArea)) {
            console.error("GameManager CRITICAL: <cat-display-area id='cat-display-area-main'> no encontrado o inválido.");
            throw new Error("<cat-display-area> no encontrado y es esencial.");
        }
        this.catDisplayAreaElement = catDisplayArea;

        // Obtener Drawing Canvas Layer
        this.drawingCanvasLayerElement = document.getElementById('drawing-canvas-layer-main') as DrawingCanvasLayer | null;
        if (this.drawingCanvasLayerElement && !(this.drawingCanvasLayerElement instanceof HTMLElement && 'resizeCanvas' in this.drawingCanvasLayerElement)) {
            console.warn("GameManager: drawingCanvasLayerElement no parece ser una instancia válida de DrawingCanvasLayer.");
        }

        // Establecer dependencias cruzadas
        this.catManager.setCatDisplayArea(this.catDisplayAreaElement);
        this.catFoodManager.setCatDisplayArea(this.catDisplayAreaElement); // CatFood necesita el área también
        this.catManager.setPhysicsManager(this.physicsManager);
        this.inkManager.setPhysicsManager(this.physicsManager); // InkManager necesita PhysicsManager

        // Referencias a elementos de control
        this.controlElements = {
            controlsContainer: document.getElementById('right-controls'),
            drawingButtonsContainer: document.getElementById('drawing-buttons-container'), // Obtener referencia al nuevo contenedor
            catFoodUiContainer: document.getElementById('cat-food-ui-container'),
            brushToolButton: document.querySelector<ToolButton>('tool-button[toolId="brush"]'),
            clearInkToolButton: document.querySelector<ToolButton>('tool-button[toolId="clear-ink"]'),
            catFoodToolButton: document.querySelector<ToolButton>('tool-button[toolId="cat-food"]'),
        };

        // Verificar que los elementos existen (opcional pero recomendado)
        if (!this.controlElements.controlsContainer ||
            !this.controlElements.drawingButtonsContainer || // Verificar el nuevo contenedor
            !this.controlElements.catFoodUiContainer ||
            !this.controlElements.brushToolButton ||
            !this.controlElements.clearInkToolButton ||
            !this.controlElements.catFoodToolButton) {
            console.warn("GameManager: Uno o más elementos de control UI no fueron encontrados en el DOM.");
        }

        this.setupStates(); // Configurar la máquina de estados
    }

    /** Aplica/remueve la clase de estado al body */
    public setBodyStateClass(stateName: string | null): void {
        const body = document.body;
        // Remover clases de estado anteriores
        body.className.split(' ').forEach(cls => {
            if (cls.startsWith('state-')) {
                body.classList.remove(cls);
            }
        });
        // Añadir nueva clase si hay un nombre de estado
        if (stateName) {
            body.classList.add(`state-${stateName.toLowerCase()}`);
        }
    }

    /** Inicializa sistemas básicos y precarga assets */
    public async init(): Promise<void> {
        this.playerData.reset(); // Asegurar que PlayerData esté limpio al inicio
        this.physicsManager.init(this.catDisplayAreaElement); // Inicializar físicas con el área correcta
        this.catFoodManager.init(); // Inicializar gestor de comida
        this.hideToolControls();    // Ocultar controles de herramientas inicialmente
        this.hideShopButton();      // Ocultar botón de tienda inicialmente
        this.addThemeChangeListener(); // Escuchar cambios de tema
        await this.preload();       // Cargar datos (preguntas, plantillas, etc.)
        this.setupToolButtonListeners(); // Configurar listeners para botones de herramientas
        this.addKeyboardListener();  // Configurar listeners de teclado
    }

    /** Configura el juego para un nuevo inicio (usualmente transiciona a MainMenu) */
    public create(): void {
        console.log("GameManager: create() - Iniciando reseteo..."); 
        this.quizSystem.resetAvailableQuestions(); 
        this.catManager.removeAllCats();           
        
        if (this.shopManager) {
             this.shopManager.closeShop(); // Asegura que isVisible sea false
             console.log("GameManager: create() - ShopManager.closeShop() llamado."); 
        } else {
             console.warn("GameManager: create() - ShopManager no disponible para cerrar tienda."); 
        }
        
        // Ocultar botones (esto llamará a updateShopButtonState internamente si es necesario)
        this.hideToolControls(); 
        this.hideShopButton();   
        
        if (!document.querySelector('combo-counter')) {
             document.body.appendChild(document.createElement('combo-counter'));
        }
        
        this.stateMachine.changeState('MainMenu', undefined, 'gq-wipe-transition'); 
        console.log("GameManager: create() - Reseteo completado, transicionando a MainMenu."); 
    }


    /** Configura los estados y sus wrappers para gestionar UI común */
    private setupStates(): void {
        // Crear instancias de todos los estados
        const loadingState = new LoadingState(this);
        const mainMenuState = new MainMenuState(this);
        const quizGameplayState = new QuizGameplayState(this);
        const resultsState = new ResultsState(this);
        const gameOverState = new GameOverState(this);

        // Wrapper para el método enter de cada estado
        const wrapEnter = (state: IState, showShopBtn: boolean, showToolCtrl: boolean) => {
            const originalEnter = state.enter.bind(state); // Guardar referencia al método original
            return (params?: any) => {
                // Ejecutar lógica original de enter
                try { originalEnter(params); }
                catch (e) { console.error(`Error en enter() para ${state.constructor.name}:`, e); }

                // Lógica común de GameManager al entrar a un estado
                if (state instanceof QuizGameplayState) {
                    // Obtener referencia al contenedor UI del quiz cuando se entra a este estado
                    this.gameUiContainer = this.containerElement.querySelector('quiz-ui-container');
                } else if (state instanceof MainMenuState) {
                    // Pasar mensajes de carga al componente del menú principal
                    const mainMenuElement = this.containerElement.querySelector('main-menu-screen') as MainMenuScreen | null;
                    if (mainMenuElement) {
                        mainMenuElement.loadingMessages = this.getLoadingMessages();
                    }
                }

                // Mostrar/ocultar botón de tienda
                if (showShopBtn) this.showShopButton();
                else this.hideShopButton();

                // Mostrar/ocultar controles de herramientas
                if (showToolCtrl) {
                    this.showToolControls();
                    // Si estamos en gameplay, actualizar UI de comida
                    if (state instanceof QuizGameplayState) {
                        this.updateCatFoodUI();
                    }
                } else {
                    this.hideToolControls();
                }
            };
        };

        // Wrapper para el método exit de cada estado
        const wrapExit = (state: IState) => {
            const originalExit = state.exit.bind(state); // Guardar referencia al método original
            return () => {
                // Ejecutar lógica original de exit
                try { originalExit(); }
                catch (e) { console.error(`Error en exit() para ${state.constructor.name}:`, e); }
                // Lógica común de GameManager al salir de un estado
                if (state instanceof QuizGameplayState) {
                    this.gameUiContainer = null; // Limpiar referencia al salir del gameplay
                }
            };
        };

        // Aplicar wrappers a los métodos enter/exit de cada estado
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

        // Añadir estados a la máquina de estados
        this.stateMachine.addState('Loading', loadingState);
        this.stateMachine.addState('MainMenu', mainMenuState);
        this.stateMachine.addState('QuizGameplay', quizGameplayState);
        this.stateMachine.addState('Results', resultsState);
        this.stateMachine.addState('GameOver', gameOverState);

        // Estado especial para shutdown (limpieza)
        this.stateMachine.addState('__shutdown__', {
            enter: () => { this.hideToolControls(); this.hideShopButton(); },
            exit: () => {},
            update: () => {}
        });
    }

    /** Carga los archivos JSON necesarios */
    public async preload(): Promise<void> {
        const baseUrl = import.meta.env.BASE_URL; // Obtener base URL de Vite
        // Asegurarse que no haya doble barra al inicio si BASE_URL es solo '/'
        const cleanBaseUrl = baseUrl === '/' ? '' : (baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl);

        const urls = {
            questions: `${cleanBaseUrl}/data/questions.json`,
            templates: `${cleanBaseUrl}/data/cat_templates.json`,
            shopItems: `${cleanBaseUrl}/data/shop_items.json`,
            themes: `${cleanBaseUrl}/data/themes.json`,
            loadingMessages: `${cleanBaseUrl}/data/loading_messages.json`
        };

        console.log("GameManager: Preload - URLs a cargar:", urls);

        try {
            const responses = await Promise.all(Object.values(urls).map(url => fetch(url)));

            // Verificar respuestas HTTP
            responses.forEach((res, i) => {
                if (!res.ok) throw new Error(`HTTP ${res.status} cargando ${Object.values(urls)[i]}`);
            });

            // Parsear JSON
            const [questionData, templateData, shopItemJsonData, themeData, loadingMessagesData] = await Promise.all(responses.map(res => res.json()));

            // Validar y procesar datos
            if (!Array.isArray(questionData) || !Array.isArray(templateData) ||
                !Array.isArray(shopItemJsonData) || !Array.isArray(themeData) ||
                !Array.isArray(loadingMessagesData)) {
                throw new Error('Formato de datos JSON inválido.');
            }
            if (!(await this.quizSystem.loadQuestionsData(questionData))) throw new Error("Fallo al procesar preguntas.");
            this.catManager.loadTemplates(templateData as CatTemplate[]);
            this.shopManager.init(shopItemJsonData as ShopItemJsonData[]); // Inicializar ShopManager con los items
            if (!(await this.themeManager.loadThemesData(themeData as Theme[]))) throw new Error("Fallo al procesar temas.");

            this.loadingMessages = loadingMessagesData as string[];
            if (this.loadingMessages.length === 0) { // Fallback si el archivo está vacío
                this.loadingMessages = ["Cargando michi-diversión..."];
            }
             console.log("GameManager: Preload completado exitosamente.");

        } catch (error: any) {
            console.error('GameManager: Error durante preload:', error);
            this.containerElement.innerHTML = `Error cargando assets: ${error.message}. Revisa la consola.`;
            throw error; // Re-lanzar para detener la inicialización
        }
    }

    /** Inicia el ciclo de juego */
    public start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTimestamp = performance.now(); // Iniciar timestamp
        this.physicsManager.start(); // Iniciar el motor de físicas
        // Iniciar el ciclo de juego principal
        this.gameLoopRequestId = requestAnimationFrame(this.gameLoop.bind(this));
        console.log("GameManager: Ciclo de juego iniciado.");
    }

    /** Detiene el ciclo de juego */
    public stop(): void {
        if (!this.isRunning) return;
        this.isRunning = false;
        if (this.gameLoopRequestId) {
            cancelAnimationFrame(this.gameLoopRequestId); // Detener el ciclo de animación
        }
        this.gameLoopRequestId = undefined;
        this.physicsManager.stop(); // Detener el motor de físicas
        console.log("GameManager: Ciclo de juego detenido.");
    }

    /** Ciclo principal del juego */
    private gameLoop(timestamp: number): void {
        if (!this.isRunning) return;

        // Calcular deltaTime
        const deltaTime = (timestamp - this.lastTimestamp) / 1000.0; // DeltaTime en segundos
        this.lastTimestamp = timestamp;
        // Limitar deltaTime para evitar saltos grandes si la pestaña pierde foco
        const clampedDeltaTime = Math.min(deltaTime, 0.1); // Máximo 100ms (10 FPS)

        // Actualizar sistemas y estado actual
        this.update(clampedDeltaTime);

        // Solicitar el siguiente frame
        this.gameLoopRequestId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    /** Actualiza todos los sistemas relevantes en cada frame */
    public update(deltaTime: number): void {
        try {
            this.stateMachine.update(deltaTime); // Actualizar lógica del estado actual
            this.catManager.updateCats(deltaTime); // Actualizar gatos (posición visual, etc.)
            this.catFoodManager.update(deltaTime); // Actualizar pellets de comida
            // PhysicsManager se actualiza internamente por su Runner
        } catch (error) {
            console.error("Error en gameLoop update:", error);
            this.stop(); // Detener el juego si hay un error crítico
        }
    }

    /** Detiene y limpia todos los sistemas y listeners */
    public shutdown(): void {
        console.log("GameManager: Iniciando shutdown...");
        this.stop(); // Detener ciclo de juego y físicas
        this.hideToolControls(); // Ocultar controles
        this.hideShopButton(); // Ocultar botón de tienda
        this.removeKeyboardListener(); // Limpiar listener de teclado
        this.removeThemeChangeListener(); // Limpiar listener de tema
        this.physicsManager.shutdown(); // Limpiar mundo físico y listeners

        // Salir del estado actual y transicionar a estado de shutdown
        const currentStateName = this.stateMachine.getCurrentStateName();
        if (currentStateName && currentStateName !== '__shutdown__') {
            try { this.stateMachine.getCurrentState()?.exit(); }
            catch (e) { console.warn("Error en exit() del estado durante shutdown:", e) }
        }
        this.stateMachine.changeState('__shutdown__'); // Estado vacío para limpiar

        // Limpiar otros sistemas y elementos
        this.catManager.removeAllCats(); // Eliminar entidades de gato
        this.inkManager.destroy();       // Limpiar InkManager
        this.shopManager.destroy();      // Limpiar ShopManager
        this.catFoodManager.destroy();   // Limpiar CatFoodManager

        this.containerElement.innerHTML = ''; // Limpiar contenedor principal
        this.gameUiContainer = null;          // Limpiar referencia a UI del quiz
        this.setBodyStateClass(null);         // Limpiar clase de estado del body
        document.querySelector('combo-counter')?.remove(); // Remover contador de combo
        this.diagonalWipeElement?.reset(); // Resetear barrido diagonal

        console.log("GameManager: Shutdown completado.");
    }

    // --- Getters públicos para acceder a los sistemas y elementos ---
    public getUIManager(): UIManager {
        if (!this.uiManager) throw new Error("UIManager no inicializado en GameManager.");
        return this.uiManager;
    }
    public getQuizUiContainerElement(): QuizUiContainer | null {
        // Intenta obtener la referencia si es nula o no está en el DOM
        if (!this.gameUiContainer || !this.containerElement.contains(this.gameUiContainer)) {
            this.gameUiContainer = this.containerElement.querySelector('quiz-ui-container');
        }
        return this.gameUiContainer;
    }

    /** Aplica/remueve la clase 'faded' al contenedor UI del quiz */
    public setQuizUiFaded(isFaded: boolean): void {
        const quizUi = this.getQuizUiContainerElement();
        if (quizUi) { quizUi.isFaded = isFaded; }
    }

    /** Notifica a los componentes relevantes sobre el estado de arrastre de un gato */
    public setCatDragState(isDragging: boolean): void {
        this.setQuizUiFaded(isDragging); // Atenuar UI del quiz
        // Bloquear/desbloquear canvas de dibujo si existe
        if (this.drawingCanvasLayerElement) {
            this.drawingCanvasLayerElement.isPointerLockdown = isDragging;
            // Si se deja de arrastrar, actualizar el estado del canvas (por si el pincel estaba activo)
            if (!isDragging && this.inkManager) { this.inkManager.updateCanvasActiveState(); }
        }
    }
    
/**
     * Realiza un reseteo completo de los sistemas del juego a su estado inicial,
     * ideal para llamar después de un Game Over o para reiniciar la experiencia.
     * Transiciona al MainMenuState después del reseteo.
     */
public resetGame(): void {
    console.log("GameManager: resetGame() - Iniciando reseteo completo...");

    // 1. Detener el ciclo de juego si está corriendo
    this.stop(); // Detiene el requestAnimationFrame y el runner de físicas

    // 2. Resetear datos del jugador
    if (this.playerData) {
        this.playerData.reset();
        console.log("GameManager: resetGame() - PlayerData reseteado.");
    } else {
        console.warn("GameManager: resetGame() - PlayerData no disponible para resetear.");
    }

    // 3. Resetear sistema de preguntas
    if (this.quizSystem) {
        this.quizSystem.resetAvailableQuestions();
        console.log("GameManager: resetGame() - QuizSystem reseteado.");
    } else {
        console.warn("GameManager: resetGame() - QuizSystem no disponible para resetear.");
    }

    // 4. Limpiar sistemas con estado persistente
    if (this.catManager) {
        this.catManager.removeAllCats(); // Esto también debería limpiar cuerpos físicos asociados
        console.log("GameManager: resetGame() - CatManager.removeAllCats() llamado.");
    } else {
         console.warn("GameManager: resetGame() - CatManager no disponible.");
    }
    if (this.inkManager) {
        this.inkManager.destroy(); // Limpia líneas, listeners y estado interno
        console.log("GameManager: resetGame() - InkManager.destroy() llamado.");
    } else {
         console.warn("GameManager: resetGame() - InkManager no disponible.");
    }
    if (this.catFoodManager) {
        this.catFoodManager.destroy(); // Limpia pellets, listeners y estado interno
         console.log("GameManager: resetGame() - CatFoodManager.destroy() llamado.");
    } else {
         console.warn("GameManager: resetGame() - CatFoodManager no disponible.");
    }
    // Opcional: Limpiar explícitamente el mundo físico si removeAllCats no lo hace completamente
    if (this.physicsManager) {
        // physicsManager.shutdown() es demasiado, solo queremos limpiar cuerpos no estáticos
        // const world = this.physicsManager.getWorld();
        // if (world) {
        //     Matter.World.clear(world, true); // 'true' para mantener los estáticos (paredes)
        //     this.physicsManager.init(this.catDisplayAreaElement); // Re-añadir paredes? O mejor asegurarse que removeAllCats limpie bien.
        // }
         console.log("GameManager: resetGame() - Asumiendo que removeAllCats limpió los cuerpos físicos.");
    }

    // 5. Asegurar que la tienda y su UI estén cerradas/ocultas
    if (this.shopManager) {
        this.shopManager.closeShop();
        console.log("GameManager: resetGame() - ShopManager.closeShop() llamado.");
    } else {
        console.warn("GameManager: resetGame() - ShopManager no disponible.");
    }
    this.hideToolControls();
    this.hideShopButton();

    // 6. Limpiar UI residual (opcional, depende de cómo maneje las transiciones StateMachine)
    // this.uiManager.clearQuizInterface(this.containerElement); // Podría ser redundante si StateMachine limpia el contenedor

    // 7. Limpiar referencias de UI específicas del estado anterior si es necesario
    this.gameUiContainer = null;
    document.querySelector('combo-counter')?.remove(); // Remover contador si existe

    // 8. Transicionar al Menú Principal
    console.log("GameManager: resetGame() - Transicionando a MainMenuState...");
    // Usar el barrido para una transición limpia
    this.stateMachine.changeState('MainMenu', undefined, 'gq-wipe-transition');

    // Nota: NO volvemos a llamar a this.start() aquí. El flujo normal es que
    // el usuario interactúe con el MainMenu para iniciar el juego de nuevo.
}
    // --- Gestión del Botón de Tienda ---
    private showShopButton(): void {
        if (!this.shopButtonInstance) {
            // ... (código de creación del botón y listener de interacción) ...
             const shopButton = document.createElement('shop-button-component') as ShopButtonComponent;
             shopButton.id = 'shop-button-global'; 
             shopButton.titleText = "Abrir Tienda (S)"; 
             document.body.appendChild(shopButton);
             this.shopButtonInstance = shopButton;
 
             this.shopButtonInteractionListener = () => this.handleShopButtonInteraction();
             shopButton.addEventListener('shop-button-interaction', this.shopButtonInteractionListener);
        }
        
        this.shopButtonInstance.classList.remove('hidden'); // Asegurar visibilidad visual
        
        // Asegurar que el listener de cierre del popup esté listo
        const popup = this.shopManager.getShopPopupElement();
        if (popup) this.addShopCloseListener(popup);

        // Actualizar estado (habilitado/deshabilitado) DESPUÉS de mostrar y configurar listeners
        this.updateShopButtonState(); 
    }

    private hideShopButton(): void {
        if (this.shopButtonInstance) {
            // Ocultar el botón ANTES de quitar listeners
            this.shopButtonInstance.classList.add('hidden'); 

            this.removeShopButtonListener(); 
            const popup = this.shopManager.getShopPopupElement();
            if(popup) this.removeShopCloseListener(popup);
            
            // Actualizar estado (aunque esté oculto, para consistencia)
            // this.updateShopButtonState(); // Opcional llamar aquí, ya que estará oculto
        }
    }

    private handleShopButtonInteraction(): void {
        const audioManager = this.getAudioManager();
        // Inicializar audio si es necesario
        if (!audioManager.isReady()) { audioManager.init(); }

        // Abrir tienda solo si no está ya abierta
        if (!this.shopManager.isShopOpen()) {
             this.openShop(); // Llama al método público para abrir la tienda
             audioManager?.playSound('ui_confirm'); // Sonido de apertura
        }
    }

    // Limpiar listener de interacción del botón de tienda
    private removeShopButtonListener(): void {
        if (this.shopButtonInstance && this.shopButtonInteractionListener) {
            this.shopButtonInstance.removeEventListener('shop-button-interaction', this.shopButtonInteractionListener);
            this.shopButtonInteractionListener = null;
        }
    }

    // Manejador para cuando el popup solicita cerrarse
    private handleShopCloseRequest(): void {
        this.closeShop(); // Llama al método público para cerrar la tienda
        this.getAudioManager().playSound('ui_cancel'); // Sonido de cierre
    }
    
    // Añadir listener de cierre al popup
    private addShopCloseListener(popupElement: ShopPopup): void {
        this.removeShopCloseListener(popupElement); // Quitar listener anterior si existe
        this.shopCloseRequestListener = () => this.handleShopCloseRequest();
        popupElement.addEventListener('close-requested', this.shopCloseRequestListener);
    }
    
    // Quitar listener de cierre del popup
     private removeShopCloseListener(popupElement: ShopPopup): void {
         if (popupElement && this.shopCloseRequestListener) {
             popupElement.removeEventListener('close-requested', this.shopCloseRequestListener);
             this.shopCloseRequestListener = null;
         }
     }

    /** Abre la interfaz de la tienda */
    public openShop(): void {
        if (this.shopManager) { // Verificar que ShopManager exista
            this.shopManager.openShop(); // Delegar apertura al ShopManager
            // El listener de cierre se añade dentro de openShop/getShopPopupElement en ShopManager
            this.updateShopButtonState(); // Actualizar estado del botón (debería deshabilitarse)
        } else {
            console.warn("GameManager: openShop() llamado pero ShopManager no está disponible.");
        }
    }

    /** Cierra la interfaz de la tienda */
    public closeShop(): void {
        if (this.shopManager) { // Verificar que ShopManager exista
            this.shopManager.closeShop(); // Delegar cierre al ShopManager
            // El listener de cierre se debería limpiar al ocultar el popup
            
            // Actualizar estado del botón DESPUÉS de que el popup se marque como cerrado
            queueMicrotask(() => { // Usar microtask para esperar posible actualización de 'isVisible'
                 this.updateShopButtonState(); // Botón debería habilitarse
            });
        } else {
            console.warn("GameManager: closeShop() llamado pero ShopManager no está disponible.");
        }
    }

    /** Actualiza el estado (habilitado/deshabilitado) del botón de tienda */
    private updateShopButtonState(): void {
        if (this.shopButtonInstance && this.shopManager) {
            const isShopCurrentlyOpen = this.shopManager.isShopOpen();
            const isGameplayActive = this.stateMachine.getCurrentStateName() === 'QuizGameplay';
            
            // --- LÓGICA MODIFICADA ---
            // El botón se deshabilita si:
            // 1. La tienda está abierta (para evitar abrirla de nuevo)
            // 2. O si NO estamos en el estado de Gameplay (donde debe estar disponible)
            this.shopButtonInstance.disabled = isShopCurrentlyOpen || !isGameplayActive;
            // --- FIN LÓGICA MODIFICADA ---

            // Log para depuración (opcional)
            // console.log(`[GameManager] updateShopButtonState: isShopOpen=${isShopCurrentlyOpen}, isGameplay=${isGameplayActive}, Button Disabled=${this.shopButtonInstance.disabled}`);
        }
    }

    // --- Gestión de Controles de Herramientas ---
    private showToolControls(): void {
        const container = this.controlElements.controlsContainer;
        if (container) {
            container.classList.remove('hidden'); // Mostrar contenedor principal
            // Actualizar visibilidad de sub-contenedores basados en unlocks
            this.updateControlVisibilityBasedOnUnlocks();
        } else {
            console.warn("[GameManager] Contenedor de controles (#right-controls) no encontrado.");
        }
    }
    private hideToolControls(): void {
        const container = this.controlElements.controlsContainer;
        if (container) {
            container.classList.add('hidden'); // Ocultar contenedor principal
        }
    }

    /** Actualiza la visibilidad de los contenedores de dibujo y comida basado en PlayerData */
    public updateControlVisibilityBasedOnUnlocks(): void {
        const drawingUnlocked = this.playerData.isDrawingUnlocked;
        const catFoodUnlocked = this.playerData.isCatFoodUnlocked;
        // Ocultar/mostrar contenedor de botones de DIBUJO
        if (this.controlElements.drawingButtonsContainer) {
            this.controlElements.drawingButtonsContainer.classList.toggle('hidden', !drawingUnlocked);
        }
        // Ocultar/mostrar contenedor de botón de COMIDA
        if (this.controlElements.catFoodUiContainer) {
            this.controlElements.catFoodUiContainer.classList.toggle('hidden', !catFoodUnlocked);
        }
        // Actualizar estado individual de los botones (activo/deshabilitado)
        this.updateToolButtonStates();
    }


    // --- Listener de Cambio de Tema ---
    private addThemeChangeListener(): void {
        this.removeThemeChangeListener(); // Asegurar que no haya duplicados
        this.themeChangeListener = (_event: Event) => {
            // Si el estado actual es QuizGameplay, reconstruir la interfaz
            const currentState = this.stateMachine.getCurrentState();
            if (currentState instanceof QuizGameplayState) {
                this.uiManager.rebuildInterface(); // UIManager reconstruye su parte
            }
            // Si la tienda está abierta, actualizarla
            if (this.shopManager.isShopOpen()) {
                this.shopManager.updateShopUI(); // ShopManager actualiza la tienda
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

    // --- Listener de Teclado ---
    private addKeyboardListener(): void {
        this.removeKeyboardListener(); // Limpiar listener anterior
        this.keydownListener = (event: KeyboardEvent) => {
            // Ignorar si se está escribiendo en un input (no relevante aquí, pero buena práctica)
            // if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

            // Tecla Escape: Cerrar tienda o explicación (prioridad al que esté visible)
            if (event.key === 'Escape') {
                if (this.shopManager.isShopOpen()) {
                    this.closeShop();
                    this.audioManager.playSound('ui_cancel');
                    return; // Evita que procese otras teclas si cerró la tienda
                }
                // Si la tienda no está abierta, pero la explicación sí, no hacer nada (la explicación maneja su propio cierre)
                if (this.uiManager.isExplanationVisible()) {
                   return; // Dejar que el overlay de explicación maneje Escape
                }
            }

            // Ignorar otras teclas si la tienda o la explicación están abiertas
            if (this.shopManager.isShopOpen() || this.uiManager.isExplanationVisible()) return;

            // Lógica específica del estado actual
            const currentStateName = this.stateMachine.getCurrentStateName();
            if (currentStateName === 'QuizGameplay') {
                switch (event.key.toLowerCase()) {
                    case 'b': this.activateBrush(); break;
                    case 'c': // Borrar tinta
                        if (this.playerData.isDrawingUnlocked && this.playerData.inkSpentSinceLastClear > 0) {
                            this.inkManager.clearInkLines();
                        }
                        break;
                    case 'f': this.activateCatFood(); break;
                    case 's': // Abrir tienda
                        // Verificar si el botón existe y no está deshabilitado
                        if (this.shopButtonInstance && !this.shopButtonInstance.disabled) { 
                            this.handleShopButtonInteraction(); // Usar el mismo manejador que el clic
                        }
                        break;
                    case 't': this.themeManager.cycleTheme(); break; // Cambiar tema
                }
            } else if (['MainMenu', 'GameOver', 'Results'].includes(currentStateName || '')) {
                 // Permitir cambiar tema en otros estados
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

    // --- Métodos de Acceso y Actualización de PlayerData (Delegados a UIManager) ---
    public getLives(): number { return this.playerData.lives; }
    public decrementLives(): void {
        if (this.playerData.lives > 0) {
            this.playerData.lives--;
            this.updateExternalLivesUI(); // Actualizar UI
        }
    }
    public incrementLives(): void { // Usado por la tienda
        this.playerData.lives++;
        this.updateExternalLivesUI(); // Actualizar UI
    }

    /** Habilita las características de dibujo (llamado por ShopManager) */
    public enableDrawingFeature(): boolean {
        try {
            this.inkManager.init(); // Asegurar inicialización del InkManager
            this.updateInkUI(); // Actualizar UI relacionada con la tinta
            this.updateControlVisibilityBasedOnUnlocks(); // Mostrar controles de dibujo
            return true;
        } catch(e) {
            console.error("GameManager: Error habilitando dibujo:", e);
            return false;
        }
    }
    /** Habilita las características de comida para gatos (llamado por ShopManager) */
    public enableCatFoodFeature(): void {
        try {
            this.catFoodManager.enable(); // Habilitar lógica de CatFoodManager
            this.updateCatFoodUI(); // Actualizar UI de comida
            this.updateControlVisibilityBasedOnUnlocks(); // Mostrar controles de comida
        } catch(e) {
            console.error("GameManager: Error habilitando comida:", e);
        }
    }

    // --- Métodos para que UIManager actualice la UI externa ---
    public updateInkUI(): void { this.uiManager.updateInkVisibility(this.playerData.isDrawingUnlocked); this.uiManager.updateInkBar(); this.updateToolButtonStates(); }
    public updateExternalLivesUI(): void { this.uiManager.updateLivesDisplay(this.playerData.lives); }
    public updateExternalShieldUI(isActive: boolean): void { this.uiManager.updateShieldIcon(isActive); }
    public updateExternalHintUI(charges: number): void { this.uiManager.updateHintIcon(charges); }
    public updateExternalScoreUI(): void { this.uiManager.updateScoreDisplay(this.playerData.score); }
    public updateCatFoodUI(): void {
        this.uiManager.updateCatFoodBar(this.playerData.currentCatFood, this.playerData.getMaxCatFood());
        this.updateToolButtonStates(); // Actualizar estado del botón de comida
    }

    // --- Activación de Herramientas ---
    /** Activa/desactiva el pincel de dibujo */
    public activateBrush(): void {
        const now = Date.now();
        if (now - this._lastToolToggleTime < this.TOOL_TOGGLE_DEBOUNCE_MS) return; // Debounce
        this._lastToolToggleTime = now;

        if (!this.playerData.isDrawingUnlocked) return; // Salir si no está desbloqueado
        if (this.catFoodManager.isActive) this.catFoodManager.toggleActive(false); // Desactivar comida si estaba activa
        this.inkManager.toggleBrush(); // Delegar al InkManager
    }

    /** Activa/desactiva la herramienta de comida */
    public activateCatFood(): void {
        const now = Date.now();
        if (now - this._lastToolToggleTime < this.TOOL_TOGGLE_DEBOUNCE_MS) return; // Debounce
        this._lastToolToggleTime = now;

        if (!this.playerData.isCatFoodUnlocked) return; // Salir si no está desbloqueado
        if (this.inkManager.isBrushActive) this.inkManager.toggleBrush(false); // Desactivar pincel si estaba activo
        this.catFoodManager.toggleActive(); // Delegar al CatFoodManager
    }

    /** Actualiza el estado visual (activo/deshabilitado) de los botones de herramienta */
    public updateToolButtonStates(): void {
        if (this.controlElements.brushToolButton) {
            this.controlElements.brushToolButton.active = this.inkManager.isBrushActive;
            // Deshabilitar si no desbloqueado O si no hay tinta Y no está activo
            this.controlElements.brushToolButton.disabled = !this.playerData.isDrawingUnlocked || (this.playerData.currentInk <= 0 && !this.inkManager.isBrushActive);
        }
        if (this.controlElements.clearInkToolButton) {
            // Deshabilitar si no desbloqueado O si no hay tinta gastada para recuperar
            this.controlElements.clearInkToolButton.disabled = !this.playerData.isDrawingUnlocked || this.playerData.inkSpentSinceLastClear <= 0;
        }
        if (this.controlElements.catFoodToolButton) {
            this.controlElements.catFoodToolButton.active = this.catFoodManager.isActive;
            // Deshabilitar si no desbloqueado O si no hay comida Y no está activo
            this.controlElements.catFoodToolButton.disabled = !this.playerData.isCatFoodUnlocked || (this.playerData.currentCatFood <= 0 && !this.catFoodManager.isActive);
            // Actualizar barra de progreso interna del botón de comida
            this.uiManager.updateCatFoodBar(this.playerData.currentCatFood, this.playerData.getMaxCatFood());
        }
        this.updateShopButtonState(); // Actualizar también el botón de tienda
    }

    /** Configura los listeners para los botones de herramienta */
    private setupToolButtonListeners = (): void => {
        this.controlElements.brushToolButton?.addEventListener('tool-activated', () => this.activateBrush());
        this.controlElements.clearInkToolButton?.addEventListener('tool-activated', () => {
            if (this.playerData.isDrawingUnlocked && this.playerData.inkSpentSinceLastClear > 0) {
                this.inkManager.clearInkLines();
            }
        });
        this.controlElements.catFoodToolButton?.addEventListener('tool-activated', () => this.activateCatFood());
    };

    // --- Getters públicos para acceder a los sistemas y datos ---
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