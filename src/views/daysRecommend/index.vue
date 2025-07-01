<script lang="ts" setup>
import type { SongData } from '@/types/store/player'
import { Toast } from 'vant'
import { nextTick, ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { reqDaysRecommend } from '@/api/modules/home'
import ScrollBanner from '@/components/Scroll/scrollBanner.vue'
import SongItem from '@/components/songItem/index.vue'
import { usePlayerStore } from '@/store'
import { onClickLeft } from '@/utils/back'

const router = useRouter()
const playerStore = usePlayerStore()
const scroll = ref<InstanceType<typeof ScrollBanner>>()
const list = ref<SongData[]>([])
const loading = Toast.loading({
  message: '加载中...',
  duration: 0,
})
reqDaysRecommend()
  .then((res) => {
    list.value = res.data.data.dailySongs
    nextTick(() => {
      scroll.value?.refresh()
    })
  })
  .finally(() => {
    loading.clear()
  })

function onClickRight(): void {
  router.push({
    path: '/daysRecommendHistory',
  })
}
function playAll(): void {
  playerStore.resetList(toRaw(list.value))
}
</script>

<template>
  <MiniPlayOut>
    <div class="daysRecommend">
      <van-nav-bar
        title="每日推荐"
        left-arrow
        fixed
        placeholder
        right-text="历史日推"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <div class="scroll">
        <ScrollBanner ref="scroll">
          <template #btn>
            <div class="btn_wrapper">
              <van-button round color="rgba(0,0,0,0.5)" @click="playAll">
                <i class="iconfont icon-bofang" />
                播放全部
              </van-button>
            </div>
          </template>
          <div class="list">
            <SongItem v-for="item in list" :key="item.id" :song-data="item" />
          </div>
        </ScrollBanner>
      </div>
    </div>
  </MiniPlayOut>
</template>

<style scoped lang="less">
.daysRecommend {
    height: 100%;
    .list {
        padding: 30px;
        background-color: var(--my-back-color-white);
    }
    .scroll {
        height: 100%;
    }
    .btn_wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .iconfont {
            font-size: 30px;
        }
        :deep(.van-button) {
            border: 1px solid #fff;
        }
    }
}
</style>
