<script setup lang="ts">
import type { DjCategoryRecommend } from '@/types/public/dj'
import { useRouter } from 'vue-router'
import DjItem from '@/components/DjItem/index.vue'
import { BoxType } from '@/types/public'

const props = withDefaults(defineProps<Props>(), {
  list: () => {
    return {
      categoryName: '',
      categoryId: 0,
      radios: [],
    }
  },
  boxType: BoxType.box,
})
const router = useRouter()
interface Props {
  list: DjCategoryRecommend
  boxType: BoxType
}
function getMore() {
  console.log('更多')
  router.push({
    path: '/djCategory',
    query: {
      id: props.list.categoryId,
    },
  })
}
</script>

<template>
  <div class="recomend_item">
    <div class="recomend_top">
      <div class="recomend_title">
        {{ list.categoryName }}
      </div>
      <van-button icon="arrow" round size="mini" icon-position="right" @click="getMore">
        更多
      </van-button>
    </div>
    <div>
      <van-row v-if="boxType == BoxType.box" :gutter="10">
        <van-col v-for="item in list.radios" :key="item.id" span="8">
          <DjItem :dj-data="item" :box-type="boxType" />
        </van-col>
      </van-row>
      <div v-if="boxType == BoxType.line">
        <DjItem v-for="item in list.radios" :key="item.id" :dj-data="item" :box-type="boxType" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.recomend_item {
    padding: 20px;
    background-color: var(--my-back-color-white);
    margin-bottom: 30px;
}
.recomend_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .recomend_title {
        font-size: 30px;
        font-weight: bold;
        color: var(--my-text-color-black);
    }
}
</style>
