<script setup lang="ts">
import { computed } from 'vue'
import SongItem from '@/components/songItem/index.vue'
import { formatSheet } from '@/utils/song'

interface Props {
  msg: string
}
const props = withDefaults(defineProps<Props>(), {
  msg: '{}',
})
const payload = computed(() => {
  // console.log(JSON.parse(props.msg))
  return JSON.parse(props.msg)
})
const songData = computed(() => {
  return formatSheet(JSON.parse(props.msg).song)
})
</script>

<template>
  <div class="song_msg">
    <div>{{ payload.title }}</div>
    <SongItem :song-data="songData" />
  </div>
</template>

<style scoped lang="less">
.song_msg {
    width: 540px;
    overflow: hidden;
}
</style>
