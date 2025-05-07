// src/game/PlayerData.ts

export class PlayerData {
    public score: number = 0;
    public lives: number = 3;
    public isDrawingUnlocked: boolean = false;
    public isCatFoodUnlocked: boolean = false;
    public hasShield: boolean = false;
    public hintCharges: number = 0;
    public currentInk: number = 0;
    public readonly INK_BAR_CAPACITY: number = 1000;
    public inkSpentSinceLastClear: number = 0;
    public currentCatFood: number = 0;
    private readonly MAX_CAT_FOOD: number = 25;
    public comboMultiplierLevel: number = 0;
    public inkCostReductionLevel: number = 0;
    public extraCatSpawnLevel: number = 0;
    public maxCatsLevel: number = 0;
    public maxCatSizeLevel: number = 0;

    private readonly BASE_MAX_CAT_SIZE_LIMIT = 150;
    private readonly MAX_CAT_SIZE_INCREMENT_PER_LEVEL = 25;

    public getCurrentComboMultiplier(): number {
        const BASE_MULTIPLIER = 1.0;
        const INCREMENT = 0.15; // <-- Valor ajustado
        return BASE_MULTIPLIER + (this.comboMultiplierLevel * INCREMENT);
    }

    public getCurrentInkCostPerPixel(): number {
        const BASE_COST = 0.4; // <-- Valor ajustado
        const REDUCTION_FACTOR = 0.9;
        return BASE_COST * Math.pow(REDUCTION_FACTOR, this.inkCostReductionLevel);
    }

    public getCatsPerCorrectAnswer(): number {
        const BASE_CATS = 1;
        const INCREMENT = 1;
        return BASE_CATS + (this.extraCatSpawnLevel * INCREMENT);
    }

    public getMaxCatsAllowed(): number {
        const BASE_LIMIT = 50;
        const INCREMENT = 25;
        return BASE_LIMIT + (this.maxCatsLevel * INCREMENT);
    }

    public getCurrentMaxSizeLimit(): number {
        return this.BASE_MAX_CAT_SIZE_LIMIT + (this.maxCatSizeLevel * this.MAX_CAT_SIZE_INCREMENT_PER_LEVEL);
    }

    public spendInk(amount: number): boolean {
        if (this.currentInk >= amount) {
            this.currentInk -= amount;
            this.inkSpentSinceLastClear += amount;
            return true;
        }
        return false;
    }

    public gainInk(amount: number): void {
        this.currentInk += amount;
    }

    public recoverSpentInk(): void {
        console.log(`[PlayerData] Recovering ${this.inkSpentSinceLastClear.toFixed(0)} ink.`);
        this.gainInk(this.inkSpentSinceLastClear);
        this.inkSpentSinceLastClear = 0;
    }

    public getMaxCatFood(): number {
        return this.MAX_CAT_FOOD;
    }

    public spendCatFoodUnit(): boolean {
        if (!this.isCatFoodUnlocked) return false;
        if (this.currentCatFood > 0) {
            this.currentCatFood--;
            return true;
        }
        return false;
    }

    public refillCatFood(): void {
        if (!this.isCatFoodUnlocked) return;
        this.currentCatFood = this.getMaxCatFood();
    }

    public reset(): void {
        console.log("PlayerData: Reseteando datos...");
        this.score = 0;
        this.lives = 3;
        this.isDrawingUnlocked = false;
        this.isCatFoodUnlocked = false;
        this.hasShield = false;
        this.hintCharges = 0;
        this.currentInk = 0;
        this.inkSpentSinceLastClear = 0;
        this.currentCatFood = 0;
        this.comboMultiplierLevel = 0;
        this.inkCostReductionLevel = 0;
        this.extraCatSpawnLevel = 0;
        this.maxCatsLevel = 0;
        this.maxCatSizeLevel = 0;
    }

    constructor() {
        console.log("PlayerData Instanciado.");
    }
}