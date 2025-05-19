import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getUserById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_USER_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		let response = await API.users.getUserById({ id });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_USER_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}

		let { user } = response.data;
		const { _id } = user;

		response = await API.user_group_maps.getUserGroupMapsByUserId({ user_id: _id });

		const { user_group_maps } = response.data;
		user.user_group_maps = user_group_maps;


		dispatch({
			type: ActionTypes.GET_USER_BASIC_SUCCESS,
			payload: {
				user,
				loading: false
			}
		});
	};
}

export function getGroups() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_GROUPS_FOR_USER_REQUEST,
			payload: {
				loadingDoors: true
			}
		});

		const response = await API.groups.getGroups();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_GROUPS_FOR_USER_ERROR,
				payload: {
					meta: response.meta,
					loadingDoors: false
				}
			});
		}

		const { groups } = response.data;
		
		dispatch({
			type: ActionTypes.GET_GROUPS_FOR_USER_SUCCESS,
			payload: {
				groups,
				loadingDoors: false
			}
		});
	};
}

export function getDoors() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_DOORS_FOR_USER_REQUEST,
			payload: {
				loadingGroups: true
			}
		});

		const response = await API.doors.getDoors();

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_DOORS_FOR_USER_ERROR,
				payload: {
					meta: response.meta,
					loadingGroups: false
				}
			});
		}

		const { doors } = response.data;
		
		dispatch({
			type: ActionTypes.GET_DOORS_FOR_USER_SUCCESS,
			payload: {
				doors,
				loadingGroups: false
			}
		});
	};
}

export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { user } = getState().userDetailPage.userBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_USER_BASIC_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			user: {
				...fields
			}
		};

		let response;
		if(user){
			body.user.updated_at = user.updated_at;
			response = await API.users.updateUserById(user._id, body);
		} else {
			response = await API.users.createUser(body);

		}

		if(response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUBMIT_USER_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loadingSubmit: false
				}
			});
		}

		const { user: newData } = response.data;
		dispatch({
			type: ActionTypes.SUBMIT_USER_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				user: newData,
				loadingSubmit: false
			}
		});

		dispatch(push(`/users/id/basic?id=${newData._id}`));

	};
}

export function deleteUserById(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.DELETE_USER_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.users.deleteUserById({ id });
		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.DELETE_USER_BASIC_ERROR,
				payload: {
					meta: response.meta,
					loading: false
				}
			});
		}
		dispatch({
			type: ActionTypes.DELETE_USER_BASIC_SUCCESS,
			payload: {
				meta: response.meta,
				loading: false
			}
		});
		dispatch(push('/users'));
	};
}

export function navigateToUserListPage({ state }) {
	return async dispatch => {
		dispatch(push({
			pathname: '/users',
			state
		}));
		
	};
}

export function suspendUserById(id, fields) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUSPEND_USER_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		const { suspend_start, suspend_end, suspend_type } = fields;

		const body = {
			start_at: suspend_start,
			end_at: suspend_end
		};

		let response;

		if (suspend_type === 'temporary') {
			response = await API.users.temporarilySuspendUserById(id, body);
		} else if (suspend_type === 'permanent') {
			response = await API.users.permanentlySuspendUserById(id);
		};

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUSPEND_USER_BASIC_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		let { user } = response.data;
		const { _id } = user;

		response = await API.user_group_maps.getUserGroupMapsByUserId({ user_id: _id });

		const { user_group_maps } = response.data;
		user.user_group_maps = user_group_maps;

		dispatch({
			type: ActionTypes.SUSPEND_USER_BASIC_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta,
				user
			}
		});
	};
}

export function unsuspendSuspensionByUserId(id) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UNSUSPEND_USER_BASIC_REQUEST,
			payload: {
				loading: true
			}
		});

		let response = await API.users.unsuspendSuspensionByUserId(id);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.UNSUSPEND_USER_BASIC_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		let { user } = response.data;
		const { _id } = user;

		response = await API.user_group_maps.getUserGroupMapsByUserId({ user_id: _id });

		const { user_group_maps } = response.data;
		user.user_group_maps = user_group_maps;

		dispatch({
			type: ActionTypes.UNSUSPEND_USER_BASIC_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta,
				user
			}
		});
	};
}

export function resetMeta() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_BASIC_META
		});
	};
}

export function resetPage() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_USER_BASIC_PAGE
		});
	};
}

export function navigateUserDetailPage(id) {
	return async dispatch => {
		dispatch(push(`/users/id/basic?id=${id}`));
	};
}