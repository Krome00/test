import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	users: [],
	loading: false,
	loadingSubmit: false
};

export default function entityUserPageReducer(state = initialState, action){
	switch(action.type){
		case ActionTypes.GET_USER_ENTITY_MAPPINGS_BY_ENTITY_ID_REQUEST:
		case ActionTypes.GET_USER_ENTITY_MAPPINGS_BY_ENTITY_ID_SUCCESS:
		case ActionTypes.GET_USER_ENTITY_MAPPINGS_BY_ENTITY_ID_ERROR:
		case ActionTypes.CREATE_USER_ENTITY_MAPPING_REQUEST:
		case ActionTypes.CREATE_USER_ENTITY_MAPPING_SUCCESS:
		case ActionTypes.CREATE_USER_ENTITY_MAPPING_ERROR:
		case ActionTypes.DELETE_USER_ENTITY_MAPPING_BY_ID_REQUEST:
		case ActionTypes.DELETE_USER_ENTITY_MAPPING_BY_ID_SUCCESS:
		case ActionTypes.DELETE_USER_ENTITY_MAPPING_BY_ID_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ENTITY_USER_META:
			return{
				...state,
				meta: null
			};
		case ActionTypes.RESET_ENTITY_USER_PAGE:
			return initialState;
		default: 
			return state;
	}
}