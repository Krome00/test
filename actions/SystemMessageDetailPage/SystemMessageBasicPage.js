import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getSystemMessageById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_SYSTEM_MESSAGE_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.system_messages.getSystemMessageById({ id });

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_SYSTEM_MESSAGE_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { system_message } = response.data;

		dispatch({
			type: ActionTypes.GET_SYSTEM_MESSAGE_BY_ID_SUCCESS,
			payload: {
				loading: false,
				system_message
			}
		});
	};
}

export function getLocationsByDepartmentId() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_SYSTEM_MESSAGE_LOCATIONS_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.locations.getLocationsByDepartmentId();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_SYSTEM_MESSAGE_LOCATIONS_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { locations } = response.data;

		dispatch({
			type: ActionTypes.GET_SYSTEM_MESSAGE_LOCATIONS_SUCCESS,
			payload: {
				loading: false,
				locations
			}
		});
	};
}

export function getDoorsByDepartmentId() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_SYSTEM_MESSAGE_DOORS_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.doors.getDoorsByDepartmentId();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_SYSTEM_MESSAGE_DOORS_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { doors } = response.data;

		dispatch({
			type: ActionTypes.GET_SYSTEM_MESSAGE_DOORS_SUCCESS,
			payload: {
				loading: false,
				doors
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { system_message } = getState().systemMessageDetailPage.systemMessageBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_SYSTEM_MESSAGE_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			system_message: {
				...fields
			}
		};

		let response;
		if (system_message) {
			body.system_message.updated_at = system_message.updated_at;
			response = await API.system_messages.updateSystemMessageById(system_message._id, body);
		} else {
			response = await API.system_messages.createSystemMessage(body);
		};

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_SYSTEM_MESSAGE_ERROR,
				payload: {
					loadingSubmit: false,
					meta: response.meta
				}
			});
		};

		const { system_message: newData } = response.data;

		dispatch({
			type: ActionTypes.SUBMIT_SYSTEM_MESSAGE_SUCCESS,
			payload: {
				system_message: newData,
				loadingSubmit: false,
				meta: response.meta
			}
		});

		dispatch(push(`/system-messages/id/basic?id=${newData._id}`));
	};
}

export function navigateToListPage() {
	return async dispatch => {
		dispatch(push('/system-messages'));
	};
}

export function resetDetailMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SYSTEM_MESSAGE_DETAIL_META
		});
	};
}

export function resetDetailPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SYSTEM_MESSAGE_DETAIL_PAGE
		});
	};
}