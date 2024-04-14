<template>
	<view>
		<!-- 2.0.19支持autoBack，默认为false -->
		<u-navbar fixed :placeholder="true" title="" @leftClick="leftClick" @rightClick="rightClick" :autoBack="true">
			<view slot=center>
				<u-search placeholder="请输入班级标识码" :showAction="false" v-model="searchPageDTO.uniqueCode"></u-search>
			</view>
			<view slot=right>
				<u-icon name="search" color="#2979ff" size="28"></u-icon>
			</view>
		</u-navbar>
		<!-- 展示内容 -->
		<view>
			<view class="lesson-class-list">
				<view v-for="item in lessonClassList" class="less-class">
					<view>
						<view><text>课程名：{{item.lessonName}}</text></view>
						<view><text>教师：{{item.teacherName}}</text></view>
					</view>
					<view class="body">
						<view class="unique-code ">
							<text>唯一标识：</text>
							<text class="code">{{item.uniqueCode}}</text>
						</view>
						<view class="info">
							<view>
								<text>班级名称：<text class="fs1 fw600">{{item.className}}</text></text>
							</view>
							<view>
								<text>班级人数：{{32}}</text>
							</view>
							<view>
								<text>创建时间：{{item.createTime}}</text>
							</view>
						</view>
					</view>
					<view class="footer">
						<u-button type="primary" shape="circle" text="加入班级" @click="handleEnterClass(item)"></u-button>
						<u-modal :show="showModal" :title="title" :content='content' :showCancelButton="true"
							@cancel="cancelModal" @close="closeModal" @confirm="confirmModal"
							:closeOnClickOverlay="true"></u-modal>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		searchClassPage
	} from "@/api/app/lessonClass.js"
	import {
		enterClass
	} from "@/api/app/lessonClassStudent.js"

	export default {
		data() {
			return {
				status: 'more',
				keyword: "",
				searchPageDTO: {
					uniqueCode: "",
					pageNum: 1,
					pageSize: 10
				},
				lessonClassList: [],
				lessonClassTotal: 0,

				title: "加入班级",
				content: null,
				showModal: false,
				enterClassId: null,
			}
		},
		created() {

		},
		methods: {
			leftClick() {
				console.log('leftClick');
			},
			rightClick() {
				console.log('rightClick');
				searchClassPage(this.searchPageDTO).then(res => {
					if (res.code === 200) {
						this.lessonClassList = res.rows
						this.lessonClassTotal = res.total
					}
				})
			},
			// 加入班级
			handleEnterClass(item) {
				this.content = "是否加入 " + item.className
				this.enterClassId = item.classId
				this.showModal = true
			},
			closeModal() {
				this.showModal = false
			},
			cancelModal() {
				this.showModal = false
			},
			confirmModal() {
				enterClass(this.enterClassId).then(res => {
					if (res.code === 200) {
						this.$refs.uToast.show({
							type: "success",
							message: "加入成功"
						});
					}
				})
				this.showModal = false
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

	.lesson-class-list {
		padding: 1rem;

		.less-class {
			display: flex;
			flex-direction: column;
			padding: 1rem;
			border-radius: 0.5rem;
			background-color: white;
			margin-bottom: 1rem;

			.body {
				display: flex;
				align-items: center;

				.unique-code {
					display: flex;
					padding: .5rem;
					flex-direction: column;

					.code {
						border-radius: 0.5rem;
						text-align: center;
						color: white;
						padding: .5rem;
						background-color: gray;
					}
				}
			}


		}
	}
</style>