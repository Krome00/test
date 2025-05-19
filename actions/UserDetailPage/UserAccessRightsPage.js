import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';


export function getAccessRightsUsersByUserId(user_id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_USER_ACCESS_RIGHTS_LIST_REQUEST,
			payload: { loading: true }
		});

		const response = await API.access_rights_users.getAccessRightsUsersByUserId({ user_id });

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_USER_ACCESS_RIGHTS_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { access_rights_users } = response.data;

		dispatch({
			type: ActionTypes.GET_USER_ACCESS_RIGHTS_LIST_SUCCESS,
			payload: {
				access_rights_users,
				loading: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_ACCESS_RIGHTS_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_ACCESS_RIGHTS_PAGE
		});
	};
}