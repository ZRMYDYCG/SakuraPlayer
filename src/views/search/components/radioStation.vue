<script setup lang="ts">
import type { RadioInterface } from '@/types/public/radio'
import { ref } from 'vue'
import { reqSearchByType } from '@/api/modules/search'
import RadioStationItem from './radioStationItem.vue'

interface Props {
  keyword: string
  type: number
}
const props = withDefaults(defineProps<Props>(), {
  keyword: '',
})
const list = ref<Array<RadioInterface>>([])

async function getData() {
  const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
  list.value = songList.data.result.djRadios
}

getData()
</script>

<template>
  <div class="single_list box_white_container">
    <RadioStationItem v-for="item in list" :key="item.id" :radio-data="item" />
  </div>
</template>

<style scoped lang="less">
.single_list {
    background: var(--my-back-color-white);
}
</style>
