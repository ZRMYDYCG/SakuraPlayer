<script lang="ts" setup>
import type { SongData } from '@/types/store/player'
import { Toast } from 'vant'
import { ref } from 'vue'
import { reqHistoryRecommend } from '@/api/modules/home'
import SongItem from '@/components/songItem/index.vue'

interface Props {
  date: string
}
const props = withDefaults(defineProps<Props>(), {
  date: '',
})
const emit = defineEmits(['refresh'])

const songList = ref<SongData[]>([])

function getList() {
  const loading = Toast.loading({
    duration: 0,
    message: '加载中...',
  })
  reqHistoryRecommend({ date: props.date })
    .then((res) => {
      songList.value = res.data.data.songs
      emit('refresh')
    })
    .finally(() => {
      loading.clear()
    })
}
getList()
</script>

<template>
  <div class="dateList">
    <SongItem v-for="item in songList" :key="item.id" :song-data="item" />
  </div>
</template>

<style scoped lang="less">
.dateList {
    background-color: var(--my-back-color-white);
    padding: 30px;
}
</style>
