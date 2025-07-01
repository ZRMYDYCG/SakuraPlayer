import type { AxiosResponse } from 'axios'
import type { AlbumDetailParams, AlbumListParams, DigitAlbumParams } from '../interface/album'
import request from '../index'

// 新碟上架
export function reqAlbumList(params: AlbumListParams): Promise<AxiosResponse> {
  return request({
    url: '/album/list',
    method: 'GET',
    params,
  })
}

// 获取数字专辑
export function reqDigitAlbum(params: DigitAlbumParams): Promise<AxiosResponse> {
  return request({
    url: '/album/songsaleboard',
    method: 'GET',
    params,
  })
}

// 数字专辑详情
export function reqAlbumDetail(params: AlbumDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/album/detail',
    method: 'GET',
    params,
  })
}

// 专辑详情 /digitalAlbum/detail
export function reqDigitalAlbum(params: AlbumDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/digitalAlbum/detail',
    method: 'GET',
    params,
  })
}

// 获取专辑内容
export function reqAlbum(params: AlbumDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/album',
    method: 'GET',
    params,
  })
}
