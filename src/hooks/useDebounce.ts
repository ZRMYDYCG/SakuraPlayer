/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 防抖函数
 */
import { ref } from 'vue'

export const useDebounce = (value: any, delay = 500) => {
    let timeout: any
    const debounceValue = ref(value)

    const setDebounceValue = (newValue: any) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            debounceValue.value = newValue
        }, delay)
    }

    return [debounceValue, setDebounceValue]
}