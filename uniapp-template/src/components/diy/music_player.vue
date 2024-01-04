<template>
	<view class="music_player" v-if="musicList.length > 0">
		<view class="play_progress_slider_box">
			<image :src="$fullUrl(musicList[playIndex].cover)"></image>
			<view class="play_progress_slide">
				<text class="music_name">{{musicList[playIndex].music_name}} {{musicList[playIndex].singer}}</text>
				<slider :value="playProgress" @changing="sliderChanging" @change="seek" block-size="14" step="0.1" />
			</view>
			<text class="play_progress_time">{{calcPlayDuration}} / {{calcTotalDuration}}</text>
		</view>
		<view class="play_control">
			<view class="play_mode">
				<view v-if="playMode === 'cycle'" @click="changePlayMode('singleCycle')">
					<view class="cycle"></view>
					<text>顺序播放</text>
				</view>
				<view v-if="playMode === 'singleCycle'" @click="changePlayMode('random')">
					<view class="singleCycle"></view>
					<text>单曲循环</text>
				</view>
				<view v-if="playMode === 'random'" @click="changePlayMode('cycle')">
					<view class="random"></view>
					<text>随机播放</text>
				</view>
			</view>
			<view class="play_control">
				<view class="prev" @click="changeMusic('prev')"></view>
				<view class="pause" v-if="playState" @click="pauseMusic"></view>
				<view class="play" @click="playMusic" v-else></view>
				<view class="next" @click="changeMusic('next')"></view>
			</view>
			<view class="play_mode">
				<view></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		nextTick
	} from "vue"
	export default {
		props: {
			musicList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				audio: null,
				playState: false,
				playProgress: 0,
				playMode: 'cycle',
				playVolume: 80,
				playIndex: 0,
				playTime: 0,
				totalDuration: 0,
				currentTime: 0,
				noPlayAudioIndexList: [],
				getPlayProgressTimer: null,
				getAudioInfoTimer: null
			}
		},
		mounted() {
			this.audio = uni.createInnerAudioContext()

			this.audio.onCanplay(() => {
				this.getAudioInfo()
			})
			this.audio.onEnded(() => {
				this.changeMusic('next')
			})
			this.audio.onSeeked(() => {
				setTimeout(() => {
					this.currentTime = this.audio.currentTime
				}, 100)
				this.getPlayProgress()
			})
			this.getPlayProgress()
		},
		watch: {
			musicList() {
				this.playIndex = 0
				this.getVideoData(this.$fullUrl(this.musicList[this.playIndex].audio_frequency))
			},
			playIndex() {
				this.getVideoData(this.$fullUrl(this.musicList[this.playIndex].audio_frequency))
			},
		},
		methods: {
			getAudioInfo() {
				this.getAudioInfoTimer = setInterval(() => {
					if (this.audio.duration) {
						this.totalDuration = this.audio.duration
						console.log("总时长" + this.totalDuration)
						clearInterval(this.getAudioInfoTimer)
					}
				}, 200)
				this.playVolume = this.audio.volume * 100
				if (this.playState) {
					this.playMusic()
				}
			},
			playMusic() {
				this.audio.play()
				this.playState = true
			},
			pauseMusic() {
				this.audio.pause()
				this.playState = false
			},
			setVolume(e) {
				this.audio.volume = e / 100
			},
			changeMusic(operate) {
				switch (this.playMode) {
					case 'cycle': {
						operate === 'prev' ? this.playIndex-- : this.playIndex++
						if (this.playIndex > this.musicList.length - 1) {
							this.playIndex = 0
						}
						if (this.playIndex < 0) {
							this.playIndex = this.musicList.length - 1
						}
						break
					}
					case 'singleCycle': {
						this.audio.seek(0)
						this.playMusic()
						break
					}
					case 'random': {
						if (this.noPlayAudioIndexList.length < 1) {
							this.initRandomNoPlayIndexList()
						}
						this.playIndex = this.noPlayAudioIndexList[0]
						this.noPlayAudioIndexList.splice(0, 1)
						break
					}
				}
			},
			changePlayMode(mode) {
				this.playMode = mode
				if (mode === 'random') {
					this.initRandomNoPlayIndexList()
				}
			},
			transformSecondsToMinute(value) {
				const minute = Math.floor(value / 60);
				const rest_seconds = Math.floor(value % 60);
				return `${minute<10?'0'+minute:minute}:${rest_seconds<10?'0'+rest_seconds:rest_seconds}`
			},
			initRandomNoPlayIndexList() {
				this.noPlayAudioIndexList = []
				for (let i = 0; i < this.musicList.length; i++) {
					if (i !== this.playIndex) {
						this.noPlayAudioIndexList.push(i)
					}
				}
				for (let i = this.noPlayAudioIndexList.length - 1; i > 0; i--) {
					let randomPos = Math.floor(Math.random() * (i + 1));
					[this.noPlayAudioIndexList[i], this.noPlayAudioIndexList[randomPos]] = [this.noPlayAudioIndexList[
						randomPos], this.noPlayAudioIndexList[i]];

				}
			},
			async getVideoData(val) {
				// #ifdef H5
				await uni.request({
					method: 'get',
					responseType: 'arrayBuffer',
					url: val
				}).then((res) => {
					this.audio.src = URL.createObjectURL(new Blob([res[1].data]))
				})
				// #endif

				// #ifdef MP-WEIXIN ||　APP-VUE
				uni.downloadFile({
					url: val,
					success: (res) => {
						if (res.statusCode === 200) {
							this.audio.src = res.tempFilePath
						}
					}
				});
				// #endif
			},
			seek(e) {
				clearInterval(this.getPlayProgressTimer)
				this.audio.seek(this.totalDuration * (e.detail.value / 100))
			},
			sliderChanging() {
				clearInterval(this.getPlayProgressTimer)
			},
			getPlayProgress() {
				this.getPlayProgressTimer = setInterval(() => {
					this.currentTime = this.audio.currentTime
					this.playProgress = (this.audio.currentTime / this.totalDuration) * 100
				}, 1000)
			},
		},
		computed: {
			calcTotalDuration() {
				return this.transformSecondsToMinute(this.totalDuration)
			},
			calcPlayDuration() {
				return this.transformSecondsToMinute(this.currentTime)
			}
		},
		beforeDestroy() {
			this.audio.destroy()
		}
	}
</script>

<style scoped>
	.music_player {
		width: 100%;
		height: 5.5rem;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		box-shadow: #eeeeee 0 0 10px;
		padding: 0.5rem 1rem;
		box-sizing: border-box;
	}

	.play_progress_time {
		font-size: 0.7rem;
	}

	.play_progress_slider_box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.play_progress_slider_box image {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
	}

	.play_progress_slide {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 0 1rem;
	}

	.play_progress_slide slider {
		margin: 0;
	}

	.music_name {
		font-size: 0.7rem;
	}

	.play_mode {
		width: 5rem;
	}

	.play_mode view {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.play_mode text {
		font-size: 0.6rem;
	}

	.play_mode .cycle,
	.play_mode .singleCycle,
	.play_mode .random {
		width: 1.5rem;
		height: 1.5rem;
		background-size: 100% 100%;
	}

	.play_mode .cycle {
		background-image: url("@/static/cycle.png");
	}

	.play_mode .singleCycle {
		background-image: url("@/static/singleCycle.png");
	}

	.play_mode .random {
		background-image: url("@/static/random.png");
	}

	.play_control {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.prev,
	.next {
		width: 2rem;
		height: 2rem;
		background-size: 100% 100%;
	}

	.play,
	.pause {
		width: 3rem;
		height: 3rem;
		background-size: 100% 100%;
		margin: 0 0.5rem;
	}

	.prev {
		background-image: url('@/static/play-previous.png');
	}

	.play {
		background-image: url('@/static/play.png');
	}

	.pause {
		background-image: url('@/static/pause.png');
	}

	.next {
		background-image: url('@/static/play-next.png');
	}
</style>