import request from './request';

export default {
	async getUserPermissionHistories(query) {
		const res = await request.get('/admin/user-permission-histories', query);
		return res;
	},
	async getUserPermissionHistoryById(id) {
		const res = await request.get('/admin/user-permission-histories/id', id);
		return res;
	},
	async createUserPermissionHistory(body) {
		const res = await request.post('/admin/user-permission-histories', body);
		return res;
	},
	async updateUserPermissionHistoryById(id, body) {
		const res = await request.patch(`/admin/user-permission-histories/id?id=${id}`, body);
		return res;
	}
};

