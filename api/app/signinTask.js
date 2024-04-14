import request from '@/utils/request'

// 待签到列表
export function waitSignin(classId) {
	return request({
		url: '/app/signinTask/waitSignin',
		method: 'get'
	})
}