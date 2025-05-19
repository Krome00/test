import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	admin_roles: [],
	loading: false,
	loadingSubmit: false
};

export default function locationAdminRolesPage(state=initialState, action) {
	switch(action.type) {
		case ActionTypes.GET_ADMIN_ROLES_BY_LOCATION_REQUEST:
		case ActionTypes.GET_ADMIN_ROLES_BY_LOCATION_SUCCESS:
		case ActionTypes.GET_ADMIN_ROLES_BY_LOCATION_ERROR:
		case ActionTypes.SUBMIT_ADMIN_ROLES_BY_LOCATION_REQUEST:
		case ActionTypes.SUBMIT_ADMIN_ROLES_BY_LOCATION_SUCCESS:
		case ActionTypes.SUBMIT_ADMIN_ROLES_BY_LOCATION_ERROR:
		case ActionTypes.REACTIVATE_LOCATION_ADMIN_REQUEST:
		case ActionTypes.REACTIVATE_LOCATION_ADMIN_SUCCESS:
		case ActionTypes.REACTIVATE_LOCATION_ADMIN_ERROR:
		case ActionTypes.SUSPEND_LOCATION_ADMIN_REQUEST:
		case ActionTypes.SUSPEND_LOCATION_ADMIN_SUCCESS:
		case ActionTypes.SUSPEND_LOCATION_ADMIN_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_LOCATION_ADMIN_ROLE_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_LOCATION_ADMIN_ROLE_PAGE:
			return initialState;
		default: 
			return state;
	}
}