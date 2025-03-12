import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl'; // Correct import for the GLSL plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl()], // Use the glsl plugin here
});
