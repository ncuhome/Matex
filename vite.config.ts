import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { chrome } from './info.json';

export default defineConfig(async () => {
  return {
    base: './',
    publicDir: './public',
    plugins: [reactRefresh()],
    build: {
      outDir: './release/build/render',
      emptyOutDir: true,
      target: `chrome${chrome}`,
      brotliSize: false,
      rollupOptions: {}
    }
  };
});
