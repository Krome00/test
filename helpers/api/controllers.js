import request from './request';

export default {
	async getControllers(query) {
		const res = await request.get('/admin/controllers', query);
		return res;
	},
	async getControllerById(query) {
		const res = await request.get('/admin/controllers/id', query);
		return res;
	},
	async createController(body) {
		const res = await request.post('/admin/controllers', body);
		return res;
	},
	async updateControllerById(id, body) {
		const res = await request.patch(`/admin/controllers/id?id=${id}`, body);
		return res;
	},
	async deleteControllerById(query) {
		const res = await request.delete('/admin/controllers/id', query);
		return res;
	},
	async updateControllerConfigurationById(id, body) {
		const res = await request.patch(`/admin/controllers/configuration/id?id=${id}`, body);
		return res;
	},
	async suspendControllerById(id, body = {}) {
		const res = await request.post(`/admin/controllers/suspend/id?id=${id}`, body);
		return res;
	},
	async unsuspendControllerById(id) {
		const res = await request.post(`/admin/controllers/unsuspend/id?id=${id}`);
		return res;
	}
};
