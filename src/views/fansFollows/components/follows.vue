<script setup lang="ts">
import type { UserInterface } from '@/types/public/user'
import { ref } from 'vue'
import { reqUserFollows } from '@/api/modules/user'
import UserItem from '@/components/UserItem/index.vue'

interface Props {
  userId: number
}
const props = withDefaults(defineProps<Props>(), {
  userId: 0,
})
const loading = ref<boolean>(true)
const finished = ref<boolean>(false)
const list = ref<UserInterface[]>([])

let offset = 0
function getList() {
  loading.value = true
  reqUserFollows({
    uid: props.userId,
    limit: 30,
    offset: offset * 30,
  })
    .then((res) => {
      console.log(res)
      list.value = list.value.concat(res.data.follow)
      finished.value = !res.data.more
    })
    .catch(() => {
      finished.value = true
    })
    .finally(() => {
      loading.value = false
    })
}
function onLoad() {
  if (loading.value)
    return
  offset++
  getList()
}
getList()
</script>

<template>
  <div class="list box_white_container">
    <van-list :loading="loading" :finished="finished" @load="onLoad">
      <UserItem v-for="item in list" :key="item.userId" :user-data="item" />
      <van-empty v-if="!loading && list.length == 0" />
    </van-list>
  </div>
</template>

<style scoped lang="less">
.list {
    padding: 30px;
    box-sizing: border-box;
}
</style>
