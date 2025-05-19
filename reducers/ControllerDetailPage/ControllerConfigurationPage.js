import * as ActionTypes from '../../constants/ActionTypes';

const initialState = {
	controller: null,
	loading: false,
	loadingSubmit: false
};

export default function controllerConfigurationPageReducer(state = initialState, action){
	switch (action.type) {
		case ActionTypes.SUBMIT_CONTROLLER_CONFIGURATION_REQUEST:
		case ActionTypes.SUBMIT_CONTROLLER_CONFIGURATION_SUCCESS:
		case ActionTypes.SUBMIT_CONTROLLER_CONFIGURATION_ERROR:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_CONTROLLER_CONFIGURATION_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_CONTROLLER_CONFIGURATION_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}