import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getAllCallRequest(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_CALLS_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.controllers_data.getAllCallRequests();
		
		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_CALLS_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { remote_call_requests } = response.data;

		dispatch({
			type: ActionTypes.GET_CALLS_LIST_SUCCESS,
			payload: {
				loading: false,
				remote_call_requests,
				meta: response.meta
			}
		});


	};
};

export function navigateToAddPage(){
	return async dispatch => {
		dispatch(push('/entities/create'));
	};
}

export function navigateToVideoCallRoom({ controller_id }){
	return async dispatch => {
		dispatch(push(`/call-room/room?id=${controller_id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_CALLS_LIST_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_CALLS_LIST_PAGE
		});
	};
}