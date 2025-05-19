import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getAlertById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ALERT_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.alerts.getAlertById({ id });
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ALERT_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { alert, alert_admins, current_alert_admin } = response.data;


		dispatch({
			type: ActionTypes.GET_ALERT_BY_ID_SUCCESS,
			payload: {
				loading: false,
				alert,
				alert_admins,
				current_alert_admin
			}
		});
	}
};

export function acknowledgeAlertById(id) {
	return async (dispatch, getState) => {
		const { alert_admins } = getState().alertDetailPageReducer;
		dispatch({
			type: ActionTypes.ACKNOWLEDGE_ALERT_BY_ID_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const response = await API.alerts.acknowledgeAlertById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.ACKNOWLEDGE_ALERT_BY_ID_ERROR,
				payload: {
					loadingSubmit: false,
					meta: response.meta
				}
			});
		};

		const { alert_admin: current_alert_admin } = response.data;
		const alert_admin_index = alert_admins.findIndex((alert_admin) => alert_admin._id === current_alert_admin._id);
		alert_admins[alert_admin_index] = current_alert_admin;

		dispatch({
			type: ActionTypes.ACKNOWLEDGE_ALERT_BY_ID_SUCCESS,
			payload: {
				loadingSubmit: false,
				meta: response.meta,
				current_alert_admin,
				alert_admins
			}
		})
	}
};

export function navigateToListPage() {
	return async dispatch => {
		dispatch(push('/alerts'));
	}
};

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ALERT_DETAIL_META
		});
	}
};

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ALERT_DETAIL_PAGE
		})
	}
}