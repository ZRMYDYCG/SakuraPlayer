import type { AxiosResponse } from 'axios'
import type {
  CloudDiskParams,
  DelCloudMusicParams,
  EmaiLoginParams,
  FollowParams,
  LikeParams,
  PhoneLoginParams,
  SendCodeParams,
  UidParams,
  UserFollow,
  UserPlayList,
} from '../interface/user'
import request from '../index'
// 发送手机验证码
export function reqSendCode(params: SendCodeParams): Promise<AxiosResponse> {
  return request({
    url: '/captcha/sent',
    method: 'GET',
    params,
  })
}
// 手机号登录
export function reqLoginByPhone(params: PhoneLoginParams): Promise<AxiosResponse> {
  return request({
    url: '/login/cellphone',
    method: 'GET',
    params,
  })
}
// 获取用户信息
export function reqGetUserInfo(): Promise<AxiosResponse> {
  return request({
    url: '/user/account',
    method: 'GET',
  })
}
// 退出登录
export function reqLogout(): Promise<AxiosResponse> {
  return request({
    url: '/logout',
    method: 'GET',
  })
}
// 邮箱登录
export function reqLoginByEmail(params: EmaiLoginParams): Promise<AxiosResponse> {
  return request({
    url: '/login',
    method: 'GET',
    params,
  })
}
// 私人FM
export function reqPersonalFm(): Promise<AxiosResponse> {
  return request({
    url: '/personal_fm',
    method: 'GET',
  })
}
// 获取用户歌单
export function reqUserPlayList(params: UserPlayList): Promise<AxiosResponse> {
  return request({
    url: '/user/playlist',
    method: 'GET',
    params,
  })
}
// 获取用户关注用户列表
export function reqUserFollows(params: UserFollow): Promise<AxiosResponse> {
  return request({
    url: '/user/follows',
    method: 'GET',
    params,
  })
}
// 获取用户粉丝列表
export function reqUserFans(params: UserFollow): Promise<AxiosResponse> {
  return request({
    url: '/user/followeds',
    method: 'GET',
    params,
  })
}
// 获取用户详情
export function reqUserDetail(params: UidParams): Promise<AxiosResponse> {
  return request({
    url: '/user/detail',
    method: 'GET',
    params,
  })
}
// 获取我喜欢的音乐
export function reqLikeList(params: UidParams): Promise<AxiosResponse> {
  return request({
    url: '/likelist',
    method: 'GET',
    params,
  })
}
// 喜欢音乐
export function reqLike(params: LikeParams): Promise<AxiosResponse> {
  return request({
    url: '/like',
    method: 'GET',
    params,
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量 /user/subcount
export function reqUserSubCount(): Promise<AxiosResponse> {
  return request({
    url: '/user/subcount',
    method: 'GET',
  })
}
// 用户云盘音乐
export function reqCloudMusic(params: CloudDiskParams): Promise<AxiosResponse> {
  return request({
    url: '/user/cloud',
    method: 'GET',
    params,
  })
}
// 云盘上传音乐
export function reqUpCloudMusic(data: FormData): Promise<AxiosResponse> {
  return request({
    url: '/cloud',
    method: 'POST',
    data,
  })
}
// 云盘歌曲删除
export function reqDelCloudMusic(params: DelCloudMusicParams): Promise<AxiosResponse> {
  return request({
    url: '/user/cloud/del',
    method: 'GET',
    params,
  })
}
// 关注/取消关注用户
export function reqFollow(params: FollowParams): Promise<AxiosResponse> {
  return request({
    url: '/follow',
    method: 'GET',
    params,
  })
}
