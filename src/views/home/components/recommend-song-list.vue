<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<script setup lang="ts">
import type { songListFace } from '@/types/public'
import { defineExpose, ref } from 'vue'
import { useRouter } from 'vue-router'
import { reqRecommendList } from '@/api/modules/home'
import SongListItem from '@/components/songListItem/index.vue'

const router = useRouter()
const songsList = ref<songListFace[]>([])
const loading = ref<boolean>(false)

function getList() {
  loading.value = true
  reqRecommendList({ limit: 10 })
    .then((res) => {
      songsList.value = res.data.result
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false
      }, 1000)
    })
}
function scroll(e: Event): void {
  e.stopPropagation()
}
function goSheets() {
  router.push('/sheetSquare')
}

defineExpose({
  getList,
})

getList()
</script>

<template>
  <div class="recommend">
    <div class="recommend_top">
      <div class="recommend_title">
        推荐歌单
      </div>
      <van-button icon="arrow" round size="medium" icon-position="right" @click="goSheets">
        更多
      </van-button>
    </div>
    <van-skeleton title :row="3" :loading="loading">
      <div ref="scrollRef" class="scroll_wrapper" @touchmove="scroll">
        <div class="list">
          <SongListItem v-for="item in songsList" :key="item.id" :song-list-data="item" />
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<style scoped lang="less">
.recommend {
    background-color: var(--van-white);
    padding: 20px;
    box-sizing: border-box;
    border-radius: 0 15px 15px 0;
    .van-button {
        padding-left: 10px;
        padding-right: 10px;
    }
    .recommend_top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .recommend_title {
            font-size: 30px;
            font-weight: bold;
            color: var(--my-text-color-black);
        }
    }
    .scroll_wrapper {
        width: 100%;
        overflow-x: scroll;
        &::-webkit-scrollbar {
            //滚动条的高度
            height: 0px;
        }
        .list {
            display: flex;
        }
    }
}
</style>
