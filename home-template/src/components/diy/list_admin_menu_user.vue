<template>
  <div class="list_menu diy_menu">
    <router-link
            to="/user_center/index"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/user_center/index'}"
     >
      <span class="left_span">个人首页</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/mall_users/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/mall_users/table'}"
            v-if="user_group == '管理员' || $check_action('/mall_users/table','get')">
      <span class="left_span">商城用户</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/seller/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/seller/table'}"
            v-if="user_group == '管理员' || $check_action('/seller/table','get')">
      <span class="left_span">卖家</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/mall_center/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/mall_center/table'}"
            v-if="user_group == '管理员' || $check_action('/mall_center/table','get')">
      <span class="left_span">商城中心</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/customized_products/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/customized_products/table'}"
            v-if="user_group == '管理员' || $check_action('/customized_products/table','get')">
      <span class="left_span">定制商品</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/i_want_to_customize/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/i_want_to_customize/table'}"
            v-if="user_group == '管理员' || $check_action('/i_want_to_customize/table','get')">
      <span class="left_span">我要定制</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/classification_information/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/classification_information/table'}"
            v-if="user_group == '管理员' || $check_action('/classification_information/table','get')">
      <span class="left_span">分类信息</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/website_announcement/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/website_announcement/table'}"
            v-if="user_group == '管理员' || $check_action('/website_announcement/table','get')">
      <span class="left_span">网站公告</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    <router-link
            to="/hot_selling_books/table"
            class="menu_item"
            :class="{ selected: this.$route.path=== '/hot_selling_books/table'}"
            v-if="user_group == '管理员' || $check_action('/hot_selling_books/table','get')">
      <span class="left_span">热卖图书</span>
      <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
    </router-link>
    	<router-link
		to="/logistics_delivery/table"
		class="menu_item"
		:class="{ selected: this.$route.path=== '/logistics_delivery/table'}"
	>
		<span class="left_span">订单配送</span>
		<span class="right_span"><b-icon icon="house-fill"></b-icon></span>
	</router-link>
          <router-link
              to="/forum/table"
              class="menu_item"
              :class="{ selected: this.$route.path=== '/forum/table'}"
              v-if="user_group == '管理员' || $check_action('/forum/table','get')">
        <span class="left_span">{{$page_title("/forum/table") || "论坛"}}</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
      <router-link
              to="/message/table"
              class="menu_item"
              :class="{ selected: this.$route.path=== '/message/table'}"
              v-if="user_group == '管理员' || $check_action('/message/table','get')">
        <span class="left_span">测试留言板</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>
      <router-link
              to="/exam/table"
              class="menu_item"
              :class="{ selected: this.$route.path=== '/exam/table'}"
              v-if="user_group == '管理员' || $check_action('/exam/table','get')">
        <span class="left_span">在线考试</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
      </router-link>

  <router-link
              to="/user/collect"
              class="menu_item"
              :class="{ selected: this.$route.path=== '/collect/list'}"
              v-if="user_group == '管理员' || $check_action('/collect/list','get')">
        <span class="left_span">收藏</span>
        <span class="right_span"><b-icon icon="house-fill"></b-icon></span>
  </router-link>
  </div>
</template>

<script>
import mixin from "@/mixins/page.js";
export default {
  mixins: [mixin],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },

  components: {
  },
};
</script>

<style scoped>
.list_menu {
  flex: 0 0 25%;
  border-bottom: 1px solid #eee;
}
.menu_item {
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border: 1px solid #eee;
  border-bottom: none;
  background-color: #fff;
}
.menu_item.selected {
  background-color: #000;
}
.menu_item.selected span {
  color: #fff ;
}
.content {
  flex: 0 0 74%;
}
</style>
