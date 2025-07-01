/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 追踪鼠标位置的Hook
 */
import { onMounted, onUnmounted, ref } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  const updateMousePosition = (event: MouseEvent) => {
    x.value = event.clientX
    y.value = event.clientY
  }

  onMounted(() => {
    document.addEventListener('mousemove', updateMousePosition)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', updateMousePosition)
  })

  return {
    x,
    y,
  }
}
