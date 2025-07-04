<script setup lang="ts">
import type { ComputedRef } from 'vue'
import type { DjprogramData } from '@/types/public/dj'
import type { MusicType, SongData } from '@/types/store/player'
import { storeToRefs } from 'pinia'
import { Toast } from 'vant'
import { computed, nextTick, reactive, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { reqDjDetail, reqDjProgram } from '@/api/modules/dj'
import { reqSheetTracks, reqSubscribeSheet } from '@/api/modules/sheet'
import CommentPopup from '@/components/Comment/commentPopup.vue'
import Scroll from '@/components/Scroll/scrollBanner.vue'
import SongItem from '@/components/songItem/index.vue'
import { usePlayerStore, useUserStore } from '@/store'
import { CommentType } from '@/types/public/comment'
import { formatCountNumber } from '@/utils'
import { onClickLeft } from '@/utils/back'
import { formatSheet } from '@/utils/song'
import SheetInfo from './components/sheetInfo.vue'

const route = useRoute()
const details = reactive({
  creator: {
    userId: 0,
    avatarUrl: '',
    nickname: '',
  },
  tags: [],
  shareCount: 0,
  commentCount: 0,
  subscribedCount: 0,
  description: '',
  nickname: '',
  avatarUrl: '',
  coverImgUrl: '',
  name: '',
  playCount: 0,
  subscribed: false,
})

const list = ref<Array<SongData>>([])
const scrollRef = ref<InstanceType<typeof Scroll>>()
const playerStore = usePlayerStore()
const show = ref<boolean>(false)
const userStore = useUserStore()
const { id } = route.query
const { isLogin, userInfo } = storeToRefs(userStore)
const showdel: ComputedRef<boolean> = computed(() => {
  if (!isLogin.value) {
    return false
  }
  else {
    return details.creator?.userId === userInfo.value.userId
  }
})
// 显示评论
const showComment = ref<boolean>(false)

function getDetail() {
  reqDjDetail({
    rid: Number(id),
  }).then((res) => {
    const data = res.data.data
    details.avatarUrl = data.dj.avatarUrl
    details.creator = data.dj
    details.tags = data.category.split(',')
    details.shareCount = data.shareCount
    details.commentCount = data.commentCount
    details.subscribedCount = data.subCount
    details.description = data.rcmdText
    details.nickname = data.nickname
    details.avatarUrl = data.avatarUrl
    details.coverImgUrl = data.picUrl
    details.name = data.name
    details.playCount = data.playCount
    details.subscribed = data.subed
  })
}

function getSheetSongs() {
  Toast.loading({
    duration: 0,
    message: '加载中...',
    overlay: true,
  })
  reqDjProgram({ rid: Number(id), limit: 1000, offset: 0 })
    .then((res) => {
      list.value = res.data.programs.map((item: DjprogramData) => {
        return formatSheet(item.mainSong, MusicType.dj)
      })
      Toast.clear()
      nextTick(() => {
        setTimeout(() => {
          scrollRef.value && scrollRef.value.refresh()
        }, 100)
      })
    })
    .catch(() => {
      Toast.clear()
    })
}

function PlayAll() {
  playerStore.resetList(toRaw(list.value))
}
// 收藏歌单
function subscribeSheet() {
  if (!isLogin.value) {
    Toast.fail('还没有登录')
    return
  }
  if (showdel.value) {
    Toast.fail('不能收藏自己的歌单')
    return
  }

  reqSubscribeSheet({
    t: details.subscribed ? 2 : 1, // t : 类型,1:收藏,2:取消收藏 id : 歌单 id
    id: Number(id),
  }).then(() => {
    details.subscribed = !details.subscribed
    Toast.success(details.subscribed ? '取消成功' : '收藏成功')
  })
}
// 删除
function del(item: SongData) {
  const loading = Toast.loading({
    duration: 0,
    message: '加载中...',
    overlay: true,
  })
  const params = {
    op: 'del', // 从歌单增加单曲为 add, 删除为 del
    pid: Number(id), // 歌单 id
    tracks: item.id, //  tracks: 歌曲 id,可多个,用逗号隔开
  }
  reqSheetTracks(params)
    .then(() => {
      const index = list.value.findIndex(track => track.id === item.id)
      list.value.splice(index, 1)
      Toast.success('删除成功')
    })
    .finally(() => {
      loading.clear()
    })
}
getDetail()
getSheetSongs()
</script>

<template>
  <div class="songSheetDetail">
    <MiniPlayOut>
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <template #title>
          <van-notice-bar scrollable :text="details.name" />
        </template>
      </van-nav-bar>
      <Scroll ref="scrollRef" :probe-type="3" :img-url="details.coverImgUrl">
        <template #btn>
          <div class="top_content">
            <div class="bg">
              <img :src="details.coverImgUrl" alt="">
            </div>
            <div class="mask" />
            <div class="main">
              <div class="data">
                <div class="left">
                  <div class="play_count">
                    <i class="iconfont icon-bofang" />
                    <div>{{ formatCountNumber(details.playCount) }}</div>
                  </div>
                  <img v-if="details.coverImgUrl" :src="details.coverImgUrl" alt="">
                </div>
                <div class="right">
                  <div class="sheetName text_over_two_lines">
                    {{ details.name }}
                  </div>
                  <!-- 作者 -->
                  <div v-if="details.creator" class="creator">
                    <img class="avatarUrl" :src="details.creator.avatarUrl" alt="">
                    <div class="nickname">
                      {{ details.creator.nickname }}
                    </div>
                  </div>
                  <div class="description" @click="show = true">
                    <div class="text">
                      {{ details.description }}
                    </div>
                    <van-icon name="arrow" />
                  </div>
                </div>
              </div>
              <div class="btn_wrapper">
                <div class="btn_item" @click="subscribeSheet">
                  <div class="flex_box_center_column">
                    <i
                      class="iconfont icon-shoucangjia"
                      :class="{ iconfont_active: details.subscribed }"
                    />
                  </div>
                  <div class="text">
                    {{ details.subscribedCount }}
                  </div>
                </div>
                <div class="btn_item" @click="showComment = true">
                  <div class="flex_box_center_column">
                    <i class="iconfont icon-pinglun" />
                  </div>
                  <div class="text">
                    {{ details.commentCount }}
                  </div>
                </div>
                <div class="btn_item">
                  <div class="flex_box_center_column">
                    <i class="iconfont icon-fenxiang" />
                  </div>
                  <div class="text">
                    {{ details.shareCount }}
                  </div>
                </div>
                <div class="btn_item" @click="PlayAll">
                  <div class="flex_box_center_column">
                    <i class="iconfont icon-bofang" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="list">
          <SongItem
            v-for="item in list"
            :key="item.id"
            :song-data="item"
            :showdel="showdel"
            @del="del(item)"
          />
        </div>
      </Scroll>
    </MiniPlayOut>

    <SheetInfo v-model:show-popup="show" :info="details" />
    <CommentPopup v-model:visible="showComment" :comment-type="CommentType.dj" :source-id="Number(id)" />
  </div>
</template>

<style scoped lang="less">
.songSheetDetail {
    overflow: hidden;

    :deep(.van-notice-bar) {
        background: transparent;
        width: 60vw;
        color: var(--my-text-color-black);
    }

    .list {
        padding: 30px;
    }

    .top_content {
        position: relative;
        width: 100%;
        height: 100%;

        .bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            filter: blur(40px);
            z-index: 1;
        }

        .mask {
            position: absolute;
            z-index: 2;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: var(--my-mask-color);
        }

        .main {
            position: absolute;
            z-index: 3;
            left: 50%;
            top: 50%;
            width: 100%;
            height: fit-content;
            padding: 30px;
            box-sizing: border-box;
            transform: translate(-50%, -50%);

            .data {
                display: flex;

                .left {
                    width: 200px;
                    height: 200px;
                    flex-shrink: 0;
                    background-color: var(--my-back-color-gray);
                    border-radius: 10px;
                    margin-right: 40px;
                    position: relative;

                    .play_count {
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        color: var(--my-text-color-white);
                        font-size: 28px;
                        background: rgba(0, 0, 0, 0.2);
                        padding: 2px 5px;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;

                        .iconfont {
                            margin-right: 5px;
                        }
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                    }
                }

                .right {
                    .sheetName {
                        color: var(--my-text-color-white);
                        font-size: 30px;
                    }

                    .creator {
                        display: flex;
                        margin-top: 20px;
                        align-items: center;

                        .avatarUrl {
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                            overflow: hidden;
                            object-fit: cover;
                            margin-right: 15px;
                        }

                        .nickname {
                            color: var(--my-text-color-gray);
                            font-size: 24px;
                        }
                    }

                    .description {
                        display: flex;
                        align-items: center;
                        color: var(--my-text-color-gray);
                        margin-top: 30px;

                        .text {
                            max-width: 250px;
                            overflow: hidden;
                            font-size: 24px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }

                        :deep(.van-icon) {
                            font-size: 24px;
                            vertical-align: middle;
                            margin-top: 5px;
                        }
                    }
                }
            }

            .btn_wrapper {
                display: flex;
                justify-content: space-evenly;
                width: fit-content;
                margin: auto;
                height: 80px;
                border-radius: 40px;
                min-width: 600px;
                background-color: var(--my-back-color-white);
                box-shadow: 0 0 20px 0 rgba(136, 137, 140, 0.33);
                margin-top: 60px;

                .btn_item {
                    color: var(--my-text-color-black);
                    display: flex;
                    align-items: center;

                    .iconfont {
                        color: var(--my-text-color-black);
                        font-size: 28px;
                    }

                    .iconfont_active {
                        color: var(--my-primary-color);
                    }

                    .text {
                        font-size: 24px;
                        color: var(--my-text-color-black);
                        margin-left: 15px;
                    }
                }
            }
        }
    }
}
</style>
