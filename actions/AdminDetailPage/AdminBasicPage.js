import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getAdminById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ADMIN_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.admins.getAdminById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_ADMIN_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { admin } = response.data;

		dispatch({
			type: ActionTypes.GET_ADMIN_BY_ID_SUCCESS,
			payload: {
				loading: false,
				admin
			}
		});
	};
}


export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { admin } = getState().adminDetailPage.adminBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			admin: {
				...fields
			}
		};

		let response;
		if(admin){
			body.admin.updated_at = admin.updated_at;
			response = await API.admins.updateAdminById(admin._id, body);
		} else {
			response = await API.admins.createAdmin(body);
		}

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUBMIT_ADMIN_ERROR,
				payload: {
					loadingSubmit: false,
					meta: response.meta
				}
			});
		}

		const { admin: newData } = response.data;
		
		dispatch({
			type: ActionTypes.SUBMIT_ADMIN_SUCCESS,
			payload: {
				admin: newData,
				loadingSubmit: false,
				meta: response.meta
			}
		});

		dispatch(push(`/admins/id/basic?id=${newData._id}`));

	};
}

export function updateAdminPasswordById(id, fields) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UPDATE_ADMIN_PASSWORD_REQUEST,
			payload: {
				loading: true
			}
		});

		const body = { admin: { ...fields } };

		const response = await API.admins.updateAdminPasswordById(id, body);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.UPDATE_ADMIN_PASSWORD_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		dispatch({
			type: ActionTypes.UPDATE_ADMIN_PASSWORD_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta
			}
		});
	}
}

export function suspendAdminById(id, fields) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUSPEND_ADMIN_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.admins.suspendAdminById(id, fields);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUSPEND_ADMIN_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { admin } = response.data;

		dispatch({
			type: ActionTypes.SUSPEND_ADMIN_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta,
				admin
			}
		});
	};
}

export function unsuspendAdminById(id, fields) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UNSUSPEND_ADMIN_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.admins.unsuspendAdminById(id, fields);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.UNSUSPEND_ADMIN_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { admin } = response.data;

		dispatch({
			type: ActionTypes.UNSUSPEND_ADMIN_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta,
				admin
			}
		});
	}
}

export function resetMeta(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ADMIN_DETAIL_META
		});
	};
}

export function resetPage(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ADMIN_DETAIL_PAGE
		});
	};
}


export function navigateToListPage(){
	return async dispatch => {
		dispatch(push('/admins'));
	};
}