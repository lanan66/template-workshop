<template>
	<div class="page_user my_home" id="user_address">
		<div class="warp">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-12 col-md-3">
						<div class="card_menu">
							<!-- 左侧边栏 -->
						</div>
					</div>
					<div class="col-12 col-md-9">
						<div class="card_addres pl-2">
							<div class="warp">
								<div class="container-fluid">
									<div class="d-row-line">
										<div style="text-align: center;">数据统计中心</div>
									</div>
									<div class="d-row" style="height: 300px;">
																			<view class="d-col" v-if="user_group == '管理员' || $check_figure('/order/table')" :span="8">
											<div class="card chart">
												<h5 class="title">销售金额统计图</h5>
												<uni-datetime-picker v-model="line_obj_shop_money.month"
																	 type="daterange" @change="changeMonth($event, line_obj_shop_money)" :disabled="line_obj_shop_money.loading"/>
												<div style="margin-top: 10px;">销售金额总数：{{line_obj_shop_money.total}}</div>
												<newLineChart v-if="line_obj_shop_money.values.length > 0"
															  id="line_shop_money_chart" :vm="line_obj_shop_money"
															  :title="'销售金额统计'">
												</newLineChart>
												<div v-else style="text-align: center;margin-top: 20px;">正在加载数据...请稍后</div>
											</div>
										</view>
										<view class="d-col" v-if="user_group == '管理员' || $check_figure('/order/table')" :span="8">
											<div class="card chart">
												<h5 class="title">销售数量统计图</h5>
												<uni-datetime-picker v-model="bar_obj_shop_num.month"
																	 type="daterange" @change="changeMonth($event, bar_obj_shop_num)" :disabled="bar_obj_shop_num.loading"/>
												<div style="margin-top: 10px;">销售数量总数：{{bar_obj_shop_num.total}}</div>
												<newBarChart v-if="bar_obj_shop_num.values.length > 0"
															 id="bar_obj_bar_chart" :vm="bar_obj_shop_num" :title="'销售数量统计'">
												</newBarChart>
												<div v-else style="text-align: center;margin-top: 20px;">正在加载数据...请稍后</div>
											</div>
										</view>
																																																																																																			<view class="d-col" v-if="user_group == '管理员' || $check_figure('/customized_products/table')" :span="8">
															<div class="card chart">
																																																																																																																																																																																																																																																																																																																																																																																									<h5 class="title">定制商品统计图</h5>
																<pieChart v-if="list_customized_products.length" id="list_customized_products" :list="list_customized_products" :title="'定制商品统计'"></pieChart>
																<div v-if="!list_customized_products.length">定制商品没有符合条件的数据</div>
																																																																																																					</div>
														</view>
																																											<view class="d-col" v-if="user_group == '管理员' || $check_figure('/i_want_to_customize/table')" :span="8">
															<div class="card chart">
																											<h5 class="title">我要定制统计图</h5>
																<newLineChart v-if="line_obj_i_want_to_customize.values.length > 0" id="line_obj_i_want_to_customize" :vm="line_obj_i_want_to_customize" :title="'我要定制统计'">
																</newLineChart>
																<div v-if="!line_obj_i_want_to_customize.values.length">我要定制没有符合条件的数据</div>
																										</div>
														</view>
																																																																																	<view class="d-col" v-if="user_group == '管理员' || $check_figure('/hot_selling_books/table')" :span="8">
															<div class="card chart">
																											<h5 class="title">热卖图书统计图</h5>
																<newBarChart v-if="bar_obj_hot_selling_books.values.length > 0" id="bar_obj_hot_selling_books" :vm="bar_obj_hot_selling_books" :title="'热卖图书统计'">
																</newBarChart>
																<div v-if="!bar_obj_hot_selling_books.values.length">热卖图书没有符合条件的数据</div>
																										</div>
														</view>
																																										<view class="d-col"
															  v-if="user_group !== '管理员' || $check_figure('/subject_exam/table')" :span="8">
															<div class="card chart">
																<h5 class="title">用户考试成绩统计</h5>
																<subjectExamCharts v-if="bar_obj_subject_exam.values.length > 0"
																					id="bar_obj_subject_exam" :vm="bar_obj_subject_exam" :title="'用户考试成绩统计统计'" @changeTab="get_url_subject_exam_list">
																</subjectExamCharts>
																<div v-if="!bar_obj_subject_exam.values.length">用户考试成绩统计没有符合条件的数据</div>
															</div>
														</view>
																			</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mixin from "@/libs/mixins/page.js";
	import pieChart from "@/components/charts/pie_chart";
	import newBarChart from "@/components/charts/new_bar_chart";
	import newLineChart from "@/components/charts/new_line_chart";
	import subjectExamCharts from "@/components/charts/subject_exam_charts.vue";
	export default {
		mixins: [mixin],
		data() {
			return {
					activeName: "third",
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
																									line_obj_shop_money: {
										type: "money",
										names: ["销售金额"],
										xAxis: [],
										values: [],
										month: [],
										loading: false,
										total: 0
									},
									bar_obj_shop_num: {
										type: "num",
										names: ["销售数量"],
										xAxis: [],
										values: [],
										month: [],
										loading: false,
										total: 0
									},
																			url_message_count: "~/api/message/count?",
														url_user_count: "~/api/user/count?",
														url_article_hits: "~/api/article/sum?field=hits",
																			bar_obj_subject_exam: {
										names: [],
										xAxis: [],
										values: [],
										tabs: []
									},
									};
		},
		mounted() {
		},
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
			// 获取饼状图统计图数据
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
																																																		// 获取我要定制统计折线图
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
														const resultList = []
							for (let i=0;i<this.line_obj_i_want_to_customize.xAxis.length;i++){
								let list = []
								for (let j=0;j<this.line_obj_i_want_to_customize.names.length;j++){
									data[v2] = this.line_obj_i_want_to_customize.xAxis[i];
									data[v1] = this.line_obj_i_want_to_customize.names[j];
									const json = await this.$get("~/api/i_want_to_customize/sum?field=total_amount",data);
									if (json.result) {
										list[j] = json.result;
									} else {
										list[j] = 0;
									}
								}
								resultList.push(list)
							}
							this.line_obj_i_want_to_customize.values = resultList
							if (names_flag){
								this.get_nickname(this.line_obj_i_want_to_customize.names,true);
							}
							if (xAxis_flag){
								this.get_nickname(this.line_obj_i_want_to_customize.xAxis,true);
							}
																																																																																																																																										},
																																							// 获取热卖图书统计柱状图
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
														// 获取指定日期的数据
				async get_order_month_some_price(date, o) {

					function getDateBetween(start, end) {
						var result = [];
						//使用传入参数的时间
						var startTime = new Date(start);
						var endTime = new Date(end);
						while (endTime - startTime >= 0) {
							let year = startTime.getFullYear();
							let month = startTime.getMonth();
							month = month < 9 ? '0' + (month + 1) : month + 1;
							let day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime
									.getDate();
							//加入数组
							result.push(year + "-" + month + "-" + day);
							//更新日期
							startTime.setDate(startTime.getDate() + 1);
						}
						return result;
					}

					const now = new Date();
					const nowYear = now.getFullYear();
					const nowMonth = now.getMonth() + 1;
					const nowDate = now.getDate();
					let days = []
					if (date) {
						days = getDateBetween(date[0], date[1])
					} else {
						o.month[0] = new Date(nowYear, nowMonth - 1, 1, 0, 0, 0).toStr("yyyy-MM-dd")
						o.month[1] = new Date(nowYear, nowMonth - 1, nowDate, 23, 59, 59).toStr("yyyy-MM-dd")
						days = getDateBetween(o.month[0], o.month[1])
					}

					o.xAxis = []
					o.values = []
					o.loading = true
					let list = {
						result: [],
						total: 0
					}
					let field = o.type === "money" ? "price_count" : "num"
					for (let i = 0; i < days.length; i++) {
						const t = new Date(days[i])
						const time = t.getFullYear() + "-" + (t.getMonth()+1) + "-" + t.getDate()
						o.xAxis.push((t.getMonth()+1) + "-" + t.getDate())
						await this.get_order_sum_price_sub(list, time, i, field)
					}
					o.loading = false
					o.values = list.result
					o.total = list.total
				},

				// 获取某一天的销售数量
				async get_order_sum_price_sub(list, date, index, field) {
					let user_group = this.$store.state.user.user_group;
					let user_id = this.$store.state.user.user_id;
					let time = new Date(date).toStr("yyyy-MM-dd");
					var $where = ""
					if (user_group != "管理员")
							$where = '&merchant_id=' + user_id
					const json = await this.$get(
							`~/api/order/sum?field=${field}&create_time_min=${time} 00:00:00&create_time_max=${time} 23:59:59&state=已付款` +
								$where,
							null,
					);
					list.result[index] = []
					if (json.result) {
						list.total += json.result
						list.result[index].push(json.result)
					} else {
						list.result[index].push(0)
					}
				},

				// 选择日期
				changeMonth(e, o) {
					this.get_order_month_some_price(e, o)
				},
							async get_url_subject_list() {
					const result = await this.$get("~/api/subject/get_list", null);
					for (let i = 0; i < result.result.list.length; i++) {
						this.bar_obj_subject_exam.tabs.push(result.result.list[i].name)
					}
					await this.get_url_subject_exam_list(this.bar_obj_subject_exam.tabs[0])
					this.bar_obj_subject_exam.names = [this.bar_obj_subject_exam.tabs[0]]
				},
				async get_url_subject_exam_list(e) {
					const json = await this.$get("~/api/subject_exam/get_list?subject_name=" + e)
					const allResult = []
					this.bar_obj_subject_exam.xAxis = []
					for (let j = 0; j < json.result.list.length; j++) {
						this.bar_obj_subject_exam.xAxis.push(json.result.list[j].name)
						const value = await this.$get("~/api/subject_user_answer/get_list", {
							user_id: this.$store.state.user.user_id,
							exam_id: json.result.list[j].exam_id,
						})
						for (let k = 0; k < value.result.list.length; k++) {
							allResult.push([value.result.list[k].score])
						}
					}
					this.bar_obj_subject_exam.values = allResult
					this.bar_obj_subject_exam.names = [e]
				},
			}
		,created() {
																																// 执行定制商品数据获取
				this.get_list_customized_products();
															// 执行我要定制数据获取
				this.get_list_i_want_to_customize();
																													// 执行热卖图书数据获取
				this.get_list_hot_selling_books();
														this.get_order_month_some_price(null, this.line_obj_shop_money)
				this.get_order_month_some_price(null, this.bar_obj_shop_num)
										this.get_url_subject_list()
						}
		,components: {
			pieChart,
			newBarChart,
			newLineChart,
			subjectExamCharts,
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
		box-shadow: none;
	}
	h5.title {
		margin: 10px 0px;
	}
</style>
