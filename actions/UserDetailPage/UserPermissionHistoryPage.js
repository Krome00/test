import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';


export function getUserPermissionHistories(user_id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_USER_PERMISSION_HISTORY_LIST_REQUEST,
			payload: { loading: true }
		});

		const response = await API.user_permission_histories.getUserPermissionHistories({ user_id });

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_USER_PERMISSION_HISTORY_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { user_permission_histories } = response.data;

		dispatch({
			type: ActionTypes.GET_USER_PERMISSION_HISTORY_LIST_SUCCESS,
			payload: {
				user_permission_histories,
				loading: false
			}
		});
	};
}

export function getUserPermissionHistoryById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_USER_PERMISSION_HISTORY_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.user_permission_histories.getUserPermissionHistoryById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_USER_PERMISSION_HISTORY_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { user_permission_history } = response.data;

		dispatch({
			type: ActionTypes.GET_USER_PERMISSION_HISTORY_BY_ID_SUCCESS,
			payload: {
				user_permission_history,
				loading: false
			}
		});
	};
}

export function navigateToUserPermissionHistoryListPage() {
	return async dispatch => {
		dispatch(push('/user-permission-histories'));

	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_PERMISSION_HISTORY_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_PERMISSION_HISTORY_PAGE
		});
	};
}

export function navigateUserPermissionHistoryDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/user-permission-histories/id?id=${id}`));
	};
}