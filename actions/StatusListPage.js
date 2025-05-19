import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getAllStatus(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_STATUS_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.controllers_data.getAllStatus();
		
		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_STATUS_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { status } = response.data;

		dispatch({
			type: ActionTypes.GET_STATUS_LIST_SUCCESS,
			payload: {
				loading: false,
				alive_controllers: status,
				meta: response.meta
			}
		});


	};
};

export function getControllers(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_CONTROLLER_STATUS_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.controllers_data.getAllControllers();
		
		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_CONTROLLER_STATUS_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { controllers } = response.data;

		dispatch({
			type: ActionTypes.GET_CONTROLLER_STATUS_LIST_SUCCESS,
			payload: {
				loading: false,
				controllers,
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

export function navigateToDetailPage({ entity_id }){
	return async dispatch => {
		dispatch(push(`/status/id/basic?id=${entity_id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_STATUS_LIST_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_STATUS_LIST_PAGE
		});
	};
}