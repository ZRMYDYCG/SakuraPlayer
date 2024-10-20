/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './tailwind.css'
import '@/assets/styles/global.less'
import '@/assets/styles/mode.less'
import '@/assets/iconfont/iconfont.css'
import '@/assets/styles/animate.css'
import '@/permission'
import MiniPlayOut from '@/layout/miniplayout.vue'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('MiniPlayOut', MiniPlayOut)
app.mount('#app')
