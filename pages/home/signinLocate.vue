<template>
	<view>
		<!-- 2.0.19支持autoBack，默认为false -->
		<u-navbar fixed :placeholder="true" title="定位签到" @leftClick="leftClick" :autoBack="true">
		</u-navbar>
		<!-- 展示内容 -->
		<view>
			<view class="body">
				<u--form labelPosition="left" :model="signinDTO" ref="form1">
					<u-form-item label="姓名:" prop="realName" borderBottom labelWidth="80" ref="item1">
						<u--input v-model="signinDTO.realName" placeholder="请输入姓名"></u--input>
					</u-form-item>
					<u-form-item label="学号:" prop="studentNumber" borderBottom labelWidth="80" ref="item2">
						<u--input v-model="signinDTO.studentNumber" placeholder="请输入学号"></u--input>
					</u-form-item>
					<u-form-item label="位置:" prop="address" borderBottom labelWidth="80" ref="item3"
						@click="chooseLocate">
						<text>{{signinDTO.addressDetail}}</text>
						<!-- <u--input v-model="signinDTO.pictureUrl" placeholder="请输入学号"></u--input> -->
					</u-form-item>
				</u--form>
				<u-button type="primary" text="提交签到" customStyle="margin-top: 50px" @click="submit"></u-button>
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
				taskId: null,
				signinDTO: {
					taskId: null,
					realName: null,
					studentNumber: null,
					pictureUrl: null,
					address: null,
					addressDetail: null
				},
			}
		},
		onLoad(option) {
			this.taskId = option.taskId
			this.signinDTO.taskId = option.taskId
		},
		created() {
			this.initLocation()
		},
		methods: {
			leftClick() {
				console.log('leftClick');
			},
			chooseLocate() {
				const signinDTO2 = {};
				// 选择定位
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						signinDTO2.address = res.name
						signinDTO2.addressDetail = res.address
					}
				});
				this.signinDTO.addres = signinDTO2.addres
				this.signinDTO.addressDetail = signinDTO2.addressDetail
			},
			initLocation: function() {
				var that = this.signinDTO
				uni.getLocation({
					type: 'gcj02',
					geocode: true, //设置该参数为true可直接获取经纬度及城市信息
					success: function(res) {
						console.log(res)
						that.address = res.address.streetNum
						that.addressDetail = res.address.province + res.address.city + res.address
							.district + res.address.street
					},
					fail: function() {
						uni.showToast({
							title: '获取地址失败，将导致部分功能不可用',
							icon: 'none'
						});
					}
				});
			},
			submit() {
				console.log(this.signinDTO)
				studentSignin(this.signinDTO).then(res => {
					if (res.code === 200) {
						this.$modal.msgSuccess("签到成功")
						uni.navigateBack();
					} else {
						this.$modal.msgError(res.msg)
					}
				})
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

	.body {
		padding: 1rem;
	}
</style>