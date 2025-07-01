import { fileURLToPath, URL } from 'node:url'
import { VantResolver } from '@vant/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'
import imagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
    // Gzip压缩配置
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // 图片压缩配置
    imagemin({
      gifsicle: false,
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    open: true, // 启动时自动打开浏览器
    hmr: true, // 热更新
    host: '0.0.0.0', // 支持真机调试
    port: 3030,
  },
  build: {
    outDir: 'dist', // 输出目录
    assetsDir: 'static', // 生成的静态资源目录
    // 构建优化配置
    minify: 'esbuild', // 使用esbuild进行代码压缩
    sourcemap: false, // 生产环境不生成sourcemap
    chunkSizeWarningLimit: 1000, //  chunk大小警告阈值(kb)
    rollupOptions: {
      output: {
        // 代码分割配置
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          vant: ['vant'],
        },
        // 静态资源命名
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
    // CSS优化
    cssCodeSplit: true,
    cssMinify: 'esbuild',
  },
  // 依赖预构建优化
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vant'],
    exclude: [],
  },
})
