/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
import type { AxiosResponse } from 'axios'
import type { HistoryRecommendParams, RecommendListParams } from '../interface/home'
import request from '../index'
// 获取banner
export function reqBanner(): Promise<AxiosResponse> {
  return request({
    url: '/banner',
    method: 'GET',
    params: {
      type: 2,
    },
  })
}
// 获取推荐歌单
export function reqRecommendList(params: RecommendListParams): Promise<AxiosResponse> {
  return request({
    url: '/personalized',
    method: 'GET',
    params,
  })
}
// 获取推荐新歌
export function reqRecommendNewSongs(params: RecommendListParams): Promise<AxiosResponse> {
  return request({
    url: '/personalized/newsong',
    method: 'GET',
    params,
  })
}
// 每日推荐歌曲
export function reqDaysRecommend(): Promise<AxiosResponse> {
  return request({
    url: '/recommend/songs',
    method: 'GET',
  })
}
// 获取历史日推可用日期列表
export function reqHistoryRecommend(params: HistoryRecommendParams): Promise<AxiosResponse> {
  return request({
    url: '/history/recommend/songs/detail',
    method: 'GET',
    params,
  })
}
// 获取可用推荐日期
export function reqGetRecommendDate(): Promise<AxiosResponse> {
  return request({
    url: '/history/recommend/songs',
    method: 'GET',
  })
}
// 国家编码列表
export function reqCountryCode(): Promise<AxiosResponse> {
  return request({
    url: '/countries/code/list',
    method: 'GET',
  })
}
