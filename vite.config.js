import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // Relative paths keep GitHub Pages deployments portable.
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        smallworks: resolve(rootDir, 'smallworks/index.html'),
        thankyou: resolve(rootDir, 'thankyou/index.html'),
      },
    },
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
});
