<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<!-- 推荐新歌 -->
<script setup lang="ts">
import type { songData } from '@/types/public'
import { defineExpose, ref, toRaw } from 'vue'
import { reqRecommendNewSongs } from '@/api/modules/home'
import { usePlayerStore } from '@/store'
import NewSongItem from './new-song-item.vue'

const list = ref<Array<Array<songData>>>([])
const songList = ref<Array<songData>>([])
const playerStore = usePlayerStore()
const loading = ref<boolean>(false)

function getList() {
  loading.value = true
  reqRecommendNewSongs({ limit: 12 })
    .then((res) => {
      const { data } = res
      // eslint-disable-next-line
            const tempList: Array<any> = []
      const len = data.result.length
      songList.value = data.result
      for (let i = 0; i < len; i++) {
        const l = Math.floor(i / 2)
        if (!tempList[l]) {
          tempList[l] = []
        }
        tempList[l].push(data.result[i])
      }
      list.value = tempList
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })
}

function playAll() {
  const list = toRaw(songList.value)
  const newlist = list.map((item: songData) => {
    return {
      dt: item.song.duration,
      url: '',
      name: item.song.name,
      id: item.song.id,
      ar: item.song.artists,
      al: item.song.album,
    }
  })
  playerStore.resetList(newlist)
}

getList()

defineExpose({
  getList,
})
</script>

<template>
  <div class="newSong" @touchmove="(e) => e.stopPropagation()">
    <div class="top">
      <div class="recommend_title">
        新歌推荐
      </div>
      <van-button icon="play" round size="medium" @click="playAll">
        播放
      </van-button>
    </div>

    <van-skeleton title :row="10" :loading="loading">
      <van-swipe :show-indicators="false">
        <van-swipe-item v-for="(item, index) in list" :key="index">
          <NewSongItem v-for="data in item" :key="data.id" :song-data="data" />
        </van-swipe-item>
      </van-swipe>
    </van-skeleton>
  </div>
</template>

<style scoped lang="less">
.newSong {
    margin-top: 20px;
    background: var(--van-white);
    padding: 15px;
    .van-button {
        padding-left: 10px;
        padding-right: 10px;
    }
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .recommend_title {
            font-size: 30px;
            font-weight: bold;
            color: var(--my-text-color-black);
        }
    }
}
</style>
