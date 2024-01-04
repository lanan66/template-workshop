<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','product_category') || ($check_field('add','product_category') || $check_field('set','product_category'))" label="商品类别" name="product_category">
                            <uni-easyinput type="text" v-model="form['product_category']" v-if="user_group === '管理员' || (form['classification_information_id'] && $check_field('set','product_category')) || (!form['classification_information_id'] && $check_field('add','product_category'))" :disabled="disabledObj['product_category_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','product_category')">
                  {{ form['product_category'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','category') || ($check_field('add','category') || $check_field('set','category'))" label="类别" name="category">
                            <uni-easyinput type="text" v-model="form['category']" v-if="user_group === '管理员' || (form['classification_information_id'] && $check_field('set','category')) || (!form['classification_information_id'] && $check_field('add','category'))" :disabled="disabledObj['category_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','category')">
                  {{ form['category'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','customized_categories') || ($check_field('add','customized_categories') || $check_field('set','customized_categories'))" label="定制类别" name="customized_categories">
                            <uni-easyinput type="text" v-model="form['customized_categories']" v-if="user_group === '管理员' || (form['classification_information_id'] && $check_field('set','customized_categories')) || (!form['classification_information_id'] && $check_field('add','customized_categories'))" :disabled="disabledObj['customized_categories_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','customized_categories')">
                  {{ form['customized_categories'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','categorize_multiple') || ($check_field('add','categorize_multiple') || $check_field('set','categorize_multiple'))" label="分类下多" name="categorize_multiple">
                    <ld-select :multiple="true" :list="list_categorize_multiple"
                 label-key="text" value-key="value"
                 placeholder="请选择"
                 :clearable="!disabledObj['categorize_multiple_isDisabled']"
                 :disabled="disabledObj['categorize_multiple_isDisabled']"
                 v-model="categorize_multiple_multiple_value"
                 v-if="user_group === '管理员' || (form['classification_information_id'] && $check_field('set','categorize_multiple')) || (!form['classification_information_id'] && $check_field('add','categorize_multiple'))"
                 @confirm="select_categorize_multiple_multiple"></ld-select>
              <!-- 仅查看 -->
              <text v-else-if="$check_field('get','categorize_multiple')">
                {{ form['categorize_multiple'] }}
              </text>
                  </uni-forms-item>

              <uni-forms-item label="当前位置" name="location_address">
                <uni-easyinput type="text" placeholder="当前位置":disabled="true" v-model="form['location_address']" />
                <button size="mini" @click="getLongitudeLatitude()">定位</button>
              </uni-forms-item>

            </uni-forms>
            <view class="form_button" v-if="$check_action('/classification_information/view','set') || ($check_action('/classification_information/view','add') || $check_option('/classification_information/table','examine'))">
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
                    import ldSelect from "@/components/ld-select/ld-select.vue";
export default {
  mixins: [mixin],
  components: {ldSelect},
  data() {
    return {
      field: "classification_information_id",
      url_add: "~/api/classification_information/add?",
      url_set: "~/api/classification_information/set?",
      url_get_obj: "~/api/classification_information/get_obj?",
      url_upload: "~/api/classification_information/upload?"
	  ,product_category: null
	  ,category: null
	  ,customized_categories: null
	  ,categorize_multiple: null
      ,query: {
        "classification_information_id": 0,
      },

      form: {
            "product_category":  '', // 商品类别
                    "category":  '', // 类别
                    "customized_categories":  '', // 定制类别
                    "categorize_multiple":  '', // 分类下多
                                "classification_information_id": 0, // ID
                
                "location_address": "", // 定位地址
            "location_lng": "", // 定位地址经度
            "location_lat": "", // 定位地址纬度
              },
          disabledObj:{
                        "product_category_isDisabled": false,
                                "category_isDisabled": false,
                                "customized_categories_isDisabled": false,
                                "categorize_multiple_isDisabled": false,
                                  },
                                                                                                categorize_multiple_multiple_value:[],
                      // 分类下多选项列表
          list_categorize_multiple: [],
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
				url: getApp().globalData.host + '/api/classification_information/upload', //仅为示例，非真实的接口地址
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
					if (type == 'product_category') this['product_category'] = this.form['product_category'] = ""
					if (type == 'category') this['category'] = this.form['category'] = ""
					if (type == 'customized_categories') this['customized_categories'] = this.form['customized_categories'] = ""
					if (type == 'categorize_multiple') this['categorize_multiple'] = this.form['categorize_multiple'] = ""
			}
	,submit_() {
					if (this['product_category'] !== null) this.form['product_category'] = this['product_category']
					if (this['category'] !== null) this.form['category'] = this['category']
					if (this['customized_categories'] !== null) this.form['customized_categories'] = this['customized_categories']
					if (this['categorize_multiple'] !== null) this.form['categorize_multiple'] = this['categorize_multiple']
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
            url: _self.$fullUrl('/api/classification_information/upload?'),
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
            url: _self.$fullUrl('/api/classification_information/upload?'),
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
                                      uni.db.del("form");
      return param;
    },
        
            
            
            /**
     * 获取分类下多列表
     */
    async get_list_categorize_multiple() {
                          var json = await this.$get("~/api/website_announcement/get_list?");
          if(json.result && json.result.list){
            json.result.list.map((o) => this.list_categorize_multiple.push({value:o.title,text:o.title}));
          }
          else if(json.error){
            console.error(json.error);
          }
            },
              select_categorize_multiple_multiple(v){
        this.form.categorize_multiple = "";
        if (v && v.length > 0) {
            this.form.categorize_multiple = v.toString();
        }
      },
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                                      if (this.form.categorize_multiple){
        this.categorize_multiple_multiple_value = this.form.categorize_multiple.split(",")
      }
        },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/classification_information/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/classification_information/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/classification_information/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/classification_information/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/classification_information/view','get');
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
                                this.get_list_categorize_multiple();
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
