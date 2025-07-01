<script setup lang="ts">
import type { RecentSheet } from '@/types/public/sheet'
import { Toast } from 'vant'
import { ref } from 'vue'
import { reqRecentSheet } from '@/api/modules/recent'
import SheetItem from './sheetItem.vue'

interface ListData {
  data: RecentSheet
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
  reqRecentSheet({ limit: 300 })
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
    <SheetItem v-for="item in list" :key="item.resourceId" :sheet-data="item.data" :play-time="item.playTime" />
    <van-empty v-if="list.length == 0" />
  </div>
</template>

<style scoped lang="less">
.list {
    padding: 30px;
}
</style>
