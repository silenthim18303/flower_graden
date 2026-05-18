import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        garden: resolve(__dirname, 'garden.html'),
        work: resolve(__dirname, 'work.html'),
        compost: resolve(__dirname, 'compost.html'),
        ecommerce: resolve(__dirname, 'ecommerce.html'),
        flowerbox: resolve(__dirname, 'flowerbox.html'),
        mower: resolve(__dirname, 'mower.html'),
        seed: resolve(__dirname, 'seed.html'),
        sickle: resolve(__dirname, 'sickle.html'),
        tree: resolve(__dirname, 'tree.html')
      },
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
