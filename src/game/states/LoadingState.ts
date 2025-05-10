// src/game/states/LoadingState.ts
import type { IState } from '../StateMachine'; // Correcto, IState es una interfaz
import { GameManager } from '../GameManager';   // Correcto

export class LoadingState implements IState {
  private gameManager: GameManager;

  constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
  }

  enter(params?: any): void {
    console.log('LoadingState: enter', params);
    this.gameManager.setBodyStateClass('loading');
    // La lógica de mostrar/ocultar botones globales (tienda, opciones, herramientas)
    // ahora es manejada por la función `wrapEnter` en GameManager.ts,
    // que se llama cuando se entra a este estado.

    // Aquí podrías añadir UI específica de carga si es necesario en el futuro,
    // pero los elementos globales de UI ya están siendo gestionados.
    // Ejemplo:
    // const loadingIndicator = document.createElement('div');
    // loadingIndicator.id = 'loading-indicator-specific';
    // loadingIndicator.textContent = 'Cargando recursos del juego...';
    // this.gameManager.getContainerElement().appendChild(loadingIndicator);
  }

  exit(): void {
    console.log('LoadingState: exit');
    // Limpiar UI específica de carga si se añadió en enter()
    // const loadingIndicator = document.getElementById('loading-indicator-specific');
    // if (loadingIndicator) {
    //   loadingIndicator.remove();
    // }
  }

  update(_deltaTime: number): void {
    // No se necesita acción por frame en este estado generalmente.
  }
}