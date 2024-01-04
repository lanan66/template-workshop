<template>

	<view class="container diy_view" id="message_view">
		<view class="warp">
			<view class="container-fluid">
				<view class="row">
					<view class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>头像</span>
							</view>
							<view class="diy_field diy_text">
								<span>
									<image style="width:5rem;height: 5rem;" :src="$fullImgUrl(obj.avatar)"
										mode="scaleToFill" @click="change_avatar(obj.message_id)" />
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
									<input class="uni-input" v-model="obj.title" />
								</span>
							</view>
						</view>
					</view>
					<view class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>昵称</span>
							</view>
							<view class="diy_field diy_text">
								<span>
									{{ obj.nickname }}
								</span>
							</view>
						</view>
					</view>
<!--					<view class="col-12 col-6">-->
<!--						<view class="view">-->
<!--							<view class="diy_title">-->
<!--								<span>留言手机号</span>-->
<!--							</view>-->
<!--							<view class="diy_field diy_text">-->
<!--								<span>-->
<!--									<input class="uni-input" v-model="obj.phone" />-->
<!--								</span>-->
<!--							</view>-->
<!--						</view>-->
<!--					</view>-->
<!--					<view class="col-12 col-6">-->
<!--						<view class="view">-->
<!--							<view class="diy_title">-->
<!--								<span>留言邮箱</span>-->
<!--							</view>-->
<!--							<view class="diy_field diy_text">-->
<!--								<span>-->
<!--									<input class="uni-input" v-model="obj.email" />-->
<!--								</span>-->
<!--							</view>-->
<!--						</view>-->
<!--					</view>-->
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
								<view class="diy_title">
									<span>内容</span>
								</view>
								<view class="diy_field diy_text">
									<span>
										<textarea v-model="obj.content"></textarea>
									</span>
								</view>
							</view>

						</view>
					</view>

					<view class="col-12 col-6">
						<view class="col-12">
							<view class="answer_btn_box">
								<button class="answer_btn_submit" @click="submit()">
									提交
								</button>
								<view class="clear"> </view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import bar_title from "@/components/diy/bar_title.vue";

	import mixin from "@/libs/mixins/page.js";
	export default {
		mixins: [mixin],
		components: {
			bar_title,
		},
		data() {
			return {
				url_get_obj: "~/api/message/get_obj?",
				url_add: "~/api/message/add",
				url_set: "~/api/message/set",
				field: "message_id",
				query: {
					"message_id": 0
				},
				// 商品详情初始化
				obj: {
					"message_id": 0,
					"title": "",
					"content": "",
					"create_time": "",
					"update_time": "",
					// "email": "",
					// "phone": "",
					"avatar": "",
					"nickname": ""
				},
				placeholder: '开始输入...',
				params: 0
			}
		},
		methods: {
			change_avatar(message_id) {
				var _self = this;
				// 选择图像方法
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: _self.$fullUrl('/api/message/upload?'),
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'x-auth-token': _self.$store.state.user.token
							},
							success: function(uploadFileRes) {
								var filename = JSON.parse(uploadFileRes.data).result.url
								console.log(filename)
								var avatar = JSON.parse(uploadFileRes.data).result.url;
								_self.$post('~/api/message/set?message_id=' + message_id, {
									avatar
								}, res => {
									_self.obj.avatar = filename
								})
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
			submit_main() {
				let _slef=this;
				let form = _slef.obj;
				delete form.update_time;
				delete form.create_time;
				_slef.$post(_slef.url_set + '?message_id=' + form.message_id, form, function(json, status) {
					uni.showToast({
						title: '提交成功',
						//将值设置为 success 或者直接不用写icon这个参数
						icon: 'success',
						//显示持续时间为 2秒
						duration: 2000
					}) 
				})
			}
		},
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
