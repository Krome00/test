import request from './request';

export default {
	async getUserEntityMappingsByEntityId(query){
		const res = await request.get('/admin/user-entity-mappings', query);
		return res;
	},
	async createUserEntityMapping(body){
		const res = await request.post('/admin/user-entity-mappings', body);
		return res;
	},
	async deleteUserEntityMappingById(id){
		const res = await request.delete('/admin/user-entity-mappings/id', { id });
		return res;
	}
};