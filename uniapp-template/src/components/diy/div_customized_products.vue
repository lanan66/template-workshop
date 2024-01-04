<template>
	<view class="diy_details diy_div_customized_products">
		<view v-if="Object.keys(obj).length!==0" class="warp">
			<view class="container">
				<view class="row">
					<view v-if="$check_field('get','product_name')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>商品名称:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["product_name"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','inventory')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>库存:</span>
						</view>
							<view class="diy_field diy_number">
							<text>
								{{ obj["inventory"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','attachment')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>附件:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["attachment"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','picture')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>图片:</span>
						</view>
							<view class="diy_field diy_img">
							<image style="width:100%;height:auto;" :src="$fullUrl(obj['picture'])" mode="widthFix"></image>
						</view>
						</view>
					<view v-if="$check_field('get','video')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>视频:</span>
						</view>
							<view class="diy_field diy_video">
							<router-link :to="'/media/video?filename=' + obj['video']" v-if="obj['video']" >
								<text>
									查看视频
								</text>
							</router-link>
						</view>
						</view>
					<view v-if="$check_field('get','audio_frequency')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>音频:</span>
						</view>
							<view class="diy_field diy_music">
							<audio v-if="obj['audio_frequency']" style="text-align: left" :src="$fullUrl(obj['audio_frequency'])" controls></audio>
						</view>
						</view>
					<view v-if="$check_field('get','remarks')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>备注:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["remarks"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','seller')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>卖家:</span>
						</view>
							<view class="diy_field diy_uid">
							<text>
								{{ get_user_seller(obj['seller']) }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','price')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>价格:</span>
						</view>
							<view class="diy_field diy_number">
							<text>
								{{ obj["price"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','details')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>详情:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["details"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','production_time')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>生产时间:</span>
						</view>
							<view class="diy_field diy_datetime">
							<text>
								{{ $toTime(obj["production_time"],"yyyy-MM-dd hh:mm:ss") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','date')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>日期:</span>
						</view>
							<view class="diy_field diy_date">
							<text>
								{{ $toTime(obj["date"],"yyyy-MM-dd") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','is_it_a_special_offer')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>是否特价:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["is_it_a_special_offer"]}}
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

			<view class="warp">
			<view class="container">
				<view class="row">
					<view class="col">
						<button type="button" class="diy_btn" @click="to_form('/pages/i_want_to_customize/edit')" v-if="$check_action('/i_want_to_customize/edit','add') || $check_action('/i_want_to_customize/edit','set')" >定制</button>
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
						customized_products_id: 0
					}
				}
			}
		},
		data() {
			return {
				obj_goods_type: {},
				obj: {},
												// 用户列表
				list_user_seller: [],
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
				var res = await this.$get(getApp().globalData.host + "/api/customized_products/get_obj", {
					customized_products_id:this.query.customized_products_id
				})

				if (res.result && res.result.obj) {
					this.obj = res.result.obj
				} else {
					console.log("没有请求到商品分类");
				}
			},
											/**
			 * 获取卖家用户列表
			 */
			async get_list_user_seller() {
				var json = await this.$get(getApp().globalData.host + "/api/user/get_list?user_group=卖家");
				if(json.result && json.result.list){
					this.list_user_seller = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_seller(id){
				let obj = this.list_user_seller;
				let ret = "";
				for(let i=0;i<obj.length;i++){
					if(obj[i].user_id==id){
						ret = obj[i].nickname+"-"+obj[i].username;
					}
				}
				return ret;
			},
											},
		created() {
											this.get_list_user_seller();
											},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["customized_products_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_customized_products_details {}

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
