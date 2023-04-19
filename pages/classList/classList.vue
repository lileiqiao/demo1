<template>
	<view class="box">
		<view class="nav">
			<scroll-view
				scroll-x="true"
				class="class_scroll"
				enhanced="true"
				show-scrollbar="{{false}}"
			>
				<text
					v-for="(it, i) in classList"
					:class="[i == active && 't', ' iten_class']"
					@click="classCli(i, it.id)"
				>
					{{ it.text }}
				</text>
			</scroll-view>
		</view>
		<scroll-view
			@scroll="scroll"
			:scroll-top="scrollTop"
			class="cont"
			scroll-y
			style="height: 80vh;"
			@scrolltolower="dibu"
		>
			<view class="cont_item_box" v-for="item in contList">
				<view
					class="cont_item"
					v-for="it in item.data"
					@click="toDtl(it.routerParams.suId)"
				>
					<image :src="it.image" style="width: 374rpx; height: 374rpx;" mode="" />
					<view class="shop-show">
						<view class="price">￥{{ it.priceStr }}</view>
						<view class="labels">
							<text
								class="icon_font"
								:style="{
									color: font.textColor,
									border: '1.5rpx solid ' + font.roundColor,
									background: font.color
								}"
								v-for="font in it.labels"
							>
								{{ font.content }}
							</text>
						</view>
						<view class="zzs">{{ it.subtitle.split('|')[0] }}</view>
						<view class="tit">{{ it.mainTitle }}</view>
						<view class="ping">{{ it.thirdContent }}</view>
					</view>
				</view>
			</view>
			<view class="goTop" @click="goTop" v-if="flag">↑</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTypeOne, getlist } from '@/api/api.js';
let classList = ref([]);

let active = ref(0);
let id = ref(0);
let page = ref(1);
let contList = ref([]);
let flag = ref(false);

let scrollTop = ref(0);

let getdata = async (x, i, n) => {
	let res = await getTypeOne();
	console.log(x, i, n);
	// 点tit过来的显示全部底层分类
	if (n < 0) {
		// console.log(res.listData[x].categoryName);
		let tit = await res.listData[x].categoryName;
		uni.setNavigationBarTitle({
			title: tit
		});
		res.listData[x].subCategoryList.forEach(el => {
			// console.log(el);
			el.subCategoryList.forEach(en => {
				classList.value.push({ text: en.categoryName, id: en.categoryId });
			});
		});
	} else {
		res.listData[x].subCategoryList[i].subCategoryList.forEach(en => {
			classList.value.push({ text: en.categoryName, id: en.categoryId });
		});
		active.value = n;
		id.value = res.listData[x].subCategoryList[i].subCategoryList[n].categoryId;
		// console.log(res.listData[x].subCategoryList[i].subCategoryList[n].categoryId);
		let tit = await res.listData[x].subCategoryList[i].categoryName;
		uni.setNavigationBarTitle({
			title: tit
		});
	}
	getList();
};
let getList = async () => {
	let res = await getlist({ pageIndex: page.value, ryId: id.value });
	console.log(res.data.blockList[0].block);
	contList.value.push(...res.data.blockList[0].block);
};
// 点击分类
let classCli = (act, i) => {
	// console.log(act, i);
	active.value = act;
	id.value = i;
	// console.log(id.value);
	contList.value = [];
	getList();
};
// 触底
let dibu = () => {
	// console.log(111111);
	page.value++;
	getList();
};
// 返回顶部
let goTop = () => {
	console.log(2222);
	scrollTop.value = 0;
};
// 滚动
let scroll = e => {
	// console.log(e.detail.scrollTop);
	scrollTop.value = e.detail.scrollTop;
	if (e.detail.scrollTop > 300) {
		flag.value = true;
	} else {
		flag.value = false;
	}
};
// 跳详情
let toDtl = id => {
	console.log(id);
	uni.navigateTo({
		url: '/pages/xq/xq?id=' + id
	});
};
onLoad(Option => {
	console.log(Option);
	getdata(Option.i, Option.one, Option.two);
});
</script>

<style lang="scss" scoped>
@import './classList.scss';
</style>
