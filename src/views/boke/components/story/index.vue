<script lang="ts" setup>
import type { DjData } from '@/types/public/dj'
import { ref } from 'vue'
import { reqDjHotByType } from '@/api/modules/dj'
import DjItem from '@/components/DjItem/index.vue'
import { BoxType } from '@/types/public'

interface Props {
  cateId: number
}
const props = withDefaults(defineProps<Props>(), {
  cateId: 0,
})
const list = ref<Array<DjData>>([])
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)
let offset = 0
const limit = 30
function getList() {
  const data = {
    limit,
    offset: offset * limit,
    cateId: props.cateId,
  }
  loading.value = true
  reqDjHotByType(data)
    .then((res) => {
      list.value = list.value.concat(res.data.djRadios)
      finished.value = !res.data.hasMore
    })
    .finally(() => {
      loading.value = false
    })
}
function onLoad() {
  offset++
  getList()
}
</script>

<template>
  <van-list :loading="loading" :finished="finished" @load="onLoad">
    <div class="list">
      <van-row gutter="10">
        <van-col v-for="item in list" :key="item.id" :span="8">
          <DjItem :dj-data="item" :box-type="BoxType.box" />
        </van-col>
      </van-row>
      <van-empty v-if="!loading && list.length == 0" description="暂无数据" />
    </div>
  </van-list>
</template>

<style scoped lang="less">
.list {
    padding: 30px;
}
</style>
