// src/game/engine/managers/ToolManager.ts
import type { GameManager } from '../../GameManager'; // Sube dos niveles ('engine', 'game') a src/, luego a 'game/'
import type { InkManager, CatFoodManager } from '.'; // Usa el index.ts de la carpeta actual ('managers')
import type { PlayerData } from '../../PlayerData';    // Sube dos niveles ('engine', 'game') a src/, luego a 'game/'
import type { ToolButton } from '../../components/ui'; // Sube dos niveles, entra a 'components/ui' (usa index.ts)

export class ToolManager {
    private gameManager: GameManager;
    private inkManager!: InkManager;
    private catFoodManager!: CatFoodManager;
    private playerData!: PlayerData;

    private controlsContainer: HTMLElement | null = null;
    private drawingButtonsContainer: HTMLElement | null = null;
    private catFoodUiContainer: HTMLElement | null = null;
    private brushToolButton: ToolButton | null = null;
    private clearInkToolButton: ToolButton | null = null;
    private catFoodToolButton: ToolButton | null = null;

    private _lastToolToggleTime: number = 0;
    private readonly TOOL_TOGGLE_DEBOUNCE_MS = 300; // Tiempo de debounce en ms

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
        // Obtener referencias a los elementos del DOM una vez en el constructor
        this.controlsContainer = document.getElementById('right-controls');
        this.drawingButtonsContainer = document.getElementById('drawing-buttons-container');
        this.catFoodUiContainer = document.getElementById('cat-food-ui-container');
        this.brushToolButton = document.querySelector<ToolButton>('tool-button[toolId="brush"]');
        this.clearInkToolButton = document.querySelector<ToolButton>('tool-button[toolId="clear-ink"]');
        this.catFoodToolButton = document.querySelector<ToolButton>('tool-button[toolId="cat-food"]');

        this.setupToolButtonListeners();
        console.log("ToolManager Creado.");
    }

    public setManagers(inkManager: InkManager, catFoodManager: CatFoodManager, playerData: PlayerData): void {
        this.inkManager = inkManager;
        this.catFoodManager = catFoodManager;
        this.playerData = playerData;
        console.log("ToolManager: Managers dependientes (Ink, CatFood, PlayerData) establecidos.");
    }

    private setupToolButtonListeners(): void {
        this.brushToolButton?.addEventListener('tool-activated', () => this.activateBrush());
        this.clearInkToolButton?.addEventListener('tool-activated', () => {
            // Asegurarse que playerData e inkManager estén disponibles
            if (this.playerData?.isDrawingUnlocked && this.playerData?.inkSpentSinceLastClear > 0 && this.inkManager) {
                this.inkManager.clearInkLines();
            }
        });
        this.catFoodToolButton?.addEventListener('tool-activated', () => this.activateCatFood());
    }

    public showToolControls(show: boolean): void {
        if (this.controlsContainer) {
            this.controlsContainer.classList.toggle('hidden', !show);
            if (show) {
                this.updateControlVisibilityBasedOnUnlocks();
            }
        }
    }

    public updateControlVisibilityBasedOnUnlocks(): void {
        if (!this.playerData) return;
        const drawingUnlocked = this.playerData.isDrawingUnlocked;
        const catFoodUnlocked = this.playerData.isCatFoodUnlocked;

        if (this.drawingButtonsContainer) {
            this.drawingButtonsContainer.classList.toggle('hidden', !drawingUnlocked);
        }
        if (this.catFoodUiContainer) {
            this.catFoodUiContainer.classList.toggle('hidden', !catFoodUnlocked);
        }
        this.updateToolButtonActiveStates(); // Llamar para actualizar estados después de cambiar visibilidad
    }

    public activateBrush(): void {
        const now = Date.now();
        if (now - this._lastToolToggleTime < this.TOOL_TOGGLE_DEBOUNCE_MS) return;
        this._lastToolToggleTime = now;

        if (!this.playerData || !this.inkManager || !this.catFoodManager) {
             console.warn("ToolManager: No se puede activar el pincel, faltan dependencias (PlayerData, InkManager o CatFoodManager).");
            return;
        }
        if (!this.playerData.isDrawingUnlocked) return;

        if (this.catFoodManager.isActive) this.catFoodManager.toggleActive(false);
        this.inkManager.toggleBrush(); // InkManager maneja su propio estado y UI del canvas
        this.updateToolButtonActiveStates();
        this.gameManager.getAudioManager().playSound('ui_select');
    }

    public activateCatFood(): void {
        const now = Date.now();
        if (now - this._lastToolToggleTime < this.TOOL_TOGGLE_DEBOUNCE_MS) return;
        this._lastToolToggleTime = now;

        if (!this.playerData || !this.inkManager || !this.catFoodManager) {
            console.warn("ToolManager: No se puede activar la comida, faltan dependencias (PlayerData, InkManager o CatFoodManager).");
            return;
        }
        if (!this.playerData.isCatFoodUnlocked) return;

        if (this.inkManager.isBrushActive) this.inkManager.toggleBrush(false);
        this.catFoodManager.toggleActive(); // CatFoodManager maneja su propio estado
        this.updateToolButtonActiveStates();
        this.gameManager.getAudioManager().playSound('ui_select');
    }

    public updateToolButtonActiveStates(): void {
        if (!this.playerData || !this.inkManager || !this.catFoodManager || !this.gameManager) return;

        // Determinar si algún popup global está abierto
        const isGlobalPopupOpen = this.gameManager.getShopManager().isShopOpen() ||
                               this.gameManager.getGlobalUIManager().isOptionsMenuOpen();

        // Determinar si el overlay de explicación del módulo de juego está activo
        // Necesitaremos un método en GameManager o que GlobalUIManager pueda consultar al módulo activo.
        // Por ahora, asumimos una forma de verificarlo a través de GameManager.
        const isModuleOverlayActive = this.gameManager.isGamePausedForOverlay(); // Este método se creará en GameManager

        const isAnyPopupBlockingTools = isGlobalPopupOpen || isModuleOverlayActive;


        if (this.brushToolButton) {
            this.brushToolButton.active = this.inkManager.isBrushActive;
            this.brushToolButton.disabled = isAnyPopupBlockingTools || !this.playerData.isDrawingUnlocked || (this.playerData.currentInk <= 0 && !this.inkManager.isBrushActive);
        }
        if (this.clearInkToolButton) {
            this.clearInkToolButton.disabled = isAnyPopupBlockingTools || !this.playerData.isDrawingUnlocked || this.playerData.inkSpentSinceLastClear <= 0;
        }
        if (this.catFoodToolButton) {
            this.catFoodToolButton.active = this.catFoodManager.isActive;
            this.catFoodToolButton.disabled = isAnyPopupBlockingTools || !this.playerData.isCatFoodUnlocked || (this.playerData.currentCatFood <= 0 && !this.catFoodManager.isActive);
            // Actualizar la barra de progreso del botón de comida
            const catFoodPercentage = this.playerData.getMaxCatFood() > 0 ?
                                      Math.max(0, Math.min(100, (this.playerData.currentCatFood / this.playerData.getMaxCatFood()) * 100)) : 0;
            this.catFoodToolButton.progressPercentage = catFoodPercentage;
        }
    }

    /**
     * Usado por GameManager para deshabilitar botones de herramientas globalmente,
     * por ejemplo, cuando la UI del quiz no está activa.
     */
    public disableAllToolButtons(disable: boolean): void {
        const buttons = [this.brushToolButton, this.clearInkToolButton, this.catFoodToolButton];
        buttons.forEach(button => {
            if (button) button.disabled = disable;
        });
    }

    // Específico para actualizar la UI del botón de comida si este tiene una barra de progreso interna
    public updateCatFoodUIToolButton() {
        if (this.catFoodToolButton && this.playerData) {
             const catFoodPercentage = this.playerData.getMaxCatFood() > 0 ?
                Math.max(0, Math.min(100, (this.playerData.currentCatFood / this.playerData.getMaxCatFood()) * 100)) : 0;
            this.catFoodToolButton.progressPercentage = catFoodPercentage;
        }
    }
}