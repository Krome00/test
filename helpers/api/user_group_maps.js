import request from './request';

export default {
	async getUserGroupMapsByUserId(query) {
		const res = await request.get('/admin/user-group-maps', query);
		return res;
	},
	async createUserGroupMap(body){
		const res = await request.post('/admin/user-group-maps', body);
		return res;
	},
	async deleteUserGroupMapById(id){
		const res = await request.delete('/admin/user-group-maps', { id });
		return res;
	}
};