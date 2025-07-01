<script lang="ts" setup>
import type { SwipeCellInstance } from 'vant'
import { ref } from 'vue'
import $bus from '@/utils/eventBus'
import SideMenu from './components/side-menu.vue'
import TabBar from './components/tab-bar.vue'

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

<template>
  <div class="layout">
    <van-swipe-cell ref="swiperCell" stop-propagation @open="open" @close="close">
      <template #left>
        <SideMenu />
      </template>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <TabBar />
      <van-overlay :show="show" />
    </van-swipe-cell>
  </div>
</template>

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
