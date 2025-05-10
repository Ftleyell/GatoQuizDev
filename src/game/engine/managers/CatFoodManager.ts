// src/systems/CatFoodManager.ts

// src/game/engine/managers/CatFoodManager.ts

import { GameManager } from '../../GameManager';     // Sube dos niveles y entra a 'game'
import { PlayerData } from '../../PlayerData';        // Sube dos niveles y entra a 'game'
import { PhysicsManager, AudioManager } from '../../../systems'; // Sube tres niveles a 'src', luego a 'systems' (usa index.ts)
import { CatManager } from '../managers';             // Sube un nivel a 'engine', luego a 'managers' (usa index.ts, donde CatManager ahora reside)
import Matter from 'matter-js';
import { LitElement } from 'lit';

// Para asegurar que el componente Lit se registre (se ejecuta el código del archivo):
import '../../components/ui/food-pellet-display.js'; // Usar .js si tu bundler lo prefiere para estos casos, o mantener .ts

// Para tipos, usando los barrel files:
import type { FoodPelletDisplay, CatDisplayArea, CatEntityDisplay } from '../../components/ui'; // <- ASEGÚRATE QUE CatEntityDisplay ESTÉ AQUÍ

const FOOD_PELLET_SIZE_FALLBACK = 8;
const FOOD_PELLET_DURATION = 3500;
const FOOD_PELLET_COLLISION_CATEGORY = 0x0008;
const CAT_COLLISION_CATEGORY = 0x0002;
const CAT_ATTRACTION_FORCE = 0.0004;
const MAX_ATTRACTION_DISTANCE_SQ = 500 * 500;
const GROWTH_PER_PELLET = 1;
const MAX_CAT_SIZE = 300;

interface ActivePellet {
    body: Matter.Body;
    element: FoodPelletDisplay;
    creationTime: number;
    id: string;
}

export class CatFoodManager {
    private gameManager: GameManager;
    private physicsManager!: PhysicsManager;
    private playerData!: PlayerData;
    private catManager!: CatManager;
    private audioManager!: AudioManager;
    private catDisplayArea!: CatDisplayArea;
    private isInitializedSuccessfully: boolean = false;
    private isEnabled: boolean = false;
    public isActive: boolean = false;
    private activePellets: Map<string, ActivePellet> = new Map();
    private nextPelletId: number = 0;
    private clickListener: ((event: MouseEvent | TouchEvent) => void) | null = null;

    // ELIMINADO: private lastToggleTime: number = 0;
    // ELIMINADO: private readonly CATFOOD_TOGGLE_DEBOUNCE = 200;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    public setCatDisplayArea(displayArea: CatDisplayArea): void {
        if (!displayArea) {
            console.error("CatFoodManager CRITICAL: Se intentó setear un CatDisplayArea nulo.");
            throw new Error("CatDisplayArea es nulo y es requerido por CatFoodManager.");
        }
        this.catDisplayArea = displayArea;
    }

    public init(): void {
        this.isInitializedSuccessfully = false;
        try {
            this.physicsManager = this.gameManager.getPhysicsManager();
            this.playerData = this.gameManager.getPlayerData();
            this.catManager = this.gameManager.getCatManager();
            this.audioManager = this.gameManager.getAudioManager();
            if (!this.catDisplayArea) throw new Error("CatDisplayArea no ha sido seteado en CatFoodManager.");
            if (!this.physicsManager) throw new Error("PhysicsManager no disponible en CatFoodManager.");
            if (!this.playerData) throw new Error("PlayerData no disponible en CatFoodManager.");
            if (!this.catManager) throw new Error("CatManager no disponible en CatFoodManager.");
            if (!this.audioManager) throw new Error("AudioManager no disponible en CatFoodManager.");
            this.isInitializedSuccessfully = true;
        } catch (error) {
            console.error("CatFoodManager: Error CRÍTICO durante la inicialización de dependencias:", error);
            this.isEnabled = false;
        }
    }

    public enable(): void {
        if (!this.isInitializedSuccessfully) {
            console.error("CatFoodManager: No se puede habilitar, la inicialización falló.");
            return;
        }
        if (this.isEnabled) return;
        this.isEnabled = true;
        console.log("CatFoodManager: Funcionalidad de comida para gatos habilitada.");
    }

    public toggleActive(forceState?: boolean): void {
        if (!this.isEnabled || !this.isInitializedSuccessfully || !this.playerData) {
            return;
        }
        // ELIMINADO: Debounce (ahora en ToolManager)
        // const now = Date.now();
        // if (forceState === undefined && (now - this.lastToggleTime < this.CATFOOD_TOGGLE_DEBOUNCE)) {
        //     return;
        // }
        // this.lastToggleTime = now;

        const newState = (forceState !== undefined) ? forceState : !this.isActive;

        // La verificación de si hay comida disponible la hará ToolManager.
        // if (newState === true && this.playerData.currentCatFood <= 0) {
        //     if (this.isActive) {
        //         this.isActive = false;
        //         this.gameManager.setQuizUiFaded(false);
        //         this.updateListenerAndCursor();
        //         // this.gameManager.updateToolButtonStates(); // ToolManager lo hará
        //     }
        //     return;
        // }

        if (newState === this.isActive) return;
        this.isActive = newState;

        this.gameManager.getGlobalUIManager().setModuleUIsFaded(this.isActive); // <--- LÍNEA CORREGIDA
        this.updateListenerAndCursor();
    }

    private updateListenerAndCursor(): void {
        if (this.catDisplayArea) {
            this.catDisplayArea.style.cursor = this.isActive ? 'copy' : '';
        }
        if (this.isActive) {
            this.addClickListener();
        } else {
            this.removeClickListener();
        }
    }

    private addClickListener(): void {
        if (this.clickListener || !this.isInitializedSuccessfully || !this.catDisplayArea) return;
        const listenArea = this.catDisplayArea;
        this.clickListener = (event: MouseEvent | TouchEvent) => {
            if (!this.isActive || !this.isEnabled || !this.playerData) return;
            const internalContainer = this.catDisplayArea.getInternalContainer();
            if (event.target !== listenArea && event.target !== internalContainer) {
                return;
            }
            event.preventDefault();
            if (this.playerData.currentCatFood > 0) {
                const pos = this.getClickPosition(event, listenArea);
                this.spawnFoodPellet(pos);
                this.applyAttractionForce(pos);
                if (this.playerData.spendCatFoodUnit()) {
                     this.gameManager.updateCatFoodUI(); // Actualiza la UI global, ToolManager actualizará su botón
                } else {
                     this.toggleActive(false); // Desactiva internamente si se quedó sin comida
                }
            } else {
                this.toggleActive(false); // Desactiva internamente
            }
        };
        listenArea.addEventListener('mousedown', this.clickListener);
        listenArea.addEventListener('touchstart', this.clickListener, { passive: false });
    }

    private removeClickListener(): void {
        if (!this.clickListener || !this.catDisplayArea) return;
        const listenArea = this.catDisplayArea;
        listenArea.removeEventListener('mousedown', this.clickListener);
        listenArea.removeEventListener('touchstart', this.clickListener);
        this.clickListener = null;
        listenArea.style.cursor = '';
    }

    private getClickPosition(event: MouseEvent | TouchEvent, relativeToElement: HTMLElement): { x: number, y: number } {
        const rect = relativeToElement.getBoundingClientRect();
        let clientX = 0, clientY = 0;
        if (event instanceof MouseEvent) { clientX = event.clientX; clientY = event.clientY; }
        else if ((event as TouchEvent).touches && (event as TouchEvent).touches.length > 0) { clientX = (event as TouchEvent).touches[0].clientX; clientY = (event as TouchEvent).touches[0].clientY; }
        else if ((event as TouchEvent).changedTouches && (event as TouchEvent).changedTouches.length > 0) { clientX = (event as TouchEvent).changedTouches[0].clientX; clientY = (event as TouchEvent).changedTouches[0].clientY; }
        return { x: clientX - rect.left, y: clientY - rect.top };
    }

    private applyAttractionForce(targetPos: { x: number, y: number }): void {
        if (!this.catManager || !this.physicsManager?.getWorld) return;
        const cats = this.catManager.getAllCats();
        const world = this.physicsManager.getWorld();
        cats.forEach(cat => {
            if (cat.physics.body && !cat.physics.body.isStatic && Matter.Composite.get(world, cat.physics.body.id, 'body')) {
                const body = cat.physics.body;
                const direction = Matter.Vector.sub(targetPos, body.position);
                const distanceSq = Matter.Vector.magnitudeSquared(direction);
                if (distanceSq > 1 && distanceSq < MAX_ATTRACTION_DISTANCE_SQ) {
                    const distance = Math.sqrt(distanceSq);
                    const forceMagnitude = (CAT_ATTRACTION_FORCE * body.mass) / (distance * 0.1 + 1);
                    const force = Matter.Vector.mult(Matter.Vector.normalise(direction), forceMagnitude);
                    try { Matter.Body.applyForce(body, body.position, force); }
                    catch (error) { /* Ignorar */ }
                }
            }
        });
    }

    public spawnFoodPellet(position: { x: number, y: number }): void {
        if (!this.isInitializedSuccessfully || !this.physicsManager?.getWorld || !this.catDisplayArea || !this.playerData) {
            console.warn("CatFoodManager: No se puede crear pellet, no inicializado o faltan dependencias.");
            return;
        }
        const pelletId = `food_pellet_entity_${this.nextPelletId++}`;
        const pelletVisualSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gq-food-pellet-size').trim()) || FOOD_PELLET_SIZE_FALLBACK;
        const body = Matter.Bodies.circle(position.x, position.y, pelletVisualSize / 2, {
            label: 'foodPellet', isSensor: true, density: 0.0001, frictionAir: 0.02,
            collisionFilter: { category: FOOD_PELLET_COLLISION_CATEGORY, mask: CAT_COLLISION_CATEGORY },
            plugin: { pelletId: pelletId }
        });
        try { Matter.World.add(this.physicsManager.getWorld(), body); }
        catch (error) { console.error("CatFoodManager: Error añadiendo pellet al mundo físico:", error); return; }
        const element = document.createElement('food-pellet-display') as FoodPelletDisplay;
        element.id = pelletId;
        const halfSize = pelletVisualSize / 2;
        element.style.transform = `translate(${position.x - halfSize}px, ${position.y - halfSize}px)`;
        element.classList.add('appearing');
        try {
            this.catDisplayArea.addEntityElement(element);
            void element.offsetWidth;
            requestAnimationFrame(() => {
                element.classList.remove('appearing');
                element.classList.add('spawned');
            });
        }
        catch (error) {
            console.error("CatFoodManager: Error añadiendo pellet visual a catDisplayArea:", error);
            try { Matter.World.remove(this.physicsManager.getWorld(), body); } catch (e) {}
            return;
        }
        this.activePellets.set(pelletId, { body, element, creationTime: performance.now(), id: pelletId });
        this.audioManager?.playSound('draw_end'); // Reutilizar sonido suave
    }

    public update(_deltaTime: number): void {
        if (!this.isEnabled || !this.isInitializedSuccessfully || this.activePellets.size === 0) return;
        const now = performance.now();
        const pelletsToRemove: string[] = [];
        this.activePellets.forEach((pellet) => {
            if (now - pellet.creationTime > FOOD_PELLET_DURATION) {
                pelletsToRemove.push(pellet.id);
            } else if (pellet.element && pellet.body && pellet.element.classList.contains('spawned')) {
                const pelletSize = pellet.element.offsetWidth || (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gq-food-pellet-size').trim()) || FOOD_PELLET_SIZE_FALLBACK);
                const halfSize = pelletSize / 2;
                pellet.element.style.transform = `translate(${pellet.body.position.x - halfSize}px, ${pellet.body.position.y - halfSize}px)`;
            }
        });
        pelletsToRemove.forEach(pelletId => this.removeFoodPellet(pelletId));
    }

    public removeFoodPellet(pelletId: string, _consumed: boolean = false): void {
        const pellet = this.activePellets.get(pelletId);
        if (pellet) {
            if (this.physicsManager?.getWorld && pellet.body) {
                 try {
                     if (Matter.Composite.get(this.physicsManager.getWorld(), pellet.body.id, 'body')) {
                        Matter.World.remove(this.physicsManager.getWorld(), pellet.body);
                     }
                 } catch (error) { /* Ignorar */ }
            }
            if (this.catDisplayArea && pellet.element) {
                this.catDisplayArea.removeEntityElement(pellet.element);
            }
            this.activePellets.delete(pelletId);
        }
    }

    public processCatFoodCollision(catBodyId: number, foodBody: Matter.Body): void {
        const pelletId = foodBody.plugin?.pelletId as string | undefined;
        if (!pelletId || !this.activePellets.has(pelletId) || !this.catManager || !this.playerData || !this.audioManager || !this.physicsManager?.getWorld) {
            return;
        }
        const catEntityId = this.catManager.bodyIdToEntityIdMap.get(catBodyId);
        if (!catEntityId) { return; }
        const cat = this.catManager.getCat(catEntityId);
        if (!cat?.value || !cat.physics.body || !(cat.render?.element instanceof LitElement) ) {
            return;
        }
        const catDisplayElement = cat.render.element as CatEntityDisplay;        const currentSize = cat.value.currentSize;
        const maxSizeLimit = this.playerData.getCurrentMaxSizeLimit();
        let newSize = Math.min(maxSizeLimit, MAX_CAT_SIZE, currentSize + GROWTH_PER_PELLET);
        const scaleFactor = newSize / currentSize;
        if (scaleFactor > 1.0001) {
             cat.value.currentSize = newSize;
             try {
                 if (Matter.Composite.get(this.physicsManager.getWorld(), cat.physics.body.id, 'body')) {
                     Matter.Body.scale(cat.physics.body, scaleFactor, scaleFactor);
                     if (cat.physics.body.plugin) cat.physics.body.plugin.currentSize = newSize;
                 } else { throw new Error("Cuerpo del gato no encontrado en el mundo para escalar"); }
                 if (catDisplayElement && typeof catDisplayElement.size === 'number') {
                     catDisplayElement.size = newSize;
                 }
             } catch (error) {
                  console.error("CatFoodManager: Error al escalar gato después de comer:", error);
                  cat.value.currentSize = currentSize;
                  if (cat.physics.body.plugin) cat.physics.body.plugin.currentSize = currentSize;
             }
        }
        this.audioManager.playSound('eat');
        this.removeFoodPellet(pelletId, true);
    }

    public destroy(): void {
        this.removeClickListener();
        const currentPelletIds = Array.from(this.activePellets.keys());
        currentPelletIds.forEach(pelletId => this.removeFoodPellet(pelletId));
        this.activePellets.clear();
        this.isEnabled = false;
        this.isActive = false;
        this.isInitializedSuccessfully = false;
        if (this.catDisplayArea) {
            this.catDisplayArea.style.cursor = '';
        }
    }
}