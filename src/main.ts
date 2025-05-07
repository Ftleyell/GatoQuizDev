// src/main.ts
import './styles/base.css';
import './styles/layout.css';
import './styles/animations.css'; // <--- AÑADIR ESTA LÍNEA

// Importar GameManager
import { GameManager } from './game/GameManager';

console.log('DOM Cargado. Iniciando Quiz Felino...');

const appElement = document.getElementById('app');
const shopButtonElement = document.getElementById('shop-button'); // Botón Tienda

if (!appElement) {
  console.error('Error: Elemento #app no encontrado en el DOM.');
} else {
  appElement.innerHTML = ''; // Limpiar contenedor principal

  console.log('Preparado para inicializar GameManager.');
  const gameManager = new GameManager(appElement);

  // Exponer gameManager globalmente para depuración desde la consola
  (window as any).gameManager = gameManager;
  console.log("GameManager expuesto como window.gameManager para depuración.");

  // Inicialización de Audio por Interacción del Usuario
  const initializeAudioOnInteraction = () => {
    const audioManager = gameManager.getAudioManager();
    if (!audioManager.isReady()) {
        console.log('User interaction detected, attempting to initialize audio...');
        audioManager.init(); // Llama a init() del AudioManager
    }
    // Remover estos listeners generales después del primer uso
    document.body.removeEventListener('click', initializeAudioOnInteraction, { capture: true });
    document.body.removeEventListener('touchstart', initializeAudioOnInteraction, { capture: true });
    console.log("One-time audio init listeners removed.");
  };
  console.log('Adding one-time listeners for audio initialization...');
  document.body.addEventListener('click', initializeAudioOnInteraction, { once: true, capture: true });
  document.body.addEventListener('touchstart', initializeAudioOnInteraction, { once: true, capture: true, passive: false }); // Passive false por si acaso

  // Iniciar el juego (sin cambios)
  gameManager.init()
    .then(() => {
      gameManager.create();
      gameManager.start();
      console.log('GameManager inicializado y arrancado.');
    })
    .catch(error => {
      console.error("Error durante la inicialización del juego:", error);
      appElement.innerHTML = `Error al cargar el juego: ${error.message}. Revisa la consola.`;
    });
}