import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	access_rights_users: [],
	access_rights_user: null,
	loading: false,
	loadingSubmit: false
};

export default function accessRightsUserPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_ACCESS_RIGHTS_USER_LIST_REQUEST:
		case ActionTypes.GET_ACCESS_RIGHTS_USER_LIST_SUCCESS:
		case ActionTypes.GET_ACCESS_RIGHTS_USER_LIST_ERROR:
		case ActionTypes.GET_ACCESS_RIGHTS_USER_BY_ID_REQUEST:
		case ActionTypes.GET_ACCESS_RIGHTS_USER_BY_ID_SUCCESS:
		case ActionTypes.GET_ACCESS_RIGHTS_USER_BY_ID_ERROR:
		case ActionTypes.SUBMIT_ACCESS_RIGHTS_USER_REQUEST:
		case ActionTypes.SUBMIT_ACCESS_RIGHTS_USER_SUCCESS:
		case ActionTypes.SUBMIT_ACCESS_RIGHTS_USER_ERROR:
		case ActionTypes.DELETE_ACCESS_RIGHTS_USER_BY_ID_REQUEST:
		case ActionTypes.DELETE_ACCESS_RIGHTS_USER_BY_ID_SUCCESS:
		case ActionTypes.DELETE_ACCESS_RIGHTS_USER_BY_ID_ERROR:
		case ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_REQUEST:
		case ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_ERROR:
		case ActionTypes.GET_USER_FROM_ACCESS_RIGHTS_SUCCESS:
		case ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_USER_REQUEST:
		case ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_USER_ERROR:
		case ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_USER_SUCCESS:
		case ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_USER_REQUEST:
		case ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_USER_ERROR:
		case ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_USER_SUCCESS:
			return{
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ACCESS_RIGHTS_USER_META:
			return{
				...state,
				meta: null
			};
		case ActionTypes.RESET_ACCESS_RIGHTS_USER_PAGE:
			return initialState;
		default:
			return state;
	}
}