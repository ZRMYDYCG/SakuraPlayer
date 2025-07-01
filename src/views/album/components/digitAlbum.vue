<script setup lang="ts">
import type { albumDataInterface } from '@/types/public/album'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'
import { reqDigitAlbum } from '@/api/modules/album'
// import 'swiper/swiper.min.css'
import AlbumItem from './albumItem.vue'

const menuList = ref([
  { name: '日榜', type: 'daily' },
  { name: '周榜', type: 'week' },
  { name: '总榜', type: 'total' },
])
const type = ref<string>('daily')
const list = ref<Array<albumDataInterface>>([])
function tapMenu(typeStr: string): void {
  type.value = typeStr
  getDigitAlbum()
}

function getDigitAlbum() {
  const data = {
    limit: 6,
    type: type.value,
  }
  reqDigitAlbum(data).then((res) => {
    list.value = res.data.products.filter((item: albumDataInterface, index: number): boolean => index < 6)
  })
}
getDigitAlbum()
</script>

<template>
  <div class="digitAlbum">
    <div class="top">
      <div class="title">
        <div>数字专辑</div>
        <div class="flex_box_center_column">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="menu">
        <div
          v-for="item in menuList"
          :key="item.type"
          class="menu_item"
          :class="{ menu_item_active: item.type == type }"
          @click="tapMenu(item.type)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <van-row>
      <van-col v-for="item in list" :key="item.albumId" :span="8">
        <AlbumItem :album-data="item" />
      </van-col>
    </van-row>

    <Swiper
      :slides-per-view="1.2"
      :space-between="20"
      navigation
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
    >
      <SwiperSlide v-for="(item, index) in list" :key="index">
        <!-- <new-song-item :song-data="data" v-for="data in item" :key="data.id" /> -->
        <!-- oinadsfdasf -->
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="less">
.digitAlbum {
    margin-bottom: 20px;
    .top {
        display: flex;
        padding: 0 15px;
        margin-bottom: 10px;
        align-items: center;
        justify-content: space-between;
        .title {
            font-size: 36px;
            color: var(--my-text-color-black);
            display: flex;
            align-items: center;
            font-weight: bold;
        }
        .menu {
            display: flex;
            font-size: 26px;
            .menu_item {
                color: var(--my-text-color-black);
                padding: 0 15px;
                border-right: 1px solid var(--my-text-color-gray);
                &:last-child {
                    border: none;
                }
            }
            .menu_item_active {
                color: var(--my-primary-color);
            }
        }
    }
}
</style>
