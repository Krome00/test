import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getAccessRightsOneOffsByLocationId(query){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_one_offs.getAccessRightsOneOffsByLocationId(query);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { access_rights_one_offs, limit, page, total } = response.data;

		dispatch({
			type: ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_LIST_SUCCESS,
			payload: {
				access_rights_one_offs,
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
			type: ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_ONE_OFF_REQUEST,
			payload: { loadingUsers: true }
		});

		const response = await API.users.getUsers();

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_ONE_OFF_ERROR,
				payload: {
					meta: response.meta,
					loadingUsers: false
				}
			});
		}

		const { users } = response.data;

		dispatch({
			type: ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_ONE_OFF_SUCCESS,
			payload: {
				users,
				loadingUsers: false
			}
		});
	};
}

export function getAccessRightsOneOffById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_one_offs.getAccessRightsOneOffById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { access_rights_one_off } = response.data;

		dispatch({
			type: ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_BY_ID_SUCCESS,
			payload: {
				access_rights_one_off,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { total } = getState().locationDetailPage.accessRightsOneOffPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_ACCESS_RIGHTS_ONE_OFF_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			access_rights_one_off: {
				...fields
			}
		};

		let response;
		if(fields._id && fields.updated_at){
			response = await API.access_rights_one_offs.updateAccessRightsOneOffById(fields._id, body);
		} else {
			response = await API.access_rights_one_offs.createAccessRightsOneOff(body);
		}

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_ACCESS_RIGHTS_ONE_OFF_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		const { access_rights_one_off: newData } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_ACCESS_RIGHTS_ONE_OFF_SUCCESS,
			payload: {
				meta: response.meta,
				access_rights_one_off: newData,
				total: (fields._id && fields.updated_at) ? total : total+1,
				loadingSubmit: false
			}
		});

		dispatch(push(`/locations/id/access-rights-one-offs?id=${newData.location_id}`));

	};
}

export function deleteAccessRightsOneOffById(id, location_id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_ACCESS_RIGHTS_ONE_OFF_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_one_offs.deleteAccessRightsOneOffById({ id });
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DELETE_ACCESS_RIGHTS_ONE_OFF_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}
		dispatch({
			type: ActionTypes.DELETE_ACCESS_RIGHTS_ONE_OFF_BY_ID_SUCCESS,
			payload: {
				meta: response.meta,
				loading: false
			}
		});
	};
}

export function suspendAccessRightsByOneOffById(id){
	return async (dispatch, getState) => {
		const { access_rights_one_offs } = getState().locationDetailPage.accessRightsOneOffPageReducer;
		dispatch({
			type: ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_one_offs.suspendAccessRightsOneOffById(id);
		let new_access_rights = [...access_rights_one_offs];

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		let currIndex;
		// Getting index 
		access_rights_one_offs.map((access_right, index) => {
			if(access_right._id === id){
				currIndex = index;
				return access_right;
			}
		});

		const { access_rights_one_off } = response.data;
		new_access_rights[currIndex] = access_rights_one_off;

		dispatch({
			type: ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_SUCCESS,
			payload: {
				loading: false,
				access_rights_one_offs: new_access_rights,
				meta: response.meta
			}
		});

	};
}

export function reactivateAccessRightsByOneOffById(id){
	return async (dispatch, getState) => {
		const { access_rights_one_offs } = getState().locationDetailPage.accessRightsOneOffPageReducer;
		dispatch({
			type: ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_one_offs.reactivateAccessRightsOneOffById(id);
		let new_access_rights = [...access_rights_one_offs];

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		let currIndex;
		// Getting index 
		access_rights_one_offs.map((access_right, index) => {
			if(access_right._id === id){
				currIndex = index;
				return access_right;
			}
		});

		const { access_rights_one_off } = response.data;
		new_access_rights[currIndex] = access_rights_one_off;

		dispatch({
			type: ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_SUCCESS,
			payload: {
				loading: false,
				access_rights_one_offs: new_access_rights,
				meta: response.meta
			}
		});
	};
}

export function navigateToAccessRightsOneOffListPage() {
	return async dispatch => {
		dispatch(push('/access-rights-one-offs'));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ACCESS_RIGHTS_ONE_OFF_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ACCESS_RIGHTS_ONE_OFF_PAGE
		});
	};
}

export function navigateAccessRightsOneOffDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/access-rights-one-offs/id/basic?id=${id}`));
	};
}