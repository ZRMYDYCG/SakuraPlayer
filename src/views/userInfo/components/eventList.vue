<script setup lang="ts">
import type { EventDataInterface } from '@/types/public/event'
import { ref, watch } from 'vue'
import { reqUserEvent } from '@/api/modules/event'
import EventItem from '@/components/EventCom/eventItem.vue'

interface Props {
  userId: number
}
const props = withDefaults(defineProps<Props>(), {
  userId: 0,
})

const loading = ref<boolean>(true)
const finished = ref<boolean>(false)
const list = ref<EventDataInterface[]>([])
let lasttime = -1
function onLoad() {
  if (loading.value)
    return
  getList()
}
function getList() {
  loading.value = true
  reqUserEvent({
    uid: props.userId,
    limit: 20,
    lasttime,
  })
    .then((res) => {
      list.value = list.value.concat(res.data.events)
      loading.value = false
      lasttime = res.data.lasttime
      finished.value = !res.data.more
    })
    .catch(() => {
      loading.value = false
      finished.value = true
    })
}
watch(
  () => props.userId,
  (val) => {
    if (val) {
      lasttime = -1
      finished.value = false
      list.value = []
      getList()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="event_list box_white_container">
    <van-list :loading="loading" :finished="finished" finished-text="到底了~" @load="onLoad">
      <EventItem v-for="item in list" :key="item.id" :event-data="item" />
      <van-empty v-if="!loading && list.length == 0" />
    </van-list>
  </div>
</template>

<style scoped lang="less">
.event_list {
    margin-top: 20px;
}
</style>
