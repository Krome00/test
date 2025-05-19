import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	loadingExternal: false,
	external_user: null
};

export default function externalUserPageReducer(state = initialState, action){
	switch(action.type){
		case ActionTypes.GET_EXTERNAL_USER_BY_ID_SUCCESS:
		case ActionTypes.GET_EXTERNAL_USER_BY_ID_ERROR:
		case ActionTypes.GET_EXTERNAL_USER_BY_ID_REQUEST:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_EXTERNAL_USER_PAGE:
			return initialState;
		default: 
			return state;
	}
}