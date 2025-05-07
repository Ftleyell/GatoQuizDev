// src/systems/CatFoodManager.ts

import { GameManager } from '../game/GameManager';
import { PlayerData } from '../game/PlayerData';
import { PhysicsManager } from './PhysicsManager';
import { CatManager } from './CatManager';
import { AudioManager } from './AudioManager';
import Matter from 'matter-js';
import { LitElement } from 'lit';

// Importar el componente de display de pellets y su tipo
import '../game/components/ui/food-pellet-display.ts';
import type { FoodPelletDisplay } from '../game/components/ui/food-pellet-display';
// Importar el componente del área de display de entidades y su tipo
import type { CatDisplayArea } from '../game/components/ui/cat-display-area';

// --- Constantes ---
const FOOD_PELLET_SIZE_FALLBACK = 8; // Tamaño por defecto si no se define en CSS
const FOOD_PELLET_DURATION = 3500; // Duración del pellet en milisegundos
const FOOD_PELLET_COLLISION_CATEGORY = 0x0008; // Categoría de colisión para la comida
const CAT_COLLISION_CATEGORY = 0x0002; // Categoría de colisión para los gatos
const CAT_ATTRACTION_FORCE = 0.0004; // Fuerza de atracción de los gatos hacia la comida
const MAX_ATTRACTION_DISTANCE_SQ = 500 * 500; // Distancia máxima (al cuadrado) para la atracción
const GROWTH_PER_PELLET = 1; // Cantidad de crecimiento que otorga un pellet
const MAX_CAT_SIZE = 300; // <<<--- CONSTANTE AÑADIDA AQUÍ (igual que en CatManager)
// ------------------

interface ActivePellet {
    body: Matter.Body; // Cuerpo físico del pellet
    element: FoodPelletDisplay; // Elemento visual del pellet
    creationTime: number; // Momento de creación (para duración)
    id: string; // Identificador único del pellet
}

export class CatFoodManager {
    private gameManager: GameManager;
    private physicsManager!: PhysicsManager;
    private playerData!: PlayerData;
    private catManager!: CatManager;
    private audioManager!: AudioManager;
    private catDisplayArea!: CatDisplayArea; // Área donde se muestran los pellets

    private isInitializedSuccessfully: boolean = false; // Indica si la inicialización fue exitosa
    private isEnabled: boolean = false; // Indica si la funcionalidad de comida está habilitada (ej. desbloqueada)
    public isActive: boolean = false; // Indica si la herramienta de comida está actualmente seleccionada por el jugador
    
    private activePellets: Map<string, ActivePellet> = new Map(); // Colección de pellets activos
    private nextPelletId: number = 0; // Contador para IDs de pellets

    private clickListener: ((event: MouseEvent | TouchEvent) => void) | null = null; // Listener para soltar comida
    
    private lastToggleTime: number = 0; // Para debounce al activar/desactivar la herramienta
    private readonly CATFOOD_TOGGLE_DEBOUNCE = 200; // Tiempo de debounce en ms

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    /**
     * Establece el área de display donde se renderizarán los pellets.
     * @param displayArea - El componente Lit <cat-display-area>.
     */
    public setCatDisplayArea(displayArea: CatDisplayArea): void {
        if (!displayArea) {
            console.error("CatFoodManager CRITICAL: Se intentó setear un CatDisplayArea nulo.");
            throw new Error("CatDisplayArea es nulo y es requerido por CatFoodManager.");
        }
        this.catDisplayArea = displayArea;
    }

    /**
     * Inicializa el CatFoodManager, obteniendo referencias a otros sistemas.
     */
    public init(): void {
        this.isInitializedSuccessfully = false;
        try {
            // Obtener instancias de los managers necesarios desde GameManager
            this.physicsManager = this.gameManager.getPhysicsManager();
            this.playerData = this.gameManager.getPlayerData();
            this.catManager = this.gameManager.getCatManager();
            this.audioManager = this.gameManager.getAudioManager();
            
            // Validar que todas las dependencias cruciales estén presentes
            if (!this.catDisplayArea) throw new Error("CatDisplayArea no ha sido seteado en CatFoodManager.");
            if (!this.physicsManager) throw new Error("PhysicsManager no disponible en CatFoodManager.");
            if (!this.playerData) throw new Error("PlayerData no disponible en CatFoodManager.");
            if (!this.catManager) throw new Error("CatManager no disponible en CatFoodManager.");
            if (!this.audioManager) throw new Error("AudioManager no disponible en CatFoodManager.");
            
            this.isInitializedSuccessfully = true;
        } catch (error) {
            console.error("CatFoodManager: Error CRÍTICO durante la inicialización de dependencias:", error);
            this.isEnabled = false; // Si falla la init, no se puede habilitar
        }
    }

    /**
     * Habilita la funcionalidad de comida para gatos (ej. después de ser desbloqueada).
     */
    public enable(): void {
        if (!this.isInitializedSuccessfully) {
            console.error("CatFoodManager: No se puede habilitar, la inicialización falló o las dependencias no están listas.");
            return;
        }
        if (this.isEnabled) return; // Ya está habilitada
        
        this.isEnabled = true;
        console.log("CatFoodManager: Funcionalidad de comida para gatos habilitada.");
    }

    /**
     * Activa o desactiva la herramienta de soltar comida.
     * @param forceState - (Opcional) Forzar un estado específico (true para activar, false para desactivar).
     */
    public toggleActive(forceState?: boolean): void {
        if (!this.isEnabled || !this.isInitializedSuccessfully || !this.playerData) {
            return;
        }

        // Debounce para evitar múltiples activaciones rápidas
        const now = Date.now();
        if (forceState === undefined && (now - this.lastToggleTime < this.CATFOOD_TOGGLE_DEBOUNCE)) {
            return;
        }
        this.lastToggleTime = now;

        const newState = (forceState !== undefined) ? forceState : !this.isActive;

        // No activar si no hay comida disponible (a menos que ya estuviera activa y se esté forzando a desactivar)
        if (newState === true && this.playerData.currentCatFood <= 0) {
            if (this.isActive) { // Si estaba activa y se intenta activar sin comida, desactivarla
                this.isActive = false;
                this.gameManager.setQuizUiFaded(false);
                this.updateListenerAndCursor();
                this.gameManager.updateToolButtonStates();
            }
            return;
        }

        if (newState === this.isActive) return; // No hay cambio de estado

        this.isActive = newState;
        this.gameManager.setQuizUiFaded(this.isActive); // Atenuar UI del quiz si la herramienta está activa
        this.updateListenerAndCursor(); // Actualizar listeners y cursor del mouse
        this.gameManager.updateToolButtonStates(); // Actualizar estado visual de los botones de herramienta
    }

    /**
     * Actualiza los listeners de clic y el cursor del mouse según el estado de la herramienta.
     */
    private updateListenerAndCursor(): void {
        if (this.catDisplayArea) {
            // Cambiar el cursor del área de display si la herramienta de comida está activa
            this.catDisplayArea.style.cursor = this.isActive ? 'copy' : ''; // 'copy' sugiere que se puede "soltar" algo
        }

        if (this.isActive) {
            this.addClickListener();
        } else {
            this.removeClickListener();
        }
    }

    /**
     * Añade el listener de clic al área de display para soltar comida.
     */
    private addClickListener(): void {
        if (this.clickListener || !this.isInitializedSuccessfully || !this.catDisplayArea) return;
        
        const listenArea = this.catDisplayArea; // El elemento <cat-display-area>
        this.clickListener = (event: MouseEvent | TouchEvent) => {
            if (!this.isActive || !this.isEnabled || !this.playerData) return;
            
            // Asegurarse que el clic fue directamente en el área de display y no en un gato
            const internalContainer = this.catDisplayArea.getInternalContainer();
            if (event.target !== listenArea && event.target !== internalContainer) {
                return; // Ignorar si el clic no fue en el fondo del área
            }

            event.preventDefault(); // Prevenir comportamiento por defecto (ej. scroll en touch)
            if (this.playerData.currentCatFood > 0) {
                const pos = this.getClickPosition(event, listenArea);
                this.spawnFoodPellet(pos); // Crear el pellet de comida
                this.applyAttractionForce(pos); // Atraer gatos cercanos
                if (this.playerData.spendCatFoodUnit()) { // Gastar una unidad de comida
                     this.gameManager.updateCatFoodUI(); // Actualizar UI de comida
                } else {
                     this.toggleActive(false); // Desactivar si se quedó sin comida
                }
            } else {
                this.toggleActive(false); // Desactivar si no hay comida
            }
        };
        // Añadir listeners para mouse y touch
        listenArea.addEventListener('mousedown', this.clickListener);
        listenArea.addEventListener('touchstart', this.clickListener, { passive: false });
    }

    /**
     * Remueve el listener de clic del área de display.
     */
    private removeClickListener(): void {
        if (!this.clickListener || !this.catDisplayArea) return;
        const listenArea = this.catDisplayArea;
        listenArea.removeEventListener('mousedown', this.clickListener);
        listenArea.removeEventListener('touchstart', this.clickListener);
        this.clickListener = null;
        listenArea.style.cursor = ''; // Restaurar cursor por defecto
    }

    /**
     * Obtiene la posición del clic relativa al elemento especificado.
     * @param event - El evento de mouse o touch.
     * @param relativeToElement - El elemento HTML respecto al cual calcular la posición.
     * @returns Un objeto con las coordenadas {x, y}.
     */
    private getClickPosition(event: MouseEvent | TouchEvent, relativeToElement: HTMLElement): { x: number, y: number } {
        const rect = relativeToElement.getBoundingClientRect();
        let clientX = 0, clientY = 0;
        if (event instanceof MouseEvent) { 
            clientX = event.clientX; 
            clientY = event.clientY; 
        } else if ((event as TouchEvent).touches && (event as TouchEvent).touches.length > 0) { 
            clientX = (event as TouchEvent).touches[0].clientX; 
            clientY = (event as TouchEvent).touches[0].clientY; 
        } else if ((event as TouchEvent).changedTouches && (event as TouchEvent).changedTouches.length > 0) { 
            // Usado para touchend/touchcancel si es necesario
            clientX = (event as TouchEvent).changedTouches[0].clientX; 
            clientY = (event as TouchEvent).changedTouches[0].clientY; 
        }
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    /**
     * Aplica una fuerza de atracción a los gatos cercanos hacia la posición de la comida.
     * @param targetPos - La posición {x, y} donde se soltó la comida.
     */
    private applyAttractionForce(targetPos: { x: number, y: number }): void {
        if (!this.catManager || !this.physicsManager?.getWorld) return;
        const cats = this.catManager.getAllCats();
        const world = this.physicsManager.getWorld();
        cats.forEach(cat => {
            if (cat.physics.body && !cat.physics.body.isStatic && Matter.Composite.get(world, cat.physics.body.id, 'body')) {
                const body = cat.physics.body;
                const direction = Matter.Vector.sub(targetPos, body.position);
                const distanceSq = Matter.Vector.magnitudeSquared(direction);
                // Solo aplicar fuerza si el gato está dentro de la distancia máxima de atracción
                if (distanceSq > 1 && distanceSq < MAX_ATTRACTION_DISTANCE_SQ) {
                    const distance = Math.sqrt(distanceSq);
                    // La fuerza disminuye con la distancia
                    const forceMagnitude = (CAT_ATTRACTION_FORCE * body.mass) / (distance * 0.1 + 1); 
                    const force = Matter.Vector.mult(Matter.Vector.normalise(direction), forceMagnitude);
                    try { Matter.Body.applyForce(body, body.position, force); } 
                    catch (error) { /* Ignorar errores si el cuerpo ya no existe */ }
                }
            }
        });
    }

    /**
     * Crea un nuevo pellet de comida en la posición especificada.
     * @param position - La posición {x, y} donde aparecerá el pellet.
     */
    public spawnFoodPellet(position: { x: number, y: number }): void {
        if (!this.isInitializedSuccessfully || !this.physicsManager?.getWorld || !this.catDisplayArea || !this.playerData) {
            console.warn("CatFoodManager: No se puede crear pellet, no inicializado o faltan dependencias.");
            return;
        }
        const pelletId = `food_pellet_entity_${this.nextPelletId++}`;
        // Obtener tamaño del pellet desde las variables CSS, con un fallback
        const pelletVisualSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gq-food-pellet-size').trim()) || FOOD_PELLET_SIZE_FALLBACK;
        
        // Crear cuerpo físico para el pellet
        const body = Matter.Bodies.circle(position.x, position.y, pelletVisualSize / 2, {
            label: 'foodPellet', 
            isSensor: true, // Es un sensor, no colisiona físicamente, solo detecta
            density: 0.0001, 
            frictionAir: 0.02, // Resistencia al aire para que no se mueva indefinidamente
            collisionFilter: { 
                category: FOOD_PELLET_COLLISION_CATEGORY, 
                mask: CAT_COLLISION_CATEGORY // Solo puede "colisionar" (ser detectado por) gatos
            },
            plugin: { pelletId: pelletId } // Guardar ID en el plugin del cuerpo para referencia
        });

        try { Matter.World.add(this.physicsManager.getWorld(), body); }
        catch (error) { console.error("CatFoodManager: Error añadiendo pellet al mundo físico:", error); return; }

        // Crear elemento visual del pellet
        const element = document.createElement('food-pellet-display') as FoodPelletDisplay;
        element.id = pelletId;
        
        // Establecer la posición inicial del elemento para la animación de aparición
        const halfSize = pelletVisualSize / 2;
        element.style.transform = `translate(${position.x - halfSize}px, ${position.y - halfSize}px)`;
        element.classList.add('appearing'); // Añadir clase para estado inicial de animación

        try { 
            this.catDisplayArea.addEntityElement(element); // Añadir al DOM
            // Forzar reflujo del navegador para que registre el estado inicial
            void element.offsetWidth; 
            // En el siguiente frame de animación, cambiar clases para activar la transición CSS
            requestAnimationFrame(() => {
                element.classList.remove('appearing');
                element.classList.add('spawned');
            });
        }
        catch (error) { 
            console.error("CatFoodManager: Error añadiendo pellet visual a catDisplayArea:", error); 
            try { Matter.World.remove(this.physicsManager.getWorld(), body); } catch (e) {} // Limpiar cuerpo físico si falla
            return; 
        }
        
        // Guardar pellet activo
        this.activePellets.set(pelletId, { body, element, creationTime: performance.now(), id: pelletId });
        this.audioManager?.playSound('draw_end'); // Reutilizar un sonido suave para soltar comida
    }

    /**
     * Actualiza la posición y duración de los pellets activos.
     * Se llama en el bucle principal del juego.
     * @param _deltaTime - Tiempo transcurrido desde el último frame (no usado directamente aquí).
     */
    public update(_deltaTime: number): void {
        if (!this.isEnabled || !this.isInitializedSuccessfully || this.activePellets.size === 0) return;
        
        const now = performance.now();
        const pelletsToRemove: string[] = [];

        this.activePellets.forEach((pellet) => {
            // Eliminar pellets que han excedido su duración
            if (now - pellet.creationTime > FOOD_PELLET_DURATION) {
                pelletsToRemove.push(pellet.id);
            } else if (pellet.element && pellet.body && pellet.element.classList.contains('spawned')) { 
                // Solo actualizar posición visual si el pellet ya ha "aparecido"
                const pelletSize = pellet.element.offsetWidth || (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gq-food-pellet-size').trim()) || FOOD_PELLET_SIZE_FALLBACK);
                const halfSize = pelletSize / 2;
                pellet.element.style.transform = `translate(${pellet.body.position.x - halfSize}px, ${pellet.body.position.y - halfSize}px)`;
            }
        });
        // Eliminar pellets marcados
        pelletsToRemove.forEach(pelletId => this.removeFoodPellet(pelletId));
    }

    /**
     * Elimina un pellet de comida del juego (física y visualmente).
     * @param pelletId - El ID del pellet a eliminar.
     * @param _consumed - (Opcional) Indica si el pellet fue consumido (no usado actualmente para lógica diferente).
     */
    public removeFoodPellet(pelletId: string, _consumed: boolean = false): void {
        const pellet = this.activePellets.get(pelletId);
        if (pellet) {
            // Eliminar cuerpo físico del mundo de Matter.js
            if (this.physicsManager?.getWorld && pellet.body) {
                 try { 
                     if (Matter.Composite.get(this.physicsManager.getWorld(), pellet.body.id, 'body')) {
                        Matter.World.remove(this.physicsManager.getWorld(), pellet.body); 
                     }
                 } catch (error) { /* Ignorar si el cuerpo ya no existe */ }
            }
            // Eliminar elemento visual del DOM
            if (this.catDisplayArea && pellet.element) {
                this.catDisplayArea.removeEntityElement(pellet.element);
            }
            // Eliminar de la lista de pellets activos
            this.activePellets.delete(pelletId);
        }
    }

    /**
     * Procesa la colisión entre un gato y un pellet de comida.
     * @param catBodyId - El ID del cuerpo físico del gato.
     * @param foodBody - El cuerpo físico del pellet de comida.
     */
    public processCatFoodCollision(catBodyId: number, foodBody: Matter.Body): void {
        const pelletId = foodBody.plugin?.pelletId as string | undefined;
        if (!pelletId || !this.activePellets.has(pelletId) || !this.catManager || !this.playerData || !this.audioManager || !this.physicsManager?.getWorld) {
            return; // Salir si falta alguna dependencia o el pellet no está activo
        }

        const catEntityId = this.catManager.bodyIdToEntityIdMap.get(catBodyId);
        if (!catEntityId) { return; } // Gato no encontrado
        
        const cat = this.catManager.getCat(catEntityId);
        if (!cat?.value || !cat.physics.body || !(cat.render?.element instanceof LitElement) ) {
            return; // Gato o sus componentes necesarios no encontrados
        }
        const catDisplayElement = cat.render.element as import('../game/components/ui/cat-entity-display').CatEntityDisplay;
        
        const currentSize = cat.value.currentSize;
        const maxSizeLimit = this.playerData.getCurrentMaxSizeLimit(); // Límite de tamaño del jugador
        
        // Calcular nuevo tamaño, sin exceder el límite del jugador ni el máximo global
        // Ahora MAX_CAT_SIZE está definida en este archivo
        let newSize = Math.min(maxSizeLimit, MAX_CAT_SIZE, currentSize + GROWTH_PER_PELLET); 
        const scaleFactor = newSize / currentSize;

        if (scaleFactor > 1.0001) { // Solo aplicar si hay un cambio de tamaño real
             cat.value.currentSize = newSize;
             try {
                 // Escalar cuerpo físico
                 if (Matter.Composite.get(this.physicsManager.getWorld(), cat.physics.body.id, 'body')) {
                     Matter.Body.scale(cat.physics.body, scaleFactor, scaleFactor);
                     if (cat.physics.body.plugin) cat.physics.body.plugin.currentSize = newSize;
                 } else { throw new Error("Cuerpo del gato no encontrado en el mundo para escalar"); }
                 
                 // Actualizar tamaño visual del componente Lit
                 if (catDisplayElement && typeof catDisplayElement.size === 'number') {
                     catDisplayElement.size = newSize;
                 }
             } catch (error) {
                  console.error("CatFoodManager: Error al escalar gato después de comer:", error);
                  // Revertir cambios en caso de error
                  cat.value.currentSize = currentSize; 
                  if (cat.physics.body.plugin) cat.physics.body.plugin.currentSize = currentSize;
             }
        }
        this.audioManager.playSound('eat'); // Reproducir sonido de comer
        this.removeFoodPellet(pelletId, true); // Eliminar el pellet consumido
    }

    /**
     * Limpia todos los recursos y listeners al cerrar el CatFoodManager.
     */
    public destroy(): void {
        this.removeClickListener(); // Eliminar listeners de clic
        // Eliminar todos los pellets activos
        const currentPelletIds = Array.from(this.activePellets.keys());
        currentPelletIds.forEach(pelletId => this.removeFoodPellet(pelletId));
        this.activePellets.clear();
        
        // Resetear estados
        this.isEnabled = false;
        this.isActive = false;
        this.isInitializedSuccessfully = false;
        if (this.catDisplayArea) {
            this.catDisplayArea.style.cursor = ''; // Restaurar cursor
        }
    }
}
