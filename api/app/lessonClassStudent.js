import request from '@/utils/request'

// 加入班级
export function enterClass(classId) {
	return request({
		url: '/app/lessonClassStudent/' + classId,
		method: 'get'
	})
}