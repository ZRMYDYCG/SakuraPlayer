<script setup lang="ts">
import type { singerAlbumInterface } from '@/types/public/singer'
import { useRouter } from 'vue-router'

const props = withDefaults(defineProps<Props>(), {
  albumData: () => {
    return {
      name: '',
      picUrl: '',
      artist: [],
      id: 0,
    }
  },
})
const router = useRouter()
interface Props {
  albumData: singerAlbumInterface
}
function tapAlbum() {
  router.push({
    path: '/albumDetail',
    query: {
      id: props.albumData.id,
    },
  })
}
</script>

<template>
  <div class="album_item">
    <div class="cover" @click="tapAlbum">
      <img :src="`${albumData.picUrl}?param=140y140`" alt="">
    </div>
    <div class="albumName">
      {{ albumData.name }}
    </div>
    <div class="artistName">
      {{ albumData.artist.name }}
    </div>
  </div>
</template>

<style scoped lang="less">
.album_item {
    padding: 15px;
    box-sizing: border-box;
    width: 100%;
    .cover {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        background: var(--my-back-color-gray);
        position: relative;
        border-radius: 10px;
        img {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 10px;
        }
    }
    .albumName {
        font-size: 30px;
        color: var(--my-text-color-black);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 10px;
    }
    .artistName {
        font-size: 28px;
        color: var(--my-text-color-gray);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>
