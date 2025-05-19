import request from './request';

export default {
	async getSystemMessages(query){
		const res = await request.get('/admin/system-messages', query);
		return res;
	},
	async getSystemMessageById(query){
		const res = await request.get('/admin/system-messages/id', query);
		return res;
	},
	async createSystemMessage(body){
		const res = await request.post('/admin/system-messages', body);
		return res;
	},
	async updateSystemMessageById(id, body){
		const res = await request.patch(`/admin/system-messages/id?id=${id}`, body);
		return res;
	}
};