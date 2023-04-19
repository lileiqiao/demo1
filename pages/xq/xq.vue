<template>
	<view class="box">
		<scroll-view scroll-y="true" class="scrollbox">
			
			<swiper class="lbtbox" circular="true" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="i,index in imgList" key="index">
					<image class="img1" :src="i.largeImg" mode=""></image>
				</swiper-item>
			</swiper>
			
			<view class="xqtop">
				<view class="top_p1">
					<view style="font-size: 40rpx;color: #ff3637;">￥{{shuju1.priceStr}}</view>
					<view > <cl-icon name="cl-icon-like" :size="30"></cl-icon> 收藏</view>
				</view>
				<view class="top_p2">
					<view style="color: #bf9e6b;">{{shuju.supplierBackground}}</view><view>生产周期:{{shuju1.duration}}天</view>
				</view>
				<view class="top_p3">
					{{shuju.longProductName}}
				</view>
				<view class="top_p4">
					{{shuju.productSale}}
				</view>
			</view>
			
			
			
		</scroll-view>
		
		
		<view class="bottomtab">
			
		</view>
	</view>
</template>
<script setup>
	import {xiangqing} from "../../api/api.js"
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	let imgList = ref([])
	let shuju1 = ref({})  //价格
	let shuju = ref({})
	let zhouqi =ref('') //生产周期
	let xr =(i)=>{
		xiangqing({zkh:i}).then(res=>{
			console.log(res);
			shuju.value=res
			imgList.value = res.imgList
			shuju1.value=res.sizeDetail[0]
		})
	}
	onLoad((option)=>{
		xr(option.id)
	})
	
</script>

<style>
	page{
		width: 100%;
		height:100%;
		background-color: #bbb;
	}
	.box{
		width: 100%;
		height:100%;
		overflow: hidden;
		background-color: #bbb;
	}
	.scrollbox{
		width: 100%;
		height: 90%;
		background-color: #bbb;
	}
	.bottomtab{
		width: 100%;
		height: 10%;
		background-color: aqua;
	}
	.lbtbox{
		width: 100%;
		height:750rpx;
	}
	.img1{
		width: 100%;
		height:750rpx;
	}
	.xqtop{
		width: 100%;
		/* height: 350rpx; */
		border: 1rpx solid #fff;
		box-sizing: border-box;
		background-color: #fff;
	}
	.top_p1{
		width: 100%;
		height:62rpx ;
		line-height: 62rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
	}
	.top_p2{
		width: 100%;
		height:40rpx ;
		line-height: 40rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.top_p3{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 35rpx;
	}
	.top_p4{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		color: #bbb;
		margin: 10rpx 0 40rpx 0;
	}
	
	
</style>