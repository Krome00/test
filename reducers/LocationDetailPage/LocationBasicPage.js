import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	location: null,
	departments: [],
	loading: false,
	loadingSubmit: false
};

export default function locationBasicPageReducer(state = initialState, action){
	switch(action.type){
		case ActionTypes.GET_LOCATION_BY_ID_REQUEST:
		case ActionTypes.GET_LOCATION_BY_ID_SUCCESS:
		case ActionTypes.GET_LOCATION_BY_ID_ERROR:
		case ActionTypes.SUBMIT_LOCATION_REQUEST:
		case ActionTypes.SUBMIT_LOCATION_SUCCESS:
		case ActionTypes.SUBMIT_LOCATION_ERROR:
		case ActionTypes.DELETE_LOCATION_BY_ID_REQUEST:
		case ActionTypes.DELETE_LOCATION_BY_ID_SUCCESS:
		case ActionTypes.DELETE_LOCATION_BY_ID_ERROR:
		case ActionTypes.GET_LOCATION_ENTITIES_REQUEST:
		case ActionTypes.GET_LOCATION_ENTITIES_SUCCESS:
		case ActionTypes.GET_LOCATION_ENTITIES_ERROR:
		case ActionTypes.GET_LOCATION_DEPARTMENTS_REQUEST:
		case ActionTypes.GET_LOCATION_DEPARTMENTS_SUCCESS:
		case ActionTypes.GET_LOCATION_DEPARTMENTS_ERROR:
		case ActionTypes.SUSPEND_LOCATION_BY_ID_REQUEST:
		case ActionTypes.SUSPEND_LOCATION_BY_ID_SUCCESS:
		case ActionTypes.SUSPEND_LOCATION_BY_ID_ERROR:
		case ActionTypes.UNSUSPEND_LOCATION_BY_ID_REQUEST:
		case ActionTypes.UNSUSPEND_LOCATION_BY_ID_SUCCESS:
		case ActionTypes.UNSUSPEND_LOCATION_BY_ID_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_LOCATION_DETAIL_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_LOCATION_DETAIL_PAGE:
			return initialState;
		default:
			return state;
	}
}