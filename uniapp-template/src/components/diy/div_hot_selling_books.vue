<template>
	<view class="diy_details diy_div_hot_selling_books">
		<view v-if="Object.keys(obj).length!==0" class="warp">
			<view class="container">
				<view class="row">
					<view v-if="$check_field('get','book_number')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>图书编号:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["book_number"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','book_name')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>图书名称:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["book_name"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','cover')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>封面:</span>
						</view>
							<view class="diy_field diy_img">
							<image style="width:100%;height:auto;" :src="$fullUrl(obj['cover'])" mode="widthFix"></image>
						</view>
						</view>
					<view v-if="$check_field('get','author')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>作者:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["author"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','product_category')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>商品类别:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["product_category"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','inventory')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>库存:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["inventory"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','price')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>价格:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["price"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','brief_introduction')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>简介:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["brief_introduction"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','edit')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>编辑:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["edit"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','category')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>类别:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["category"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','customized_categories')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>定制类别:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["customized_categories"]}}
							</text>
						</view>
						</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import mixin from "@/libs/mixins/component.js";
	export default {
		mixins: [mixin],
		props: {
			obj_goods: {
				type: Object,
				default(){
					return {}
				}
			},
			query:{
				type: Object,
				default(){
					return {
						hot_selling_books_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
														}
		},
		methods: {
			async get_obj_goods_type() {
				var res = await this.$get(getApp().globalData.host + "/api/goods_type/get_obj", {
					name: this.obj_goods.type
				})

				if (res.result.obj) {
					this.obj_goods_type = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
			async get_obj_by_goods() {
				var {
					source_table,
					source_field
				} = this.obj_goods_type
				var {
					source_id
				} = this.obj_goods
				var query = {}
				query[source_field] = source_id
				this.$get(getApp().globalData.host + "/api/" + source_table + "/get_obj", {}, (res) => {
					if (res.result.obj) {
						this.obj = res.result.obj
					} else {
						console.log("没有请求到商品分类");
					}
				})
			},
			async get_obj_by_id(){
				var res = await this.$get(getApp().globalData.host + "/api/hot_selling_books/get_obj", {
					hot_selling_books_id:this.query.hot_selling_books_id
				})

				if (res.result && res.result.obj) {
					this.obj = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
													},
		created() {
													},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["hot_selling_books_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_hot_selling_books_details {}

	.details {
		background-color: #fff;
		margin-bottom: 0.5rem;
		padding: 1rem;
		font-size: 10px;
	}

	.item {
		display: flex;
		padding: 0.2rem 0;
		border-bottom: 1px solid #eee;
	}

	.left_text {
		flex: 0 0 25%;
	}

	.right_text {
		flex: 0 0 75%;
	}
	.edit_nav{
		text-align: center;
		background-color: #fff;
		padding: 0.3rem;
		margin: 0.1rem 1rem;
		border: 1px solid #eee;
		border-radius: 0.5rem;
	}
</style>
