import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { chrome } from './info.json';

export default defineConfig({
  base: './',
  publicDir: './public',
  plugins: [reactRefresh()],
  build: {
    // sourcemap: true,
    outDir: './release/build/render',
    emptyOutDir: true,
    target: `chrome${chrome}`,
    brotliSize: true,
    rollupOptions: {
      output: {
        compact: true,
        assetFileNames: 'assets.[name].[ext]',
        chunkFileNames: 'chunk.[name].js',
        entryFileNames: 'entry.[name].js',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          } else {
            return 'bundle';
          }
        }
      }
    }
  }
});
