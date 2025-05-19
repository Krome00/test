import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	access_rights_one_offs: [],
	access_rights_one_off: null,
	loading: false,
	loadingSubmit: false
};

export default function accessRightsOneOffPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_LIST_REQUEST:
		case ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_LIST_SUCCESS:
		case ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_LIST_ERROR:
		case ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_BY_ID_REQUEST:
		case ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_BY_ID_SUCCESS:
		case ActionTypes.GET_ACCESS_RIGHTS_ONE_OFF_BY_ID_ERROR:
		case ActionTypes.SUBMIT_ACCESS_RIGHTS_ONE_OFF_REQUEST:
		case ActionTypes.SUBMIT_ACCESS_RIGHTS_ONE_OFF_SUCCESS:
		case ActionTypes.SUBMIT_ACCESS_RIGHTS_ONE_OFF_ERROR:
		case ActionTypes.DELETE_ACCESS_RIGHTS_ONE_OFF_BY_ID_REQUEST:
		case ActionTypes.DELETE_ACCESS_RIGHTS_ONE_OFF_BY_ID_SUCCESS:
		case ActionTypes.DELETE_ACCESS_RIGHTS_ONE_OFF_BY_ID_ERROR:
		case ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_ONE_OFF_REQUEST:
		case ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_ONE_OFF_ERROR:
		case ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_ONE_OFF_SUCCESS:
		case ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_REQUEST:
		case ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_SUCCESS:
		case ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_ERROR:
		case ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_REQUEST:
		case ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_SUCCESS:
		case ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_ONE_OFF_ERROR:
			return{
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ACCESS_RIGHTS_ONE_OFF_META:
			return{
				...state,
				meta: null
			};
		case ActionTypes.RESET_ACCESS_RIGHTS_ONE_OFF_PAGE:
			return initialState;
		default:
			return state;
	}
}