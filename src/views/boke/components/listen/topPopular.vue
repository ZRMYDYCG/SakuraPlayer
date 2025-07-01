<script setup lang="ts">
import type { PopularData } from '@/types/public/dj'
import { ref } from 'vue'
import { reqTopPopular } from '@/api/modules/dj'
import popularItemVue from './popularItem.vue'

const list = ref<PopularData[]>([])
function getList() {
  reqTopPopular({ limit: 30 }).then((res) => {
    list.value = res.data.data.list
  })
}
getList()
</script>

<template>
  <div class="list">
    <van-row :gutter="10">
      <van-col v-for="item in list" :key="item.id" :span="8">
        <popularItemVue :popular-data="item" />
      </van-col>
    </van-row>
  </div>
</template>

<style scoped lang="less">
.list {
    padding: 30px;
}
</style>
