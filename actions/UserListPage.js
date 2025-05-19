import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getUserList(query) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_USER_LIST_REQUEST,
			payload: { loading: true }
		});

		const response = await API.users.getUsers(query);
		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_USER_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}
		
		const { users, total, page, limit } = response.data;

		dispatch({
			type: ActionTypes.GET_USER_LIST_SUCCESS,
			payload: {
				users,
				total,
				page,
				limit,
				loading: false
			}
		});
	};
}

export function navigateToAddPage(){
	return async dispatch => {
		dispatch(push({
			pathname: '/users/create'
		}));
	};
}

export function navigateToDetailPage({ user_id, state }){
	return async dispatch => {
		dispatch(push({
			pathname: '/users/id/basic',
			search: `?id=${user_id}`,
			state
		}));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_LIST_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_LIST_PAGE
		});
	};
}