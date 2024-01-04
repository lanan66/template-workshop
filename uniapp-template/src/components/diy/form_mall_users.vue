<template>
	<div>
			<view v-if="$check_register_field('add','name','/mall_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					姓名:
				</text>
			</view>
									<!-- 文本 -->
				<view class="diy_field diy_text">
					<input type="text" id="form_name" v-model="form['name']" @blur="handleBlur($event.target.value,'name')"  placeholder="请输入姓名" />
				</view>
							</view>
				<view v-if="$check_register_field('add','age','/mall_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					年龄:
				</text>
			</view>
									<!-- 文本 -->
				<view class="diy_field diy_text">
					<input type="text" id="form_age" v-model="form['age']" @blur="handleBlur($event.target.value,'age')"  placeholder="请输入年龄" />
				</view>
							</view>
				<view v-if="$check_register_field('add','gender','/mall_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					性别:
				</text>
			</view>
					<!-- 选项 -->
			<view class="diy_field diy_down">
				<uni-data-select
						id="form_gender"
						v-model="form['gender']"
						:localdata="list_gender"
						@change="change_gender"
				></uni-data-select>
			</view>
				</view>
				<view v-if="$check_register_field('add','category','/mall_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					类别:
				</text>
			</view>
					<!-- 选项 -->
			<view class="diy_field diy_down">
				<uni-data-select
						id="form_category"
						v-model="form['category']"
						:localdata="list_category"
						@change="change_category"
				></uni-data-select>
			</view>
				</view>
				<view v-if="$check_register_field('add','resume','/mall_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					简历:
				</text>
			</view>
					<!-- 图片 -->
			<!-- 修改权限 -->
			<view class="diy_field diy_img" v-if="form['resume']" >
				<image style="width: 50px;height: 50px" :src="$fullUrl(form['resume'])" @click="change_img('resume')" />
			</view>
			<!-- 添加权限 -->
			<view class="diy_field diy_img" v-else-if="!form['resume']" >
				<view class="btn_add_img" @click="change_img('resume')">
					<text>+</text>
				</view>
			</view>
				</view>
				<view v-if="$check_register_field('add','remarks','/mall_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					备注:
				</text>
			</view>
					<!-- 多文本 -->
			<view class="diy_field diy_desc">
				<textarea id="form_remarks" v-model="form['remarks']" />
			</view>
				</view>
				<view v-if="$check_register_field('add','tag_recommendation','/mall_users/view')" class="col-12 col-md-6">
			<view class="diy_title">
				<text>
					标签推荐:
				</text>
			</view>
					<!-- 选项 -->
			<view class="diy_field diy_down">
				<ld-select :multiple="true" :list="list_tag_recommendation"
						   label-key="text" value-key="value"
						   placeholder="请选择"
						   v-model="tag_recommendation_multiple_value"
						   @confirm="change_tag_recommendation"></ld-select>
			</view>
				</view>
		</div>
</template>

<script>
								import ldSelect from "@/components/ld-select/ld-select.vue";
	export default {
		components: {ldSelect},
		model: {
			prop: "form",
			event: "change"
		},
		props: {
			form: {
				type: Object,
				default: ()=>{
					return {
						url_upload: "~/api/mall_users/upload?",
					}
				}
			}
		},
		data(){
			return {
									"list_gender": [],
													"list_category": [],
															tag_recommendation_multiple_value:[],
							"list_tag_recommendation": [],
						}
		},
		methods: {
						/**
			 * 获取性别列表
			 */
			async get_list_gender() {
									['男','女'].map((o) => this.list_gender.push({value:o,text:o}));
											},
			change_gender(val) {
				if (val === "全部" || val === "") {
					this.$emit('change',{"value":"","type":"gender"})
				}else{
					this.$emit('change',{"value":val,"type":"gender"})
				}
									},
					/**
			 * 获取类别列表
			 */
			async get_list_category() {
												var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					json.result.list.map((o) => this.list_category.push({value:o.category,text:o.category}));
				}
				else if(json.error){
					console.error(json.error);
				}
							},
			change_category(val) {
				if (val === "全部" || val === "") {
					this.$emit('change',{"value":"","type":"category"})
				}else{
					this.$emit('change',{"value":val,"type":"category"})
				}
									},
							/**
			 * 获取标签推荐列表
			 */
			async get_list_tag_recommendation() {
												var json = await this.$get("~/api/classification_information/get_list?");
				if(json.result && json.result.list){
					json.result.list.map((o) => this.list_tag_recommendation.push({value:o.category,text:o.category}));
				}
				else if(json.error){
					console.error(json.error);
				}
							},
			change_tag_recommendation(val) {
				if (val === "全部" || val === "") {
					this.$emit('change',{"value":"","type":"tag_recommendation"})
				}else{
					this.$emit('change',{"value":val,"type":"tag_recommendation"})
				}
										this.form.tag_recommendation = "";
				if (this.tag_recommendation_multiple_value && this.tag_recommendation_multiple_value.length>0){
					this.form.tag_recommendation = this.tag_recommendation_multiple_value.toString();
				}
						},
				/**
			 * 上传图片
			 * @param {Object} param文件参数
			 */
			change_img(key_name){
				var _self = this;
				_self.upload_img_flag = false
				// 选择图像方法
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: _self.$fullUrl('/api/mall_users/upload?'),
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'i_want_to_customize': 'test'
							},
							header: {
								'x-auth-token': "null"
							},
							success: function(uploadFileRes) {
								var filename = JSON.parse(uploadFileRes.data).result.url
								_self.$delete(_self.form,key_name);
								_self.$set(_self.form,key_name,filename);
								_self.handleBlur(filename,key_name);
							}
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			handleBlur(value,type){
				this.$emit('change',{value,type})
			}
		},
    mounted(){
								this.get_list_gender();
						this.get_list_category();
										this.get_list_tag_recommendation();
				}
	}
</script>

<style>
.col-md-6{
	display: flex;
	margin-bottom: 1.25rem;
	height: 36px;
}
.diy_title{
	/* flex: 1.2; */
	display: inline-block;
	width: 5.0625rem;
	margin-right: 0.3125rem;
	font-size: 0.875rem;
    color: #333;
		padding-top: 0.3125rem;
}
.diy_field{
	/* flex: 5; */
	display: inline-block;
	width: 100%;
	background: #ffffff;
	height: 2.25rem;
	line-height:  2.25rem;
	border-radius: 0.25rem;
	padding-left: 0.625rem;


	}
	.diy_field input{
		display: inline;
		font-size: 0.875rem;
	}
</style>
