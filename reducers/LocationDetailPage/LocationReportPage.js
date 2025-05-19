import * as ActionTypes from '../../constants/ActionTypes';
const initialState = {
	reports: [],
	loading: false,
	total: 0,
	page: null,
	limit: null,
	count: 0
};

export default function locationReportPageReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.DOWNLOAD_LOCATION_REPORTS_REQUEST:
		case ActionTypes.DOWNLOAD_LOCATION_REPORTS_ERROR:
		case ActionTypes.DOWNLOAD_LOCATION_REPORTS_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case ActionTypes.RESET_DOWNLOAD_LOCATION_REPORTS_META:
			return {
				...state,
				meta: null
			};
		case ActionTypes.RESET_DOWNLOAD_LOCATION_REPORTS_PAGE:
			return {
				...initialState
			};
		default:
			return state;
	}
}
