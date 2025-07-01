<script setup lang="ts">
import type { SheetDataFace } from '@/types/public'
import { ref } from 'vue'
import { reqSheetList } from '@/api/modules/song'
import SheetItem from './sheetItem.vue'

interface Props {
  cat: string
}

const props = withDefaults(defineProps<Props>(), {
  cat: '',
})
const reloading = ref<boolean>(false)
const loading = ref<boolean>(false)
const list = ref<SheetDataFace[]>([])
let updateTime = 0
let total = 0
const finished = ref<boolean>(false)

function getList() {
  const data = {
    cat: props.cat,
    before: updateTime,
  }
  loading.value = true
  reqSheetList(data)
    .then((res) => {
      list.value = list.value.concat(res.data.playlists)
      updateTime = res.data.playlists[res.data.playlists.length - 1].updateTime
      total = res.data.total
      if (list.value.length >= total) {
        finished.value = true
      }
      else {
        finished.value = false
      }
    })
    .finally(() => {
      reloading.value = false
      loading.value = false
    })
}

function onRefresh() {
  list.value = []
  reloading.value = true
  finished.value = true
  updateTime = 0
  getList()
}
function onLoad() {
  getList()
}
</script>

<template>
  <van-pull-refresh v-model="reloading" @refresh="onRefresh">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-row>
        <van-col v-for="item in list" :key="item.id" :span="8">
          <SheetItem :sheet-data="item" />
        </van-col>
      </van-row>
    </van-list>
  </van-pull-refresh>
</template>

<style></style>
