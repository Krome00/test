import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getDepartmentList(query) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_DEPARTMENT_LIST_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.departments.getDepartments(query);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_DEPARTMENT_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { departments, limit, page, total } = response.data;

		dispatch({
			type: ActionTypes.GET_DEPARTMENT_LIST_SUCCESS,
			payload: {
				loading: false,
				departments,
				limit,
				page,
				total
			}
		});
	};
}

export function navigateToDetailPage(id){
	return async dispatch => {
		dispatch(push(`/departments/id/basic?id=${id}`));
	};
}