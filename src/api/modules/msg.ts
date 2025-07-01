import type { AxiosResponse } from 'axios'
import type { MsgParams, PrivateHistoryParams, SendSheetParams, SendSongParams, SendTextParams } from '../interface/msg'
// 私信
import request from '../index'
// 获取私信
export function reqMsgList(params: MsgParams): Promise<AxiosResponse> {
  return request({
    url: '/msg/private',
    method: 'GET',
    params,
  })
}
// 私信内容
export function reqPrivateHistory(params: PrivateHistoryParams): Promise<AxiosResponse> {
  return request({
    url: '/msg/private/history',
    method: 'GET',
    params,
  })
}
// 最近联系人
export function reqRecentcontact(): Promise<AxiosResponse> {
  return request({
    url: '/msg/recentcontact',
    method: 'GET',
  })
}
// 发送私信
export function reqSendText(params: SendTextParams): Promise<AxiosResponse> {
  return request({
    url: '/send/text',
    method: 'GET',
    params,
  })
}
// 发送私信-歌曲
export function reqSendSong(params: SendSongParams): Promise<AxiosResponse> {
  return request({
    url: '/send/song',
    method: 'GET',
    params,
  })
}
// 发送私信-歌单
export function reqSendSheet(params: SendSheetParams): Promise<AxiosResponse> {
  return request({
    url: '/send/playlist',
    method: 'GET',
    params,
  })
}
