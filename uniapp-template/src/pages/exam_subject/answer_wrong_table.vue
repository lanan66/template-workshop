<template>
	<view class="diy_table diy_table_tml" id="answer_wrong_table">
		<template v-if="$check_action('/user_answer_wrong/table', 'get')">
			<uni-search-bar placeholder="搜索题目" @confirm="search_" @cancel="cancel" cancelText="取消"
				@input="input($event, 'title')">
				<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
			</uni-search-bar>
			<uni-table ref="table" border emptyText="暂无更多数据">
				<uni-tr>
					<uni-th align="center">科目</uni-th>
					<uni-th align="center">题目</uni-th>
					<uni-th align="center">类型</uni-th>
					<uni-th align="center">提交时间</uni-th>
					<uni-th align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(o, i) in list" :key="i">
					<uni-td>{{ o.subject_name }}</uni-td>
					<uni-td>{{ o.title }}</uni-td>
					<uni-td>{{ o.type }}</uni-td>
					<uni-td>{{ $toTime(o["create_time"] ,"yyyy-MM-dd hh:mm:ss") }}</uni-td>
					<uni-td>
						<navigator :url="'/pages/exam_subject/answer_wrong_detail?user_answer_id=' + o.user_answer_id"
							class="answer_link">
							详情
						</navigator>
					</uni-td>
				</uni-tr>
			</uni-table>

			<uni-pagination style="padding: 10px" show-icon="true" :total="count" :pageSize="query.size"
				:current="query.page" @change="page_change"></uni-pagination>
		</template>
	</view>
</template>

<script>
	import mixin from "@/libs/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				// 获取数据地址
				url_get_list: "~/api/user_answer_wrong/get_list?like=0",
				// 字段ID
				field: "user_answer_id",
				// 查询
				query: {
					size: 10,
					page: 1,
					title: "",
					user_id: this.$store.state.user.user_id,
					orderby:"create_time desc"
				},
				user: {}
			};
		},
    methods:{
      search_() {
        this.query.page = 1;
        this.get_list();
      },
      input(e, key) {
        this.query[key] = e.value;
      },
    }
	};
</script>

<style>
	.page_exam {
		padding: 10px;
	}
</style>
