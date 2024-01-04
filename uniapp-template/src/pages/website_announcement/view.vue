<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','title') || ($check_field('add','title') || $check_field('set','title'))" label="标题" name="title">
                            <uni-easyinput type="text" v-model="form['title']" v-if="user_group === '管理员' || (form['website_announcement_id'] && $check_field('set','title')) || (!form['website_announcement_id'] && $check_field('add','title'))" :disabled="disabledObj['title_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','title')">
                  {{ form['title'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','publisher') || ($check_field('add','publisher') || $check_field('set','publisher'))" label="发布人" name="publisher">
                            <uni-easyinput type="text" v-model="form['publisher']" v-if="user_group === '管理员' || (form['website_announcement_id'] && $check_field('set','publisher')) || (!form['website_announcement_id'] && $check_field('add','publisher'))" :disabled="disabledObj['publisher_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','publisher')">
                  {{ form['publisher'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','release_time') || ($check_field('add','release_time') || $check_field('set','release_time'))" label="发布时间" name="release_time">
                    <uni-datetime-picker v-if="user_group === '管理员' || (form['website_announcement_id'] && $check_field('set','release_time')) || (!form['website_announcement_id'] && $check_field('add','release_time'))" @change="changeLog($event,'release_time')" v-model="form['release_time']" type="datetime" :disabled="disabledObj['release_time_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','release_time')">
                  {{ form['release_time'] }}
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
              <uni-forms-item v-if="$check_field('get','details') || ($check_field('add','details') || $check_field('set','details'))" label="详情" name="details">
                    <uni-easyinput type="textarea" v-model="form['details']" v-if="user_group === '管理员' || (form['website_announcement_id'] && $check_field('set','details')) || (!form['website_announcement_id'] && $check_field('add','details'))" :disabled="disabledObj['details_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','details')">
                  {{ form['details'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','lower_multi_test') || ($check_field('add','lower_multi_test') || $check_field('set','lower_multi_test'))" label="下多测试" name="lower_multi_test">
                    <ld-select :multiple="true" :list="list_lower_multi_test"
                 label-key="text" value-key="value"
                 placeholder="请选择"
                 :clearable="!disabledObj['lower_multi_test_isDisabled']"
                 :disabled="disabledObj['lower_multi_test_isDisabled']"
                 v-model="lower_multi_test_multiple_value"
                 v-if="user_group === '管理员' || (form['website_announcement_id'] && $check_field('set','lower_multi_test')) || (!form['website_announcement_id'] && $check_field('add','lower_multi_test'))"
                 @confirm="select_lower_multi_test_multiple"></ld-select>
              <!-- 仅查看 -->
              <text v-else-if="$check_field('get','lower_multi_test')">
                {{ form['lower_multi_test'] }}
              </text>
                  </uni-forms-item>


            </uni-forms>
            <view class="form_button" v-if="$check_action('/website_announcement/view','set') || ($check_action('/website_announcement/view','add') || $check_option('/website_announcement/table','examine'))">
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
      field: "website_announcement_id",
      url_add: "~/api/website_announcement/add?",
      url_set: "~/api/website_announcement/set?",
      url_get_obj: "~/api/website_announcement/get_obj?",
      url_upload: "~/api/website_announcement/upload?"
	  ,title: null
	  ,publisher: null
	  ,release_time: null
	  ,related_attachments: null
	  ,details: null
	  ,lower_multi_test: null
      ,query: {
        "website_announcement_id": 0,
      },

      form: {
            "title":  '', // 标题
                    "publisher":  '', // 发布人
                    "release_time": this.$toTime(new Date().getTime(), "yyyy-MM-dd hh:mm:ss"),
                    "related_attachments":  '', // 相关附件
                    "details":  '', // 详情
                    "lower_multi_test":  '', // 下多测试
                                "website_announcement_id": 0, // ID
                
              },
          disabledObj:{
                        "title_isDisabled": false,
                                "publisher_isDisabled": false,
                                "release_time_isDisabled": false,
                                "related_attachments_isDisabled": false,
                                "details_isDisabled": false,
                                "lower_multi_test_isDisabled": false,
                                  },
                                                                                                                                        lower_multi_test_multiple_value:[],
                      // 下多测试选项列表
          list_lower_multi_test: [],
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
				url: getApp().globalData.host + '/api/website_announcement/upload', //仅为示例，非真实的接口地址
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
					if (type == 'title') this['title'] = this.form['title'] = ""
					if (type == 'publisher') this['publisher'] = this.form['publisher'] = ""
					if (type == 'release_time') this['release_time'] = this.form['release_time'] = ""
					if (type == 'related_attachments') this['related_attachments'] = this.form['related_attachments'] = ""
					if (type == 'details') this['details'] = this.form['details'] = ""
					if (type == 'lower_multi_test') this['lower_multi_test'] = this.form['lower_multi_test'] = ""
			}
	,submit_() {
					if (this['title'] !== null) this.form['title'] = this['title']
					if (this['publisher'] !== null) this.form['publisher'] = this['publisher']
					if (this['release_time'] !== null) this.form['release_time'] = this['release_time']
					if (this['related_attachments'] !== null) this.form['related_attachments'] = this['related_attachments']
					if (this['details'] !== null) this.form['details'] = this['details']
					if (this['lower_multi_test'] !== null) this.form['lower_multi_test'] = this['lower_multi_test']
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
            url: _self.$fullUrl('/api/website_announcement/upload?'),
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
            url: _self.$fullUrl('/api/website_announcement/upload?'),
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
                          if (this.form["release_time"] && JSON.stringify(this.form["release_time"]).indexOf("-")===-1) {
        this.form["release_time"] = this.$toTime(parseInt(this.form["release_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                      uni.db.del("form");
      return param;
    },
        
            
            
            
            
            /**
     * 获取下多测试列表
     */
    async get_list_lower_multi_test() {
                          var json = await this.$get("~/api/classification_information/get_list?");
          if(json.result && json.result.list){
            json.result.list.map((o) => this.list_lower_multi_test.push({value:o.category,text:o.category}));
          }
          else if(json.error){
            console.error(json.error);
          }
            },
              select_lower_multi_test_multiple(v){
        this.form.lower_multi_test = "";
        if (v && v.length > 0) {
            this.form.lower_multi_test = v.toString();
        }
      },
            
    
    /**
     * 获取对象之后
     * @param {Object} json
     * @param {Object} func
     */
    get_obj_after(json, func){
                                  if (this.form["release_time"] && JSON.stringify(this.form["release_time"]).indexOf("-")===-1) {
        this.form["release_time"] = this.$toTime(parseInt(this.form["release_time"]), "yyyy-MM-dd hh:mm:ss")
      }
                                                      if (this.form.lower_multi_test){
        this.lower_multi_test_multiple_value = this.form.lower_multi_test.split(",")
      }
        },

    is_view(){
      var bl = this.user_group == "管理员";

      if(!bl){
        bl = this.$check_action('/website_announcement/table','add');
        console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
      }
      if(!bl){
        bl = this.$check_action('/website_announcement/table','set');
        console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
      }
      if(!bl){
        bl = this.$check_action('/website_announcement/view','add');
        console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
      }
      if(!bl){
        bl = this.$check_action('/website_announcement/view','set');
        console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
      }
      if(!bl){
        bl = this.$check_action('/website_announcement/view','get');
        console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
      }

      console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

      return bl;
    },

  },
  created() {
                                                this.get_list_lower_multi_test();
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
