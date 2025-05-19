import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getEntityList(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ENTITY_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.entities.getAllEntities();
		
		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_ENTITY_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { entities } = response.data;

		dispatch({
			type: ActionTypes.GET_ENTITY_LIST_SUCCESS,
			payload: {
				loading: false,
				entities,
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
		dispatch(push(`/entities/id/basic?id=${entity_id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ENTITY_LIST_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ENTITY_LIST_PAGE
		});
	};
}