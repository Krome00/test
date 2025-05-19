import request from './request';

export default {
	async getControllerById(query) {
		const res = await request.get('/admin/security-features/controller/id', query);
		return res;
	},
	async getSecurityFeatures(query){
		const res = await request.get('/admin/security-features', query);
		return res;
	},
	async getSecurityFeatureById(id){
		const res = await request.get('/admin/security-features/id', { id });
		return res;
	},
	async createSecurityFeature(body){
		const res = await request.post('/admin/security-features', body);
		return res;
	},
	async updateSecurityFeatureById(id, body){
		const res = await request.patch(`/admin/security-features/id?id=${id}`, body);
		return res;
	},
	async getCustomAuthByControllerId(id){
		const res = await request.get('/admin/security-features/custom-auths/id', { id });
		return res;
	},
	// Deleting Security Feature
	async deleteSecurityFeatureById(query){
		const res = await request.delete('/admin/security-features/id', query);
		return res;
	}
};