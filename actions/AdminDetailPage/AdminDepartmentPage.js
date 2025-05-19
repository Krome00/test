import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getAdminRolesByAdminId(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ADMIN_ROLES_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.admin_roles.getAllAdminRolesByAdminId({ admin_id: id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ADMIN_ROLES_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { admin_roles } = response.data;

		dispatch({
			type: ActionTypes.GET_ADMIN_ROLES_LIST_SUCCESS,
			payload: {
				admin_roles,
				loading: false
			}
		});
	};
}

export function getDepartments() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_DEPARTMENTS_FROM_ADMIN_ROLES_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.departments.getDepartments();


		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_DEPARTMENTS_FROM_ADMIN_ROLES_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { departments } = response.data;
		console.log('getDepartments', departments);

		dispatch({
			type: ActionTypes.GET_DEPARTMENTS_FROM_ADMIN_ROLES_SUCCESS,
			payload: {
				loading: false,
				departments
			}
		});
	};
}

export function getAdminRoleById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ADMIN_ROLES_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_users.getAccessRightsUserById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ADMIN_ROLES_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { admin_role } = response.data;

		dispatch({
			type: ActionTypes.GET_ADMIN_ROLES_BY_ID_SUCCESS,
			payload: {
				admin_role,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {

		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_ROLES_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});
		const body = {
			admin_role: {
				...fields
			}
		};

		let response;

		if(fields._id && fields.updated_at){
			response = await API.admin_roles.updateAdminRoleById(fields._id, body);
		} else {
			response = await API.admin_roles.createAdminRole(body);
		}

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_ADMIN_ROLES_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		const { admin_role: newData } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_ROLES_SUCCESS,
			payload: {
				meta: response.meta,
				admin_role: newData,
				loadingSubmit: false
			}
		});

		const { admin } = JSON.parse(localStorage.getItem('smartdoor_admin'));
		if (newData.admin_id === admin._id) {
			const admin_role_response = await API.auth.getAdminRolesByAdminId({ id: newData.admin_id });
			const { departments } = admin_role_response.data;
			localStorage.setItem('smartdoor_admin_departments', JSON.stringify(departments));
		}

		dispatch(push(`/admins/id/admin-roles?id=${newData.admin_id}`));

	};
}

export function suspendAdminRoleById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUSPEND_ADMIN_ROLES_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.admin_roles.suspendAdminRoleById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUSPEND_ADMIN_ROLES_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { admin_role } = response.data;
		dispatch({
			type: ActionTypes.SUSPEND_ADMIN_ROLES_BY_ID_SUCCESS,
			payload: {
				meta: response.meta,
				loading: false,
				admin_role
			}
		});

		const { admin } = JSON.parse(localStorage.getItem('smartdoor_admin'));
		if (admin_role.admin_id._id === admin._id) {
			const admin_role_response = await API.auth.getAdminRolesByAdminId({ id: admin_role.admin_id._id });
			const { departments } = admin_role_response.data;
			localStorage.setItem('smartdoor_admin_departments', JSON.stringify(departments));
		}

		dispatch(push(`/admins/id/admin-roles?id=${admin_role.admin_id._id}`));
	};
}

export function unsuspendAdminRoleById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UNSUSPEND_ADMIN_ROLES_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.admin_roles.reactivateAdminRoleById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.UNSUSPEND_ADMIN_ROLES_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { admin_role  } = response.data;
		dispatch({
			type: ActionTypes.UNSUSPEND_ADMIN_ROLES_BY_ID_SUCCESS,
			payload: {
				meta: response.meta,
				loading: false,
				admin_role
			}
		});

		const { admin } = JSON.parse(localStorage.getItem('smartdoor_admin'));
		if (admin_role.admin_id._id === admin._id) {
			const admin_role_response = await API.auth.getAdminRolesByAdminId({ id: admin_role.admin_id._id });
			const { departments } = admin_role_response.data;
			localStorage.setItem('smartdoor_admin_departments', JSON.stringify(departments));
		}

		dispatch(push(`/admins/id/admin-roles?id=${admin_role.admin_id._id}`));
	};
}

export function navigateToListPage() {
	return async dispatch => {
		dispatch(push('/admins'));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ADMIN_ROLES_DETAIL_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ADMIN_ROLES_DETAIL_PAGE
		});
	};
}

export function navigateAdminRolesDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/admins/id/admin-roles?id=${id}`));
	};
}