// 最近播放
import type { AxiosResponse } from 'axios'
import type { RecentParams } from '../interface/recent'
import request from '../index'
// 最近播放-歌曲
export function reqRecentSong(params: RecentParams): Promise<AxiosResponse> {
  return request({
    url: '/record/recent/song',
    method: 'GET',
    params,
  })
}
// 最近播放-视频
export function reqRecentVideo(params: RecentParams): Promise<AxiosResponse> {
  return request({
    url: '/record/recent/video',
    method: 'GET',
    params,
  })
}
// 最近播放-声音
export function reqRecentVoice(params: RecentParams): Promise<AxiosResponse> {
  return request({
    url: '/record/recent/voice',
    method: 'GET',
    params,
  })
}
// 最近播放-歌单
export function reqRecentSheet(params: RecentParams): Promise<AxiosResponse> {
  return request({
    url: '/record/recent/playlist',
    method: 'GET',
    params,
  })
}
// 最近播放-播客
export function reqRecentDj(params: RecentParams): Promise<AxiosResponse> {
  return request({
    url: '/record/recent/dj',
    method: 'GET',
    params,
  })
}
// 最近播放-专辑
export function reqRecentAlbum(): Promise<AxiosResponse> {
  return request({
    url: '/record/recent/album',
    method: 'GET',
  })
}
