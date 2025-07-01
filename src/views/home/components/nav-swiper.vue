<script lang="ts" setup>
import { defineExpose, ref } from 'vue'
import { reqBanner } from '@/api/modules/home'

interface ImgList {
  typeTitle: string
  pic: string
  bannerId: number
}

const imgList = ref<ImgList[]>([])

function getBanner() {
  reqBanner().then((res) => {
    imgList.value = res.data.banners
  })
}

defineExpose({
  getBanner,
})

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
    :deep(.van-swipe__indicators) {
        bottom: 25px;
    }
}
.my-swipe {
    .swiper_img {
        width: 100%;
        height: 280px;
        border-radius: 15px;
    }
}
</style>
