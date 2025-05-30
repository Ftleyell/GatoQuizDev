// LPM/vite.config.ts
import { defineConfig } from 'vite';

// Si estás usando un plugin específico para Lit (como @vitejs/plugin-lit) impórtalo aquí
// import litPlugin from '@vitejs/plugin-lit'; // Ejemplo

export default defineConfig({
  plugins: [
    // Si usas el plugin de Lit, añádelo aquí:
    // litPlugin(), // Ejemplo
  ],
  // --- Configuración 'base' para tu repositorio ---
  base: '/Wisdom-Wiskers/', // <-- ¡Este es el valor correcto para tu repo!
  // ---------------------------------------------
  build: {
    outDir: 'dist', // Directorio de salida (default)
  },
  server: {
    // port: 3000, // Opciones del servidor de desarrollo
  }
});