<script setup lang="ts">
import type { DjData } from '@/types/public/dj'
import { ref } from 'vue'
import { reqTopList } from '@/api/modules/dj'
import DjItem from '@/components/DjItem/index.vue'
import { BoxType } from '@/types/public'

const list = ref<DjData[]>([])
function getList() {
  reqTopList().then((res) => {
    list.value = list.value.concat(res.data.toplist)
  })
}
getList()
</script>

<template>
  <div class="list">
    <van-row gutter="10">
      <van-col v-for="item in list" :key="item.id" :span="8">
        <DjItem :dj-data="item" :box-type="BoxType.box" />
      </van-col>
    </van-row>
  </div>
</template>

<style scoped lang="less">
.list {
    padding: 30px;
}
</style>
