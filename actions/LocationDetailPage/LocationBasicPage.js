import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getLocationById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_LOCATION_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.locations.getLocationById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_LOCATION_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { location } = response.data;

		dispatch({
			type: ActionTypes.GET_LOCATION_BY_ID_SUCCESS,
			payload: {
				loading: false,
				location
			}
		});
	};
}

export function onSubmit(fields){
	return async (dispatch, getState) => {
		const { location } = getState().locationDetailPage.locationBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_LOCATION_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			location: {
				...fields
			}
		};
		let response;
		if(location){
			body.location.updated_at = location.updated_at;
			response = await API.locations.updateLocationById(location._id, body);
		} else {
			response = await API.locations.createLocation(body);
		};

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUBMIT_LOCATION_ERROR,
				payload: {
					loadingSubmit: false,
					meta: response.meta
				}
			});
		};

		const { location: newData } = response.data;

		dispatch({
			type: ActionTypes.SUBMIT_LOCATION_SUCCESS,
			payload: {
				loadingSubmit: false,
				location: newData,
				meta: response.meta
			}
		});

		dispatch(push(`/locations/id/basic?id=${newData._id}`));
	};
}

export function getLocationEntities(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_LOCATION_ENTITIES_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.entities.getAllEntities({ type: 'user_role' });

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_LOCATION_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { entities } = response.data;
		
		dispatch({
			type: ActionTypes.GET_LOCATION_ENTITIES_SUCCESS,
			payload: {
				loading: false,
				entities
			}
		});
	};
}

export function deleteLocationById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_LOCATION_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.locations.deleteLocationById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.DELETE_LOCATION_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		dispatch({
			type: ActionTypes.DELETE_LOCATION_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta
			}
		});

		dispatch(push('/locations'));
	};
}

export function suspendLocationById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUSPEND_LOCATION_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.locations.suspendLocationById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUSPEND_LOCATION_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { location: newData } = response.data;

		dispatch({
			type: ActionTypes.SUSPEND_LOCATION_BY_ID_SUCCESS,
			payload: {
				loading: false,
				location: newData,
				meta: response.meta
			}
		});

		dispatch(push(`/locations/id/basic?id=${newData._id}`));
	};
}

export function unsuspendLocationById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.UNSUSPEND_LOCATION_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.locations.unsuspendLocationById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.UNSUSPEND_LOCATION_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { location: newData } = response.data;

		dispatch({
			type: ActionTypes.UNSUSPEND_LOCATION_BY_ID_SUCCESS,
			payload: {
				loading: false,
				location: newData,
				meta: response.meta
			}
		});

		dispatch(push(`/locations/id/basic?id=${newData._id}`));
	};
}

export function resetPage(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_LOCATION_DETAIL_PAGE
		});
	};
}

export function navigateToListPage(){
	return async dispatch => {
		dispatch(push('/locations'));
	};
}