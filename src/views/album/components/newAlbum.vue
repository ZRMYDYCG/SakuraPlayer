<script setup lang="ts">
import type { albumDataInterface } from '@/types/public/album'
import { ref } from 'vue'
import { reqAlbumList } from '@/api/modules/album'
import AlbumItem from './albumItem.vue'

const list = ref<Array<albumDataInterface>>([])
function getAlbumList() {
  reqAlbumList({ limit: 6 }).then((res) => {
    list.value = res.data.products
  })
}
getAlbumList()
</script>

<template>
  <div class="newAlbum">
    <div class="title">
      <div>最新上架</div>
      <div class="flex_box_center_column">
        <van-icon name="arrow" />
      </div>
    </div>
    <van-row>
      <van-col v-for="item in list" :key="item.albumId" :span="8">
        <AlbumItem :album-data="item" />
      </van-col>
    </van-row>
  </div>
</template>

<style scoped lang="less">
.newAlbum {
    margin-bottom: 20px;
    .title {
        padding-left: 15px;
        margin-bottom: 10px;
        font-size: 36px;
        color: var(--my-text-color-black);
        display: flex;
        align-items: center;
        font-weight: bold;
    }
}
</style>
