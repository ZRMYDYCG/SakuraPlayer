<script setup lang="ts">
import type { SheetDataInterface } from '@/types/public/sheet'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { reqUserPlayList, reqUserSubCount } from '@/api/modules/user'
import { useUserStore } from '@/store'
import SheetItem from './sheetItem.vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const list = ref<Array<SheetDataInterface>>([])
const limit = 30
let offset = 0
const total = ref<number>(0)
const loading = ref<boolean>(true)
const finished = ref<boolean>(false)
function getList() {
  const params = {
    uid: userInfo.value.userId,
    limit,
    offset: limit * offset,
    time: Date.now(),
  }
  loading.value = true
  reqUserPlayList(params)
    .then((res) => {
      list.value = list.value.concat(
        res.data.playlist.filter((item: SheetDataInterface) => item.creator.userId != userInfo.value.userId),
      )
      finished.value = !res.data.more
    })
    .finally(() => {
      loading.value = false
    })
}
function getCount() {
  reqUserSubCount().then((res) => {
    total.value = res.data.subPlaylistCount
    getList()
  })
}
function onLoad() {
  offset++
  getList()
}
function delSuccess(id: number) {
  const index = list.value.findIndex((item: SheetDataInterface) => item.id === id)
  list.value.splice(index, 1)
  total.value -= 1
}

getCount()
</script>

<template>
  <div class="create_sheet">
    <div class="menu">
      <div class="text">
        收藏歌单（{{ total }}）个
      </div>
      <div class="flex_box_center_column">
        <i class="iconfont icon-Androidgengduo" />
      </div>
    </div>
    <van-list v-model:loading="loading" :finished="finished" @load="onLoad">
      <SheetItem
        v-for="item in list"
        :key="item.id"
        :sheet-data="item"
        :hide-edit="true"
        :show-edit="true"
        @delsuccess="delSuccess(item.id)"
      />
    </van-list>
  </div>
</template>

<style scoped lang="less">
.create_sheet {
    .menu {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .text {
            font-size: 26px;
            color: var(--my-text-color-gray);
        }
        .iconfont {
            font-size: 28px;
            margin-right: 10px;
            color: var(--my-text-color-gray);
        }
    }
}
</style>
