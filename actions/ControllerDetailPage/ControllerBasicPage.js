import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import LocalStorageHelper from '../../helpers/local_storage';
import API from '../../helpers/api';

export function getControllerById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_CONTROLLER_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.controllers.getControllerById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_CONTROLLER_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { controller } = response.data;

		dispatch({
			type: ActionTypes.GET_CONTROLLER_BASIC_SUCCESS,
			payload: {
				controller,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { controller } = getState().controllerDetailPage.controllerBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_CONTROLLER_BASIC_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			controller: {
				...fields
			}
		};

		let response;
		if(controller){
			body.controller.updated_at = controller.updated_at;
			response = await API.controllers.updateControllerById(controller._id, body);
		} else {
			response = await API.controllers.createController(body);
		}

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_CONTROLLER_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		const { controller: newData } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_CONTROLLER_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				controller: newData,
				loadingSubmit: false
			}
		});

		dispatch(push(`/controllers/basic?id=${newData._id}`));

	};
}

export function deleteControllerById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_CONTROLLER_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.controllers.deleteControllerById({ id });
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DELETE_CONTROLLER_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}
		dispatch({
			type: ActionTypes.DELETE_CONTROLLER_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				loading: false
			}
		});
		dispatch(push('/controllers'));
	};
}

export function suspendControllerById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUSPEND_CONTROLLER_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.controllers.suspendControllerById(id);
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUSPEND_CONTROLLER_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { controller: newData } = response.data;

		dispatch({
			type: ActionTypes.SUSPEND_CONTROLLER_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				controller: newData,
				loading: false
			}
		});
		dispatch(push(`/controllers/basic?id=${newData._id}`));
	};
}

export function unsuspendControllerById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UNSUSPEND_CONTROLLER_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.controllers.unsuspendControllerById(id);
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.UNSUSPEND_CONTROLLER_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}
		const { controller: newData } = response.data;

		dispatch({
			type: ActionTypes.UNSUSPEND_CONTROLLER_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				controller: newData,
				loading: false
			}
		});
		dispatch(push(`/controllers/basic?id=${newData._id}`));
	};
}

export function navigateToControllerListPage() {
	return async dispatch => {
		dispatch(push('/controllers'));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_CONTROLLER_BASIC_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_CONTROLLER_BASIC_PAGE
		});
	};
}

export function navigateControllerDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/controllers/basic/id?id=${id}`));
	};
}