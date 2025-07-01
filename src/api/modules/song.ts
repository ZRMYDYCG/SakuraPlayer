import type { AxiosResponse } from 'axios'
import type { idsParams, LikeParams, ModeParams, SheetListParams, SongUrlParams } from '../interface/song'
import request from '../index'
// 获取歌曲播放地址
export function reqGetSongUrl(params: SongUrlParams): Promise<AxiosResponse> {
  return request({
    url: '/song/url',
    method: 'GET',
    params,
  })
}
// 检查音乐是否可用
export function reqCanPlayMusic(params: SongUrlParams): Promise<AxiosResponse> {
  return request({
    url: '/check/music',
    method: 'GET',
    params,
  })
}
// 获取歌词
export function reqGetLyric(params: SongUrlParams): Promise<AxiosResponse> {
  return request({
    url: '/lyric',
    method: 'GET',
    params,
  })
}
// 获取歌单详情 /playlist/detail
export function reqSheetDetail(params: SongUrlParams): Promise<AxiosResponse> {
  return request({
    url: '/playlist/detail',
    method: 'GET',
    params,
  })
}
// 获取歌单歌曲
export function reqSheetSongs(params: SongUrlParams): Promise<AxiosResponse> {
  return request({
    url: '/playlist/track/all',
    method: 'GET',
    params,
  })
}
// 获取歌单标签
export function reqSheetTags(): Promise<AxiosResponse> {
  return request({
    url: '/playlist/highquality/tags',
    method: 'GET',
  })
}
// 获取歌单列表
export function reqSheetList(params: SheetListParams): Promise<AxiosResponse> {
  return request({
    url: '/top/playlist/highquality',
    method: 'GET',
    params,
  })
}
// 获取歌曲详情
export function reqSongDetail(params: idsParams): Promise<AxiosResponse> {
  return request({
    url: '/song/detail',
    method: 'GET',
    params,
  })
}
// 心动模式
export function reqPlayModeList(params: ModeParams): Promise<AxiosResponse> {
  return request({
    url: '/playmode/intelligence/list',
    method: 'GET',
    params,
  })
}
// 喜欢歌曲
export function reqLikeSong(params: LikeParams): Promise<AxiosResponse> {
  return request({
    url: '/like',
    method: 'GET',
    params,
  })
}
