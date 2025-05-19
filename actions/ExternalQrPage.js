import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getUserByAuthId(uuid) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EXTERNAL_USER_BY_ID_REQUEST,
			payload: {
				loadingExternal: true
			}
		});

		const response = await API.external_user.getExternalUserById({ uuid });

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.GET_EXTERNAL_USER_BY_ID_ERROR,
				payload: {
					loadingExternal: false
				}
			});
		}
		if (response === undefined) console.log('UNDEFINED VALUE');

		const { external_user } = response.data;

		dispatch({
			type: ActionTypes.GET_EXTERNAL_USER_BY_ID_SUCCESS,
			payload: {
				external_user,
				loadingExternal: false
			}
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EXTERNAL_USER_PAGE
		});
	};
}
