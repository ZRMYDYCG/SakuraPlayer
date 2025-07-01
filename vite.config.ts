import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [VantResolver()]
        }),
        Components({
            resolvers: [VantResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
            // 根据需要添加更多别名
            // '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        }
    },
    server: {
        open: true, // 启动时自动打开浏览器
        hmr: true, // 热更新
        host: '0.0.0.0', // 支持真机调试
        port: 3030,
    },
    build: {
        outDir: 'dist', // 输出目录
        assetsDir: 'static' // 生成的静态资源目录
    },
    define: {
        'process.env': {} // 定义环境变量
    },
    css: {
        postcss: {
 
        }
    }
})

