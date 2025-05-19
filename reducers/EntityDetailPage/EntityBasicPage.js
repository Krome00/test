import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	entity: null,
	locations: [],
	loading: false,
	loadingSubmit: false
};

export default function entityDetailPageReducer(state = initialState, action){
	switch(action.type) {
		case ActionTypes.GET_ENTITY_BY_ID_REQUEST:
		case ActionTypes.GET_ENTITY_BY_ID_SUCCESS:
		case ActionTypes.GET_ENTITY_BY_ID_ERROR:
		case ActionTypes.SUBMIT_ENTITY_REQUEST:
		case ActionTypes.SUBMIT_ENTITY_SUCCESS:
		case ActionTypes.SUBMIT_ENTITY_ERROR:
		case ActionTypes.DELETE_ENTITY_BY_ID_REQUEST:
		case ActionTypes.DELETE_ENTITY_BY_ID_SUCCESS:
		case ActionTypes.DELETE_ENTITY_BY_ID_ERROR:
		case ActionTypes.GET_ENTITY_LOCATION_LIST_REQUEST:
		case ActionTypes.GET_ENTITY_LOCATION_LIST_SUCCESS:
		case ActionTypes.GET_ENTITY_LOCATION_LIST_ERROR:
		case ActionTypes.SUSPEND_ENTITY_BY_ID_REQUEST:
		case ActionTypes.SUSPEND_ENTITY_BY_ID_SUCCESS:
		case ActionTypes.SUSPEND_ENTITY_BY_ID_ERROR:
		case ActionTypes.UNSUSPEND_ENTITY_BY_ID_REQUEST:
		case ActionTypes.UNSUSPEND_ENTITY_BY_ID_SUCCESS:
		case ActionTypes.UNSUSPEND_ENTITY_BY_ID_ERROR:
			return{
				...state,
				...action.payload
			};
		case ActionTypes.RESET_ENTITY_DETAIL_META:
			return{
				...state,
				meta: null
			};
		case ActionTypes.RESET_ENTITY_DETAIL_PAGE:
			return initialState;
		default:
			return state;
	}
}