import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getControllerList() {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_CONTROLLER_LIST_REQUEST,
			payload: { loading: true }
		});

		const response = await API.controllers.getControllers();

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_CONTROLLER_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { controllers } = response.data;

		dispatch({
			type: ActionTypes.GET_CONTROLLER_LIST_SUCCESS,
			payload: {
				controllers,
				loading: false
			}
		});
	};
}

export function navigateToAddPage(){
	return async dispatch => {
		dispatch(push('/controllers/create'));
	};
}

export function navigateToDetailPage({ controller_id }){
	return async dispatch => {
		dispatch(push(`/controllers/basic?id=${controller_id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_CONTROLLER_LIST_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_CONTROLLER_LIST_PAGE
		});
	};
}