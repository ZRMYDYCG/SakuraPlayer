<script setup lang="ts">
import type { SheetDataInterface } from '@/types/public/sheet'
import type { arData, SongData } from '@/types/store/player'
import { storeToRefs } from 'pinia'
import { Toast } from 'vant'
import { computed, ref, toRaw } from 'vue'
import { reqSheetTracks } from '@/api/modules/sheet'
import MySheetList from '@/components/mySheetList/index.vue'
import { usePlayerStore } from '@/store'
import SongMenu from './songMenu.vue'

const props = withDefaults(defineProps<Props>(), {
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
  showdel: false,
})
const emit = defineEmits<{
  (e: 'del'): void
}>()
const playerStore = usePlayerStore()
interface Props {
  // eslint-disable-next-line
    songData: SongData
  showdel?: boolean
}
const { currentSong } = storeToRefs(playerStore)
const singer = computed(() => {
  if (props.songData?.ar) {
    return props.songData.ar.map((item: arData) => item.name).join('/')
  }
  return ''
})
const show = ref<boolean>(false)
const showSheet = ref<boolean>(false)

function showShareMenu() {
  show.value = true
}
function playThis() {
  playerStore.setCurSong(toRaw(props.songData))
}
function addToSheet() {
  show.value = false
  showSheet.value = true
}
// 添加歌曲到歌单
function selectSheet(item: SheetDataInterface) {
  const loading = Toast.loading({
    duration: 0,
    message: '加载中...',
    overlay: true,
  })
  const params = {
    op: 'add', // 从歌单增加单曲为 add, 删除为 del
    pid: item.id, // 歌单 id
    tracks: props.songData.id, //  tracks: 歌曲 id,可多个,用逗号隔开
  }
  reqSheetTracks(params)
    .then(() => {
      showSheet.value = false
      Toast.success('添加成功')
    })
    .finally(() => {
      loading.clear()
    })
}
// 删除歌曲
function del() {
  emit('del')
}
</script>

<template>
  <div class="song-item">
    <div class="left">
      <img
        v-lazy="`${songData.al.picUrl}?param=140y140`"
        class="left_al_img"
        :src="`${songData.al.picUrl}?param=140y140`"
        alt=""
      >
    </div>
    <div class="center">
      <div class="song-name">
        {{ songData.name }}
      </div>
      <div class="singer">
        {{ singer }}
      </div>
    </div>
    <div class="right">
      <img
        v-if="currentSong.id === songData.id"
        class="active_img"
        src="@/assets/images/public/active.gif"
        alt=""
      >
      <i v-else class="iconfont icon-24gf-play" @click="playThis" />
      <i class="iconfont icon-Androidgengduo" @click="showShareMenu" />
    </div>
  </div>

  <SongMenu
    v-if="show"
    v-model:show="show"
    :song-data="songData"
    :showdel="showdel"
    :music-type="songData.type"
    @play="playThis"
    @add-to-sheet="addToSheet"
    @del="del"
  />
  <MySheetList v-if="showSheet" v-model:show="showSheet" @select="selectSheet" />
</template>

<style scoped lang="less">
.song-item {
    display: flex;
    border-bottom: 1px solid var(--van-cell-border-color);
    overflow: hidden;
    width: 100%;
    .left {
        box-sizing: border-box;
        margin-right: 10px;
        .left_al_img {
            width: 80px;
            height: 80px;
            border-radius: 20px;
            padding: 10px;
        }
    }
    .center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        overflow: hidden;
        box-sizing: border-box;
        flex-shrink: 1;
        min-width: 0;
        .song-name {
            font-size: 26px;
            color: var(--my-text-color-black);
            text-overflow: ellipsis;
            overflow: hidden;
            // max-width: 450px;
            white-space: nowrap;
        }
        .singer {
            color: var(--my-text-color-gray);
            font-size: 24px;
            text-overflow: ellipsis;
            overflow: hidden;
            // max-width: 450px;
            white-space: nowrap;
            box-sizing: border-box;
        }
    }
    .right {
        flex-shrink: 0;
        .active_img {
            width: 30px;
        }
        .iconfont {
            color: var(--my-text-color-gray);
            padding-left: 20px;
            font-size: 28px;
        }
    }
}
</style>
