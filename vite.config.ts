import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' agar hasil build bisa dibuka dari GitHub Pages atau folder lokal.
export default defineConfig({
  plugins: [react()],
  base: './',
});
