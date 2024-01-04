<template>
	<view class="list_i_want_to_customize list_com--new" style="background-color: #fff;">
		<!-- 视图 -->
		<view class="i_want_to_customize_block box_wrap" >
			<navigator class="item_i_want_to_customize box_style" v-for="(o, i) in list"  :key="i" :url="'/pages/i_want_to_customize/details?i_want_to_customize_id=' + o['i_want_to_customize_id']">
					<view class="view" v-if="0 && $check_index_field('get','product_name','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>商品名称</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["product_name"] }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','seller','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>卖家</span>
					</view>
							<view class="diy_field time" >
						<span>{{ get_user_seller(o['seller']) }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','purchase_quantity','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>购买数量</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["purchase_quantity"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','price','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>价格</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["price"] }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','total_amount','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>总金额</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["total_amount"] }}</span>
					</view>
						</view>
						<view class="view" v-if="1 && $check_index_field('get','mall_users','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>商城用户</span>
					</view>
							<view class="diy_field time" >
						<span>{{ get_user_mall_users(o['mall_users']) }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','customization_requirements','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>定制要求</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["customization_requirements"] }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','related_images','/i_want_to_customize/list')">
					<view class="title" v-if=" false">
						<span>相关图片</span>
					</view>
							<view class="diy_field image" >
						<image style="width:100%;height: 5rem;" :src="$fullUrl(o['related_images']) || '/static/img/default.png'" mode="scaleToFill" />
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','completion_time','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>完成时间</span>
					</view>
							<view class="diy_field time" >
						<span>{{ $toTime(o["completion_time"] ,"yyyy-MM-dd hh:mm:ss") }}</span>
					</view>
						</view>
												<view class="view" v-if="0 && $check_index_field('get','required_date','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>要求日期</span>
					</view>
							<view class="diy_field time" >
						<span>{{ $toTime(o["required_date"] ,"yyyy-MM-dd") }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','customized_categories','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>定制类别</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["customized_categories"] }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','customization_details','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>定制详情</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["customization_details"] }}</span>
					</view>
						</view>
						<view class="view" v-if="0 && $check_index_field('get','pickup_category','/i_want_to_customize/list')">
					<view class="title" v-if="true">
						<span>取货类别</span>
					</view>
							<view class="diy_field text" >
						<span>{{ o["pickup_category"] }}</span>
					</view>
						</view>
					<view class="bottom-view">
				</view>
				<view class="view">
					<view class="create_time_block diy_field number">
						<span>{{ $toTime(o["create_time"],"yyyy-MM-dd hh:mm:ss") }}</span>
					</view>
				</view>
			</navigator>
		</view>
		<!-- /视图 -->
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			}
		},
		data() {
			return {
						// 用户列表
				list_user_seller: [],
									// 用户列表
				list_user_mall_users: [],
														}
		},
		methods: {
			/**
			 *  跳转链接
			 *  @param {Object} id
			 */
			to_nav(id) {
				this.$nav('/pages/i_want_to_customize/details?i_want_to_customize_id=' + id)
			},
					/**
			 * 获取卖家用户列表
			 */
			async get_list_user_seller() {
				var json = await this.$get("~/api/user/get_list?user_group=卖家");
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
				var json = await this.$get("~/api/user/get_list?user_group=商城用户");
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
													}
	}
</script>

<style scoped>
	.list_i_want_to_customize {
		/* padding: 0 1rem; */
		margin-bottom: 1rem;
	}

	.list_i_want_to_customize .list_i_want_to_customize_table {
		width: 100%;
		padding: 5px 0;
	}

	.list_i_want_to_customize .list_i_want_to_customize_table .btn_change_table {
		margin-left: auto;
		font-weight: bold;
		padding: 0.5rem 0;
		width: 100px;
		text-align: center;
		font-size: 0.875rem;
		border: 1px solid #CCCCCC;
		border-radius: 1rem;
		margin-bottom: 0.25rem;
	}

	.list_i_want_to_customize .list_i_want_to_customize_table .i_want_to_customize_table_block .uni-table-td{
		padding: 8px;
	}

	.list_i_want_to_customize .list_i_want_to_customize_table .i_want_to_customize_table_block .image {
		width: 10%;
	}

	.list_i_want_to_customize .list_i_want_to_customize_table .i_want_to_customize_table_block .text {
		overflow: hidden;
		width: 30%;
		font-size: 0.5rem;
	}

	.list_i_want_to_customize .list_i_want_to_customize_table .i_want_to_customize_table_block .hits {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_i_want_to_customize .list_i_want_to_customize_table .i_want_to_customize_table_block .praise {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_i_want_to_customize .list_i_want_to_customize_table .i_want_to_customize_table_block .create_time {
		width: 26%;
		font-size: 0.5rem;
	}
	.list_i_want_to_customize .item_i_want_to_customize {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		padding: 0.75rem 1rem;

	}
	.list_i_want_to_customize .item_i_want_to_customize+.item_i_want_to_customize{
		border-top: 1px solid #dbdbdb;
	}
	.list_i_want_to_customize .item_i_want_to_customize .left>image {
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		border-radius: 0.5rem;
	}

	.list_i_want_to_customize .item_i_want_to_customize .right_block {
		width: calc(100% - 5rem);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.list_i_want_to_customize .top {
		font-size: 0.9rem;
	}


	.list_i_want_to_customize .time {
		font-size: 0.6rem;
		color: var(--color_grey)
	}

	.list_i_want_to_customize .bottom {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 0.5rem;
		color: var(--color_grey)
	}

	.list_i_want_to_customize .see {
		margin-left: 1rem;
	}
	.box_wrap{
		padding: 0.75rem;
	}
	.box_style{
		margin-bottom: 0.75rem;
		padding: 0.375rem;
		display: inline-block !important;
		border: 0.075rem solid #ccc;
		border-radius: 0.375rem;
		overflow: hidden;
	}
	.box_style:nth-child(even){
		margin-left: 0.60rem;
	}
	.box_style:nth-child(even){
		margin-left: 0.60rem;
	}
	.bottom-view,.create_time_block{
		font-size: 12px;
		color: #666666;
	}
	.bottom-view view{
		display: inline-block;
	}
	.bottom-view span{
		margin-left: 5px;
		margin-right: 10px;
	}
/* new style start */
	.list_com--new .box_wrap{
		display: flex;
		flex-wrap: wrap;
		padding-left: 0 !important;
		padding-right: 0 !important;
		justify-content: space-between;
	}
	.list_com--new .box_style:nth-child(even) {
    	margin-left: 0 !important;
	}
    .list_com--new .box_wrap .box_style{
		display: inline-block !important;
		width: 48%;
		max-width: 48%;
		overflow: hidden;
		border-color: var(--color_primary);
		box-sizing: border-box;
		padding:8px!important;
    }
    .list_com--new .view{
        display: flex;
        overflow: hidden;
		width:100%;
    }

    .list_com--new .view .title span{
       white-space: nowrap;
    }
    .list_com--new .view .text{
        display: flex;
        color: var(--color_primary);
        margin-left: 10px;
        border-bottom: 1px solid #ccc;
        white-space: nowrap;
    }
     .list_com--new .view .text span{
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

     .list_com--new .view .number{
        color: var(--color_primary);
    }

    .list_com--new .view .image{
        width: 100%;
        border-bottom: 1px solid #ccc;
		margin-top:5px;
    }

	.list_com--new .diy_field.text{
		overflow: hidden;
		margin-right: -8px;
	}

/* new style start */

</style>

