<template>
	<view class="page_exam" id="exam_list">
		<template v-if="$check_action('/subject_exam/list', 'get')">
			<uni-search-bar placeholder="搜索名称" @confirm="search" @cancel="cancel" cancelText="取消"
				@input="input($event, 'name')">
				<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
			</uni-search-bar>
			<uni-table ref="table" border emptyText="暂无更多数据">
				<uni-tr>
					<uni-th align="center">科目</uni-th>
					<uni-th align="center">名称</uni-th>
					<uni-th align="center">答题时长</uni-th>
					<uni-th align="center">总分</uni-th>
					<uni-th align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(o, i) in list" :key="i">
					<uni-td>{{ o.subject_name }}</uni-td>
					<uni-td>{{ o.name }}</uni-td>
					<uni-td>{{ o.duration }}</uni-td>
					<uni-td>{{ o.score }}</uni-td>
					<uni-td>
						<navigator :url="'/pages/exam_subject/details?exam_id=' + o.exam_id" class="answer_link"
							v-if="answered_list[o.exam_id]">
							查看分数
						</navigator>
						<navigator v-else-if="$check_option('/subject_exam/list', 'answers') && o.status === '启用'"
							:url="'/pages/exam_subject/details?exam_id=' + o.exam_id" class="answer_link">
							答题
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
		components: {},
		data() {
			return {
				// 获取数据地址
				url_get_list: "~/api/subject_exam/get_list?like=0",
				url_del: "~/api/subject_exam/del?",

				// 字段ID
				field: "exam_id",

				// 查询
				query: {
					size: 10,
					page: 1,
					name: "",
				},

				// 数据
				list: [],
				answered_list: [],
			};
		},
		methods: {
			get_list_after() {
				for (let i = 0; i < this.list.length; i++) {
					this.get_user_answer_state(this.list[i].exam_id);
				}
			},
			get_user_answer_state(exam_id) {
				let _this = this;
				this.$get(
					"~/api/subject_user_answer/get_obj?user_id=" +
					this.$store.state.user.user_id +
					"&exam_id=" +
					exam_id
				).then((res) => {
					if (res.result && res.result.obj != null) {
						_this.$set(_this.answered_list, exam_id, true);
					} else {
						_this.$set(_this.answered_list, exam_id, false);
					}
				});
			},
			input(e, key) {
				this.query[key] = e.value;
			},
			search_() {
				this.query.page = 1;
				this.get_list();
			},
			cancel() {
				this.query.name = "";
				this.search_();
			},
		},
		mounted() {},
	};
</script>

<style>
	.page_exam {
		padding: 10px;
	}
</style>
