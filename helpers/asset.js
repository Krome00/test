import _ from 'lodash';
import config from '../config';

const AssetHelper = {
	getActionUrl() {
		return `${config.api}/asset/id`;
	},

	getDownloadUrl(id) {
		const token = localStorage.getItem('crf_admin')
			? JSON.parse(localStorage.getItem('crf_admin')).token
			: '';

		return `${config.api}/asset/id?id=${id}&t=${token}`;
	},

	getHeader() {
		const token = localStorage.getItem('crf_admin')
			? JSON.parse(localStorage.getItem('crf_admin')).token
			: '';

		const header = [
			{ 'Authorization': `Bearer ${token}` }
		];

		return { 'Authorization': `Bearer ${token}` };
	},

	getMaxSize() {
		return 5242880;
	},

	getMaxSizeMsg() {
		return 'excceed max limitation of 5MB!';
	}
};

export default AssetHelper;
