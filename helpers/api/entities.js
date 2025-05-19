import request from './request';

export default {
	async getAllEntities(query){
		const res = await request.get('/admin/entities', query);
		return res;
	},
	async getEntityById(id){
		const res = await request.get('/admin/entities/id', { id });
		return res;
	},
	async createEntity(body){
		const res = await request.post('/admin/entities', body);
		return res;
	},
	async updateEntityById(id, body){
		const res = await request.patch(`/admin/entities/id?id=${id}`, body);
		return res;
	},
	async deleteEntity(query){
		const res = await request.delete('/admin/entities/id', query);
		return res;
	},
	async suspendEntity(id) {
		const res = await request.post(`/admin/entities/suspend/id?id=${id}`);
		return res;
	},
	async unsuspendEntity(id) {
		const res = await request.post(`/admin/entities/unsuspend/id?id=${id}`);
		return res;
	}
};