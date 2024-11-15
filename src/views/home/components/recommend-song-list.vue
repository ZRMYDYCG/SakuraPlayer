<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
-->
<template>
    <div class="recommend">
        <div class="recommend_top">
            <div class="recommend_title">推荐歌单</div>
            <van-button icon="arrow" round size="mini" icon-position="right" @click="goSheets">更多</van-button>
        </div>
        <van-skeleton title :row="3" :loading="loading">
            <div class="scroll_wrapper" ref="scrollRef" @touchmove="scroll">
                <div class="list">
                    <SongListItem v-for="item in songsList" :key="item.id" :songListData="item" />
                </div>
            </div>
        </van-skeleton>
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { useRouter } from 'vue-router'
import type { songListFace } from '@/types/public'
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
            loading.value = false
        })
}
function scroll(e: Event): void {
    e.stopPropagation()
}
function goSheets() {
    router.push('/sheetSquare')
}

defineExpose({
    getList
})

getList()
</script>

<style scoped lang="less">
.recommend {
    background-color: var(--van-white);
    padding: 20px;
    box-sizing: border-box;
    border-radius: 0 15px 15px 0;
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
