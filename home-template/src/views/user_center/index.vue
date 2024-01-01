<template>
	<div class="page_user my_home" id="user_address">
		<div class="warp">
			<div class="container">
				<div class="row justify-content-between">
					<div class="col-12 col-md-3">
						<div class="card_menu">
							<!-- 左侧边栏 -->
							<list_admin_menu_user></list_admin_menu_user>
						</div>
					</div>
					<div class="col-12 col-md-9">
						<div class="card_addres pl-2">
							<div class="warp">
								<div class="container-fluid">
									<el-row>
										<div>欢迎来到个人中心</div>
									</el-row>
									<el-row>
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
	import list_admin_menu_user from "@/components/diy/list_admin_menu_user.vue";
	import pieChart from "@/components/charts/pie_chart";
	import newBarChart from "@/components/charts/new_bar_chart";
	import newLineChart from "@/components/charts/new_line_chart";
	export default {
		data() {
			return {
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
																				// 获取我要定制统计图
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
			},
		created() {
							// 执行定制商品数据获取
			this.get_list_customized_products();
					// 执行我要定制数据获取
			this.get_list_i_want_to_customize();
							// 执行热卖图书数据获取
			this.get_list_hot_selling_books();
			},
		components: {
			pieChart,
			newBarChart,
			newLineChart,
			list_admin_menu_user
		},
	};
</script>

<style scoped>
	.container {
		min-height: 800px;
	}
</style>
