<template>
	<view>
		<!-- 2.0.19支持autoBack，默认为false -->
		<u-navbar fixed :placeholder="true" title="拍照签到" @leftClick="leftClick" :autoBack="true">
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
					<u-form-item label="照片:" prop="pictureUrl" borderBottom labelWidth="80" ref="item3">
						<!-- <u--input v-model="signinDTO.pictureUrl" placeholder="请输入学号"></u--input> -->
						<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
							:maxCount="1"></u-upload>
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
		studentSignin,
		uploadSigninPicture
	} from "@/api/app/signinRecord.js"
	import config from '@/config'

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
				fileList1: [],
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
			// 提交签到
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
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					let data = {
						name: 'file',
						filePath: lists[i].url
					}
					uploadSigninPicture(data).then(res => {
						if (res.code === 200) {
							this.signinDTO.pictureUrl = res.url
						}
					})
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: this.signinDTO.pictureUrl
					}))
					fileListLen++
				}
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