import { fileURLToPath, URL } from 'node:url'
import { VantResolver } from '@vant/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
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
  },
})
