<script setup lang="ts">
import type { singerInterface } from '@/types/public/singer'
import { Toast } from 'vant'
import { ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { reqSubSinger } from '@/api/modules/singer'

const props = withDefaults(defineProps<Props>(), {
  singerData: () => {
    return {
      name: '',
      picUrl: '',
      id: 0,
      followed: false, // 是否已经关注了
      accountId: 0,
    }
  },
})
const router = useRouter()
interface Props {
  singerData: singerInterface
}
const followed = ref<boolean>(false)
// 获取原始值
followed.value = toRaw(props.singerData.followed)
const loading = ref<boolean>(false)
function tapSinger() {
  router.push({
    path: '/singerDetail',
    query: {
      id: props.singerData.id,
    },
  })
}
function subSinger(t: number): void {
  const data = {
    t,
    id: props.singerData.id,
  }
  loading.value = true
  reqSubSinger(data)
    .then(() => {
      if (t === 1) {
        Toast.success('关注成功')
        followed.value = true
      }
      else {
        Toast.success('取消成功')
        followed.value = false
      }
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="singer_item" @click="tapSinger">
    <div class="left">
      <div class="coverImg">
        <img :src="`${singerData.picUrl}?param=140y140`" alt="">
      </div>
      <div class="singer_name">
        {{ singerData.name }}
      </div>
    </div>
    <div class="right">
      <van-button v-if="!followed" round size="small" @click.stop="subSinger(1)">
        关注
      </van-button>
      <van-button v-else round size="small" @click.stop="subSinger(0)">
        取消
      </van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.singer_item {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--van-cell-border-color);
    .left {
        display: flex;
        align-items: center;
        .coverImg {
            width: 100px;
            height: 100px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 20px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .singer_name {
            font-size: 28px;
            color: var(--my-text-color-black);
        }
    }
}
</style>
