// src/systems/ThemeManager.ts

import { Theme } from '../types/Theme'; // Asegúrate que la ruta sea correcta

export class ThemeManager {
    private themes: Theme[] = [];
    private activeThemeIndex: number = 0;
    private defaultThemeId: string = 'default-clean'; // Asumimos un ID para el tema base
    private isLoading: boolean = false;
    private lastError: string | null = null;
    private rootElement: HTMLElement = document.body;

    // Lista maestra de todas las variables CSS que el sistema puede tematizar.
    // Idealmente, se podría generar dinámicamente al cargar el tema "default".
    // Por ahora, la inicializamos vacía y la poblaremos al cargar el primer tema.
    private masterCssVariableList: string[] = [];

    constructor(rootElementSelector: string = 'body') {
        console.log("ThemeManager Creado.");
        const element = document.querySelector(rootElementSelector);
        if (element instanceof HTMLElement) {
            this.rootElement = element;
        } else {
            console.warn(`ThemeManager: Elemento raíz '${rootElementSelector}' no encontrado, usando document.body.`);
            this.rootElement = document.body;
        }
    }

    public async loadThemesData(data: Theme[]): Promise<boolean> {
        if (this.isLoading) {
            console.warn('ThemeManager: Ya hay una carga en progreso.');
            return false;
        }
        console.log(`ThemeManager: Procesando datos de temas pre-cargados...`);
        this.isLoading = true;
        this.lastError = null;
        this.themes = [];

        try {
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Los datos de temas proporcionados no son un array válido o están vacíos.');
            }

            for (const theme of data) {
                if (!theme.id || !theme.name || !theme.cssVariables || typeof theme.cssVariables !== 'object') {
                    console.warn(`ThemeManager: Tema inválido o sin cssVariables, omitiendo:`, theme);
                    continue;
                }
                this.themes.push(theme);
            }

            if (this.themes.length === 0) {
                throw new Error('No se cargaron temas válidos (todos carecían de cssVariables).');
            }
            
            // Poblar la lista maestra de variables del primer tema cargado (o el default si existe)
            const firstValidTheme = this.themes.find(t => t.id === this.defaultThemeId) || this.themes[0];
            if (firstValidTheme?.cssVariables) {
                this.masterCssVariableList = Object.keys(firstValidTheme.cssVariables);
                console.log(`ThemeManager: Lista maestra de ${this.masterCssVariableList.length} variables CSS generada desde el tema '${firstValidTheme.id}'.`);
            } else {
                console.warn("ThemeManager: No se pudo generar la lista maestra de variables CSS (primer tema válido sin cssVariables).");
            }


            this.activeThemeIndex = Math.max(0, this.themes.findIndex(t => t.id === this.defaultThemeId));
            if (this.themes.findIndex(t => t.id === this.defaultThemeId) === -1 && this.themes.length > 0) {
                console.warn(`ThemeManager: Tema por defecto '${this.defaultThemeId}' no encontrado. Usando el primer tema de la lista.`);
                this.activeThemeIndex = 0;
            }
            
            console.log(`ThemeManager: ${this.themes.length} temas procesados exitosamente.`);
            this.isLoading = false;
            this.applyActiveTheme();
            return true;

        } catch (error) {
            console.error('ThemeManager: Error al procesar los datos de temas:', error);
            this.lastError = error instanceof Error ? error.message : String(error);
            this.isLoading = false;
            this.themes = [];
            this.activeThemeIndex = 0;
            return false;
        }
    }

    private applyActiveTheme(): void {
        const activeTheme = this.getActiveTheme();
        this._applyThemeCssVariables(activeTheme);
        this._applyRootThemeClass(activeTheme);
        this._dispatchThemeChangedEvent(activeTheme);
    }

    private _applyThemeCssVariables(theme: Theme | null): void {
        // Limpiar todas las variables conocidas de la lista maestra antes de aplicar nuevas
        for (const varName of this.masterCssVariableList) {
            this.rootElement.style.removeProperty(varName);
        }

        if (theme?.cssVariables) {
            console.log(`ThemeManager: Aplicando ${Object.keys(theme.cssVariables).length} variables CSS para el tema '${theme.id}'.`);
            for (const [key, value] of Object.entries(theme.cssVariables)) {
                // Opcional: Verificar si la variable está en la lista maestra si quisiéramos ser estrictos
                // if (this.masterCssVariableList.includes(key)) {
                this.rootElement.style.setProperty(key, value);
                // } else {
                //     console.warn(`ThemeManager: Variable '${key}' del tema '${theme.id}' no está en la lista maestra y no se aplicará.`);
                // }
            }
        } else {
            console.log("ThemeManager: No hay variables CSS para aplicar (tema null o sin cssVariables), se usarán fallbacks de componentes.");
        }
    }
    
    private _applyRootThemeClass(theme: Theme | null): void {
        // Remover todas las clases de tema que podrían haber sido añadidas por temas anteriores
        // Esto asume que las clases de tema global siguen un patrón como 'theme-id-*'
        // o que tenemos una lista de todas las posibles clases de quizWrapper.
        this.rootElement.className.split(' ').forEach(cls => {
            if (cls.startsWith('theme-id-')) { // Asumiendo un prefijo 'theme-id-'
                this.rootElement.classList.remove(cls);
            }
        });

        const themeClass = theme?.elements?.quizWrapper?.themeClass;
        if (themeClass) {
            this.rootElement.classList.add(themeClass);
            console.log(`ThemeManager: Clase de tema global '${themeClass}' aplicada a ${this.rootElement.tagName}.`);
        }
    }

    private _dispatchThemeChangedEvent(theme: Theme | null): void {
        const event = new CustomEvent('theme-changed', {
            detail: {
                themeId: theme?.id,
                theme: theme 
            },
            bubbles: true,
            composed: true
        });
        document.dispatchEvent(event);
        console.log(`ThemeManager: Evento 'theme-changed' despachado para el tema '${theme?.id ?? 'null'}'.`);
    }

    public getActiveTheme(): Theme | null {
        if (this.themes.length === 0) return null;
        return this.themes[this.activeThemeIndex] ?? null;
    }

    public getActiveThemeId(): string | null {
        return this.getActiveTheme()?.id ?? null;
    }

    public cycleTheme(): void {
        if (this.themes.length <= 1) return;

        this.activeThemeIndex = (this.activeThemeIndex + 1) % this.themes.length;
        this.applyActiveTheme();
        const newTheme = this.getActiveTheme();
        console.log(`ThemeManager: Tema ciclado a '${newTheme?.name ?? 'N/A'}' (ID: ${newTheme?.id ?? 'N/A'})`);
    }

    public setActiveTheme(themeId: string): boolean {
        const index = this.themes.findIndex(t => t.id === themeId);
        if (index !== -1) {
            if (this.activeThemeIndex === index) return true; // Ya es el tema activo
            this.activeThemeIndex = index;
            this.applyActiveTheme();
            console.log(`ThemeManager: Tema establecido a '${this.getActiveTheme()?.name}' (ID: ${themeId})`);
            return true;
        } else {
            console.warn(`ThemeManager: No se encontró el tema con ID '${themeId}'.`);
            return false;
        }
    }

    public getThemes(): Theme[] {
        return [...this.themes];
    }

    public getLastError(): string | null {
        return this.lastError;
    }

    public isLoadingThemes(): boolean {
        return this.isLoading;
    }
}