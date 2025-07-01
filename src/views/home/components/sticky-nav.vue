<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { reqSearchDefault } from '@/api/modules/search'
import $bus from '@/utils/eventBus'

const router = useRouter()
const showKeyword = ref<string>('')

function goSearch(): void {
  router.push({
    path: '/search',
  })
}

function openMenu(): void {
  $bus.emit('open_menu')
}

function getDefaultWord(): void {
  reqSearchDefault().then((res) => {
    showKeyword.value = res.data.data.showKeyword
  })
}
getDefaultWord()
</script>

<template>
  <van-sticky>
    <div class="nav">
      <div class="flex_box_center_column" @click="openMenu">
        <i class="iconfont icon-caidan" />
      </div>
      <div class="search_wrapper" @click.stop="goSearch">
        <div class="flex_box_center_column">
          <i class="iconfont icon-sousuo" />
        </div>
        <div class="search_text flex_box_center_column">
          {{ showKeyword }}
        </div>
      </div>
      <div class="flex_box_center_column">
        <i class="iconfont icon-yuyin" />
      </div>
    </div>
  </van-sticky>
</template>

<style lang="less" scoped>
.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    height: 88px;
    background: var(--my-gray-1);
    .iconfont {
        color: var(--my-text-color-black);
    }
    .search_wrapper {
        height: 60px;
        background: var(--my-search-back);
        flex: 1;
        margin: 0 40px;
        display: flex;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        color: var(--my-text-color-black);
        .icon-sousuo {
            padding-top: 4px;
        }

        .search_text {
            margin-left: 10px;
            font-size: 24px;
        }
    }
}

.icon-yuyin,
.icon-caidan {
    font-size: 40px;
    font-weight: 600;
}
</style>
