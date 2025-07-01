<!-- 文本消息 -->
<script setup lang="ts">
import { computed } from 'vue'
import { decodeText } from '@/utils/decodeText'

interface Props {
  msg: string
}
const props = withDefaults(defineProps<Props>(), {
  msg: '{}',
})
const msgList = computed(() => {
  return decodeText(JSON.parse(props.msg))
})
</script>

<template>
  <div class="text_msg">
    <div v-for="(item, index) in msgList" :key="index" class="msg_wrapper">
      <span v-if="item.name === 'text'">{{ item.text }}</span>
      <img v-else-if="item.name === 'img'" class="img" :src="item.src">
    </div>
  </div>
</template>

<style scoped lang="less">
.msg_wrapper {
    display: inline-block;
    .img {
        width: 40px;
        height: 40px;
    }
}
</style>
