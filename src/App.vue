<!--
 * @Author: ZRMYDYCG
 * @Date: 2024-10
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-10
 * @Description: 
-->
<template>
	<router-view />
	<BigPlayer />
	<Screen v-if="showScreen" @close="closeScreen" />
</template>
<script setup lang="ts">
	import { ref } from 'vue'
	import BigPlayer from '@/components/BigPlayer/index.vue'
	import Screen from '@/components/Screen/index.vue'
	import { useSystemStore } from '@/store'
	const systemStore = useSystemStore()
	systemStore.setMode(systemStore.mode)

	
	const showScreen = ref<boolean>(true)
	function closeScreen() {
		showScreen.value = false
	}
</script>