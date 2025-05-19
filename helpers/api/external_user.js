import request from './request';

export default {
	async getExternalUserById({ uuid }) {
		console.log('UUID to fetch in smartdoor-api ', uuid);
		const res = await request.get('/admin/external_qrusers/id', { uuid } );
		return res;
	}
};