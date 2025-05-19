import request from './request';

export default {
	async updateControllerConfigurationById(id, body) {
		const res = await request.patch(`/admin/controllers/configuration/id?id=${id}`, body);
		return res;
	}
};
