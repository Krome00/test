import request from './request';

export default {
	async getAllLocations(query){
		const res = await request.get('/admin/locations', query);
		return res;
	},
	async getLocationById(id){
		const res = await request.get('/admin/locations/id', { id });
		return res;
	},
	async createLocation(body){
		const res = await request.post('/admin/locations', body);
		return res;
	},
	async updateLocationById(id, body){
		const res = await request.patch(`/admin/locations/id?id=${id}`, body);
		return res;
	},
	async deleteLocationById(id){
		const res = await request.delete('/admin/locations/id', { id });
		return res;
	},
	async suspendLocationById(id) {
		const res = await request.post(`/admin/locations/suspend/id?id=${id}`);
		return res;
	},
	async unsuspendLocationById(id) {
		const res = await request.post(`/admin/locations/unsuspend/id?id=${id}`);
		return res;
	},
	async getLocationsByDepartmentId() {
		const res = await request.get('/admin/locations/department');
		return res;
	}
};