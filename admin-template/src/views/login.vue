<template>
	<article class="sign_in login_conter">
		<div class="warp">
			<el-row>
				<el-col>
					<el-form :model="form" :rules="rules" ref="form" label-width="60px" class="form">
						<h1>该项目为测试项目（用于演示或测试）</h1>

						<el-form-item label="账号" prop="account">
							<el-input type="text" v-model="form.account" placeholder="请输入账号">
							</el-input>
						</el-form-item>

						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="form.password" placeholder="请输入密码"
								autocomplete="off">
							</el-input>
						</el-form-item>
						<!-- 数字验证开始 -->
						<div class="geetest_box">
							<div class="geetest_box_title">验证</div>
							<div class="geetest_box_content">
								<Verification ref="child"></Verification>
							</div>
						</div>
						<!-- 数字验证结束 -->
						<div class="btns">
							<el-button class="float-right  lg_login" type="primary" @click="sign_in()">登录</el-button>

							<el-button  class="float-right  lg_register" @click="$router.push('./register')">注册</el-button>
							<el-button  class="float-right  lg_forgot" @click="$router.push('./forgot')">忘记密码?</el-button>
						</div>

					</el-form>
				</el-col>
			</el-row>
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
					<img v-if="form['face_image']" :src="$fullUrl(form['face_image'])" class="avatar" style="width: 100%">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-button @click="submitFace('img')">提交</el-button>
			</div>
		</div>
	</article>
</template>

<script>
	import Verification from '@/components/common/verification.vue'
	import mixin from "@/mixins/component.js";
	export default {
		mixins: [mixin],
		data: function() {
			return {
				oauth: {
					signIn: false
				},
				web: this.$store.state.web,
				form: {
					account: "",
					password: "",
					face_image:""
				},
				remember_me: 1,
				rules: {
					account: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 16,
							message: '长度在 5 到 16 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 5,
							max: 16,
							message: '长度在 5 到 16 个字符',
							trigger: 'blur'
						}
					]
				},
				url_upload: "~/api/user/upload?",
				openFace: false,
				openCamera:false,
				openFaceImg:false,
				cameraPhotoUrl: null,
				face_image:"",
			}
		},
		methods: {
			sign_in() {
				let f = this.form;
				let form = {
					password: f.password
				};
				let account = f.account + '';

				form.username = account;

				form.is_face = "face";

								const bool = this.$refs.child.sublim();
								if(!this.form.account){
					return this.$message.warning("请输入正确账号")
				}else if(!this.form.password){
					return this.$message.warning("请输入正确密码")
				}
												else if(!bool){
					return
				}
												var _this = this;

				//人脸识别登录
				this.$post('~/api/user/login?', form, (res) => {
					if (res.result && res.result.obj) {
						_this.openFace = true;
					} else if (res.error) {
						_this.$toast(res.error.message, 'error');
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
					username : this.form.account + '',
					face_image: this.form.face_image
				};
				let _this = this;
				this.$post('~/api/user/face_login?', form, (res) => {
					if (res.result && res.result.obj) {
						let obj = res.result.obj;

						// 缓存用户
						_this.$store.commit('user_set', obj);

						// 存储用户
						if (_this.remember_me) {
							$.db.set('account', form.username);
						}

						// 获取权限
						_this.$get_auth(obj.user_group, ()=>{
							let url = _this.$redirect();
							_this.$router.push(url || '/');
						})

						// 存储登录回来的用户信息
						$.db.set('user_group', JSON.stringify(res.result.obj) );


					} else if (res.error) {
						console.log(res.error);
						_this.$toast(res.error.message, 'error');
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
		created() {

		},
		components:{
			Verification,
		}
	}
</script>

<style>
	.sign_in {
		box-sizing: border-box;
		height: 100vh;
		padding: .5rem;
		width: 100%;
		background: url(../../public/img/bg.jpg) no-repeat;
		background-size: 100% 100%;
		color: #fff;
	}

	.sign_in h1,
	.sign_in .btns {
		text-align: center;
	}

	.sign_in .btns .el-button {
		width: 40%;
	}

	.sign_in .el-form-item__label {
		color: #fff;
	}

	.sign_in .form {
		box-sizing: border-box;
		padding: 1rem 3rem;
		margin: auto;
		margin-top: 17rem;
		width: 100%;
		max-width: 32rem!important;
		box-shadow: 0 0 0 1px hsla(240, 0%, 100%, .3) inset,
			0 .5em 1em rgba(50, 50, 50, 0.6);
		text-shadow: 0 1px 1px hsla(240, 0%, 100%, .5);
		overflow: hidden;
		/* background-color: rgba(255, 255, 255, .5); */
		border-radius: 0.5rem;
	}

	.sign_in .form:after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.8);
		z-index: -1;

		background-image: url(../../public/img/bg.jpg);
		background-position: center top;
		background-size: cover;
		background-attachment: fixed;
		-webkit-filter: blur(20px);
		-moz-filter: blur(20px);
		-ms-filter: blur(20px);
		-o-filter: blur(20px);
		filter: blur(20px);
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
    width: 48px;
    font-size: 14px;
    text-align: right;
    margin-right: 14px;
	}
	.geetest_box_title::before{
        content: '*';
    color: #F56C6C;
    margin-right: 4px;
	}
	.geetest_box_content{
	}

</style>
