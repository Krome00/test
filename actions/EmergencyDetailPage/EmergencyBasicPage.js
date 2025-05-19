import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getEmergencyById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EMERGENCY_BY_ID_REQUEST,
			payload: {
				loading: false
			}
		});

		const response = await API.emergencies.getEmergencyById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_EMERGENCY_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { suspension: emergency } = response.data;

		dispatch({
			type: ActionTypes.GET_EMERGENCY_BY_ID_SUCCESS,
			payload: {
				loading: false,
				emergency
			}
		});
	};
}

export function onSubmit(fields){
	return async (dispatch, getState) => {
		const { emergency } = getState().emergencyDetailPage.emergencyBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_EMERGENCY_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			suspension: {
				...fields
			}
		};
		let response;
		if(emergency){
			body.suspension.updated_at = emergency.updated_at;
			response = await API.emergencies.updateEmergencyById(emergency._id, body);
		} else {
			response = await API.emergencies.createEmergency(body);
		};

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUBMIT_EMERGENCY_ERROR,
				payload: {
					loadingSubmit: false,
					meta: response.meta
				}
			});
		};

		const { suspension: newData } = response.data;
		
		dispatch({
			type: ActionTypes.SUBMIT_EMERGENCY_SUCCESS,
			payload: {
				loadingSubmit: false,
				emergency: newData,
				meta: response.meta
			}
		});

		dispatch(push(`/emergencies/id/basic?id=${newData._id}`));
	};
}

export function deleteEmergencyById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_EMERGENCY_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.emergencies.deleteEmergencyById({ id });

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.DELETE_EMERGENCY_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		dispatch({
			type: ActionTypes.DELETE_EMERGENCY_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta
			}
		});

		dispatch(push('/emergencies'));
	};
}

export function suspendEmergencyById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUSPEND_EMERGENCY_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.emergencies.suspendEmergencyById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUSPEND_EMERGENCY_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};
		const { suspension: newData } = response.data;
		dispatch({
			type: ActionTypes.SUSPEND_EMERGENCY_BY_ID_SUCCESS,
			payload: {
				loading: false,
				emergency: newData,
				meta: response.meta
			}
		});

		dispatch(push(`/emergencies/id/basic?id=${newData._id}`));
	};
}

export function unsuspendEmergencyById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.UNSUSPEND_EMERGENCY_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.emergencies.unsuspendEmergencyById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.UNSUSPEND_EMERGENCY_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};
		const { suspension: newData } = response.data;
		dispatch({
			type: ActionTypes.UNSUSPEND_EMERGENCY_BY_ID_SUCCESS,
			payload: {
				loading: false,
				emergency: newData,
				meta: response.meta
			}
		});

		dispatch(push(`/emergencies/id/basic?id=${newData._id}`));
	};
}

export function getEmergencyLocationList(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EMERGENCY_LOCATION_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.locations.getAllLocations();
		
		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_EMERGENCY_LOCATION_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { locations } = response.data;

		dispatch({
			type: ActionTypes.GET_EMERGENCY_LOCATION_LIST_SUCCESS,
			payload: {
				loading: false,
				locations
			}
		});
	};
}

export function getEmergencyDoorList(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_EMERGENCY_DOOR_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.doors.getDoors();

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_EMERGENCY_DOOR_LIST_ERROR,
				payload: {
					loading: true,
					meta: response.meta
				}
			});
		};

		const { doors } = response.data;

		dispatch({
			type: ActionTypes.GET_EMERGENCY_DOOR_LIST_SUCCESS,
			payload: {
				loading: false,
				doors
			}
		});
	};
}

export function resetDetailPage(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EMERGENCY_DETAIL_PAGE
		});
	};
}

export function resetDetailMeta(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_EMERGENCY_DETAIL_META
		});
	};
}

export function navigateToListPage(){
	return async dispatch => {
		dispatch(push('/emergencies'));
	};
}