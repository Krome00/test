import _ from 'lodash';
import moment from 'moment';
import { push } from 'connected-react-router';
import API from '../helpers/api';

export function authorizeWithTicket({ query }) {
	return async dispatch => {
		if (!query || !query.ticket) {
			dispatch(push(`/login?path=${_.get(query, 'path') || ''}`));
			return;
		}
		const res = await API.auth.casAuth({ ticket: query.ticket, path: query.path });

		if (res.meta.code !== 200) {
			dispatch(push('/unauthorized'));
			return;
		}

		// Get admin roles
		const getAdminRolesRes = await API.auth.getAdminRolesByAdminId({ id: res.data.admin._id });
		const allowLogin = getAdminRolesRes.data.departments.some(department => {
			const { status: department_status, admin_role_status, start_date, end_date } = department;
			const isBetween = moment().isBetween(moment(start_date), moment(end_date));
			return admin_role_status === 'enabled' && department_status === 'enabled' && isBetween;
		});

		if (!allowLogin) {
			dispatch(push('/unauthorized'));
			return;
		}

		// store response
		localStorage.setItem('smartdoor_admin', JSON.stringify({
			token: res.data.auth.token,
			admin: res.data.admin,
			last_login: moment()
		}));
		localStorage.setItem('smartdoor_admin_departments', JSON.stringify(getAdminRolesRes.data.departments));

		// Navigate to specified page
		if (query.path && query.path !== '/' && query.path !== '') {
			dispatch(push(query.path));
			return;
		}

		// Navigate to next page
		dispatch(push('/dashboard'));
	};
}