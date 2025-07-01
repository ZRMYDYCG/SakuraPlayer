/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 确定键盘是否按下某个按键
 */
import { ref } from 'vue'

export function useKeyPress(targetKey: string) {
  const keyPressed = ref(false)
  window.addEventListener('keydown', (event) => {
    if (event.key === targetKey) {
      keyPressed.value = true
    }
  })
  window.addEventListener('keyup', (event) => {
    if (event.key === targetKey) {
      keyPressed.value = false
    }
  })
  return keyPressed
}
