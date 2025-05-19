import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	admin: null,
	loading: false,
	loadingSubmit: false
};

export default function adminBasicPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_ADMIN_BY_ID_REQUEST:
		case ActionTypes.GET_ADMIN_BY_ID_SUCCESS:
		case ActionTypes.GET_ADMIN_BY_ID_ERROR:	
		case ActionTypes.SUBMIT_ADMIN_REQUEST:
		case ActionTypes.SUBMIT_ADMIN_SUCCESS:
		case ActionTypes.SUBMIT_ADMIN_ERROR:	
		case ActionTypes.UPDATE_ADMIN_PASSWORD_REQUEST:
		case ActionTypes.UPDATE_ADMIN_PASSWORD_SUCCESS:
		case ActionTypes.UPDATE_ADMIN_PASSWORD_ERROR:
		case ActionTypes.SUSPEND_ADMIN_BY_ID_REQUEST:
		case ActionTypes.SUSPEND_ADMIN_BY_ID_SUCCESS:
		case ActionTypes.SUSPEND_ADMIN_BY_ID_ERROR:
		case ActionTypes.UNSUSPEND_ADMIN_BY_ID_REQUEST:
		case ActionTypes.UNSUSPEND_ADMIN_BY_ID_SUCCESS:
		case ActionTypes.UNSUSPEND_ADMIN_BY_ID_ERROR:
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