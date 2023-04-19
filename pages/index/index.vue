<template>
	<view class="box">
		<!-- 搜索 -->
		<input class="sousuo" type="text" placeholder="搜索商品">
		<!-- 导航栏 -->
		<scroll-view scroll-x="true" scroll-with-animation="true"   show-scrollbar="false" class="tab1">
			<view :class="[tabnum==index? 'tabli1':'',' tabli']" @click="diantab(i,index)" v-for="i,index in tabarr" key="i">{{i.categoryName}}</view>
		</scroll-view>
		
		<scroll-view :scroll-top="scrollTop" scroll-with-animation="true" @scroll="gun" @scrolltolower="shuaxin" scroll-y="true" style="width: 100%;height: 75vh;">
		<!-- 轮播图 -->
		<swiper  :indicator-dots="true" style="width: 100%;height: 260rpx;" circular="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="i,index in lbtarr" key="index">
				<image style="width: 100vw; height: 260rpx;" :src="i.image" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图下面的字 -->
		<view class="lbt_bottom">
			<view>大牌品质</view>/  <view>工厂价格</view>/ <view>分期支付</view>/ <view>顺丰包邮</view>/ <view>无忧退款</view>
		</view>
		
		<view class="pznzbox">
			<view class="pznzli" v-for="i,index in pznz" key="index">
				<image style="width: 48rpx;height: 48rpx;margin-top: 20rpx;" :src="i.icon" mode="aspectFill"></image>
				<view>{{i.title}}</view>
			</view>
		</view>
		
		<view style="width: 100%;height: 20rpx; background-color: rgb(244, 244, 244);"></view>
		
		
		<view class="listbox" v-for="i,index in list" key="index">
			<view class="listli" v-for="(e,ee) in i.data" :key="ee" @click="xq(e)">
				<image style="width: 350rpx;height: 350rpx;" :src="e.image" mode=""></image>
				<view class="p1">￥ <text style="font-size: 30rpx;">{{e.priceStr}}</text> </view>
				<view class="p2">
					<view style="color: #fff; padding: 3rpx 8rpx;background-color: rgb(171, 127, 209);border-radius: 5rpx;">爆品</view>
					<view style="color:rgb(251, 76, 129) ; margin-left: 10rpx; padding: 3rpx 8rpx;border: 1rpx solid rgb(251, 76, 129); border-radius: 5rpx;">一起拼</view>
				</view>
				<view class="p3">{{e.mainTitle}}</view>
				<view class="p4">{{e.thirdContent=="|"?'':e.thirdContent}}</view>
			</view>
		</view>
		</scroll-view>
		
		
		
		<view v-if="xianshi" class="shang" @click="hui">
			↑
		</view>
	</view>
</template>

<script>
	import {getTypeOne,lbt,indexshangpinlist} from "@/api/api.js"
	export default {
		data() {
			return {
			 tabarr:[],
			 tabnum:0,
			 lbtarr:[],
			 pznz:[],
			 page:2,
			 list:[],
			 flag:true,
			 xianshi:false,
			 old: {
				scrollTop: 0
			 },
			 scrollTop:0
			}
		},
		onLoad() {
			this.xr()
			this.chudi()
		},
		methods: {
			xr(){
				getTypeOne()
				.then(res => {
					// console.log(res)
					this.tabarr=res.listData
				})
				lbt().then(res=>{
					// console.log(res.homeData);
					this.lbtarr=res.homeData.banners
					this.pznz=res.homeData.operationNavigation

				})
			},
			diantab(i,index){
				// console.log(i,index);
				this.tabnum=index
			},
			chudi(){
				indexshangpinlist({
					pageIndex:1
				}).then(res=>{
					var a = [...this.list]
					res.data.blockList[1].block.forEach(e=>{
						// console.log(e.data[0]);
						a.push(e)
					})
					this.list=a
				})
			},
			shuaxin(){
				if(this.flag){
					this.flag=false
				this.page++
				console.log(this.page);
				setTimeout(()=>{
				this.chudi()
				this.flag=true
				},1000)
				}
			},
			gun(e){
		     	this.old.scrollTop = e.detail.scrollTop
				if(e.detail.scrollTop>2000){
					this.xianshi=true
					// console.log("显示");
				}else{
					// console.log("不显示");
					this.xianshi=false
				}
			},
				
			hui(){
				// console.log(1);
				this.scrollTop = this.old.scrollTop
				// console.log(this.scrollTop);
				this.$nextTick(()=> {
					this.scrollTop = 0
					// console.log(this.scrollTop);
				});
			},
			xq(i){
				console.log(i.routerParams.suId);
				uni.navigateTo({
					url: '../xq/xq?id='+i.routerParams.suId
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
		
	}
	.sousuo{
		width: 90%;
		height: 50rpx;
		color: #dadada;
		margin:  20rpx auto 0;
		border-radius: 25rpx;
		padding-left: 40rpx;
		box-sizing: border-box;
		background-color: #f4f4f4;
		font-size: 25rpx;
	}
		
	.tab1{
		width: 100%;
		height: 70rpx;
		display: flex;
		white-space: nowrap;
	}
		
	.tabli{
		display: inline-block;
		margin: 0 20rpx;
		line-height: 68rpx;
		/* background-color: aqua; */
	}
	.tabli1{
		border-bottom: 2rpx solid #7f4395;
		color: #7f4395;
	}
	.lbt_bottom{
		width: 100vw;
		height:72rpx ;
		display: flex;
		justify-content: space-around;
		line-height: 72rpx;
		color: #9687a4;
	}
	.pznzbox{
		width: 100%;
		height: 162rpx;
		display: flex;
		justify-content: space-around;
	}
	.pznzli{
		width:144rpx ;
		text-align: center;
	}
	.listbox{
		width: 96%;
		display: flex;
		justify-content: space-between;
		/* background-color: #8c5eff; */
		margin: 0 auto 20rpx;
	}
	.listli{
		width: 350rpx;
		height: 570rpx;
		/* background-color: #7f4395; */
	}
	.p1{
		width: 350rpx;
		padding-left: 10rpx;
		box-sizing: border-box;
		color: #f7a701;
		margin-top: 10rpx;
	}
		
	.p2{
		width: 350rpx;
		padding-left: 10rpx;
		box-sizing: border-box;
		margin-top: 5rpx;
		display: flex;
		font-size: 20rpx;
	}
	.p3{
		width: 350rpx;
		padding-left: 10rpx;
		margin-top: 10rpx;
		box-sizing: border-box;
	}
	.p4{
		width: 350rpx;
		padding-left: 10rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		margin-top: 20rpx;
		color: #bbbbbb;
	}
	.box{
		position: relative;
	}
	.shang{
		position: absolute;
		bottom: 40rpx;
		right: 40rpx;
		width: 75rpx;
		height: 75rpx;
		background-color: #cecece;
		text-align: center;
		line-height: 75rpx;
		border-radius: 50%;	
	}
</style>