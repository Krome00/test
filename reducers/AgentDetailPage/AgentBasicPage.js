import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	agent: null,
	doors: [],
	loading: false,
	loadingSubmit: false
};

export default function agentBasicPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_AGENT_BY_ID_REQUEST:
		case ActionTypes.GET_AGENT_BY_ID_SUCCESS:
		case ActionTypes.GET_AGENT_BY_ID_ERROR:
		case ActionTypes.GET_DOORS_FOR_AGENT_REQUEST:
		case ActionTypes.GET_DOORS_FOR_AGENT_SUCCESS:
		case ActionTypes.GET_DOORS_FOR_AGENT_ERROR:
		case ActionTypes.SUBMIT_AGENT_REQUEST:
		case ActionTypes.SUBMIT_AGENT_SUCCESS:
		case ActionTypes.SUBMIT_AGENT_ERROR:	
		case ActionTypes.UPDATE_AGENT_PASSWORD_REQUEST:
		case ActionTypes.UPDATE_AGENT_PASSWORD_SUCCESS:
		case ActionTypes.UPDATE_AGENT_PASSWORD_ERROR:
		case ActionTypes.SUSPEND_AGENT_BY_ID_REQUEST:
		case ActionTypes.SUSPEND_AGENT_BY_ID_SUCCESS:
		case ActionTypes.SUSPEND_AGENT_BY_ID_ERROR:
		case ActionTypes.UNSUSPEND_AGENT_BY_ID_REQUEST:
		case ActionTypes.UNSUSPEND_AGENT_BY_ID_SUCCESS:
		case ActionTypes.UNSUSPEND_AGENT_BY_ID_ERROR:
			return{
				...state,
				...action.payload
			};
		case ActionTypes.RESET_AGENT_DETAIL_META:
			return{
				...state,
				meta: null
			};
		case ActionTypes.RESET_AGENT_DETAIL_PAGE:
			return initialState;
		default:
			return state;
	}
}