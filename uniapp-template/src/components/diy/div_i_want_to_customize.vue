<template>
	<view class="diy_details diy_div_i_want_to_customize">
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
					<view v-if="$check_field('get','purchase_quantity')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>购买数量:</span>
						</view>
							<view class="diy_field diy_number">
							<text>
								{{ obj["purchase_quantity"] }}
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
					<view v-if="$check_field('get','total_amount')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>总金额:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["total_amount"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','mall_users')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>商城用户:</span>
						</view>
							<view class="diy_field diy_uid">
							<text>
								{{ get_user_mall_users(obj['mall_users']) }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','customization_requirements')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>定制要求:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["customization_requirements"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','related_images')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>相关图片:</span>
						</view>
							<view class="diy_field diy_img">
							<image style="width:100%;height:auto;" :src="$fullUrl(obj['related_images'])" mode="widthFix"></image>
						</view>
						</view>
					<view v-if="$check_field('get','completion_time')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>完成时间:</span>
						</view>
							<view class="diy_field diy_datetime">
							<text>
								{{ $toTime(obj["completion_time"],"yyyy-MM-dd hh:mm:ss") }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','related_attachments')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>相关附件:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["related_attachments"]}}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','customized_video')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>定制视频:</span>
						</view>
							<view class="diy_field diy_video">
							<router-link :to="'/media/video?filename=' + obj['customized_video']" v-if="obj['customized_video']" >
								<text>
									查看视频
								</text>
							</router-link>
						</view>
						</view>
					<view v-if="$check_field('get','customized_audio')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>定制音频:</span>
						</view>
							<view class="diy_field diy_music">
							<audio v-if="obj['customized_audio']" style="text-align: left" :src="$fullUrl(obj['customized_audio'])" controls></audio>
						</view>
						</view>
					<view v-if="$check_field('get','required_date')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>要求日期:</span>
						</view>
							<view class="diy_field diy_date">
							<text>
								{{ $toTime(obj["required_date"],"yyyy-MM-dd") }}
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
					<view v-if="$check_field('get','customization_details')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>定制详情:</span>
						</view>
							<view class="diy_field diy_desc">
							<text>
								{{ obj["customization_details"] }}
							</text>
						</view>
						</view>
					<view v-if="$check_field('get','pickup_category')" class="col-12 col-md-6">
						<view class="diy_title">
							<span>取货类别:</span>
						</view>
							<view class="diy_field diy_text">
							<text>
								{{obj["pickup_category"]}}
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
						i_want_to_customize_id: 0
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
									// 用户列表
				list_user_mall_users: [],
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
				var res = await this.$get(getApp().globalData.host + "/api/i_want_to_customize/get_obj", {
					i_want_to_customize_id:this.query.i_want_to_customize_id
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
								/**
			 * 获取商城用户用户列表
			 */
			async get_list_user_mall_users() {
				var json = await this.$get(getApp().globalData.host + "/api/user/get_list?user_group=商城用户");
				if(json.result && json.result.list){
					this.list_user_mall_users = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_mall_users(id){
				let obj = this.list_user_mall_users;
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
								this.get_list_user_mall_users();
													},
		async onLoad(){
			if (Object.keys(this.obj_goods).length !== 0) {
				await this.get_obj_goods_type();
				await this.get_obj_by_goods();
			} else if (this.query["i_want_to_customize_id"] !==0) {
				await this.get_obj_by_id();
			}
		}
	}
</script>

<style scoped>
	.div_i_want_to_customize_details {}

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
