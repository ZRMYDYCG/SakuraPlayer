<script setup lang="ts">
import type { UserInterface } from '@/types/public/user'
import { ref } from 'vue'
import { reqSearchByType } from '@/api/modules/search'
import UserItem from '@/components/UserItem/index.vue'

interface Props {
  keyword: string
  type: number
}
const props = withDefaults(defineProps<Props>(), {
  keyword: '',
})
const list = ref<Array<UserInterface>>([])

async function getData() {
  const songList = await reqSearchByType({ keywords: props.keyword, type: props.type })
  list.value = songList.data.result.userprofiles
}

getData()
</script>

<template>
  <div class="single_list box_white_container">
    <UserItem v-for="item in list" :key="item.userId" :user-data="item" />
  </div>
</template>

<style scoped lang="less">
.single_list {
    background: var(--my-back-color-white);
}
</style>
