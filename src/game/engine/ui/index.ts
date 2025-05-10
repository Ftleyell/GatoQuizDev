// src/game/engine/ui/index.ts
export * from './GlobalUIManager';
// Si creas más componentes de UI específicos del motor directamente en esta carpeta (y no en ./components/),
// los exportarías desde aquí también.
// Por ejemplo, si tuvieras un 'src/game/engine/ui/EngineHUD.ts', añadirías:
// export * from './EngineHUD';