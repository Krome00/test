import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getDoorsByLocationId(query) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_DOOR_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.doors.getDoorsByLocationId(query);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_DOOR_LIST_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { doors, limit, page, total } = response.data;

		dispatch({
			type: ActionTypes.GET_DOOR_LIST_SUCCESS,
			payload: {
				doors,
				loading: false,
				limit,
				page,
				total
			}
		});

	};
}

export function getControllerList() {
	return async dispatch => {

		dispatch({
			type: ActionTypes.GET_CONTROLLER_FROM_DOOR_REQUEST,
			payload: { loadingControllers: true }
		});

		const response = await API.controllers.getControllers({});

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_CONTROLLER_FROM_DOOR_ERROR,
				payload: {
					meta: response.meta,
					loadingControllers: false
				}
			});
		}

		const { controllers } = response.data;

		dispatch({
			type: ActionTypes.GET_CONTROLLER_FROM_DOOR_SUCCESS,
			payload: {
				controllers,
				loadingControllers: false
			}
		});
	};
}


export function onSubmit(fields) {
	return async (dispatch, getState) => {

		dispatch({
			type: ActionTypes.SUBMIT_DOOR_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			door: {
				...fields
			}
		};

		let response;
		if(fields._id && fields.updated_at){
			response = await API.doors.updateDoorById(fields._id, body);
		} else {
			response = await API.doors.createDoor(body);
		}

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_DOOR_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		const { door: newData } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_DOOR_SUCCESS,
			payload: {
				meta: response.meta,
				door: newData,
				loadingSubmit: false
			}
		});

		dispatch(push(`/locations/id/doors?id=${newData.location_id}`));

	};
}

export function deleteDoorById(id, location_id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_DOOR_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.doors.deleteDoorById({ id });
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DELETE_DOOR_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}
		dispatch({
			type: ActionTypes.DELETE_DOOR_BY_ID_SUCCESS,
			payload: {
				meta: response.meta,
				loading: false
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_DOOR_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_DOOR_PAGE
		});
	};
}