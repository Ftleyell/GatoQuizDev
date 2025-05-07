// src/game/states/LoadingState.ts

import { IState } from '../StateMachine';
import { GameManager } from '../GameManager'; // Ajusta la ruta si es necesario

export class LoadingState implements IState {
  private gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
  }

  enter(params?: any): void {
    console.log('LoadingState: enter', params);
    this.gameManager.setBodyStateClass('loading'); // <-- AÑADIR ESTA LÍNEA
    // Aquí podrías mostrar un indicador de carga en la UI
    // this.gameManager.getContainerElement().innerHTML = '<h1>Cargando...</h1>';
    // Idealmente, la carga de assets se haría aquí y se transicionaría
    // al siguiente estado ('MainMenu') cuando termine.
    // Por ahora, como la carga está en GameManager.preload, este estado
    // podría no usarse activamente o usarse solo como estado inicial muy breve.
  }

  exit(): void {
    console.log('LoadingState: exit');
    // Limpiar UI de carga
  }

  // Corrección: Añadir guion bajo a 'deltaTime'
  update(_deltaTime: number): void {
    // console.log('LoadingState: update', deltaTime); // Puede ser muy verboso
    // Podría revisar si la carga ha terminado para cambiar de estado
  }
}