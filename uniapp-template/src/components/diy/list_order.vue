<template>
	<view class="list_order">

		<view class="item_order" v-for="(o,i) in list" :key="i">
			<view class="state" style="">
				{{ o.state }}
			</view>
			<view class="goods_list" v-for="(obj,idx) in o.list" :key="idx">
				<navigator :url="'./details?order_number='+o.order_number" class="item_goods flex_sbc">
					<view class="img_block">
						<image style="width: 4.5rem;height:4.5rem;" :src="$fullImgUrl(obj[vm.img]) || '../../static/img/default.png'" mode="scaleToFill">
						</image>
					</view>
					<view class="middle_info">
						<view class="title ellipsis_2">
							{{obj[vm.title]}}
						</view>
						<view class="time flex_column">
							<text>订单提交成功</text>
							<text>{{$toTime(o.create_time,"yyyy-MM-dd hh:mm:ss")}}</text>
						</view>
					</view>

					<view class="num_info flex_column">
						<view class="price">
							￥{{obj[vm.price]}}
						</view>
						<view class="num">
							×{{obj[vm.num]}}
						</view>
					</view>
				</navigator>

			</view>
			<view style="display: flex;justify-content: space-between;">
			</view>
			<view class="bottom_order flex_sbc">
				<view class="sum_price_block flex_cc">
					<text style=" font-size: 0.9rem;color: #000000;">需付款：</text>
					<text style="color: var(--color_red)">￥{{o.sum_price}}</text>
				</view>

				<view class="btn_block">
					<view @click="del_order(o.order_number,i)" v-if="$check_action('/order/list','del')"
						class="btn_del">删除订单</view>
<!--					<view class="btn_ps" @click="addLogi(o)" v-if="(user_group == '管理员' || user_group == '卖家') && o.state == '已付款'">配送</view>-->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			vm: {
				type: Object,
				default: function() {
					return {
						order_number: "order_number",
						title: "title",
						img: "img",
						price: "price",
						price_ago: "price_ago",
						price_count: "price_count",
						num: "num",
						goods_id: "goods_id",
						description: "description",
						contact_name: "contact_name",
						contact_phone: "contact_phone",
						contact_address: "contact_address",
						postal_code: "postal_code",
						user_id: "user_id",
						state: "state"
					}
				}
			}
		},
		data() {
			return {
				user_group: this.$store.state.user.user_group
			}
		},
		methods: {
			// 删除订单
			del_order(order_number, i) {
				this.$get("~/api/order/del", {
					order_number
				}, (res) => {
					this.list.splice(i, 1)
				})
			}
			// ,addLogi(data) {
			// 	console.log("qwe")
			// 	var today = new Date();
			// 	var year = today.getFullYear();
			// 	var month = today.getMonth() + 1;
			// 	var day = today.getDate();
			// 	var currentDate = year + "/" + month + "/" + day
			// 	var postData = {
			// 		"order_number":data.order_number
			// 		,"product_name":data.title
			// 		,"purchase_quantity":data.num
			// 		,"total_transaction_amount":data.price_count
			// 		,"the_date_of_issuance":currentDate
			// 		,"seller":0
			// 		,"store_name":""
			// 		,"store_address":""
			// 		,"shipping_address":data.contact_address
			// 		,"delivery_status":"待取货"
			// 		,"signing_status":"待签收"
			// 		,"logistics_delivery_id":0
			// 		,"contact_name":data.contact_name
			// 		,"merchant_id":data.merchant_id
			// 		,"ordinary_users":data.user_id
			// 		,"delivery_number":Number(Math.random().toString().substr(3,12) + Date.now()).toString(36)
			// 	}
			// 	this.$post("~/api/logistics_delivery/add?", postData, (json, status) => {
			// 		if (json.result) {
			// 			this.$toast('添加成功！', 'success');
			//             setTimeout(() => {
			//                 uni.navigateTo({
			//                 	url: '/pages/logistics_delivery/table'
			//                 })
			//             }, 2000)
			// 		} else if (json.error) {
			// 			this.$toast(json.error.message, 'danger');
			// 		}
			// 	});
			// }
			
		},
		computed: {},
		mounted(){
		}
	}
</script>

<style scoped>
	.ellipsis_2 {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.flex_cc {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flex_sbc {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.item_order {
		background-color: #FFFFFF;
		padding: 0.4rem 0.8rem;
		margin-bottom: 0.8rem;
	}

	.item_order .state {
		text-align: right;
		color: var(--color_primary);
		border-bottom: 2px solid #f8f8f8;
		padding-bottom: 0.5rem;
	}

	.goods_list {}

	.goods_list .item_goods {
		position: relative;
		align-items: stretch;
		padding: 0.7rem 0.2rem;
		border-bottom: 1px solid #f4f4f4;
	}

	.goods_list .img_block {
		padding: 0.2rem;
	}

	.goods_list .middle_info {
		position: relative;
		width: calc(100% - 8rem);
	}

	.goods_list .time {
		position: absolute;
		bottom: 0;
		left: 0;
		font-size: 0.5rem;
		color: var(--color_grey);
	}

	.goods_list .title {
		font-size: 0.9rem;
		min-height: 1.4rem;
	}

	.goods_list .description {
		color: var(--color_grey);
		font-size: 0.6rem
	}

	.goods_list .num_info {
		text-align: right;
	}

	.goods_list .price {
		color: var(--color_grey);
		font-size: 0.7rem;
	}

	.goods_list .num {
		color: var(--color_grey);
		font-size: 0.7rem;
	}

	.bottom_order {}

	.bottom_order .sum_price_block {
		padding: 0.4rem 0;
	}

	.btn_del, .btn_ps {
		font-size: 0.8rem;
		width: 4.8rem;
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
		margin: 0;
		border: 1px solid #818181;
		color: #818181;
		border-radius: 4px;
		transform: scale(0.5rem);
		border-radius: 20px;
	}
</style>
