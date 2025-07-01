<script setup lang="ts">
import type { MvDataInterface } from '@/types/public/video'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { reqNewMv } from '@/api/modules/video'
import MvItem from '@/components/MvItem/index.vue'

const router = useRouter()
const loading = ref<boolean>(false)
const list = ref<MvDataInterface[]>([])
function getList() {
  loading.value = true
  reqNewMv({ limit: 10 })
    .then((res) => {
      list.value = res.data.data
    })
    .finally(() => {
      loading.value = false
    })
}

function toMv() {
  router.push({
    path: '/mv',
  })
}

getList()
</script>

<template>
  <div class="newMv">
    <div class="top">
      <div class="recomend_title">
        最新MV
      </div>
      <van-button icon="play" round size="medium" @click="toMv">
        更多
      </van-button>
    </div>
    <van-skeleton title :row="1" :loading="loading">
      <div>
        <MvItem v-for="item in list" :key="item.id" :mv-data="item" />
      </div>
    </van-skeleton>
  </div>
</template>

<style scoped lang="less">
.newMv {
    margin-top: 20px;
    background: var(--van-white);
    padding: 15px;
    .van-button {
        padding-left: 10px;
        padding-right: 10px;
    }
    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .recomend_title {
            font-size: 30px;
            font-weight: bold;
            color: var(--my-text-color-black);
        }
    }
}
</style>
