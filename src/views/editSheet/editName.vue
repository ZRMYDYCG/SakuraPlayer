<script setup lang="ts">
import { Toast } from 'vant'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { reqUpdateSheetName } from '@/api/modules/sheet'
import { onClickLeft } from '@/utils/back'

const name = ref<string>('')
const route = useRoute()
const { id } = route.query
const router = useRouter()
function handleSave() {
  if (!name.value) {
    Toast.fail('请输入歌单名称')
    return
  }
  const params = {
    id: Number(id),
    name: name.value,
  }
  const loading = Toast.loading({
    duration: 0,
    message: '加载中...',
    overlay: true,
  })
  reqUpdateSheetName(params)
    .then(() => {
      router.back()
    })
    .finally(() => {
      loading.clear()
    })
}
</script>

<template>
  <MiniPlayOut>
    <div class="create_sheet">
      <van-nav-bar
        title="编辑名称"
        left-arrow
        fixed
        placeholder
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="handleSave"
      />
      <van-form input-align="right">
        <van-cell-group>
          <van-field v-model="name" label="名称" placeholder="请输入歌单名称" maxlength="50" />
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
