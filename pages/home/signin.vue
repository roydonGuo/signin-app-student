<template>
	<view>
		<!-- 2.0.19支持autoBack，默认为false -->
		<u-navbar fixed :placeholder="true" title="签到" @leftClick="leftClick" :autoBack="true">
		</u-navbar>
		<!-- 展示内容 -->
		<view>
			<view class="body">
				<u--form labelPosition="left" :model="signinDTO" ref="form1">
					<u-form-item label="姓名:" prop="realName" borderBottom labelWidth="80" ref="item1">
						<u--input v-model="signinDTO.realName" placeholder="请输入姓名"></u--input>
					</u-form-item>
					<u-form-item label="学号:" prop="studentNumber" borderBottom labelWidth="80" ref="item1">
						<u--input v-model="signinDTO.studentNumber" placeholder="请输入学号"></u--input>
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

	export default {
		data() {
			return {
				taskId: null,
				signinDTO: {
					taskId: null,
					realName: null,
					studentNumber: null,
					address: null,
					addressDetail: null
				}
			}
		},
		onLoad(option) {
			this.taskId = option.taskId
			this.signinDTO.taskId = option.taskId
		},
		created() {},
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
						signinDTO2.taskId = item.taskId
						signinDTO2.address = res.name
						signinDTO2.addressDetail = res.address
					}
				});
			},
			confirmSignin() {
				this.signinDTO.address = res.name
				this.signinDTO.addressDetail = res.address
				// 选择定位
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
			}
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