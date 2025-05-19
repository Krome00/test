import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	admin_roles: null,
	departments: [],
	loading: false,
	loadingSubmit: false
};

export default function adminDepartmentPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_ADMIN_ROLES_LIST_REQUEST:
		case ActionTypes.GET_ADMIN_ROLES_LIST_SUCCESS:
		case ActionTypes.GET_ADMIN_ROLES_LIST_ERROR:	
		case ActionTypes.GET_ADMIN_ROLES_BY_ID_REQUEST:
		case ActionTypes.GET_ADMIN_ROLES_BY_ID_SUCCESS:
		case ActionTypes.GET_ADMIN_ROLES_BY_ID_ERROR:	
		case ActionTypes.SUBMIT_ADMIN_ROLES_REQUEST:
		case ActionTypes.SUBMIT_ADMIN_ROLES_SUCCESS:
		case ActionTypes.SUBMIT_ADMIN_ROLES_ERROR:	
		case ActionTypes.UNSUSPEND_ADMIN_ROLES_BY_ID_REQUEST:
		case ActionTypes.UNSUSPEND_ADMIN_ROLES_BY_ID_SUCCESS:
		case ActionTypes.UNSUSPEND_ADMIN_ROLES_BY_ID_ERROR:
		case ActionTypes.SUSPEND_ADMIN_ROLES_BY_ID_REQUEST:
		case ActionTypes.SUSPEND_ADMIN_ROLES_BY_ID_SUCCESS:
		case ActionTypes.SUSPEND_ADMIN_ROLES_BY_ID_ERROR:
		case ActionTypes.GET_DEPARTMENTS_FROM_ADMIN_ROLES_REQUEST:
		case ActionTypes.GET_DEPARTMENTS_FROM_ADMIN_ROLES_ERROR:
		case ActionTypes.GET_DEPARTMENTS_FROM_ADMIN_ROLES_SUCCESS:
		case ActionTypes.RESET_ADMIN_ROLES_DETAIL_PAGE:
		case ActionTypes.RESET_ADMIN_ROLES_DETAIL_META:
			return{
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ADMIN_DETAIL_META:
			return{
				...state,
				meta: null
			};
		case ActionTypes.RESET_ADMIN_DETAIL_PAGE:
			return initialState;
		default:
			return state;
	}
}