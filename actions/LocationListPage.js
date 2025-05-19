import { push } from 'connected-react-router';

import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getLocationList(query){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_LOCATION_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.locations.getAllLocations(query);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_LOCATION_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { locations, limit, page, total } = response.data;

		dispatch({
			type: ActionTypes.GET_LOCATION_LIST_SUCCESS,
			payload: {
				loading: false,
				locations,
				limit,
				page,
				total
			}
		});
	};
}

export function navigateToAddPage(){
	return async dispatch => {
		dispatch(push('/locations/create'));
	};
}

export function navigateToDetailPage(id){
	return async dispatch => {
		dispatch(push(`/locations/id/basic?id=${id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_LOCATION_LIST_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_LOCATION_LIST_PAGE
		});
	};
}