<template>
  <div class="page_search search_index">
	<div class="warp">
	  <div class="container">
		<div class="row">
		  <div class="col-12">
			<div class="card_result_search">
			  <div class="title">搜索结果</div>
				<!-- 商品搜索结果 -->
			  <list_result_search
				:list="result_goods"
				title="${model.filter.cart_name}"
				source_table="goods"
			  ></list_result_search>

				<!-- 文章搜索结果 -->
			  <list_result_search
				:list="result_article"
				title="商城资讯"
				source_table="article"
			  ></list_result_search>

				<!-- 论坛搜索结果 -->
			  <list_result_search
				:list="result_forum"
				title="交流论坛"
				source_table="forum"
			  ></list_result_search>

						  <list_result_search
				v-if="$check_action('/mall_users/list', 'get')"
				:list="result_mall_users_name"
				title="商城用户姓名"
				source_table="mall_users"
			  ></list_result_search>
														  <list_result_search
				v-if="$check_action('/mall_users/list', 'get')"
				:list="result_mall_users_category"
				title="商城用户类别"
				source_table="mall_users"
			  ></list_result_search>
															  <list_result_search
				v-if="$check_action('/seller/list', 'get')"
				:list="result_seller_store_name"
				title="卖家店铺名称"
				source_table="seller"
			  ></list_result_search>
									  <list_result_search
				v-if="$check_action('/mall_center/list', 'get')"
				:list="result_mall_center_brand"
				title="商城中心品牌"
				source_table="mall_center"
			  ></list_result_search>
															  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_product_name"
				title="定制商品商品名称"
				source_table="customized_products"
			  ></list_result_search>
																																									  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_is_it_a_special_offer"
				title="定制商品是否特价"
				source_table="customized_products"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/customized_products/list', 'get')"
				:list="result_customized_products_product_category"
				title="定制商品商品类别"
				source_table="customized_products"
			  ></list_result_search>
																																																						  <list_result_search
				v-if="$check_action('/i_want_to_customize/list', 'get')"
				:list="result_i_want_to_customize_customized_categories"
				title="我要定制定制类别"
				source_table="i_want_to_customize"
			  ></list_result_search>
											  <list_result_search
				v-if="$check_action('/i_want_to_customize/list', 'get')"
				:list="result_i_want_to_customize_pickup_category"
				title="我要定制取货类别"
				source_table="i_want_to_customize"
			  ></list_result_search>
									  <list_result_search
				v-if="$check_action('/classification_information/list', 'get')"
				:list="result_classification_information_product_category"
				title="分类信息商品类别"
				source_table="classification_information"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/classification_information/list', 'get')"
				:list="result_classification_information_category"
				title="分类信息类别"
				source_table="classification_information"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/classification_information/list', 'get')"
				:list="result_classification_information_customized_categories"
				title="分类信息定制类别"
				source_table="classification_information"
			  ></list_result_search>
												  <list_result_search
				v-if="$check_action('/website_announcement/list', 'get')"
				:list="result_website_announcement_title"
				title="网站公告标题"
				source_table="website_announcement"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/website_announcement/list', 'get')"
				:list="result_website_announcement_publisher"
				title="网站公告发布人"
				source_table="website_announcement"
			  ></list_result_search>
																								  <list_result_search
				v-if="$check_action('/hot_selling_books/list', 'get')"
				:list="result_hot_selling_books_book_name"
				title="热卖图书图书名称"
				source_table="hot_selling_books"
			  ></list_result_search>
											  <list_result_search
				v-if="$check_action('/hot_selling_books/list', 'get')"
				:list="result_hot_selling_books_author"
				title="热卖图书作者"
				source_table="hot_selling_books"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/hot_selling_books/list', 'get')"
				:list="result_hot_selling_books_product_category"
				title="热卖图书商品类别"
				source_table="hot_selling_books"
			  ></list_result_search>
																				  <list_result_search
				v-if="$check_action('/hot_selling_books/list', 'get')"
				:list="result_hot_selling_books_category"
				title="热卖图书类别"
				source_table="hot_selling_books"
			  ></list_result_search>
								  <list_result_search
				v-if="$check_action('/hot_selling_books/list', 'get')"
				:list="result_hot_selling_books_customized_categories"
				title="热卖图书定制类别"
				source_table="hot_selling_books"
			  ></list_result_search>
						</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
</template>

<script>
import mixin from "../../mixins/page.js";
import list_result_search from "../../components/diy/list_result_search.vue";

export default {
  mixins: [mixin],
  data() {
	return {
	  "query": {
		word: "",
	  },
	  "result_goods": [],
	  "result_article": [],
	  "result_forum": [],
						"result_mall_users_name":[],
														"result_mall_users_category":[],
															"result_seller_store_name":[],
									"result_mall_center_brand":[],
															"result_customized_products_product_name":[],
																																									"result_customized_products_is_it_a_special_offer":[],
								"result_customized_products_product_category":[],
																																																						"result_i_want_to_customize_customized_categories":[],
											"result_i_want_to_customize_pickup_category":[],
									"result_classification_information_product_category":[],
								"result_classification_information_category":[],
								"result_classification_information_customized_categories":[],
												"result_website_announcement_title":[],
								"result_website_announcement_publisher":[],
																								"result_hot_selling_books_book_name":[],
											"result_hot_selling_books_author":[],
								"result_hot_selling_books_product_category":[],
																				"result_hot_selling_books_category":[],
								"result_hot_selling_books_customized_categories":[],
				};
  },
  methods: {
	/**
	 * 获取${fmodel.filter.cart_name}
	 */
	get_goods() {
	  this.$get("~/api/goods/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_goods = json.result.list;
		}
	  });
	},
	/**
	 * 获取文章
	 */
	get_article() {
	  this.$get("~/api/article/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_article = json.result.list;
		}
	  });
	},
	/**
	 * 获取交流论坛
	 */
	get_forum() {
	  this.$get("~/api/forum/get_list?like=0", { page: 1, size: 10, title: this.query.word }, (json) => {
		if (json.result) {
		  this.result_forum = json.result.list;
		}
	  });
	},

				/**
	 * 获取name
	 */
	get_mall_users_name(){
		let url = "~/api/mall_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "name": this.query.word }, (json) => {
		  if (json.result) {
			var result_mall_users_name = json.result.list;
			result_mall_users_name.map(o => o.title = o['name'])
	  			this.result_mall_users_name = result_mall_users_name
		 	}
		});
	},
												/**
	 * 获取category
	 */
	get_mall_users_category(){
		let url = "~/api/mall_users/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "category": this.query.word }, (json) => {
		  if (json.result) {
			var result_mall_users_category = json.result.list;
			result_mall_users_category.map(o => o.title = o['category'])
	  			this.result_mall_users_category = result_mall_users_category
		 	}
		});
	},
													/**
	 * 获取store_name
	 */
	get_seller_store_name(){
		let url = "~/api/seller/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "store_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_seller_store_name = json.result.list;
			result_seller_store_name.map(o => o.title = o['store_name'])
	  			this.result_seller_store_name = result_seller_store_name
		 	}
		});
	},
							/**
	 * 获取brand
	 */
	get_mall_center_brand(){
		let url = "~/api/mall_center/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "brand": this.query.word }, (json) => {
		  if (json.result) {
			var result_mall_center_brand = json.result.list;
			result_mall_center_brand.map(o => o.title = o['brand'])
	  			this.result_mall_center_brand = result_mall_center_brand
		 	}
		});
	},
													/**
	 * 获取product_name
	 */
	get_customized_products_product_name(){
		let url = "~/api/customized_products/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "product_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_product_name = json.result.list;
			result_customized_products_product_name.map(o => o.title = o['product_name'])
	  			this.result_customized_products_product_name = result_customized_products_product_name
		 	}
		});
	},
																																							/**
	 * 获取is_it_a_special_offer
	 */
	get_customized_products_is_it_a_special_offer(){
		let url = "~/api/customized_products/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "is_it_a_special_offer": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_is_it_a_special_offer = json.result.list;
			result_customized_products_is_it_a_special_offer.map(o => o.title = o['is_it_a_special_offer'])
	  			this.result_customized_products_is_it_a_special_offer = result_customized_products_is_it_a_special_offer
		 	}
		});
	},
						/**
	 * 获取product_category
	 */
	get_customized_products_product_category(){
		let url = "~/api/customized_products/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "product_category": this.query.word }, (json) => {
		  if (json.result) {
			var result_customized_products_product_category = json.result.list;
			result_customized_products_product_category.map(o => o.title = o['product_category'])
	  			this.result_customized_products_product_category = result_customized_products_product_category
		 	}
		});
	},
																																																				/**
	 * 获取customized_categories
	 */
	get_i_want_to_customize_customized_categories(){
		let url = "~/api/i_want_to_customize/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "customized_categories": this.query.word }, (json) => {
		  if (json.result) {
			var result_i_want_to_customize_customized_categories = json.result.list;
			result_i_want_to_customize_customized_categories.map(o => o.title = o['customized_categories'])
	  			this.result_i_want_to_customize_customized_categories = result_i_want_to_customize_customized_categories
		 	}
		});
	},
									/**
	 * 获取pickup_category
	 */
	get_i_want_to_customize_pickup_category(){
		let url = "~/api/i_want_to_customize/get_list?like=0";
				url = url+"&examine_state=已通过";
				this.$get(url, { page: 1, size: 10, "pickup_category": this.query.word }, (json) => {
		  if (json.result) {
			var result_i_want_to_customize_pickup_category = json.result.list;
			result_i_want_to_customize_pickup_category.map(o => o.title = o['pickup_category'])
	  			this.result_i_want_to_customize_pickup_category = result_i_want_to_customize_pickup_category
		 	}
		});
	},
							/**
	 * 获取product_category
	 */
	get_classification_information_product_category(){
		let url = "~/api/classification_information/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "product_category": this.query.word }, (json) => {
		  if (json.result) {
			var result_classification_information_product_category = json.result.list;
			result_classification_information_product_category.map(o => o.title = o['product_category'])
	  			this.result_classification_information_product_category = result_classification_information_product_category
		 	}
		});
	},
						/**
	 * 获取category
	 */
	get_classification_information_category(){
		let url = "~/api/classification_information/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "category": this.query.word }, (json) => {
		  if (json.result) {
			var result_classification_information_category = json.result.list;
			result_classification_information_category.map(o => o.title = o['category'])
	  			this.result_classification_information_category = result_classification_information_category
		 	}
		});
	},
						/**
	 * 获取customized_categories
	 */
	get_classification_information_customized_categories(){
		let url = "~/api/classification_information/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "customized_categories": this.query.word }, (json) => {
		  if (json.result) {
			var result_classification_information_customized_categories = json.result.list;
			result_classification_information_customized_categories.map(o => o.title = o['customized_categories'])
	  			this.result_classification_information_customized_categories = result_classification_information_customized_categories
		 	}
		});
	},
										/**
	 * 获取title
	 */
	get_website_announcement_title(){
		let url = "~/api/website_announcement/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "title": this.query.word }, (json) => {
		  if (json.result) {
			var result_website_announcement_title = json.result.list;
			result_website_announcement_title.map(o => o.title = o['title'])
	  			this.result_website_announcement_title = result_website_announcement_title
		 	}
		});
	},
						/**
	 * 获取publisher
	 */
	get_website_announcement_publisher(){
		let url = "~/api/website_announcement/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "publisher": this.query.word }, (json) => {
		  if (json.result) {
			var result_website_announcement_publisher = json.result.list;
			result_website_announcement_publisher.map(o => o.title = o['publisher'])
	  			this.result_website_announcement_publisher = result_website_announcement_publisher
		 	}
		});
	},
																						/**
	 * 获取book_name
	 */
	get_hot_selling_books_book_name(){
		let url = "~/api/hot_selling_books/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "book_name": this.query.word }, (json) => {
		  if (json.result) {
			var result_hot_selling_books_book_name = json.result.list;
			result_hot_selling_books_book_name.map(o => o.title = o['book_name'])
	  			this.result_hot_selling_books_book_name = result_hot_selling_books_book_name
		 	}
		});
	},
									/**
	 * 获取author
	 */
	get_hot_selling_books_author(){
		let url = "~/api/hot_selling_books/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "author": this.query.word }, (json) => {
		  if (json.result) {
			var result_hot_selling_books_author = json.result.list;
			result_hot_selling_books_author.map(o => o.title = o['author'])
	  			this.result_hot_selling_books_author = result_hot_selling_books_author
		 	}
		});
	},
						/**
	 * 获取product_category
	 */
	get_hot_selling_books_product_category(){
		let url = "~/api/hot_selling_books/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "product_category": this.query.word }, (json) => {
		  if (json.result) {
			var result_hot_selling_books_product_category = json.result.list;
			result_hot_selling_books_product_category.map(o => o.title = o['product_category'])
	  			this.result_hot_selling_books_product_category = result_hot_selling_books_product_category
		 	}
		});
	},
																		/**
	 * 获取category
	 */
	get_hot_selling_books_category(){
		let url = "~/api/hot_selling_books/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "category": this.query.word }, (json) => {
		  if (json.result) {
			var result_hot_selling_books_category = json.result.list;
			result_hot_selling_books_category.map(o => o.title = o['category'])
	  			this.result_hot_selling_books_category = result_hot_selling_books_category
		 	}
		});
	},
						/**
	 * 获取customized_categories
	 */
	get_hot_selling_books_customized_categories(){
		let url = "~/api/hot_selling_books/get_list?like=0";
				this.$get(url, { page: 1, size: 10, "customized_categories": this.query.word }, (json) => {
		  if (json.result) {
			var result_hot_selling_books_customized_categories = json.result.list;
			result_hot_selling_books_customized_categories.map(o => o.title = o['customized_categories'])
	  			this.result_hot_selling_books_customized_categories = result_hot_selling_books_customized_categories
		 	}
		});
	},
			
  },
  components: { list_result_search },
	created(){
    this.query.word = this.$route.query.word || "";
  },
  mounted() {
	this.get_goods();
	this.get_article();
	this.get_forum();
					this.get_mall_users_name();
													this.get_mall_users_category();
														this.get_seller_store_name();
								this.get_mall_center_brand();
														this.get_customized_products_product_name();
																																								this.get_customized_products_is_it_a_special_offer();
							this.get_customized_products_product_category();
																																																					this.get_i_want_to_customize_customized_categories();
										this.get_i_want_to_customize_pickup_category();
								this.get_classification_information_product_category();
							this.get_classification_information_category();
							this.get_classification_information_customized_categories();
											this.get_website_announcement_title();
							this.get_website_announcement_publisher();
																							this.get_hot_selling_books_book_name();
										this.get_hot_selling_books_author();
							this.get_hot_selling_books_product_category();
																			this.get_hot_selling_books_category();
							this.get_hot_selling_books_customized_categories();
			  },
  watch: {
	$route() {
	  $.push(this.query, this.$route.query);
	  this.get_goods();
	  this.get_article();
	  this.get_forum();
				  this.get_mall_users_name();
												  this.get_mall_users_category();
													  this.get_seller_store_name();
							  this.get_mall_center_brand();
													  this.get_customized_products_product_name();
																																							  this.get_customized_products_is_it_a_special_offer();
						  this.get_customized_products_product_category();
																																																				  this.get_i_want_to_customize_customized_categories();
									  this.get_i_want_to_customize_pickup_category();
							  this.get_classification_information_product_category();
						  this.get_classification_information_category();
						  this.get_classification_information_customized_categories();
										  this.get_website_announcement_title();
						  this.get_website_announcement_publisher();
																						  this.get_hot_selling_books_book_name();
									  this.get_hot_selling_books_author();
						  this.get_hot_selling_books_product_category();
																		  this.get_hot_selling_books_category();
						  this.get_hot_selling_books_customized_categories();
				},
  },
};
</script>

<style scoped>
.card_search {
  text-align: center;
}
.card_result_search>.title {
  text-align: center;
  padding: 10px 0;
}
</style>
