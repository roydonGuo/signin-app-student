import request from '@/utils/request'

// 待签到列表
export function waitSignin(classId) {
	return request({
		url: '/app/signinTask/waitSignin',
		method: 'get'
	})
}

// 新增
export function addSigninTask(data) {
	return request({
		'url': '/app/signinTask/monitorAdd',
		'method': 'post',
		'data': data
	})
}
// 分页
export function signinTaskPage(data) {
	return request({
		'url': '/app/signinTask/page2',
		'method': 'post',
		'data': data
	})
}
// 签到列表
export function signinTaskRecordList(taskId) {
	return request({
		'url': '/app/signinTask/record/' + taskId,
		'method': 'get'
	})
}