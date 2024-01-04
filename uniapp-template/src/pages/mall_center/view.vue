<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','brand') || ($check_field('add','brand') || $check_field('set','brand'))" label="品牌" name="brand">
                            <uni-easyinput type="text" v-model="form['brand']" v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','brand')) || (!form['mall_center_id'] && $check_field('add','brand'))" :disabled="disabledObj['brand_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','brand')">
                  {{ form['brand'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','specifications') || ($check_field('add','specifications') || $check_field('set','specifications'))" label="规格" name="specifications">
                            <uni-easyinput type="text" v-model="form['specifications']" v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','specifications')) || (!form['mall_center_id'] && $check_field('add','specifications'))" :disabled="disabledObj['specifications_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','specifications')">
                  {{ form['specifications'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','seller') || ($check_field('add','seller') || $check_field('set','seller'))" label="卖家" name="seller">
                    <uni-data-select
                  id="form_seller"
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="!disabledObj['seller_isDisabled']"
                  :disabled="disabledObj['seller_isDisabled']"
                  v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','seller')) || (!form['mall_center_id'] && $check_field('add','seller'))"
                ></uni-data-select>
                <uni-data-select
                  v-model="form['seller']"
                  :localdata="list_user_seller"
                  :clear="false"
                  :disabled="true"
                  v-else-if="$check_field('get','seller')" id="seller"
                ></uni-data-select>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','mall_tags') || ($check_field('add','mall_tags') || $check_field('set','mall_tags'))" label="商城标签" name="mall_tags">
     && category && classification_information)
                <uni-data-select
                  v-model="form.mall_tags"
                  :localdata="list_mall_tags"
                  :clear="!disabledObj['mall_tags_isDisabled']"
                  :disabled="disabledObj['mall_tags_isDisabled']"
                  v-if="user_group === '管理员' || (form['mall_center_id'] && $check_field('set','mall_tags')) || (!form['mall_center_id'] && $check_field('add','mall_tags'))"
                                  ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','mall_tags')">
                  {{ form['mall_tags'] }}
                </text>
                  </uni-forms-item>


            </uni-forms>
            <view class="form_button" v-if="$check_action('/mall_center/view','set') || ($check_action('/mall_center/view','add') || $check_option('/mall_center/table','examine'))">
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
      field: "mall_center_id",
      url_add: "~/api/mall_center/add?",
      url_set: "~/api/mall_center/set?",
      url_get_obj: "~/api/mall_center/get_obj?",
      url_upload: "~/api/mall_center/upload?"
	  ,brand: null
	  ,specifications: null
	  ,seller: null
	  ,mall_tags: null
      ,query: {
        "mall_center_id": 0,
      },

      form: {
            "brand":  '', // 品牌
                    "specifications":  '', // 规格
                    "seller": 0, // 卖家
                    "mall_tags":  '', // 商城标签
                                "mall_center_id": 0, // ID
                
              },
          disabledObj:{
                        "brand_isDisabled": false,
                                "specifications_isDisabled": false,
                                "seller_isDisabled": false,
                                "mall_tags_isDisabled": false,
                                  },
                                                                        // 用户列表
            list_user_seller: [],
                        // 用户组
            group_user_seller: "",
                                                      // 商城标签选项列表
          list_mall_tags: [],
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
				url: getApp().globalData.host + '/api/mall_center/upload', //仅为示例，非真实的接口地址
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
					if (type == 'brand') this['brand'] = this.form['brand'] = ""
					if (type == 'specifications') this['specifications'] = this.form['specifications'] = ""
					if (type == 'seller') this['seller'] = this.form['seller'] = ""
					if (type == 'mall_tags') this['mall_tags'] = this.form['mall_tags'] = ""
			}
	,submit_() {
					if (this['brand'] !== null) this.form['brand'] = this['brand']
					if (this['specifications'] !== null) this.form['specifications'] = this['specifications']
					if (this['seller'] !== null) this.form['seller'] = this['seller']
					if (this['mall_tags'] !== null) this.form['mall_tags'] = this['mall_tags']
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
            url: _self.$fullUrl('/api/mall_center/upload?'),
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
            url: _self.$fullUrl('/api/mall_center/upload?'),
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
     * 获取商城标签列表
     */
    async get_list_mall_tags() {
                          var json = await this.$get("~/api/classification_information/get_list?");
          if(json.result && json.result.list){
            json.result.list.map((o) => this.list_mall_tags.push({value:o.category,text:o.category}));
          }
          else if(json.error){
            console.error(json.error);
          }
            },
                
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                                    },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/mall_center/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/mall_center/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/mall_center/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/mall_center/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/mall_center/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
                            this.get_list_user_seller();
            this.get_group_user_seller();
                    this.get_list_mall_tags();
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
