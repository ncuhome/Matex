/* eslint-env node */
import { defineConfig } from 'vite';
import { chrome } from '../version.json';
import { join, resolve } from 'path';
import { builtinModules } from 'module';
import reactRefresh from '@vitejs/plugin-react-refresh';

const PACKAGE_ROOT = __dirname;
const APP_ROOT = process.cwd();
const mode = (process.env.MODE = process.env.MODE || 'development');
const input = resolve(__dirname, './index.html');

export default defineConfig({
  mode: mode,
  root: PACKAGE_ROOT,
  plugins: [reactRefresh()],
  base: '',
  logLevel: 'info',
  publicDir: join(PACKAGE_ROOT, 'assets'),
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
      '/@cmp/': join(PACKAGE_ROOT, 'src/components') + '/',
      '/@common/': join(APP_ROOT, 'common') + '/'
    }
  },
  build: {
    sourcemap: false,
    target: `chrome${chrome}`,
    outDir: '../release/app/dist/render',
    rollupOptions: {
      input,
      external: [...builtinModules.flatMap((p) => [p, `node:${p}`])],
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
