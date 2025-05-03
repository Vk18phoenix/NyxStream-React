// vite.config.js - FINAL CODE for GitHub Pages Deployment

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// --- Set base path to match your GitHub repository name ---
const deploymentBase = '/NyxStream_React/'; // <<< Set to your repo name
// --- --- --- ---


// https://vitejs.dev/config/
export default defineConfig({
  // Set the base path for correct asset loading and routing on GitHub Pages
  base: deploymentBase,

  plugins: [react()],

  // Optional: Build output directory (defaults to 'dist')
  // build: {
  //   outDir: 'dist'
  // }
});
