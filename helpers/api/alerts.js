import request from './request';

export default {
	async getAlertsByDepartmentId(query) {
		const res = await request.get('/admin/alerts/', query);
		return res;
	},
	async getAlertById(query) {
		const res = await request.get('/admin/alerts/id', query);
		return res;
	},
	async acknowledgeAlertById(id) {
		const res = await request.post(`/admin/alerts/id/acknowledge?id=${id}`);
		return res;
	}
};
