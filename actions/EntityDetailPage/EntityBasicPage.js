import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getEntityById({ entity_id: id }) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ENTITY_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.entities.getEntityById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_ENTITY_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { entity } = response.data;

		dispatch({
			type: ActionTypes.GET_ENTITY_BY_ID_SUCCESS,
			payload: {
				entity
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { entity } = getState().entityDetailPage.entityDetailPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_ENTITY_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			entity: {
				...fields
			}
		};
		
		let response;
		if(entity){
			body.entity.updated_at = entity.updated_at;
			response = await API.entities.updateEntityById(entity._id, body);
		} else {
			response = await API.entities.createEntity(body);
		}

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUBMIT_ENTITY_ERROR,
				payload: {
					loadingSubmit: false,
					meta: response.meta
				}
			});
		};

		const { entity: newData } = response.data;

		dispatch({
			type: ActionTypes.SUBMIT_ENTITY_SUCCESS,
			payload: {
				entity: newData,
				loadingSubmit: false,
				meta: response.meta
			}
		});

		dispatch(push(`/entities/id/basic?id=${newData._id}`));
	};
}

export function deleteEntityById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_ENTITY_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.entities.deleteEntity({ id });

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.DELETE_ENTITY_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		dispatch({
			type: ActionTypes.DELETE_ENTITY_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta
			}
		});

		dispatch(push('/entities'));
	};
}

export function suspendEntityById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUSPEND_ENTITY_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.entities.suspendEntity(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUSPEND_ENTITY_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}
		const { entity: newData } = response.data;
		dispatch({
			type: ActionTypes.SUSPEND_ENTITY_BY_ID_SUCCESS,
			payload: {
				loading: false,
				entity: newData,
				meta: response.meta
			}
		});

		dispatch(push(`/entities/id/basic?id=${newData._id}`));
	};
}

export function unsuspendEntityById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UNSUSPEND_ENTITY_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.entities.unsuspendEntity(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.UNSUSPEND_ENTITY_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}
		const { entity: newData } = response.data;
		dispatch({
			type: ActionTypes.UNSUSPEND_ENTITY_BY_ID_SUCCESS,
			payload: {
				loading: false,
				entity: newData,
				meta: response.meta
			}
		});

		dispatch(push(`/entities/id/basic?id=${newData._id}`));
	};
}

export function getEntityLocationList(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ENTITY_LOCATION_LIST_REQUEST,
			payload: {
				loading: false
			}
		});

		const response = await API.locations.getAllLocations();

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_ENTITY_LOCATION_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { locations } = response.data;

		dispatch({
			type: ActionTypes.GET_ENTITY_LOCATION_LIST_SUCCESS,
			payload: {
				loading: false,
				locations
			}
		});
	};
}

export function resetPage(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ENTITY_DETAIL_PAGE
		});
	};
}

export function navigateToListPage() {
	return async dispatch => {
		dispatch('/entities');
	};
}