<script setup lang="ts">
import type { singerInterface } from '@/types/public/singer'
import { ref } from 'vue'
import { reqSearchByType } from '@/api/modules/search'
import SingerItem from '@/views/singer/components/singerItem.vue'

interface Props {
  keyword: string
  type: number
}
const props = withDefaults(defineProps<Props>(), {
  keyword: '',
})
const list = ref<Array<singerInterface>>([])

async function getData() {
  const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
  list.value = songList.data.result.artists
}

getData()
</script>

<template>
  <div class="single_list box_white_container">
    <SingerItem v-for="item in list" :key="item.id" :singer-data="item" />
  </div>
</template>

<style scoped lang="less">
.single_list {
    background: var(--my-back-color-white);
}
</style>
