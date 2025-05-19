import request from './request';

export default {
	async getDepartments(query) {
		const res = await request.get('/admin/departments', query);
		return res;
	},
	async getDepartmentById(query) {
		const res = await request.get('/admin/departments/id', query);
		return res;
	}
};
