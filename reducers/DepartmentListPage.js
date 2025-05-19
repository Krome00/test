import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
	departments: [],
	loading: false
};

export default function departmentListPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_DEPARTMENT_LIST_REQUEST:
		case ActionTypes.GET_DEPARTMENT_LIST_SUCCESS:
		case ActionTypes.GET_DEPARTMENT_LIST_ERROR:
			return{
				...state,
				...action.payload
			};
		default:
			return state;
	}
}