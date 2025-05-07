import { defineConfig } from 'vite';

// Si estás usando un plugin específico para Lit (como @vitejs/plugin-lit) impórtalo aquí
// import litPlugin from '@vitejs/plugin-lit'; // Ejemplo

export default defineConfig({
  plugins: [
    // Si usas el plugin de Lit, añádelo aquí:
    // litPlugin(), // Ejemplo
  ],
  build: {
    // Opciones de build si necesitas (ej. cambiar directorio de salida)
    // outDir: 'dist',
  },
  server: {
    // Opciones del servidor de desarrollo (ej. puerto)
    // port: 3000,
  }
});