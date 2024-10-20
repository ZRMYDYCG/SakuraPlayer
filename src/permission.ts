/*
 * @Author: ZRMYDYCG
 * @Date: 2024-07
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */

import router from '@/router'
import { useUserStore, useMsgStore } from '@/store'
import { getToken } from '@/utils/auth'
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    const msgStore = useMsgStore()
    try {
        if (getToken() && !userStore.userInfo.userId) {
            await userStore.getInfo()
            await userStore.getLikeList()
            await msgStore.setNewMsgCount()
        }
        next()
    } catch (e) {
        next()
    }
})
