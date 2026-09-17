import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: path.resolve('github-pages'),
  base: './',
  plugins: [react()],
  publicDir: path.resolve('public'),
  build: {
    outDir: path.resolve('dist-pages'),
    emptyOutDir: true,
  },
});
