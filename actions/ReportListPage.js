import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function downloadReports(type) {
	return async dispatch => {

		dispatch({
			type: ActionTypes.DOWNLOAD_CONTROLLER_REPORTS_REQUEST,
			payload: {
				loading: true,
				hasDownloadSuccess: false
			}
		});

		let response;

		if (type === 'controller_reports') {
			response = await API.reports.downloadControllerReports();
		} else if (type === 'emergency_reports') {
			response = await API.reports.downloadEmergencyReports();
		} else if (type === 'event_reports') {
			response = await API.reports.downloadEventsReports();
		} else {
			return;
		}

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DOWNLOAD_CONTROLLER_REPORTS_ERROR,
				payload: {
					meta: response.meta,
					loading: false,
					hasDownloadSuccess: false
				}
			});
		}

		const { csv_string } = response.data;

		dispatch({
			type: ActionTypes.DOWNLOAD_CONTROLLER_REPORTS_SUCCESS,
			payload: {
				csv_string,
				meta: response.meta,
				loadingDownloadSubmit: false,
				hasDownloadSuccess: true
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_DOWNLOAD_REPORTS_META
		});
	};
}

export function reset() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_DOWNLOAD_REPORTS_PAGE
		});
	};
}