<script setup lang="ts">
import type { RecentVoiceInterface } from '@/types/public/voice'
import { Toast } from 'vant'
import { ref } from 'vue'
import { reqRecentVoice } from '@/api/modules/recent'
import VoiceItem from './voiceItem.vue'

interface ListData {
  data: RecentVoiceInterface
  playTime: number
  resourceId: string
  resourceType: string
}

const list = ref<ListData[]>([])
function getList() {
  const reqLoading = Toast.loading({
    duration: 0,
    message: '加载中',
    overlay: true,
  })
  reqRecentVoice({ limit: 100 })
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
    <VoiceItem v-for="item in list" :key="item.resourceId" :video-data="item.data" />
    <van-empty v-if="list.length == 0" />
  </div>
</template>

<style scoped lang="less">
.list {
    padding: 30px;
}
</style>
