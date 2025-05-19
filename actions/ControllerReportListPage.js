// import * as ActionTypes from '../constants/ActionTypes';
// import API from '../helpers/api';

// export function getControllerReportList(query) {
// 	return async dispatch => {
// 		dispatch({
// 			type: ActionTypes.GET_CONTROLLER_REPORT_LIST_REQUEST,
// 			payload: {
// 				loading: true
// 			}
// 		});

// 		const response = await API.events.getEvents(query); //change when API is made

// 		if(response.meta.code !== 200){
// 			return dispatch({
// 				type: ActionTypes.GET_CONTROLLER_REPORT_LIST_ERROR,
// 				payload: {
// 					loading: false,
// 					meta: response.meta
// 				}
// 			});
// 		};

// 		const { emergency_reports, limit, page, total } = response.data;

// 		dispatch({
// 			type: ActionTypes.GET_CONTROLLER_REPORT_LIST_SUCCESS,
// 			payload: {
// 				loading: false,
// 				emergency_reports,
// 				limit,
// 				page,
// 				total
// 			}
// 		});
// 	};
// }
