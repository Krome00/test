import moment from 'moment';
import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function showLoginForm({ path }) {
	return async dispatch => {
		if (['development', 'testing', 'testing2'].indexOf(process.env.NODE_ENV) !== -1) {
			dispatch({
				type: ActionTypes.LOGIN_PAGE_SHOW_LOGIN_FORM
			});
			return;
		}
		const res = await API.auth.getCasUrl({ path });
		if (res.meta.code !== 200) {
			return;
		}
		window.location.href = res.data.url;
	};
}

export function onFieldChange(fieldName, fieldValue) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UPDATE_LOGIN_PAGE_FORM_FIELD,
			payload: {
				fieldName,
				fieldValue
			}
		});
	};
}

export function login({ username, password, query }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.LOGIN_REQUEST
		});

		const res = await API.auth.login(username, password);
		if (res.meta.code !== 200) {
			dispatch({
				type: ActionTypes.LOGIN_ERROR,
				payload: {
					error: res.meta.message
				}
			});
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
			dispatch({
				type: ActionTypes.LOGIN_ERROR,
				payload: {
					error: 'No department(s) under your administration.'
				}
			});
			return;
		}

		dispatch({
			type: ActionTypes.LOGIN_SUCCESS
		});

		// store response
		localStorage.setItem('smartdoor_admin', JSON.stringify({
			token: res.data.auth.token,
			admin: res.data.admin,
			last_login: moment()
		}));
		localStorage.setItem('smartdoor_admin_departments', JSON.stringify(getAdminRolesRes.data.departments));

		if (query && query.path && query.path !== '/' && query.path !== '') {
			dispatch(push(query.path));
			return;
		}

		// Navigate to next page
		dispatch(push('/dashboard'));
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_LOGIN_PAGE
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_LOGIN_PAGE_META
		});
	};
}

export function resetLocalStorage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_LOCAL_STORAGE
		});
		localStorage.removeItem('smartdoor_admin');
		localStorage.removeItem('smartdoor_admin_departments');
		localStorage.removeItem('department');
	};
}