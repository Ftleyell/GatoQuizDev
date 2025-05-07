// src/systems/InkManager.ts

import { GameManager } from '../game/GameManager';
import { PlayerData } from '../game/PlayerData';
import { PhysicsManager } from './PhysicsManager';
import Matter from 'matter-js';
// Importar el tipo del nuevo componente Lit para el canvas
import type { DrawingCanvasLayer } from '../game/components/ui/drawing-canvas-layer';
// Asegurarse de que el componente se registre si no se importa en otro lado (main.ts o GameManager.ts)
import '../game/components/ui/drawing-canvas-layer.ts';


// --- Constantes de Dibujo ---
const MIN_PATH_DISTANCE_SQ = 25;
const INK_LINE_THICKNESS = 8;
const INK_LINE_COLOR = '#E5E7EB'; // Podría ser variable de tema
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

    // Referencia al componente Lit <drawing-canvas-layer>
    private drawingCanvasLayer: DrawingCanvasLayer | null = null;
    // Referencias al elemento <canvas> y su contexto, obtenidos del componente Lit
    private actualCanvasElement: HTMLCanvasElement | null = null;
    private drawingCtx: CanvasRenderingContext2D | null = null;

    public isBrushActive: boolean = false;
    private isDrawing: boolean = false;
    private currentPath: Point[] = [];
    private lastPoint: Point | null = null;
    private drawnPaths: DrawnPath[] = [];

    private isInitialized: boolean = false;
    private generalListeners: { element: HTMLElement | Window; type: string; handler: (e: any) => void, options?: AddEventListenerOptions | boolean }[] = [];
    
    private lastToggleTime: number = 0;
    private readonly BRUSH_TOGGLE_DEBOUNCE = 200;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
        try {
            this.playerData = gameManager.getPlayerData();
            // La obtención del componente Lit se hará en init()
        } catch (e) {
            console.error("InkManager: Error en constructor al obtener PlayerData.", e);
        }
    }

    public setPhysicsManager(physicsManager: PhysicsManager): void {
        this.physicsManager = physicsManager;
    }

    public init(): void {
        if (this.isInitialized) {
            this.updateInkUI();
            return;
        }
        try {
            if (!this.physicsManager) {
                this.physicsManager = this.gameManager.getPhysicsManager();
                if (!this.physicsManager) throw new Error("PhysicsManager no disponible.");
            }
            if (!this.playerData) {
                this.playerData = this.gameManager.getPlayerData();
                if (!this.playerData) throw new Error("PlayerData no disponible.");
            }
            
            // Obtener el componente Lit del DOM
            this.drawingCanvasLayer = document.getElementById('drawing-canvas-layer-main') as DrawingCanvasLayer | null;
            if (!this.drawingCanvasLayer) {
                throw new Error("<drawing-canvas-layer id='drawing-canvas-layer-main'> no encontrado en el DOM.");
            }

            // Obtener el canvas y el contexto del componente Lit
            this.actualCanvasElement = this.drawingCanvasLayer.getCanvasElement();
            this.drawingCtx = this.drawingCanvasLayer.getContext();

            if (!this.actualCanvasElement || !this.drawingCtx) {
                throw new Error("No se pudo obtener el canvas o el contexto 2D desde drawing-canvas-layer.");
            }

            this.setupDrawingCanvas(); // Redimensiona y aplica estilos al contexto
            this.initDrawingListeners(); // Añade listeners al *elemento canvas*
            this.isInitialized = true;
            this.updateInkUI();
        } catch (error) {
            console.error("InkManager: Error CRÍTICO en inicialización:", error);
            this.isInitialized = false;
        }
    }

    private initDrawingListeners(): void {
        this.removeDrawingListeners();
        // Los listeners de dibujo ahora se aplican al canvas *interno* del componente Lit
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
        // El listener de resize sigue siendo global o podría ser manejado por el componente Lit
        this.addListener(window, 'resize', this.handleResize.bind(this));
    }

    private addListener(element: HTMLElement | Window, type: string, handler: (e: any) => void, options?: AddEventListenerOptions | boolean): void {
        element.addEventListener(type, handler, options);
        this.generalListeners.push({ element, type, handler, options });
    }

    private removeDrawingListeners(): void {
        this.generalListeners.forEach(({ element, type, handler, options }) => {
            try { element.removeEventListener(type, handler, options); }
            catch (e) { /* Ignorar */ }
        });
        this.generalListeners = [];
    }

    private setupDrawingCanvas(): void {
        // Ya no necesitamos obtener el contexto aquí, se obtiene en init()
        if (this.drawingCtx && this.drawingCanvasLayer) {
            this.drawingCanvasLayer.resizeCanvas(); // Pedir al componente que redimensione su canvas
            this.applyContextStyles(); // Aplicar estilos al contexto obtenido
            this.clearCanvas();
            this.redrawPaths();
        }
    }

    private applyContextStyles(): void {
        if (!this.drawingCtx) return;
        this.drawingCtx.strokeStyle = INK_LINE_COLOR;
        this.drawingCtx.lineWidth = INK_LINE_THICKNESS;
        this.drawingCtx.lineCap = 'round';
        this.drawingCtx.lineJoin = 'round';
    }

    private handleResize(): void {
        if (this.drawingCanvasLayer) {
            this.drawingCanvasLayer.resizeCanvas(); // El componente se encarga de su canvas
            // Es importante que el componente Lit emita un evento 'canvas-resized' o que
            // InkManager obtenga el nuevo contexto si este se recrea al redimensionar.
            // Asumimos que getContext() siempre devuelve el actual.
            this.drawingCtx = this.drawingCanvasLayer.getContext(); // Re-obtener por si acaso
            if (this.drawingCtx) {
                this.applyContextStyles(); // Reaplicar estilos al (posiblemente nuevo) contexto
                this.redrawPaths(); // Redibujar trazos existentes
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
        this.drawnPaths.forEach(pathData => { this.drawPathPoints(pathData.points); });
    }

    private drawPathPoints(points: Point[]): void {
        if (!this.drawingCtx || points.length < 2) return;
        this.drawingCtx.beginPath();
        this.drawingCtx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) { this.drawingCtx.lineTo(points[i].x, points[i].y); }
        this.drawingCtx.stroke();
    }

    public updateInkUI(): void {
        if (!this.isInitialized || !this.playerData) return;
        const isUnlocked = this.playerData.isDrawingUnlocked;
        this.gameManager.getUIManager().updateInkVisibility(isUnlocked);
        this.gameManager.getUIManager().updateInkBar();
        if (isUnlocked && this.playerData.currentInk <= 0 && this.isBrushActive) {
            this.toggleBrush(false); 
        } else {
            this.gameManager.updateToolButtonStates();
        }
    }

    public toggleBrush(forceState?: boolean): void {
        if (!this.isInitialized) return;
        const now = Date.now();
        if (forceState === undefined && (now - this.lastToggleTime < this.BRUSH_TOGGLE_DEBOUNCE)) {
            return;
        }
        this.lastToggleTime = now;
        const newState = (forceState !== undefined) ? forceState : !this.isBrushActive;

        if (newState === true && (!this.playerData.isDrawingUnlocked || this.playerData.currentInk <= 0)) {
            if (this.isBrushActive) { 
                this.isBrushActive = false;
                this.gameManager.setQuizUiFaded(false); 
                this.updateCanvasActiveState(); // Actualiza el componente <drawing-canvas-layer>
                this.gameManager.updateToolButtonStates();
            }
            return;
        }
        if (newState === this.isBrushActive) return; 
        this.isBrushActive = newState;

        if (!this.isBrushActive && this.isDrawing) { this.stopDrawing(null); }

        this.gameManager.setQuizUiFaded(this.isBrushActive); 
        this.updateCanvasActiveState(); // Actualiza el componente <drawing-canvas-layer>
        this.gameManager.updateToolButtonStates(); 
    }

    /**
     * Actualiza el estado del componente Lit <drawing-canvas-layer>.
     * GameManager se encargará del `isPointerLockdown` en este componente.
     */
    public updateCanvasActiveState(): void {
        if (this.drawingCanvasLayer) {
            this.drawingCanvasLayer.isActive = this.isBrushActive;
            // No manejamos isPointerLockdown aquí; GameManager lo hará.
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
                if (bodiesInWorld.length > 0) { Matter.World.remove(world, bodiesInWorld); }
            } catch(error) { console.error("InkManager: Error removiendo cuerpos de tinta:", error); }
        }
        this.drawnPaths = [];
        this.clearCanvas();
        this.playerData.recoverSpentInk();
        this.updateInkUI();
        this.gameManager.getAudioManager().playSound('clear_ink');
    }

    public gainInkOnCorrectAnswer(): void {
        if (!this.isInitialized || !this.playerData.isDrawingUnlocked) return;
        this.playerData.gainInk(INK_PER_CORRECT_ANSWER);
        this.updateInkUI();
    }

    public destroy(): void {
        this.removeDrawingListeners();
        this.isInitialized = false;
        this.isBrushActive = false;
        this.isDrawing = false;
        this.currentPath = [];
        this.drawnPaths = [];
        this.clearCanvas(); // Limpia el contexto del canvas
        if (this.drawingCanvasLayer) {
            this.drawingCanvasLayer.isActive = false; // Asegurar que el componente sepa que está inactivo
            this.drawingCanvasLayer.isPointerLockdown = false;
        }
        this.drawingCtx = null;
        this.actualCanvasElement = null;
        this.drawingCanvasLayer = null;
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
                this.updateInkUI(); 
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
        // Usa actualCanvasElement para getBoundingClientRect
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