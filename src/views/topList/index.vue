<!-- 排行榜 -->
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { reqTopList } from '@/api/modules/toplist'
import { onClickLeft } from '@/utils/back'
import TopItem from './components/topItem.vue'

const active: Ref<number> = ref(0)
interface Tag {
  name: string
  id: number
  coverImgUrl: string
}
const tags = ref<Tag[]>([])
function getTopList() {
  reqTopList().then((res) => {
    tags.value = res.data.list
  })
}

getTopList()
</script>

<template>
  <MiniPlayOut>
    <div class="sheetSquare">
      <van-nav-bar title="排行榜" left-arrow fixed placeholder @click-left="onClickLeft" />
      <van-tabs v-model:active="active" sticky offset-top="1.22667rem" scrollspy>
        <van-tab v-for="item in tags" :key="item.id" :title="item.name">
          <TopItem :top-data="item" />
        </van-tab>
      </van-tabs>
    </div>
  </MiniPlayOut>
</template>

<style scoped lang="less">
.nav-right {
    padding: 0 20px;
    box-shadow: 0 0 20px 0 rgba(136, 137, 140, 0.33);
    .iconfont {
        font-size: 30px;
        color: var(--my-text-color-black);
    }
}
.sheetSquare {
    height: 100%;
    overflow: auto;
}
</style>
