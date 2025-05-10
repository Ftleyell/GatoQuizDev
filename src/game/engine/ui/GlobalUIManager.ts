// src/game/engine/ui/GlobalUIManager.ts
import type { GameManager } from '../../GameManager'; // Sube dos niveles ('engine', 'game') a src/, luego a 'game/'

// Para tipos de componentes UI, usando el barrel file:
import type {
    ScoreDisplay,
    LivesDisplay,
    ShopButtonComponent,
    OptionsButtonComponent,
    OptionsMenuPopup,
    BlurBackdropComponent,
    DiagonalWipe,
    ComboCounter,
    QuizUiContainer
} from '../../components/ui'; // Sube dos niveles ('engine', 'game') a src/, luego a 'components/ui/' (usa index.ts)

// Nota: La importación de PlayerData ya estaba correctamente comentada.
export class GlobalUIManager {
    private gameManager: GameManager;
    private scoreDisplay: ScoreDisplay | null = null; // Este es el global, si existe
    private livesDisplay: LivesDisplay | null = null; // Este es el global, si existe
    private shopButton: ShopButtonComponent | null = null;
    private optionsButton: OptionsButtonComponent | null = null;
    private optionsMenu: OptionsMenuPopup | null = null;
    private blurBackdrop: BlurBackdropComponent | null = null;
    private diagonalWipe: DiagonalWipe | null = null;
    private comboCounter: ComboCounter | null = null;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;

        // Los querySelector para scoreDisplay y livesDisplay aquí serían para
        // instancias globales persistentes, no las que están dentro de quiz-ui-container.
        // Si no existen globalmente, está bien que sean null.
        this.scoreDisplay = document.querySelector('score-display:not([slot])'); // Ejemplo para uno global
        this.livesDisplay = document.querySelector('lives-display:not([slot])'); // Ejemplo para uno global

        this.shopButton = document.getElementById('shop-button-global') as ShopButtonComponent | null;
        this.optionsButton = document.getElementById('settings-options-button-global') as OptionsButtonComponent | null;
        this.optionsMenu = document.getElementById('options-menu-popup-global') as OptionsMenuPopup | null;
        this.blurBackdrop = document.getElementById('blur-backdrop') as BlurBackdropComponent | null;
        this.diagonalWipe = document.getElementById('diagonal-wipe-transition-element') as DiagonalWipe | null;
        this.comboCounter = document.querySelector('combo-counter'); // Asumimos uno global

        if (!this.shopButton) console.warn("GlobalUIManager Constructor: shop-button-global no encontrado.");
        if (!this.optionsButton) console.warn("GlobalUIManager Constructor: settings-options-button-global no encontrado.");
        if (!this.optionsMenu) console.warn("GlobalUIManager Constructor: options-menu-popup-global no encontrado.");
        if (!this.blurBackdrop) console.warn("GlobalUIManager Constructor: blur-backdrop no encontrado.");
        if (!this.diagonalWipe) console.warn("GlobalUIManager Constructor: diagonal-wipe-transition-element no encontrado.");
        if (!this.comboCounter) console.warn("GlobalUIManager Constructor: combo-counter no encontrado.");
    }

    // Para depuración, llamado desde GameManager
    public getOptionsMenuVisibleStateForDebug(): boolean | undefined {
        return this.optionsMenu?.isVisible;
    }

    public updateScoreDisplay(score: number, combo: number): void {
        // Actualiza el comboCounter global
        if (this.comboCounter) {
            this.comboCounter.combo = combo;
        }
        // Si hubiera un scoreDisplay global persistente, se actualizaría aquí.
        // if (this.scoreDisplay) {
        // this.scoreDisplay.score = score;
        // this.scoreDisplay.combo = combo;
        // }

        // Lógica de efectos visuales globales basados en combo (ej. :root variables)
        const root = document.documentElement;
        const FLARE_START_STREAK = 1;
        const FLARE_MAX_STREAK = 10;
        const ELEMENT_GLOW_START_STREAK = 2;
        const ELEMENT_GLOW_MAX_STREAK = 10;

        const flareIntensity = combo < FLARE_START_STREAK ? 0 : Math.min((combo - FLARE_START_STREAK + 1) / (FLARE_MAX_STREAK - FLARE_START_STREAK + 1), 1);
        root.style.setProperty('--flare-intensity', flareIntensity.toFixed(3));

        const glowIntensity = combo < ELEMENT_GLOW_START_STREAK ? 0 : Math.min((combo - ELEMENT_GLOW_START_STREAK + 1) / (ELEMENT_GLOW_MAX_STREAK - ELEMENT_GLOW_START_STREAK + 1), 1);
        root.style.setProperty('--element-glow-intensity', glowIntensity.toFixed(3));
    }

    public updateLivesDisplay(lives: number, hasShield: boolean, hintCharges: number): void {
        // Esta función se mantiene por si se decide tener un display de vidas global y persistente.
        // Actualmente, el livesDisplay principal está dentro del QuizUIManager.
        if (this.livesDisplay) { // Solo si existe un livesDisplay global
            this.livesDisplay.lives = lives;
            this.livesDisplay.hasShield = hasShield;
            this.livesDisplay.hintCharges = hintCharges;
        }
    }

    public updateShieldIcon(isActive: boolean): void {
        if (this.livesDisplay) { // Solo si existe un livesDisplay global
            this.livesDisplay.hasShield = isActive;
        }
    }

    public updateHintIcon(charges: number): void {
         if (this.livesDisplay) { // Solo si existe un livesDisplay global
            this.livesDisplay.hintCharges = charges;
        }
    }

    public showShopButton(show: boolean): void {
        if (this.shopButton) {
            this.shopButton.classList.toggle('hidden', !show);
        }
    }

    public setShopButtonDisabled(disabled: boolean): void {
        if (this.shopButton) {
            this.shopButton.disabled = disabled;
        }
    }

    public showOptionsButton(show: boolean): void {
        if (this.optionsButton) {
            this.optionsButton.classList.toggle('hidden', !show);
        }
    }

    public setOptionsButtonDisabled(disabled: boolean): void {
        if (this.optionsButton) {
            this.optionsButton.disabled = disabled;
        }
    }

    public toggleOptionsMenu(show: boolean): void {
        console.log(`[GlobalUIManager DEBUG] toggleOptionsMenu LLAMADO. Solicitado: ${show}. Estado actual optionsMenu.isVisible: ${this.optionsMenu?.isVisible}`);
        if (this.optionsMenu) {
            if (this.optionsMenu.isVisible === show) {
                console.log("[GlobalUIManager DEBUG] toggleOptionsMenu: Sin cambio en la visibilidad del menú de opciones.");
                // NO llamamos a updateBackdropVisibility aquí. GameManager lo hará.
                return;
            }
            this.optionsMenu.isVisible = show; // Actualizar el estado del popup
            console.log(`[GlobalUIManager DEBUG] toggleOptionsMenu: optionsMenu.isVisible establecido a ${show}.`);
            
            if (show) {
                const audioManager = this.gameManager.getAudioManager(); 
                this.optionsMenu.initialVolume = audioManager.getVolume();
                this.optionsMenu.initiallyMuted = audioManager.isMuted();
                this.optionsMenu.audioManagerInstance = audioManager;
                this.optionsMenu.themeManagerInstance = this.gameManager.getThemeManager(); 
                this.optionsMenu.gameManagerInstance = this.gameManager;
                console.log("[GlobalUIManager DEBUG] toggleOptionsMenu: Instancias pasadas a optionsMenu.");
            }
        } else {
             console.warn("GlobalUIManager: Intento de alternar optionsMenu, pero no se encontró.");
        }
        // LA LLAMADA A updateBackdropVisibility() SE QUITA DE AQUÍ.
        // GameManager se encargará de llamar a this.gameManager.updateBackdropAndFadeState()
        // después de invocar este método.
    }

    public isOptionsMenuOpen(): boolean {
        const isOpen = this.optionsMenu?.isVisible ?? false;
        // console.log(`[GlobalUIManager DEBUG] isOptionsMenuOpen() consultado, devuelve: ${isOpen} (basado en this.optionsMenu.isVisible: ${this.optionsMenu?.isVisible})`);
        return isOpen;
    }

    public updateBackdropVisibility(): void {
        const shopIsOpen = this.gameManager.getShopManager()?.isShopOpen() ?? false;
        const optionsAreOpen = this.isOptionsMenuOpen(); // Esta llamada ahora debe reflejar el estado más reciente
        
        const isAnyEnginePopupOpen = shopIsOpen || optionsAreOpen;

        // Log detallado justo antes de tomar la decisión
        console.log(`[GlobalUIManager DEBUG] updateBackdropVisibility:
          Shop Open: ${shopIsOpen} (Popup visible: ${this.gameManager.getShopManager().getShopPopupElement()?.isVisible})
          Options Open: ${optionsAreOpen} (Popup visible: ${this.optionsMenu?.isVisible})
          => Decisión: isAnyEnginePopupOpen = ${isAnyEnginePopupOpen}`);

        if (this.blurBackdrop) {
            if (this.blurBackdrop.visible !== isAnyEnginePopupOpen) {
                console.log(`[GlobalUIManager DEBUG] Estableciendo blurBackdrop.visible = ${isAnyEnginePopupOpen} (antes era ${this.blurBackdrop.visible})`);
                this.blurBackdrop.visible = isAnyEnginePopupOpen;
            } else {
                 // console.log(`[GlobalUIManager DEBUG] blurBackdrop.visible ya está en ${isAnyEnginePopupOpen}. Sin cambios.`);
            }
        } else {
            console.warn("[GlobalUIManager] updateBackdropVisibility: blurBackdrop no encontrado.");
        }
    }

    public playWipeIn(): Promise<void> {
        if (this.diagonalWipe) {
            return this.diagonalWipe.playIn();
        }
        console.warn("GlobalUIManager: diagonalWipe no encontrado para playIn().");
        return Promise.resolve();
    }

    public playWipeOut(): Promise<void> {
        if (this.diagonalWipe) {
            return this.diagonalWipe.playOut();
        }
        console.warn("GlobalUIManager: diagonalWipe no encontrado para playOut().");
        return Promise.resolve();
    }

    public resetWipe(): void {
        this.diagonalWipe?.reset();
    }

    public setModuleUIsFaded(isFaded: boolean): void {
        // console.log(`[GlobalUIManager] setModuleUIsFaded llamado con isFaded: ${isFaded}`);
        const quizUiContainer = this.gameManager.getContainerElement().querySelector('quiz-ui-container') as QuizUiContainer | null;
        if (quizUiContainer) {
            if (quizUiContainer.isFaded !== isFaded) { // Acceder directamente a la propiedad
                // console.log(`[GlobalUIManager] Estableciendo quizUiContainer.isFaded a ${isFaded}`);
                quizUiContainer.isFaded = isFaded;
            }
        } else {
            // console.warn("[GlobalUIManager] setModuleUIsFaded: quiz-ui-container no encontrado.");
        }
    }
}