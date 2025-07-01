import type { AxiosResponse } from 'axios'
import type {
  DjDetailParams,
  DjHotByTypeParams,
  DjprogramParams,
  DjSubParams,
  RecommendParams,
  RecommendTypeParams,
  TopListParams,
  TopPopularParams,
} from '../interface/dj'
import request from '../index'
// 推荐电台 /personalized/djprogram
export function reqSuggestDjprogram(): Promise<AxiosResponse> {
  return request({
    url: '/personalized/djprogram',
    method: 'GET',
  })
}
// 获取电台banner
export function reqDjBanner(): Promise<AxiosResponse> {
  return request({
    url: '/dj/banner',
    method: 'GET',
  })
}
// 电台个性推荐
export function reqDjPersonalizeRecommend(params: RecommendParams): Promise<AxiosResponse> {
  return request({
    url: '/dj/personalize/recommend',
    method: 'GET',
    params,
  })
}
// 电台分类
export function reqDjCatList(): Promise<AxiosResponse> {
  return request({
    url: '/dj/catelist',
    method: 'GET',
  })
}
// 分类推荐
export function reqRecommendType(params: RecommendTypeParams): Promise<AxiosResponse> {
  return request({
    url: '/dj/recommend/type',
    method: 'GET',
    params,
  })
}
// 类别热门电台 /dj/radio/hot
export function reqDjHotByType(params: DjHotByTypeParams): Promise<AxiosResponse> {
  return request({
    url: '/dj/radio/hot',
    method: 'GET',
    params,
  })
}
// 获取电台推荐类型 /dj/category/recommend
export function reqCategoryRecommend(): Promise<AxiosResponse> {
  return request({
    url: '/dj/category/recommend',
    method: 'GET',
  })
}
// 电台今日优选
export function reqTodayPerfered(): Promise<AxiosResponse> {
  return request({
    url: '/dj/today/perfered',
    method: 'GET',
  })
}
// 电台热门榜
export function reqTopList(params?: TopListParams): Promise<AxiosResponse> {
  return request({
    url: '/dj/toplist',
    method: 'GET',
    params,
  })
}
// 主播排行
export function reqTopPopular(params: TopPopularParams): Promise<AxiosResponse> {
  return request({
    url: '/dj/toplist/popular',
    method: 'GET',
    params,
  })
}
// 获取电台详情
export function reqDjDetail(params: DjDetailParams): Promise<AxiosResponse> {
  return request({
    url: '/dj/detail',
    method: 'GET',
    params,
  })
}
// 获取电台节目/dj/program
export function reqDjProgram(params: DjprogramParams): Promise<AxiosResponse> {
  return request({
    url: '/dj/program',
    method: 'GET',
    params,
  })
}
// 订阅电台
export function reqSubDj(params: DjSubParams): Promise<AxiosResponse> {
  return request({
    url: '/dj/sub',
    method: 'GET',
    params,
  })
}
