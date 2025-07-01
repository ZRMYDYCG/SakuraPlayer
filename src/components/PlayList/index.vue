<script setup lang="ts">
import { storeToRefs } from 'pinia'
import SongItem from '@/components/songItem/index.vue'
import { usePlayerStore } from '@/store'

const playerStore = usePlayerStore()
const { playList } = storeToRefs(playerStore)
</script>

<template>
  <div class="playList">
    <SongItem v-for="item in playList" :key="item.id" :song-data="item" :showdel="false" />
  </div>
</template>

<style scoped lang="less">
.playList {
    width: 80vw;
    height: 800px;
    padding: 20px;
}
</style>
