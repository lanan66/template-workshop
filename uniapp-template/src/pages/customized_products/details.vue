<template>
	<view class="page_customized_products diy_detail diy_detail--new" id="customized_products_details">
		<view class="warp">
			<view class="container-fluid">
				<view class="row">
					<view v-if="$check_field('get','product_name')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>商品名称</span>
							</view>
								<view class="diy_field diy_text">
								<span>
									{{ obj["product_name"] }}
								</span>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','inventory')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>库存</span>
							</view>
								<view class="diy_field diy_number">
								<span>
									{{ obj["inventory"] }}
								</span>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','attachment')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>附件</span>
							</view>
								<view class="diy_field diy_file">
								<button @click="download_file($fullUrl(obj['attachment']))" class="btn" v-if="obj['attachment']">下载文件</button>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','picture')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>图片</span>
							</view>
								<view class="diy_field diy_img">
								<img :src="$fullUrl(obj['picture'])" />
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','video')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>视频</span>
							</view>
								<view class="diy_field diy_video">
								<video
										style="text-align: left"
										:src="$fullUrl(obj['video'])"
										controls
										v-if="obj['video']"
								></video>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','audio_frequency')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>音频</span>
							</view>
								<view class="diy_field diy_music">
								<video
										style="text-align: left"
										:src="$fullUrl(obj['audio_frequency'])"
										controls
										v-if="obj['audio_frequency']"
								></video>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','remarks')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>备注</span>
							</view>
								<view class="diy_field diy_desc">
								<span>
									{{ obj["remarks"] }}
								</span>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','seller')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>卖家</span>
							</view>
								<view class="diy_field diy_uid">
								{{ get_user_seller(obj['seller']) }}
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','price')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>价格</span>
							</view>
								<view class="diy_field diy_number">
								<span>
									{{ obj["price"] }}
								</span>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','details')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>详情</span>
							</view>
								<view class="diy_field diy_html">
								<rich-text class="rich_text" :nodes="obj['details']"></rich-text>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','production_time')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>生产时间</span>
							</view>
								<view class="diy_field diy_datetime">
								<span>
									{{ $toTime(obj["production_time"],"yyyy-MM-dd hh:mm:ss") }}
								</span>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','date')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>日期</span>
							</view>
								<view class="diy_field diy_date">
								<span>
									{{ $toTime(obj["date"],"yyyy-MM-dd") }}
								</span>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','is_it_a_special_offer')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>是否特价</span>
							</view>
								<view class="diy_field diy_text">
								<span>
									{{ obj["is_it_a_special_offer"] }}
								</span>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','product_category')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>商品类别</span>
							</view>
								<view class="diy_field diy_text">
								<span>
									{{ obj["product_category"] }}
								</span>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','category')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>类别</span>
							</view>
								<view class="diy_field diy_text">
								<span>
									{{ obj["category"] }}
								</span>
							</view>
							</view>
					</view>
					<view v-if="$check_field('get','customized_categories')" class="col-12 col-6">
						<view class="view">
							<view class="diy_title">
								<span>定制类别</span>
							</view>
								<view class="diy_field diy_text">
								<span>
									{{ obj["customized_categories"] }}
								</span>
							</view>
							</view>
					</view>
				</view>
			</view>
			<view class="row">
					<view class="col-12 col-md-4 view">
					<span>点赞{{ obj["praise_len"] }}</span>
				</view>
	
	
					<view class="col-12 col-md-4 view">
					<span>点击数{{ obj["hits"] }}</span>
				</view>
					</view>
		</view>

	<div class='warp' v-if='timeTypeShow'>
		<div class='container-fluid'>
			<div class='row'>
				<div class='col'>
					<div class='time_type'>
							<span>
								{{ obj['timer_title'] }}
							</span>
						<div>
							<span>{{ timer_start_day }}</span>天
							<span>{{ timer_start_hour }}</span>小时
							<span>{{ timer_start_min }}</span>分
							<span>{{ timer_start_sec }}</span>秒
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

		<div  class="warp">
			<div class='container-fluid'>
				<div class='row'>
					<div class='col'>
						<span >限制次数：{{ obj['limit_times'] }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 地图 -->
		<div class="warp">
			<div class="container-fluid" style="margin:10px 0;">
				<div class="row">
		 			<div class="col">
						<view class="col-12 col-6">
							<view class="view">
								<view class="diy_title">
									<span>当前定位</span>
								</view>
								<view class="diy_field diy_datetime">
								<span>
									{{ obj["location_address"] }}
								</span>
								</view>
							</view>
						</view>
						<!-- #ifdef !APP-VUE -->
							<map style="width: 100%; height: 300px;" :latitude="obj.location_lat" :longitude="obj.location_lng" :markers="[{id: 1, width: 20, height: 30, latitude: obj.location_lat,longitude: obj.location_lng,iconPath: '../../static/map_marker.png'}]">
							</map>
						<!-- #endif -->
					</div>
				</div>
			</div>
		</div>

		<!-- 评论区标题 -->
		<view class="bar_title comment_title">
			<view class="title">
				<navigator :url="bar_url">
					<text>
						{{ bar_title }}
					</text>
				</navigator>
			</view>
		</view>

		<!-- 评论区列表 -->
		<list_comment :list="list_comment"></list_comment>

		<view class="warp">
			<view class="container-fluid container-fluid-comment--new">
				<view class="row">
					<view class="col">
									<button type="button" class="btn btn-primary" v-if="$check_action('/i_want_to_customize/edit','add')" @click="to_form('/pages/i_want_to_customize/edit')">
							<span>定制</span>
						</button>
			
<!--						<button type="button" class="btn btn-primary" @click="cancel()">返回</button>-->

						<button type="button" class="btn btn-primary" @click="change_praise()">
							<span>点赞</span>
						</button>

						<!-- 二维码 -->
						<button type="button" class="btn btn-primary" @click="dialogShow()">
							<span>{{obj['qrcode_title']}}</span>
						</button>

						<navigator class="btn link"
							:url="'/pages/comment/edit?source_table=customized_products&source_field=customized_products_id&source_id=' + obj['customized_products_id']">
							评论
						</navigator>

						<navigator @click="change_collect()" class="btn publish_box">
							<uni-icons type="heart"></uni-icons>
							<text>收藏</text>
						</navigator>

							<button open-type="share" class="btn btn-primary">分享</button>
					</view>
				</view>
			</view>
		</view>

		<template>
			<view class="dialog" @click="dialogClose" v-if="isShowDialog">
				<view class="dialog-content" @click.stop="" :class="isShowMaskContent ? 'show-dialog' : 'hide-dialog'">
					<image :src="$fullUrl(obj['qrcode_img']) " :fit="contain" style="width: 400upx;		height: 55vh"/>
					<span>{{ obj.qrcode_title }}</span>
					<view class="dialog-close iconfont iconfabu-guanbi1" @click="dialogClose"></view>
				</view>
			</view>
		</template>

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
				url_get_obj: "~/api/customized_products/get_obj?",
				field: "customized_products_id",
				query: {
					"customized_products_id": 0
				},
				// 商品详情初始化
				obj: {
						"product_name": "",
							"inventory": 0,
							"attachment": "",
							"picture": "",
							"video": "",
							"audio_frequency": "",
							"remarks": "",
							"seller": 0,
							"price": 0,
							"details": "",
							"production_time": "",
							"date": "",
							"is_it_a_special_offer": "",
							"product_category": "",
							"category": "",
							"customized_categories": "",
						"hits": 0,
					"praise_len": 0,
					"customized_products_id": 0,
					"qrcode_img":"",
					"qrcode_title":"",
					"timer_title":'', // 计时器标题
					"timing_start_time":'', // 计时开始时间
					"timing_end_time":'', // 计时结束时间
					"location_address": "", // 定位地址
					"location_lng": 0, // 定位地址经度
					"location_lat": 0, // 定位地址纬度
					"limit_times":'', // 限制次数

				},
				// 点赞
				praise: 0,
				// 点赞状态
				state_praise: false,
				// 收藏
				collect: 0,
				// 收藏状态
				state_collect: false,
				// 评论列表初始化
				list_comment: [],
				// 评论bar标题
				bar_title: "评论区",
				// 评论bar的链接
				bar_url: "",
				isShowDialog: false, // 整个弹窗
				isShowMaskContent: false, // 白色填充区域
				timeTypeShow: true,
												// 用户列表
				list_user_seller: [],
													timer_start_day:0,
				timer_start_hour:0,
				timer_start_min:0,
				timer_start_sec:0,
			}
		},
		methods: {
			openUrl(url) {
				console.log(1111)
				uni.navigateTo({
					url:`/pages/webview/webview?url=${url}`
				})
			},
			/**
			 * 获取点赞
			 * @param {Object} obj
			 */
			get_praise(obj) {
				var user_id = this.user.user_id;

				this.$get("~/api/praise/count?", {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: obj["customized_products_id"]
				}, (res) => {
					if (res.result || res.result === 0) {
						this.praise = res.result;
						console.log("点赞数：" ,res.result);
					}
					else if (res.error){
						this.$toast(res.error.message);
						console.error(res.error);
					}
				});

				this.$get("~/api/praise/count?", {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: obj["customized_products_id"],
					user_id
				}, (res) => {
					if (res.result || res.result === 0) {
						this.state_praise = res.result ? true : false;
						console.log("点赞状态：" ,res.result);
					}
					else if (res.error){
						this.$toast(res.error.message);
						console.error(res.error);
					}
				})
			},

			/**
			 * 改变点赞数
			 */
			change_praise(obj) {
				var user_id = this.user.user_id;

				var query = {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: this.obj["customized_products_id"],
					user_id
				};

				var _this = this;
        _this.obj.praise_len = parseInt(_this.obj.praise_len)
				// 点赞状态
				if (this.state_praise) {
					this.state_praise = false;
					this.$get('~/api/praise/del?', query, (res) => {
						if(res.result){
							var praise_len = _this.obj.praise_len-1
							this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj["customized_products_id"], {
								praise_len
							}, (res) => {
								if(res.result){
									console.log("添加点赞数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							this.$toast("取消点赞");
						}
						else if (res.error){
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				} else {
					this.state_praise = true;
					this.$post('~/api/praise/add?', query, (res) => {
						if (res.result) {
							var praise_len = _this.obj.praise_len+1
							this.$post('~/api/customized_products/set?customized_products_id=' + _this.obj["customized_products_id"], {
								praise_len
							}, (res) => {
								if(res.result){
									console.log("添加点赞数状态：" ,res.result);
								}
								else if(res.error){
									console.error(res.error);
								}
							});
							this.$toast("点赞成功");
						}
						else if (res.error) {
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				};
			},

			/**
			 * 初始化收藏状态
			 * @param {Object} obj
			 */
			get_collect(obj) {
				var user_id = this.user.user_id;

				var query = {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: obj["customized_products_id"],
					user_id
				};

				this.$get('~/api/collect/count?', query, (res) => {
					console.log(res);
					if (res.result || res.result === 0) {
						var bl = res.result ? true : false;
						this.state_collect = bl;
						console.log("收藏状态：" + bl);
					}
					else if(res.error) {
						console.error(res.error);
					}
				});
			},

			/**
			 * 改变收藏状态
			 */
			change_collect() {
				var user_id = this.user.user_id;

				var query = {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: this.obj["customized_products_id"],
					user_id
				};

				// 收藏状态
				if (this.state_collect) {
					this.state_collect = false;
					this.$get('~/api/collect/del?', query, (res) => {
						if(res.result){
							this.$toast("取消收藏");
						}
						else if (res.error){
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				} else {
					this.state_collect = true;
								query.title = this.obj.product_name
																																																																																					this.$post('~/api/collect/add?', query, (res) => {
						if (res.result) {
							this.$toast("收藏成功");
						}
						else if (res.error) {
							this.$toast(res.error.message);
							console.error(res.error);
						}
					});
				};
			},

			/**
			 * 获取评论
			 * @param {Object} obj
			 */
			get_comment(obj) {
				this.$get("~/api/comment/get_list?", {
					source_table: "customized_products",
					source_field: "customized_products_id",
					source_id: obj["customized_products_id"]
				}, (res) => {
					if (res.result && res.result.list) {
						var list = res.result.list;
						this.list_comment = list;
						console.log("评论请求结果：" ,list);
					}
					else if (res.error){
						console.error(res.error);
					}
				});
			},

			/**
			 * 添加访问量
			 */
			add_hits(obj) {
				obj["hits"] = obj["hits"] + 1;
				var hits = obj["hits"];
				this.$post('~/api/customized_products/set?customized_products_id=' + obj["customized_products_id"], {
					hits
				}, (res) => {
					if(res.result){
						console.log("添加访问量状态：" ,res.result);
						var body = {
							source_table: "customized_products",
							source_field: "customized_products_id",
							source_id: this.obj.customized_products_id,
							user_id: this.$store.state.user.user_id,
						};
						this.$post("~/api/hits/add?", body, (res) => {
							console.log(res);
						});
					}
					else if(res.error){
						console.error(res.error);
					}
				});
			},

			/**
			 * 获取对象之后
			 * @param {Object} json 结果对象
			 */
			get_obj_after(json) {
				// 判断是否获取到数据
				if (this.obj) {
					var obj = this.obj;
					// 获取点赞数
					this.get_praise(obj);
					// 初始化收藏状态
					this.get_collect(obj);
					// 获取评论
					this.get_comment(obj);
					// 增加点击数
					this.add_hits(obj);
					this.runTiming();
				}
			},
			/**
			 * 二维码
			 */
			dialogClose() {
				let that = this;
				that.isShowMaskContent = false;
				setTimeout(function() {
					that.isShowDialog = false;
					that.$forceUpdate();
				}, 100);
			},
			dialogShow() {
				let that = this;
				that.isShowMaskContent = true;
				setTimeout(function() {
					that.isShowDialog = true;
					that.$forceUpdate();
				}, 100);
			},

			/**
			 * 倒计时
			 */
			// oDiv(el) {
			// 	if(typeof(el) == 'string') {
			// 		return(document.getElementById(el));
			// 	}
			// 	return(el);
			// },

			fillZero(num, digit) {
				var str = '' + num;
				if(str.length < digit) {
					str = '0' + str;
				}
				return str;
			},
			runTiming() {
				var timer = null;
				var _this = this;
				timer = setInterval(updateTime, 1000);
				updateTime();

				function updateTime() {
					var oEndDate = _this.obj.timing_end_time;
					var seart = _this.obj.timing_start_time;
					if (oEndDate.indexOf("-") != -1) {
						oEndDate = new Date(oEndDate).getTime();
					}
					if (seart.indexOf("-") != -1) {
						seart = new Date(seart).getTime();
					}
					var oNowDate = new Date();
					var iRemain = 0
					iRemain = parseInt((oNowDate.getTime() - seart) / 1000);
					if (iRemain <= 0) { //判断开始时间是否小于或等于今天
						clearInterval(timer);
						iRemain = 0;
						_this.timeTypeShow = false;
					} else {
						iRemain = parseInt((oEndDate - oNowDate.getTime()) / 1000);
						if (iRemain <= 0) { //判断结束时间是否小于或等于今天
							clearInterval(timer);
							iRemain = 0;
							_this.timeTypeShow = false;
						} else {
							_this.timeTypeShow = true;
							var iDay = parseInt(iRemain / 86400); //剩余天数

							iRemain %= 86400;
							var iHour = parseInt(iRemain / 3600); //剩余小时

							iRemain %= 3600;
							var iMin = parseInt(iRemain / 60); //剩余分钟

							iRemain %= 60;
							var iSec = iRemain; //剩余秒

							_this.timer_start_day = _this.fillZero(iDay, 2);
							_this.timer_start_hour = _this.fillZero(iHour, 2);
							_this.timer_start_min = _this.fillZero(iMin, 2);
							_this.timer_start_sec = _this.fillZero(iSec, 2);
						}
					}
				}
			},
											/**
			 * 获取卖家用户列表
			 */
			async get_list_user_seller() {
				var json = await this.$get("~/api/user/get_list?user_group=卖家");
				if(json.result && json.result.list){
					this.list_user_seller = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			get_user_seller(id){
				let obj = this.list_user_seller;
				let ret = "";
				for(let i=0;i<obj.length;i++){
					if(obj[i].user_id==id){
						ret = obj[i].nickname+"-"+obj[i].username;
					}
				}
				return ret;
			},
											},
		created() {
											this.get_list_user_seller();
											},
		mounted() {
		},
		onShareAppMessage(res) {
        return {
          title:"详情",
           path: "/pages/customized_products/details",
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    }
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
		padding:  5vh;
		text-align: center;

	}
	.dialog-content span{
		margin-top:  3vh;
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
	.diy_detail--new{
		padding: 5px;
	}
	.diy_detail--new .view {
		border-bottom: 1px solid #ccc;
		padding: 8px 0 ;
	}
	.diy_detail--new .view uni-view{
		display: inline-block;
	}
	.diy_detail--new .view .diy_title{
		color: var(--color_primary);
		margin-right: 5px;
		vertical-align: top;
	}
	.diy_detail--new .view .diy_img img{
		width: 100%;
	}
	.diy_detail--new .view .diy_music{
		vertical-align: text-top;
	}
	.diy_detail--new .bar_title{
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
	.diy_detail--new .bar_title .title{
		margin: 0 auto;
		color: var(--color_white);
		font-weight: 600;
	}
	.diy_detail--new .container-fluid-comment--new{
		margin: 10px 0.6rem;
	}
	.diy_detail--new .container-fluid-comment--new .col{
		display: flex;
		flex: auto;
		flex-wrap: wrap;
		flex-direction: row;
		margin-left: -10px;
	}
	.diy_detail--new .container-fluid-comment--new .btn{
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
	.diy_detail--new .container-fluid-comment--new .btn:after{
		display: none;
	}
	.diy_detail--new .container-fluid-comment--new .btn .uni-icons{
		color: #fff !important;
	}
	.diy_detail--new .comment_title{
		margin-top: 10px;
	}
	/* new style end */

</style>
