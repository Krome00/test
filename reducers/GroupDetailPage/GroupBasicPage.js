import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	group: null,
	departments: [],
	loading: false,
	loadingSubmit: false
};

export default function groupBasicPageReducer(state = initialState, action){
	switch(action.type) {
		case ActionTypes.GET_GROUP_BY_ID_REQUEST:
		case ActionTypes.GET_GROUP_BY_ID_SUCCESS:
		case ActionTypes.GET_GROUP_BY_ID_ERROR:
		case ActionTypes.SUBMIT_GROUP_REQUEST:
		case ActionTypes.SUBMIT_GROUP_SUCCESS:
		case ActionTypes.SUBMIT_GROUP_ERROR:
		case ActionTypes.SUSPEND_GROUP_BY_ID_REQUEST:
		case ActionTypes.SUSPEND_GROUP_BY_ID_SUCCESS:
		case ActionTypes.SUSPEND_GROUP_BY_ID_ERROR:
		case ActionTypes.UNSUSPEND_GROUP_BY_ID_REQUEST:
		case ActionTypes.UNSUSPEND_GROUP_BY_ID_SUCCESS:
		case ActionTypes.UNSUSPEND_GROUP_BY_ID_ERROR:
			return{
				...state,
				...action.payload
			};
		case ActionTypes.RESET_GROUP_DETAIL_META:
			return{
				...state,
				meta: null
			};
		case ActionTypes.RESET_GROUP_DETAIL_PAGE:
			return initialState;
		default:
			return state;
	}
}