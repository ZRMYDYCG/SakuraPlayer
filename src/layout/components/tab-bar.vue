<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import MiniPlayer from '@/components/MiniPlayer/index.vue'
import { menuList } from '@/config'
import { usePlayerStore } from '@/store'

const palyerStore = usePlayerStore()
const { showBigPlayer, currentSong } = storeToRefs(palyerStore)
</script>

<template>
  <div class="tabbar" :class="{ hide_tabbar: showBigPlayer }">
    <MiniPlayer v-if="currentSong.url" />
    <van-tabbar route :fixed="false" :border="false" active-color="#e20001">
      <van-tabbar-item v-for="item in menuList" :key="item.icon" replace :to="item.url">
        <span>{{ item.name }}</span>
        <template #icon>
          <i class="iconfont" :class="item.icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    box-shadow: -2px 0 20px 0 rgb(0 0 0 / 20%);
    background: #fff;
    z-index: 1;
    transition: all 0.4s ease;
}
.hide_tabbar {
    bottom: -200px;
}
.iconfont {
    font-size: 30px;
    font-weight: 600;
}
</style>
