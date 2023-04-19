<template>
	<view class="box">
		<view class="search-input-container"><view class="search-input"></view></view>
		<view class="content">
			<view class="left">
				<scroll-view scroll-y class="left_scroll">
					<view
						v-for="(it, i) in list"
						:key="i"
						:class="[i == active && 'active', ' left_item']"
						@click="activecli(it.categoryId, i)"
					>
						{{ it.categoryName }}
					</view>
				</scroll-view>
			</view>
			<view class="right">
				<scroll-view scroll-y="true" class="right_scroll" v-if="list.length">
					<view class="right_tit">{{ list[0].categoryName }}</view>
					<view v-for="(it, i) in contlist" class="right_item">
						<view class="right_item_tit" @click="tolist(i, 0)">
							{{ it.categoryName }}
							<text style="float: right; margin-right: 30rpx;">></text>
						</view>
						<view class="right_item_cont">
							<view
								class="right_item_con_it"
								v-for="(con, n) in it.subCategoryList"
								@click="tolist(i, n)"
							>
								<image
									:src="con.imageUrl"
									mode=""
									style="width: 134rpx; height: 134rpx;"
								/>
								<view>{{ con.categoryName }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import { getTypeOne } from '@/api/api.js';
export default {
	data() {
		return {
			val: '',
			list: [],
			contlist: [],
			active: 0,
			id: 0
		};
	},
	onLoad() {
		this.getdata();
	},
	methods: {
		async getdata() {
			let res = await getTypeOne();
			console.log(res.listData[0].subCategoryList);
			this.list = res.listData;
			this.contlist = res.listData[0].subCategoryList;
			console.log();
		},
		activecli(act, i) {
			this.id = act;
			this.active = i;
			this.contlist = this.list[i].subCategoryList;
		},
		tolist(i, n) {
			console.log(i, n);
			uni.navigateTo({
				url:`/pages/classList/classList?one=${i}&two=${n}`
			})
		}
	}
};
</script>

<style scoped lang="scss">
@import './fenlei.scss';
</style>
