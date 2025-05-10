// src/game/modules/quiz/index.ts
export * from './QuizGameModule';
export * from './QuizSystem'; // <- Añadido
// Si tuvieras otros archivos directamente en esta carpeta que necesiten ser exportados,
// como tipos específicos del módulo Quiz, los añadirías aquí.
// Si QuizUIManager.ts está en una subcarpeta ui/, su index.ts se encargará de él.