<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<script setup lang="ts">
import { ref } from 'vue'
import CollectSheet from './collectSheet.vue'
import CreateSheet from './createSheet.vue'

const active = ref(0)
</script>

<template>
  <div class="sheet">
    <van-tabs v-model:active="active" scrollspy sticky offset-top="1.17333rem" :lazy-render="false">
      <van-tab title="创建歌单">
        <div class="box_white_container">
          <CreateSheet />
        </div>
      </van-tab>
      <van-tab title="收藏歌单">
        <div class="box_white_container">
          <CollectSheet />
        </div>
      </van-tab>
      <van-tab title="动态">
        <div class="box_white_container" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="less">
.sheet {
    .box_white_container {
        margin-top: 30px;
    }
}
</style>
