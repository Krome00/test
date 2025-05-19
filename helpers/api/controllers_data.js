import request from './request';

export default {
	async getAllControllers(){
		const res = await request.get('/admin/controllers-data/controllers');
		return res;
	},
	async getAllStatus(){
		const res = await request.get('/admin/controllers-data/status');
		return res;
	},
	async getAllCallRequests(){
		const res = await request.get('/admin/controllers-data/calls');
		return res;
	}
};