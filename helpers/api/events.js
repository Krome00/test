import request from './request';

export default {
	async getEvents(query) {
		const res = await request.get('/admin/events', query);
		return res;
	}
};
