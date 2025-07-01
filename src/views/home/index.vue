<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<script lang="ts" setup>
import type NewSong from './components/new-song.vue'
import type RecommendSongList from './components/recommend-song-list.vue'
import { ref } from 'vue'
import Menu from './components/menu.vue'
import NavSwiper from './components/nav-swiper.vue'
import NewMv from './components/new-mv.vue'
import StickyNav from './components/sticky-nav.vue'

const loading = ref<boolean>(false)
const swiper = ref<InstanceType<typeof NavSwiper>>()
const recommendSongList = ref<InstanceType<typeof RecommendSongList>>()
const newSong = ref<InstanceType<typeof NewSong>>()

function onRefresh() {
  swiper.value && swiper.value.getBanner()
  recommendSongList.value && recommendSongList.value.getList()
  newSong.value && newSong.value.getList()
  /* 添加 Loading 效果 */
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <van-pull-refresh v-model="loading" class="home" @refresh="onRefresh">
    <StickyNav />
    <div class="main_content">
      <NavSwiper ref="swiper" />
      <Menu />
      <div class="line" />
      <RecommendSongList ref="recommendSongList" />
      <NewSong ref="newSong" />
      <NewMv />
    </div>
  </van-pull-refresh>
</template>

<style scoped lang="less">
.home {
    overflow-y: scroll;
    height: 100vh;
    padding-bottom: 200px;
    background: var(--my-back-color-gray);
    box-sizing: border-box;
}
.main_content {
    padding: 0 20px 20px 20px;
    .line {
        background: var(--van-gray-3);
        height: 2px;
    }
}
.iconfont {
    font-size: 30px;
}
</style>
