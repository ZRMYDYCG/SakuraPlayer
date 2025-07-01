<script lang="ts" setup>
import type { SongData } from '@/types/store/player'
import { ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { reqSingerSongs } from '@/api/modules/singer'
import SongItem from '@/components/songItem/index.vue'
import { usePlayerStore } from '@/store'
import { onClickLeft } from '@/utils/back'

const route = useRoute()
const playerStore = usePlayerStore()
const list = ref<SongData[]>([])
let offset = -1
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)
const { id } = route.query

// 播放全部
function playAll() {
  playerStore.resetList(toRaw(list.value))
}
//
function onLoad() {
  offset += 1
  getList()
}
// 获取列表
function getList() {
  const params = {
    offset: offset * 30,
    limit: 30,
    id: Number(id),
  }
  loading.value = true
  reqSingerSongs(params)
    .then((res) => {
      list.value = list.value.concat(
        res.data.songs.map((item: SongData) => {
          if (!item.al.picUrl) {
            item.al.picUrl = require('@/assets/images/public/heijiao.png')
          }
          return item
        }),
      )
      finished.value = !res.data.more
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <MiniPlayOut>
    <div class="songs">
      <van-nav-bar
        title="歌曲"
        left-arrow
        fixed
        placeholder
        right-text="播放全部"
        @click-left="onClickLeft"
        @click-right="playAll"
      />

      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <SongItem v-for="item in list" :key="item.id" :song-data="item" />
      </van-list>
    </div>
  </MiniPlayOut>
</template>

<style scoped lang="less">
.songs {
    padding: 30px;
}
</style>
