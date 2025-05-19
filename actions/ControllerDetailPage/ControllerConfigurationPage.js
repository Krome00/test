import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import LocalStorageHelper from '../../helpers/local_storage';
import API from '../../helpers/api';

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
			controller_configuration: {
				...fields
			}
		};

		let response;
		if(controller){
			body.controller_configuration.updated_at = controller.updated_at;
			response = await API.controller_configurations.updateControllerConfigurationById(controller._id, body);
		
		} else 

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

		dispatch(push(`/controllers/configuration?id=${newData._id}`));

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
			type: ActionTypes.RESET_CONTROLLER_CONFIGURATION_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_CONTROLLER_CONFIGURATION_PAGE
		});
	};
}

export function navigateControllerDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/controllers/configuration/id?id=${id}`));
	};
}