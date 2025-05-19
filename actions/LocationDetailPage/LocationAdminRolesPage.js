import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getAdminRolesByLocationId(query) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ADMIN_ROLES_BY_LOCATION_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.admin_roles.getAdminRolesByLocationId(query);
		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ADMIN_ROLES_BY_LOCATION_ERROR,
				payload: {
					loading: false
				}
			});
		}

		const { admin_roles } = response.data;

		dispatch({
			type: ActionTypes.GET_ADMIN_ROLES_BY_LOCATION_SUCCESS,
			payload: {
				loading: false,
				admin_roles
			}
		});
	};
};

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { admin_roles } = getState().locationDetailPage.locationAdminRolesPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_ROLES_BY_LOCATION_REQUEST,
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
		let new_admin_roles = [...admin_roles];

		if(fields.id) {
			let currIndex;
			admin_roles.map((admin_role, index) => {
				if(admin_role._id === fields.id){
					currIndex = index;
					return admin_role;
				}
			});

			response = await API.admin_roles.updateLocationAdminById(fields.id, body);

			if(response.meta.code !== 200) {
				return dispatch({
					type: ActionTypes.SUBMIT_ADMIN_ROLES_BY_LOCATION_ERROR,
					payload: {
						loadingSubmit: false,
						meta: response.meta
					}
				});
			}

			const { admin_role } = response.data;
			new_admin_roles[currIndex] = admin_role;
		} else {
			response = await API.admin_roles.createLocationAdmin(body);
			
			if(response.meta.code !== 200){
				return dispatch({
					type: ActionTypes.SUBMIT_ADMIN_ROLES_BY_LOCATION_ERROR,
					payload: {
						loadingSubmit: false,
						meta: response.meta
					}
				});
			};

			const { admin_role } = response.data;
			new_admin_roles.push(admin_role);
		}

		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_ROLES_BY_LOCATION_SUCCESS,
			payload: {
				loadingSubmit: false,
				admin_roles: new_admin_roles,
				meta: response.meta
			}
		});
	};
}

export function suspendAdminRoleById(id) {
	return async (dispatch, getState) => {
		const { admin_roles } = getState().locationDetailPage.locationAdminRolesPageReducer;
		dispatch({
			type: ActionTypes.SUSPEND_LOCATION_ADMIN_REQUEST,
			payload: {
				loading: false
			}
		});

		const response = await API.admin_roles.suspendAdminRoleById(id);
		let new_admin_roles = [...admin_roles];

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUSPEND_LOCATION_ADMIN_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		let currIndex;
		// Getting index 
		admin_roles.map((admin_role, index) => {
			if(admin_role._id === id){
				currIndex = index;
				return admin_role;
			}
		});

		const { admin_role } = response.data;
		new_admin_roles[currIndex] = admin_role;

		dispatch({
			type: ActionTypes.SUSPEND_LOCATION_ADMIN_SUCCESS,
			payload: {
				loading: false,
				admin_roles: new_admin_roles,
				meta: response.meta
			}
		});
	};
}

export function reactivateAdminRoleById(id) {
	return async (dispatch, getState) => {
		const { admin_roles } = getState().locationDetailPage.locationAdminRolesPageReducer;
		dispatch({
			type: ActionTypes.REACTIVATE_LOCATION_ADMIN_REQUEST,
			payload: {
				loading: false
			}
		});

		const response = await API.admin_roles.reactivateAdminRoleById(id);
		let new_admin_roles = [...admin_roles];

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.REACTIVATE_LOCATION_ADMIN_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		let currIndex;
		// Getting index 
		admin_roles.map((admin_role, index) => {
			if(admin_role._id === id){
				currIndex = index;
				return admin_role;
			}
		});

		const { admin_role } = response.data;
		new_admin_roles[currIndex] = admin_role;

		dispatch({
			type: ActionTypes.REACTIVATE_LOCATION_ADMIN_SUCCESS,
			payload: {
				loading: false,
				admin_roles: new_admin_roles,
				meta: response.meta
			}
		});
	};
}