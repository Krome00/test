import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	security_features: [],
	security_feature: null,
	loadingSecurity: false,
	loadingSecuritySubmit: false,
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function controllerSecurityPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_SECURITY_FEATURES_LIST_REQUEST:
		case ActionTypes.GET_SECURITY_FEATURES_LIST_SUCCESS:
		case ActionTypes.GET_SECURITY_FEATURES_LIST_ERROR:
		case ActionTypes.SUBMIT_SECURITY_FEATURES_REQUEST:
		case ActionTypes.SUBMIT_SECURITY_FEATURES_SUCCESS:
		case ActionTypes.SUBMIT_SECURITY_FEATURES_ERROR:
		case ActionTypes.GET_SECURITY_FEATURES_BY_ID_REQUEST:
		case ActionTypes.GET_SECURITY_FEATURES_BY_ID_SUCCESS:
		case ActionTypes.GET_SECURITY_FEATURES_BY_ID_ERROR:
		case ActionTypes.GET_CUSTOM_AUTH_BY_SECURITY_FEATURES_REQUEST:
		case ActionTypes.GET_CUSTOM_AUTH_BY_SECURITY_FEATURES_ERROR:
		case ActionTypes.GET_CUSTOM_AUTH_BY_SECURITY_FEATURES_SUCCESS:
		case ActionTypes.DELETE_SECURITY_FEATURE_BY_ID_REQUEST: 
		case ActionTypes.DELETE_SECURITY_FEATURE_BY_ID_SUCCESS: 
		case ActionTypes.DELETE_SECURITY_FEATURE_BY_ID_ERROR:
			return{
				...state,
				...action.payload
			};
		case ActionTypes.RESET_SECURITY_FEATURES_DETAIL_META:
			return{
				...state,
				meta: null
			};
		case ActionTypes.RESET_SECURITY_FEATURES_DETAIL_PAGE:
			return initialState;
		default:
			return state;
	}
}