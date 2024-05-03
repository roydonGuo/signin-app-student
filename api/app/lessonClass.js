import request from '@/utils/request'

// 搜索班级
export function searchClassPage(data) {
	return request({
		url: '/app/lessonClass/searchByCode',
		method: 'post',
		data: data
	})
}
// 班长管理的班级列表
export function monitorClassList() {
	return request({
		url: '/app/lessonClass/monitorClassList',
		method: 'get'
	})
}

// 班级学生列表
export function classStudentList(classId) {
	return request({
		'url': '/app/lessonClassStudent/studentList/' + classId,
		'method': 'get'
	})
}