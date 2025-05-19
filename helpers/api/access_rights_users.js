import request from './request';

export default {
	async getAccessRightsUsers() {
		const res = await request.get('/admin/access-rights-users');
		return res;
	},
	async getAccessRightsUsersByLocationId(query) {
		const res = await request.get('/admin/access-rights-users/', query);
		return res;
	},
	async getAccessRightsUsersByUserId(query) {
		const res = await request.get('/admin/access-rights-users/', query);
		return res;
	},
	async getAccessRightsUserById(query) {
		const res = await request.get('/admin/access-rights-users/id', query);
		return res;
	},
	async createAccessRightsUser(body) {
		const res = await request.post('/admin/access-rights-users', body);
		return res;
	},
	async updateAccessRightsUserById(id, body) {
		const res = await request.patch(`/admin/access-rights-users/id?id=${id}`, body);
		return res;
	},
	async deleteAccessRightsUserById(query) {
		const res = await request.delete('/admin/access-rights-users/id', query);
		return res;
	},
	async suspendAccessRightsUserById(id){
		const res = await request.post(`/admin/access-rights-users/id/suspend?id=${id}`);
		return res;
	},
	async reactivateAccessRightsUserById(id){
		const res = await request.post(`/admin/access-rights-users/id/reactivate?id=${id}`);
		return res;
	}
};
