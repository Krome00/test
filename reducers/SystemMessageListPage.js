import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	system_messages: [],
	loading: false,
	loadingSubmit: false
};

export default function locationListPageReducer(state = initialState, action){
	switch(action.type){
		case ActionTypes.GET_SYSTEM_MESSAGE_LIST_REQUEST:
		case ActionTypes.GET_SYSTEM_MESSAGE_LIST_SUCCESS:
		case ActionTypes.GET_SYSTEM_MESSAGE_LIST_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_SYSTEM_MESSAGE_LIST_META:
			return {
				 ...state,
				 meta: null
			};
		case ActionTypes.RESET_SYSTEM_MESSAGE_LIST_PAGE:
			return {
				...initialState
			};
		default: 
			return state;
	}
}