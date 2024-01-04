<template>
	<view class="container diy_view" id="answer_wrong_detail">
		<view class="warp">
			<view class="container-fluid">
				<view class="row">
					<view class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>科目</span>
							</view>
							<view class="diy_field diy_text">
								<span>
									{{ obj.subject_name }}
								</span>
							</view>
						</view>
					</view>
					<view class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>标题</span>
							</view>
							<view class="diy_field diy_text">
								<span>
									{{ obj.title }}
								</span>
							</view>
						</view>
					</view>
					<view class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>类型</span>
							</view>
							<view class="diy_field diy_text">
								<span>
									{{ obj.type }}
								</span>
							</view>
						</view>
					</view>
					<view class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>提交时间</span>
							</view>
							<view class="diy_field diy_datetime">
								<span>
									{{ $toTime(obj.create_time,"yyyy-MM-dd hh:mm:ss") }}
								</span>
							</view>
						</view>
					</view>
					<view class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>参考答案</span>
							</view>
							<view class="diy_field diy_datetime">
								<span>
									{{ obj.answer }}
								</span>
							</view>
						</view>
					</view>
					<view class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>答案选项</span>
							</view>
							<view class="diy_field diy_datetime">
								<span>
									{{ obj.question_item }}
								</span>
							</view>
						</view>
					</view>
					<view class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>提交答案</span>
							</view>
							<view class="diy_field diy_datetime">
								<span>
									{{ obj.answers }}
								</span>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import list_comment from "@/components/diy/list_comment.vue";
	import bar_title from "@/components/diy/bar_title.vue";
	import form_editor from "@/components/diy/form_editor.vue";

	import mixin from "@/libs/mixins/page.js";
	export default {
		mixins: [mixin],
		components: {
			list_comment,
			bar_title,
			form_editor
		},
		data() {
			return {
				url_get_obj: "~/api/user_answer_wrong/get_obj?",
				field: "user_answer_id",
				query: {
					"user_answer_id": 0
				},
				// 商品详情初始化
				obj: {
					"title": "",
					"subject_name": "",
					"create_time": "",
					"type": "",
					"answer": "",
					"answers": "",
					"question_item": "",

				},
				
			}
		},
		methods: {
			openUrl(url) {
				console.log(1111)
				uni.navigateTo({
					url: `/pages/webview/webview?url=${url}`
				})
			},

		},
		created() {},
		mounted() {},
	}
</script>

<style>
	.page_goods {
		padding-bottom: 3rem;
	}

	.link {
		text-align: center;
		padding: 0.5rem 0;
		border: 1px solid #DBDBDB;
		border-radius: 0.5rem;
	}

	.buy_wrap {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.dialog {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		position: fixed;
		left: 0;
		top: 0;
		padding: 20vh 0;
	}

	.dialog-content {
		width: 500upx;
		height: 60vh;
		margin: 0 auto;
		background: #FFF;
		border-radius: 10upx;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 5vh;
		text-align: center;

	}

	.dialog-content span {
		margin-top: 3vh;
	}

	.dialog-close {
		width: 40upx;
		height: 40upx;
		border-radius: 20upx;
		position: absolute;
		right: 10upx;
		top: 10upx;
		font-size: 26upx;
		line-height: 40upx;
		text-align: center;
	}

	.dialog-list {
		padding: 40upx 20upx;
	}

	scroll-view {
		width: 100%;
		height: 100%;
	}

	.show-dialog {
		animation: 100ms showDialog linear forwards;
	}

	.hide-dialog {
		animation: 100ms hideDialog linear forwards;
	}

	@keyframes hideDialog {
		0% {
			opacity: 1;
		}


		100% {
			opacity: 0;
		}
	}

	@keyframes showDialog {
		0% {
			opacity: 0;
		}


		100% {
			opacity: 1;
		}
	}

	/* new style start */
	.diy_detail--new {
		padding: 5px;
	}

	.diy_detail--new .view {
		border-bottom: 1px solid #ccc;
		padding: 8px 0;
	}

	.diy_detail--new .view uni-view {
		display: inline-block;
	}

	.diy_detail--new .view .diy_title {
		color: var(--color_primary);
		margin-right: 5px;
		vertical-align: top;
	}

	.diy_detail--new .view .diy_img img {
		width: 100%;
	}

	.diy_detail--new .view .diy_music {
		vertical-align: text-top;
	}

	.diy_detail--new .bar_title {
		position: relative;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2px;
		background: var(--color_primary);
		border-radius: 10px;
		height: 46px;
	}

	.diy_detail--new .bar_title .title {
		margin: 0 auto;
		color: var(--color_white);
		font-weight: 600;
	}

	.diy_detail--new .container-fluid-comment--new {
		margin: 10px 0.6rem;
	}

	.diy_detail--new .container-fluid-comment--new .col {
		display: flex;
		flex: auto;
		flex-wrap: wrap;
		flex-direction: row;
		margin-left: -10px;
	}

	.diy_detail--new .container-fluid-comment--new .btn {
		display: inline-block;
		border: none;
		background: var(--color_primary);
		color: #fff;
		font-size: 16px !important;
		padding: 2px 12px !important;
		border-radius: 20px;
		line-height: inherit;
		margin-bottom: 5px;
		margin-left: 10px;
		margin-right: 0;
	}

	.diy_detail--new .container-fluid-comment--new .btn:after {
		display: none;
	}

	.diy_detail--new .container-fluid-comment--new .btn .uni-icons {
		color: #fff !important;
	}

	.diy_detail--new .comment_title {
		margin-top: 10px;
	}

	/* new style end */
</style>
