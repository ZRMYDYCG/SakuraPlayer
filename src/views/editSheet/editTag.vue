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
import { reqCatList, reqUpdateSheetTags } from '@/api/modules/sheet'
import { reqSheetDetail } from '@/api/modules/song'
import { onClickLeft } from '@/utils/back'

const route = useRoute()
const { id } = route.query
interface Tag {
  name: string
  category: string
}
interface Parent {
  name: string
  icon: string
  children: Array<Tag>
  category: string
}
const parentList = ref<Parent[]>([])
const router = useRouter()
const selectList = ref<Array<string>>([])

function handleSave() {
  const params = {
    id: Number(id),
    tags: selectList.value.join(';'),
  }
  const loading = Toast.loading({
    duration: 0,
    message: '加载中...',
    overlay: true,
  })
  reqUpdateSheetTags(params)
    .then(() => {
      router.back()
    })
    .finally(() => {
      loading.clear()
    })
}
// 歌曲标签
function getCatList() {
  reqCatList().then((res) => {
    for (const key in res.data.categories) {
      parentList.value.push({
        category: key,
        name: res.data.categories[key],
        children: res.data.sub.filter((item: Tag): boolean => item.category == key),
        icon: getIcon(key),
      })
    }
  })
}
// 图标
function getIcon(category: string): string {
  switch (category) {
    case '0':
      return 'icon-diqiu'
    case '1':
      return 'icon-gangqin'
    case '2':
      return 'icon-kafei'
    case '3':
      return 'icon-xiaolian'
    case '4':
      return 'icon-zhuti'
    default:
      return 'icon-diqiu'
  }
}
// 点击标签
function tapTags(tag: Tag): void {
  const index = selectList.value.findIndex(item => item === tag.name)
  if (index > -1) {
    selectList.value.splice(index, 1)
  }
  else {
    if (selectList.value.length >= 3) {
      return
    }
    selectList.value.push(tag.name)
  }
}
//  获取已经选择的标签
function getDetail() {
  reqSheetDetail({ id: Number(id), timestamp: Date.now() }).then((res) => {
    selectList.value = res.data.playlist.tags || []
  })
}
getCatList()
getDetail()
</script>

<template>
  <MiniPlayOut>
    <div class="create_sheet">
      <van-nav-bar
        title="编辑标签"
        left-arrow
        fixed
        placeholder
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="handleSave"
      />
      <van-sticky offset-top="1.22667rem">
        <div class="tip_info">
          <van-icon name="info-o" />
          请选择合适的标签，最多选择3个，已选择{{ selectList.length }}个
        </div>
      </van-sticky>
      <div v-for="(item, index) in parentList" :key="index">
        <div class="grid_container">
          <div class="parent_name grid_item">
            <div>
              <i class="iconfont" :class="item.icon" />
            </div>
            <div class="txt">
              {{ item.name }}
            </div>
          </div>
          <div
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            class="child_name grid_item"
            @click="tapTags(childItem)"
          >
            <div class="name_txt">
              {{ childItem.name }}
            </div>
            <div v-if="selectList.includes(childItem.name)" class="child_check">
              <i class="iconfont icon-gou" />
            </div>
          </div>
        </div>
      </div>
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
    .tip_info {
        background-color: var(--my-back-color-white);
        font-size: 24px;
        padding: 20px;
        color: var(--my-text-color-gray);
    }
    .grid_container {
        display: grid;
        grid-template-columns: 20% 20% 20% 20% 20%;
        margin-bottom: 60px;
        border-top: 1px solid var(--my-gray-1);
        border-left: 1px solid var(--my-gray-1);
    }
    .parent_name {
        font-size: 22px;
        grid-row-start: 1;
        grid-row-end: 3;
        text-align: center;
        // line-height: 160px;
        border-right: 1px solid var(--my-gray-1);
        border-bottom: 1px solid var(--my-gray-1);
        color: var(--my-text-color-gray);
        display: flex;
        justify-content: center;
        flex-direction: column;
        .iconfont {
            font-size: 38px;
        }
        .txt {
            margin-top: 20px;
        }
    }
    .child_name {
        height: 80px;
        font-size: 30px;
        text-align: center;
        border-right: 1px solid var(--my-gray-1);
        border-bottom: 1px solid var(--my-gray-1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--my-text-color-black);
        position: relative;
        .name_txt {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 80px;
        }
        .child_check {
            position: absolute;
            top: 5px;
            left: 5px;
            .iconfont {
                color: var(--my-primary-color);
            }
        }
    }
}
</style>
