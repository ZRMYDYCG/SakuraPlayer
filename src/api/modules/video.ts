import type { AxiosResponse } from 'axios'
import type {
  AllVideoParams,
  MlogToVideParams,
  MlogUrlParams,
  MvDetailParams,
  MvTopParams,
  MvUrlParams,
  NewMvParams,
  VideoDetailParams,
  VideoUrlParams,
} from '../interface/video'
/*
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
 */
import request from '../index'
// 获取视频的播放地址
export function reqVideoUrl(params: VideoUrlParams): Promise<AxiosResponse> {
  return request({
    url: '/video/url',
    method: 'GET',
    params,
  })
}
// 视频详情
export function reqVideoDetail(params: VideoDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/video/detail',
    method: 'GET',
    params,
  })
}
// 获取全部视频
export function reqAllVideo(params?: AllVideoParams): Promise<AxiosResponse> {
  return request({
    url: '/video/timeline/all',
    method: 'GET',
    params,
  })
}
// 获取 mlog 播放地址
export function reqMlogUrl(params: MlogUrlParams): Promise<AxiosResponse> {
  return request({
    url: '/mlog/url',
    method: 'GET',
    params,
  })
}
// 将 mlog id 转为视频 id
export function reqMlogToVideo(params: MlogToVideParams): Promise<AxiosResponse> {
  return request({
    url: '/mlog/to/video',
    method: 'GET',
    params,
  })
}
// 获取mv详情
export function reqMvDetail(params: MvDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/mv/detail',
    method: 'GET',
    params,
  })
}
// mv播放地址
export function reqMvUrl(params: MvUrlParams): Promise<AxiosResponse> {
  return request({
    url: '/mv/url',
    method: 'GET',
    params,
  })
}
// 最新mv
export function reqNewMv(params?: NewMvParams): Promise<AxiosResponse> {
  return request({
    url: '/mv/first',
    method: 'GET',
    params,
  })
}
// 获取mv排行
export function reqMvTop(params: MvTopParams): Promise<AxiosResponse> {
  return request({
    url: '/top/mv',
    method: 'GET',
    params,
  })
}
