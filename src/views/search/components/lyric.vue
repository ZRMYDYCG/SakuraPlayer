<script setup lang="ts">
import type { LyricInterface } from '@/types/public/comprehensive'
import { ref } from 'vue'
import { reqSearchByType } from '@/api/modules/search'
import LyricItem from './lyricItem.vue'

interface Props {
  keyword: string
  type: number
}
const props = withDefaults(defineProps<Props>(), {
  keyword: '',
})
const list = ref<Array<LyricInterface>>([])

async function getData() {
  const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
  list.value = songList.data.result.songs
}

getData()
</script>

<template>
  <div class="single_list box_white_container">
    <LyricItem v-for="item in list" :key="item.id" :lyric-data="item" :keyword="keyword" />
  </div>
</template>

<style scoped lang="less">
.single_list {
    background: var(--my-back-color-white);
}
</style>
