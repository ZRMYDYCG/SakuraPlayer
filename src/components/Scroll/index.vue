<script setup lang="ts">
import type { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import BScroll from 'better-scroll'
import { defineExpose, onMounted, ref } from 'vue'

interface Props {
  probeType: number // 决定是否派发 scroll 事件，对页面的性能有影响，尤其是在 useTransition 为 true 的模式下 0 1 2 3
  stopPropagation: boolean
}
interface Position {
  x: number
  y: number
}
const props = withDefaults(defineProps<Props>(), {
  probeType: 3,
  stopPropagation: false,
})
const emit = defineEmits(['scroll', 'scrollEnd', 'pullingDown', 'pullingUp'])
const scrollwrapper = ref<HTMLDivElement>()

let bs: BScrollConstructor<any> | null = null
onMounted(() => {
  setTimeout(() => {
    if (scrollwrapper.value) {
      bs = new BScroll(scrollwrapper.value, {
        probeType: props.probeType,
        stopPropagation: props.stopPropagation,
        click: true,
        pullUpLoad: {
          threshold: 50,
        },
        pullDownRefresh: true,
      })
      bs.on('scroll', (position: Position) => {
        emit('scroll', position)
      })
      bs.on('scrollEnd', () => {
        emit('scrollEnd')
      })
      bs.on('pullingUp', () => {
        emit('pullingUp')
      })
      bs.on('pullingDown', () => {
        emit('pullingDown')
      })
    }
  }, 1000)
})
// 滚动到某一个元素
function scrollToElemet(el: HTMLElement, time: number) {
  bs && bs.scrollToElement(el, time, false, false)
}
// 刷新
function refresh() {
  bs && bs.refresh()
}
// 下拉加载
function finishPullUp() {
  bs && bs.finishPullUp()
}
// 顶部下拉结束
function finishPullDown() {
  bs?.finishPullDown()
}
defineExpose({
  scrollToElemet,
  refresh,
  finishPullUp,
  finishPullDown,
})
</script>

<template>
  <div ref="scrollwrapper" class="scroll">
    <div class="scroll_content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="less">
.scroll {
    height: 100%;
    overflow: hidden;
}
</style>
