// src/game/StateMachine.ts

import type { DiagonalWipe } from '../game/components/ui/diagonal-wipe'; 

export interface IState {
  enter(params?: any): void;
  exit(): void;
  update(deltaTime: number): void;
  getPreferredExitAnimation?(): string;
  getPreferredEnterAnimation?(): string;
}

export class StateMachine {
  private states: Map<string, IState> = new Map();
  private currentState: IState | null = null;
  private currentStateName: string | null = null;
  private isTransitioning: boolean = false;
  private animationContainer: HTMLElement | null = null; 
  private wipeComponent: DiagonalWipe | null = null;   

  public setAnimationContainer(element: HTMLElement): void {
    this.animationContainer = element;
  }

  public setWipeComponent(component: DiagonalWipe | null): void {
    this.wipeComponent = component;
    console.log('[StateMachine] Wipe component seteado:', component);
    this.wipeComponent?.reset(); 
  }

  public addState(name: string, stateObject: IState): void {
    if (this.states.has(name)) {
      console.warn(`[StateMachine] El estado '${name}' ya existe. Sobrescribiendo.`);
    }
    this.states.set(name, stateObject);
    // console.log(`[StateMachine] Estado '${name}' añadido.`); // Menos verboso
  }

  public async changeState(
    name: string,
    enterParams?: any,
    forceExitAnimationClass?: string,
    forceEnterAnimationClass?: string
  ): Promise<void> {
    console.log(`[StateMachine] Solicitud para cambiar a estado '${name}'. Estado actual: '${this.currentStateName}', isTransitioning: ${this.isTransitioning}`);
    if (this.isTransitioning) {
      console.warn(`[StateMachine] Transición a '${name}' ignorada, otra transición ya está en progreso.`);
      return;
    }
    
    const nextState = this.states.get(name);
    if (!nextState) {
      console.error(`[StateMachine] Estado '${name}' no existe. Estados disponibles:`, Array.from(this.states.keys()));
      this.isTransitioning = false; // Asegurar que se resetee si el estado no existe
      return;
    }
    
    if (this.currentStateName === name && !forceExitAnimationClass && !forceEnterAnimationClass) {
        console.warn(`[StateMachine] Ya en estado '${name}' y sin forzar animación.`);
        // No resetear isTransitioning aquí porque no se seteó a true
        return;
    }

    this.isTransitioning = true;
    console.log(`[StateMachine] INICIO TRANSICIÓN: de '${this.currentStateName || 'ninguno'}' a '${name}'. isTransitioning = true.`);
    const oldState = this.currentState;
    const oldStateName = this.currentStateName;

    const exitAnimClass = forceExitAnimationClass || oldState?.getPreferredExitAnimation?.() || 'gq-fade-out';
    const enterAnimClass = forceEnterAnimationClass || nextState?.getPreferredEnterAnimation?.() || 'gq-fade-in';

    try {
        if (this.wipeComponent && (exitAnimClass === 'gq-wipe-transition' || enterAnimClass === 'gq-wipe-transition')) {
            console.log(`[StateMachine] Usando BARRIDO de '${oldStateName || 'ninguno'}' a '${name}'.`);
            
            console.log(`[StateMachine]   BARRIDO: Llamando wipeComponent.playIn() para cubrir pantalla...`);
            await this.wipeComponent.playIn(); 
            console.log(`[StateMachine]   BARRIDO: wipeComponent.playIn() COMPLETADO.`);

            if (oldState?.exit) {
                console.log(`[StateMachine]   BARRIDO: Llamando oldState.exit() para '${oldStateName}'.`);
                oldState.exit(); 
            }
            
            if (this.animationContainer) {
                console.log(`[StateMachine]   BARRIDO: Limpiando animationContainer (innerHTML = '').`);
                this.animationContainer.innerHTML = ''; 
            }

            this.currentState = nextState;
            this.currentStateName = name;
            
            if (this.currentState?.enter) {
                console.log(`[StateMachine]   BARRIDO: Llamando currentState.enter() para '${this.currentStateName}'.`);
                this.currentState.enter(enterParams); 
            }
            
            // Pausa opcional si se desea antes de revelar
            // console.log(`[StateMachine]   BARRIDO: Iniciando pausa breve antes de playOut.`);
            // await new Promise(resolve => setTimeout(resolve, 100)); 
            // console.log(`[StateMachine]   BARRIDO: Pausa finalizada.`);

            console.log(`[StateMachine]   BARRIDO: Llamando wipeComponent.playOut() para revelar '${this.currentStateName}'...`);
            await this.wipeComponent.playOut();
            console.log(`[StateMachine]   BARRIDO: wipeComponent.playOut() COMPLETADO.`);
            
            this.wipeComponent.reset();
            console.log(`[StateMachine] Transición de BARRIDO a '${this.currentStateName}' finalizada exitosamente.`);

        } else { 
            console.log(`[StateMachine] Usando animación ESTÁNDAR ('${exitAnimClass}' -> '${enterAnimClass}') de '${oldStateName || 'ninguno'}' a '${name}'.`);
            const container = this.animationContainer || document.getElementById('app');
            if (!container) {
                console.error("[StateMachine] Contenedor de animación estándar no encontrado. Realizando cambio directo.");
                if(oldState?.exit) oldState.exit();
                this.currentState = nextState;
                this.currentStateName = name;
                if(this.currentState.enter) this.currentState.enter(enterParams);
                // this.isTransitioning = false; // Se maneja en el finally
                console.log(`[StateMachine] Cambio directo a '${name}' completado (sin contenedor).`);
                return; // Salir del try, el finally se ejecutará
            }

            // Envolver la lógica de animación estándar en una promesa para poder usar await si es necesario,
            // o simplemente para estructurar el flujo.
            await new Promise<void>((resolveTransition) => {
                const onExitAnimationEnd = () => {
                    container.removeEventListener('animationend', onExitAnimationEndHandler);
                    if (exitFallbackTimeout) clearTimeout(exitFallbackTimeout);
                    container.classList.remove('gq-state-is-exiting', ...getAllAnimationClasses(container));
                    console.log(`[StateMachine]   ESTÁNDAR: Animación de salida '${exitAnimClass}' para '${oldStateName}' finalizada.`);

                    if (oldState?.exit) {
                        console.log(`[StateMachine]   ESTÁNDAR: Llamando oldState.exit() para '${oldStateName}'.`);
                        oldState.exit();
                    }
                    
                    if (exitAnimClass.includes('fade')) { 
                        console.log(`[StateMachine]   ESTÁNDAR: Limpiando container.innerHTML por animación fade.`);
                        container.innerHTML = '';
                    }

                    this.currentState = nextState;
                    this.currentStateName = name;

                    if (this.currentState?.enter) {
                        console.log(`[StateMachine]   ESTÁNDAR: Llamando currentState.enter() para '${this.currentStateName}'.`);
                        this.currentState.enter(enterParams);
                    }

                    console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de entrada '${enterAnimClass}' para '${this.currentStateName}'.`);
                    container.classList.add('gq-state-is-entering', enterAnimClass);
                    const enterDuration = getAnimationDurationFromClass(container, enterAnimClass);
                    let enterFallbackTimeout: number | undefined = window.setTimeout(() => {
                        console.warn(`[StateMachine]   ESTÁNDAR: Fallback para animationend de entrada en '${this.currentStateName}'.`);
                        container.removeEventListener('animationend', onEnterAnimationEndHandler); // Asegurar limpieza
                        container.classList.remove('gq-state-is-entering', ...getAllAnimationClasses(container));
                        // this.isTransitioning = false; // Se maneja en el finally
                        console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (fallback).`);
                        resolveTransition();
                    }, enterDuration + 150); // Margen un poco mayor

                    const onEnterAnimationEndHandler = (event: AnimationEvent) => {
                        if (event.target === container && event.animationName === getAnimationNameFromClass(enterAnimClass)) {
                            if (enterFallbackTimeout) clearTimeout(enterFallbackTimeout);
                            enterFallbackTimeout = undefined;
                            container.removeEventListener('animationend', onEnterAnimationEndHandler);
                            container.classList.remove('gq-state-is-entering', ...getAllAnimationClasses(container));
                            // this.isTransitioning = false; // Se maneja en el finally
                            console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (evento).`);
                            resolveTransition();
                        }
                    };
                    container.addEventListener('animationend', onEnterAnimationEndHandler);
                };
                
                let exitFallbackTimeout: number | undefined; 
                let onExitAnimationEndHandler: (event: AnimationEvent) => void; 

                if (oldState) { 
                    console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de salida '${exitAnimClass}' a '${oldStateName}'.`);
                    container.classList.add('gq-state-is-exiting', exitAnimClass);
                    const exitDuration = getAnimationDurationFromClass(container, exitAnimClass);

                    exitFallbackTimeout = window.setTimeout(() => {
                        console.warn(`[StateMachine]   ESTÁNDAR: Fallback para animationend de salida en '${oldStateName}'.`);
                        onExitAnimationEnd();
                    }, exitDuration + 150); 

                    onExitAnimationEndHandler = (event: AnimationEvent) => {
                        if (event.target === container && event.animationName === getAnimationNameFromClass(exitAnimClass)) {
                            onExitAnimationEnd();
                        }
                    };
                    container.addEventListener('animationend', onExitAnimationEndHandler);
                } else { 
                    console.log("[StateMachine]   ESTÁNDAR: No hay estado antiguo, procediendo directamente a la entrada.");
                    onExitAnimationEnd();
                }
            });
        }
    } catch (error) {
        console.error(`[StateMachine] ERROR CRÍTICO durante la transición de '${oldStateName || 'ninguno'}' a '${name}':`, error);
        this.wipeComponent?.reset(); 
        // Considerar forzar un estado seguro o detener el juego aquí
        // this.currentState = null; 
        // this.currentStateName = null;
    } finally {
        this.isTransitioning = false; 
        console.log(`[StateMachine] FIN TRANSICIÓN: a '${name}'. isTransitioning = false. Estado final: '${this.currentStateName}'.`);
    }
  }

  public update(deltaTime: number): void {
    if (!this.isTransitioning && this.currentState?.update) {
      try {
        this.currentState.update(deltaTime);
      } catch (e) {
        console.error(`[StateMachine] Error en update() de '${this.currentStateName}':`, e);
      }
    }
  }

  public getCurrentStateName(): string | null { return this.currentStateName; }
  public getCurrentState(): IState | null { return this.currentState; }
}

// --- Helper Functions ---
function getAnimationDurationFromClass(element: HTMLElement, animationClass: string): number {
  const originalClassName = element.className;
  element.className = `${originalClassName} ${animationClass}`.trim();
  const durationString = getComputedStyle(element).animationDuration || '0s';
  element.className = originalClassName; 

  const duration = parseFloat(durationString);
  return durationString.toLowerCase().includes('ms') ? duration : duration * 1000;
}

function getAnimationNameFromClass(utilityClass: string): string {
    if (utilityClass.startsWith('anim-')) {
        return utilityClass;
    }
    const parts = utilityClass.split('-');
    if (parts.length > 1) {
        if (parts[0] === 'gq') {
            return `anim-${parts.slice(1).join('-')}`;
        }
    }
    // console.warn(`[StateMachine Helper] No se pudo derivar el nombre de la animación de la clase '${utilityClass}'. Usando la clase directamente.`);
    return utilityClass; 
}

function getAllAnimationClasses(element: HTMLElement): string[] {
    const animationClassPatterns = ['gq-fade', 'gq-slide', 'gq-wipe', 'anim-'];
    return Array.from(element.classList).filter(cls => 
        animationClassPatterns.some(pattern => cls.startsWith(pattern))
    );
}
