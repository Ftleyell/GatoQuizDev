// src/systems/CatManager.ts

// src/game/engine/managers/CatManager.ts

import { CatEntity } from '../../entities'; // Sube dos niveles, entra a 'entities' (usa index.ts)
import { PhysicsComponent, RenderComponent, ValueComponent } from '../../components'; // Sube dos niveles, entra a 'components' (usa index.ts)
import { PhysicsManager, AudioManager } from '../../../systems'; // Sube tres niveles a 'src', luego a 'systems' (usa index.ts)
import type { CatTemplate } from '../../../types'; // Sube tres niveles a 'src', luego a 'types' (usa index.ts)
import Matter from 'matter-js';
import { GameManager } from '../../GameManager'; // Sube dos niveles y entra a 'game'
import { LitElement } from 'lit';

// Para asegurar que el componente Lit se registre:
import '../../components/ui/cat-entity-display.js'; // O .ts

// Para tipos de componentes UI, usando el barrel file:
import type { CatEntityDisplay, CatDisplayArea } from '../../components/ui'; // Sube dos niveles, entra a 'components/ui' (usa index.ts)
const WALL_COLLISION_CATEGORY = 0x0001;
const CAT_COLLISION_CATEGORY = 0x0002;
const INK_COLLISION_CATEGORY = 0x0004;
const FOOD_PELLET_COLLISION_CATEGORY = 0x0008;

const CAT_GROWTH_FACTOR = 1.15;
const MAX_CAT_SIZE = 300; 
const SIZE_SIMILARITY_THRESHOLD = 1.02; 
const RARITY_GLOW_MAP: { [key: number]: string | null } = {
    0: null, 1: 'glow-gray', 2: 'glow-green',
    3: 'glow-blue', 4: 'glow-violet', 5: 'glow-orange',
};
const CAT_SPAWN_Y_OFFSET = 10; 

export class CatManager {
  private cats: Map<string, CatEntity> = new Map();
  private physicsManager!: PhysicsManager;
  private audioManager: AudioManager;
  private gameManager!: GameManager;
  public bodyIdToEntityIdMap: Map<number, string> = new Map();
  private nextCatIdCounter: number = 0;
  private catDisplayArea!: CatDisplayArea; // Se espera que sea una instancia de la clase CatDisplayArea
  private templates: Map<string, CatTemplate> = new Map();

  constructor(audioManager: AudioManager, gameManager: GameManager) {
    this.audioManager = audioManager;
    this.gameManager = gameManager;
    console.log('CatManager Creado (esperando CatDisplayArea y PhysicsManager).');
  }

  public setPhysicsManager(physicsManager: PhysicsManager): void {
       this.physicsManager = physicsManager;
       console.log("CatManager: PhysicsManager seteado.");
  }

  public setCatDisplayArea(displayArea: CatDisplayArea | null): void {
      if (displayArea instanceof LitElement && typeof (displayArea as any).clearAllEntityElements === 'function') {
          this.catDisplayArea = displayArea as CatDisplayArea;
          console.log("CatManager: CatDisplayArea seteado correctamente y es una instancia válida de CatDisplayArea (LitElement con clearAllEntityElements).", this.catDisplayArea);
      } else {
          console.error("CatManager CRITICAL: Se intentó setear un CatDisplayArea inválido o nulo.", displayArea);
          // No lanzar error aquí para permitir que el juego intente continuar, pero registrar el problema.
          // this.catDisplayArea podría quedar undefined si displayArea es null o inválido.
          // Es importante que el GameManager pase una instancia válida.
          if (!this.catDisplayArea && displayArea === null) {
            // Si se pasó null explícitamente, lo aceptamos para limpieza, por ejemplo.
            // Pero si no es una instancia válida, es un problema.
          } else if (!displayArea) {
             console.error("CatManager: displayArea es null/undefined.");
          } else {
             console.error("CatManager: displayArea NO es una instancia válida de CatDisplayArea o no tiene clearAllEntityElements. Tipo recibido:", typeof displayArea, "Tiene clearAllEntityElements:", typeof (displayArea as any).clearAllEntityElements);
          }
      }
  }

  public loadTemplates(templateData: CatTemplate[]): void {
      this.templates.clear();
      if (!Array.isArray(templateData)) {
          console.error("CatManager: Formato inválido de plantillas."); return;
      }
      templateData.forEach(template => {
          if (template?.id) {
              if (typeof template.spawnWeight !== 'number' || template.spawnWeight <= 0) {
                  template.spawnWeight = 1;
              }
              this.templates.set(template.id, template);
          } else { console.warn("CatManager: Plantilla inválida o sin ID.", template); }
      });
      console.log(`CatManager: ${this.templates.size} plantillas cargadas.`);
  }

  public getSpawnableTemplatesWeighted(): { id: string; weight: number }[] {
    const weightedTemplates: { id: string; weight: number }[] = [];
    this.templates.forEach((template) => {
        const weight = template.spawnWeight && template.spawnWeight > 0 ? template.spawnWeight : 1;
        weightedTemplates.push({ id: template.id, weight: weight });
    });
    return weightedTemplates;
  }

  public addCat(templateId: string, initialPosition?: { x: number; y: number }): CatEntity | null {
    if (!this.gameManager) { console.error("CatManager: GameManager no disponible."); return null; }
    if (!this.catDisplayArea) { 
        console.error("CatManager: CatDisplayArea no está seteado o es inválido. No se puede añadir gato.");
        return null;
    }
    // Verificar si catDisplayArea tiene los métodos necesarios ANTES de usarlos
    if (typeof this.catDisplayArea.addEntityElement !== 'function') {
        console.error("CatManager: this.catDisplayArea no tiene el método addEntityElement. Tipo actual:", typeof this.catDisplayArea, this.catDisplayArea);
        return null;
    }


    const currentCatCount = this.cats.size;
    const maxAllowed = this.gameManager.getPlayerData().getMaxCatsAllowed();

    if (currentCatCount >= maxAllowed) {
        // console.log("CatManager: Límite de gatos alcanzado. No se añadió nuevo gato."); // Log menos verboso
        return null;
    }
    if (!this.physicsManager) { 
        console.error("CatManager: PhysicsManager no está seteado.");
        return null;
    }
    const template = this.templates.get(templateId);
    if (!template) {
        console.error(`CatManager: Plantilla '${templateId}' no encontrada.`);
        return null;
    }

    const entityId = `cat_entity_${this.nextCatIdCounter++}`;
    const initialSize = template.initialSize;
    const rarity = template.rarity;
    const scoreValue = template.scoreValue ?? 0;

    const safeBuffer = initialSize / 2 + 5; 
    const x = initialPosition?.x ?? Math.random() * (window.innerWidth - initialSize - safeBuffer * 2) + safeBuffer;
    const y = initialPosition?.y ?? Math.max(safeBuffer, Math.min(window.innerHeight - safeBuffer, CAT_SPAWN_Y_OFFSET + initialSize / 2));

    const defaultPhysics: Matter.IBodyDefinition = {
        restitution: 0.6, friction: 0.1, frictionAir: 0.01, density: 0.005, slop: 0.01,
    };
    const bodyOptions: Matter.IBodyDefinition = {
        ...defaultPhysics,
        ...(template.physicsOptions ?? {}),
        label: 'cat',
        collisionFilter: {
            category: CAT_COLLISION_CATEGORY,
            mask: WALL_COLLISION_CATEGORY | CAT_COLLISION_CATEGORY | INK_COLLISION_CATEGORY | FOOD_PELLET_COLLISION_CATEGORY
        },
        plugin: {
            entityId: entityId,
            rarity: rarity,
            currentSize: initialSize
        }
    };
    const body = Matter.Bodies.circle(x, y, initialSize / 2, bodyOptions);
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
    const physicsComp = new PhysicsComponent(body);
    this.bodyIdToEntityIdMap.set(body.id, entityId);

    const catDisplayElement = document.createElement('cat-entity-display') as CatEntityDisplay;
    catDisplayElement.id = entityId;
    catDisplayElement.size = initialSize; 
    catDisplayElement.classList.add('appearing'); 

    const renderOpts = template.renderOptions ?? {};
    const fallbackColor = renderOpts.backgroundColor ?? 'var(--gq-cat-fallback-bg, #ccc)';
    let finalImageUrl = renderOpts.imageUrl;

    if (!finalImageUrl) {
        const safeSize = Number.isFinite(initialSize) && initialSize > 0 ? Math.round(initialSize) : 50;
        finalImageUrl = `https://cataas.com/cat/says/Miaw!_${entityId.slice(-2)}?${Date.now()}&width=${safeSize}&height=${safeSize}&type=square`;
    }

    catDisplayElement.imageUrl = finalImageUrl;
    catDisplayElement.backgroundColorFallback = fallbackColor;
    catDisplayElement.glowClass = renderOpts.glowClass ?? RARITY_GLOW_MAP[rarity] ?? '';

    const img = new Image();
    img.onload = () => { /* Imagen cargada */ };
    img.onerror = () => {
        console.warn(`CatManager: Falló la carga de la imagen del gato: ${finalImageUrl}. Usando color de fallback.`);
        if (catDisplayElement) {
             catDisplayElement.imageUrl = ''; 
        }
    };
    if (finalImageUrl) {
        img.src = finalImageUrl;
    }

    try {
        this.catDisplayArea.addEntityElement(catDisplayElement);
        void catDisplayElement.offsetWidth; 
        requestAnimationFrame(() => {
            catDisplayElement.classList.remove('appearing');
            catDisplayElement.classList.add('spawned');
        });

    } catch (error) {
        console.error("CatManager: Error añadiendo catDisplayElement a catDisplayArea:", error);
        this.bodyIdToEntityIdMap.delete(body.id); 
        return null;
    }
    
    const renderComp = new RenderComponent(catDisplayElement);
    const valueComp = new ValueComponent(rarity, scoreValue, initialSize, 0);
    const newCat = new CatEntity(entityId, physicsComp, renderComp, valueComp);

    try {
        if (!this.physicsManager.getWorld()) throw new Error("PhysicsManager world no disponible al añadir gato.");
        Matter.World.add(this.physicsManager.getWorld(), body);
    } catch (error) {
        console.error(`CatManager: Error añadiendo cuerpo físico ${entityId} al mundo:`, error);
        if (this.catDisplayArea && typeof this.catDisplayArea.removeEntityElement === 'function') {
            this.catDisplayArea.removeEntityElement(catDisplayElement); 
        }
        this.bodyIdToEntityIdMap.delete(body.id);
        return null;
    }

    this.cats.set(entityId, newCat);
    return newCat;
  }

  public removeCat(entityId: string | number): void {
    const entityIdStr = String(entityId);
    const cat = this.cats.get(entityIdStr);
    if (cat) {
      const body = cat.physics.body;
      if (body) {
          this.bodyIdToEntityIdMap.delete(body.id);
          try {
              if (this.physicsManager?.getWorld && Matter.Composite.get(this.physicsManager.getWorld(), body.id, 'body')) {
                  Matter.World.remove(this.physicsManager.getWorld(), body);
              }
          } catch(error) { console.warn(`Error eliminando cuerpo físico gato ${entityIdStr}:`, error); }
      }
      if (cat.render.element) {
          if (this.catDisplayArea && typeof this.catDisplayArea.removeEntityElement === 'function') {
              this.catDisplayArea.removeEntityElement(cat.render.element as HTMLElement);
          } else {
              console.warn("CatManager: catDisplayArea no disponible o sin removeEntityElement al intentar remover gato del DOM.");
              if (cat.render.element.parentNode) { // Fallback si no hay catDisplayArea
                  cat.render.element.parentNode.removeChild(cat.render.element);
              }
          }
      }
      this.cats.delete(entityIdStr);
    }
  }

  public processPlayerInitiatedCollision(bodyIdA: number, bodyIdB: number, draggerBodyId: number): void {
      const entityIdA = this.bodyIdToEntityIdMap.get(bodyIdA);
      const entityIdB = this.bodyIdToEntityIdMap.get(bodyIdB);

      if (entityIdA && entityIdB) {
          const catA = this.cats.get(entityIdA);
          const catB = this.cats.get(entityIdB);

          if (catA && catB) {
              const draggerCat = (bodyIdA === draggerBodyId) ? catA : catB;
              const targetCat = (bodyIdA === draggerBodyId) ? catB : catA;

              if (draggerCat && targetCat) {
                  this.handleCatVsCatCollision(draggerCat, targetCat);
              } else { console.error("Error: No se pudo determinar dragger/target cat en colisión."); }
          }
      }
  }

  private handleCatVsCatCollision(draggerCat: CatEntity, targetCat: CatEntity): void {
      if (!draggerCat.physics.body || !draggerCat.value || !targetCat.physics.body || !targetCat.value || !this.gameManager) {
          console.warn("handleCatVsCatCollision: Faltan componentes necesarios en dragger o target.");
          return;
      }
      if (draggerCat.id === targetCat.id) return;

      const draggerSize = draggerCat.value.currentSize;
      const draggerRarity = draggerCat.value.rarity;
      const targetSize = targetCat.value.currentSize;
      const targetRarity = targetCat.value.rarity;
      const currentMaxSizeLimit = this.gameManager.getPlayerData().getCurrentMaxSizeLimit();
      const isDraggerAtLimit = draggerSize >= currentMaxSizeLimit;

      let canEat = false;
      let stealTier = false;
      let eatForGrowth = false;

      if (draggerSize > targetSize * SIZE_SIMILARITY_THRESHOLD) {
          if (!isDraggerAtLimit) {
              canEat = true;
              eatForGrowth = true;
              stealTier = draggerRarity < targetRarity;
          } else {
              if (draggerRarity < targetRarity) {
                  canEat = true;
                  eatForGrowth = false; 
                  stealTier = true;
              }
          }
      }

      if (canEat) {
          this.performEat(draggerCat, targetCat, stealTier, eatForGrowth);
      }
  }

  private performEat(eater: CatEntity, eaten: CatEntity, stealTier: boolean, applyGrowth: boolean): void {
      if (!eater.physics.body || !eater.value || !(eater.render.element instanceof LitElement) || !eaten.value || !this.gameManager) {
          console.warn("performEat: Faltan componentes o el elemento de render no es CatEntityDisplay.");
          return;
      }
      const eaterDisplay = eater.render.element as CatEntityDisplay;

      const eatenId = eaten.id;
      const eatenRarity = eaten.value.rarity;

      this.removeCat(eatenId);

      if (applyGrowth) {
          const currentSize = eater.value.currentSize;
          const currentMaxSizeLimit = this.gameManager.getPlayerData().getCurrentMaxSizeLimit();
          let newSize = Math.min(currentMaxSizeLimit, MAX_CAT_SIZE, currentSize * CAT_GROWTH_FACTOR);
          const scaleFactor = newSize / currentSize;

          if (scaleFactor > 1.001) { 
              eater.value.currentSize = newSize;
              try {
                  if (this.physicsManager.getWorld && Matter.Composite.get(this.physicsManager.getWorld(), eater.physics.body.id, 'body')) {
                       Matter.Body.scale(eater.physics.body, scaleFactor, scaleFactor);
                       if (eater.physics.body.plugin) eater.physics.body.plugin.currentSize = newSize;
                  } else { throw new Error("Body not found in world during scaling"); }
              } catch (error) {
                  console.error(`Error scaling body ${eater.id}:`, error);
                  eater.value.currentSize = currentSize; 
                  if (eater.physics.body.plugin) eater.physics.body.plugin.currentSize = currentSize;
              }
              eaterDisplay.size = newSize;
          }
      }

      if (stealTier && eatenRarity > eater.value.rarity) {
          eater.value.rarity = eatenRarity;
          if (eater.physics.body.plugin) eater.physics.body.plugin.rarity = eatenRarity;
          eaterDisplay.glowClass = RARITY_GLOW_MAP[eatenRarity] ?? '';
          // console.log(` -> Cat ${eater.id} stole rarity ${eatenRarity} from ${eatenId}`); // Log menos verboso
      }

      try { this.audioManager.playSound('eat'); } catch (e) { console.error("Error playing 'eat' sound:", e)}
  }

  public updateCats(_deltaTime: number): void {
    this.cats.forEach((cat) => {
      const body = cat.physics.body;
      const renderElement = cat.render.element;
      const value = cat.value;

      if (!body || !renderElement || !(renderElement instanceof LitElement) || !value) {
          return;
      }
      const catDisplay = renderElement as CatEntityDisplay;
      const size = value.currentSize;

      if (cat.render.isVisible) {
         if (catDisplay.style.display === 'none') catDisplay.style.display = '';

         const halfSize = size / 2;
         catDisplay.style.transform = `translate(${body.position.x - halfSize}px, ${body.position.y - halfSize}px) rotate(${body.angle}rad)`;
         
         if (catDisplay.size !== size) {
            catDisplay.size = size;
         }
      } else {
         if (catDisplay.style.display !== 'none') catDisplay.style.display = 'none';
      }
    });
  }

  public getCat(catId: string): CatEntity | undefined {
      return this.cats.get(catId);
  }

  public getAllCats(): CatEntity[] {
      return Array.from(this.cats.values());
  }

  public removeAllCats(): void {
       console.log(`CatManager: Intentando remover todos los ${this.cats.size} gatos...`);
       // Verificar si catDisplayArea es una instancia válida y tiene el método ANTES de llamarlo
       if (this.catDisplayArea && typeof this.catDisplayArea.clearAllEntityElements === 'function') {
           this.catDisplayArea.clearAllEntityElements(); // Limpiar elementos del DOM
       } else {
           console.error("CatManager: catDisplayArea no está disponible o no es una instancia válida de CatDisplayArea con clearAllEntityElements al intentar removeAllCats. Tipo actual:", typeof this.catDisplayArea, this.catDisplayArea);
           // Como fallback, si no se puede usar el método del componente, intentar limpiar el mapa de gatos
           // y los cuerpos físicos, aunque los elementos DOM podrían quedar huérfanos.
           // Esto es menos ideal y señala un problema en la inicialización o asignación de catDisplayArea.
       }
       
       // Continuar con la limpieza de la lógica interna y los cuerpos físicos
       const world = this.physicsManager?.getWorld();
       if (world) {
           const catBodies = Array.from(this.cats.values())
                               .map(cat => cat.physics.body)
                               .filter(body => body && Matter.Composite.get(world, body.id, 'body')) as Matter.Body[];
           if (catBodies.length > 0) {
               try {
                   Matter.World.remove(world, catBodies);
               } catch (error) {
                   console.warn("CatManager: Error removiendo algunos cuerpos de gatos del mundo físico:", error);
               }
           }
       } else {
           console.warn("CatManager: PhysicsManager world no disponible durante removeAllCats.");
       }

       this.cats.clear(); // Limpiar el mapa de entidades de gatos
       this.bodyIdToEntityIdMap.clear(); // Limpiar el mapeo de IDs de cuerpos
       this.nextCatIdCounter = 0; // Resetear contador de IDs
       console.log("CatManager: Lógica interna de gatos y mapeos limpiados.");
   }

  public growExistingCats(amount: number, maxGrowthLevel: number): void {
    let grownCount = 0;
    this.cats.forEach((cat) => {
        if (!cat.value || !cat.physics.body || !(cat.render.element instanceof LitElement) || !this.physicsManager || !this.gameManager || cat.value.rarity !== 0) { 
            return;
        }
        const catDisplay = cat.render.element as CatEntityDisplay;

        if (cat.value.growthLevel < maxGrowthLevel) {
            const currentSize = cat.value.currentSize;
            const currentMaxSizeLimit = this.gameManager.getPlayerData().getCurrentMaxSizeLimit();
            let newSize = Math.min(currentMaxSizeLimit, MAX_CAT_SIZE, currentSize + amount);
            const scaleFactor = newSize / currentSize;

            if (scaleFactor > 1.0001) { 
                 cat.value.growthLevel++;
                 cat.value.currentSize = newSize;
                 try {
                     const body = cat.physics.body;
                     if (this.physicsManager.getWorld && Matter.Composite.get(this.physicsManager.getWorld(), body.id, 'body')) {
                          Matter.Body.scale(body, scaleFactor, scaleFactor);
                          if (body.plugin) body.plugin.currentSize = newSize;
                          grownCount++;
                     } else { throw new Error("Body not found in world for growth scaling"); }
                 } catch(error) {
                      console.error(` -> Error escalando gato común ${cat.id} (crecimiento por acierto):`, error);
                      cat.value.growthLevel--; 
                      cat.value.currentSize = currentSize; 
                      if (cat.physics.body.plugin) cat.physics.body.plugin.currentSize = currentSize;
                 }
                 catDisplay.size = newSize; 
            }
        }
    });
    // if (grownCount > 0) console.log(`CatManager: ${grownCount} gatos comunes crecieron.`); // Log menos verboso
  }
}
