<script lang="ts" setup>
import type { CategoryInterface } from '@/types/public/dj'
import { ref } from 'vue'
import { reqDjCatList, reqRecommendType } from '@/api/modules/dj'
import { onClickLeft } from '@/utils/back'
import DjList from './components/djCategory/djList.vue'

const categoryList = ref<CategoryInterface[]>([])
// 获取分类
function getCatList() {
  reqDjCatList().then((res) => {
    categoryList.value = res.data.categories
  })
  reqRecommendType({ type: 2 })
}

getCatList()
</script>

<template>
  <MiniPlayOut>
    <van-nav-bar title="全部分类" left-arrow fixed placeholder @click-left="onClickLeft" />
    <van-tabs offset-top="1.22667rem" sticky>
      <van-tab v-for="item in categoryList" :key="item.id" :title="item.name">
        <DjList :cate-id="item.id" />
      </van-tab>
    </van-tabs>
  </MiniPlayOut>
</template>

<style scoped lang="less"></style>
