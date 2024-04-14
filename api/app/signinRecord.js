import request from '@/utils/request'
import upload from '@/utils/upload'

// 签到
export function studentSignin(data) {
	return request({
		url: '/app/signinRecord',
		method: 'post',
		data: data
	})
}
// 上传图片
export function uploadSigninPicture(data) {
	return upload({
		url: '/app/signinRecord/uploadPicture',
		name: data.name,
		filePath: data.filePath
	})
}
