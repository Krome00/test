import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getDepartmentById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_DEPARTMENT_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.departments.getDepartmentById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_DEPARTMENT_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { department } = response.data;

		dispatch({
			type: ActionTypes.GET_DEPARTMENT_BY_ID_SUCCESS,
			payload: {
				loading: false,
				department
			}
		});
	};
}

export function navigateToListPage() {
	return async dispatch => {
		dispatch(push('/departments'));
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_DEPARTMENT_DETAIL_PAGE
		});
	};
}