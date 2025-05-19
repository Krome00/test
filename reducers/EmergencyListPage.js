import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	emergencies: [],
	loading: false
};

export default function emergencyListPageReducer(state = initialState, action){
	switch(action.type){
		case ActionTypes.GET_EMERGENCY_LIST_REQUEST:
		case ActionTypes.GET_EMERGENCY_LIST_SUCCESS:
		case ActionTypes.GET_EMERGENCY_LIST_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_EMERGENCY_LIST_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_EMERGENCY_LIST_PAGE:
			return initialState;
		default:
			return state;
	}
}