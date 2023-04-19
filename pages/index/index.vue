<template>
	<view class="">
		1111
	</view>
</template>

<script>
	import {getTypeOne} from "@/api/api.js"
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			getTypeOne().then(res => {
				console.log(res)
			})
		},
		methods: {
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>