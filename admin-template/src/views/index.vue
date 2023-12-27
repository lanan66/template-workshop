<template>
	<div class="page_root" id="root_index">
		<div class="warp">
			<div class="container-fluid">
				<el-row>
<!--					<el-col :span="4">-->
<!--						<div_label bg_color="bg_blue" icon="el-icon-s-order" :url="url_order_count" unit="笔"-->
<!--								  title="待处理订单"></div_label>-->
<!--					</el-col>-->
<!--					<el-col :span="4">-->
<!--						<div_label bg_color="bg_yellow" icon="el-icon-sold-out" :url="url_goods_count" unit="件"-->
<!--								  title="出售商品"></div_label>-->
<!--					</el-col>-->
<!--					<el-col :span="4">-->
<!--						<div_label bg_color="bg_red" icon="el-icon-message" :url="url_message_count" unit="条"-->
<!--								  title="留言信息"></div_label>-->
<!--					</el-col>-->
<!--					<el-col :span="4">-->
<!--						<div_label bg_color="bg_cyan" icon="el-icon-money" :url="url_order_day_price" unit="元"-->
<!--								  title="日营业额"></div_label>-->
<!--					</el-col>-->
					<el-col :span="4">
						<div_label bg_color="bg_purple" icon="el-icon-user-solid" :url="url_user_count" unit="人"
								  title="用户数量"></div_label>
					</el-col>
<!--					<el-col :span="4">-->
<!--						<div_label bg_color="bg_green" icon="el-icon-view" :url="url_article_hits" unit="次"-->
<!--								  title="文章浏览量"></div_label>-->
<!--					</el-col>-->
				</el-row>

				<el-row>
					<!--<el-col :span="8">
						<div class="card chart">
							<pieChart v-if="list_goods_count.length" :list="list_goods_count" :title="'商品分类统计图'"
									  :type="'数量(占比)'"></pieChart>
							<div v-if="!list_goods_count.length">订单没有符合条件的数据</div>
						</div>
					</el-col>-->
					<!-- <el-col :span="8">
						<div class="card chart" >
							<barChart v-if="list_goods_sum.length" :list="list_goods_sum" :title="'累计销售额统计图'">
							</barChart>
							<div v-if="!list_goods_sum.length">订单没有符合条件的数据</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="card chart" >
							<lineChart v-if="list_goods_price.length" :list="list_goods_price" :title="'每日销售额统计图'">
							</lineChart>
							<div v-if="!list_goods_price.length">订单没有符合条件的数据</div>
						</div>
					</el-col> -->
									<el-col v-if="user_group == '管理员' || $check_figure('/customized_products/table')" :span="8">
						<div class="card chart">
																																																																																																											<pieChart v-if="list_customized_products.length" id="list_customized_products" :list="list_customized_products" :title="'定制商品统计'"></pieChart>
							<div v-if="!list_customized_products.length">定制商品没有符合条件的数据</div>
																													</div>
					</el-col>
							<el-col v-if="user_group == '管理员' || $check_figure('/i_want_to_customize/table')" :span="8">
						<div class="card chart">
									<newLineChart v-if="line_obj_i_want_to_customize.values.length > 0" id="line_obj_i_want_to_customize" :vm="line_obj_i_want_to_customize" :title="'我要定制统计'">
							</newLineChart>
							<div v-if="!line_obj_i_want_to_customize.values.length">我要定制没有符合条件的数据</div>
								</div>
					</el-col>
									<el-col v-if="user_group == '管理员' || $check_figure('/hot_selling_books/table')" :span="8">
						<div class="card chart">
									<newBarChart v-if="bar_obj_hot_selling_books.values.length > 0" id="bar_obj_hot_selling_books" :vm="bar_obj_hot_selling_books" :title="'热卖图书统计'">
							</newBarChart>
							<div v-if="!bar_obj_hot_selling_books.values.length">热卖图书没有符合条件的数据</div>
								</div>
					</el-col>
					</el-row>

	<div class="iframe_box" :style="{height: recognitionHeight}">
		<div class="iframe_box_top">
			智能识别系统
		</div>
		<div style="width:1155px;height:800px;overflow:hidden;border:0px; margin: 100px auto; position: relative;">
			<div style="margin:-530px -100px 0px -280px;position:relative"> #这里的position = relative 是必须的
				<iframe :src="recognitionUrl" id="ifyemian" scrolling="no" frameborder="0"
						style="position:absolute;
     width: 112%;
    height: 1323px;
     display:block;
     left: 0;
     right:0;">
				</iframe>
			</div>
		</div>
	</div>

				<div class="iframe_box_change">
					<div class="iframe_box_top">
						在线智能翻译
					</div>
					<iframe src="https://www.iciba.com/fy" class="iframe_box_content" frameborder="0"  scrolling="no" hspace="100" vspace="550"></iframe>
				</div>
				<div id ="outerdiv">
					<iframe src="https://news.sina.cn/zt_d/yiqing0121?from=singlemessage&isappinstalled=0" id ='inneriframe' scrolling="no"></iframe>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import mixin from "@/mixins/page.js";
	import pieChart from "@/components/charts/pie_chart";
	import newBarChart from "@/components/charts/new_bar_chart";
	import newLineChart from "@/components/charts/new_line_chart";
	import div_label from "@/components/div_label.vue";
	export default {
		mixins: [mixin],
		name: "Home",
		components: {
			pieChart,
			newBarChart,
			newLineChart,
			div_label
		},
		data() {
			return {
				activeName: "third",
				list_goods_count: [],
				list_goods_sum: [],
				list_goods_price: [],
											list_customized_products: [],
						line_obj_i_want_to_customize:{
					names:[],
					xAxis: [],
					values:[]
				},
										bar_obj_hot_selling_books: {
					names:[],
					xAxis: [],
					values:[]
				},
					url_order_count: "~/api/order/count?state=2",
				url_order_day_price: this.url_orderDayPrice(),
				url_goods_count: "~/api/goods/count?",
				url_message_count: "~/api/message/count?",
				url_user_count: "~/api/user/count?",
				url_article_hits: "~/api/article/sum?field=hits",
			};
		},
		created() {
							// 执行定制商品数据获取
			this.get_list_customized_products();
					// 执行我要定制数据获取
			this.get_list_i_want_to_customize();
							// 执行热卖图书数据获取
			this.get_list_hot_selling_books();
				this.get_goods_count();
			this.get_goods_sum_group();
			this.get_goods_sum_price();
		},
		mounted() {},
		methods: {
			async get_nickname(list,flag){
				if (flag) {
					for (let i=0;i<list.length;i++){
						await this.$get(
								"~/api/user/get_obj?user_id="+list[i],
								null,
								(json) => {
									if (json.result) {
										list[i] = json.result.obj.nickname;
									}
								});
					}
				}else {
					for (let i=0;i<list.length;i++){
						await this.$get(
								"~/api/user/get_obj?user_id="+list[i].name,
								null,
								(json) => {
									if (json.result) {
										list[i].name = json.result.obj.nickname;
									}
								});
					}
				}
			},
																																																																																// 获取定制商品统计图数据
			get_list_customized_products() {
				let data = {};
								let flag = false;
												let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
										let sqlwhere = "(";
																																																																																																													if (user_group=="卖家"){
						sqlwhere+= "seller = " + user_id + " or ";
					}
																																																																																																																										if (sqlwhere.length>1){
						sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
						sqlwhere += ")";
						data.sqlwhere = sqlwhere;
					}
									}
								this.$get("~/api/customized_products/list_group?groupby=product_category", data, (json) => {
					if (json.result) {
						var list = json.result.list;
						this.list_customized_products = list.map((o) => {
							return {
												name: o[1],
												value: o[0]
							};
						});
						if (flag){
							this.get_nickname(this.list_customized_products,false);
						}
					}
				});
			},
																				// 获取我要定制统计图数据
			async get_list_i_want_to_customize() {
																																																																										let group_by_value = "customized_categories";
				let data = {};
								let flag = false;
												let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
										let sqlwhere = "(";
																															if (user_group=="卖家"){
						sqlwhere+= "seller = " + user_id + " or ";
					}
																																																																if (user_group=="商城用户"){
						sqlwhere+= "mall_users = " + user_id + " or ";
					}
																																																																																																																																																				if (sqlwhere.length>1){
						sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
						sqlwhere += ")";
						data.sqlwhere = sqlwhere;
					}
									}
								await this.$get(
					"~/api/i_want_to_customize/get_list?groupby="+group_by_value,data,
					(json) => {
						if (json.result) {
							let list = json.result.list;
							let name_list = [];
							for (let i=0;i<list.length;i++){
								name_list.push(list[i].customized_categories);
							}
							this.line_obj_i_want_to_customize.names = name_list;
							this.get_list_i_want_to_customize_sub("customized_categories",flag);
						}
				});
																		},
			async get_list_i_want_to_customize_sub(v1,names_flag) {
																																																																					let data = {};
								let flag = false;
												let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
										let sqlwhere = "(";
																															if (user_group=="卖家"){
						sqlwhere+= "seller = " + user_id + " or ";
					}
																																																																if (user_group=="商城用户"){
						sqlwhere+= "mall_users = " + user_id + " or ";
					}
																																																																																																																																																				if (sqlwhere.length>1){
						sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
						sqlwhere += ")";
						data.sqlwhere = sqlwhere;
					}
									}
								await this.$get(
					"~/api/i_want_to_customize/get_list?groupby=required_date",data,
					(json) => {
						if (json.result) {
							let list = json.result.list;
							let xAxis_list = [];
							for (let i=0;i<list.length;i++){
												xAxis_list.push(this.$toTime(list[i].required_date ,"yyyy-MM-dd"));
											}
							this.line_obj_i_want_to_customize.xAxis = xAxis_list;
							this.get_list_i_want_to_customize_sub_sub(v1,"required_date",names_flag,flag);
						}
				});
																							},
			async get_list_i_want_to_customize_sub_sub(v1,v2,names_flag,xAxis_flag) {
																													let data_str = "{\""+v1+"\":\"\",\""+v2+"\":\"\"}";
				let data = JSON.parse(data_str);
								let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
										let sqlwhere = "(";
																																if (user_group=="卖家"){
							sqlwhere+= "seller = " + user_id + " or ";
						}
																																																																	if (user_group=="商城用户"){
							sqlwhere+= "mall_users = " + user_id + " or ";
						}
																																																																																																																																																					if (sqlwhere.length>1){
							sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
							sqlwhere += ")";
							data.sqlwhere = sqlwhere;
						}
									}
								for (let i=0;i<this.line_obj_i_want_to_customize.xAxis.length;i++){
					let list = []
					for (let j=0;j<this.line_obj_i_want_to_customize.names.length;j++){
						data[v2] = this.line_obj_i_want_to_customize.xAxis[i];
						data[v1] = this.line_obj_i_want_to_customize.names[j];
						await this.$get(
								"~/api/i_want_to_customize/sum?field=total_amount",
								data,
								(json) => {
									if (json.result) {
										list[j] = json.result;
									}else {
										list[j] = 0;
									}
								});
					}
					this.line_obj_i_want_to_customize.values.push(list)
				}
				if (names_flag){
					this.get_nickname(this.line_obj_i_want_to_customize.names,true);
				}
				if (xAxis_flag){
					this.get_nickname(this.line_obj_i_want_to_customize.xAxis,true);
				}
																																																															},
									// 获取热卖图书统计图
			async get_list_hot_selling_books() {
				let name_list = [];
				let query_str = "";
																																									let group_by_value = "product_category";
								let flag = false;
												let date_flag = "其他"
																														name_list.push("价格");
				query_str = query_str+"price"+","
																																									this.bar_obj_hot_selling_books.names = name_list
				query_str = query_str.substr(0,query_str.length-1);
				let data = {};
						let user_group = this.$store.state.user.user_group;
				let user_id = this.$store.state.user.user_id;
				if (user_group!='管理员'){
								let sqlwhere = "(";
																																																																																																												if (sqlwhere.length>1){
						sqlwhere = sqlwhere.substr(0,sqlwhere.length-4);
						sqlwhere += ")";
						data.sqlwhere = sqlwhere;
					}
							}
						await this.$get(
						"~/api/hot_selling_books/bar_group?field="+query_str+"&groupby="+group_by_value,
						data,
						(json) => {
							if (json.result) {
								let xAxis = [];
								let values = [];
								json.result.list.map((o) => {
									if (date_flag === "日期") {
										xAxis.push(this.$toTime(o[0] ,"yyyy-MM-dd"));
									}else if (date_flag === "时间") {
										xAxis.push(this.$toTime(o[0] ,"hh:mm:ss"));
									}else if (date_flag === "日长") {
										xAxis.push(this.$toTime(o[0] ,"yyyy-MM-dd hh:mm:ss"));
									}else {
										xAxis.push(o[0]);
									}
									values.push(o.splice(1))
								});
								this.bar_obj_hot_selling_books.xAxis = xAxis;
								this.bar_obj_hot_selling_books.values = values;
							}
							if (flag){
								this.get_nickname(this.bar_obj_hot_selling_books.xAxis,true);
							}
						});
			},
	
			// 获取商品数量分类统计图
			get_goods_count() {
				this.$get("~/api/goods/count_group?groupby=type", null, (json) => {
					if (json.result) {
						var list = json.result.list;
						this.list_goods_count = list.map((o) => {
							return {
								name: o.type,
								value: o.count,
							};
						});
					}
				});
			},

			// 获取销量七天报
			get_goods_sum_group() {
				for (var i = 6; i >= 0; i--) {
					this.get_goods_sum_group_sub(this.list_goods_sum, i);
				}
			},

			// 获取X天销量
			async get_goods_sum_group_sub(list, day) {
				var now = new Date();
				var time = now.addDays(-day).toStr("yyyy-MM-dd");
				var $where = ""
				if (this.user.user_group != "管理员") 
				$where = '&merchant_id=' + this.user.user_id + "&like = true"
				await this.$get(
						`~/api/order/sum_group?field=price&groupby=type&create_time_min=${time} 00:00:00&create_time_max=${time} 23:59:59` + $where,
						null,
						(json) => {
							if (json.result) {
								json.result.forEach((o) => {
									list.push({
										time,
										value: o.sum,
										name: o.type,
									})
								});
							}
						});
			},

			// 获取销售七天报
			get_goods_sum_price() {
				for (var i = 6; i >= 0; i--) {
					this.get_goods_sum_price_sub(this.list_goods_price, i);
				}
			},

			// 获取X天销售
			async get_goods_sum_price_sub(list, day) {
				var now = new Date();
				var time = now.addDays(-day).toStr("yyyy-MM-dd");
				var $where = ""
				if (this.user.user_group != "管理员") 
				$where = '&merchant_id=' + this.user.user_id + "&like = true"
				await this.$get(
						`~/api/order/sum_group?field=price_count&groupby=type&create_time_min=${time} 00:00:00&create_time_max=${time} 23:59:59` + $where,
						null,
						(json) => {
							if (json.result) {
								json.result.forEach((o) => {
									list.push({
										time,
										value: o.sum,
										name: o.type,
									})
								});
							}
						}
				);
			},

			// 获取当天销售额
			url_orderDayPrice() {
				var date = new Date();
				// 获取当前日期
				var time = date.toStr("yyyy-MM-dd");
				var create_time_min = time + " 00:00:00";
				var create_time_max = time + " 23:59:59";
				var ret = "~/api/order/sum?field=price_count&create_time_min=" + create_time_min + "&create_time_max=" +
						create_time_max;
				return ret;
			},
		},
		computed:{
			recognitionHeight(){
				return "830px"
			},
			recognitionUrl(){
				return "https://www.faceplusplus.com.cn/face-comparing/"
			}
		}
	};
</script>

<style scoped="scoped">
	.chart {
		display: block;
		width: 100%;
		height: 400px;
		padding: 1rem;
		position: relative;
	}

	.el-col {
		padding: 0.5rem;
	}

	.card {
		overflow: hidden;
	}

	.iframe_box ,.iframe_box_change{
		width: 100%;
		height: 1180px;
		position: relative;
		margin-top: 25px;
	}
	.iframe_box_change{
		height: 580px;
		padding-top: 50px;
	}
	.iframe_box	.iframe_box_content, .iframe_box_change .iframe_box_content{
		width: 100%;
		height: 100%;
	}
	.iframe_box_top{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100px;
		font-size: 25px;
		line-height: 100px;
		background: #fff;
		z-index: 99999999;
		padding-left: 50px;
	}
	#iframe_box_face div::before {
		content: '';
		width: 100px;
		position: absolute;
		top: 154px;
		right: 129px;
		z-index: 999;
		height: 20px;
		background-color: #FFFFFF;
	}

	#iframe_box_face>h1 {
		margin-top: 100px;
		margin-bottom: 20px;
	}
	#outerdiv
	{
		margin: 0 auto;
		width:1000px;
		height:1800px;
		overflow:hidden;
		position:relative;
	}

	#inneriframe
	{
		position:absolute;
		top:0px;
		left:0px;
		width:1350px;
		height:2000px;
	}
</style>
