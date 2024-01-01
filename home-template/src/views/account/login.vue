<template>
	<div class="page_account login" id="account_login">
		<div class="warp login_warp">
			<div class="container">
				<div class="row row_login">
							
							<!-- 登录 -->
							<div class="form_login">
							<div class="form_box">
								<b-form class="forms">
									<b-form-group id="input-group-1" label="用户名:" label-for="input-1"
										:state="validation_username" invalid-feedback="账户名长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-1" v-model="form.username" type="text" placeholder="用户名"
											trim></b-form-input>
									</b-form-group>

									<b-form-group id="input-group-2" label="密码:" label-for="input-2"
										:state="validation_password" invalid-feedback="密码长度为在5-16个字符"
										valid-feedback="校验通过">
										<b-form-input id="input-2" v-model="form.password" type="password"
											placeholder="密码" trim autocomplete="off"></b-form-input>
									</b-form-group>

										<!-- 数字验证开始 -->
										<div class="geetest_box">
											<div class="geetest_box_title"><span>验证:</span></div>
											<div class="geetest_box_content">
												<Verification ref="child"></Verification>
											</div>
										</div>
										<!-- 数字验证结束 -->
								
								</b-form>
									<div class="btns_bottom log_bt">
										<button class="btn_item btn" @click="submit()"><span>登录</span></button>
										<button class="forgot_nav btn" @click="$router.push('/account/forgot')">
											<span>找回密码</span>
										</button>
																			<button class="btn_register btn" @click="$router.push('/account/register')">
											没有存在账户?<span>创建一个账户吧！</span>
										</button>
																		</div>
								</div>
							</div>
						


				</div>
			</div>
		</div>
		<div v-if="openFace" class="face-login">
			<el-button @click="openAndInitCamera()">摄像头</el-button>
			<el-button @click="openAndUploadImg()">图片</el-button>
			<div v-if="openCamera" class="face-camera">
				<div>
					<canvas ref="canvasElement"></canvas>
					<video ref="videoElement" autoplay></video>
				</div>
				<el-button @click="takePhoto">拍照</el-button>
				<el-button @click="submitFace('camera')">提交</el-button>
			</div>
			<div v-if="openFaceImg" class="face-img">
				<el-upload id="photo" class="avatar-uploader" drag
						   accept="image/gif, image/jpeg, image/png, image/jpg" action="" :http-request="uploadImg"
						   :show-file-list="false" >
					<img v-if="form['face_image']" :src="$fullUrl(form['face_image'])" class="avatar" style="width: 100%;height: 100%;">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-button @click="submitFace('img')">提交</el-button>
			</div>
		</div>
	</div>
</template>

<script>
		import Verification from '@/components/common/verification.vue'
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				form: {
					username: "",
					password: "",
					face_image:""
				},
				url_upload: "~/api/user/upload?",
				openFace: false,
				openCamera:false,
				openFaceImg:false,
				cameraPhotoUrl: null,
				face_image: "",
				face_url: "",
			};
		},
		methods: {

	submit() {
				var _this = this;
				// var condition = this.validation_username && this.validation_password;
				// if (!condition) {
				// 	return this.$message.warning("输入不合法");
				// }
				// 极验开始
	
						const bool = this.$refs.child.sublim();
						if(!this.validation_username){
						return this.$message.warning("请输入正确账号")
					}else if(!this.validation_password){
						return this.$message.warning("请输入正确密码")
					}
							else if(!bool){
						return
					}
						// 极验结束
				var form = Object.assign({}, this.form);
				form.is_face = "face";
				this.$post("~/api/user/login?", form, (res) => {
					if (res.result && res.result.obj) {
						_this.openFace = true;
					} else if (res.error) {
						console.log(res.error);
					this.$message.error(res.error.message);
					}
				});
			},
			initCamera() {
				navigator.mediaDevices.getUserMedia({ video: true })
						.then(stream => {
							const videoElement = this.$refs.videoElement;
							videoElement.srcObject = stream;
							videoElement.play();
						})
						.catch(error => {
							console.error('无法访问摄像头：', error);
						});
			},
			takePhoto() {
				const videoElement = this.$refs.videoElement;
				const canvasElement = this.$refs.canvasElement;
				const context = canvasElement.getContext('2d');

				// 将视频流的画面绘制到Canvas中
				context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

				// 获取Canvas中的图像数据
				const imageData = canvasElement.toDataURL('image/png');

				// 显示拍摄的照片
				this.cameraPhotoUrl = imageData;

				let file = this.base64ToFile(this.cameraPhotoUrl,'cameraImg')
				this.uploadFile(file,"face_image")
			},
			closeVideo() {
				const srcObject = this.$refs.videoElement.srcObject ? this.$refs.videoElement.srcObject.getTracks() : this.$refs.videoElement.src.getTracks()
				srcObject.forEach(track => {
					track.stop();
					this.$refs.videoElement.src = null;
				});
			},
			uploadImg(param){
				this.uploadFile(param.file, "face_image");
			},
			openAndInitCamera(){
				this.openFaceImg = false;
				this.openCamera = true;
				this.initCamera();
			},
			openAndUploadImg(){
				this.openCamera = false;
				this.openFaceImg = true;
			},
			submitFace(type){
				if (type==='camera'){
					this.closeVideo();
				}
				//人脸识别登录
				let form = {
					username : this.form.username + '',
					face_image: this.face_url
				};
				let _this = this;
				this.$post('~/api/user/face_login?', form, (res) => {
					if (res.result && res.result.obj) {
					var obj = res.result.obj;
					
					$.db.set("token", obj.token);
					_this.$store.commit("user_set", obj);
					
					this.$get_auth(obj.user_group, () => {
						this.$router.push("/");
						location.reload();
					});
					this.$message.success("登录成功！");


					} else if (res.error) {
						console.log(res.error);
						this.$message.error(res.error.message);
					}
				});
			},
			//base64转flie
			base64ToFile(base64, name) {
				if (typeof base64 != 'string') {
					return;
				}
				let arr = base64.split(',')
				let type = arr[0].match(/:(.*?);/)[1]
				let fileExt = type.split('/')[1]
				let bstr = atob(arr[1])
				let n = bstr.length
				let u8arr = new Uint8Array(n)
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n)
				}
				return new File([u8arr], `${name}.` + fileExt, {
					type: type
				})
			},
		},
		computed: {
			/**
			 * 验证用户名
			 */
			validation_username() {
				var length = this.form.username.length;
				if (!length) {
					return null;
				}
				return length > 4 && length < 17;
			},
			/**
			 * 验证密码
			 */
			validation_password() {
				var length = this.form.password.length;
				if (!length) {
					return null;
				}
				return length > 4 && length < 17;
			},
		},

		components:{
			Verification,
		}

	};
</script>

<style scoped>
	.page_account {
		min-height: 800px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	button{
		border: 1px solid #32323232;
		border-radius: 7px;
		text-align: center;
    	height: 48px;
    	line-height: 48px;
	}

	button span{
		color:#212121
	}
	
	.btn_item {
		cursor: pointer;
		width: 50%;
	
		color: #fff;
		text-align: center;
		height: 48px;
		line-height: 48px;
	}

	.flex_cc {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form_login {
		padding: 1rem;

	}

	.more_nav {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 1rem;
		margin: auto 0;
	}



	.more_nav .btns_bottom {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}


	.forgot_nav {
		text-align: left;
		font-size: 10px;
		margin-top: 5px;
		cursor: pointer;
	}
	
	.btn_register{
		margin-top: 5px;
	}

	/*************************************** */
	.sign_in .form .el-input{
		width: 100%;
	}

	/***************极验************************ */
	.geetest_box{
		display: flex;
		margin-bottom: 30px;
		width: 420px;
	}
	.geetest_box_title{
		display: flex;
		width: 100px;
		font-size: 14px;
		text-align: inherit;
		margin-right: 0;
	}
	.geetest_box_title::before{
        content: '*';
    color: #F56C6C;
    margin-right: 4px;
	}
	.geetest_box_content{
	}

</style>
