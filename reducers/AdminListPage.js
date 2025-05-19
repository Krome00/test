import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	admins: [],
	loading: false,
	loadingSubmit: false
};

export default function adminListPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_ADMIN_LIST_REQUEST:
		case ActionTypes.GET_ADMIN_LIST_SUCCESS:
		case ActionTypes.GET_ENTITY_BY_ID_ERROR:
			return{
				...state,
				...action.payload
			};
		default:
			return state;
	}
}