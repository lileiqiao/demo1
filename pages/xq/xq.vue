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
			
			<view class="ptwfbox">
				<view class="ptwful">
					<view class="">拼团玩法</view><view style="color: #bbb;">详细规则<cl-icon name="cl-icon-arrow-right"></cl-icon></view>
				</view>
				<image style="width: 100%;height:176rpx ;" src="https://static.biyao.com/mnew/img/master/togetherGroup/rule@2x_4b87758.png" mode=""></image>
			</view>
			
			<view class="plbox">
				<view class="pltop">
					<view>商品评价({{plshuju.cmtCount}})</view>
					<view>好评率 {{plshuju.praiseRate}} <cl-icon name="cl-icon-arrow-right"></cl-icon></view>
				</view>
				<view class="plul">
					<view class="plli1">
						<view class="plli1_left">
								<image style="width: 56rpx;height: 56rpx; border-radius: 50%;margin-right: 20rpx;" :src="plyh.avatar_url" mode=""></image>
								<text>{{plyh.nickname}}</text>
						</view>
						
						<view style="color: #bf9e6b;">
							<cl-icon name="cl-icon-smile-fill"></cl-icon>满意
						</view>
					
					</view>
					
					<view class="plli2">
						<text>{{plyh.createTime}} {{plyh.spec}}</text>
					</view>
					<view class="plli3">
						{{plyh.content}}
					</view>
				</view>
				
			</view>
			
			<view class="tdbox">
				<view class="tdtop">
					<view class="tdli1">
						<image style="width:96rpx ;height: 96rpx;" :src="tdsp.supplierImg" mode=""></image>
						<view class="">{{tdsp.supplierName}}</view>
					</view>
					<view class="">
						全部商品   <cl-icon name="cl-icon-arrow-right"></cl-icon>
					</view>
				</view>
				
				<view class="tdlist">
					<scroll-view scroll-x="true" >
						<view class="tdlist_li" v-for="i,index in tdsp.recommendProducts" @click="tongdian(i)" key="index">
							<image style="width:200rpx;height: 200rpx;" :src="i.imageUrl" mode=""></image>
							<view class="single-content">{{i.title}}</view>
							<view style="margin-top: 20rpx;color: #bf9e6b;">￥{{i.priceStr}}</view>
						</view>
					</scroll-view>
				</view>
			</view>
			
			<view class="spms">
				<view class="spms_ul" v-for="i,index in shuju.productTopDetail" key="index">
					<view class="spms_p1">{{i.name}}:</view>
					<view class="spms_p2">{{i.desc}}</view>
				</view>
			</view>
			<view class="imgs" v-html="imgs">
				
			</view>
			
			
			<view style="width: 100%;height: 100rpx;background-color: #fff;">
				
			</view>
		</scroll-view>
		
		
		<view class="bottomtab">
		  <view class="pp1">
			  <view class=""><cl-icon name="cl-icon-customer-service"></cl-icon></view>
			  <view class="">客服</view>
		  </view>
		   <view class="pp2">单独购买 ￥ {{shuju1.priceStr}}</view>
		    <view class="pp3">新人参团 ￥ {{shuju1.groupBuyPrice}}</view>
		</view>
	</view>
</template>
<script setup>
	import {xiangqing,pinlun} from "../../api/api.js"
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	let imgList = ref([])
	let shuju1 = ref({})  //价格
	let shuju = ref({})
	let zhouqi =ref('') //生产周期
	let plshuju = ref({}) //评论
	let plyh = ref({}) //评论用户
	let tdsp = ref({}) //同店商品
	let imgs = ref('')
	let xr =(i)=>{
		xiangqing({zkh:i}).then(res=>{
			console.log(res);
			shuju.value=res
			imgList.value = res.imgList
			shuju1.value=res.sizeDetail[0]
			tdsp.value = res.onSellGoodsInfo
			imgs.value = res.productButtomDetail.replaceAll('img','img style="width:94vw;" ')	
		})
	}
	
	let pl = (i)=>{
		pinlun({
			zkh1:i,
			index:1,
			type:0
		}).then(res=>{
			// console.log(res);
			plshuju.value = res.data
			plyh.value=res.data.post[0]
		})
	}
	let tongdian = (i)=>{
		console.log(i.goldSuId);
		uni.navigateTo({
			url: '../xq/xq?id='+i.suId+"&idd="+i.productId
		});
	}
	onLoad((option)=>{
		xr(option.id)
		pl(option.idd)
	})
	
</script>

<style leng="scss">
	page{
		width: 100%;
		height:100%;
		background-color: rgb(244, 244, 244);
	}
	.box{
		width: 100%;
		height:100%;
		overflow: hidden;
		background-color:rgb(244, 244, 244);
	}
	.scrollbox{
		width: 100%;
		height: 90%;
		background-color:rgb(244, 244, 244);
	}
	.bottomtab{
		width: 100%;
		height: 10%;
		/* background-color: aqua; */
		display: flex;
		justify-content: space-between;
	}
	.pp1{
		width: 120rpx;
		height: 100%;
		text-align: center;
		padding-top: 30rpx;
		box-sizing: border-box;
		border-right: 1rpx solid #999;
		background-color: #fff;
	}
	.pp2{
		width: 45%;
		height: 100%;
		line-height: 120rpx;
		text-align: center;
		background-color: #fff;
	}
	.pp3{
		width: 45%;
		height: 100%;
		line-height: 120rpx;
		text-align: center;
		color: #fff;
		background-color: #7e4395;
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
	.ptwfbox{
		width: 100%;
		/* height: ; */
	}
	.ptwful{
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		display: flex;
		justify-content: space-between;
		padding:  0 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 20rpx;
	}
	.plbox{
		width: 100%;
		padding-bottom: 10rpx;
		background-color: #fff;
	}
	.pltop{
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		display: flex;
		justify-content: space-between;
		padding:  0 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 20rpx;
		border-bottom:1rpx solid #e1e1e1 ;
	}
	.plul{
		width: 100%;
		/* height: 228rpx; */
		padding: 0 20rpx; 
		box-sizing: border-box;
	}
	.plli1{
		display: flex;
		justify-content: space-between;
		line-height: 82rpx;
	}
	.plli2{
		font-size: 20rpx;
		color: #bbb;
	}
	.plli3{
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.tdbox{
		width: 100%;
		background-color: #fff;
		margin-top: 20rpx;
		padding:  0 20rpx;
		box-sizing: border-box;
	}
	.tdtop{
		width: 100%;
		height: 131rpx;
		display: flex;
		justify-content: space-between;
		line-height: 131rpx;
		font-size: 20rpx;
		border-bottom:1rpx solid #e1e1e1 ;
		/* background-color: #2dbb9f; */
	}
	.tdli1{
		width: 300rpx;
		height: 131rpx;
		/* background-color: #bbbbbb; */
		display: flex;
		justify-content: space-between;
		line-height: 90rpx;
		padding-top: 20rpx;
		box-sizing: border-box;
	}
	.tdlist{
		width: 100%;
		height: 370rpx;
		display: flex;
		/* justify-content: space-around; */
		white-space: nowrap;
		/* background-color: antiquewhite; */
		margin-top: 20rpx;
	}
	.tdlist_li{
		width: 200rpx;
		height: 370rpx;
		/* background-color: darkblue; */
		
		display: inline-block;
		font-size: 20rpx
	}
	.single-content {
	 	/* 文本不换行 */
	 	white-space: nowrap;
	    /* 超出隐藏 */
	    overflow: hidden;
	    /* 超出的文字省略号表示 */
	    text-overflow: ellipsis;
		margin-top: 20rpx;
	}
	.spms{
		width: 100%;
		padding:  0 20rpx;
		box-sizing: border-box;
		background-color: #eee;
	}
	.spms_ul{
		width: 100%;
		border-bottom: 1rpx solid #cfcfcf;
		display: flex;
		padding: 10rpx 0;
		
		box-sizing: border-box;
	}
	.spms_p1{
		width:50% ;
		min-height:65rpx;
		line-height: 65rpx;
		font-size: 25rpx
	}
	.spms_p2{
		width:50% ;
		min-height:65rpx;
		line-height: 65rpx;
		font-size: 20rpx
	}
	.imgs{
		padding: 0 20rpx;
		box-sizing: border-box;
	}

</style>