<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<script setup lang="ts">
import type { MvInterface } from '@/types/public/mv'
import { ref } from 'vue'
import { reqSearchByType } from '@/api/modules/search'
import MvItem from './mvItem.vue'

interface Props {
  keyword: string
  type: number
}
const props = withDefaults(defineProps<Props>(), {
  keyword: '',
})
const list = ref<Array<MvInterface>>([])

async function getData() {
  const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
  list.value = songList.data.result.mvs
}

getData()
</script>

<template>
  <div class="single_list box_white_container">
    <MvItem v-for="item in list" :key="item.id" :mv-data="item" />
  </div>
</template>

<style scoped lang="less">
.single_list {
    background: var(--my-back-color-white);
}
</style>
