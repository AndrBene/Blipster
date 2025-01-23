import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src/client/public-blog', // Set root to vite-dev-server
  publicDir: '../../../public', // serve plain static assets w.r.t. root folder
  plugins: [react()],
});
