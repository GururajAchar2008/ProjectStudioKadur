import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative paths keep GitHub Pages deployments portable.
  base: './',
  plugins: [react()],
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
});
