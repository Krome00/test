import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	custom_authentication_method_to_user_maps: [],
	custom_authentication_method_to_user_map: null,
	qr_code: null,
	qrcode_id: null,
	loadingQR: false,
	loading: false,
	loadingSubmit: false
};

export default function userAuthenticationPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_USER_AUTHENTICATIONS_REQUEST:
		case ActionTypes.GET_USER_AUTHENTICATIONS_SUCCESS:
		case ActionTypes.GET_USER_AUTHENTICATIONS_ERROR:
		case ActionTypes.SUBMIT_USER_AUTHENTICATION_REQUEST:
		case ActionTypes.SUBMIT_USER_AUTHENTICATION_SUCCESS:
		case ActionTypes.SUBMIT_USER_AUTHENTICATION_ERROR:
		case ActionTypes.UNSUSPEND_USER_AUTHENTICATION_REQUEST:
		case ActionTypes.UNSUSPEND_USER_AUTHENTICATION_ERROR:
		case ActionTypes.UNSUSPEND_USER_AUTHENTICATION_SUCCESS:
		case ActionTypes.SUSPEND_USER_AUTHENTICATION_REQUEST:
		case ActionTypes.SUSPEND_USER_AUTHENTICATION_ERROR:
		case ActionTypes.SUSPEND_USER_AUTHENTICATION_SUCCESS:
		case ActionTypes.GET_CUSTOM_AUTHENTICATIONS_ERROR:
		case ActionTypes.GET_CUSTOM_AUTHENTICATIONS_REQUEST:
		case ActionTypes.GET_CUSTOM_AUTHENTICATIONS_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USER_AUTHENTICATION_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_USER_AUTHENTICATION_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}