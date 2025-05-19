import request from './request';

export default {
	async download(query) {
		const queryStringArr = [];
		Object.keys(query).map(key => {
			queryStringArr.push(`${key}=${query[key]}`);
			return key;
		});
		console.log(`/admin/reports/type?${queryStringArr.join('&')}`);
		const res = await request.post(`/admin/reports/type?${queryStringArr.join('&')}`);
		return res;
	},
	async downloadControllerReports(){
		const res = await request.get('/admin/reports/controllers?type=controller_reports');
		return res;
	},
	async downloadEmergencyReports(){
		const res = await request.get('/admin/reports/emergency?type=emergency_reports');
		return res;
	},
	async downloadEventsReports(){
		const res = await request.get('/admin/reports/events?type=event_reports');
		return res;
	},
	async downloadLocationReports(){
		const res = await request.get('/admin/reports/locations?type=location_reports');
		return res;
	}
	// async downloadRoomPowerMeterReadings(body) {
	// 	const res = await request.post('/admin/reports/room', body);
	// 	return res;
	// },
	// async downloadRefunds(body) {
	// 	const res = await request.post('/admin/reports/refund', body);
	// 	return res;
	// },
	// async downloadMonthlyBills(body) {
	// 	const res = await request.post('/admin/reports/monthly-bill', body);
	// 	return res;
	// }
};
