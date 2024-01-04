<template>
  <view class="page_message" id="message_list">
    <!-- 留言列表模块(开始) -->
    <!-- 搜索栏 -->
    <uni-search-bar
        placeholder="搜索标题"
        @confirm="search"
        @cancel="cancel"
        cancelText="取消"
        @input="input($event, 'title')"
    >
      <uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
    </uni-search-bar>

    <navigator
        class="button"
        v-if="user_group == '管理员' || $check_action('/message/edit', 'add')"
        url="/pages/message/edit"
    >
      <text>发布内容</text>
    </navigator>

    <!-- /搜索栏 -->
    <!-- 留言板列表 -->
    <list_message
        style="background-color: #fff"
        :list="list"
        class="mb"
    ></list_message>
    <!-- /留言板列表 -->

    <uni-pagination
        style="padding: 10px"
        title="分页器"
        show-icon="true"
        :total="count"
        :pageSize="query.size"
        :current="query.page"
        @change="page_change"
    ></uni-pagination>

    <!-- 留言列表模块(结束) -->
  </view>
</template>

<script>
	import mixin from "@/libs/mixins/page.js";
  import list_message from "@/components/diy/list_message.vue";

	export default {
		mixins: [mixin],
    components: {
      list_message,
    },
		data() {
			return {
				url_get_list: "~/api/message/get_list?like=0",
				query: {
					page: 1,
					size: 7,
					orderby: "create_time asc"
				},
			}
		},
		methods: {
      get_list_before(param){
        // let user_group = this.user.user_group;
        // if (!user_group || user_group === "游客"){
        //   this.url_get_list = "~/api/message/get_list?user_id=0";
        // }
        // if(user_group !== "管理员"){
        //   param.user_id = this.$store.state.user.user_id;
        // }
        return param;
      },
			get_list_after(json) {
				// let list = json.result.list
				// this.list = list.map((o) => {
				// 	o.list_reply = [];
				// 	return o
				// });
			},

		}

	}
</script>

<style scoped>
	#message_list .list_message {
		background-color: #f8f8f8;
		min-height: 100vh;
	}

	#message_list .item_message {
		background-color: #FFFFFF;
		margin-bottom: 1rem;
	}

	#message_list .user_info {
		text-align: center;
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
	}

	#message_list .time {
		font-size: 0.7rem;
		margin-top: 0.5rem;
	}

	#message_list .content {
		width: 100%;
		padding: 0.8rem;
	}

	#message_list .content rich-text {
		width: 100%;
		word-break: break-all;
	}

	#message_list .reply_btn {
		text-align: right;
		padding: 5px 15px;
	}

	#message_list .list_reply_block {
		margin-left: 4rem;
	}

	#message_list .list_reply_block .list_reply_box {
		padding: 5px 0;

	}


	#message_list .list_reply_block .reply_left .nickname {
		color: var(--color_grey);
		font-size: 0.8rem;
	}

	#message_list .list_reply_block .reply_left .reply_time {
		float: right;
		font-size: 10px;
		transform: scale(0.8);
		color: var(--color_grey);
	}

	#message_list .list_reply_block .content {
		word-break: break-all;
	}

	#message_list .line {
		border-bottom: 1px solid var(--color_border);
	}
</style>
