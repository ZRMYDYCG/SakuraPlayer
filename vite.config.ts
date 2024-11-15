/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import postcsspxtoviewport from 'postcss-px-to-viewport'

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
        host: '192.168.151.45', // 支持真机调试
        port: 3030,
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // 代理地址
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
            }
        }
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
            plugins: [
                postcsspxtoviewport({
                    unitToConvert: 'px', // 要转化的单位
                    viewportWidth: 750, // UI设计稿的宽度，一般写 320

                    // 下面的不常用，上面的常用
                    unitPrecision: 6, // 转换后的精度，即小数点位数
                    propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                    viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
                    fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
                    selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
                    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
                    mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
                    replace: true, // 是否转换后直接更换属性值
                    landscape: false // 是否处理横屏情况
                })
            ]
        }
    }
})
