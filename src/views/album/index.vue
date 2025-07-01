<script setup lang="ts">
import { onClickLeft } from '@/utils/back'
import Banner from '@/views/home/components/nav-swiper.vue'
import DigitAlbum from './components/digitAlbum.vue'
import NewAlbum from './components/newAlbum.vue'
import SingleDigit from './components/singleDigit.vue'
</script>

<template>
  <MiniPlayOut>
    <div class="sheetSquare">
      <van-nav-bar title="数字专辑" left-arrow fixed placeholder @click-left="onClickLeft" />
      <Banner />
      <NewAlbum />
      <DigitAlbum />
      <SingleDigit />
    </div>
  </MiniPlayOut>
</template>

<style scoped lang="less">
.sheetSquare {
    height: 100%;
    overflow: auto;
    padding: 15px;
    box-sizing: border-box;
}
</style>
