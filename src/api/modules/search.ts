// 搜索
import type { AxiosResponse } from 'axios'
import type { MultimatchParams, SuggestParams, TypeSearchparams } from '../interface/search'
import request from '../index'

// 获取默认搜索关键词
export function reqSearchDefault(): Promise<AxiosResponse> {
  return request({
    url: '/search/default',
    method: 'GET',
  })
}
// 热搜列表
export function reqHotSearch(): Promise<AxiosResponse> {
  return request({
    url: '/search/hot',
    method: 'GET',
  })
}
// 详细的热搜列表
export function reqDetailHotSearch(): Promise<AxiosResponse> {
  return request({
    url: '/search/hot/detail',
    method: 'GET',
  })
}
// 搜索建议
export function reqSearchSuggest(params: SuggestParams): Promise<AxiosResponse> {
  return request({
    url: '/search/suggest',
    method: 'GET',
    params,
  })
}
// 搜索多重匹配
export function reqMultiMatch(params: MultimatchParams): Promise<AxiosResponse> {
  return request({
    url: '/search/multimatch',
    method: 'GET',
    params,
  })
}
// 搜索
export function reqSearchByType(params: TypeSearchparams): Promise<AxiosResponse> {
  return request({
    url: '/search',
    method: 'GET',
    params,
  })
}
