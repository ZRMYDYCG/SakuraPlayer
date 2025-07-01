<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<script lang="ts" setup>
import { ref } from 'vue'
import { reqDjBanner } from '@/api/modules/dj'

interface ImgList {
  typeTitle: string
  pic: string
  bannerId: number
}
const imgList = ref<ImgList[]>([])
function getBanner() {
  reqDjBanner().then((res) => {
    imgList.value = res.data.data
  })
}
getBanner()
</script>

<template>
  <div class="swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in imgList" :key="item.bannerId">
        <img :src="item.pic" :alt="item.typeTitle" class="swiper_img">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped lang="less">
.swiper {
    background-image: var(--my-linear-back);
    padding: 20px;
}
.my-swipe {
    .swiper_img {
        width: 100%;
        height: 260px;
        border-radius: 15px;
    }
}
</style>
