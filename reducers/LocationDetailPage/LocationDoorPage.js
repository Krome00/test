import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	doors: [],
	door: null,
	loading: false,
	loadingSubmit: false
};

export default function doorPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_DOOR_LIST_REQUEST:
		case ActionTypes.GET_DOOR_LIST_SUCCESS:
		case ActionTypes.GET_DOOR_LIST_ERROR:
			return{
				...state,
				...action.payload
			};
		case ActionTypes.RESET_DOOR_META:
			return{
				...state,
				meta: null
			};
		case ActionTypes.RESET_DOOR_PAGE:
			return initialState;
		default:
			return state;
	}
}