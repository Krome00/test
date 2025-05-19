import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	doors: [],
	loading: false
};

export default function userListPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_DASHBOARD_DETAIL_REQUEST:
		case ActionTypes.GET_DASHBOARD_DETAIL_SUCCESS:
		case ActionTypes.GET_DASHBOARD_DETAIL_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_DASHBOARD_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_DASHBOARD_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}