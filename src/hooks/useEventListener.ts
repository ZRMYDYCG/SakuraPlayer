/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 事件监听
 */
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(event: string, handler: (event: Event) => void, options?: boolean | AddEventListenerOptions) {
  onMounted(() => {
    window.addEventListener(event, handler, options)
  })
  onUnmounted(() => {
    window.removeEventListener(event, handler, options)
  })
}
