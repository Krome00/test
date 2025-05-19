import request from './request';

export default {
	async getAllAdminRoleLists(){
		const res = await request.get('/admin/admin-roles');
		return res;
	},
	async getAllAdminRolesByAdminId(query){
		const res = await request.get('/admin/admin-roles', query);
		return res;
	},
	async getAdminRoleById(id){
		const res = await request.get('/admin/admin-roles/id', { id });
		return res;
	},
	async createAdminRole(body){
		const res = await request.post('/admin/admin-roles', body);
		return res;
	},
	async updateAdminRoleById(id, body){
		const res = await request.patch(`/admin/admin-roles/id?id=${id}`, body);
		return res;
	},
	async getAdminRolesByLocationId(query) {
		const res = await request.get('/admin/admin-roles/id/location', query);
		return res;
	},
	async suspendAdminRoleById(id, body){
		const res = await request.post(`/admin/admin-roles/id/suspend?id=${id}`);
		return res;
	},
	async reactivateAdminRoleById(id, body){
		const res = await request.post(`/admin/admin-roles/id/reactivate?id=${id}`);
		return res;
	},
	async createLocationAdmin(body) {
		const res = await request.post('/admin/admin-roles/location', body);
		return res;
	},
	async updateLocationAdminById(id, body) {
		const res = await request.patch(`/admin/admin-roles/location/id?id=${id}`, body);
		return res;
	}
};