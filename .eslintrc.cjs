// .eslintrc.cjs
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:storybook/recommended'],
  env: {
    browser: true, // Permite variables globales del navegador (window, document, etc.)
    es2021: true,  // Permite sintaxis moderna de ECMAScript
    node: true     // Permite variables globales de Node.js (útil para archivos de config como este)
  },
  rules: {
    'prettier/prettier': 'warn', // Muestra warnings de Prettier como errores de ESLint
    // Puedes añadir o sobrescribir reglas aquí si lo necesitas
    // Ejemplo: '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Warning para variables no usadas (ignorando las que empiezan con _)
    // Ejemplo: '@typescript-eslint/no-explicit-any': 'off', // Desactivar la regla que prohíbe 'any' (úsalo con cuidado)
  },
  ignorePatterns: ['dist', 'node_modules', '*.cjs'], // Ignora estas carpetas/archivos
};