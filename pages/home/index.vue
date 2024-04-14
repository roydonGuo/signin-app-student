<template>
	<view>
		<!-- 2.0.19支持autoBack，默认为false -->
		<u-navbar fixed :placeholder="true" title="" @leftClick="leftClick" @rightClick="rightClick" :autoBack="false">
			<view slot=left>
				<u-icon name="list" color="#2979ff" size="28"></u-icon>
			</view>
			<view slot=right>
				<u-icon name="search" color="#2979ff" size="28"></u-icon>
			</view>
		</u-navbar>
		<!-- 展示内容 -->
		<view>
			<view>
				<u-swiper :list="swiperData" indicator indicatorMode="line" circular></u-swiper>
			</view>
			<view class="body">
				<view>
					<uni-section title="待签到" type="line"></uni-section>
					<view class="waitSignin-list">
						<view class="waitSignin-item" v-for="(item, index) in waitSigninList" :key="index">
							<view class="title fw600">
								标题：{{item.title}}
							</view>
							<view>
								创建时间：{{item.createTime}}
								<!-- <u--text mode="date" :text="item.createTime"></u--text> -->
							</view>
							<view>
								签到时间：
								<u--text mode="time" type="primary" :text="item.beginTime"></u--text>
								~
								<u--text mode="time" type="primary" :text="item.endTime"></u--text>
							</view>
							<view>
								<u-button v-if="item.weatherSignin" type="info" shape="circle" text="已签到"></u-button>
								<u-button v-else type="primary" shape="circle" text="点击签到"
									@click="handleSignin(item)"></u-button>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	import {
		waitSignin
	} from "@/api/app/signinTask.js"
	import {
		studentSignin
	} from "@/api/app/signinRecord.js"
	// import uniLocation from '@/uni_modules/uni-location/uni-location.js';

	export default {
		data() {
			return {
				status: 'more',
				swiperData: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png'
				],
				waitSigninList: [],
				showEmpty: false,
				signinDTO: {
					taskId: null,
					address: null,
					addressDetail: null
				}
			}
		},
		created() {
			this.loadWaitSigninList()
		},
		methods: {
			leftClick() {
				console.log('leftClick');
			},
			rightClick() {
				console.log('rightClick');
				this.$tab.navigateTo(`/pages/search/index`)
			},
			onReachBottom() {
				this.status = 'loading'; //加载中状态
				// this.status = 'noMore'; //加载完状态
			},
			onPullDownRefresh() {
				console.log("下拉刷新")
				setTimeout(() => {
					//结束下拉刷新
					uni.stopPullDownRefresh();
				}, 1000);
			},
			loadWaitSigninList() {
				waitSignin().then(res => {
					if (res.code === 200) {
						if (res.data.length > 0) {
							this.waitSigninList = res.data
							this.showEmpty = false
						} else {
							this.showEmpty = true
						}
					}
				})
				// uni.getLocation({
				// 	type: 'wgs84',
				// 	success: function(res) {
				// 		console.log('当前位置的经度：' + res.longitude);
				// 		console.log('当前位置的纬度：' + res.latitude);
				// 	}
				// });


			},
			handleSignin(item) {
				// 查询签到类型 0点击签到1定位2拍照
				switch (item.signinType) {
					case "0":
						this.$tab.navigateTo(`/pages/home/signin?taskId=${item.taskId}`)
						break;
					case "1":
						this.$tab.navigateTo(`/pages/home/signinLocate?taskId=${item.taskId}`)
						break;
					case "2":
						this.$tab.navigateTo(`/pages/home/signinPicture?taskId=${item.taskId}`)
						break;
					default:
						break;
				}

				// this.signinDTO.taskId = item.taskId
				// // 选择定位
				// uni.chooseLocation({
				// 	success: function(res) {
				// 		console.log('位置名称：' + res.name);
				// 		console.log('详细地址：' + res.address);
				// 		console.log('纬度：' + res.latitude);
				// 		console.log('经度：' + res.longitude);
				// 		// this.signinDTO.address = res.name
				// 		// this.signinDTO.addressDetail = res.address
				// 		var signinDTO2 = {};
				// 		signinDTO2.taskId = item.taskId
				// 		signinDTO2.address = res.name
				// 		signinDTO2.addressDetail = res.address

				// 		console.log(signinDTO2)
				// 		studentSignin(signinDTO2).then(res => {
				// 			if (res.code === 200) {
				// 				this.$modal.msgSuccess("签到成功")
				// 			} else {
				// 				this.$modal.msgError(res.msg)
				// 			}
				// 		})
				// 	}
				// });

			},
			scrolltolower() {

			},
		},

	}
</script>

<style>
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #8f8f94;
	}

	.waitSignin-list {
		margin: 1rem .5rem;

		.waitSignin-item {
			box-shadow: 1px 1px 1px 0 gainsboro;
			margin: .5rem;
			background-color: #e4e4e4;
			border-radius: .5rem;
			padding: .5rem;

			.title {
				margin: .5rem 0;
			}
		}
	}
</style>