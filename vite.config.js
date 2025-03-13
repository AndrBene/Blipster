import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src/vite-dev-server', // Set root to vite-dev-server
  publicDir: '../../public', // serve plain static assets w.r.t. root folder
  plugins: [react()],
  server: {
    proxy: {
      '/users/images': 'http://localhost:3000',
    },
  },
});
