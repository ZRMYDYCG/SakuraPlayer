<script setup lang="ts">
import type { SongData } from '@/types/store/player'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { reqPlayModeList, reqSongDetail } from '@/api/modules/song'
import { reqLikeList } from '@/api/modules/user'
import { usePlayerStore, useUserStore } from '@/store'

const router = useRouter()
const playerStore = usePlayerStore()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const total = ref<number>(0)
// const url = () => require('@/assets/images/public/heijiao.png')
const imgUrl = ref<string>()
let list = []
let pid = 0 // 歌单id 心动模式播放需要
let ids: Array<number> = []

function getLikeList() {
  reqLikeList({ uid: userInfo.value.userId, timestamp: Date.now() }).then((res) => {
    total.value = res.data.ids.length
    ids = res.data.ids
    pid = res.data.checkPoint
    getSongDetail(ids.join(','))
  })
}
function getSongDetail(ids: string) {
  reqSongDetail({ ids }).then((res) => {
    list = res.data.songs
    if (list.length) {
      imgUrl.value = list[0].al.picUrl
    }
  })
}
function playBeckoning() {
  reqPlayModeList({ id: ids[0], pid }).then((res) => {
    interface Beck {
      id: number
      songInfo: SongData
    }
    const playList = res.data.data
      .map((item: Beck) => {
        return item.songInfo
      })
      .filter((item: SongData) => item && item.id)
    playerStore.resetList(playList)
  })
}
function goLikeList() {
  router.push('/likeList')
}
getLikeList()
</script>

<template>
  <div class="box_white_container flex_box" @click="goLikeList">
    <div class="left">
      <div class="cover">
        <img :src="imgUrl" alt="">
        <div class="mask flex_box_center_column">
          <i class="iconfont icon-xihuan" />
        </div>
      </div>
      <div class="">
        <div class="title">
          我喜欢的音乐
        </div>
        <div class="total">
          {{ total }}首
        </div>
      </div>
    </div>
    <div class="flex_box_center_column play_btn">
      <van-button round size="small" @click.stop="playBeckoning">
        <i class="iconfont icon-huaban" />
        心动模式
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.flex_box {
    display: flex;
    justify-content: space-between;
    .left {
        display: flex;
        align-items: center;
        .cover {
            width: 100px;
            height: 100px;
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            margin-right: 20px;
            img {
                width: 100%;
                height: 100%;
            }
            .mask {
                position: absolute;
                background: rgba(0, 0, 0, 0.3);
                top: 0;
                left: 0;
                z-index: 1;
                width: 100%;
                height: 100%;
                .iconfont {
                    font-size: 30px;
                    color: var(--my-back-color-white);
                }
            }
        }
        .title {
            font-size: 28px;
            color: var(--my-text-color-black);
        }
        .total {
            font-size: 24px;
            color: var(--my-text-color-gray);
        }
    }
    .play_btn {
        .iconfont {
            font-size: 28px;
            margin-right: 10px;
        }
    }
}
</style>
