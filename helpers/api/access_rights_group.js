import request from './request';

export default {
	async getAccessRightsGroups(query){
		const res = await request.get('/admin/access-rights-groups', query);
		return res;
	},
	async createAccessRightsGroup(body){
		const res = await request.post('/admin/access-rights-groups', body);
		return res;
	},
	async updateAccessRightsGroupById(id, body){
		const res = await request.patch(`/admin/access-rights-groups/id?id=${id}`, body);
		return res;
	},
	async deleteAccessRightsGroupById(query){
		const res = await request.delete('/admin/access-rights-groups/id', query);
		return res;
	},
	async suspendAccessRightsGroupById(id){
		const res = await request.post(`/admin/access-rights-groups/id/suspend?id=${id}`);
		return res;
	},
	async reactivateAccessRightsGroupById(id){
		const res = await request.post(`/admin/access-rights-groups/id/reactivate?id=${id}`);
		return res;
	}
};