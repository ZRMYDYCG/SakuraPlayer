<script setup lang="ts">
import { Toast } from 'vant'
import { ref } from 'vue'
import { reqRecentDj } from '@/api/modules/recent'
import DjItem from './djItem.vue'

interface ListData {
  // eslint-disable-next-line
    data: any
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
  reqRecentDj({ limit: 300 })
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
    <DjItem v-for="item in list" :key="item.resourceId" :dj-data="item.data" :play-time="item.playTime" />
    <van-empty v-if="list.length == 0" />
  </div>
</template>

<style scoped lang="less">
.list {
    padding: 30px;
}
</style>
