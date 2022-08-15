/* eslint-env node */
import { defineConfig } from 'vite';
import { join, resolve } from 'path';
import reactRefresh from '@vitejs/plugin-react';

const PACKAGE_ROOT = __dirname;
const APP_ROOT = process.cwd();
const mode = (process.env.MODE = process.env.MODE || 'development');
const input = resolve(__dirname, './index.html');

export default defineConfig({
  mode: mode,
  root: PACKAGE_ROOT,
  plugins: [reactRefresh()],
  base: '',
  logLevel: mode==='development'?'error':'info',
  publicDir: join(PACKAGE_ROOT, 'assets'),
  resolve: {
    alias: {
      '/@/': join(PACKAGE_ROOT, 'src') + '/',
      '/@cmp/': join(PACKAGE_ROOT, 'src/components') + '/'
    }
  },
  build: {
    sourcemap: true,
    outDir: resolve(APP_ROOT,'release/app/dist/render'),
    emptyOutDir: true,
    rollupOptions: {
      input
    },
  }
});
