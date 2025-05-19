import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	groups: null,
	loading: false,
	loadingSubmit: false
};

export default function groupListPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_GROUP_LIST_REQUEST:
		case ActionTypes.GET_GROUP_LIST_SUCCESS:
		case ActionTypes.GET_GROUP_LIST_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_GROUP_LIST_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_GROUP_LIST_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}