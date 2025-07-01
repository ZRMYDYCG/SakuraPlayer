import type { AxiosResponse } from 'axios'
import type { CommentFloorParams, CommentParams, LikeCommentParams, SongCommentParams } from '../interface/comment'
// 评论
import request from '../index'

// 获取歌曲评论
export function reqSongComment(params: SongCommentParams): Promise<AxiosResponse> {
  return request({
    url: '/comment/music',
    method: 'GET',
    params,
  })
}
// 评论点赞
export function reqLikeComment(params: LikeCommentParams): Promise<AxiosResponse> {
  return request({
    url: '/comment/like',
    method: 'GET',
    params,
  })
}
// 获取评论
export function reqCommnet(params: CommentParams): Promise<AxiosResponse> {
  return request({
    url: '/comment/new',
    method: 'GET',
    params,
  })
}
// 获取楼层评论
export function reqCommnetFloor(params: CommentFloorParams): Promise<AxiosResponse> {
  return request({
    url: '/comment/floor',
    method: 'GET',
    params,
  })
}
