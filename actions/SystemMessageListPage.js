import { push } from 'connected-react-router';

import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';


export function getSystemMessages(query) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_SYSTEM_MESSAGE_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.system_messages.getSystemMessages(query);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_SYSTEM_MESSAGE_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { system_messages, limit, page, total } = response.data;
		
		dispatch({
			type: ActionTypes.GET_SYSTEM_MESSAGE_LIST_SUCCESS,
			payload: {
				loading: false,
				system_messages,
				limit,
				page,
				total
			}
		});
	};
};

export function navigateToDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/system-messages/id/basic?id=${id}`));
	};
}

export function navigateToAddPage() {
	return async dispatch => {
		dispatch(push('/system-messages/create'));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SYSTEM_MESSAGE_LIST_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SYSTEM_MESSAGE_LIST_PAGE
		});
	};
}