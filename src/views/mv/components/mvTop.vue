<script lang="ts" setup>
import type { MvInterface } from '@/types/public/mv'
import { ref } from 'vue'
import { reqMvTop } from '@/api/modules/video'
import MvTopItem from './topMvItem.vue'

interface Props {
  title: string
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
})
const list = ref<MvInterface[]>([])
const loading = ref<boolean>(true)
const finished = ref<boolean>(false)
const limit = 30
let offset = -1
function onLoad() {
  getList()
}
function getList() {
  offset++
  const params = {
    limit,
    offset: offset * limit,
    area: props.title,
  }
  loading.value = true
  reqMvTop(params)
    .then((res) => {
      list.value = list.value.concat(res.data.data)
      finished.value = !res.data.hasMore
    })
    .finally(() => {
      loading.value = false
    })
}
getList()
</script>

<template>
  <div>
    <van-list :loading="loading" :finished="finished" @load="onLoad">
      <MvTopItem v-for="(item, index) in list" :key="item.id" :mv-data="item" :index="index" />
    </van-list>
  </div>
</template>
