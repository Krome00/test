import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getAdminList(query){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ADMIN_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.admins.getAllAdmins(query);
		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_ADMIN_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { admins, limit, page, total } = response.data;

		dispatch({
			type: ActionTypes.GET_ADMIN_LIST_SUCCESS,
			payload: {
				loading: false,
				admins,
				limit,
				page,
				total
			}
		});
	};
}

export function navigateToAddPage(){
	return async dispatch => {
		dispatch(push('/admins/create'));
	};
}

export function navigateToDetailPage({ admin_id }){
	return async dispatch => {
		dispatch(push(`/admins/id/basic?id=${admin_id}`));
	};
}