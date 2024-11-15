/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 防抖函数
 */
export function useDebounce(fn: (...args: any[]) => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>

    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
