import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import pkg from '../../package.json'
import {resolve} from "path";

const isDev = process.env.MODE === 'development';
const ROOT = process.cwd();
console.log(isDev)
console.log(process.env.NODE_ENV)

export default defineConfig({
  root: __dirname,
  logLevel: 'info',
  build: {
    outDir: resolve(ROOT,'release/app/dist/main'),
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
