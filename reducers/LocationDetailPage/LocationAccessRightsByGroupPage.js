import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	access_rights_groups: [],
	groups: [],
	loading: false,
	loadingSubmit: false
};

export default function locationAccessRightsGroupPage(state = initialState, action){
	switch(action.type){
		case ActionTypes.GET_LOCATION_ACCESS_RIGHTS_BY_GROUP_REQUEST:
		case ActionTypes.GET_LOCATION_ACCESS_RIGHTS_BY_GROUP_SUCCESS:
		case ActionTypes.GET_LOCATION_ACCESS_RIGHTS_BY_GROUP_ERROR:
		case ActionTypes.SUBMIT_LOCATION_ACCESS_RIGHTS_BY_GROUP_REQUEST:
		case ActionTypes.SUBMIT_LOCATION_ACCESS_RIGHTS_BY_GROUP_SUCCESS:
		case ActionTypes.SUBMIT_LOCATION_ACCESS_RIGHTS_BY_GROUP_ERROR:
		case ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_GROUP_REQUEST:
		case ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_GROUP_SUCCESS:
		case ActionTypes.SUSPEND_LOCATION_ACCESS_RIGHTS_BY_GROUP_ERROR:
		case ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_GROUP_REQUEST:
		case ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_GROUP_SUCCESS:
		case ActionTypes.REACTIVATE_LOCATION_ACCESS_RIGHTS_BY_GROUP_ERROR:
		case ActionTypes.DELETE_LOCATION_ACCESS_RIGHTS_BY_GROUP_REQUEST:
		case ActionTypes.DELETE_LOCATION_ACCESS_RIGHTS_BY_GROUP_SUCCESS:
		case ActionTypes.DELETE_LOCATION_ACCESS_RIGHTS_BY_GROUP_ERROR:
		case ActionTypes.GET_LOCATION_ACCESS_RIGHTS_BY_GROUP_GROUPS_REQUEST:
		case ActionTypes.GET_LOCATION_ACCESS_RIGHTS_BY_GROUP_GROUPS_SUCCESS:
		case ActionTypes.GET_LOCATION_ACCESS_RIGHTS_BY_GROUP_GROUPS_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_LOCATION_ACCESS_RIGHTS_BY_GROUP_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_LOCATION_ACCESS_RIGHTS_BY_GROUP_PAGE:
			return initialState;
		default:
			return state;
	}

}