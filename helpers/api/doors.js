import request from './request';

export default {
	async getDoors() {
		const res = await request.get('/admin/doors');
		return res;
	},
	async getDoorsByLocationId(query) {
		const res = await request.get('/admin/doors', query);
		return res;
	},
	async createDoor(body) {
		const res = await request.post('/admin/doors', body);
		return res;
	},
	async updateDoorById(id, body) {
		const res = await request.patch(`/admin/doors/id?id=${id}`, body);
		return res;
	},
	async deleteDoorById(query) {
		const res = await request.delete('/admin/doors/id', query);
		return res;
	},
	async getDoorsByDepartmentId() {
		const res = await request.get('/admin/doors/department');
		return res;
	}
};
