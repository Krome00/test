import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getAlertListByDepartmentId(query) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ALERTS_BY_DEPARTMENT_ID_REQUEST,
			payload: {
				loading: true
			}
		});
		
		const response = await API.alerts.getAlertsByDepartmentId(query);
		
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_ALERTS_BY_DEPARTMENT_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { alerts_obj, limit, page, total } = response.data;
		const { alerts, alert_admins } = alerts_obj;

		dispatch({
			type: ActionTypes.GET_ALERTS_BY_DEPARTMENT_ID_SUCCESS,
			payload: {
				loading: false,
				alerts,
				alert_admins,
				limit,
				page,
				total
			}
		});
	};
};

export function getDoorsInAlerts() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_DOORS_IN_ALERTS_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.doors.getDoors();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_DOORS_IN_ALERTS_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { doors } = response.data;

		dispatch({
			type: ActionTypes.GET_DOORS_IN_ALERTS_SUCCESS,
			payload: {
				loading: false,
				doors
			}
		});
	};
};

export function getLocationsInAlerts() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_LOCATIONS_IN_ALERTS_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.locations.getAllLocations();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_LOCATIONS_IN_ALERTS_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { locations } = response.data;

		dispatch({
			type: ActionTypes.GET_LOCATIONS_IN_ALERTS_SUCCESS,
			payload: {
				loading: false,
				locations
			}
		});
	};
};

export function navigateToDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/alerts/id/basic?id=${id}`));
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ALERT_DETAIL_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_ALERT_DETAIL_PAGE
		});
	};
}