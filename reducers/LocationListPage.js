import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	locations: [],
	loading: false,
	loadingSubmit: false
};

export default function locationListPageReducer(state = initialState, action){
	switch(action.type){
		case ActionTypes.GET_LOCATION_LIST_REQUEST:
		case ActionTypes.GET_LOCATION_LIST_SUCCESS:
		case ActionTypes.GET_LOCATION_LIST_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_LOCATION_LIST_META:
			return {
				 ...state,
				 meta: null
			};
		case ActionTypes.RESET_LOCATION_LIST_PAGE:
			return {
				...initialState
			};
		default: 
			return state;
	}
}