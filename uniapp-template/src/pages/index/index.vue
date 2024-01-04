<template>
  <view id="home" class="home--new">

    <!-- 轮播图模块(开始) -->
    <view class="swiper">
      <Slide :list="list_slide" />
    </view>
    <!-- 轮播图模块(结束) -->

    <!-- 菜单模块(开始) -->
    <view class="menu">
      <list_menu :list="list_menu"></list_menu>
    </view>
    <!-- 菜单模块(结束) -->

    <!-- 公告模块(开始) -->
    <view class="notice">
      <navigator url="/pages/notice/list">
        <Notice :list="list_notice" />

      </navigator>
    </view>
    <!-- 公告模块(结束) -->

    <!-- 广告模块(开始) -->
    <view>
      <list_ad :list="list_ad" location="顶部广告"></list_ad>
    </view>
    <!-- 广告模块(结束) -->

	<!-- 商城资讯模块(开始) -->
    <Card
      title="商城资讯"
      url="/pages/article/list"
      :list="list_article"
      v-if="$check_action('/article/list', 'get')"
      class="article_list"
    >
      <list_article :list="list_article"></list_article>
    </Card>
	<!-- 商城资讯模块(结束) -->

    <!-- 广告模块(开始) -->
    <view>
      <list_ad :list="list_ad" location="中部广告"></list_ad>
    </view>
    <!-- 广告模块(结束) -->

    <!-- 商品模块(开始) -->
			<Card
        class="goods_list"
		title="购物商城"
		url="/pages/goods/list"
		:list="list_goods"
		v-if="$check_action('/goods/list', 'get')"
		>
	      <list_goods :list="list_goods"></list_goods>
    </Card>
    <!-- 商品模块(结束) -->

					<!-- 推荐定制商品模块(开始) -->
    <Card
      class="list_diy"
      title="定制商品推荐"
      url="/pages/customized_products/list"
      :list="list_customized_products"
      v-if="$check_action('/customized_products/list', 'get')"
    >
	  <list_customized_products :list="list_customized_products"></list_customized_products>

    </Card>
    <!-- 推荐定制商品模块(结束) -->
					<!-- 推荐网站公告模块(开始) -->
    <Card
      class="list_diy"
      title="网站公告推荐"
      url="/pages/website_announcement/list"
      :list="list_website_announcement"
      v-if="$check_action('/website_announcement/list', 'get')"
    >
	  <list_website_announcement :list="list_website_announcement"></list_website_announcement>

    </Card>
    <!-- 推荐网站公告模块(结束) -->
			<!-- 推荐热卖图书模块(开始) -->
    <Card
      class="list_diy"
      title="热卖图书推荐"
      url="/pages/hot_selling_books/list"
      :list="list_hot_selling_books"
      v-if="$check_action('/hot_selling_books/list', 'get')"
    >
	  <list_hot_selling_books :list="list_hot_selling_books"></list_hot_selling_books>

    </Card>
    <!-- 推荐热卖图书模块(结束) -->
	
    <!-- 广告模块(开始) -->
    <view>
      <list_ad :list="list_ad" location="底部广告"></list_ad>
    </view>
    <!-- 广告模块(结束) -->

    <!-- 链接模块(开始) -->
    <view>
      <list_link :list="list_link"></list_link>
    </view>
    <!-- 链接模块(结束) -->

    <!-- 版权模块(开始) -->
    <view class="copyright">
      <text>@版权归属 XX 所有</text>
    </view>
    <!-- 版权模块(结束) -->

    <!-- 智能客服(开始) -->
    <button  class="zhinengs" style="width: 40px; height: 40px;"  @click="indexkefu"></button>
    <!-- 智能客服(结束) -->

	<image src="../../static/img/support.png" @tap="openSupportModal" class="support_icon" />

    <view class="support_module" v-if="showChat">
      <view
        class="container"
        :class="{ small_css: isSmall, big_css: !isSmall }"
      >
        <view class="support_module_title">
          <span class="title_btn" @click="openSupportModal">{{
            !isSmall ? "x" : "□"
          }}</span>
        </view>
        <scroll-view
          :scroll-top="scrollTop"
          scroll-y="true"
          class="content support_content"
          @scroll="scroll"
        >
          <view v-for="(item, index) in chatList" :key="index">
            <view class="item item-center" v-if="item.sendTime">
              <span v-text="item.sendTime"></span>
            </view>
            <view
              class="item"
              :class="{ item_left: item.isAdmin, item_right: !item.isAdmin }"
            >
              <view class="avatar" v-if="item.isAdmin">
                <image src="../../static/img/system_icon.jpg" />
              </view>
              <view
                class="bubble"
                :class="{ 'bubble-right': !item.isAdmin }"
                v-text="item.content"
              ></view>
              <view class="avatar" v-if="!item.isAdmin">
                <image src="../../static/img/mine.jpg" />
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="input-area">
          <textarea
            name="text"
            style="height: 50px"
            v-model="sendValue"
            id="textarea"
            placeholder="输入内容"
          ></textarea>
        </view>
        <view class="button-area">
          <!-- <view style="width: 100px;height:50px;cursor: pointer;" @tap="toToggle"></view> -->
          <span class="send-btn" @tap.stop="sendChat">发 送</span>
        </view>
      </view>
    </view>
  </view>
</template>

<script>


					import list_customized_products from "@/components/diy/list_customized_products.vue";
					import list_website_announcement from "@/components/diy/list_website_announcement.vue";
			import list_hot_selling_books from "@/components/diy/list_hot_selling_books.vue";
	import Card from "@/components/common/card.vue";
import bar_title from "@/components/diy/bar_title.vue";
import list_menu from "@/components/diy/list_menu.vue";
import list_ad from "@/components/diy/list_ad.vue";
	import list_goods from "@/components/diy/list_goods.vue";
	import list_article from "@/components/diy/list_article.vue";
import list_link from "@/components/diy/list_link.vue";
import Slide from "@/components/common/slide.vue";
import Notice from "@/components/common/notice.vue";


import mixin from "@/libs/mixins/page.js";
export default {
  mixins: [mixin],
  components: {
						list_customized_products,
						list_website_announcement,
				list_hot_selling_books,
	    Card,
    bar_title,
	list_ad,
    list_menu,
			list_goods,
			list_article,
    list_link,
    Slide,
    Notice,
  },
  data() {
    return {
      isSmall: false,
      sendValue: "",
      chatList: [],
      showChat: false,
      isAdmin: false,
      token: "",
      scrollTop: 0,
      oldScrollTop: 0,

      str: "<div>测试一下</div>",
								list_customized_products: [],
								list_website_announcement: [],
						list_hot_selling_books: [],
	      list_ad: [],
	  list_goods: [],
      list_slide: [],
	  list_article: [],
      list_menu: [],
      list_link: [],
      list_notice: [],
    };
  },
  methods: {
    // toggle
    toToggle() {
      this.isAdmin = !this.isAdmin;
    },
    indexkefu(){
      // uni.navigateTo({
      //   url:'../Intelligent-customer-service/Intelligent-customer-service'
      // })
      uni.navigateTo({
        url: `/pages/webview/webview?url=https://chat.weixk.com/`
      })
    },
    // open
    openSupportModal() {
      let record = uni.getStorageSync("supportChat");
      this.isAdmin =
        uni.getStorageSync("auth")[0].user_group == "管理员" ? true : false;
      this.token = this.token || uni.getStorageSync("token") || "";
      if (record) {
        this.chatList = JSON.parse(record);
      }

      if (!this.token) {
        return uni.showToast({ title: "请先进行登录", icon: "none" });
      }
      console.log("打开客服");
      this.showChat = !this.showChat;
      if (this.chatList.length && this.showChat) {
        setTimeout(() => {
          this.scrollBottom();
        }, 0);
      }
    },
    // 缩小聊天窗口
    scaleSmall() {
      this.isSmall = !this.isSmall;
    },
    // 获取聊天记录
    getChat() {},
    scroll(e) {
      this.oldScrollTop = e.detail.scrollTop;
    },
    // 滚动到最底部
    scrollBottom() {
      uni
        .createSelectorQuery()
        .select(".support_content")
        .boundingClientRect((res) => {
          let newbottom = res.bottom + res.height;
          this.scrollTop = this.oldScrollTop;
          this.$nextTick(() => {
            this.scrollTop = newbottom + 5000;
          });
        })
        .exec();
    },
    // 发送聊天
    sendChat() {
      let nowTime = new Date(+new Date() + 8 * 3600 * 1000)
        .toJSON()
        .substr(0, 16)
        .replace("T", " ");
      let nowTimeChuo = new Date().getTime();
      let reallyTime = "";
      let spaceTime = 12000; //	20分钟
      if (!this.sendValue) {
        return uni.showToast({ title: "不能发送空内容", icon: "none" });
      }
      this.chatList.length &&
        (reallyTime =
          nowTimeChuo - this.chatList[this.chatList.length - 1]["nowTime"] >
          spaceTime
            ? nowTime
            : "");
      !this.chatList.length && (reallyTime = nowTime);
      let obj = {
        isAdmin: this.isAdmin,
        content: this.sendValue,
        sendTime: reallyTime,
        nowTime: nowTimeChuo,
      };
      this.chatList.push(obj);

      setTimeout(() => {
        this.scrollBottom();
      }, 0);

      uni.setStorageSync("supportChat", JSON.stringify(this.chatList));

      this.sendValue = "";
    },

						/**
		*  获取定制商品
		*/
		get_customized_products() {
			let url = getApp().globalData.host + "/api/customized_products/get_list?";
							var oNowDate = this.dateFormat("yyyy-MM-dd hh:mm:ss") + "";
				var url_get_list =
				getApp().globalData.host + "/api/customized_products/get_list?timing_start_time_max=" +
				oNowDate +
				"&timing_end_time_min=" +
				oNowDate +
				"&like=0";
				url = url_get_list;
									
			this.$get(url, {
													"examine_state": "已通过",
							}, (json) => {
					if (json.result && json.result.list) {
					console.log("定制商品" ,json.result.list);
					this.list_customized_products = json.result.list;
											this.list_customized_products.map((o)=>{
							o["praise_len"];
						});
						this.get_praise(this.list_customized_products ,"customized_products" ,"671");
									}
			});
		},
    					/**
		*  获取网站公告
		*/
		get_website_announcement() {
			let url = getApp().globalData.host + "/api/website_announcement/get_list?";
															url = getApp().globalData.host + "/api/website_announcement/get_list?orderby=hits desc";
										
			this.$get(url, {
											}, (json) => {
					if (json.result && json.result.list) {
					console.log("网站公告" ,json.result.list);
					this.list_website_announcement = json.result.list;
											this.list_website_announcement.map((o)=>{
							o["praise_len"];
						});
						this.get_praise(this.list_website_announcement ,"website_announcement" ,"1094");
									}
			});
		},
    			/**
		*  获取热卖图书
		*/
		get_hot_selling_books() {
			let url = getApp().globalData.host + "/api/hot_selling_books/get_list?";
													url = getApp().globalData.host + "/api/hot_selling_books/get_hits_list?";
			
			this.$get(url, {
									"user_id": this.$store.state.user.user_id,
											}, (json) => {
					if (json.result && json.result.list) {
					console.log("热卖图书" ,json.result.list);
					this.list_hot_selling_books = json.result.list;
											this.list_hot_selling_books.map((o)=>{
							o["praise_len"];
						});
						this.get_praise(this.list_hot_selling_books ,"hot_selling_books" ,"1095");
									}
			});
		},
    
    /**
     * 当前年月日时分秒方法
     * @param {Object} fmt
     */
    dateFormat(fmt) {
      var myDate = new Date();
      var o = {
        "M+": myDate.getMonth() + 1, // 月份
        "d+": myDate.getDate(), // 日
        "h+": myDate.getHours(), // 小时
        "m+": myDate.getMinutes(), // 分
        "s+": myDate.getSeconds(), // 秒
        "q+": Math.floor((myDate.getMonth() + 3) / 3), // 季度
        S: myDate.getMilliseconds(), // 毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (myDate.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },

    /**
     *  获取轮播图
     */
    get_slides() {
      this.$get(getApp().globalData.host + "/api/slides/get_list?", {}, (json) => {
        if (json.result && json.result.list) {
          console.log("轮播图", json.result.list);
          this.list_slide = json.result.list;
          this.list_slide.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_slides, "slides", "slides_id");
        }
      });
    },

    /**
     *  获取导航栏
     */
    get_menu() {
      var user_group = this.$store.state.user.user_group;
      this.$get(
        getApp().globalData.host + "/api/auth/get_list?",
        { size: "0", get: "", user_group, get: 1, position: "top" },
        (json) => {
          if (json.result && json.result.list) {
            this.list_menu = json.result.list;
            this.list_menu.map((o) => {
              o["praise_len"];
            });
            this.get_praise(this.list_auth, "auth", "auth_id");
          }
          this.list_menu.push({mod_name:"天气预报",path:"/webview/urlview"})
		this.list_menu.push({mod_name:"购物商城",path:"/goods/list"})
	          this.list_menu.unshift({ mod_name: "在线考试", path: "/exam/list" });
          this.list_menu.unshift({ mod_name: "测试组卷", path: "/exam_subject/list" });
          this.list_menu.unshift({ mod_name: "测试留言板", path: "/message/list" });
        }
      );
    },

    /**
     *  获取文章
     */
    get_article() {
      this.$get(getApp().globalData.host + "/api/article/get_list?", { page: 1, size: 5 }, (json) => {
        console.log(json, 5666);
        if (json.result && json.result.list) {
          console.log("文章", json.result.list);
          this.list_article = json.result.list;
          this.list_article.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_article, "article", "article_id");
        }
      });
    },
    /**
     *  获取广告
     */
    get_ad() {
      this.$get(getApp().globalData.host + "/api/ad/get_list?", { page: 1, size: 5 }, (json) => {
        if (json.result && json.result.list) {
          console.log("广告", json.result.list);
          this.list_ad = json.result.list;
          this.list_ad.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_ad, "ad", "ad_id");
        }
      });
    },
    /**
     *  获取商品
     */
    get_goods() {
      this.$get(getApp().globalData.host + "/api/goods/get_list?", { page: 1, size: 4 }, (json) => {
        if (json.result && json.result.list) {
          console.log("商品", json.result.list);
          this.list_goods = json.result.list;
          this.list_goods.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_goods, "goods", "goods_id");
        }
      });
    },

    /**
     *  获取链接列表
     */
    get_link() {
      this.$get(getApp().globalData.host + "/api/link/get_list?", { page: 1, size: 3 }, (json) => {
        if (json.result && json.result.list) {
          console.log("链接", json.result.list);
          this.list_link = json.result.list;
          this.list_link.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_link, "link", "link_id");
        }
      });
    },

    /**
     *  获取公告列表
     */
    get_notice() {
      this.$get(getApp().globalData.host + "/api/notice/get_list?", { page: 1, size: 3 }, (json) => {
        if (json.result && json.result.list) {
          console.log("公告", json.result.list);
          this.list_notice = json.result.list;
          this.list_notice.map((o) => {
            o["praise_len"];
          });
          this.get_praise(this.list_notice, "notice", "notice_id");
          console.log(this.list_notice);
        }
      });
    },

    /**
     *  获取点赞数
     *  @param {Object} list
     */
    get_praise(list, table, idName) {
      this.$get(
        getApp().globalData.host + "/api/praise/count_group?source_table=" + table + "&groupby=source_id",
        {},
        (res) => {
          if (res.result) {
            res.result.map((o) => {
              for (let i = 0; i < list.length; i++) {
                let oj = list[i];
                if (oj[idName] === o["source_id"]) {
                  oj["praise_len"] = o["count"];
                  break;
                }
              }
            });
          } else if (res.error) {
            console.error(res.error);
          }
        }
      );
    },
  },
  onShow() {
    							this.get_customized_products();
							this.get_website_announcement();
					this.get_hot_selling_books();
	    this.get_menu();
    this.get_slides();
    this.get_article();
    this.get_goods();
    this.get_link();
    this.get_notice();
    this.get_ad();

    // this.get_praise();
  },
};
</script>
<style lang="scss" scoped>
	.support_icon {
		width: 50px;
		height: 50px;
		position: fixed;
		right: 0%;
		bottom: 10%;
		z-index: 9999;
	}
	  .support_module .container{
	    height: 64%;
	    width: 19.4rem;
	    border-radius: 4px;
	    border: 0.5px solid #e0e0e0;
	    background-color: #f5f5f5;
	    overflow: hidden;
	    position: fixed;
	    padding: 0;
	    margin-left: -9.7rem;
	    z-index: 99999999;
	    }
		.support_module	.small_css{
			height: 40px;
	    width: 200px;
	    right: -15px;
	    bottom: 0px;
		}
		.support_module	.big_css{
					top: 12%;
					left: 50%;
					}
	    .support_module .content{
	        width: calc(100% - 0px);
	        overflow-y: scroll;
					height: 64%;
					padding: 0 10px 10px 0;
	    }
			.support_module .content::-webkit-scrollbar{
		display: none
	}
	.support_module_title{
		text-align: right;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #ccc;

	}
	.support_module_title .title_btn{
		font-size: 20px;
		cursor: pointer;
		margin-right: 20px;
		color: #888;

	}
	    .support_module .content:hover::-webkit-scrollbar-thumb{
	        background:rgba(0,0,0,0.1);
	    }
	    .support_module .bubble{
	        max-width: 182px;
	        padding: 10px;
	        border-radius: 5px;
	        position: relative;
	        color: #000;
	        word-wrap:break-word;
	        word-break:normal;
					font-size: 12px;
	    }
	    .support_module .item_left .bubble{
	        margin-left: 10px;
	        background-color: #fff;
	    }
	    .support_module .item_left .bubble:before{
	        content: "";
	        position: absolute;
	        width: 0;
	        height: 0;
	        border-left: 10px solid transparent;
	        border-top: 10px solid transparent;
	        border-right: 10px solid #fff;
	        border-bottom: 10px solid transparent;
	        left: -20px;
	    }
	    .support_module .item_right .bubble{
	        margin-right: 10px;
	        background-color: #9eea6a;
	    }
	    .support_module .item_right .bubble:before{
	        content: "";
	        position: absolute;
	        width: 0;
	        height: 0;
	        border-left: 10px solid #9eea6a;
	        border-top: 10px solid transparent;
	        border-right: 10px solid transparent;
	        border-bottom: 10px solid transparent;
					left: none;

					        right: -20px;
	    }
	    .support_module .item{
	        margin-top: 15px;
	        display: flex;
	        width: 100%;
	    }
	    .support_module .item.item_right{
	        justify-content: flex-end;
	    }
	    .support_module .item.item-center{
	        justify-content: center;
	    }
	    .support_module .item.item-center span{
	        font-size: 12px;
	        padding: 2px 4px;
	        color: #fff;
	        background-color: #dadada;
	        border-radius: 3px;
	        -moz-user-select:none; /*火狐*/
	        -webkit-user-select:none; /*webkit浏览器*/
	        -ms-user-select:none; /*IE10*/
	        -khtml-user-select:none; /*早期浏览器*/
	        user-select:none;
	    }

	    .support_module .avatar image{
	        width: 42px;
	        height: 42px;
	        border-radius: 50%;
	    }
	    .support_module .input-area{
	        border-top:0.5px solid #e0e0e0;
	        height: 15%;
	        background-color: #fff;
	    }
	    .support_module textarea{
	        flex: 1;
	        padding: 10px;
	        font-size: 12px;
	        border: none;
	        overflow-y: auto;
	        overflow-x: hidden;
	        outline:none;
	        resize:none;
					width: 102%;
					height: 100%;
					min-height: 100%;
					max-height: 100%;
					box-sizing: border-box;
	    }
	    .support_module .button-area{
	      display: flex;
	    height: 50px;
	    line-height: 50px;
	    padding: 5px;
	    justify-content: flex-end;
	    text-align: right;
	    width: 100%;
			background: #fff;
	    }
	    .support_module .button-area .send-btn{
	           width: 80px;
	    height: 28px;
	    line-height: 28px;
	    border: none;
	    outline: none;
	    border-radius: 4px;
	    float: right;
	    cursor: pointer;
	    background: #9eea6a;
	    font-size: 12px;
	    color: #333;
	    margin: 0px;
	    text-align: center;
	    }
        .zhinengs{
          background-image: url(../../static/robot.png);
          background-size: cover;
          position: fixed !important;
          background-color: transparent;
          bottom: 77px;
          z-index: 999;
        }
        .zhinengs::after{
          content: '';
          position: absolute;
          border: none !important;
        }
</style>

