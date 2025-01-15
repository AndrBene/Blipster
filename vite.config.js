import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src/client/public-blog', // Set root to vite-dev-server
  plugins: [react()],
});
