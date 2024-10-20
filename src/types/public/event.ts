/*
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-07-16 22:29:48
 * @LastEditors: ZRMYDYCG 547471919@qq.com
 * @LastEditTime: 2024-08-13 16:16:40
 * @FilePath: \v3_ts_music\src\types\public\event.ts
 * @Description: 约定数据类型
 */
// 朋友圈动态数据类型
import { UserInterface } from '@/types/public/user'

export interface picsInterface {
    originUrl: string
    pcRectangleUrl: string
    pcSquareUrl: string
    rectangleUrl: string
    squareUrl: string
    height: number
    width: number
}

export interface ipLocationInterface {
    ip: string
    location: string
}

export interface EventDataInterface {
    id: number
    json: string
    type: number
    eventTime: number
    user: UserInterface
    pics?: picsInterface[]
    ipLocation?: ipLocationInterface
}
