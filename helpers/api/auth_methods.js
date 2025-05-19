import request from './request';

export default {
	async getAllAuthMethodsByUserId(query){
		const res = await request.get('/admin/custom-authentication-method-to-user-maps', query);
		return res;
	},
	async createAuthMethod(body){
		const res = await request.post('/admin/custom-authentication-method-to-user-maps', body);
		return res;
	},
	async updateAuthMethod(id, body){
		const res = await request.patch(`/admin/custom-authentication-method-to-user-maps/id?id=${id}`, body);
		return res;
	},
	async suspendAuthMethod(id){
		const res = await request.post(`/admin/custom-authentication-method-to-user-maps/suspend?id=${id}`);
		return res;
	},
	async reactivateAuthMethod(id){
		const res = await request.post(`/admin/custom-authentication-method-to-user-maps/reactivate?id=${id}`);
		return res;
	},
	async getCustomAuthMethods(){
		const res = await request.get('/admin/custom-authentication-methods');
		return res;
	}
};