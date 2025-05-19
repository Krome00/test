import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	controller: null,
	loading: false,
	loadingSubmit: false
};

export default function controllerBasicPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_CONTROLLER_BASIC_REQUEST:
		case ActionTypes.GET_CONTROLLER_BASIC_SUCCESS:
		case ActionTypes.GET_CONTROLLER_BASIC_ERROR:
		case ActionTypes.SUBMIT_CONTROLLER_BASIC_REQUEST:
		case ActionTypes.SUBMIT_CONTROLLER_BASIC_SUCCESS:
		case ActionTypes.SUBMIT_CONTROLLER_BASIC_ERROR:
		case ActionTypes.DELETE_CONTROLLER_BASIC_ERROR:
		case ActionTypes.DELETE_CONTROLLER_BASIC_SUCCESS:
		case ActionTypes.DELETE_CONTROLLER_BASIC_REQUEST:
		case ActionTypes.SUSPEND_CONTROLLER_BASIC_ERROR:
		case ActionTypes.SUSPEND_CONTROLLER_BASIC_SUCCESS:
		case ActionTypes.SUSPEND_CONTROLLER_BASIC_REQUEST:
		case ActionTypes.UNSUSPEND_CONTROLLER_BASIC_ERROR:
		case ActionTypes.UNSUSPEND_CONTROLLER_BASIC_SUCCESS:
		case ActionTypes.UNSUSPEND_CONTROLLER_BASIC_REQUEST:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_CONTROLLER_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_CONTROLLER_BASIC_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}