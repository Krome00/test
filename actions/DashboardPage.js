import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getDoorsByDepartmentId() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_DASHBOARD_DETAIL_REQUEST,
			payload: {
				loading: false
			}
		});

		const response = await API.doors.getDoorsByDepartmentId();

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_DASHBOARD_DETAIL_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { doors } = response.data;
		
		dispatch({
			type: ActionTypes.GET_DASHBOARD_DETAIL_SUCCESS,
			payload: {
				loading: false,
				doors
			}
		});
	};
}