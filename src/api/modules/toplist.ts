import type { AxiosResponse } from 'axios'
import request from '../index'

// 所有榜单
export function reqTopList(): Promise<AxiosResponse> {
  return request({
    url: '/toplist',
    method: 'GET',
  })
}
