import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getAccessRightsUsersByLocationId(query){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ACCESS_RIGHTS_USER_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_users.getAccessRightsUsersByLocationId(query);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ACCESS_RIGHTS_USER_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { access_rights_users, limit, page, total } = response.data;

		dispatch({
			type: ActionTypes.GET_ACCESS_RIGHTS_USER_LIST_SUCCESS,
			payload: {
				access_rights_users,
				loading: false,
				limit,
				page,
				total
			}
		});
	};
}

export function getUserList() {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_REQUEST,
			payload: { loadingUsers: true }
		});

		const response = await API.users.getUsers();

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_ERROR,
				payload: {
					meta: response.meta,
					loadingUsers: false
				}
			});
		}

		const { users } = response.data;

		dispatch({
			type: ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_SUCCESS,
			payload: {
				users,
				loadingUsers: false
			}
		});
	};
}

export function getAccessRightsUserById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ACCESS_RIGHTS_USER_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_users.getAccessRightsUserById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ACCESS_RIGHTS_USER_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { access_rights_user } = response.data;

		dispatch({
			type: ActionTypes.GET_ACCESS_RIGHTS_USER_BY_ID_SUCCESS,
			payload: {
				access_rights_user,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { total } = getState().locationDetailPage.accessRightsUserPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_ACCESS_RIGHTS_USER_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});
		
		const body = {
			access_rights_user: {
				...fields,
				location_id: fields.location_id._id || fields.location_id
			}
		};

		let response;
		if(fields._id && fields.updated_at){
			response = await API.access_rights_users.updateAccessRightsUserById(fields._id, body);
		} else {
			response = await API.access_rights_users.createAccessRightsUser(body);
		}

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_ACCESS_RIGHTS_USER_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		const { access_rights_user: newData } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_ACCESS_RIGHTS_USER_SUCCESS,
			payload: {
				meta: response.meta,
				access_rights_user: newData,
				total: (fields._id && fields.updated_at) ? total : total+1,
				loadingSubmit: false
			}
		});

		dispatch(push(`/locations/id/access-rights-users?id=${newData.location_id._id}`));

	};
}

export function deleteAccessRightsUserById(id, location_id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_ACCESS_RIGHTS_USER_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_users.deleteAccessRightsUserById({ id });
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DELETE_ACCESS_RIGHTS_USER_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}
		dispatch({
			type: ActionTypes.DELETE_ACCESS_RIGHTS_USER_BY_ID_SUCCESS,
			payload: {
				meta: response.meta,
				loading: false
			}
		});
	};
}

export function suspendAccessRightsByUserById(id){
	return async (dispatch, getState) => {
		const { access_rights_users } = getState().locationDetailPage.accessRightsUserPageReducer;
		dispatch({
			type: ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_USER_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_users.suspendAccessRightsUserById(id);
		let new_access_rights = [...access_rights_users];

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_USER_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		let currIndex;
		// Getting index 
		access_rights_users.map((access_right, index) => {
			if(access_right._id === id){
				currIndex = index;
				return access_right;
			}
		});

		const { access_rights_user } = response.data;
		new_access_rights[currIndex] = access_rights_user;

		dispatch({
			type: ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_USER_SUCCESS,
			payload: {
				loading: false,
				access_rights_users: new_access_rights,
				meta: response.meta
			}
		});

	};
}

export function reactivateAccessRightsByUserById(id){
	return async (dispatch, getState) => {
		const { access_rights_users } = getState().locationDetailPage.accessRightsUserPageReducer;
		dispatch({
			type: ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_USER_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_users.reactivateAccessRightsUserById(id);
		let new_access_rights = [...access_rights_users];

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_USER_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		let currIndex;
		// Getting index 
		access_rights_users.map((access_right, index) => {
			if(access_right._id === id){
				currIndex = index;
				return access_right;
			}
		});

		const { access_rights_user } = response.data;
		new_access_rights[currIndex] = access_rights_user;

		dispatch({
			type: ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_USER_SUCCESS,
			payload: {
				loading: false,
				access_rights_users: new_access_rights,
				meta: response.meta
			}
		});
	};
}

export function navigateToAccessRightsUserListPage() {
	return async dispatch => {
		dispatch(push('/access-rights-users'));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ACCESS_RIGHTS_USER_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ACCESS_RIGHTS_USER_PAGE
		});
	};
}

export function navigateAccessRightsUserDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/access-rights-users/id/basic?id=${id}`));
	};
}