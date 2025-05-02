// vite.config.js - FOR GITHUB PAGES DEPLOYMENT
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace '/nyxstream-vite/' with the actual name of your repository on GitHub!
// Example: If your repo URL is https://github.com/YourUser/MyCoolApp
// then base should be '/MyCoolApp/'
const repositoryName = '/nyxstream-vite/'; // <<< CHANGE THIS TO YOUR REPO NAME!!! (Include slashes)

// https://vitejs.dev/config/
export default defineConfig({
  base: repositoryName, // Use the variable here
  plugins: [react()],
});
