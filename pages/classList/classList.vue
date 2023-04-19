<template>
	<view class="box">111</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTypeOne } from '@/api/api.js';
let one = ref(0);
let two = ref(0);
let getdata = async () => {
	let res = await getTypeOne();
	console.log(res.listData);
};
getdata();
onLoad(Option => {
	console.log(Option);
	uni.setNavigationBarTitle({
		title: '新的标题'
	});
});
</script>

<style lang="scss" scoped>
@import './classList.scss';
</style>
