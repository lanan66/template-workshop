<template>
	<div class="diy_list page_classification_information" id="classification_information_list">
		<div class="warp">
			<div class="container diy_list_container">
				<div class="diy_list_title">
					<div class="col">
						<span class="title">分类信息列表</span>
					</div>
				</div>
				<div class="leis_box"> 
				<div class="iudis_box">
			
				<div class="row diy_list_search">
					<div class="col">
						<!-- 搜索栏 -->
						<div class="view Search">
							<span class="diy_list_search_title">关键字搜索：</span>
																							<b-form-input size="sm" class="mr-sm-2" placeholder="商品类别搜索" v-model="query['product_category']" />
																														<b-form-input size="sm" class="mr-sm-2" placeholder="类别搜索" v-model="query['category']" />
																														<b-form-input size="sm" class="mr-sm-2" placeholder="定制类别搜索" v-model="query['customized_categories']" />
																																							<b-button size="sm" @click="search()" >
								<b-icon icon="search"/>
							</b-button>
						</div>
						<!-- /搜索栏 -->
					</div>
				</div>
				<div class="diy_list_select_box">
					<span class="diy_list_select_title">下拉搜索：</span>
						<div class="diy_list_dropdown_box">
						<div class="col">
							<!-- 筛选 -->
							<div class="view sift">
																					<!-- 排序 -->
							
								<b-dropdown text="排序" variant="outline-dark" left>
										<b-dropdown-item v-for="(o, i) in list_sort" :key="i" @click="set_sort(o)" >
												{{ o.name }}
										</b-dropdown-item>
								</b-dropdown>
						
							<!--/排序 -->
							</div>
							<!-- /筛选 -->
						</div>
					</div>
				
				</div>
			</div>
				<div class="row diy_list_box">
					<div class="col">
						<!-- 列表 -->
						<list_classification_information :list="list" />
						<!-- /列表 -->
					</div>
				</div>
	</div>
	<!-- 大盒子结尾 -->
				<div class="row diy_list_page_box">
					<div class="col overflow-auto flex_cc">
						<!-- 分页器 -->
<!--						<diy_pager v-model="query['page']" :size="query['size']" :count="count" v-on:toPage="toPage" v-on:toSize="toSize" ></diy_pager>-->
            <b-pagination
                v-model="query.page"
                :total-rows="count"
                :per-page="query.size"
                @change="goToPage"
            />
						<!-- /分页器 -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import list_classification_information from "@/components/diy/list_classification_information.vue";
	import diy_pager from "@/components/diy/diy_pager";
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		components: {
			diy_pager,
			list_classification_information,
		},
		data() {
			return {
				url_get_list: "~/api/classification_information/get_list?like=0",

				// 查询条件
				query: {
					keyword: "",
					page: 1,
					size: 12,
								"product_category": "", // 商品类别
											"category": "", // 类别
											"customized_categories": "", // 定制类别
								},
				// 排序内容
				list_sort: [{
						name: "创建时间从高到低",
						value: "create_time desc",
					},
					{
						name: "创建时间从低到高",
						value: "create_time asc",
					},
					{
						name: "更新时间从高到低",
						value: "update_time desc",
					},
					{
						name: "更新时间从低到高",
						value: "update_time asc",
					},
						{
						name: "商品类别正序",
						value: "product_category asc",
					},
					{
						name: "商品类别倒序",
						value: "product_category desc",
					},
							{
						name: "类别正序",
						value: "category asc",
					},
					{
						name: "类别倒序",
						value: "category desc",
					},
							{
						name: "定制类别正序",
						value: "customized_categories asc",
					},
					{
						name: "定制类别倒序",
						value: "customized_categories desc",
					},
						],

								
			}
		},
		methods: {
      get_list_before(param) {
      },
			/**
			 * 筛选选择
			 */
			filter_set(o,key) {
			    if (o == "全部") {
			        this.query[key] = "";
			    } else {
			        this.query[key] = o;
			    }
			    this.search();
			},

			/**
			 * 排序
			 */
			set_sort(o) {
			    this.query.orderby = o.value;
			    this.search();
			},
							/**
			 * 筛选
			 */
																						/**
			 * 重置
			 */
			reset() {
							this.query.product_category = ""
										this.query.category = ""
										this.query.customized_categories = ""
								this.search();
			},

			// 返回条数
			toSize(i){
				this.query.size = i;
				this.first();
			},

			// 返回页数
			toPage(i){
				this.query.page = i;
				this.first();
			},

      goToPage(v){
        this.query.page = v;
        this.goToNew(v)
      },

		},
		computed: {
		},
		created() {
										/**
			 * 获取分类下多列表
			 */
			this.get_list_categorize_multiple();
				}
	}
</script>

<style>
</style>
