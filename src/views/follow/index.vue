<!--
 * @Author: ZRMYDYCG 547471919@qq.com
 * @Date: 2024-07-16 22:29:48
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @FilePath: \v3_ts_music\src\views\follow\index.vue
 * @Description: 关注页开发
-->
<template>
	<div class="follow">
		<!-- <van-nav-bar fixed placeholder title="关注" /> -->
		<div class="list">
			<van-list :loading="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
				<EventItem v-for="item in list" :key="item.id" :event-data="item" />
				<van-empty v-if="!loading && list.length === 0" />
			</van-list>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqEvent } from '@/api/modules/event'
import EventItem from '@/components/EventCom/eventItem.vue'
import type { EventDataInterface } from '@/types/public/event'

const loading = ref<boolean>(false)
const finished = ref<boolean>(false)
const list = ref<EventDataInterface[]>([])
let lasttime = -1 // 用这个参数去翻页

const onLoad = () => {
	getList()
}
function getList() {
	loading.value = true // 开始加载
	reqEvent({
		pagesize: 20,  // 每页大小
		lasttime: lasttime // 页码
	})
	.then(res => {
		console.log(res)
		list.value = list.value.concat(res.data.event)
		loading.value = false // 加载结束
		lasttime = res.data.lasttime
		finished.value = !res.data.more
	})
	.catch(() => {
		loading.value = false
		finished.value = true
	})
}
</script>

<style scoped lang="less">
.follow{
	height: 100%;
	overflow: auto;
	padding-bottom: 180px;
	box-sizing: border-box;
	background-color: var(--my-back-color-white);
	.list{
		padding: 30px;
	}
}
</style>