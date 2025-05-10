// src/systems/PhysicsManager.ts

import Matter from 'matter-js';
import { CatManager } from '../game/engine/managers';
import { CatFoodManager } from '../game/engine/managers';
import type { CatDisplayArea } from '../game/components/ui/cat-display-area';
import { GameManager } from '../game/GameManager'; // Importar GameManager

// Constantes de Colisión
const WALL_COLLISION_CATEGORY = 0x0001;
const CAT_COLLISION_CATEGORY = 0x0002;
const INK_COLLISION_CATEGORY = 0x0004;
const FOOD_PELLET_COLLISION_CATEGORY = 0x0008;
const WALL_THICKNESS = 60;
const MAX_CAT_SPEED = 70;

export class PhysicsManager {
  private engine!: Matter.Engine;
  private world!: Matter.World;
  private runner!: Matter.Runner;
  private ground!: Matter.Body;
  private leftWall!: Matter.Body;
  private rightWall!: Matter.Body;
  private topWall!: Matter.Body;
  private resizeListener: () => void;
  private catManager: CatManager;
  private catFoodManager: CatFoodManager;
  private mouseConstraint?: Matter.MouseConstraint;
  private catDisplayAreaElement!: CatDisplayArea;
  private gameManager: GameManager; // Referencia a GameManager

  private collisionHandler: (event: Matter.IEventCollision<Matter.Engine>) => void;
  private speedLimitHandler: () => void;

  // --- CAMBIO: Modificar constructor para recibir GameManager ---
  constructor(catManager: CatManager, catFoodManager: CatFoodManager, gameManager: GameManager) {
    console.log('PhysicsManager Creado');
    this.catManager = catManager;
    this.catFoodManager = catFoodManager;
    this.gameManager = gameManager; // Guardar referencia
    this.resizeListener = this.handleResize.bind(this);
    this.collisionHandler = this.handleCollisions.bind(this);
    this.speedLimitHandler = this.limitAllCatSpeeds.bind(this);
  }
  // --- FIN CAMBIO ---

  public init(catDisplayAreaElement: CatDisplayArea): void {
    console.log('PhysicsManager: init');
    if (!catDisplayAreaElement) {
        console.error("PhysicsManager CRITICAL: catDisplayAreaElement es nulo en init().");
        throw new Error("PhysicsManager requiere un catDisplayAreaElement para inicializar.");
    }
    this.catDisplayAreaElement = catDisplayAreaElement;

    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.runner = Matter.Runner.create();
    this.engine.gravity.y = 0.8;
    this.engine.gravity.x = 0;
    this.engine.enableSleeping = true;
    console.log('Matter.js Engine, World, Runner creados.');

    this.createWalls();
    this.setupMouseConstraint(this.catDisplayAreaElement);

    console.log("PhysicsManager: Añadiendo listeners de eventos del motor...");
    Matter.Events.on(this.engine, 'collisionStart', this.collisionHandler);
    Matter.Events.on(this.engine, 'beforeUpdate', this.speedLimitHandler);
    window.addEventListener('resize', this.resizeListener);
    console.log("PhysicsManager: init completado.");
  }

  private createWalls(): void {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.ground = Matter.Bodies.rectangle(width / 2, height + WALL_THICKNESS / 2, width, WALL_THICKNESS, { isStatic: true, label: 'ground', collisionFilter: { category: WALL_COLLISION_CATEGORY } });
      this.leftWall = Matter.Bodies.rectangle(-WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height, { isStatic: true, label: 'leftWall', collisionFilter: { category: WALL_COLLISION_CATEGORY } });
      this.rightWall = Matter.Bodies.rectangle(width + WALL_THICKNESS / 2, height / 2, WALL_THICKNESS, height, { isStatic: true, label: 'rightWall', collisionFilter: { category: WALL_COLLISION_CATEGORY } });
      this.topWall = Matter.Bodies.rectangle(width / 2, -WALL_THICKNESS / 2, width, WALL_THICKNESS, { isStatic: true, label: 'topWall', collisionFilter: { category: WALL_COLLISION_CATEGORY } });
      Matter.World.add(this.world, [this.ground, this.leftWall, this.rightWall, this.topWall]);
      console.log("PhysicsManager: Paredes creadas.");
  }

  private setupMouseConstraint(mouseTargetElement: HTMLElement): void {
       const mouse = Matter.Mouse.create(mouseTargetElement);
       this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
           mouse: mouse,
           constraint: {
               stiffness: 0.1,
               render: { visible: false }
           }
       });
       this.mouseConstraint.collisionFilter.mask = CAT_COLLISION_CATEGORY;
       Matter.World.add(this.world, this.mouseConstraint);
       this.updateMouseConstraintOffset();
       console.log("PhysicsManager: MouseConstraint configurado sobre", mouseTargetElement);

       // --- CAMBIO: Emitir eventos de arrastre o llamar a GameManager ---
       Matter.Events.on(this.mouseConstraint, 'startdrag', (event) => {
           // El tipo de event aquí es any porque Matter.MouseConstraint no tiene un tipado específico para 'startdrag' en @types/matter-js
           // Hacemos una verificación de 'label' para asegurarnos que es un gato.
           const body = (event as any).body as Matter.Body | undefined;
           if (body && body.label === 'cat') {
               console.log('PhysicsManager: Cat drag started');
               this.gameManager.setCatDragState(true); // Notificar a GameManager
           }
       });

       Matter.Events.on(this.mouseConstraint, 'enddrag', (event) => {
           const body = (event as any).body as Matter.Body | undefined;
           if (body && body.label === 'cat') {
               console.log('PhysicsManager: Cat drag ended');
               this.gameManager.setCatDragState(false); // Notificar a GameManager
           }
       });
       // --- FIN CAMBIO ---
  }

  private updateMouseConstraintOffset(): void {
      if (this.mouseConstraint && this.mouseConstraint.mouse.element) {
          const bounds = this.mouseConstraint.mouse.element.getBoundingClientRect();
          Matter.Mouse.setOffset(this.mouseConstraint.mouse, { x: -bounds.left, y: -bounds.top });
      }
  }

  private handleCollisions(event: Matter.IEventCollision<Matter.Engine>): void {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
          const pair = pairs[i];
          const bodyA = pair.bodyA;
          const bodyB = pair.bodyB;
          const labelA = bodyA?.label;
          const labelB = bodyB?.label;

          if (labelA === 'cat' && labelB === 'cat') {
              const isDraggingA = this.mouseConstraint?.body === bodyA;
              const isDraggingB = this.mouseConstraint?.body === bodyB;
              if (isDraggingA !== isDraggingB) {
                  if (typeof bodyA.id !== 'undefined' && typeof bodyB.id !== 'undefined') {
                      const draggerBodyId = isDraggingA ? bodyA.id : bodyB.id;
                      this.catManager.processPlayerInitiatedCollision(bodyA.id, bodyB.id, draggerBodyId);
                  } else { console.error("Error: IDs indefinidos en colisión gato-gato."); }
              }
          }
          else if ((labelA === 'cat' && labelB === 'foodPellet') || (labelA === 'foodPellet' && labelB === 'cat')) {
              const catBody = (labelA === 'cat') ? bodyA : bodyB;
              const foodBody = (labelA === 'foodPellet') ? bodyA : bodyB;
              if (typeof catBody.id !== 'undefined' && foodBody) {
                   this.catFoodManager.processCatFoodCollision(catBody.id, foodBody);
              } else {
                   console.warn("Colisión Gato-Comida detectada pero falta ID de gato o cuerpo de comida.");
              }
          }
      }
  }

  private limitAllCatSpeeds(): void {
      if (!this.world) return;
      const bodies = Matter.Composite.allBodies(this.world);
      for (let i = 0; i < bodies.length; i++) {
          const body = bodies[i];
          if (!body.isStatic && body.label === 'cat') {
              const speed = Matter.Vector.magnitude(body.velocity);
              if (speed > MAX_CAT_SPEED) {
                  const normalizedVelocity = Matter.Vector.normalise(body.velocity);
                  const cappedVelocity = Matter.Vector.mult(normalizedVelocity, MAX_CAT_SPEED);
                  Matter.Body.setVelocity(body, cappedVelocity);
              }
          }
      }
  }

  private handleResize(): void {
    if (!this.ground || !this.leftWall || !this.rightWall || !this.topWall || !this.catDisplayAreaElement) return;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    Matter.Body.setPosition(this.ground, { x: windowWidth / 2, y: windowHeight + WALL_THICKNESS / 2 });
    Matter.Body.setVertices(this.ground, Matter.Vertices.fromPath(`L 0 0 L ${windowWidth} 0 L ${windowWidth} ${WALL_THICKNESS} L 0 ${WALL_THICKNESS}`, this.ground));
    
    Matter.Body.setPosition(this.leftWall, { x: -WALL_THICKNESS / 2, y: windowHeight / 2 });
    Matter.Body.setVertices(this.leftWall, Matter.Vertices.fromPath(`L 0 0 L ${WALL_THICKNESS} 0 L ${WALL_THICKNESS} ${windowHeight} L 0 ${windowHeight}`, this.leftWall));

    Matter.Body.setPosition(this.rightWall, { x: windowWidth + WALL_THICKNESS / 2, y: windowHeight / 2 });
    Matter.Body.setVertices(this.rightWall, Matter.Vertices.fromPath(`L 0 0 L ${WALL_THICKNESS} 0 L ${WALL_THICKNESS} ${windowHeight} L 0 ${windowHeight}`, this.rightWall));
    
    Matter.Body.setPosition(this.topWall, { x: windowWidth / 2, y: -WALL_THICKNESS / 2 });
    Matter.Body.setVertices(this.topWall, Matter.Vertices.fromPath(`L 0 0 L ${windowWidth} 0 L ${windowWidth} ${WALL_THICKNESS} L 0 ${WALL_THICKNESS}`, this.topWall));

    this.updateMouseConstraintOffset();
    console.log("PhysicsManager: Límites y mouse constraint actualizados en resize.");
  }

  public start(): void {
     if (!this.engine || !this.runner) { console.error("PhysicsManager: init() debe ser llamado antes de start()."); return; }
     Matter.Runner.run(this.runner, this.engine);
     console.log("PhysicsManager: Runner iniciado.");
  }

  public stop(): void {
     if (!this.runner) { console.warn("PhysicsManager: Runner no inicializado."); return; }
     Matter.Runner.stop(this.runner);
     console.log("PhysicsManager: Runner detenido.");
  }

  public shutdown(): void {
      console.log('PhysicsManager: shutdown');
      this.stop();
      if (this.engine) {
          Matter.Events.off(this.engine, 'collisionStart', this.collisionHandler);
          Matter.Events.off(this.engine, 'beforeUpdate', this.speedLimitHandler);
          // --- CAMBIO: Limpiar listeners de mouseConstraint ---
          if (this.mouseConstraint) {
            Matter.Events.off(this.mouseConstraint, 'startdrag');
            Matter.Events.off(this.mouseConstraint, 'enddrag');
          }
          // --- FIN CAMBIO ---
          Matter.World.clear(this.world, false);
          Matter.Engine.clear(this.engine);
          console.log("PhysicsManager: Listeners de engine removidos y mundo limpiado.");
      } else { console.warn("PhysicsManager shutdown: Engine no encontrado."); }
      window.removeEventListener('resize', this.resizeListener);
      this.mouseConstraint = undefined;
      console.log("PhysicsManager: shutdown completo.");
  }

  public getEngine(): Matter.Engine { if (!this.engine) throw new Error("PhysicsManager no inicializado."); return this.engine; }
  public getWorld(): Matter.World { if (!this.world) throw new Error("PhysicsManager no inicializado."); return this.world; }
}
