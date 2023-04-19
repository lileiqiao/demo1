<template>
	<view class="box">
		<input type="text" placeholder="搜索商品">
	</view>
</template>

<script>
	import {getTypeOne} from "@/api/api.js"
	export default {
		data() {
			return {
			 val:''
			}
		},
		onLoad() {
			getTypeOne().then(res => {
				console.log(res)
			})
		},
		methods: {
			onSearch(){
			}
		}
	}
</script>

<style>
</style>