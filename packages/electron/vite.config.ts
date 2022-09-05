import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import pkg from '../../package.json';
import { join, resolve } from 'path';

const isDev = process.env.MODE === 'development';
const ROOT = process.cwd();
const APP_ROOT = resolve(ROOT, 'packages');

export default defineConfig({
  root: __dirname,
  logLevel: isDev ? 'error' : 'info',
  resolve: {
    alias: {
      '/@/': join(APP_ROOT, './') + '/',
      '/@common/': join(APP_ROOT, 'common') + '/'
    }
  },
  build: {
    outDir: resolve(ROOT, 'release/app/dist/main'),
    emptyOutDir: true,
    minify: !isDev,
    sourcemap: true,
    lib: {
      entry: 'src/main.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs'
    },
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...builtinModules.map((e) => `node:${e}`),
        ...Object.keys(pkg.dependencies || {})
      ]
    }
  }
});
