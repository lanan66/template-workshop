<template>
  <view class="page_user page_user--new" id="user_index">
    <!-- 用户栏模块(开始) -->
    <view>
      <view class="container">
        <view>
          <view>
            <view class="">
              <view class="top_user" :style="'background:url('+bgc_avatar+') no-repeat;background-size:100% 100%;'">
                <image class="avatar" style="width: 6rem;height: 6rem;"
                       :src="$fullUrl(user.avatar) || '/static/img/default.png'" mode="scaleToFill"></image>
                <view class="name">
                  <text style="font-size: 2rem;">{{user.nickname}}</text>
                  <text style="font-size: 1.5rem;color: var(--color_grey);">{{user.user_group}}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 用户栏模块(结束) -->
    <!-- 菜单栏模块(开始) -->
    <view>
      <view class="container">
        <view>
          <view>
            <view class="">
              <view class="list_my">
                <view class="item_my" v-for="(o,i) in list_info" :key="i" v-if="$check_action(o.url,'get') && (o.title != '统计图' || chartAble)">
                  <navigator :url="'/pages'+o.url" class="my_nav" hover-class="hover">
                    <uni-icons :type="o.type" size="20"></uni-icons>
                    <text class="name">{{ o.title }}</text>
                  </navigator>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 菜单栏模块(结束) -->

    <!-- 自定义栏模块(开始) -->
    <view>
      <view class="container">
        <view>
          <view>
            <view class="">
              <view class="list_module">
                                                                <view v-if="$check_action('/mall_users/table','get')">
                          <navigator class="my_module" url="/pages/mall_users/table" hover-class="hover">
                            <div>
                              <text>商城用户</text>
                            </div>
                          </navigator>
                        </view>
                                                                                      <view v-if="$check_action('/seller/table','get')">
                          <navigator class="my_module" url="/pages/seller/table" hover-class="hover">
                            <div>
                              <text>卖家</text>
                            </div>
                          </navigator>
                        </view>
                                                                                                                              <view v-if="$check_action('/customized_products/table','get')">
                          <navigator class="my_module" url="/pages/customized_products/table" hover-class="hover">
                            <div>
                              <text>定制商品</text>
                            </div>
                          </navigator>
                        </view>
                                                                                      <view v-if="$check_action('/i_want_to_customize/table','get')">
                          <navigator class="my_module" url="/pages/i_want_to_customize/table" hover-class="hover">
                            <div>
                              <text>我要定制</text>
                            </div>
                          </navigator>
                        </view>
                                                                                      <view v-if="$check_action('/classification_information/table','get')">
                          <navigator class="my_module" url="/pages/classification_information/table" hover-class="hover">
                            <div>
                              <text>分类信息</text>
                            </div>
                          </navigator>
                        </view>
                                                                                      <view v-if="$check_action('/website_announcement/table','get')">
                          <navigator class="my_module" url="/pages/website_announcement/table" hover-class="hover">
                            <div>
                              <text>网站公告</text>
                            </div>
                          </navigator>
                        </view>
                                                                                      <view v-if="$check_action('/hot_selling_books/table','get')">
                          <navigator class="my_module" url="/pages/hot_selling_books/table" hover-class="hover">
                            <div>
                              <text>热卖图书</text>
                            </div>
                          </navigator>
                        </view>
                                        
                                      <!-- 考试模块菜单 -->
                    <view v-if="$check_action('/user_answer_wrong/table','get')">
                      <navigator class="my_module" url="/pages/exam_subject/answer_wrong_table" hover-class="hover">
                        <div>
                          <text>错题列表</text>
                        </div>
                      </navigator>
                    </view>
                    <!-- 考试模块菜单 -->
                  
                                      <!-- 留言板管理 -->
                    <view v-if="$check_action('/message/table','get')">
                      <navigator class="my_module" url="/pages/message/table" hover-class="hover">
                        <div>
                          <text>留言板管理</text>
                        </div>
                      </navigator>
                    </view>
                    <!-- 留言板管理 -->
                  
                                  <!-- 论坛管理 -->
                  <view v-if="$check_action('/forum/table','get')">
                    <navigator class="my_module" url="/pages/forum/table" hover-class="hover">
                      <div>
                        <text>论坛管理</text>
                      </div>
                    </navigator>
                  </view>
                  <!-- 论坛管理 -->
                				                  				  <!-- 订单配送 -->
				  <view v-if="$check_action('/logistics_delivery/table','get')">
				    <navigator class="my_module" url="/pages/logistics_delivery/table" hover-class="hover">
				      <div>
				        <text>订单配送</text>
				      </div>
				    </navigator>
				  </view>
				  <!-- 订单配送 -->
                  				              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 自定义栏模块(结束) -->

    <!-- 按钮模块(开始) -->
    <view>
      <view class="container">
        <view>
          <view>
            <view class="">
              <view class="btns">
                <view class="btn btn_logout" v-if="user.user_id" @click="sign_out()">
                  退出登录
                </view>
                <navigator v-else class="btn btn_login" url="/pages/account/login" type="default">登录</navigator>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 按钮模块(结束) -->
  </view>
</template>

<script>
  import nav_quick from "@/components/diy/nav_quick.vue";

  import mixin from "@/libs/mixins/page.js";

  export default {
    components: {
      nav_quick
    },
    mixins: [mixin],
    data() {
      return {
		chartAble: false
        ,list_info: [{
          title: "基本信息",
          type: "info",
          url: "/user/info"
        },
                                        {
                title: "收货地址",
                type: "location",
                url: "/user/address"
              },
                                                    {
                title: "收藏",
                type: "heart",
                url: "/user/collect"
              },
                                      {
                title: "订单",
                type: "bars",
                url: "/order/list"
              },
              {
                title: "购物车",
                type: "cart",
                url: "/cart/list"
              },
            			{
			  title: "统计图",
			  type: "home",
			  url: "/user_center/index"
			}
        ],
        bgc_avatar: "../../static/img/bgc_1.jpg"
      }
    },
	onLoad() {
																            if (this.$check_option("/customized_products/table","figure")){
              this.chartAble = true
            }
						            if (this.$check_option("/i_want_to_customize/table","figure")){
              this.chartAble = true
            }
														            if (this.$check_option("/hot_selling_books/table","figure")){
              this.chartAble = true
            }
				                    if (this.user_group !== '管理员' && this.$check_figure("/subject_exam/table")){
              this.chartAble = true
            }
                          if (this.$check_figure("/order/table")){
            this.chartAble = true
          }
        	}
    ,methods: {
      sign_out() {
        this.$store.commit('sign_out');
        // this.$get(getApp().globalData.host + "/api/user/sign_out")
      }
    }
  }
</script>

<style scoped>
  .page_user {
    background-color: #F7F7F7;
  }

  .top_user {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .top_user .avatar {
    border-radius: 1rem;
    box-shadow: 0px 0px 4px 2px #eee;
  }

  .top_user .name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .btns {
    padding: 1rem;
  }

  .list_my {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: center;
    background-color: #fff;
    padding: 0.5rem 0.2rem 0;
  }

  .item_my {
    flex: 1;
    padding-bottom: 0.5rem;
  }

  .my_nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .my_nav text {
    font-size: 0.5rem;
  }

  .btn {
    text-align: center;
  }

  .btn_logout {
    background-color: var(--color_primary);
    color: #fff;
  }

  .my_module {
    font-size: 0.5rem;
    line-height: 2.5rem;
  }

  .my_module div {
    width: 80%;
    margin: 0 auto;
    border-bottom: 1px solid #666;
  }

  .my_module span {
    float: right;
    padding-right: 0.5rem;
    color: #666;
  }

  .list_module {
    justify-content: flex-start;
    background-color: #fff;
    padding: 0.5rem 0.2rem 1.5rem;
  }

  /*new style start*/
  .page_user--new .btn_logout, .page_user--new .btn_login {
    border-radius: 10px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: var(--color_primary);
    color: var(--color_white);
  }

  .list_module {
    padding-top: 0;
    padding-bottom: 0;
  }

  .list_module uni-view:first-child {
    padding-top: 0.5rem;
  }

  .list_module uni-view:last-child {
    padding-bottom: 1.5rem;
  }

  /*new style end*/

</style>
