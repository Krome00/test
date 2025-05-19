import { push } from 'connected-react-router';
import _ from 'lodash';
import * as ActionTypes from '../../constants/ActionTypes';
import LocalStorageHelper from '../../helpers/local_storage';
import API from '../../helpers/api';



export function getUserAuthsByUserId(query){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_USER_AUTHENTICATIONS_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.auth_methods.getAllAuthMethodsByUserId(query);
		console.log(response);

		if(response.meta.code !== 200){
			dispatch({
				type: ActionTypes.GET_USER_AUTHENTICATIONS_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
			return;
		};

		const { custom_authentication_method_to_user_maps } = response.data;

		dispatch({
			type: ActionTypes.GET_USER_AUTHENTICATIONS_SUCCESS,
			payload: {
				custom_authentication_method_to_user_maps: custom_authentication_method_to_user_maps,
				loading: false
			}
		});

	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {

		dispatch({
			type: ActionTypes.SUBMIT_USER_AUTHENTICATION_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			custom_authentication_method_to_user_map: {
				...fields
			}
		};

		let response;
		if(fields._id && fields.updated_at){
			response = await API.auth_methods.updateAuthMethod(fields._id, body);
		} else {
			response = await API.auth_methods.createAuthMethod(body);
		}

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_USER_AUTHENTICATION_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		const { custom_authentication_method_to_user_map: newData } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_USER_AUTHENTICATION_SUCCESS,
			payload: {
				meta: response.meta,
				custom_authentication_method_to_user_map: newData,
				loadingSubmit: false
			}
		});

		dispatch(push(`/users/id/auths?id=${newData.user_id}`));

	};
}

export function suspendUserAuthById(id){
	return async (dispatch, getState) => {
		const { custom_authentication_method_to_user_maps } = getState().userDetailPage.userAuthenticationPageReducer;
		dispatch({
			type: ActionTypes.SUSPEND_USER_AUTHENTICATION_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.auth_methods.suspendAuthMethod(id);
		let new_access_rights = [...custom_authentication_method_to_user_maps];

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUSPEND_USER_AUTHENTICATION_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		let currIndex;
		// Getting index
		custom_authentication_method_to_user_maps.map((camtum, index) => {
			if(camtum._id === id){
				currIndex = index;
				return camtum;
			}
		});

		const { custom_authentication_method_to_user_map } = response.data;
		new_access_rights[currIndex] = custom_authentication_method_to_user_map;

		dispatch({
			type: ActionTypes.SUSPEND_USER_AUTHENTICATION_SUCCESS,
			payload: {
				loading: false,
				custom_authentication_method_to_user_maps: new_access_rights,
				meta: response.meta
			}
		});

	};
}

export function reactivateUserAuthById(id){
	return async (dispatch, getState) => {
		const { custom_authentication_method_to_user_maps } = getState().userDetailPage.userAuthenticationPageReducer;
		dispatch({
			type: ActionTypes.UNSUSPEND_USER_AUTHENTICATION_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.auth_methods.reactivateAuthMethod(id);
		let new_auth_methods = [...custom_authentication_method_to_user_maps];

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.UNSUSPEND_USER_AUTHENTICATION_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		let currIndex;
		// Getting index
		custom_authentication_method_to_user_maps.map((camtum, index) => {
			if(camtum._id === id){
				currIndex = index;
				return camtum;
			}
		});

		const { custom_authentication_method_to_user_map } = response.data;
		new_auth_methods[currIndex] = custom_authentication_method_to_user_map;

		dispatch({
			type: ActionTypes.UNSUSPEND_USER_AUTHENTICATION_SUCCESS,
			payload: {
				loading: false,
				custom_authentication_method_to_user_maps: new_auth_methods,
				meta: response.meta
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_AUTHENTICATION_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_AUTHENTICATION_PAGE
		});
	};
}