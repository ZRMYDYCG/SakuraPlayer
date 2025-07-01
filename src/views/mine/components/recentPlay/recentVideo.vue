<script setup lang="ts">
import type { recentVideoInterface } from '@/types/public/video'
import { Toast } from 'vant'
import { ref } from 'vue'
import { reqRecentVideo } from '@/api/modules/recent'
import VideoItem from './videoItem.vue'

interface ListData {
  data: recentVideoInterface
  playTime: number
  resourceId: string
  resourceType: string
}

const list = ref<ListData[]>([])
function getList() {
  const params = {
    limit: 300,
  }
  const reqLoading = Toast.loading({
    duration: 0,
    message: '加载中',
    overlay: true,
  })
  reqRecentVideo(params)
    .then((res) => {
      list.value = res.data.data.list
    })
    .finally(() => {
      reqLoading.clear()
    })
}
getList()
</script>

<template>
  <div class="list">
    <VideoItem
      v-for="item in list"
      :key="item.resourceId"
      :video-data="item.data"
      :play-time="item.playTime"
      :resource-type="item.resourceType"
    />
    <van-empty v-if="list.length == 0" />
  </div>
</template>

<style scoped lang="less">
.list {
    padding: 30px;
}
</style>
