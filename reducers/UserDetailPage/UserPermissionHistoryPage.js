import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	user_permission_histories: [],
	user_permission_history: null,
	loading: false,
	loadingSubmit: false
};

export default function userPermissionHistoryPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_USER_PERMISSION_HISTORY_LIST_REQUEST:
		case ActionTypes.GET_USER_PERMISSION_HISTORY_LIST_SUCCESS:
		case ActionTypes.GET_USER_PERMISSION_HISTORY_LIST_ERROR:
		case ActionTypes.GET_USER_PERMISSION_HISTORY_BY_ID_REQUEST:
		case ActionTypes.GET_USER_PERMISSION_HISTORY_BY_ID_SUCCESS:
		case ActionTypes.GET_USER_PERMISSION_HISTORY_BY_ID_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USER_PERMISSION_HISTORY_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_USER_PERMISSION_HISTORY_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}