<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
-->
<template>
    <div class="min-play-out" :class="{ padding_out: currentSong.id }">
        <slot></slot>
        <div class="mini_player" :class="{ hide_player: !currentSong.id }">
            <MiniPlayer />
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/store'
import MiniPlayer from '@/components/MiniPlayer/index.vue'
const playerStore = usePlayerStore()
const { currentSong } = storeToRefs(playerStore)
</script>

<style scoped>
.min-play-out {
    height: 100vh;
    box-sizing: border-box;
    background-color: var(--my-back-color-white);
}
.padding_out {
    padding-bottom: 110px;
}
.mini_player {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: all 0.4s ease;
    z-index: 10;
    /* 这个属性是为了适配 iOS 11 之前的版本。在这些版本中，constant() 函数用于获取安全区域的底部插入值。 */
    padding-bottom: constant(safe-area-inset-bottom);
    /* 这个属性是用于现代设备（尤其是支持安全区域的设备，如 iPhone X 及更新版本）来处理界面安全区域的 */
    padding-bottom: env(safe-area-inset-bottom);
    background: var(--my-back-color-white);
}
.hide_player {
    bottom: -200px;
}
</style>
