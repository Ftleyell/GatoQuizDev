// src/types/EngineServices.d.ts
import type { PlayerData } from '../game/PlayerData';
import type { AudioManager } from '../systems/AudioManager';
import type { CatManager } from '../systems/CatManager';
import type { PhysicsManager } from '../systems/PhysicsManager';
import type { ThemeManager } from '../systems/ThemeManager';
import type { ShopManager } from '../systems/ShopManager';
import type { InkManager } from '../systems/InkManager';
import type { CatFoodManager } from '../systems/CatFoodManager';
import type { GlobalUIManager } from '../game/engine/ui/GlobalUIManager';
import type { ToolManager } from '../game/engine/managers/ToolManager';
import type { QuizSystem } from '../systems/QuizSystem';
import type { GameManager } from '../game/GameManager'; // <--- AÑADE ESTA IMPORTACIÓN

export interface EngineServices {
    playerData: PlayerData;
    audioManager: AudioManager;
    catManager: CatManager;
    physicsManager: PhysicsManager;
    themeManager: ThemeManager;
    shopManager: ShopManager;
    inkManager: InkManager;
    catFoodManager: CatFoodManager;
    globalUI: GlobalUIManager;
    toolManager: ToolManager;
    quizSystem: QuizSystem;
    gameManager: GameManager; // <--- AÑADE ESTA PROPIEDAD
}