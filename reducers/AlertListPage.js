import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	alerts: [],
	alert_admins: [],
	loading: false
};

export default function userListPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_ALERTS_BY_DEPARTMENT_ID_REQUEST:
		case ActionTypes.GET_ALERTS_BY_DEPARTMENT_ID_SUCCESS:
		case ActionTypes.GET_ALERTS_BY_DEPARTMENT_ID_ERROR:
		case ActionTypes.GET_DOORS_IN_ALERTS_SUCCESS:
		case ActionTypes.GET_DOORS_IN_ALERTS_ERROR:
		case ActionTypes.GET_DOORS_IN_ALERTS_REQUEST:
		case ActionTypes.GET_LOCATIONS_IN_ALERTS_SUCCESS:
		case ActionTypes.GET_LOCATIONS_IN_ALERTS_ERROR:
		case ActionTypes.GET_LOCATIONS_IN_ALERTS_REQUEST:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ALERT_LIST_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_ALERT_LIST_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}