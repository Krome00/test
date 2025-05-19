import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	access_rights_groups: [],
	loading: false,
	loadingSubmit: false
};

export default function entityAccessRightsByGroupReducer(state = initialState, action){
	switch(action.type){
		case ActionTypes.GET_ENTITY_ACCESS_RIGHTS_BY_GROUP_REQUEST:
		case ActionTypes.GET_ENTITY_ACCESS_RIGHTS_BY_GROUP_SUCCESS:
		case ActionTypes.GET_ENTITY_ACCESS_RIGHTS_BY_GROUP_ERROR:
		case ActionTypes.SUBMIT_ENTITY_ACCESS_RIGHTS_BY_GROUP_REQUEST:
		case ActionTypes.SUBMIT_ENTITY_ACCESS_RIGHTS_BY_GROUP_SUCCESS:
		case ActionTypes.SUBMIT_ENTITY_ACCESS_RIGHTS_BY_GROUP_ERROR:
		case ActionTypes.DELETE_ENTITY_ACCESS_RIGHTS_BY_GROUP_REQUEST:
		case ActionTypes.DELETE_ENTITY_ACCESS_RIGHTS_BY_GROUP_SUCCESS:
		case ActionTypes.DELETE_ENTITY_ACCESS_RIGHTS_BY_GROUP_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ENTITY_ACCESS_RIGHTS_BY_GROUP_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_ENTITY_ACCESS_RIGHTS_BY_GROUP_PAGE:
			return initialState;
		default:
			return state;
	}

}