import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import pkg from '../../package.json'

const isDev = process.env.MODE === 'development'||process.env.NODE_ENV === 'development';

export default defineConfig({
  root: __dirname,
  logLevel: 'info',
  build: {
    outDir: isDev ? '../../dist/main':'../../release/app/dist/main',
    emptyOutDir: true,
    minify: !isDev,
    sourcemap: true,
    lib: {
      entry: 'src/main.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...builtinModules.map(e => `node:${e}`),
        ...Object.keys(pkg.dependencies || {}),
      ],
    },
  },
})
