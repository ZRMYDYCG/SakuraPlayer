<script setup lang="ts">
// import { Toast } from 'vant'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { reqUpdateCover } from '@/api/modules/sheet'
import { reqSheetDetail } from '@/api/modules/song'
import { onClickLeft } from '@/utils/back'

const route = useRoute()
const router = useRouter()
const { id } = route.query
const details = reactive({
  tags: '',
  coverImgUrl: '',
  name: '',
  description: '',
})

function afterRead(file: any) {
  const params = {
    id: Number(id),
    timestamp: Date.now(),
  }
  const formData = new FormData()
  formData.append('imgFile', file.file)
  // const loading = Toast.loading({
  //     duration: 0,
  //     message: '加载中...',
  //     overlay: true
  // })
  reqUpdateCover(params, formData)
    .then((res) => {
      details.coverImgUrl = res.data.data.url
    })
    .finally(() => {
      // loading.clear()
    })
}
function getDetail() {
  reqSheetDetail({ id: Number(id), timestamp: Date.now() }).then((res) => {
    // for(const key in res.data.playlist) {
    // 	details[key] = res.data.playlist[key]
    // }
    details.coverImgUrl = res.data.playlist.coverImgUrl
    details.name = res.data.playlist.name
    details.description = res.data.playlist.description
    details.tags = res.data.playlist.tags.join(';')
  })
}
function toEditName() {
  router.push({
    path: '/editName',
    query: {
      id,
    },
  })
}
function toEditTag() {
  router.push({
    path: '/editTag',
    query: {
      id,
    },
  })
}
// 编辑描述
function toEditDesc() {
  router.push({
    path: '/editDesc',
    query: {
      id,
    },
  })
}
getDetail()
</script>

<template>
  <MiniPlayOut>
    <div class="create_sheet">
      <van-nav-bar title="编辑歌单" left-arrow fixed placeholder @click-left="onClickLeft" />
      <van-form input-align="right">
        <van-cell-group>
          <van-field label="更换封面">
            <template #input>
              <van-uploader :after-read="afterRead">
                <template #default>
                  <img
                    v-if="details.coverImgUrl"
                    class="over_img"
                    :src="`${details.coverImgUrl}?param=100y100`"
                    alt=""
                  >
                  <div v-else class="photograph">
                    <van-icon name="photograph" size="30px" />
                  </div>
                </template>
              </van-uploader>
            </template>
          </van-field>
          <van-field v-model="details.name" label="名称" readonly @click="toEditName" />
          <van-field
            v-model="details.tags"
            label="标签"
            placeholder="请选择标签"
            readonly
            @click="toEditTag"
          />
          <van-field
            v-model="details.description"
            label="描述"
            placeholder="请输入描述"
            readonly
            @click="toEditDesc"
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
