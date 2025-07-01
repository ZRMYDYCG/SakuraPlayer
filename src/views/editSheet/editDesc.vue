<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description:
-->
<script setup lang="ts">
import { Toast } from 'vant'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { reqUpdateSheetDesc } from '@/api/modules/sheet'
import { reqSheetDetail } from '@/api/modules/song'
import { onClickLeft } from '@/utils/back'

const desc = ref<string>('')
const route = useRoute()
const { id } = route.query
const router = useRouter()
function handleSave() {
  if (!desc.value) {
    Toast.fail('请输入歌单描述')
    return
  }
  const params = {
    id: Number(id),
    desc: desc.value,
  }
  const loading = Toast.loading({
    duration: 0,
    message: '加载中...',
    overlay: true,
  })
  reqUpdateSheetDesc(params)
    .then(() => {
      router.back()
    })
    .finally(() => {
      loading.clear()
    })
}
//  获取描述
function getDetail() {
  reqSheetDetail({ id: Number(id), timestamp: Date.now() }).then((res) => {
    desc.value = res.data.playlist.description
  })
}
getDetail()
</script>

<template>
  <MiniPlayOut>
    <div class="create_sheet">
      <van-nav-bar
        title="编辑描述"
        left-arrow
        fixed
        placeholder
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="handleSave"
      />
      <van-form input-align="right">
        <van-cell-group>
          <van-field
            v-model="desc"
            label="描述"
            :autosize="{ maxHeight: 600, minHeight: 300 }"
            type="textarea"
            placeholder="请输入歌单描述"
            maxlength="2000"
            show-word-limit
            :row="10"
          />
        </van-cell-group>
      </van-form>
    </div>
  </MiniPlayOut>
</template>

<style scoped lang="less">
.create_sheet {
    height: 100%;
    overflow: auto;
    padding: 15px;
    box-sizing: border-box;
    .over_img {
        width: 200px;
        height: 200px;
    }
    .photograph {
        height: 200px;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--my-back-color-gray);
    }
}
</style>
