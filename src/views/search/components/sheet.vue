<script setup lang="ts">
import type { SheetListFace } from '@/types/public/sheet'
import { ref } from 'vue'
import { reqSearchByType } from '@/api/modules/search'
import SheetItem from '@/views/mine/components/sheetItem.vue'

interface Props {
  keyword: string
  type: number
}
const props = withDefaults(defineProps<Props>(), {
  keyword: '',
})
const list = ref<Array<SheetListFace>>([])

async function getData() {
  const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
  list.value = songList.data.result.playlists
}

getData()
</script>

<template>
  <div class="single_list box_white_container">
    <SheetItem v-for="item in list" :key="item.id" :sheet-data="item" :hide-edit="true" :show-edit="false" />
  </div>
</template>

<style scoped lang="less">
.single_list {
    background: var(--my-back-color-white);
}
</style>
