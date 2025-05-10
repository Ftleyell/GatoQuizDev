// src/game/StateMachine.ts

import type { DiagonalWipe } from '../game/components/ui/diagonal-wipe'; 

export interface IState {
  enter(params?: any): void | Promise<void>; // Permitir que enter sea síncrono o asíncrono
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
    console.log('[StateMachine] Wipe component seteado:', component ? component.tagName : 'null');
    this.wipeComponent?.reset(); 
  }

  public addState(name: string, stateObject: IState): void {
    if (this.states.has(name)) {
      console.warn(`[StateMachine] El estado '${name}' ya existe. Sobrescribiendo.`);
    }
    this.states.set(name, stateObject);
    // console.log(`[StateMachine] Estado '${name}' añadido.`); 
  }

  public async changeState(
    name: string,
    enterParams?: any,
    forceExitAnimationClass?: string,
    forceEnterAnimationClass?: string
  ): Promise<void> {
    console.log(`[StateMachine] Solicitud para cambiar a estado '${name}'. Estado actual: '${this.currentStateName || 'ninguno'}', isTransitioning: ${this.isTransitioning}`);
    if (this.isTransitioning) {
      console.warn(`[StateMachine] Transición a '${name}' ignorada, otra transición ya está en progreso.`);
      return;
    }
    
    const nextState = this.states.get(name);
    if (!nextState) {
      console.error(`[StateMachine] Estado '${name}' no existe. Estados disponibles:`, Array.from(this.states.keys()));
      return; // No resetear isTransitioning aquí, se maneja en el finally si la transición no inicia.
    }
    
    if (this.currentStateName === name && !forceExitAnimationClass && !forceEnterAnimationClass) {
        console.warn(`[StateMachine] Ya en estado '${name}' y sin forzar animación. No se realiza la transición.`);
        return;
    }

    this.isTransitioning = true;
    const oldState = this.currentState;
    const oldStateName = this.currentStateName;
    console.log(`[StateMachine] INICIO TRANSICIÓN: de '${oldStateName || 'ninguno'}' a '${name}'. isTransitioning = true.`);

    const exitAnimClass = forceExitAnimationClass || oldState?.getPreferredExitAnimation?.() || 'gq-fade-out';
    const enterAnimClass = forceEnterAnimationClass || nextState?.getPreferredEnterAnimation?.() || 'gq-fade-in';
    console.log(`[StateMachine] Animaciones seleccionadas: Salida='${exitAnimClass}', Entrada='${enterAnimClass}'`);

    try {
        if (this.wipeComponent && (exitAnimClass === 'gq-wipe-transition' || enterAnimClass === 'gq-wipe-transition')) {
            console.log(`[StateMachine] Usando BARRIDO (WIPE) de '${oldStateName || 'ninguno'}' a '${name}'.`);
            
            if (this.wipeComponent.visible && this.wipeComponent.classList.contains('animate-in')) {
                console.log("[StateMachine] Wipe ya estaba en 'animate-in', reseteando antes de nuevo playIn.");
                this.wipeComponent.reset(); // Asegurar que esté reseteado si una transición anterior no completó el playOut
                await new Promise(r => setTimeout(r, 50)); // Pequeña pausa para que el reset surta efecto en el DOM
            }
            
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
                console.log(`[StateMachine]   BARRIDO: Llamando currentState.enter() para '${this.currentStateName}'. Params:`, enterParams);
                const enterResult = this.currentState.enter(enterParams); 
                if (enterResult instanceof Promise) {
                    console.log(`[StateMachine]   BARRIDO: currentState.enter() para '${this.currentStateName}' es async, esperando...`);
                    await enterResult;
                    console.log(`[StateMachine]   BARRIDO: currentState.enter() async para '${this.currentStateName}' COMPLETADO.`);
                } else {
                    console.log(`[StateMachine]   BARRIDO: currentState.enter() sync para '${this.currentStateName}' COMPLETADO.`);
                }
            }
            
            console.log(`[StateMachine]   BARRIDO: Llamando wipeComponent.playOut() para revelar '${this.currentStateName}'...`);
            await this.wipeComponent.playOut();
            console.log(`[StateMachine]   BARRIDO: wipeComponent.playOut() COMPLETADO.`);
            
            // No es necesario resetear aquí si playOut ya lo hace o si se resetea al inicio de playIn.
            // this.wipeComponent.reset(); 
            console.log(`[StateMachine] Transición de BARRIDO a '${this.currentStateName}' finalizada exitosamente.`);

        } else { 
            console.log(`[StateMachine] Usando animación ESTÁNDAR ('${exitAnimClass}' -> '${enterAnimClass}') de '${oldStateName || 'ninguno'}' a '${name}'.`);
            const container = this.animationContainer || document.getElementById('app'); // Fallback a #app si no hay animationContainer
            if (!container) {
                console.error("[StateMachine] Contenedor de animación estándar no encontrado. Realizando cambio directo.");
                if(oldState?.exit) oldState.exit();
                this.currentState = nextState;
                this.currentStateName = name;
                const enterResult = this.currentState.enter(enterParams);
                if (enterResult instanceof Promise) await enterResult;
                console.log(`[StateMachine] Cambio directo a '${name}' completado (sin contenedor de animación).`);
                return; 
            }

            await new Promise<void>((resolveTransition) => {
                const onExitAnimationEnd = async () => { // Hacer esta función interna async
                    container.removeEventListener('animationend', onExitAnimationEndHandler);
                    if (exitFallbackTimeout) clearTimeout(exitFallbackTimeout);
                    exitFallbackTimeout = undefined;
                    container.classList.remove('gq-state-is-exiting', ...getAllAnimationClasses(container));
                    console.log(`[StateMachine]   ESTÁNDAR: Animación de salida '${exitAnimClass}' para '${oldStateName}' finalizada.`);

                    if (oldState?.exit) {
                        console.log(`[StateMachine]   ESTÁNDAR: Llamando oldState.exit() para '${oldStateName}'.`);
                        oldState.exit();
                    }
                    
                    if (exitAnimClass.includes('fade') || exitAnimClass.includes('slide')) { 
                        console.log(`[StateMachine]   ESTÁNDAR: Limpiando container.innerHTML por animación fade/slide.`);
                        container.innerHTML = '';
                    }

                    this.currentState = nextState;
                    this.currentStateName = name;

                    if (this.currentState?.enter) {
                        console.log(`[StateMachine]   ESTÁNDAR: Llamando currentState.enter() para '${this.currentStateName}'. Params:`, enterParams);
                        const enterResult = this.currentState.enter(enterParams);
                        if (enterResult instanceof Promise) {
                            console.log(`[StateMachine]   ESTÁNDAR: currentState.enter() para '${this.currentStateName}' es async, esperando...`);
                            await enterResult; // Esperar si es una promesa
                            console.log(`[StateMachine]   ESTÁNDAR: currentState.enter() async para '${this.currentStateName}' COMPLETADO.`);
                        } else {
                            console.log(`[StateMachine]   ESTÁNDAR: currentState.enter() sync para '${this.currentStateName}' COMPLETADO.`);
                        }
                    }

                    console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de entrada '${enterAnimClass}' para '${this.currentStateName}'.`);
                    container.classList.add('gq-state-is-entering', enterAnimClass);
                    const enterDuration = getAnimationDurationFromClass(container, enterAnimClass);
                    let enterFallbackTimeout: number | undefined = window.setTimeout(() => {
                        console.warn(`[StateMachine]   ESTÁNDAR: Fallback por TIMEOUT para animationend de entrada en '${this.currentStateName}' (anim: ${enterAnimClass}).`);
                        container.removeEventListener('animationend', onEnterAnimationEndHandler); 
                        container.classList.remove('gq-state-is-entering', ...getAllAnimationClasses(container));
                        console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (fallback por timeout).`);
                        resolveTransition();
                    }, enterDuration + 200); // Aumentar un poco el margen para el fallback

                    const onEnterAnimationEndHandler = (event: AnimationEvent) => {
                        if (event.target === container && event.animationName === getAnimationNameFromClass(enterAnimClass)) {
                            if (enterFallbackTimeout) clearTimeout(enterFallbackTimeout);
                            enterFallbackTimeout = undefined;
                            container.removeEventListener('animationend', onEnterAnimationEndHandler);
                            container.classList.remove('gq-state-is-entering', ...getAllAnimationClasses(container));
                            console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (evento animationend).`);
                            resolveTransition();
                        } else if (event.target === container) {
                            console.log(`[StateMachine]   ESTÁNDAR: evento animationend capturado para '${event.animationName}', esperando '${getAnimationNameFromClass(enterAnimClass)}'.`);
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
                    console.log(`[StateMachine]   ESTÁNDAR: Duración calculada para salida '${exitAnimClass}': ${exitDuration}ms.`);

                    exitFallbackTimeout = window.setTimeout(() => {
                        console.warn(`[StateMachine]   ESTÁNDAR: Fallback por TIMEOUT para animationend de salida en '${oldStateName}' (anim: ${exitAnimClass}).`);
                        onExitAnimationEnd(); // Llamar directamente si el evento no se dispara
                    }, exitDuration + 200); // Aumentar un poco el margen para el fallback

                    onExitAnimationEndHandler = (event: AnimationEvent) => {
                        if (event.target === container && event.animationName === getAnimationNameFromClass(exitAnimClass)) {
                            console.log(`[StateMachine]   ESTÁNDAR: Evento animationend de SALIDA capturado para '${event.animationName}'.`);
                            onExitAnimationEnd();
                        } else if (event.target === container) {
                            console.log(`[StateMachine]   ESTÁNDAR: evento animationend de SALIDA capturado para '${event.animationName}', esperando '${getAnimationNameFromClass(exitAnimClass)}'.`);
                        }
                    };
                    container.addEventListener('animationend', onExitAnimationEndHandler);
                } else { 
                    console.log("[StateMachine]   ESTÁNDAR: No hay estado antiguo (oldState es null), procediendo directamente a la lógica de entrada.");
                    onExitAnimationEnd(); // Llamar directamente para configurar el nuevo estado
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
        console.log(`[StateMachine] FIN TRANSICIÓN: a '${name}'. isTransitioning = false. Estado final actual: '${this.currentStateName}'.`);
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

// --- Helper Functions (sin cambios respecto a la versión que ya tienes) ---
function getAnimationDurationFromClass(element: HTMLElement, animationClass: string): number {
  const originalClassName = element.className;
  // Aplicar temporalmente la clase para leer el estilo computado
  // Asegurarse de que el elemento esté en el DOM para getComputedStyle
  let tempAdded = false;
  if (!element.classList.contains(animationClass)) {
    element.classList.add(animationClass);
    tempAdded = true;
  }
  
  const durationString = getComputedStyle(element).animationDuration || '0s';
  
  if (tempAdded) {
    element.classList.remove(animationClass);
  }
  // Restaurar la clase original si se cambió solo para la medición (no debería ser necesario aquí)
  // element.className = originalClassName; 

  const duration = parseFloat(durationString);
  return durationString.toLowerCase().includes('ms') ? duration : duration * 1000;
}

function getAnimationNameFromClass(utilityClass: string): string {
    // Esta función intenta derivar el nombre real de la animación CSS desde una clase de utilidad.
    // Si tu clase es 'gq-fade-out', y la animación CSS es 'anim-fade-out', esto debería funcionar.
    // Si la clase de utilidad ES el nombre de la animación, entonces también.
    // Ajusta esta lógica si tus nombres de animación no siguen este patrón.
    if (utilityClass.startsWith('anim-')) { // Si la clase ya es el nombre de la animación
        return utilityClass;
    }
    // Intenta derivar de clases como 'gq-fade-out' a 'anim-fade-out'
    const parts = utilityClass.split('-');
    if (parts.length > 1) {
        if (parts[0] === 'gq') { // Asume prefijo 'gq-' para clases de utilidad de animación
            return `anim-${parts.slice(1).join('-')}`;
        }
    }
    // Fallback: si no se puede derivar, asumir que la clase es el nombre de la animación.
    // console.warn(`[StateMachine Helper] No se pudo derivar el nombre de la animación CSS de la clase de utilidad '${utilityClass}'. Usando la clase directamente como nombre de animación.`);
    return utilityClass; 
}

function getAllAnimationClasses(element: HTMLElement): string[] {
    // Lista de prefijos comunes para clases de animación que quieres limpiar
    const animationClassPatterns = ['gq-fade', 'gq-slide', 'gq-wipe', 'anim-']; // Añade más prefijos si es necesario
    return Array.from(element.classList).filter(cls => 
        animationClassPatterns.some(pattern => cls.startsWith(pattern))
    );
}