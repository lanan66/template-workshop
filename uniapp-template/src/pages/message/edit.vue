<template>
	<view class="diy_edit page_i_want_to_customize" id="i_want_to_customize_edit">
		<view class='warp'>
			<view class='container'>
				<view class='row'>
					<view class="col-12 col-md-6 row-item">
						<view class="col-12 col-md-6 row-item">
							<view class="diy_title diy_text_row">
								<text>
									标题:
								</text>
							</view>
							<!-- 文本 -->
							<view class="diy_field diy_text diy_text_row">
								<input type="text" id="form_title" v-model="form.title" placeholder="请输入标题" />
							</view>
						</view>
						<view class="diy_title diy_text_row">
							<text>
								用户名:
							</text>
						</view>
						<!-- 文本 -->
						<view class="diy_field diy_text diy_text_row">
							<input type="text" id="form_nickname" v-model="form.nickname" placeholder="请输入用户名"
								:disabled="disabledObj.nickname_disabled" />
						</view>
					</view>
					<!--          <view class="col-12 col-md-6 row-item">-->
					<!--            <view class="diy_title diy_text_row">-->
					<!--              <text>-->
					<!--                手机号码:-->
					<!--              </text>-->
					<!--            </view>-->
					<!--            &lt;!&ndash; 文本 &ndash;&gt;-->
					<!--            <view class="diy_field diy_text diy_text_row">-->
					<!--              <input type="text" id="form_phone" v-model="form.phone" placeholder="请输入您的手机号码"-->
					<!--                     :disabled="disabledObj.phone_disabled"/>-->
					<!--            </view>-->
					<!--          </view>-->

					<!--          <view class="col-12 col-md-6 row-item">-->
					<!--            <view class="diy_title diy_text_row">-->
					<!--              <text>-->
					<!--                邮箱:-->
					<!--              </text>-->
					<!--            </view>-->
					<!--            &lt;!&ndash; 文本 &ndash;&gt;-->
					<!--            <view class="diy_field diy_text diy_text_row">-->
					<!--              <input type="text" id="form_email" v-model="form.email" placeholder="请输入您的电子邮箱"-->
					<!--                     :disabled="disabledObj.email_disabled"/>-->
					<!--            </view>-->
					<!--          </view>-->

					<view class="col-12 col-md-6 row-item">
						<view class="diy_title diy_text_row">
							<text>
								留言内容:
							</text>
						</view>
						<!-- 文本 -->
						<view class="diy_field diy_text diy_text_row">
							<textarea class="textarea" :inputBorder="true" v-model="form.content"
								placeholder="请输入留言内容"></textarea>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="col-12">
						<view class="btn_box">
							<button class="btn_submit primary_btn" @click="submitForm()">提交</button>
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
				form: {
					title: '',
					nickname: '',
					content: '',
					// phone: '',
					// email: ''
				},
				disabledObj: {
					nickname_disabled: false,
					// phone_disabled: false,
					// email_disabled: false,
				}
			}
		},
		onLoad() {},
		computed: {
			/**
			 * 验证用户名
			 */
			validation_nickname() {
				var length = this.form.nickname.length;
				console.log(length)
				if (!length) {
					return null;
				}
				return length > 0;
			},
			/**
			 * 验证邮箱
			 */
			// validation_email() {
			//   var length = this.form.email.length;
			//   if (!length) {
			//     return true;
			//   }
			//   return length > 4 && length < 17;
			// },
			/**
			 * 验证手机
			 */
			// validation_phone() {
			//   var length = this.form.phone.length;
			//   if (!length) {
			//     return null;
			//   }
			//   return length > 1 && length < 12;
			// },
			/**
			 * 验证留言内容
			 */
			validation_content() {
				var length = this.form.content.length;
				if (!length) {
					return true;
				}
				return length > 1 && length < 580;
			},
			/**
			 * 验证标题
			 */
			validation_title() {
				var length = this.form.title.length;
				if (!length) {
					return null;
				}
				return true
			},
		},
		created() {
			let user = this.$store.state.user;
			if (user && user.user_id) {
				this.form.nickname = user.nickname;
				this.disabledObj.nickname_disabled = true;
				// if (user.email){
				//   this.form.email = user.email;
				//   this.disabledObj.email_disabled = true;
				// }
				// if (user.phone){
				//   this.form.phone = user.phone;
				//   this.disabledObj.phone_disabled = true;
				// }
			}
		},
		methods: {
			/**
			 * 手动提交
			 * @param {Object} form
			 */
			async submitForm() {
				console.log(this.validation_nickname)
				console.log(this.validation_title)
				console.log(this.validation_content)
				let condition =
					this.validation_nickname &&
					this.validation_title &&
					this.validation_content;
					
				if (!condition) {
					this.$toast("输入不合法");
					return;
				}

				let sensitiveWords = await this.filterSensitiveWords(this.form.content)
				if (sensitiveWords.length > 0) {
					this.$toast('当前消息中包含敏感词: ' + sensitiveWords.join(','))
					return;
				}

				let {
					user_id,
					avatar
				} = this.user
				this.$post("~/api/message/add?", Object.assign({}, this.form, {
					user_id,
					avatar
				}), (res) => {
					console.log(res);
					if (res.result) {
						uni.navigateBack({
							delta: 1
						});
					} else if (res.error) {
						this.$toast(res.error.message);
					}
				});
			},
			/**
			 * 手动重置表单
			 */
			resetForm() {
				this.$refs.form.resetFields()
			}
		}
	}
</script>

<style scoped>
	.textarea {
		border: 1px solid rgb(229, 229, 229);
		background-color: rgb(255, 255, 255);
		width: calc(100% - 1rem);
		border-radius: .25rem;
		padding: .5rem;
		font-size: 0.875rem;
	}
</style>