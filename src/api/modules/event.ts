import type { AxiosResponse } from 'axios'
import type { EventParams, UserEventParams } from '../interface/event'
/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
import request from '../index'
// 动态
export function reqEvent(params: EventParams): Promise<AxiosResponse> {
  return request({
    url: '/event',
    method: 'GET',
    params,
  })
}
// 获取用户动态
export function reqUserEvent(params: UserEventParams): Promise<AxiosResponse> {
  return request({
    url: '/user/event',
    method: 'GET',
    params,
  })
}
