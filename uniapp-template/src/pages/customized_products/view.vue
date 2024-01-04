<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','product_name') || ($check_field('add','product_name') || $check_field('set','product_name'))" label="商品名称" name="product_name">
                            <uni-easyinput type="text" v-model="form['product_name']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','product_name')) || (!form['customized_products_id'] && $check_field('add','product_name'))" :disabled="disabledObj['product_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','product_name')">
                  {{ form['product_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','inventory') || ($check_field('add','inventory') || $check_field('set','inventory'))" label="库存" name="inventory">
                            <uni-easyinput type="text" v-model="form['inventory']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','inventory')) || (!form['customized_products_id'] && $check_field('add','inventory'))" :disabled="disabledObj['inventory_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','inventory')">
                  {{ form['inventory'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','attachment') || ($check_field('add','attachment') || $check_field('set','attachment'))" label="附件" name="attachment">
                    <!-- 查询权限 -->
                <view class="diy_field diy_file" v-if="$check_field('get','attachment')">
					<button v-if="form['attachment']" class="mini-btn" type="primary" size="mini" @click="download_file($fullUrl(form['attachment']))">下载文件</button>
                    <text v-else>无文件</text>
				</view>
				<button v-else-if="$check_field('add','attachment') || $check_field('set','attachment')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('attachment')">上传文件</button>
				<view class="file-url" v-if="attachment || form['attachment']">
					<view class="close_" @click="close_('attachment')">x</view>
					{{attachment}}
				</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','picture') || ($check_field('add','picture') || $check_field('set','picture'))" label="图片" name="picture">
                    <!-- 修改权限 -->
                <view class="diy_field diy_img" v-if="form['picture'] && $check_field('set','picture')">
                  <image v-if="disabledObj['picture_isDisabled']" :src="$fullUrl(form['picture'])" />
                  <image v-if="!disabledObj['picture_isDisabled']" :src="$fullUrl(form['picture'])" @click="change_img('picture')" />
                </view>
                <!-- 添加权限 -->
                <view class="diy_field diy_img" v-else-if="!form['picture'] && $check_field('add','picture')">
                  <view v-if="disabledObj['picture_isDisabled']" class="btn_add_img">
                    <text>+</text>
                  </view>
                  <view v-if="!disabledObj['picture_isDisabled']" class="btn_add_img" @click="change_img('picture')">
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view class="diy_field diy_img" v-else-if="$check_field('get','picture')">
                  <image :src="$fullUrl(form['picture'])" />
                </view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','video') || ($check_field('add','video') || $check_field('set','video'))" label="视频" name="video">
                    <!-- 查询权限 -->
                <view class="diy_field diy_video" v-if="$check_field('get','video') && form['video']">
				<view class="close_" @click="close_('video')">x</view>
					<video
						:src="$fullUrl(form['video'])"
						controls
					></video>
				</view>
				<button v-else-if="$check_field('add','video') || $check_field('set','video')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('video')">上传视频</button>
				<view class="file-url" v-if="video">{{video}}</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','audio_frequency') || ($check_field('add','audio_frequency') || $check_field('set','audio_frequency'))" label="音频" name="audio_frequency">
                    <!-- 查询权限 -->
                <view class="diy_field diy_audio" v-if="$check_field('get','audio_frequency') && form['audio_frequency']">
				<view class="close_"@click="close_('audio_frequency')">x</view>
					<video
							style="text-align: left"
							:src="$fullUrl(form['audio_frequency'])"
							controls
					></video>
				</view>
				<button v-else-if="$check_field('add','audio_frequency') || $check_field('set','audio_frequency')" class="mini-btn" type="primary" size="mini" @click="uploadFile_('audio_frequency')">上传音频</button>
				<view class="file-url" v-if="audio_frequency">{{audio_frequency}}</view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','remarks') || ($check_field('add','remarks') || $check_field('set','remarks'))" label="备注" name="remarks">
                    <uni-easyinput type="textarea" v-model="form['remarks']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','remarks')) || (!form['customized_products_id'] && $check_field('add','remarks'))" :disabled="disabledObj['remarks_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','remarks')">
                  {{ form['remarks'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','seller') || ($check_field('add','seller') || $check_field('set','seller'))" label="卖家" name="seller">
                    <uni-data-select
                  id="form_seller"
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="!disabledObj['seller_isDisabled']"
                  :disabled="disabledObj['seller_isDisabled']"
                  v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','seller')) || (!form['customized_products_id'] && $check_field('add','seller'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','seller')" id="seller"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','price') || ($check_field('add','price') || $check_field('set','price'))" label="价格" name="price">
                            <uni-easyinput type="text" v-model="form['price']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','price')) || (!form['customized_products_id'] && $check_field('add','price'))" :disabled="disabledObj['price_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','price')">
                  {{ form['price'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','details') || ($check_field('add','details') || $check_field('set','details'))" label="详情" name="details">
                    <uni-easyinput type="textarea" v-model="form['details']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','details')) || (!form['customized_products_id'] && $check_field('add','details'))" :disabled="disabledObj['details_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','details')">
                  {{ form['details'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','production_time') || ($check_field('add','production_time') || $check_field('set','production_time'))" label="生产时间" name="production_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','production_time')) || (!form['customized_products_id'] && $check_field('add','production_time'))" @change="changeLog($event,'production_time')" v-model="form['production_time']" type="datetime" :disabled="disabledObj['production_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','production_time')">
                  {{ form['production_time'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','date') || ($check_field('add','date') || $check_field('set','date'))" label="日期" name="date">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','date')) || (!form['customized_products_id'] && $check_field('add','date'))" v-model="form['date']" type="date" :disabled="disabledObj['date_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','date')">
                  {{ form['date'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','is_it_a_special_offer') || ($check_field('add','is_it_a_special_offer') || $check_field('set','is_it_a_special_offer'))" label="是否特价" name="is_it_a_special_offer">
                    <uni-data-select
                  v-model="form.is_it_a_special_offer"
                  :localdata="list_is_it_a_special_offer"
                  :clear="!disabledObj['is_it_a_special_offer_isDisabled']"
                  :disabled="disabledObj['is_it_a_special_offer_isDisabled']"
                  v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','is_it_a_special_offer')) || (!form['customized_products_id'] && $check_field('add','is_it_a_special_offer'))"
                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','is_it_a_special_offer')">
                  {{ form['is_it_a_special_offer'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','product_category') || ($check_field('add','product_category') || $check_field('set','product_category'))" label="商品类别" name="product_category">
     && product_category && classification_information)
                <uni-data-select
                  v-model="form.product_category"
                  :localdata="list_product_category"
                  :clear="!disabledObj['product_category_isDisabled']"
                  :disabled="disabledObj['product_category_isDisabled']"
                  v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','product_category')) || (!form['customized_products_id'] && $check_field('add','product_category'))"
                  @change="select_product_category_field"                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','product_category')">
                  {{ form['product_category'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','category') || ($check_field('add','category') || $check_field('set','category'))" label="类别" name="category">
                    <uni-easyinput type="text" v-model="form['category']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','category')) || (!form['customized_products_id'] && $check_field('add','category'))" :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','category')">
                  {{ form['category'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','customized_categories') || ($check_field('add','customized_categories') || $check_field('set','customized_categories'))" label="定制类别" name="customized_categories">
                    <uni-easyinput type="text" v-model="form['customized_categories']" v-if="user_group === '管理员' || (form['customized_products_id'] && $check_field('set','customized_categories')) || (!form['customized_products_id'] && $check_field('add','customized_categories'))" :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','customized_categories')">
                  {{ form['customized_categories'] }}
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

              <uni-forms-item label="计时器标题" name="timer_title">
                <uni-easyinput v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" v-model="form['timer_title']" type="text" :disabled="disabledObj['timer_title_isDisabled']" />
                <text v-else-if="$check_field('get','timer_title')">
                  {{ form['timer_title'] }}
                </text>
              </uni-forms-item>
              <uni-forms-item label="计时开始时间" name="timing_start_time">
                <uni-datetime-picker v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" @change="changeLog($event,'timing_start_time')" v-model="form['timing_start_time']" type="datetime" :disabled="disabledObj['timing_start_time_isDisabled']" />
                <text v-else-if="$check_field('get','timing_start_time')">
                  {{ form['timing_start_time'] }}
                </text>
              </uni-forms-item>
              <uni-forms-item label="计时结束时间" name="timing_end_time">
                <uni-datetime-picker v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" @change="changeLog($event,'timing_end_time')" v-model="form['timing_end_time']" type="datetime" :disabled="disabledObj['timing_end_time_isDisabled']" />
                <text v-else-if="$check_field('get','timing_end_time')">
                  {{ form['timing_end_time'] }}
                </text>
              </uni-forms-item>
              <uni-forms-item label="当前位置" name="location_address">
                <uni-easyinput type="text" placeholder="当前位置":disabled="true" v-model="form['location_address']" />
                <button size="mini" @click="getLongitudeLatitude()">定位</button>
              </uni-forms-item>
              <uni-forms-item label="限制次数" name="limit_times">
                <uni-easyinput v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" v-model="form['limit_times']" type="number" :disabled="disabledObj['limit_times_isDisabled']" />
                <text v-else-if="$check_action('/customized_products/view','get')">
                  {{ form['limit_times'] }}
                </text>
              </uni-forms-item>
         <uni-forms-item label="二维码图片" name="qrcode_img">
                <!-- 修改权限 -->
                <view
                  class="diy_field diy_img"
                  v-if="form['qrcode_img'] && (user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add')))"
                >
                  <image
                    v-if="disabledObj['qrcode_img_isDisabled']"
                    :src="$fullUrl(form['qrcode_img'])"
                  />
                  <image
                    v-if="!disabledObj['qrcode_img_isDisabled']"
                    :src="$fullUrl(form['qrcode_img'])"
                    @click="change_img('qrcode_img')"
                  />
                </view>
                <!-- 添加权限 -->
                <view
                  class="diy_field diy_img"
                  v-else-if="!form['qrcode_img'] && (user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add')))"
                >
                  <view
                    v-if="disabledObj['qrcode_img_isDisabled']"
                    class="btn_add_img"
                  >
                    <text>+</text>
                  </view>
                  <view
                    v-if="!disabledObj['qrcode_img_isDisabled']"
                    class="btn_add_img"
                    @click="change_img('qrcode_img')"
                  >
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view
                  class="diy_field diy_img"
                  v-else-if="$check_action('/customized_products/view','get')"
                >
                  <image :src="$fullUrl(form['qrcode_img'])" />
                </view>
         </uni-forms-item>
       <uni-forms-item label="二维码标题" name="qrcode_title">
            <uni-easyinput  v-model="form['qrcode_title']" placeholder="请输入二维码标题"
                    v-if="user_group === '管理员' || (form['customized_products_id'] && $check_action('/customized_products/view','set')) || (!form['customized_products_id'] && $check_action('/customized_products/view','add'))" :disabled="disabledObj['qrcode_title_isDisabled']"></uni-easyinput>
            <text v-else-if="$check_action('/customized_products/view','get')">{{form['qrcode_title']}}</text>
        </uni-forms-item>

            </uni-forms>
            <view class="form_button" v-if="$check_action('/customized_products/view','set') || ($check_action('/customized_products/view','add') || $check_option('/customized_products/table','examine'))">
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
      field: "customized_products_id",
      url_add: "~/api/customized_products/add?",
      url_set: "~/api/customized_products/set?",
      url_get_obj: "~/api/customized_products/get_obj?",
      url_upload: "~/api/customized_products/upload?"
	  ,product_name: null
	  ,inventory: null
	  ,attachment: null
	  ,picture: null
	  ,video: null
	  ,audio_frequency: null
	  ,remarks: null
	  ,seller: null
	  ,price: null
	  ,details: null
	  ,production_time: null
	  ,date: null
	  ,is_it_a_special_offer: null
	  ,product_category: null
	  ,category: null
	  ,customized_categories: null
      ,query: {
        "customized_products_id": 0,
      },

      form: {
            "product_name":  '', // 商品名称
                    "inventory":  0 , // 库存
                    "attachment":  '', // 附件
                    "picture":  '', // 图片
                    "video":  '', // 视频
                    "audio_frequency":  '', // 音频
                    "remarks":  '', // 备注
                    "seller": 0, // 卖家
                    "price":  0 , // 价格
                    "details":  '', // 详情
                    "production_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
                    "date": this.$toTime(new Date().getTime(), "yyyy-MM-dd"),
                    "is_it_a_special_offer":  '', // 是否特价
                    "product_category":  '', // 商品类别
                    "category":  '', // 类别
                    "customized_categories":  '', // 定制类别
                        "examine_state": "未审核",
                    "examine_reply": "",
                    "customized_products_id": 0, // ID
                "timer_title":'', // 计时器标题
            "timing_start_time":'', // 计时开始时间
            "timing_end_time":'', // 计时结束时间
                    "limit_times": "", // 限制次数
                    "limit_type":2,
                                "qrcode_img":'', // 图片
            "qrcode_title":'', // 二维码标题
    
                "location_address": "", // 定位地址
            "location_lng": "", // 定位地址经度
            "location_lat": "", // 定位地址纬度
              },
          disabledObj:{
                        "product_name_isDisabled": false,
                                                    "attachment_isDisabled": false,
                                "picture_isDisabled": false,
                                "video_isDisabled": false,
                                "audio_frequency_isDisabled": false,
                                "remarks_isDisabled": false,
                                "seller_isDisabled": false,
                                                    "details_isDisabled": false,
                                "production_time_isDisabled": false,
                                "date_isDisabled": false,
                                "is_it_a_special_offer_isDisabled": false,
                                "product_category_isDisabled": false,
                                "category_isDisabled": false,
                                "customized_categories_isDisabled": false,
                            "timer_title_isDisabled": false, // 计时器标题
            "timing_start_time_isDisabled": false, // 计时开始时间
            "timing_end_time_isDisabled": false, // 计时结束时间
                    "limit_times_isDisabled": false, // 限制次数
                    "qrcode_img_isDisabled": false,
            "qrcode_title_isDisabled": false,
              },
                                                                                                                                                                            // 用户列表
            list_user_seller: [],
                        // 用户组
            group_user_seller: "",
                                                                                                                                      // 是否特价选项列表
          list_is_it_a_special_offer: [],
                                                  // 商品类别选项列表
          list_product_category: [],
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
				url: getApp().globalData.host + '/api/customized_products/upload', //仅为示例，非真实的接口地址
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
					if (type == 'inventory') this['inventory'] = this.form['inventory'] = ""
					if (type == 'attachment') this['attachment'] = this.form['attachment'] = ""
					if (type == 'picture') this['picture'] = this.form['picture'] = ""
					if (type == 'video') this['video'] = this.form['video'] = ""
					if (type == 'audio_frequency') this['audio_frequency'] = this.form['audio_frequency'] = ""
					if (type == 'remarks') this['remarks'] = this.form['remarks'] = ""
					if (type == 'seller') this['seller'] = this.form['seller'] = ""
					if (type == 'price') this['price'] = this.form['price'] = ""
					if (type == 'details') this['details'] = this.form['details'] = ""
					if (type == 'production_time') this['production_time'] = this.form['production_time'] = ""
					if (type == 'date') this['date'] = this.form['date'] = ""
					if (type == 'is_it_a_special_offer') this['is_it_a_special_offer'] = this.form['is_it_a_special_offer'] = ""
					if (type == 'product_category') this['product_category'] = this.form['product_category'] = ""
					if (type == 'category') this['category'] = this.form['category'] = ""
					if (type == 'customized_categories') this['customized_categories'] = this.form['customized_categories'] = ""
			}
	,submit_() {
					if (this['product_name'] !== null) this.form['product_name'] = this['product_name']
					if (this['inventory'] !== null) this.form['inventory'] = this['inventory']
					if (this['attachment'] !== null) this.form['attachment'] = this['attachment']
					if (this['picture'] !== null) this.form['picture'] = this['picture']
					if (this['video'] !== null) this.form['video'] = this['video']
					if (this['audio_frequency'] !== null) this.form['audio_frequency'] = this['audio_frequency']
					if (this['remarks'] !== null) this.form['remarks'] = this['remarks']
					if (this['seller'] !== null) this.form['seller'] = this['seller']
					if (this['price'] !== null) this.form['price'] = this['price']
					if (this['details'] !== null) this.form['details'] = this['details']
					if (this['production_time'] !== null) this.form['production_time'] = this['production_time']
					if (this['date'] !== null) this.form['date'] = this['date']
					if (this['is_it_a_special_offer'] !== null) this.form['is_it_a_special_offer'] = this['is_it_a_special_offer']
					if (this['product_category'] !== null) this.form['product_category'] = this['product_category']
					if (this['category'] !== null) this.form['category'] = this['category']
					if (this['customized_categories'] !== null) this.form['customized_categories'] = this['customized_categories']
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
            url: _self.$fullUrl('/api/customized_products/upload?'),
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
            url: _self.$fullUrl('/api/customized_products/upload?'),
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
                                                                                          if (this.form["production_time"] && JSON.stringify(this.form["production_time"]).indexOf("-")===-1) {
        this.form["production_time"] = this.$toTime(parseInt(this.form["production_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                      if (this.form["date"] && JSON.stringify(this.form["date"]).indexOf("-")===-1) {
        this.form["date"] = this.$toTime(parseInt(this.form["date"]), "yyyy-MM-dd")
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
            /**
     * 获取卖家用户组
     */
    async get_group_user_seller() {
      this.form["seller"] = this.user.user_id;
      var json = await this.$get("~/api/user_group/get_obj?name=卖家");
      if(json.result && json.result.obj){
        this.group_user_seller = json.result.obj;
        this.get_user_session_seller(this.form['seller'])
      }
      else if(json.error){
        console.error(json.error);
      }
    },
    get_user_session_seller(id){
      var _this = this;
      var user_id = {"user_id":id}
      var url = "~/api/"+_this.group_user_seller.source_table+"/get_obj?"
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
                  if (arr[i] !== "seller") {
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
     * 获取是否特价列表
     */
    async get_list_is_it_a_special_offer() {
                  ['是','否'].map((o) => this.list_is_it_a_special_offer.push({value:o,text:o}));
                    },
                
            /**
     * 获取商品类别列表
     */
    async get_list_product_category() {
                          var json = await this.$get("~/api/classification_information/get_list?");
          if(json.result && json.result.list){
            json.result.list.map((o) => this.list_product_category.push({value:o.product_category,text:o.product_category}));
          }
          else if(json.error){
            console.error(json.error);
          }
            },
          select_product_category_field(v){
          if (v) {
            this.$get('~/api/classification_information/get_obj?product_category=' + v, {}, (res) => {
              if (res.result && res.result.obj) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                this.form.category = res.result.obj.category;
                                                                                      this.form.customized_categories = res.result.obj.customized_categories;
                                                      } else {
                console.error(res.error);
              }
            })
          }
      },
                
            
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                                                                                                                  if (this.form["production_time"] && JSON.stringify(this.form["production_time"]).indexOf("-")===-1) {
        this.form["production_time"] = this.$toTime(parseInt(this.form["production_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                          if (this.form["date"] && JSON.stringify(this.form["date"]).indexOf("-")===-1) {
        this.form["date"] = this.$toTime(parseInt(this.form["date"]),"yyyy-MM-dd")
      }
                                                            },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/customized_products/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/customized_products/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/customized_products/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/customized_products/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/customized_products/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },
    getLongitudeLatitude() {
        let _this = this;
        _this.form.location_address = "广东省深圳市南山区科技园";
        _this.form.location_lng = "113.946782";
        _this.form.location_lat = "22.556481";
        uni.getLocation({
            type: 'gcj02',
            success: function (res) {
                let lat = res.latitude //当前位置的纬度
                let lng = res.longitude //当前位置精度
                let location=lng+","+lat;
                let url = "http://restapi.amap.com/v3/geocode/regeo?key=b6eb2819a6ba4c5119591614272fe7ca&location="+location;
                uni.request({url, method: "GET",dataType: "json",
                    success: function (res) {
                        if (res.statusCode===200){
                            let data = res.data;
                            if (data.status==='1'){
                                _this.form.location_address = data.regeocode.formatted_address;
                                _this.form.location_lng = JSON.stringify(lng);
                                _this.form.location_lat = JSON.stringify(lat);
                            }else {
                                console.log(data.info)
                            }
                        }
                    },error: function (err) {
                    console.log(err);
                    }
                })
            },error: function (err) {
                console.log(err);
            }
        })
    },

  },
  created() {
                                                                    this.get_list_user_seller();
            this.get_group_user_seller();
                                                    this.get_list_is_it_a_special_offer();
                this.get_list_product_category();
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
