import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	users: [],
	loading: false
};

export default function userListPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_USER_LIST_REQUEST:
		case ActionTypes.GET_USER_LIST_SUCCESS:
		case ActionTypes.GET_USER_LIST_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USER_LIST_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_USER_LIST_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}