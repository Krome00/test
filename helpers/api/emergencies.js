import request from './request';

export default {
	async getEmergencyList(query){
		const res = await request.get('/admin/suspensions', query);
		return res;
	},
	async getEmergencyById(id){
		const res = await request.get('/admin/suspensions/id', { id });
		return res;
	},
	async createEmergency(body){
		const res = await request.post('/admin/suspensions', body);
		return res;
	},
	async updateEmergencyById(id, body){
		const res = await request.patch(`/admin/suspensions/id?id=${id}`, body);
		return res;
	},
	async deleteEmergencyById(query){
		const res = await request.delete('/admin/suspensions/id', query);
		return res;
	},
	async suspendEmergencyById(id) {
		const res = await request.post(`/admin/suspensions/suspend/id?id=${id}`);
		return res;
	},
	async unsuspendEmergencyById(id) {
		const res = await request.post(`/admin/suspensions/unsuspend/id?id=${id}`);
		return res;
	}
};