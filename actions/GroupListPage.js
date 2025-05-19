import { push } from 'connected-react-router';

import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getGroups(query){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_GROUP_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.groups.getGroups(query);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_GROUP_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { groups, limit, page, total } = response.data;

		dispatch({
			type: ActionTypes.GET_GROUP_LIST_SUCCESS,
			payload: {
				loading: false,
				groups,
				limit,
				page,
				total
			}
		});
	};
}

export function navigateToAddPage(){
	return async dispatch => {
		dispatch(push('/groups/create'));
	};
}

export function navigateToDetailPage(id){
	return async dispatch => {
		dispatch(push(`/groups/id/basic?id=${id}`));
	};
}