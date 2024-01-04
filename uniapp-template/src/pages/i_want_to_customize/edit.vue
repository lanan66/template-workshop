<template>
	<view class="diy_edit page_i_want_to_customize" id="i_want_to_customize_edit">
		<view class='warp'>
			<view class='container'>
				<view class='row'>
							<view v-if="$check_field('set','product_name') || $check_field('add','product_name') || $check_field('get','product_name')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								商品名称:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_product_name" v-model="form['product_name']" placeholder="请输入商品名称" v-if="(form['product_name'] && $check_field('set','product_name')) || (!form['product_name'] && $check_field('add','product_name'))" :disabled="disabledObj['product_name_isDisabled']" />
							<text v-else-if="$check_field('get','product_name')">{{ form['product_name'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','seller') || $check_field('add','seller') || $check_field('get','seller')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								卖家:
							</text>
						</view>
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_seller"
									v-model="form['seller']"
									:localdata="list_user_seller"
									:clear="!disabledObj['seller_isDisabled']"
									:disabled="disabledObj['seller_isDisabled']"
									v-if="(form['seller'] && $check_field('set','seller')) || (!form['seller'] && $check_field('add','seller'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','seller')">{{ form['seller'] }}</text>
						</view>
					</view>
									<view v-if="$check_field('set','purchase_quantity') || $check_field('add','purchase_quantity') || $check_field('get','purchase_quantity')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								购买数量:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_purchase_quantity" v-model="form['purchase_quantity']" placeholder="请输入购买数量" v-if="(form['purchase_quantity'] && $check_field('set','purchase_quantity')) || (!form['purchase_quantity'] && $check_field('add','purchase_quantity'))" :disabled="disabledObj['purchase_quantity_isDisabled']" />
							<text v-else-if="$check_field('get','purchase_quantity')">{{ form['purchase_quantity'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','price') || $check_field('add','price') || $check_field('get','price')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								价格:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_price" v-model="form['price']" placeholder="请输入价格" v-if="(form['price'] && $check_field('set','price')) || (!form['price'] && $check_field('add','price'))" :disabled="disabledObj['price_isDisabled']" />
							<text v-else-if="$check_field('get','price')">{{ form['price'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','total_amount') || $check_field('add','total_amount') || $check_field('get','total_amount')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								总金额:
							</text>
						</view>
								<!-- 文本 -->
									<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_total_amount" v-model="form['total_amount']" placeholder="请输入总金额" v-if="(form['total_amount'] && $check_field('set','total_amount')) || (!form['total_amount'] && $check_field('add','total_amount'))" @focus="set_total_amount()" :disabled="disabledObj['total_amount_isDisabled']" />
							<text v-else-if="$check_field('get','total_amount')">{{ form['total_amount'] }}</text>
						</view>
										</view>
								<view v-if="$check_field('set','mall_users') || $check_field('add','mall_users') || $check_field('get','mall_users')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								商城用户:
							</text>
						</view>
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_mall_users"
									v-model="form['mall_users']"
									:localdata="list_user_mall_users"
									:clear="!disabledObj['mall_users_isDisabled']"
									:disabled="disabledObj['mall_users_isDisabled']"
									v-if="(form['mall_users'] && $check_field('set','mall_users')) || (!form['mall_users'] && $check_field('add','mall_users'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','mall_users')">{{ form['mall_users'] }}</text>
						</view>
					</view>
									<view v-if="$check_field('set','customization_requirements') || $check_field('add','customization_requirements') || $check_field('get','customization_requirements')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								定制要求:
							</text>
						</view>
								<!-- 多文本 -->
						<view class="diy_field diy_desc diy_text_row">
							<textarea id="form_customization_requirements" v-model="form['customization_requirements']" v-if="(form['customization_requirements'] && $check_field('set','customization_requirements')) || (!form['customization_requirements'] && $check_field('add','customization_requirements'))" :disabled="disabledObj['customization_requirements_isDisabled']"/>
							<text v-else-if="$check_field('get','customization_requirements')">{{ form['customization_requirements'] }}</text>
						</view>
							</view>
								<view v-if="$check_field('set','related_images') || $check_field('add','related_images') || $check_field('get','related_images')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								相关图片:
							</text>
						</view>
								<!-- 图片 -->
						<!-- 修改权限 -->
						<view class="diy_field diy_img diy_text_row" v-if="form['related_images'] && $check_field('set','related_images')">
							<image v-if="disabledObj['related_images_isDisabled']" :src="$fullUrl(form['related_images'])" />
							<image v-if="!disabledObj['related_images_isDisabled']" :src="$fullUrl(form['related_images'])" @click="change_img('related_images')" />
						</view>
						<!-- 添加权限 -->
						<view class="diy_field diy_img diy_text_row" v-else-if="!form['related_images'] && $check_field('add','related_images')">
							<view v-if="disabledObj['related_images_isDisabled']" class="btn_add_img">
								<text>+</text>
							</view>
							<view v-if="!disabledObj['related_images_isDisabled']" class="btn_add_img diy_text_row" @click="change_img('related_images')">
								<text>+</text>
							</view>
						</view>
						<!-- 查询权限 -->
						<view class="diy_field diy_img diy_text_row" v-else-if="$check_field('get','related_images')">
							<image :src="$fullUrl(form['related_images'])" />
						</view>
						<uni-icons style="display: none;" class="forward" type="forward" id="form_img_related_images"></uni-icons>
							</view>
								<view v-if="$check_field('set','completion_time') || $check_field('add','completion_time') || $check_field('get','completion_time')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								完成时间:
							</text>
						</view>
								<!-- 日长 -->
						<view class="diy_field diy_datetime diy_text_row">
							<uni-datetime-picker :disabled="disabledObj['completion_time_isDisabled']" type="datetime" id="form_completion_time" v-model="form['completion_time']" placeholder="请输入完成时间" v-if="(form['completion_time'] && $check_field('set','completion_time')) || (!form['completion_time'] && $check_field('add','completion_time'))" />
							<text v-else-if="$check_field('get','completion_time')">{{ form['completion_time'] }}</text>
						</view>
							</view>
								<view v-if="$check_field('set','related_attachments') || $check_field('add','related_attachments') || $check_field('get','related_attachments')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								相关附件:
							</text>
						</view>
								<!-- 文件 -->
						<!-- 查询权限 -->
						<view class="diy_field diy_file diy_text_row" v-if="$check_field('get','related_attachments')">
							<button @click="download_file($fullUrl(form['related_attachments']))" class="btn" v-if="form['related_attachments']">下载文件</button>
						</view>
						<uni-icons style="display: none;" class="forward diy_text_row" type="forward" id="form_file_related_attachments"></uni-icons>
							</view>
								<view v-if="$check_field('set','customized_video') || $check_field('add','customized_video') || $check_field('get','customized_video')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								定制视频:
							</text>
						</view>
								<!-- 查询权限 -->
						<view class="diy_field diy_video diy_text_row" v-if="$check_field('get','customized_video')">
							<video
									:src="$fullUrl(form['customized_video'])"
									controls
									v-if="form['customized_video']"
							></video>
						</view>
							</view>
								<view v-if="$check_field('set','customized_audio') || $check_field('add','customized_audio') || $check_field('get','customized_audio')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								定制音频:
							</text>
						</view>
								<!-- 查询权限 -->
						<view class="diy_field diy_audio diy_text_row" v-if="$check_field('get','customized_audio')">
							<audio
									style="text-align: left"
									:src="$fullUrl(form['customized_audio'])"
									:poster="$fullUrl(form['customized_audio'])"
									name="暂无"
									author="暂无"
									:action="{method:'pause'}"
									controls
									v-if="form['customized_audio']"
							></audio>
						</view>
							</view>
								<view v-if="$check_field('set','required_date') || $check_field('add','required_date') || $check_field('get','required_date')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								要求日期:
							</text>
						</view>
								<!-- 日期 -->
						<view class="diy_field diy_date">
							<uni-datetime-picker :disabled="disabledObj['required_date_isDisabled']" type="date" id="form_required_date" v-model="form['required_date']" placeholder="请输入要求日期" v-if="(form['required_date'] && $check_field('set','required_date')) || (!form['required_date'] && $check_field('add','required_date'))" />
							<text v-else-if="$check_field('get','required_date')">{{ form['required_date'] }}</text>
						</view>
							</view>
								<view v-if="$check_field('set','customized_categories') || $check_field('add','customized_categories') || $check_field('get','customized_categories')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								定制类别:
							</text>
						</view>
								<!-- 选项 -->
						<view class="diy_field diy_down diy_select_flex">
							<uni-data-select
									id="form_customized_categories"
									v-model="form['customized_categories']"
									:localdata="list_customized_categories"
									v-if="(form['customized_categories'] && $check_field('set','customized_categories')) || (!form['customized_categories'] && $check_field('add','customized_categories'))"
																></uni-data-select>
							<text v-else-if="$check_field('get','customized_categories')">{{ form['customized_categories'] }}</text>
						</view>
							</view>
								<view v-if="$check_field('set','customization_details') || $check_field('add','customization_details') || $check_field('get','customization_details')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								定制详情:
							</text>
						</view>
								<!-- 多文本 -->
						<view class="diy_field diy_desc diy_text_row">
							<textarea id="form_customization_details" v-model="form['customization_details']" v-if="(form['customization_details'] && $check_field('set','customization_details')) || (!form['customization_details'] && $check_field('add','customization_details'))" :disabled="disabledObj['customization_details_isDisabled']"/>
							<text v-else-if="$check_field('get','customization_details')">{{ form['customization_details'] }}</text>
						</view>
							</view>
								<view v-if="$check_field('set','pickup_category') || $check_field('add','pickup_category') || $check_field('get','pickup_category')" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								取货类别:
							</text>
						</view>
								<!-- 选项 -->
						<view class="diy_field diy_down diy_text_row diy_select_flex">
							<uni-data-select
									id="form_pickup_category"
									v-model="form['pickup_category']"
									:localdata="list_pickup_category"
									v-if="(form['pickup_category'] && $check_field('set','pickup_category')) || (!form['pickup_category'] && $check_field('add','pickup_category'))"
							></uni-data-select>
							<text v-else-if="$check_field('get','pickup_category')">{{ form['pickup_category'] }}</text>
						</view>
							</view>
						<view v-if="user_group === '管理员' || $check_examine()" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								审核状态:
							</text>
						</view>
						<view class="diy_field diy_text diy_text_row diy_select_flex">
							<uni-data-select
									v-model="form['examine_state']"
									:localdata="list_examine_state"
							></uni-data-select>
						</view>
						<view class="diy_field diy_text diy_text_row">
							<text>
								{{ form['examine_state'] }}
							</text>
						</view>
					</view>
					<view v-if="user_group === '管理员' || $check_examine()" class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								审核回复:
							</text>
						</view>
						<view class="diy_field diy_text diy_text_row">
							<textarea v-model="form['examine_reply']">
							</textarea>
						</view>
						<view class="diy_field diy_text diy_text_row">
							<text>
								{{ form['examine_reply'] }}
							</text>
						</view>
					</view>

					<!-- 座位 -->
					<view class="col-12 col-md-6 row-item">
						<div class="seat-wrapper" :style="{ width: size + 'px', height: (size*0.76) + 'px' }">
							<div class="illustration">
								<div class="illustration-img-wrapper unselected-seat"></div>
								<span class="illustration-text">可选</span>
								<div class="illustration-img-wrapper selected-seat"></div>
								<span class="illustration-text">已选</span>
								<div class="illustration-img-wrapper bought-seat"></div>
								<span class="illustration-text">不可选</span>
								<div class="btn-buy" @click="buySeat">选定座位</div>
							</div>
							<div class="inner-seat-wrapper" id="innerSeatWrapper">
								<div v-for="row in seatRow">
									<!--这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空-->
									<div v-for="col in seatCol" v-if="seatArray.length > 0" class="seat"
										:style="{ width: seatSize + 'px', height: seatSize + 'px' }">
										<div class="inner-seat" @click="handleChooseSeat(row - 1, col - 1)"
											v-if="seatArray[row - 1][col - 1] !== -1" :class="
											seatArray[row - 1][col - 1] === 2
											  ? 'bought-seat'
											  : seatArray[row - 1][col - 1] === 1
											  ? 'selected-seat'
											  : 'unselected-seat'">
										</div>
									</div>
								</div>
							</div>
						</div>
					</view>
				</view>
				<view class="row">
					<view class="col-12">
						<view class="btn_box">
							<button class="btn_submit primary_btn" @click="submit()">提交</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import mixin from "@/libs/mixins/page.js";
																export default {
	mixins:[mixin],
	data(){
		return{
			url_get_obj:"~/api/i_want_to_customize/get_obj?",
			url_add:"~/api/i_want_to_customize/add?",
			url_set:"~/api/i_want_to_customize/set?",

			// 登录权限
			oauth: {
				"signIn": true,
				"user_group": []
			},

			// 查询条件
			query: {
					"product_name": "",
						"seller": 0,
						"purchase_quantity": 0,
						"price": "",
						"total_amount": "",
						"mall_users": 0,
						"customization_requirements": "",
						"related_images": "",
						"completion_time": "",
						"related_attachments": "",
						"customized_video": "",
						"customized_audio": "",
						"required_date": "",
						"customized_categories": "",
						"customization_details": "",
						"pickup_category": "",
					"i_want_to_customize_id": 0
			},

			obj: {
					"product_name":  '', // 商品名称
						"seller": 0, // 卖家
						"purchase_quantity":  0 , // 购买数量
						"price":  '', // 价格
						"total_amount":  '', // 总金额
						"mall_users": 0, // 商城用户
						"customization_requirements":  '', // 定制要求
						"related_images":  '', // 相关图片
						"completion_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
						"related_attachments":  '', // 相关附件
						"customized_video":  '', // 定制视频
						"customized_audio":  '', // 定制音频
						"required_date": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
						"customized_categories":  '', // 定制类别
						"customization_details":  '', // 定制详情
						"pickup_category":  '', // 取货类别
					"examine_state": "未审核",
				"examine_reply": "",
				"i_want_to_customize_id": 0,

				"seat": "", // 座位
			},

			// 表单字段
			form: {
					"product_name":  '', // 商品名称
						"seller": 0, // 卖家
						"purchase_quantity":  0 , // 购买数量
						"price":  '', // 价格
						"total_amount":  '', // 总金额
						"mall_users": 0, // 商城用户
						"customization_requirements":  '', // 定制要求
						"related_images":  '', // 相关图片
						"completion_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
						"related_attachments":  '', // 相关附件
						"customized_video":  '', // 定制视频
						"customized_audio":  '', // 定制音频
						"required_date": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
						"customized_categories":  '', // 定制类别
						"customization_details":  '', // 定制详情
						"pickup_category":  '', // 取货类别
					"examine_state": "未审核",
				"examine_reply": "",
				"i_want_to_customize_id": 0,
				"seat": "", // 座位
			},
			disabledObj:{
					"product_name_isDisabled": false,
						"seller_isDisabled": false,
								"price_isDisabled": false,
						"total_amount_isDisabled": false,
						"mall_users_isDisabled": false,
						"customization_requirements_isDisabled": false,
						"related_images_isDisabled": false,
						"completion_time_isDisabled": false,
						"related_attachments_isDisabled": false,
						"customized_video_isDisabled": false,
						"customized_audio_isDisabled": false,
						"required_date_isDisabled": false,
						"customized_categories_isDisabled": false,
						"customization_details_isDisabled": false,
						"pickup_category_isDisabled": false,
				},

							// 用户列表
			list_user_seller: [],
												// 用户列表
			list_user_mall_users: [],
																					list_customized_categories: [],
										list_pickup_category: [],
		
			field:"i_want_to_customize_id",
			table_key:"i_want_to_customize",

			//影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
			seatArray: [],
			//影院座位行数
			seatRow: 5,
			//影院座位列数
			seatCol: 8,
			//座位尺寸
			seatSize: "",
			seatArr: [],
			list_: [],
			seatList: "",
			size:"",
	list_examine_state:[{value:"未审核",text:"未审核"},{value:"已通过",text:"已通过"},{value:"未通过",text:"未通过"}],
		}
	},
	methods: {
    /**
     * 提交前验证事件
     * @param {Object} 请求参数
     * @return {String} 验证成功返回null, 失败返回错误提示
     */
    submit_check(param) {
																																																																      return null;
    },

			
	
					/**
		 * 获取卖家用户列表
		 */
		async get_list_user_seller() {
			// if(this.user_group !== "管理员" && this.form["seller"] === 0) {
			//     this.form["seller"] = this.user.user_id;
			// }
			var json = await this.$get("~/api/user/get_list?user_group=卖家");
			if(json.result && json.result.list){
				json.result.list.map((o) => this.list_user_seller.push({value:o.user_id,text:o.nickname + '-' + o.username}));
			}
			else if(json.error){
				console.error(json.error);
			}
		},
		
	
				
	
				
	
				
	
								set_total_amount(){
			this.form.total_amount = parseFloat(this.form.purchase_quantity) * parseFloat(this.form.price)
			  let r = /^\+?[1-9][0-9]*$/; // 正整数
			  if(!r.test(this.form.total_amount) ){
				this.form.total_amount = this.form.total_amount.toFixed(2);
			  }
		},
										/**
		 * 获取商城用户用户列表
		 */
		async get_list_user_mall_users() {
			// if(this.user_group !== "管理员" && this.form["mall_users"] === 0) {
			//     this.form["mall_users"] = this.user.user_id;
			// }
			var json = await this.$get("~/api/user/get_list?user_group=商城用户");
			if(json.result && json.result.list){
				json.result.list.map((o) => this.list_user_mall_users.push({value:o.user_id,text:o.nickname + '-' + o.username}));
			}
			else if(json.error){
				console.error(json.error);
			}
		},
				async get_user_session_mall_users(){
			var _this = this;
			var json = await this.$get("~/api/user_group/get_obj?name=商城用户");
			if(json.result && json.result.obj){
				var source_table = json.result.obj.source_table;
				var user_id = _this.$store.state.user.user_id;
				if (user_id){
					var url = "~/api/"+source_table+"/get_obj?"
					this.$get(url, {"user_id":_this.$store.state.user.user_id}, function(res) {
						if (res.result && res.result.obj) {
							var arr = []
							for (let key in res.result.obj) {
								arr.push(key)
							}
							var arrForm = []
							for (let key in _this.form) {
								arrForm.push(key)
							}
							_this.form["mall_users"] = user_id
							_this.disabledObj['mall_users' + '_isDisabled'] = true
							for (var i=0;i<arr.length;i++){
                if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
                  for (var j = 0; j < arrForm.length; j++) {
                    if (arr[i] === arrForm[j]) {
                      if (arr[i] !== "mall_users") {
                        _this.form[arrForm[j]] = res.result.obj[arr[i]]
                        _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                        break;
                      }
                    }
                  }
                }
							}
						}
					});
				}
			}
			else if(json.error){
				console.error(json.error);
			}
		},
	
	
				
	
				
	
				
	
				
	
				
	
				
	
				
	
				/**
		 * 获取定制类别列表
		 */
		async get_list_customized_categories() {
							var json = await this.$get("~/api/classification_information/get_list?");
			if(json.result && json.result.list){
				json.result.list.map((o) => this.list_customized_categories.push({value:o.customized_categories,text:o.customized_categories}));
			}
			else if(json.error){
				console.error(json.error);
			}
				},
							
	
				
	
				/**
		 * 获取取货类别列表
		 */
		async get_list_pickup_category() {
					['送货上门','快递'].map((o) => this.list_pickup_category.push({value:o,text:o}));
						},
							
	
			change_file(key_name){
			var _self = this;
				this.$chooseFile().then(res=>{
					console.log(res)

						const uploadTask = uni.uploadFile({
							url: _self.$fullUrl("/api/feedback/upload?"),
							filePath: res[0].path,
							name: "file",
							formData: {
								i_want_to_customize: "test",
							},
							header: {
								"x-auth-token": _self.$store.state.user.token,
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes)
								var filename = JSON.parse(uploadFileRes.data).result.url;
								_self.form[key_name] = filename;
							},
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
							console.log("上传进度" + res.progress);
							console.log("已经上传的数据长度" + res.totalBytesSent);
							console.log(
								"预期需要上传的数据总长度" + res.totalBytesExpectedToSend
							);
						});

				})
		},
		change_img(key_name) {
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
						url: _self.$fullUrl('/api/i_want_to_customize/upload?'),
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							'i_want_to_customize': 'test'
						},
						header: {
							'x-auth-token': _self.$store.state.user.token
						},
						success: function(uploadFileRes) {
							var filename = JSON.parse(uploadFileRes.data).result.url
							var img_url = filename
							_self.form[key_name] = img_url
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

		/**
		 * 获取对象后获取缓存表单
		 * @param {Object} json
		 * @param {Object} func
		 */
		get_obj_before(param){
			var form = uni.db.get("form");
			if (form) {
        delete(form.examine_state)
        delete(form.examine_reply)
				this.obj = uni.push(this.obj ,form);
				this.form = uni.push(this.form ,form);
			}
			var arr = []
			for (let key in form) {
				arr.push(key)
			}
			for (var i=0;i<arr.length;i++){
				this.disabledObj[arr[i] + '_isDisabled'] = true
			}
																				if (this.form["completion_time"] && JSON.stringify(this.form["completion_time"]).indexOf("-")===-1) {
				this.form["completion_time"] = this.$toTime(parseInt(this.form["completion_time"]), "yyyy-MM-dd hh:mm:ss")
			}
													if (this.form["required_date"] && JSON.stringify(this.form["required_date"]).indexOf("-")===-1) {
				this.form["required_date"] = this.$toTime(parseInt(this.form["required_date"]), "yyyy-MM-dd")
			}
										uni.db.del("form");
			this.get_list();
			return param;
		},

		/**
		 * 获取对象后获取缓存表单
		 * @param {Object} json
		 * @param {Object} func
		 */
		get_obj_after(json ,func){
			var form = uni.db.get("form");
			var obj = Object.assign({} ,form ,this.obj);
			if (form) {
				this.obj = uni.push(this.obj ,obj);
			}
			if (form) {
				this.form = uni.push(this.form ,form);
			}
			if(func){
				func(json);
			}
		},

		// 选座
		//选定且购买座位
		buySeat: function() {
			//遍历seatArray，将值为1的座位变为2
			let oldArray = this.seatArray.slice();
			for (let i = 0; i < this.seatRow; i++) {
				for (let j = 0; j < this.seatCol; j++) {
					if (oldArray[i][j] === 1) {
						oldArray[i][j] = 2;
					}
				}
			}
			this.seatArray = oldArray;
			let string = "";
			for (let x = 0; x < oldArray.length; x++) {
				let array = oldArray[x];
				for (let j = 0; j < array.length; j++) {
					if (oldArray[x][j] === 2) {
						if (string == "") {
							string = "" + (x * 8 + j);
						} else {
							string = string + "," + (x * 8 + j);
						}
					}
				}
			}
			// 对比判断哪些是新增的座位
			let seat = this.obj.seat;
			let seatB = "";
			if (string != "" && string != null) {
				let stringList = string.split(",");
				let seatList = this.seatList;
				if (seatList.length != 0) {
					let seatListArr = seatList.split(",");
					for (let v = 0; v < stringList.length; v++) {
						if (
							seatListArr.indexOf(stringList[v]) == -1 &&
							seat.indexOf(stringList[v]) == -1
						) {
							if (seat == "" || seat == null) {
								seat = stringList[v] + "";
								seatB = seat;
							} else {
								if (seat.indexOf(stringList[v]) == -1) {
									seat = seat + "," + stringList[v];
									if (seatB == "" || seatB == null) {
										seatB = stringList[v];
									} else {
										seatB = seatB + "," + stringList[v];
									}
								}
							}
						}
					}
				} else {
					seat = string;
				}
			}

			if (this.form.seat == "") {
				this.form.seat = seat;
			} else {
				if (seatB != "") {
					this.form.seat = this.form.seat + "," + seatB;
				}
			}
			this.seatList = string;

		},
		//处理座位选择逻辑
		handleChooseSeat: function(row, col) {
			let seatValue = this.seatArray[row][col];
			let newArray = this.seatArray;
			//如果是已购座位，直接返回
			if (seatValue === 2) return;
			//如果是已选座位点击后变未选
			if (seatValue === 1) {
				newArray[row][col] = 0;
			} else if (seatValue === 0) {
				newArray[row][col] = 1;
			}
			//必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
			this.seatArray = newArray.slice();
		},
		/**
		 * 获取所有坐座位信息
		 */
		async get_list() {
			var json = await this.$get("~/api/i_want_to_customize/get_list"
						);
			if (json.result && json.result.list) {
				this.list_ = json.result.list;
			} else if (json.error) {
				console.error(json.error);
			}
			console.log(json);
			let list = json.result.list;
			if (list != null && list.length != 0) {
				let seatArr = "";
				for (let j = 0; j < list.length; j++) {
					let seat = list[j].seat;
					if (seat != null && seat != "") {
						if (seatArr == "") {
							seatArr = seat + "";
						} else {
							seatArr = seatArr + "," + seat;
						}
					}
				}
				this.seatList = seatArr;
			}
			this.initSeatArray(5, 8);
		},

		//初始座位数组
		initSeatArray: function() {
			let seatList = this.seatList;
			let seatArr = seatList.split(",");
			if (seatList == "" || seatList == null) {
				seatArr = [];
			}
			this.seatArr = seatArr;

			let seatArray = Array(this.seatRow)
				.fill(0)
				.map(() => Array(this.seatCol).fill(0));
			this.seatArray = seatArray;
			for (let j = 0; j < seatArr.length; j++) {
				let i = Math.floor(seatArr[j] / 8);
				let x = seatArr[j] % 8;
				seatArray[i][x] = 2;
			}
			let _this = this;
			uni.createSelectorQuery().in(this).select("#innerSeatWrapper").boundingClientRect(function(data) {
				_this.seatSize = data ?
						parseInt(
								parseInt(
										data.width,
										10
								) / _this.seatCol,
								8
						) :
						0;
				_this.size = parseInt(data.width, 9);
			}).exec(function(res){
				// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
			})
		},
	},
	onLoad(){
								this.get_list_user_seller();
														this.get_user_session_mall_users();
				this.get_list_user_mall_users();
																									this.get_list_customized_categories();
									this.get_list_pickup_category();
				},
}
</script>

<style scoped>
	input{
		font-size: 10px;
	}

	.form_edit {
		background-color: #fff;
		margin-bottom: 0.5rem;
		padding: 1rem;
		font-size: 10px;
	}

	.item {
		display: flex;
		padding: 0.2rem 0;
	}

	.left_text {
		flex: 0 0 25%;
		display: flex;
		align-items: center;
	}

	.right_text {
		flex: 0 0 75%;
		border-bottom: 1px solid #eee;
	}
	.right_text.btn_warp{
		border-bottom: 0;
	}

	.btn_submit {
		text-align: center;
		background-color: #fff;
		padding: 0.3rem;
		margin: 0.1rem 1rem;
		border: 1px solid #eee;
		border-radius: 0.5rem;
	}

	.btn_submit:hover {
		opacity: 0.5;
	}
	.btn_add_img{
		color: #D3D3D3;
		text-align: center;
		border: 1px solid #eee;
		height: 5rem;
		width: 5rem;
		position: relative;
	}
	.btn_add_img text{
		font-size: 35px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}

	.seat-wrapper {
	height: 370px;
	width: 500px;
	border: 1px dotted #c5c5c5;
	/* margin: 0 auto; */
	position: relative;
	overflow: hidden;
	}

	.inner-seat-wrapper {
	position: absolute;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
	}
	.seat {
	float: left;
	display: flex;
	justify-content: center;
	align-items: center;
	}
	.inner-seat {
	width: 80%;
	height: 80%;
	cursor: pointer;
	}

	.btn-wrapper {
	margin: 20px auto;
	width: 1000px;
	height: 30px;
	text-align: center;
	}

	.btn-buy {
	height: 100%;
	line-height: 35px;
	font-size: 15px;
	border-radius: 5px;
	padding: 0 5px;
	background-color: #ffa349;
	color: #ffffff;
	display: inline-block;
	cursor: pointer;
	margin: 5px;
	}

	.illustration {
	position: absolute;
	left: 10px;
	top: 20px;
	height: 35px;
	width: 300px;
	}

	.illustration-img-wrapper {
	width: 25px;
	height: 25px;
	position: relative;
	top: 50%;
	display: inline-block;
	transform: translateY(-50%);
	margin-left: 10px;
	}

	.illustration-text {
	display: inline-block;
	height: 100%;
	line-height: 35px;
	font-size: 14px;
	position: relative;
	top: -2px;
	}


	.selected-seat {
	background: url("/static/img/selected2.png") center center no-repeat;
	background-size: 100% 100%;
	}

	.unselected-seat {
	background: url("/static/img/unselected2.png") center center no-repeat;
	background-size: 100% 100%;
	}

	.bought-seat {
	background: url("/static/img/bought2.png") center center no-repeat;
	background-size: 100% 100%;
	}

</style>
<style scoped>
/*新样式*/
.diy_text_row {
  display: inline-block;
}
.container {
	margin-top:1rem ;
	padding: 1rem;
    -webkit-box-shadow: 0px 0px 0px #888888;
    box-shadow: 0px 0px 0px #888888;
}
.primary_btn{
		background-color: #22B8B8;
		color: #FFFFFF;
	}
	.btn_submit{
		padding: 0;
		margin-top:1rem ;
	}
	.row-item {
		padding: 10px 10px;
	    background: #f8f6fc;
		margin-bottom: 1rem;
	}
	.diy_field{
		padding-left: 1rem;
	}
	.diy_title{
		align-items: center;
        font-size: 14px;
        color: #333;
	}

	.row-item{
		display: flex !important;
		align-items: baseline;
	}
	.diy_select_flex{
		flex: 1;
	}
	.query_select{
		flex: 1;
		border-color: rgb(229, 229, 229);
		background-color: rgb(255, 255, 255);
		border-radius: 4px;
		box-sizing: border-box;
		flex: 1;
		width: 100%;
		line-height: 2;
		font-size: 14px;
		height: 2.4em;
		min-height: 2.4em;
		display: block;
		outline:none;
	}
</style>

