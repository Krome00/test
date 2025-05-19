import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	department: null,
	loading: false,
	loadingSubmit: false
};

export default function departmentBasicPageReducer(state = initialState, action) {
	switch(action.type){
		case ActionTypes.GET_DEPARTMENT_BY_ID_REQUEST:
		case ActionTypes.GET_DEPARTMENT_BY_ID_SUCCESS:
		case ActionTypes.GET_DEPARTMENT_BY_ID_ERROR:
			return{
				...state,
				...action.payload
			};
		case ActionTypes.RESET_DEPARTMENT_DETAIL_PAGE:
			return initialState;
		default:
			return state;
	}
}