/* eslint-env node */
import { defineConfig } from 'vite';
import {chrome} from '../version.json';
import {resolve} from 'path';
import {builtinModules} from 'module';
import reactRefresh from '@vitejs/plugin-react-refresh';

const PACKAGE_ROOT = __dirname;
const mode = process.env.MODE = process.env.MODE || 'development';
const input = resolve(__dirname,'./index.html');

export default defineConfig({
  mode: mode,
  root: PACKAGE_ROOT,
  plugins: [reactRefresh()],
  base: '',
  logLevel:'info',
  build: {
    sourcemap: 'inline',
    target: `chrome${chrome}`,
    outDir: '../release/app/dist/render',
    rollupOptions: {
      input,
      external: [
        ...builtinModules.flatMap(p => [p, `node:${p}`])
      ],
      output: {
        compact: true,
        assetFileNames: 'static/assets.[name].[ext]',
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
    },
    emptyOutDir: true,
    brotliSize: false
  }
});

