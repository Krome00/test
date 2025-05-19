import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	remote_call_requests: null,
	loading: false,
	loadingSubmit: false
};

export default function callsListPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_CALLS_LIST_REQUEST:
		case ActionTypes.GET_CALLS_LIST_ERROR:
		case ActionTypes.GET_CALLS_LIST_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_CALLS_LIST_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_CALLS_LIST_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}