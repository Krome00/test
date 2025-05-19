import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	alert: {},
	alert_admins: [],
	current_alert_admin: {},
	loading: false,
	loadingSubmit: false
};

export default function userListPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_ALERT_BY_ID_REQUEST:
		case ActionTypes.GET_ALERT_BY_ID_SUCCESS:
		case ActionTypes.GET_ALERT_BY_ID_ERROR:
		case ActionTypes.ACKNOWLEDGE_ALERT_BY_ID_REQUEST:
		case ActionTypes.ACKNOWLEDGE_ALERT_BY_ID_SUCCESS:
		case ActionTypes.ACKNOWLEDGE_ALERT_BY_ID_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ALERT_DETAIL_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_ALERT_DETAIL_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}