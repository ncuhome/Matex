import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { chrome } from './info.json';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [reactRefresh()],
  build: {
    outDir: './release/build/render',
    emptyOutDir: true,
    target: `chrome${chrome}`,
    brotliSize: false,
    rollupOptions: {
      // external: ['react', 'react-dom']
    }
  }
});
