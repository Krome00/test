import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import LocalStorageHelper from '../../helpers/local_storage';
import API from '../../helpers/api';

export function getGroupById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_GROUP_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.groups.getGroupById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_GROUP_BY_ID_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		const { group } = response.data;

		dispatch({
			type: ActionTypes.GET_GROUP_BY_ID_SUCCESS,
			payload: {
				group,
				loading: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { group } = getState().groupDetailPage.groupBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_GROUP_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			group: {
				...fields
			}
		};

		let response;
		if(group){
			body.group.updated_at = group.updated_at;
			response = await API.groups.updateGroupById(group._id, body);
		} else {
			response = await API.groups.createGroup(body);
		}

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_GROUP_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		const { group: newData } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_GROUP_SUCCESS,
			payload: {
				meta: response.meta,
				group: newData,
				loadingSubmit: false
			}
		});

		dispatch(push(`/groups/id/basic?id=${newData._id}`));

	};
}

export function suspendGroupById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUSPEND_GROUP_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.groups.suspendGroupById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUSPEND_GROUP_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { group } = response.data;

		dispatch({
			type: ActionTypes.SUSPEND_GROUP_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta,
				group
			}
		});
	};
}

export function unsuspendGroupById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UNSUSPEND_GROUP_BY_ID_REQUEST,
			payload: {
				loading: false
			}
		});

		const response = await API.groups.unsuspendGroupById(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.UNSUSPEND_GROUP_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { group } = response.data;

		dispatch({
			type: ActionTypes.UNSUSPEND_GROUP_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta,
				group
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_GROUP_DETAIL_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_GROUP_DETAIL_PAGE
		});
	};
}

export function navigateGroupDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/groups/id/basic?id=${id}`));
	};
}

export function navigateToGroupListPage() {
	return async dispatch => {
		dispatch(push('/groups'));
	};
}