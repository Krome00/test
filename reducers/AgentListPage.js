import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	agents: [],
	loading: false,
	loadingSubmit: false,
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function agentListPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_AGENT_LIST_REQUEST:
		case ActionTypes.GET_AGENT_LIST_SUCCESS:
		case ActionTypes.GET_AGENT_LIST_ERROR:
		// case ActionTypes.GET_ENTITY_BY_ID_ERROR:
			return{
				...state,
				...action.payload
			};
		default:
			return state;
	}
}