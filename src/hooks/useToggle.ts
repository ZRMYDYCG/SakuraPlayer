/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 用于在组件中创建一个切换状态
 */
import { ref } from 'vue'

export function useToggle(defaultValue = false) {
  const toggled = ref(defaultValue)
  const toggle = () => {
    toggled.value = !toggled.value
  }
  return { toggled, toggle }
}
