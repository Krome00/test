import request from './request';

export default {
	async getUsers(query) {
		const res = await request.get('/admin/users', query);
		return res;
	},
	async getUserById(id) {
		const res = await request.get('/admin/users/id', id);
		return res;
	},
	async createUser(body) {
		const res = await request.post('/admin/users', body);
		return res;
	},
	async updateUserById(id, body) {
		const res = await request.patch(`/admin/users/id?id=${id}`, body);
		return res;
	},
	async deleteUserById(id) {
		const res = await request.delete('/admin/users/id', id);
		return res;
	},
	async temporarilySuspendUserById(id, body) {
		const res = await request.post(`/admin/users/id/suspend/temporary?id=${id}`, body);
		return res;
	},
	async unsuspendSuspensionByUserId(id) {
		const res = await request.post(`/admin/users/id/unsuspend?id=${id}`);
		return res;
	},
	async permanentlySuspendUserById(id, body) {
		const res = await request.post(`/admin/users/id/suspend/permanent?id=${id}`, body);
		return res;
	}
};
