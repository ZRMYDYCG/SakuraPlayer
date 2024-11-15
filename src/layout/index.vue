<template>
    <div class="layout">
        <van-swipe-cell @open="open" @close="close" ref="swiperCell" stop-propagation>
            <template #left>
                <side-menu />
            </template>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
            <tab-bar />
            <van-overlay :show="show" />
        </van-swipe-cell>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import $bus from '@/utils/eventBus'
import TabBar from './components/tab-bar.vue'
import SideMenu from './components/side-menu.vue'
import type { SwipeCellInstance } from 'vant'

const show = ref<boolean>(false)
const swiperCell = ref<SwipeCellInstance>()
function open(): void {
    show.value = true
}
function close(): void {
    show.value = false
}

// 打开菜单
$bus.on('open_menu', (): void => {
    setTimeout(() => {
        swiperCell.value?.open('left')
    })
})
</script>

<style scoped lang="less">
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    :deep(.van-swipe-cell) {
        height: 100%;

        .van-swipe-cell__wrapper {
            height: 100%;
        }
        .van-swipe-cell__left {
            width: 70vw;
        }
    }
}
</style>
