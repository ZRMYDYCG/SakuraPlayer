<script lang="ts" setup>
import type { DjCategoryRecommend } from '@/types/public/dj'
import { ref } from 'vue'
import { reqCategoryRecommend } from '@/api/modules/dj'
import { BoxType } from '@/types/public'
import RecommendItem from './recommendItem.vue'

const recommendList = ref<DjCategoryRecommend[]>([])
const loading = ref<boolean>(false)
function getRecommend() {
  loading.value = true
  reqCategoryRecommend()
    .then((res) => {
      recommendList.value = res.data.data
    })
    .finally(() => {
      loading.value = false
    })
}

getRecommend()
</script>

<template>
  <div class="">
    <van-skeleton title :row="3" :loading="loading">
      <RecommendItem
        v-for="item in recommendList"
        :key="item.categoryId"
        :list="item"
        :box-type="Math.random() > 0.5 ? BoxType.box : BoxType.line"
      />
    </van-skeleton>
  </div>
</template>

<style></style>
