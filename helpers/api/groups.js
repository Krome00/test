import request from './request';

export default {
	async getGroups(query){
		const res = await request.get('/admin/groups', query);
		return res;
	},
	async getGroupById(query){
		const res = await request.get('/admin/groups/id', query);
		return res;
	},
	async getGroupMembersByGroupId(query){
		const res = await request.get('/admin/groups/group-members/id', query);
		return res;
	},
	async createGroup(body){
		const res = await request.post('/admin/groups', body);
		return res;
	},
	async updateGroupById(id, body){
		const res = await request.patch(`/admin/groups/id?id=${id}`, body);
		return res;
	},
	async suspendGroupById(id) {
		const res = await request.post(`/admin/groups/id/suspend?id=${id}`);
		return res;
	},
	async unsuspendGroupById(id) {
		const res = await request.post(`/admin/groups/id/reactivate?id=${id}`);
		return res;
	}
};