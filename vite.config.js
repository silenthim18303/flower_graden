import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// 复制 src/main.js 到根目录的 Vite 插件
const copyMainJsPlugin = {
  name: 'copy-main-js',
  configureServer(server) {
    // 在服务器启动时复制文件
    if (fs.existsSync('src/main.js')) {
      fs.copyFileSync('src/main.js', 'main.js');
      console.log('Copied src/main.js to main.js');
    }
  },
  buildStart() {
    // 在构建时复制文件
    if (fs.existsSync('src/main.js')) {
      fs.copyFileSync('src/main.js', 'main.js');
      console.log('Copied src/main.js to main.js');
    }
  }
};

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: './',
  plugins: [copyMainJsPlugin],
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
            compost_ola: resolve(__dirname, 'compost_ola.html'),
            ecommerce: resolve(__dirname, 'ecommerce.html'),
            flowerbox: resolve(__dirname, 'flowerbox.html'),
            mower: resolve(__dirname, 'mower.html'),
            seed: resolve(__dirname, 'seed.html'),
            sickle: resolve(__dirname, 'sickle.html'),
            tree: resolve(__dirname, 'tree.html'),
            game: resolve(__dirname, 'game.html'),
            dog: resolve(__dirname, 'dog.html'),
            tutorial: resolve(__dirname, 'tutorial.html')
        },
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ['..']
    }
  }
});
