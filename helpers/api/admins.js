import request from './request';

export default {
	async getAllAdmins(query){
		const res = await request.get('/admin/admins', query);
		return res;
	},
	async getAdminById(id){
		const res = await request.get('/admin/admins/id', { id });
		console.log('GET ADMIN BY ID', res);
		return res;
	},
	async createAdmin(body){
		const res = await request.post('/admin/admins', body);
		return res;
	},
	async updateAdminById(id, body){
		const res = await request.patch(`/admin/admins/id?id=${id}`, body);
		return res;
	},
	async deleteAdminById(id){
		const res = await request.delete('/admin/admins/id', { id });
		return res;
	},
	async updateAdminPasswordById(id, body){
		const res = await request.post(`/admin/admins/id/update-password?id=${id}`, body);
		return res;
	},
	async suspendAdminById(id, body){
		const res = await request.post(`/admin/admins/id/suspend?id=${id}`, body);
		return res;
	},
	async unsuspendAdminById(id, body){
		const res = await request.post(`/admin/admins/id/unsuspend?id=${id}`, body);
		return res;
	}
};