import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// 入口文件
const pages = {
  index: resolve(__dirname, 'index.html'),
  page1: resolve(__dirname, 'donation/index.html'),
  page2: resolve(__dirname, 'about/index.html'),
  // 可以根据需要添加更多页面
};


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      // 多页面入口
      input: pages,
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      }
    }

  },

})
