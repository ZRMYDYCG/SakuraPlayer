<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<script lang="ts" setup>
import type { SongData } from '@/types/store/player'
import { storeToRefs } from 'pinia'
import { Toast } from 'vant'
import { nextTick, ref, toRaw } from 'vue'
import { reqSongDetail } from '@/api/modules/song'
import { reqLikeList } from '@/api/modules/user'
import ScrollBanner from '@/components/Scroll/scrollBanner.vue'
import SongItem from '@/components/songItem/index.vue'
import { usePlayerStore, useUserStore } from '@/store'
import { onClickLeft } from '@/utils/back'

const userStore = useUserStore()
const playerStore = usePlayerStore()
const scroll = ref<InstanceType<typeof ScrollBanner>>()

const list = ref<SongData[]>([])
const imgUrl = ref<string>('')
const loading = Toast.loading({
  message: '加载中...',
  duration: 0,
})
const { userInfo } = storeToRefs(userStore)

function playAll(): void {
  playerStore.resetList(toRaw(list.value))
}

function getLikeList() {
  reqLikeList({ uid: userInfo.value.userId, timestamp: Date.now() }).then((res) => {
    getSongDetail(res.data.ids.join(','))
  })
}
function getSongDetail(ids: string) {
  reqSongDetail({ ids }).then((res) => {
    list.value = res.data.songs
    if (list.value.length) {
      imgUrl.value = list.value[0].al.picUrl
    }
    nextTick(() => {
      scroll.value?.refresh()
    })
    loading.clear()
  })
}
getLikeList()
</script>

<template>
  <MiniPlayOut>
    <div class="daysRecommend">
      <van-nav-bar title="我喜欢的音乐" left-arrow fixed placeholder @click-left="onClickLeft" />
      <div class="scroll">
        <ScrollBanner ref="scroll">
          <template #btn>
            <div class="btn_wrapper">
              <van-button round color="rgba(0,0,0,0.5)" @click="playAll">
                <i class="iconfont icon-bofang" />
                播放全部
              </van-button>
            </div>
          </template>
          <div class="list">
            <SongItem v-for="item in list" :key="item.id" :song-data="item" />
          </div>
        </ScrollBanner>
      </div>
    </div>
  </MiniPlayOut>
</template>

<style scoped lang="less">
.daysRecommend {
    height: 100%;
    .list {
        padding: 30px;
        background-color: var(--my-back-color-white);
    }
    .scroll {
        height: 100%;
    }
    .btn_wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .iconfont {
            font-size: 30px;
        }
        :deep(.van-button) {
            border: 1px solid #fff;
        }
    }
}
</style>
