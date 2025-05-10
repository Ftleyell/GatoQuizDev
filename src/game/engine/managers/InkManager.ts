// src/systems/InkManager.ts

// src/game/engine/managers/InkManager.ts

import { GameManager } from '../../GameManager';   // Sube dos niveles ('engine', 'game') para llegar a src/, luego entra a 'game/'
import { PlayerData } from '../../PlayerData';      // Sube dos niveles ('engine', 'game') para llegar a src/, luego entra a 'game/'
import { PhysicsManager } from '../../../systems'; // Sube tres niveles ('managers', 'engine', 'game') para llegar a src/, luego a 'systems/' (usa index.ts)
import Matter from 'matter-js';

// Para asegurar que el componente Lit se registre (se ejecuta el código del archivo):
import '../../components/ui/drawing-canvas-layer.js'; // Sube dos niveles, entra a 'components/ui/' (o .ts)

// Para tipos, usando los barrel files:
import type { DrawingCanvasLayer } from '../../components/ui'; // Sube dos niveles, entra a 'components/ui/' (usa index.ts)

// --- Constantes de Dibujo (sin cambios) ---
const MIN_PATH_DISTANCE_SQ = 25;
const INK_LINE_THICKNESS = 8;
const INK_PER_CORRECT_ANSWER = 150;
const INK_COLLISION_CATEGORY = 0x0004;
const CAT_COLLISION_CATEGORY = 0x0002;
const INK_COLLISION_MASK = CAT_COLLISION_CATEGORY;

type Point = { x: number; y: number };
type DrawnPath = { points: Point[]; bodies: Matter.Body[] };

export class InkManager {
    private gameManager: GameManager;
    private physicsManager!: PhysicsManager;
    private playerData!: PlayerData;
    private drawingCanvasLayer: DrawingCanvasLayer | null = null;
    private actualCanvasElement: HTMLCanvasElement | null = null;
    private drawingCtx: CanvasRenderingContext2D | null = null;
    public isBrushActive: boolean = false;
    private isDrawing: boolean = false;
    private currentPath: Point[] = [];
    private lastPoint: Point | null = null;
    private drawnPaths: DrawnPath[] = [];
    private isInitialized: boolean = false;
    private generalListeners: { element: HTMLElement | Window; type: string; handler: (e: any) => void, options?: AddEventListenerOptions | boolean }[] = [];

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
        try {
            this.playerData = gameManager.getPlayerData();
        } catch (e) {
            console.error("InkManager: Error en constructor al obtener PlayerData.", e);
        }
    }

    public setPhysicsManager(physicsManager: PhysicsManager): void {
        this.physicsManager = physicsManager;
    }

    public async init(): Promise<void> {
        if (this.isInitialized) {
            this.updateInkRelatedUI();
            return;
        }
        console.log("InkManager: init() INICIADO.");
        try {
            if (!this.physicsManager) {
                this.physicsManager = this.gameManager.getPhysicsManager();
                if (!this.physicsManager) throw new Error("PhysicsManager no disponible para InkManager.");
            }
            if (!this.playerData) {
                this.playerData = this.gameManager.getPlayerData();
                if (!this.playerData) throw new Error("PlayerData no disponible para InkManager.");
            }
            
            const canvasLayerElement = document.getElementById('drawing-canvas-layer-main');
            console.log("InkManager init: Buscando <drawing-canvas-layer id='drawing-canvas-layer-main'>...");
            if (!canvasLayerElement) {
                throw new Error("<drawing-canvas-layer id='drawing-canvas-layer-main'> no encontrado en el DOM.");
            }
            console.log("InkManager init: canvasLayerElement encontrado:", canvasLayerElement, "Conectado:", canvasLayerElement.isConnected);

            console.log("InkManager init: Esperando a que 'drawing-canvas-layer' sea definido...");
            await customElements.whenDefined('drawing-canvas-layer');
            this.drawingCanvasLayer = canvasLayerElement as DrawingCanvasLayer;
            console.log("InkManager init: 'drawing-canvas-layer' DEFINIDO. drawingCanvasLayer:", this.drawingCanvasLayer);

            console.log("InkManager init: Esperando a drawingCanvasLayer.updateComplete...");
            await this.drawingCanvasLayer.updateComplete;
            console.log("InkManager init: drawingCanvasLayer.updateComplete RESUELTO.");

            if (!this.drawingCanvasLayer.getContext()) {
                console.log("InkManager: Contexto no disponible después de updateComplete. Esperando evento 'canvas-ready' de drawingCanvasLayer...");
                await new Promise<void>((resolve, reject) => {
                    const timeoutDuration = 3000; 
                    const timeoutId = setTimeout(() => {
                        console.error(`InkManager: Timeout (${timeoutDuration}ms) esperando 'canvas-ready'. El componente drawing-canvas-layer puede no estar inicializando su contexto correctamente.`);
                        reject(new Error("Timeout esperando 'canvas-ready' desde drawing-canvas-layer"));
                    }, timeoutDuration);

                    const readyListener = () => {
                        clearTimeout(timeoutId);
                        this.drawingCanvasLayer!.removeEventListener('canvas-ready', readyListener);
                        console.log("InkManager: Evento 'canvas-ready' RECIBIDO de drawing-canvas-layer.");
                        resolve();
                    };
                    
                    if (this.drawingCanvasLayer!.getContext()) {
                        console.log("InkManager: Contexto de drawing-canvas-layer ya estaba disponible al intentar añadir listener de 'canvas-ready'.");
                        clearTimeout(timeoutId);
                        resolve();
                        return;
                    }
                    console.log("InkManager: Añadiendo listener para 'canvas-ready' en drawingCanvasLayer.");
                    this.drawingCanvasLayer!.addEventListener('canvas-ready', readyListener);
                });
            } else {
                console.log("InkManager: Contexto de drawing-canvas-layer ya estaba disponible DESPUÉS de updateComplete (antes de la espera del evento).");
            }

            this.actualCanvasElement = this.drawingCanvasLayer.getCanvasElement();
            this.drawingCtx = this.drawingCanvasLayer.getContext();
            console.log("InkManager init: actualCanvasElement:", this.actualCanvasElement, "drawingCtx:", this.drawingCtx);


            if (!this.actualCanvasElement || !this.drawingCtx) {
                // Esta es la línea que da el error si algo falla antes.
                throw new Error("No se pudo obtener el canvas o el contexto 2D desde drawing-canvas-layer DESPUÉS de las esperas (whenDefined, updateComplete, canvas-ready).");
            }

            this.setupDrawingCanvas(); 
            this.initDrawingListeners(); 
            this.isInitialized = true;
            this.updateInkRelatedUI();
            console.log("InkManager: Inicializado correctamente.");

        } catch (error) {
            console.error("InkManager: Error CRÍTICO en inicialización:", error); // Este es el log que estás viendo
            this.isInitialized = false;
            // Considera si deberías relanzar el error si es irrecuperable para detener la carga del juego.
            // throw error; 
        }
    }

    // ... (El resto de los métodos de InkManager.ts deben permanecer como en la versión anterior que te pasé) ...
    // Copia aquí el resto de los métodos desde "private addListener" hasta el final de la clase
    // de la versión de InkManager.ts que te di en el mensaje anterior.
    // Si la necesitas de nuevo, dímelo.

    private addListener(element: HTMLElement | Window, type: string, handler: (e: any) => void, options?: AddEventListenerOptions | boolean): void {
        element.addEventListener(type, handler, options);
        this.generalListeners.push({ element, type, handler, options });
    }

    private initDrawingListeners(): void {
        this.removeDrawingListeners(); 
        if (this.actualCanvasElement) {
            const startHandler = this.startDrawing.bind(this);
            const drawHandler = this.draw.bind(this);
            const stopHandler = this.stopDrawing.bind(this);

            this.addListener(this.actualCanvasElement, 'mousedown', startHandler);
            this.addListener(this.actualCanvasElement, 'mousemove', drawHandler);
            this.addListener(this.actualCanvasElement, 'mouseup', stopHandler);
            this.addListener(this.actualCanvasElement, 'mouseleave', stopHandler); 

            this.addListener(this.actualCanvasElement, 'touchstart', startHandler, { passive: false });
            this.addListener(this.actualCanvasElement, 'touchmove', drawHandler, { passive: false });
            this.addListener(this.actualCanvasElement, 'touchend', stopHandler);
            this.addListener(this.actualCanvasElement, 'touchcancel', stopHandler);
        }
        this.addListener(window, 'resize', this.handleResize.bind(this));
    }

    private removeDrawingListeners(): void {
        this.generalListeners.forEach(({ element, type, handler, options }) => {
            try {
                element.removeEventListener(type, handler, options);
            } catch (e) {
            }
        });
        this.generalListeners = [];
    }

    private setupDrawingCanvas(): void {
        if (this.drawingCtx && this.drawingCanvasLayer) {
            this.drawingCanvasLayer.resizeCanvas(); 
            this.applyContextStyles(); 
            this.clearCanvas(); 
            this.redrawPaths(); 
        }
    }

    private applyContextStyles(): void {
        if (!this.drawingCtx) return;
        const inkColor = getComputedStyle(document.documentElement).getPropertyValue('--gq-ink-line-color').trim() || '#E5E7EB';
        this.drawingCtx.strokeStyle = inkColor;
        this.drawingCtx.lineWidth = INK_LINE_THICKNESS; 
        this.drawingCtx.lineCap = 'round';
        this.drawingCtx.lineJoin = 'round';
    }

    private handleResize(): void {
        if (this.drawingCanvasLayer) {
            this.drawingCanvasLayer.resizeCanvas(); 
            this.drawingCtx = this.drawingCanvasLayer.getContext(); 
            if (this.drawingCtx) {
                this.applyContextStyles(); 
                this.redrawPaths(); 
            }
        }
    }

    private clearCanvas(): void {
        if (this.drawingCtx && this.actualCanvasElement) {
            this.drawingCtx.clearRect(0, 0, this.actualCanvasElement.width, this.actualCanvasElement.height);
        }
    }

    private redrawPaths(): void {
        this.clearCanvas();
        if (!this.drawingCtx) return;
        this.drawnPaths.forEach(pathData => {
            this.drawPathPoints(pathData.points);
        });
    }

    private drawPathPoints(points: Point[]): void {
        if (!this.drawingCtx || points.length < 2) return;
        this.drawingCtx.beginPath();
        this.drawingCtx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            this.drawingCtx.lineTo(points[i].x, points[i].y);
        }
        this.drawingCtx.stroke();
    }

    private updateInkRelatedUI(): void {
        if (!this.isInitialized || !this.playerData) return;
        
        this.gameManager.updateInkUI(); 

        if (this.playerData.currentInk <= 0 && this.isBrushActive) {
            this.toggleBrush(false); 
        }
    }

    public toggleBrush(forceState?: boolean): void {
        if (!this.isInitialized) {
            console.warn("InkManager: Intento de toggleBrush antes de inicializar.");
            return;
        }

        const newState = (forceState !== undefined) ? forceState : !this.isBrushActive;

        if (newState === this.isBrushActive) return; 
        this.isBrushActive = newState;

        if (!this.isBrushActive && this.isDrawing) {
            this.stopDrawing(null);
        }
        
        this.gameManager.getGlobalUIManager().setModuleUIsFaded(this.isBrushActive);
        this.updateCanvasActiveState(); 
    }

    public updateCanvasActiveState(): void {
        if (this.drawingCanvasLayer) {
            this.drawingCanvasLayer.isActive = this.isBrushActive;
        }
    }

    public clearInkLines(): void {
        if (!this.isInitialized || !this.playerData.isDrawingUnlocked || this.playerData.inkSpentSinceLastClear <= 0) {
            return;
        }

        const allBodiesToRemove: Matter.Body[] = this.drawnPaths.flatMap(p => p.bodies);
        if (this.physicsManager?.getWorld && allBodiesToRemove.length > 0) {
            try {
                const world = this.physicsManager.getWorld();
                const bodiesInWorld = allBodiesToRemove.filter(body => Matter.Composite.get(world, body.id, 'body'));
                if (bodiesInWorld.length > 0) {
                    Matter.World.remove(world, bodiesInWorld);
                }
            } catch(error) {
                console.error("InkManager: Error removiendo cuerpos de tinta del mundo físico:", error);
            }
        }

        this.drawnPaths = []; 
        this.clearCanvas();   

        this.playerData.recoverSpentInk(); 
        this.updateInkRelatedUI();         
        this.gameManager.getAudioManager().playSound('clear_ink');
    }

    public gainInkOnCorrectAnswer(): void {
        if (!this.isInitialized || !this.playerData.isDrawingUnlocked) return;
        this.playerData.gainInk(INK_PER_CORRECT_ANSWER);
        this.updateInkRelatedUI();
    }

    public destroy(): void {
        this.removeDrawingListeners(); 
        this.isInitialized = false;
        this.isBrushActive = false;
        this.isDrawing = false;
        this.currentPath = [];
        this.drawnPaths = [];
        this.clearCanvas(); 
        
        if (this.drawingCanvasLayer) {
            this.drawingCanvasLayer.isActive = false; 
            this.drawingCanvasLayer.isPointerLockdown = false; 
        }
        this.drawingCtx = null;
        this.actualCanvasElement = null;
        this.drawingCanvasLayer = null; 
        console.log("InkManager: Destruido y recursos liberados.");
    }

    private startDrawing(event: MouseEvent | TouchEvent): void { 
        if (!this.isInitialized || !this.isBrushActive || !this.drawingCtx || !this.actualCanvasElement || this.playerData.currentInk <= 0) return; 
        event.preventDefault(); 
        this.isDrawing = true; 
        const pos = this.getMousePos(event); 
        this.currentPath = [pos]; 
        this.lastPoint = pos; 
        this.drawingCtx.beginPath(); this.drawingCtx.moveTo(pos.x, pos.y); 
        this.gameManager.getAudioManager().playSound('draw_start'); 
    }

    private draw(event: MouseEvent | TouchEvent): void { 
        if (!this.isDrawing || !this.isBrushActive || !this.drawingCtx) return; 
        event.preventDefault(); 
        const pos = this.getMousePos(event); 
        const distSq = this.lastPoint ? this.distanceSq(this.lastPoint, pos) : MIN_PATH_DISTANCE_SQ; 
        if (distSq >= MIN_PATH_DISTANCE_SQ) { 
            const dist = Math.sqrt(distSq); 
            const inkCost = dist * this.playerData.getCurrentInkCostPerPixel(); 
            if (this.playerData.spendInk(inkCost)) { 
                this.currentPath.push(pos); 
                this.drawingCtx.lineTo(pos.x, pos.y); this.drawingCtx.stroke(); 
                this.drawingCtx.beginPath(); this.drawingCtx.moveTo(pos.x, pos.y); 
                this.lastPoint = pos; 
                this.updateInkRelatedUI(); 
            } else { 
                this.stopDrawing(event); 
                if (this.playerData.currentInk <=0) this.toggleBrush(false);
            } 
        } 
    }

    private stopDrawing(event: MouseEvent | TouchEvent | null): void { 
        if (!this.isDrawing) return; 
        event?.preventDefault(); 
        this.isDrawing = false; 
        this.gameManager.getAudioManager().playSound('draw_end'); 
        if (this.currentPath.length > 1) { 
            const inkBodies = this.createInkBodySegments(this.currentPath); 
            if (inkBodies.length > 0 && this.physicsManager?.getWorld) { 
                try { Matter.World.add(this.physicsManager.getWorld(), inkBodies); this.drawnPaths.push({ points: [...this.currentPath], bodies: inkBodies }); } 
                catch (error) { console.error("InkManager: Error añadiendo cuerpos:", error); } 
            } else if (!this.physicsManager) { console.error("InkManager: PhysicsManager no disponible."); } 
        } 
        this.currentPath = []; 
        this.lastPoint = null; 
    }
    
    private getMousePos(event: MouseEvent | TouchEvent): Point { 
        if (!this.actualCanvasElement) return { x: 0, y: 0 }; 
        const rect = this.actualCanvasElement.getBoundingClientRect(); 
        let clientX = 0, clientY = 0; 
        if (event instanceof MouseEvent) { clientX = event.clientX; clientY = event.clientY; } 
        else if ((event as TouchEvent).touches && (event as TouchEvent).touches.length > 0) { clientX = (event as TouchEvent).touches[0].clientX; clientY = (event as TouchEvent).touches[0].clientY; } 
        else if ((event as TouchEvent).changedTouches && (event as TouchEvent).changedTouches.length > 0) { clientX = (event as TouchEvent).changedTouches[0].clientX; clientY = (event as TouchEvent).changedTouches[0].clientY; } 
        return { x: clientX - rect.left, y: clientY - rect.top }; 
    }
    
    private distanceSq(p1: Point, p2: Point): number { const dx = p1.x - p2.x; const dy = p1.y - p2.y; return dx * dx + dy * dy; }
    
    private createInkBodySegments(points: Point[]): Matter.Body[] { 
        const bodies: Matter.Body[] = []; 
        if (points.length < 2 || !this.physicsManager) return bodies; 
        for (let i = 1; i < points.length; i++) { 
            const startPoint = points[i - 1]; const endPoint = points[i]; 
            const dx = endPoint.x - startPoint.x; const dy = endPoint.y - startPoint.y; 
            const distSq = dx * dx + dy * dy; 
            if (distSq < 1) continue; 
            const dist = Math.sqrt(distSq); const angle = Math.atan2(dy, dx); 
            const midX = startPoint.x + dx / 2; const midY = startPoint.y + dy / 2; 
            try { 
                const segmentBody = Matter.Bodies.rectangle( midX, midY, dist, INK_LINE_THICKNESS, { isStatic: true, angle: angle, label: 'inkLine', friction: 0.5, restitution: 0.1, collisionFilter: { category: INK_COLLISION_CATEGORY, mask: INK_COLLISION_MASK }, render: { visible: false } } ); 
                if (segmentBody) bodies.push(segmentBody); 
            } catch (error) { console.error("InkManager: Error creando cuerpo:", error); } } return bodies; 
    }
}