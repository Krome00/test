import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	events: [],
	loading: false
};

export default function eventListPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_EVENTS_LIST_REQUEST:
		case ActionTypes.GET_EVENTS_LIST_SUCCESS:
		case ActionTypes.GET_EVENTS_LIST_ERROR:
			return{
				...state,
				...action.payload
			};
		default:
			return state;
	}
}
