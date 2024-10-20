<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
-->
<template>
    <van-pull-refresh class="home" v-model="loading" @refresh="onRefresh">
        <sticky-nav />
        <div class="main_content">
            <Swiper ref="swiper" />
            <Menu />
            <div class="line"></div>
            <RecommendSongList ref="recommendSongList" />
            <NewSong ref="newSong" />
            <NewMvVue />
        </div>
    </van-pull-refresh>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Swiper from './components/swiper.vue'
import Menu from './components/menu.vue'
import StickyNav from './components/sticky-nav.vue'
import RecommendSongList from './components/recommendSongList.vue'
import NewSong from './components/newSong.vue'
import NewMvVue from './components/newMv.vue'

const loading = ref<boolean>(false)
const swiper = ref<InstanceType<typeof Swiper>>()
const recommendSongList = ref<InstanceType<typeof RecommendSongList>>()
const newSong = ref<InstanceType<typeof NewSong>>()

function onRefresh() {
    swiper.value && swiper.value.getBanner()
    recommendSongList.value && recommendSongList.value.getList()
    newSong.value && newSong.value.getList()
    setTimeout(() => {
        loading.value = false
    }, 2000)
}
</script>

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
