<template>
  <view>
    <view class="container diy_view">
      <view>
        <view>
          <view class="">
            <uni-forms :modelValue="form"  v-if="is_view()">

              <uni-forms-item v-if="$check_field('get','book_number') || ($check_field('add','book_number') || $check_field('set','book_number'))" label="图书编号" name="book_number">
                            <uni-easyinput type="text" v-model="form['book_number']" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','book_number')) || (!form['hot_selling_books_id'] && $check_field('add','book_number'))" :disabled="disabledObj['book_number_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','book_number')">
                  {{ form['book_number'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','book_name') || ($check_field('add','book_name') || $check_field('set','book_name'))" label="图书名称" name="book_name">
                            <uni-easyinput type="text" v-model="form['book_name']" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','book_name')) || (!form['hot_selling_books_id'] && $check_field('add','book_name'))" :disabled="disabledObj['book_name_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','book_name')">
                  {{ form['book_name'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','cover') || ($check_field('add','cover') || $check_field('set','cover'))" label="封面" name="cover">
                    <!-- 修改权限 -->
                <view class="diy_field diy_img" v-if="form['cover'] && $check_field('set','cover')">
                  <image v-if="disabledObj['cover_isDisabled']" :src="$fullUrl(form['cover'])" />
                  <image v-if="!disabledObj['cover_isDisabled']" :src="$fullUrl(form['cover'])" @click="change_img('cover')" />
                </view>
                <!-- 添加权限 -->
                <view class="diy_field diy_img" v-else-if="!form['cover'] && $check_field('add','cover')">
                  <view v-if="disabledObj['cover_isDisabled']" class="btn_add_img">
                    <text>+</text>
                  </view>
                  <view v-if="!disabledObj['cover_isDisabled']" class="btn_add_img" @click="change_img('cover')">
                    <text>+</text>
                  </view>
                </view>
                <!-- 查询权限 -->
                <view class="diy_field diy_img" v-else-if="$check_field('get','cover')">
                  <image :src="$fullUrl(form['cover'])" />
                </view>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','author') || ($check_field('add','author') || $check_field('set','author'))" label="作者" name="author">
                            <uni-easyinput type="text" v-model="form['author']" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','author')) || (!form['hot_selling_books_id'] && $check_field('add','author'))" :disabled="disabledObj['author_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','author')">
                  {{ form['author'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','product_category') || ($check_field('add','product_category') || $check_field('set','product_category'))" label="商品类别" name="product_category">
     && product_category && classification_information)
                <uni-data-select
                  v-model="form.product_category"
                  :localdata="list_product_category"
                  :clear="!disabledObj['product_category_isDisabled']"
                  :disabled="disabledObj['product_category_isDisabled']"
                  v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','product_category')) || (!form['hot_selling_books_id'] && $check_field('add','product_category'))"
                  @change="select_product_category_field"                ></uni-data-select>
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','product_category')">
                  {{ form['product_category'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','inventory') || ($check_field('add','inventory') || $check_field('set','inventory'))" label="库存" name="inventory">
                            <uni-easyinput type="text" v-model="form['inventory']" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','inventory')) || (!form['hot_selling_books_id'] && $check_field('add','inventory'))" :disabled="disabledObj['inventory_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','inventory')">
                  {{ form['inventory'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','price') || ($check_field('add','price') || $check_field('set','price'))" label="价格" name="price">
                            <uni-easyinput type="text" v-model="form['price']" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','price')) || (!form['hot_selling_books_id'] && $check_field('add','price'))" :disabled="disabledObj['price_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','price')">
                  {{ form['price'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','brief_introduction') || ($check_field('add','brief_introduction') || $check_field('set','brief_introduction'))" label="简介" name="brief_introduction">
                    <uni-easyinput type="textarea" v-model="form['brief_introduction']" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','brief_introduction')) || (!form['hot_selling_books_id'] && $check_field('add','brief_introduction'))" :disabled="disabledObj['brief_introduction_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','brief_introduction')">
                  {{ form['brief_introduction'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','edit') || ($check_field('add','edit') || $check_field('set','edit'))" label="编辑" name="edit">
                            <uni-easyinput type="text" v-model="form['edit']" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','edit')) || (!form['hot_selling_books_id'] && $check_field('add','edit'))" :disabled="disabledObj['edit_isDisabled']" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','edit')">
                  {{ form['edit'] }}
                </text>
                          </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','category') || ($check_field('add','category') || $check_field('set','category'))" label="类别" name="category">
                    <uni-easyinput type="text" v-model="form['category']" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','category')) || (!form['hot_selling_books_id'] && $check_field('add','category'))" :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','category')">
                  {{ form['category'] }}
                </text>
                  </uni-forms-item>
              <uni-forms-item v-if="$check_field('get','customized_categories') || ($check_field('add','customized_categories') || $check_field('set','customized_categories'))" label="定制类别" name="customized_categories">
                    <uni-easyinput type="text" v-model="form['customized_categories']" v-if="user_group === '管理员' || (form['hot_selling_books_id'] && $check_field('set','customized_categories')) || (!form['hot_selling_books_id'] && $check_field('add','customized_categories'))" :disabled="true" />
                <!-- 仅查看 -->
                <text v-else-if="$check_field('get','customized_categories')">
                  {{ form['customized_categories'] }}
                </text>
                  </uni-forms-item>


            </uni-forms>
            <view class="form_button" v-if="$check_action('/hot_selling_books/view','set') || ($check_action('/hot_selling_books/view','add') || $check_option('/hot_selling_books/table','examine'))">
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
      field: "hot_selling_books_id",
      url_add: "~/api/hot_selling_books/add?",
      url_set: "~/api/hot_selling_books/set?",
      url_get_obj: "~/api/hot_selling_books/get_obj?",
      url_upload: "~/api/hot_selling_books/upload?"
	  ,book_number: null
	  ,book_name: null
	  ,cover: null
	  ,author: null
	  ,product_category: null
	  ,inventory: null
	  ,price: null
	  ,brief_introduction: null
	  ,edit: null
	  ,category: null
	  ,customized_categories: null
      ,query: {
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
          list_product_category: [],
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
				url: getApp().globalData.host + '/api/hot_selling_books/upload', //仅为示例，非真实的接口地址
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
					if (type == 'book_number') this['book_number'] = this.form['book_number'] = ""
					if (type == 'book_name') this['book_name'] = this.form['book_name'] = ""
					if (type == 'cover') this['cover'] = this.form['cover'] = ""
					if (type == 'author') this['author'] = this.form['author'] = ""
					if (type == 'product_category') this['product_category'] = this.form['product_category'] = ""
					if (type == 'inventory') this['inventory'] = this.form['inventory'] = ""
					if (type == 'price') this['price'] = this.form['price'] = ""
					if (type == 'brief_introduction') this['brief_introduction'] = this.form['brief_introduction'] = ""
					if (type == 'edit') this['edit'] = this.form['edit'] = ""
					if (type == 'category') this['category'] = this.form['category'] = ""
					if (type == 'customized_categories') this['customized_categories'] = this.form['customized_categories'] = ""
			}
	,submit_() {
					if (this['book_number'] !== null) this.form['book_number'] = this['book_number']
					if (this['book_name'] !== null) this.form['book_name'] = this['book_name']
					if (this['cover'] !== null) this.form['cover'] = this['cover']
					if (this['author'] !== null) this.form['author'] = this['author']
					if (this['product_category'] !== null) this.form['product_category'] = this['product_category']
					if (this['inventory'] !== null) this.form['inventory'] = this['inventory']
					if (this['price'] !== null) this.form['price'] = this['price']
					if (this['brief_introduction'] !== null) this.form['brief_introduction'] = this['brief_introduction']
					if (this['edit'] !== null) this.form['edit'] = this['edit']
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
            url: _self.$fullUrl('/api/hot_selling_books/upload?'),
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
            url: _self.$fullUrl('/api/hot_selling_books/upload?'),
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

  },
  created() {
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
