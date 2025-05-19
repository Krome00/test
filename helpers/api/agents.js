import request from './request';

export default {
	async getAgents(query){
		const res = await request.get('/admin/agents', query);
		return res;
	},
	async getAgentById(id) {
		const res = await request.get(`/admin/agents/id?id=${id}`);
		return res;
	},
	async createAgent(body){
		const res = await request.post('/admin/agents', body);
		return res;
	},
	async updateAgentById(id, body){
		const res = await request.patch(`/admin/agents/id?id=${id}`, body);
		return res;
	},
	async updateAgentPasswordById(id, body){
		const res = await request.post(`/admin/agents/id/update-password?id=${id}`, body);
		return res;
	},
	async suspendAgentById(id, body){
		const res = await request.post(`/admin/agents/id/suspend?id=${id}`, body);
		return res;
	},
	async unsuspendAgentById(id, body){
		const res = await request.post(`/admin/agents/id/unsuspend?id=${id}`, body);
		return res;
	}
};