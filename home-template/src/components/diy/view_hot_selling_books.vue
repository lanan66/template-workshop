<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
		<el-row class="row_ce"> 
							<el-col v-if="user_group === '管理员' || $check_field('get','book_number') || $check_field('add','book_number') || $check_field('set','book_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="图书编号" prop="book_number">
												<el-input id="book_number" v-model="form['book_number']" placeholder="请输入图书编号"
							  v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','book_number')) || (!form['hot_selling_books_id'] && $check_field('add','book_number'))" :disabled="disabledObj['book_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','book_number')">{{form['book_number']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','book_name') || $check_field('add','book_name') || $check_field('set','book_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="图书名称" prop="book_name">
												<el-input id="book_name" v-model="form['book_name']" placeholder="请输入图书名称"
							  v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','book_name')) || (!form['hot_selling_books_id'] && $check_field('add','book_name'))" :disabled="disabledObj['book_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','book_name')">{{form['book_name']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','cover') || $check_field('add','cover') || $check_field('set','cover')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="封面" prop="cover">
								<el-upload :disabled="disabledObj['cover_isDisabled']" id="cover" class="avatar-uploader" drag
						accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="upload_cover"
						:show-file-list="false" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','cover')) || (!form['hot_selling_books_id'] && $check_field('add','cover'))">
						<img v-if="form['cover']" :src="$fullUrl(form['cover'])" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-image v-else-if="$check_field('get','cover')" style="width: 100px; height: 100px"
						:src="$fullUrl(form['cover'])" :preview-src-list="[$fullUrl(form['cover'])]">
						<div slot="error" class="image-slot">
							<img src="../../../public/img/error.png" style="width: 90px; height: 90px" />
						</div>
					</el-image>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','author') || $check_field('add','author') || $check_field('set','author')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="作者" prop="author">
												<el-input id="author" v-model="form['author']" placeholder="请输入作者"
							  v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','author')) || (!form['hot_selling_books_id'] && $check_field('add','author'))" :disabled="disabledObj['author_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','author')">{{form['author']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','product_category') || $check_field('add','product_category') || $check_field('set','product_category')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="商品类别" prop="product_category">
							<el-select id="product_category" v-model="form['product_category']" @change="select_product_category_field"						v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','product_category')) || (!form['hot_selling_books_id'] && $check_field('add','product_category'))">
						<el-option v-for="o in list_product_category" :key="o['product_category']" :label="o['product_category']"
							:value="o['product_category']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','product_category')">{{form['product_category']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','inventory') || $check_field('add','inventory') || $check_field('set','inventory')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="库存" prop="inventory">
												<el-input id="inventory" v-model="form['inventory']" placeholder="请输入库存"
							  v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','inventory')) || (!form['hot_selling_books_id'] && $check_field('add','inventory'))" :disabled="disabledObj['inventory_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','inventory')">{{form['inventory']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','price') || $check_field('add','price') || $check_field('set','price')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="价格" prop="price">
												<el-input id="price" v-model="form['price']" placeholder="请输入价格"
							  v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','price')) || (!form['hot_selling_books_id'] && $check_field('add','price'))" :disabled="disabledObj['price_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','price')">{{form['price']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','brief_introduction') || $check_field('add','brief_introduction') || $check_field('set','brief_introduction')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="简介" prop="brief_introduction">
								<el-input type="textarea" id="brief_introduction" v-model="form['brief_introduction']" placeholder="请输入简介"
						v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','brief_introduction')) || (!form['hot_selling_books_id'] && $check_field('add','brief_introduction'))" :disabled="disabledObj['brief_introduction_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','brief_introduction')">{{form['brief_introduction']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','edit') || $check_field('add','edit') || $check_field('set','edit')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="编辑" prop="edit">
												<el-input id="edit" v-model="form['edit']" placeholder="请输入编辑"
							  v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','edit')) || (!form['hot_selling_books_id'] && $check_field('add','edit'))" :disabled="disabledObj['edit_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','edit')">{{form['edit']}}</div>
											</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','category') || $check_field('add','category') || $check_field('set','category')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="类别" prop="category">
								<el-input id="category" v-model="form['category']"
						v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','category')) || (!form['hot_selling_books_id'] && $check_field('add','category'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','category')">{{form['category']}}</div>
							</el-form-item>
			</el-col>
								<el-col v-if="user_group === '管理员' || $check_field('get','customized_categories') || $check_field('add','customized_categories') || $check_field('set','customized_categories')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="定制类别" prop="customized_categories">
								<el-input id="customized_categories" v-model="form['customized_categories']"
						v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','customized_categories')) || (!form['hot_selling_books_id'] && $check_field('add','customized_categories'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','customized_categories')">{{form['customized_categories']}}</div>
							</el-form-item>
			</el-col>
					
	
	
	
	
	
	
	</el-row>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item v-if="$check_action('/hot_selling_books/view','set') || $check_action('/hot_selling_books/view','add')">
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
				<el-form-item v-else>
					<el-button @click="cancel()">返回</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "hot_selling_books_id",
				url_add: "~/api/hot_selling_books/add?",
				url_set: "~/api/hot_selling_books/set?",
				url_get_obj: "~/api/hot_selling_books/get_obj?",
				url_upload: "~/api/hot_selling_books/upload?",

				query: {
					"hot_selling_books_id": 0,
				},

				form: {
								"book_number":  '', // 图书编号
										"book_name":  '', // 图书名称
										"cover":  '', // 封面
										"author":  '', // 作者
										"product_category":  '', // 商品类别
										"inventory":  '', // 库存
										"price":  '', // 价格
										"brief_introduction":  '', // 简介
										"edit":  '', // 编辑
										"category":  '', // 类别
										"customized_categories":  '', // 定制类别
											"hot_selling_books_id": 0, // ID
						
				},
				disabledObj:{
								"book_number_isDisabled": false,
										"book_name_isDisabled": false,
										"cover_isDisabled": false,
										"author_isDisabled": false,
										"product_category_isDisabled": false,
										"inventory_isDisabled": false,
										"price_isDisabled": false,
										"brief_introduction_isDisabled": false,
										"edit_isDisabled": false,
										"category_isDisabled": false,
										"customized_categories_isDisabled": false,
										},

	
		
		
		
								// 商品类别选项列表
				list_product_category: [""],
	
		
		
		
		
		
		
	
			}
		},
		methods: {


	
	
			
	
						/**
			 * 上传封面
			 * @param {Object} param 图片参数
			 */
			upload_cover(param){
						this.uploadFile(param.file, "cover");
					},
	
	
			
	
			
				/**
			 * 获取商品类别列表
			 */
			async get_list_product_category() {
				var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					this.list_product_category = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
					select_product_category_field(v){
				this.$get('~/api/classification_information/get_obj?product_category='+v,{},(res)=>{
					if(res.result && res.result.obj){
																																																																																																																																																			this.form.category = res.result.obj.category;
																																													this.form.customized_categories = res.result.obj.customized_categories;
																										}else{
						console.error(res.error);
					}
				})
			},
					
			
	
			
	
			
	
			
	
			
	
			
	
		
			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
															if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
							}
						})
					})
				}
																										$.db.del("form");

				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){


																																												


			},

			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
			submit_check(param) {
				let msg = null
																																							return msg;
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/hot_selling_books/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/hot_selling_books/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/hot_selling_books/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/hot_selling_books/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/hot_selling_books/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},

		},
		created() {
												this.get_list_product_category();
																},
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}




</style>
