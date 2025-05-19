import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	system_message: null,
	doors: [],
	locations: [],
	loading: false,
	loadingSubmit: false
};

export default function userBasicPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_SYSTEM_MESSAGE_BY_ID_REQUEST:
		case ActionTypes.GET_SYSTEM_MESSAGE_BY_ID_SUCCESS:
		case ActionTypes.GET_SYSTEM_MESSAGE_BY_ID_ERROR:
		case ActionTypes.GET_SYSTEM_MESSAGE_LOCATIONS_REQUEST:
		case ActionTypes.GET_SYSTEM_MESSAGE_LOCATIONS_SUCCESS:
		case ActionTypes.GET_SYSTEM_MESSAGE_LOCATIONS_ERROR:
		case ActionTypes.GET_SYSTEM_MESSAGE_DOORS_REQUEST:
		case ActionTypes.GET_SYSTEM_MESSAGE_DOORS_SUCCESS:
		case ActionTypes.GET_SYSTEM_MESSAGE_DOORS_ERROR:
		case ActionTypes.SUBMIT_SYSTEM_MESSAGE_REQUEST:
		case ActionTypes.SUBMIT_SYSTEM_MESSAGE_SUCCESS:
		case ActionTypes.SUBMIT_SYSTEM_MESSAGE_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_SYSTEM_MESSAGE_DETAIL_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_SYSTEM_MESSAGE_DETAIL_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}