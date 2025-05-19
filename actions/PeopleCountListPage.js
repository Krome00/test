// import * as ActionTypes from '../constants/ActionTypes';
// import API from '../helpers/api';

// export function getPeopleCountListPage(query) {
// 	return async dispatch => {
// 		dispatch({
// 			type: ActionTypes.GET_PEOPLE_COUNT_LIST_REQUEST,
// 			payload: {
// 				loading: true
// 			}
// 		});

// 		const response = await API.events.getEvents(query);

// 		if(response.meta.code !== 200){
// 			return dispatch({
// 				type: ActionTypes.GET_PEOPLE_COUNT_LIST_ERROR,
// 				payload: {
// 					loading: false,
// 					meta: response.meta
// 				}
// 			});
// 		};

// 		const { people_count, limit, page, total } = response.data;

// 		dispatch({
// 			type: ActionTypes.GET_PEOPLE_COUNT_LIST_SUCCESS,
// 			payload: {
// 				loading: false,
// 				people_count,
// 				limit,
// 				page,
// 				total
// 			}
// 		});
// 	};
// }
