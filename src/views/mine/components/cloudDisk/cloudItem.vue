<script setup lang="ts">
import type { SongData } from '@/types/store/player'
import { Toast } from 'vant'
import { ref, toRaw } from 'vue'
import { reqGetSongUrl } from '@/api/modules/song'
import { reqDelCloudMusic } from '@/api/modules/user'
import { usePlayerStore } from '@/store'

interface Props {
  songData: SongData
  index: number
  songId: number
}
const props = withDefaults(defineProps<Props>(), {
  index: 0,
  songData: () => {
    return {
      url: '',
      name: '',
      id: 0,
      ar: [],
      al: {
        id: 0,
        name: '',
        pic: 0,
        picUrl: '',
        pic_str: '',
      },
      dt: 0,
    }
  },
})
const emit = defineEmits<{
  (e: 'reload'): void
}>()
const show = ref<boolean>(false)
const playerStore = usePlayerStore()
function showShareMenu() {
  show.value = true
}
console.log(props.songData.name)
async function playThis() {
  const data = toRaw(props.songData)
  data.id = toRaw(props.songId)
  const result = await reqGetSongUrl({ id: toRaw(props.songId) })
  data.url = result.data.data[0].url
  playerStore.setCurSong(data)
  show.value = false
}
function handleDel() {
  const params = {
    id: props.songId,
  }
  const loading = Toast.loading({
    message: '上传中...',
    overlay: true,
    duration: 0,
  })
  reqDelCloudMusic(params)
    .then(() => {
      show.value = false
      emit('reload')
      Toast.success('删除成功')
    })
    .finally(() => {
      loading.clear()
    })
}
</script>

<template>
  <div class="cloudItem">
    <div class="left">
      {{ index }}
    </div>
    <div class="center">
      <div class="song-name">
        {{ songData.name }}
      </div>
      <div class="singer">
        {{ songData.al && songData.al.name }}
      </div>
    </div>
    <div class="right">
      <i class="iconfont icon-24gf-play" @click="playThis" />
      <i class="iconfont icon-Androidgengduo" @click="showShareMenu" />
    </div>
  </div>

  <van-popup v-model:show="show" teleport="body" position="bottom" round>
    <div class="content">
      <van-cell-group>
        <van-cell title="播放" is-link @click="playThis">
          <template #right-icon>
            <van-icon name="play-circle-o" />
          </template>
        </van-cell>

        <van-cell title="删除" is-link @click="handleDel">
          <template #right-icon>
            <van-icon name="delete-o" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </van-popup>
</template>

<style scoped lang="less">
.cloudItem {
    width: 100%;
    display: flex;
    overflow: hidden;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 30px;
    .left {
        font-size: 40px;
        margin-right: 30px;
        color: var(--my-text-color-gray);
    }
    .center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        overflow: hidden;
        .song-name {
            font-size: 26px;
            color: var(--my-text-color-black);
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 450px;
            white-space: nowrap;
        }
        .singer {
            color: var(--my-text-color-gray);
            font-size: 24px;
            text-overflow: ellipsis;
            overflow: hidden;
            max-width: 450px;
            white-space: nowrap;
        }
    }
    .right {
        .iconfont {
            color: var(--my-text-color-gray);
            padding-left: 20px;
            font-size: 28px;
        }
    }
}
</style>
