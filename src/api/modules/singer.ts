// 歌手
import type { AxiosResponse } from 'axios'
import type {
  singerAlbum,
  singerDetailParams,
  singerListParams,
  singerSongParams,
  subSingerParams,
} from '../interface/singer'
import request from '../index'
// 获取歌手列表
export function reqSingerList(params: singerListParams): Promise<AxiosResponse> {
  return request({
    url: '/artist/list',
    method: 'GET',
    params,
  })
}
// 关注/取消歌手
export function reqSubSinger(params: subSingerParams): Promise<AxiosResponse> {
  return request({
    url: '/artist/sub',
    method: 'GET',
    params,
  })
}
// 获取歌手详情
export function reqSingerDetail(params: singerDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/artist/detail',
    method: 'GET',
    params,
  })
}
// 获取跟手描述
export function reqSingerDesc(params: singerDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/artist/desc',
    method: 'GET',
    params,
  })
}
// 获取歌手粉丝数量
export function reqSingerFans(params: singerDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/artist/follow/count',
    method: 'GET',
    params,
  })
}
// 歌手热门歌曲
export function reqSingHotSongs(params: singerDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/artist/top/song',
    method: 'GET',
    params,
  })
}
// 分页获取歌手歌曲
export function reqSingerSongs(params: singerSongParams): Promise<AxiosResponse> {
  return request({
    url: '/artist/songs',
    method: 'GET',
    params,
  })
}
// 获取歌手专辑
export function reqSingerAlbum(params: singerAlbum): Promise<AxiosResponse> {
  return request({
    url: '/artist/album',
    method: 'GET',
    params,
  })
}
