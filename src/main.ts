// src/main.ts
import './styles/base.css';
import './styles/layout.css';
import './styles/animations.css'; 

// Importar GameManager
import { GameManager } from './game/GameManager';
// Asegúrate de que AudioManager esté disponible si necesitas tiparlo aquí,
// aunque se accede a través de gameManager.
// import { AudioManager } from './game/systems/AudioManager'; 

console.log('DOM Cargado. Iniciando W&W');

const appElement = document.getElementById('app');

if (!appElement) {
  console.error('Error: Elemento #app no encontrado en el DOM.');
} else {
  appElement.innerHTML = ''; // Limpiar contenedor principal

  console.log('Preparado para inicializar GameManager.');
  const gameManager = new GameManager(appElement);

  // Exponer gameManager globalmente para depuración desde la consola
  (window as any).gameManager = gameManager;
  console.log("GameManager expuesto como window.gameManager para depuración.");

  // Función para configurar los listeners de interacción de audio
  // Se llamará DESPUÉS de que gameManager.init() haya completado.
  const setupAudioInteractionListeners = () => {
    const resumeAudioOnInteraction = async () => { // Hacemos la función async
      const audioManager = gameManager.getAudioManager();
      if (audioManager) { // Verificar que el audioManager exista
          console.log('User interaction detected (post gameManager.init), attempting to resume audio context...');
          // Llama a tryResumeContext() del AudioManager para intentar activar/reanudar el audio.
          await audioManager.tryResumeContext(); 
      } else {
          console.warn('AudioManager not available at the time of user interaction for resume (post gameManager.init).');
      }
      // Remover estos listeners generales después del primer uso.
      document.body.removeEventListener('click', resumeAudioOnInteraction, { capture: true });
      document.body.removeEventListener('touchstart', resumeAudioOnInteraction, { capture: true });
      console.log("One-time audio resume listeners removed (post gameManager.init).");
    };

    console.log('Adding one-time listeners for audio context resume (post gameManager.init)...');
    // Estos listeners se activarán una vez en la primera interacción del usuario con el body.
    document.body.addEventListener('click', resumeAudioOnInteraction, { once: true, capture: true });
    document.body.addEventListener('touchstart', resumeAudioOnInteraction, { once: true, capture: true, passive: true });
  };

  // Iniciar el juego
  gameManager.init() // Se asume que gameManager.init() llama a audioManager.init() internamente.
    .then(() => {
      gameManager.create();
      // gameManager.start(); // Considera si start() debe ir aquí o después de la primera interacción/pantalla de menú.
                           // En tu MainMenuState, ya llamas a gameManager.start() después del clic en "start game".
                           // Si lo dejas aquí, el juego podría empezar a correr "detrás" del menú principal.
                           // Si tu GameManager.start() inicia el game loop y la física, y tu estado inicial
                           // es MainMenuState, es probable que quieras que MainMenuState controle cuándo
                           // realmente "comienza" la lógica del juego (como ya lo hace).
      console.log('GameManager inicializado y UI creada. El juego comenzará desde MainMenuState.');

      // Ahora que gameManager.init() ha completado (y por lo tanto audioManager.init() debería haberse ejecutado),
      // configuramos los listeners para la interacción de audio.
      setupAudioInteractionListeners();
    })
    .catch(error => {
      console.error("Error durante la inicialización del juego:", error);
      appElement.innerHTML = `Error al cargar el juego: ${error.message}. Revisa la consola.`;
    });
}
