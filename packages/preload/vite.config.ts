import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import pkg from '../../package.json'

const isDev = process.env.MODE === 'development'||process.env.NODE_ENV === 'development';


export default defineConfig({
  root: __dirname,
  logLevel: 'info',
  build: {
    outDir: isDev ? '../../dist/preload':'../../release/app/dist/preload',
    emptyOutDir: true,
    minify: !isDev,
    sourcemap: 'inline',
    rollupOptions: {
      input: {
        index: join(__dirname, 'src/index.ts'),
      },
      output: {
        format: 'cjs',
        entryFileNames: '[name].cjs',
        manualChunks: {},
      },
      external: [
        'electron',
        ...builtinModules,
        ...builtinModules.map(e => `node:${e}`),
        ...Object.keys(pkg.dependencies || {}),
      ],
    },
  },
})
