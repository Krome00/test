import request from './request';

export default {
	async login(email, password) {
		const response = await request.post('/admin/auth/login', {
			email,
			password
		});

		return response;
	},
	async getCasUrl(query) {
		const res = await request.get('/admin/auth/cas/url', query);
		return res;
	},
	async casAuth(body) {
		const res = await request.post('/admin/auth/cas/auth', body);
		return res;
	},
	async logout() {
		const res = await request.post('/admin/auth/logout');
		return res;
	},
	async getAdminRolesByAdminId(query) {
		const res = await request.get('/admin/auth/admin-id', query);
		return res;
	}
};
