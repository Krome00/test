import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	emergency: null,
	doors: [],
	locations: [],
	loading: false,
	loadingSubmit: false
};

export default function emergencyBasicPageReducer(state = initialState, action){
	switch(action.type){
		case ActionTypes.GET_EMERGENCY_BY_ID_REQUEST:
		case ActionTypes.GET_EMERGENCY_BY_ID_SUCCESS:
		case ActionTypes.GET_EMERGENCY_BY_ID_ERROR:
		case ActionTypes.SUBMIT_EMERGENCY_REQUEST:
		case ActionTypes.SUBMIT_EMERGENCY_SUCCESS:
		case ActionTypes.SUBMIT_EMERGENCY_ERROR:
		case ActionTypes.DELETE_EMERGENCY_BY_ID_REQUEST:
		case ActionTypes.DELETE_EMERGENCY_BY_ID_SUCCESS:
		case ActionTypes.DELETE_EMERGENCY_BY_ID_ERROR:
		case ActionTypes.GET_EMERGENCY_LOCATION_LIST_REQUEST:
		case ActionTypes.GET_EMERGENCY_LOCATION_LIST_SUCCESS:
		case ActionTypes.GET_EMERGENCY_LOCATION_LIST_ERROR:
		case ActionTypes.GET_EMERGENCY_DOOR_LIST_REQUEST:
		case ActionTypes.GET_EMERGENCY_DOOR_LIST_SUCCESS:
		case ActionTypes.GET_EMERGENCY_DOOR_LIST_ERROR:
		case ActionTypes.SUSPEND_EMERGENCY_BY_ID_REQUEST:
		case ActionTypes.SUSPEND_EMERGENCY_BY_ID_SUCCESS:
		case ActionTypes.SUSPEND_EMERGENCY_BY_ID_ERROR:
		case ActionTypes.UNSUSPEND_EMERGENCY_BY_ID_REQUEST:
		case ActionTypes.UNSUSPEND_EMERGENCY_BY_ID_SUCCESS:
		case ActionTypes.UNSUSPEND_EMERGENCY_BY_ID_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_EMERGENCY_DETAIL_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_EMERGENCY_DETAIL_PAGE:
			return initialState;
		default:
			return state;
	}
}