import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(), // Vite plugin for React
  ],
  resolve: {
    alias: {
      '@': '/src', // Alias "@" to point to the /src directory
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()], // Enable Tailwind CSS in PostCSS
    },
  },
});
