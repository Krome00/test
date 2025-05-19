import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	controllers: [],
	alive_controllers: [],
	loading: false,
	loadingSubmit: false
};

export default function statusListPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_STATUS_LIST_REQUEST:
		case ActionTypes.GET_STATUS_LIST_ERROR:
		case ActionTypes.GET_STATUS_LIST_SUCCESS:
		case ActionTypes.GET_CONTROLLER_STATUS_LIST_SUCCESS:
		case ActionTypes.GET_CONTROLLER_STATUS_LIST_ERROR:
		case ActionTypes.GET_CONTROLLER_STATUS_LIST_REQUEST:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_STATUS_LIST_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_STATUS_LIST_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}