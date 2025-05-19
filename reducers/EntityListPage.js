import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	entities: null,
	loading: false,
	loadingSubmit: false
};

export default function entityListPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_ENTITY_LIST_REQUEST:
		case ActionTypes.GET_ENTITY_LIST_SUCCESS:
		case ActionTypes.GET_ENTITY_LIST_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ENTITY_LIST_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_ENTITY_LIST_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}