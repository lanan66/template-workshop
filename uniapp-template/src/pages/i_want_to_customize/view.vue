<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','product_name') || ($check_field('add','product_name') || $check_field('set','product_name'))" label="商品名称" name="product_name">
                            <uni-easyinput type="text" v-model="form['product_name']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','product_name')) || (!form['i_want_to_customize_id'] && $check_field('add','product_name'))" :disabled="disabledObj['product_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','product_name')">
                  {{ form['product_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','seller') || ($check_field('add','seller') || $check_field('set','seller'))" label="卖家" name="seller">
                    <uni-data-select
                  id="form_seller"
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="!disabledObj['seller_isDisabled']"
                  :disabled="disabledObj['seller_isDisabled']"
                  v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','seller')) || (!form['i_want_to_customize_id'] && $check_field('add','seller'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','seller')" id="seller"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','purchase_quantity') || ($check_field('add','purchase_quantity') || $check_field('set','purchase_quantity'))" label="购买数量" name="purchase_quantity">
                            <uni-easyinput type="text" v-model="form['purchase_quantity']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','purchase_quantity')) || (!form['i_want_to_customize_id'] && $check_field('add','purchase_quantity'))" :disabled="disabledObj['purchase_quantity_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','purchase_quantity')">
                  {{ form['purchase_quantity'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','price') || ($check_field('add','price') || $check_field('set','price'))" label="价格" name="price">
                            <uni-easyinput type="text" v-model="form['price']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','price')) || (!form['i_want_to_customize_id'] && $check_field('add','price'))" :disabled="disabledObj['price_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','price')">
                  {{ form['price'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','total_amount') || ($check_field('add','total_amount') || $check_field('set','total_amount'))" label="总金额" name="total_amount">
                            <uni-easyinput type="text" v-model="form['total_amount']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','total_amount')) || (!form['i_want_to_customize_id'] && $check_field('add','total_amount'))"  @focus="set_total_amount()" :disabled="disabledObj['total_amount_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','total_amount')">
                  {{ form['total_amount'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','mall_users') || ($check_field('add','mall_users') || $check_field('set','mall_users'))" label="商城用户" name="mall_users">
                    <uni-data-select
                  id="form_mall_users"
                  v-model="form['mall_users']"
                  :localdata="list_user_mall_users"
                  :clear="!disabledObj['mall_users_isDisabled']"
                  :disabled="disabledObj['mall_users_isDisabled']"
                  v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','mall_users')) || (!form['i_want_to_customize_id'] && $check_field('add','mall_users'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['mall_users']"
                  :localdata="list_user_mall_users"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','mall_users')" id="mall_users"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','customization_requirements') || ($check_field('add','customization_requirements') || $check_field('set','customization_requirements'))" label="定制要求" name="customization_requirements">
                    <uni-easyinput type="textarea" v-model="form['customization_requirements']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','customization_requirements')) || (!form['i_want_to_customize_id'] && $check_field('add','customization_requirements'))" :disabled="disabledObj['customization_requirements_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','customization_requirements')">
                  {{ form['customization_requirements'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','related_images') || ($check_field('add','related_images') || $check_field('set','related_images'))" label="相关图片" name="related_images">
                    <!-- 修改权限 -->
                <view class="diy_field diy_img" v-if="form['related_images'] && $check_field('set','related_images')">
                  <image v-if="disabledObj['related_images_isDisabled']" :src="$fullUrl(form['related_images'])" />
                  <image v-if="!disabledObj['related_images_isDisabled']" :src="$fullUrl(form['related_images'])" @click="change_img('related_images')" />
                </view>
                <!-- 添加权限 -->
                <view class="diy_field diy_img" v-else-if="!form['related_images'] && $check_field('add','related_images')">
                  <view v-if="disabledObj['related_images_isDisabled']" class="btn_add_img">
                    <text>+</text>
                  </view>
                  <view v-if="!disabledObj['related_images_isDisabled']" class="btn_add_img" @click="change_img('related_images')">
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view class="diy_field diy_img" v-else-if="$check_field('get','related_images')">
                  <image :src="$fullUrl(form['related_images'])" />
                </view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','completion_time') || ($check_field('add','completion_time') || $check_field('set','completion_time'))" label="完成时间" name="completion_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','completion_time')) || (!form['i_want_to_customize_id'] && $check_field('add','completion_time'))" @change="changeLog($event,'completion_time')" v-model="form['completion_time']" type="datetime" :disabled="disabledObj['completion_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','completion_time')">
                  {{ form['completion_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','related_attachments') || ($check_field('add','related_attachments') || $check_field('set','related_attachments'))" label="相关附件" name="related_attachments">
                    <!-- 查询权限 -->
                <view class="diy_field diy_file" v-if="$check_field('get','related_attachments')">
					<button v-if="form['related_attachments']" class="mini-btn" type="primary" size="mini" @click="download_file($fullUrl(form['related_attachments']))">下载文件</button>
                    <text v-else>无文件</text>
				</view>
				<button v-else-if="$check_field('add','related_attachments') || $check_field('set','related_attachments')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('related_attachments')">上传文件</button>
				<view class="file-url" v-if="related_attachments || form['related_attachments']">
					<view class="close_" @click="close_('related_attachments')">x</view>
					{{related_attachments}}
				</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','customized_video') || ($check_field('add','customized_video') || $check_field('set','customized_video'))" label="定制视频" name="customized_video">
                    <!-- 查询权限 -->
                <view class="diy_field diy_video" v-if="$check_field('get','customized_video') && form['customized_video']">
				<view class="close_" @click="close_('customized_video')">x</view>
					<video
						:src="$fullUrl(form['customized_video'])"
						controls
					></video>
				</view>
				<button v-else-if="$check_field('add','customized_video') || $check_field('set','customized_video')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('customized_video')">上传视频</button>
				<view class="file-url" v-if="customized_video">{{customized_video}}</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','customized_audio') || ($check_field('add','customized_audio') || $check_field('set','customized_audio'))" label="定制音频" name="customized_audio">
                    <!-- 查询权限 -->
                <view class="diy_field diy_audio" v-if="$check_field('get','customized_audio') && form['customized_audio']">
				<view class="close_"@click="close_('customized_audio')">x</view>
					<video
							style="text-align: left"
							:src="$fullUrl(form['customized_audio'])"
							controls
					></video>
				</view>
				<button v-else-if="$check_field('add','customized_audio') || $check_field('set','customized_audio')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('customized_audio')">上传音频</button>
				<view class="file-url" v-if="customized_audio">{{customized_audio}}</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','required_date') || ($check_field('add','required_date') || $check_field('set','required_date'))" label="要求日期" name="required_date">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','required_date')) || (!form['i_want_to_customize_id'] && $check_field('add','required_date'))" v-model="form['required_date']" type="date" :disabled="disabledObj['required_date_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','required_date')">
                  {{ form['required_date'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','customized_categories') || ($check_field('add','customized_categories') || $check_field('set','customized_categories'))" label="定制类别" name="customized_categories">
     && customized_categories && classification_information)
                <uni-data-select
                  v-model="form.customized_categories"
                  :localdata="list_customized_categories"
                  :clear="!disabledObj['customized_categories_isDisabled']"
                  :disabled="disabledObj['customized_categories_isDisabled']"
                  v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','customized_categories')) || (!form['i_want_to_customize_id'] && $check_field('add','customized_categories'))"
                                  ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','customized_categories')">
                  {{ form['customized_categories'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','customization_details') || ($check_field('add','customization_details') || $check_field('set','customization_details'))" label="定制详情" name="customization_details">
                    <uni-easyinput type="textarea" v-model="form['customization_details']" v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','customization_details')) || (!form['i_want_to_customize_id'] && $check_field('add','customization_details'))" :disabled="disabledObj['customization_details_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','customization_details')">
                  {{ form['customization_details'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','pickup_category') || ($check_field('add','pickup_category') || $check_field('set','pickup_category'))" label="取货类别" name="pickup_category">
                    <uni-data-select
                  v-model="form.pickup_category"
                  :localdata="list_pickup_category"
                  :clear="!disabledObj['pickup_category_isDisabled']"
                  :disabled="disabledObj['pickup_category_isDisabled']"
                  v-if="user_group === '管理员' || (form['i_want_to_customize_id'] && $check_field('set','pickup_category')) || (!form['i_want_to_customize_id'] && $check_field('add','pickup_category'))"
                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','pickup_category')">
                  {{ form['pickup_category'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item label="审核状态" name="examine_state">
                <uni-data-select
                    v-model="form['examine_state']"
                    :localdata="list_examine_state"
                    v-if="user_group === '管理员' || (form['examine_state'] && $check_examine()) || (!form['examine_state'] && $check_examine())"
                ></uni-data-select>
                <text v-else>{{form["examine_state"]}}</text>
              </uni-forms-item>
              <uni-forms-item label="审核回复" name="examine_reply">
                <uni-easyinput type="text" placeholder="请输入审核回复" v-model="form['examine_reply']"
                               v-if="user_group === '管理员' || (form['examine_reply'] && $check_examine()) || (!form['examine_reply'] && $check_examine())" />
                <!-- 仅查看 -->
                <text v-else>{{form["examine_reply"]}}</text>
              </uni-forms-item>


            </uni-forms>
            <view class="form_button" v-if="$check_action('/i_want_to_customize/view','set') || ($check_action('/i_want_to_customize/view','add') || $check_option('/i_want_to_customize/table','examine'))">
              <button size="mini" type="primary" @click="submit_()" class="primary_btn">提交</button>
              <button size="mini" @click="cancel()">取消</button>
            </view>
            <view class="form_button" v-else>
              <button size="mini" @click="cancel()">返回</button>
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
  mixins: [mixin],
  data() {
    return {
      field: "i_want_to_customize_id",
      url_add: "~/api/i_want_to_customize/add?",
      url_set: "~/api/i_want_to_customize/set?",
      url_get_obj: "~/api/i_want_to_customize/get_obj?",
      url_upload: "~/api/i_want_to_customize/upload?"
	  ,product_name: null
	  ,seller: null
	  ,purchase_quantity: null
	  ,price: null
	  ,total_amount: null
	  ,mall_users: null
	  ,customization_requirements: null
	  ,related_images: null
	  ,completion_time: null
	  ,related_attachments: null
	  ,customized_video: null
	  ,customized_audio: null
	  ,required_date: null
	  ,customized_categories: null
	  ,customization_details: null
	  ,pickup_category: null
      ,query: {
        "i_want_to_customize_id": 0,
      },

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
                    "i_want_to_customize_id": 0, // ID
                
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
                        // 用户组
            group_user_mall_users: "",
                                                                                                                                                                                                  // 定制类别选项列表
          list_customized_categories: [],
                                                                      // 取货类别选项列表
          list_pickup_category: [],
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

    changeLog(v,value){
      this.form[value] = v
    }
	,uploadFile_(type) {
			// #ifdef APP-VUE
				uni.chooseFile({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.successChoose(tempFilePaths[0], type)
					}
				});
			// #endif
			// #ifdef !APP-VUE
				if (uni.getSystemInfoSync().uniPlatform != "mp-weixin" || uni.getSystemInfoSync().platform == "devtools") {
					uni.chooseImage({
						count: 1,
						success: (chooseImageRes) => {
							const tempFilePaths = chooseImageRes.tempFilePaths;
							this.successChoose(tempFilePaths[0], type)
						}
					});
				} else {
					wx.chooseMessageFile({
						count: 1,
						success: (chooseImageRes) => {
							const tempFilePaths = chooseImageRes.tempFiles;
							this.successChoose(tempFilePaths[0].path, type)
						}
					})
				}
			// #endif
			
		}
		,successChoose(filePath, type) {
			uni.uploadFile({
				url: getApp().globalData.host + '/api/i_want_to_customize/upload', //仅为示例，非真实的接口地址
				filePath,
				name: 'file',
				success: (uploadFileRes) => {
					if (uploadFileRes.data.error) {
						uni.showToast({title: uploadFileRes.data.error.message, icon: "none"})
					} else {
						this[type] = JSON.parse(uploadFileRes.data).result.url
					}
				}
			});
		}
	,close_(type) {
					if (type == 'product_name') this['product_name'] = this.form['product_name'] = ""
					if (type == 'seller') this['seller'] = this.form['seller'] = ""
					if (type == 'purchase_quantity') this['purchase_quantity'] = this.form['purchase_quantity'] = ""
					if (type == 'price') this['price'] = this.form['price'] = ""
					if (type == 'total_amount') this['total_amount'] = this.form['total_amount'] = ""
					if (type == 'mall_users') this['mall_users'] = this.form['mall_users'] = ""
					if (type == 'customization_requirements') this['customization_requirements'] = this.form['customization_requirements'] = ""
					if (type == 'related_images') this['related_images'] = this.form['related_images'] = ""
					if (type == 'completion_time') this['completion_time'] = this.form['completion_time'] = ""
					if (type == 'related_attachments') this['related_attachments'] = this.form['related_attachments'] = ""
					if (type == 'customized_video') this['customized_video'] = this.form['customized_video'] = ""
					if (type == 'customized_audio') this['customized_audio'] = this.form['customized_audio'] = ""
					if (type == 'required_date') this['required_date'] = this.form['required_date'] = ""
					if (type == 'customized_categories') this['customized_categories'] = this.form['customized_categories'] = ""
					if (type == 'customization_details') this['customization_details'] = this.form['customization_details'] = ""
					if (type == 'pickup_category') this['pickup_category'] = this.form['pickup_category'] = ""
			}
	,submit_() {
					if (this['product_name'] !== null) this.form['product_name'] = this['product_name']
					if (this['seller'] !== null) this.form['seller'] = this['seller']
					if (this['purchase_quantity'] !== null) this.form['purchase_quantity'] = this['purchase_quantity']
					if (this['price'] !== null) this.form['price'] = this['price']
					if (this['total_amount'] !== null) this.form['total_amount'] = this['total_amount']
					if (this['mall_users'] !== null) this.form['mall_users'] = this['mall_users']
					if (this['customization_requirements'] !== null) this.form['customization_requirements'] = this['customization_requirements']
					if (this['related_images'] !== null) this.form['related_images'] = this['related_images']
					if (this['completion_time'] !== null) this.form['completion_time'] = this['completion_time']
					if (this['related_attachments'] !== null) this.form['related_attachments'] = this['related_attachments']
					if (this['customized_video'] !== null) this.form['customized_video'] = this['customized_video']
					if (this['customized_audio'] !== null) this.form['customized_audio'] = this['customized_audio']
					if (this['required_date'] !== null) this.form['required_date'] = this['required_date']
					if (this['customized_categories'] !== null) this.form['customized_categories'] = this['customized_categories']
					if (this['customization_details'] !== null) this.form['customization_details'] = this['customization_details']
					if (this['pickup_category'] !== null) this.form['pickup_category'] = this['pickup_category']
				console.log(this.form)
		this.submit()
	}
    /**
     * 上传文件
     * @param {Object} param文件参数
     */
    ,change_file(key_name){
      var _self = this;
      // 选择图像方法
      uni.chooseFile({
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
              _self.form[key_name] = filename
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
              _self.form[key_name] = filename
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
      return param;
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
            /**
     * 获取商城用户用户组
     */
    async get_group_user_mall_users() {
      this.form["mall_users"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=商城用户");
      if(json.result && json.result.obj){
        this.group_user_mall_users = json.result.obj;
        this.get_user_session_mall_users(this.form['mall_users'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_mall_users(id){
      var _this = this;
      var user_id = {"user_id":id}
      var url = "~/api/"+_this.group_user_mall_users.source_table+"/get_obj?"
      this.$get(url, user_id, function(res) {
        if (res.result && res.result.obj) {
          var arr = []
          for (let key in res.result.obj) {
            arr.push(key)
          }
          var arrForm = []
          for (let key in _this.form) {
            arrForm.push(key)
          }
          for (var i=0;i<arr.length;i++){
            if (arr[i]!=='examine_state' && arr[i]!=='examine_reply') {
              for (var j = 0; j < arrForm.length; j++) {
                if (arr[i] === arrForm[j]) {
                  if (arr[i] !== "mall_users") {
                    _this.form[arrForm[j]] = res.result.obj[arr[i]]
                    _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                    break;
                  } else {
                    _this.disabledObj[arrForm[j] + '_isDisabled'] = true
                  }
                }
              }
            }
          }
        }
      });
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
                
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                                                                                          if (this.form["completion_time"] && JSON.stringify(this.form["completion_time"]).indexOf("-")===-1) {
        this.form["completion_time"] = this.$toTime(parseInt(this.form["completion_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                                              if (this.form["required_date"] && JSON.stringify(this.form["required_date"]).indexOf("-")===-1) {
        this.form["required_date"] = this.$toTime(parseInt(this.form["required_date"]),"yyyy-MM-dd")
      }
                                                },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/i_want_to_customize/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/i_want_to_customize/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/i_want_to_customize/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/i_want_to_customize/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/i_want_to_customize/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
                    this.get_list_user_seller();
                                                this.get_list_user_mall_users();
            this.get_group_user_mall_users();
                                                                            this.get_list_customized_categories();
                        this.get_list_pickup_category();
          },
}
</script>

<style scoped>
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

.form_button{
  padding-bottom: 15px;
  display: flex;
}
.form_button button{
  width: 40%;
}
.query_select{
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

.query_option{
  width: 100%;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.form_button {
  padding-bottom: 15px;
  display: flex;
}
.form_button button {
  width: 40%;
}
.query_select {
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
  outline: none;
}

.query_option {
  width: 100%;
}

.btn_add_img {
  color: #d3d3d3;
  text-align: center;
  border: 1px solid #eee;
  height: 5rem;
  width: 5rem;
  position: relative;
}
.btn_add_img text {
  font-size: 35px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/*新样式*/
.uni-forms{
padding-top:1rem;
}
.uni-forms-item {
	padding: 6px 10px;
    background: #f8f6fc;
}
.uni-forms .is-input-border{
	border: 0;
}
.container{
	    -webkit-box-shadow: 0px 0px 0px #888888;
	    box-shadow: 0px 0px 0px #888888;
}
.form_button .primary_btn{
		background-color: #22B8B8;
		color: #FFFFFF;
	}
.file-url {
	font-size: 12px;
	color: #ccc;
}
	.diy_field, .file-url {
		position: relative;
	}
	.close_ {
		position: absolute;
		top: -18px;
		left: -7px;
		font-size: 22px;
		color: #22B8B8;
		font-weight: 600;
	}
</style>
