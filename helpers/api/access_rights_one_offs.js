import request from './request';

export default {
	async getAccessRightsOneOffs() {
		const res = await request.get('/admin/access-rights-one-offs');
		return res;
	},
	async getAccessRightsOneOffsByLocationId(query) {
		const res = await request.get('/admin/access-rights-one-offs/', query);
		return res;
	},
	async getAccessRightsOneOffById(query) {
		const res = await request.get('/admin/access-rights-one-offs/id', query);
		return res;
	},
	async createAccessRightsOneOff(body) {
		const res = await request.post('/admin/access-rights-one-offs', body);
		return res;
	},
	async updateAccessRightsOneOffById(id, body) {
		const res = await request.patch(`/admin/access-rights-one-offs/id?id=${id}`, body);
		return res;
	},
	async deleteAccessRightsOneOffById(query) {
		const res = await request.delete('/admin/access-rights-one-offs/id', query);
		return res;
	},
	async suspendAccessRightsOneOffById(id){
		const res = await request.post(`/admin/access-rights-one-offs/id/suspend?id=${id}`);
		return res;
	},
	async reactivateAccessRightsOneOffById(id){
		const res = await request.post(`/admin/access-rights-one-offs/id/reactivate?id=${id}`);
		return res;
	}
};
