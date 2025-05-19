import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	access_rights_users: [],
	loading: false,
	loadingSubmit: false
};

export default function userAccessRightsPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.GET_USER_ACCESS_RIGHTS_LIST_REQUEST:
		case ActionTypes.GET_USER_ACCESS_RIGHTS_LIST_SUCCESS:
		case ActionTypes.GET_USER_ACCESS_RIGHTS_LIST_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_USER_ACCESS_RIGHTS_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_USER_ACCESS_RIGHTS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}