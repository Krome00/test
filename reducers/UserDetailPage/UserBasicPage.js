import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	user: null,
	loading: false,
	loadingSubmit: false
};

export default function userBasicPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_USER_BASIC_REQUEST:
		case ActionTypes.GET_USER_BASIC_SUCCESS:
		case ActionTypes.GET_USER_BASIC_ERROR:
		case ActionTypes.SUBMIT_USER_BASIC_REQUEST:
		case ActionTypes.SUBMIT_USER_BASIC_SUCCESS:
		case ActionTypes.SUBMIT_USER_BASIC_ERROR:
		case ActionTypes.DELETE_USER_BASIC_ERROR:
		case ActionTypes.DELETE_USER_BASIC_SUCCESS:
		case ActionTypes.DELETE_USER_BASIC_REQUEST:
		case ActionTypes.GET_GROUPS_FOR_USER_REQUEST:
		case ActionTypes.GET_GROUPS_FOR_USER_ERROR:
		case ActionTypes.GET_GROUPS_FOR_USER_SUCCESS:
		case ActionTypes.GET_DOORS_FOR_USER_REQUEST:
		case ActionTypes.GET_DOORS_FOR_USER_ERROR:
		case ActionTypes.GET_DOORS_FOR_USER_SUCCESS:
		case ActionTypes.SUSPEND_USER_BASIC_REQUEST:
		case ActionTypes.SUSPEND_USER_BASIC_SUCCESS:
		case ActionTypes.SUSPEND_USER_BASIC_ERROR:
		case ActionTypes.UNSUSPEND_USER_BASIC_REQUEST:
		case ActionTypes.UNSUSPEND_USER_BASIC_SUCCESS:
		case ActionTypes.UNSUSPEND_USER_BASIC_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USER_BASIC_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_USER_BASIC_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}