<template>
  <el-menu
    class="side el-menu-vertical-demo"
    default-active="/"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#38f"
    :collapse="isCollapse"
    :router="true"
  >
    <span class="hide-avatar" style="display: none;">
      <img v-if="$store.state.user.avatar" :src="$fullUrl($store.state.user.avatar)">
      <img v-else src="../../../public/img/default-avatar.png">
    </span>

    <span class="hide-username" style="display:none;">
      {{ $store.state.user.nickname }}
    </span>

    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">后台首页</span>
    </el-menu-item>

    <el-submenu
      index="user"
      v-show="
        user_group == '管理员' ||
        $check_group([
          '/user/table',
          '/user_group/table',
          '/mall_users/table',
          '/seller/table',
        ])
      "
    >
      <template slot="title"
        ><i class="el-icon-s-custom"></i
        ><span ref="customTemplate8">系统用户</span></template
      >
      <el-menu-item
        index="/user/table"
        v-show="user_group == '管理员'"
        @click="handleButtonClick(8)"
        ><span>管理员</span></el-menu-item
      >
      <el-menu-item
        index="/mall_users/table"
        v-show="user_group == '管理员' || $check_action('/mall_users/table')"
        @click="handleButtonClick(8)"
      >
        <span>商城用户</span></el-menu-item
      >
      <el-menu-item
        index="/seller/table"
        v-show="user_group == '管理员' || $check_action('/seller/table')"
        @click="handleButtonClick(8)"
      >
        <span>卖家</span></el-menu-item
      >
      <!-- <el-menu-item index="/user_group/table"><span>用户组</span></el-menu-item> -->
    </el-submenu>

    <el-submenu
      class="Cust"
      :index="index"
      v-for="(i, index) in auth"
      :key="i.auth_id"
      v-show="user_group == '管理员' || $check_action(i.path)"
    >
      <template slot="title"
        ><i class="el-icon-news"></i
        ><span>{{ i.mod_name + "管理" }}</span></template
      >
      <el-menu-item
        menu-trigger
        :index="i.path"
        :class="{ active: $route.path === i.path }"
        @click="handleButtonClick(` ${i.mod_name}管理`)"
        ><span>{{ i.page_title + "列表" }}</span></el-menu-item
      >
      <el-menu-item
        v-if="
          i.has_add &&
          (user_group == '管理员' ||
            $check_action(i.path.replace(/(.*)table/, '$1view'), 'add'))
        "
        :index="i.path.replace(/(.*)table/, '$1view')"
        :class="{ sactive: $route.path === i.path }"
        @click="handleButtonClick(` ${i.mod_name}管理`)"
      >
        <span> {{ i.page_title + "添加" }}</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu
      index="web"
      v-show="
        user_group == '管理员' ||
        $check_group([
          '/nav/table',
          '/link/table',
          '/slides/table',
          '/ad/table',
        ])
      "
    >
      <template slot="title"
        ><i class="el-icon-picture-outline"></i
        ><span ref="customTemplate1">系统管理</span></template
      >
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/link/table')"
        index="/link/table"
        @click="handleButtonClick(1)"
      >
        <span>友情链接</span>
      </el-menu-item>
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/slides/table')"
        index="/slides/table"
        @click="handleButtonClick(1)"
      >
        <span>轮播图管理</span>
      </el-menu-item>
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/ad/table')"
        index="/ad/table"
        @click="handleButtonClick(1)"
      >
        <span>广告管理</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu
      index="webs"
      v-show="user_group == '管理员' || $check_action('/message/table')"
    >
      <template slot="title"
        ><i class="el-icon-picture-outline"></i
        ><span ref="customTemplate10">留言管理</span></template
      >
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/message/table')"
        index="/message/table"
        @click="handleButtonClick(10)"
      >
        <span>测试留言板</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu
      index="notic"
      v-show="user_group == '管理员' || $check_group(['/notice/table'])"
    >
      <template slot="title"
        ><i class="el-icon-warning-outline"></i
        ><span ref="customTemplate2">关于我们管理</span>
      </template>
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/notice/table')"
        index="/notice/table"
        @click="handleButtonClick(2)"
      >
        <span>关于我们</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu
      index="news"
      v-show="
        $check_group(['/article/table', '/article_type/table', '/exam/table'])
      "
    >
      <template slot="title"
        ><i class="el-icon-s-opportunity"></i
        ><span ref="customTemplate3">资源管理</span></template
      >

      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/article/table')"
        index="/article/table"
        @click="handleButtonClick(3)"
      >
        <!-- <span>文章</span> -->
        <span>{{ $page_title("/article/table") || "文章" }}</span>
      </el-menu-item>
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/article_type/table')"
        index="/article_type/table"
        @click="handleButtonClick(3)"
      >
        <!-- <span>文章类型</span> -->
        <span>{{ $page_title("/article_type/table") || "文章分类" }}</span>
      </el-menu-item>
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/exam/table')"
        index="/exam/table"
        @click="handleButtonClick(3)"
        ><span>在线考试</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu
      index="subject"
      v-show="
        $check_group([
          '/subject/table',
          '/exam_question_database/table',
          '/user_answer_wrong/table',
          '/subject_exam/table',
        ])
      "
    >
      <template slot="title"
        ><i class="el-icon-s-opportunity"></i
        ><span ref="customTemplate5">考试管理</span></template
      >

      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/subject/table')"
        index="/exam_subject/table"
        @click="handleButtonClick(5)"
      >
        <span>科目列表</span>
      </el-menu-item>

      <el-menu-item
        v-show="
          user_group == '管理员' ||
          $check_action('/exam_question_database/table')
        "
        index="/exam_subject/question_database_table"
        @click="handleButtonClick(5)"
      >
        <span>试题库</span>
      </el-menu-item>

      <el-menu-item
        v-show="
          user_group == '管理员' || $check_action('/user_answer_wrong/table')
        "
        index="/exam_subject/wrong_list"
        @click="handleButtonClick(5)"
        ><span>错题记录</span>
      </el-menu-item>

      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/subject_exam/table')"
        index="/exam_subject/exams_table"
        @click="handleButtonClick(5)"
        ><span>试卷列表</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu
      index="content"
      v-show="$check_group(['/forum/table', '/forum_type/table'])"
    >
      <template slot="title"
        ><i class="el-icon-chat-line-round"></i
        ><span ref="customTemplate6">交流管理</span></template
      >
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/forum/table')"
        index="/forum/table"
        @click="handleButtonClick(6)"
      >
        <!-- <span>论坛</span> -->
        <span>{{ $page_title("/forum/table") || "论坛" }}</span>
      </el-menu-item>
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/forum_type/table')"
        index="/forum_type/table"
        @click="handleButtonClick(6)"
      >
        <!-- <span>论坛类型</span> -->
        <span>{{ $page_title("/forum_type/table") || "论坛分类" }}</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu
      index="mall"
      v-show="
        user_group == '管理员' ||
        $check_group([
          '/goods/table',
          '/order/table',
          '/mall_center/table',
          '/logistics_delivery/table',
        ])
      "
    >
      <template slot="title"
        ><i class="el-icon-shopping-cart-2"></i
        ><span ref="customTemplate7">商城管理</span></template
      >
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/mall_center/table')"
        index="/mall_center/table"
        class="bg-hover"
        @click="handleButtonClick(7)"
        ><span>商城中心</span></el-menu-item
      >
      <!--<el-menu-item v-show="user_group == '管理员' || $check_action('/goods/table')" index="/goods/table"
				class="bg-hover"><span>{{$page_title("/goods/table") || "商品"}}</span></el-menu-item>-->
      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/goods_type/table')"
        index="/goods_type/table"
        class="bg-hover"
        @click="handleButtonClick(7)"
        ><span>{{
          $page_title("/goods_type/table") || "分类列表"
        }}</span></el-menu-item
      >

      <el-menu-item
        v-show="user_group == '管理员' || $check_action('/order/table')"
        index="/order/table"
        class="bg-hover"
        @click="handleButtonClick(7)"
        ><span>{{ $page_title("/order/table") || "订单" }}</span></el-menu-item
      >
      <el-menu-item
        v-show="
          user_group == '管理员' || $check_action('/logistics_delivery/table')
        "
        index="/logistics_delivery/table"
        class="bg-hover"
        @click="handleButtonClick(7)"
        ><span>订单配送</span></el-menu-item
      >
    </el-submenu>

    <el-submenu index="auth" v-show="user_group == '管理员'">
      <template slot="title"
        ><i class="el-icon-s-custom"></i
        ><span ref="customTemplate9">权限管理</span></template
      >
      <el-menu-item
        index="/auth/table"
        v-show="user_group == '管理员'"
        @click="handleButtonClick(9)"
        ><span>权限列表</span></el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: {
      trye: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      user_group: this.$store.state.user.user_group,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },

    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleButtonClick(buttonId) {
      let lis_title;
      const templateRefs = [
        null, // 索引 0 不使用
        this.$refs.customTemplate1,
        this.$refs.customTemplate2,
        this.$refs.customTemplate3,
        this.$refs.customTemplate4,
        this.$refs.customTemplate5,
        this.$refs.customTemplate6,
        this.$refs.customTemplate7,
        this.$refs.customTemplate8,
        this.$refs.customTemplate9,
        this.$refs.customTemplate10,
      ];

      if (buttonId >= 1 && buttonId <= templateRefs.length) {
        lis_title = templateRefs[buttonId];
        sessionStorage.setItem("title-text", buttonId.toString());
      } else {
        sessionStorage.setItem("title-text", buttonId);
      }

      if (lis_title) {
        this.text = lis_title.innerText;
        console.log(this.text);
        sessionStorage.setItem("title-text", this.text);
      }
      // sessionStorage.setItem('title-text', buttonId)
    },
  },
  computed: {
    auth() {
      var tables = this.$store.state.web.auth;
      var lt = [];
      let site_list = [];
      site_list.push("i_want_to_customize");
      let list = [
        "exam",
        "article",
        "article_type",
        "comment",
        "goods",
        "order",
        "logistics_delivery",
        "forum",
        "forum_type",
        "notice",
        "message",
        "subject",
        "exam_question_database",
        "subject_exam",
        "user_answer_wrong",
      ];
      list.push("mall_center");
      list.push("mall_users");
      list.push("seller");
      for (var i = 0; i < tables.length; i++) {
        var o = tables[i];
        if (o.path.indexOf("/table") !== -1) {
          if (list.indexOf(o.table_name) === -1) {
            o.has_add = site_list.indexOf(o.table_name) === -1;
            lt.push(o);
          }
        }
      }
      return lt;
    },
  },
};
</script>

<style scoped="scoped">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 16rem;
}

.side {
  float: left;
  background: #545c64;
  color: #fff;
  overflow-y: scroll;
  height: 100vh;
}
.active {
  color: #409eff !important;
}

.sactive {
  color: #fdfcfb !important;
}
.side::-webkit-scrollbar {
  display: none;
}
</style>
