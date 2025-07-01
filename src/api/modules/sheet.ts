// 歌单
import type { AxiosResponse } from 'axios'
import type {
  createParams,
  delParams,
  SheetTracksParams,
  subscribeParams,
  UpdateCoverParams,
  UpdateDescParams,
  UpdateNameParams,
  UpdateTagsParams,
} from '../interface/sheet'
import request from '../index'

export function reqSubscribeSheet(params: subscribeParams): Promise<AxiosResponse> {
  return request({
    url: '/playlist/subscribe',
    method: 'GET',
    params,
  })
}

// 歌单分类
export function reqCatList(): Promise<AxiosResponse> {
  return request({
    url: '/playlist/catlist',
    method: 'GET',
  })
}

// 创建歌单
export function reqCreateSheet(params: createParams): Promise<AxiosResponse> {
  return request({
    url: '/playlist/create',
    method: 'GET',
    params,
  })
}
// 删除歌单
export function reqDelSheet(params: delParams): Promise<AxiosResponse> {
  return request({
    url: '/playlist/delete',
    method: 'GET',
    params,
  })
}
// 对歌单添加或删除歌曲
export function reqSheetTracks(params: SheetTracksParams): Promise<AxiosResponse> {
  return request({
    url: '/playlist/tracks',
    method: 'GET',
    params,
  })
}
// 歌单封面更新
export function reqUpdateCover(params: UpdateCoverParams, data: FormData): Promise<AxiosResponse> {
  return request({
    url: '/playlist/cover/update',
    method: 'POST',
    params,
    data,
  })
}
// 更新歌单名
export function reqUpdateSheetName(params: UpdateNameParams): Promise<AxiosResponse> {
  return request({
    url: '/playlist/name/update',
    method: 'GET',
    params,
  })
}
// 更新歌单标签
export function reqUpdateSheetTags(params: UpdateTagsParams): Promise<AxiosResponse> {
  return request({
    url: '/playlist/tags/update',
    method: 'GET',
    params,
  })
}
// 更新歌单描述
export function reqUpdateSheetDesc(params: UpdateDescParams): Promise<AxiosResponse> {
  return request({
    url: '/playlist/desc/update',
    method: 'GET',
    params,
  })
}
