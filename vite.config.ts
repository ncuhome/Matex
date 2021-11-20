import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { chrome } from './info.json';

export default defineConfig(async () => {
  const mdx = (await import('@mdx-js/rollup')).default;
  return {
    base: './',
    resolve: {
      alias: {
        'react/jsx-runtime': 'react/jsx-runtime.js'
      }
    },
    plugins: [reactRefresh(), mdx()],
    build: {
      outDir: './release/build/render',
      emptyOutDir: true,
      target: `chrome${chrome}`,
      brotliSize: false,
      rollupOptions: {}
    }
  };
});
