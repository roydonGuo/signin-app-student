import request from '@/utils/request'

// 搜索班级
export function searchClassPage(data) {
	return request({
		url: '/app/lessonClass/searchByCode',
		method: 'post',
		data: data
	})
}