import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getEmergencyList(query){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EMERGENCY_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.emergencies.getEmergencyList(query);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_EMERGENCY_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { suspensions: emergencies, limit, page, total } = response.data;

		dispatch({
			type: ActionTypes.GET_EMERGENCY_LIST_SUCCESS,
			payload: {
				loading: false,
				emergencies,
				limit,
				page,
				total
			}
		});
	};
}

export function navigateToAddPage(){
	return async dispatch => {
		dispatch(push('/emergencies/create'));
	};
}

export function navigateToDetailPage(id){
	return async dispatch => {
		dispatch(push(`/emergencies/id/basic?id=${id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EMERGENCY_LIST_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EMERGENCY_LIST_PAGE
		});
	};
}
