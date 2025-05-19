import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getSecurityFeaturesByControllerId(id, { page, limit }) {
	return async dispatch => {
		console.log('tatatatatat');
		dispatch({
			type: ActionTypes.GET_SECURITY_FEATURES_LIST_REQUEST,
			payload: {
				loadingSecurity: true
			}
		});
		const response = await API.security_features.getSecurityFeatures({ controller_id: id, page, limit });
		console.log('response', response);
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_SECURITY_FEATURES_LIST_ERROR,
				payload: {
					meta: response.meta,
					loadingSecurity: false
				}
			});
		}

		const { security_features } = response.data;

		dispatch({
			type: ActionTypes.GET_SECURITY_FEATURES_LIST_SUCCESS,
			payload: {
				security_features,
				loadingSecurity: false,
				page: response.data.page,
				limit: response.data.limit,
				total: response.data.total,
				count: response.data.count
			}
		});

	};
}

export function getControllerById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_CONTROLLER_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.security_features.getControllerById({ id });

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

// TEST IF THIS WORKS
export function deleteSecurityFeatureById(id) {
	return async (dispatch, getState) => {

		const { controller } = getState().controllerDetailPage.controllerBasicPageReducer;

		dispatch({
			type: ActionTypes.DELETE_SECURITY_FEATURE_BY_ID_REQUEST,
			payload: {
				loadingSecuritySubmit: true
			}
		});

		const response = await API.security_features.deleteSecurityFeatureById({ id });

		if (response.meta.code !== 200) {
			dispatch({
				type: ActionTypes.DELETE_SECURITY_FEATURE_BY_ID_ERROR,
				payload: {
					loadingSecuritySubmit: true,
					meta: response.meta
				}
			});
			return dispatch(push(`/controllers/id/security-features?id=${controller._id}`));
		}

		dispatch({
			type: ActionTypes.DELETE_SECURITY_FEATURE_BY_ID_SUCCESS,
			payload: {
				loadingSecuritySubmit: true,
				meta: response.meta
			}
		});
		// dispatch(push(`/controllers/id/security-features?id=${fields.controller_id}`));
	};
};

export function onSubmit(fields) {
	return async (dispatch, getState) => {

		dispatch({
			type: ActionTypes.SUBMIT_SECURITY_FEATURES_REQUEST,
			payload: {
				loadingSecuritySubmit: true
			}
		});

		const body = {
			security_feature: {
				...fields
			}
		};

		let response;
		if(fields._id && fields.updated_at){
			response = await API.security_features.updateSecurityFeatureById(fields._id, body);
		} else {
			response = await API.security_features.createSecurityFeature(body);
			console.log('response', response);
		}

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_SECURITY_FEATURES_ERROR,
				payload: {
					meta: response.meta,
					loadingSecuritySubmit: false
				}
			});
		}

		const { security_feature } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_SECURITY_FEATURES_SUCCESS,
			payload: {
				meta: response.meta,
				security_feature,
				loadingSecuritySubmit: false
			}
		});

		// dispatch(push(`/controllers/id/security-features?id=${fields.controller_id}`));

	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SECURITY_FEATURES_DETAIL_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_SECURITY_FEATURES_DETAIL_PAGE
		});
	};
}