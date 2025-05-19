import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getEntityAccessRightsByGroupList(query){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_ENTITY_ACCESS_RIGHTS_BY_GROUP_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_group.getAccessRightsGroups(query);
		if(response.meta.code !== 200){
			dispatch({
				type: ActionTypes.GET_ENTITY_ACCESS_RIGHTS_BY_GROUP_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { access_rights_groups } = response.data;

		dispatch({
			type: ActionTypes.GET_ENTITY_ACCESS_RIGHTS_BY_GROUP_SUCCESS,
			payload: {
				loading: false,
				access_rights_groups
			}
		});
	};
}

export function onSubmit(fields){
	return async (dispatch, getState) => {
		const { access_rights_groups } = getState().entityDetailPage.entityAccessRightsByGroupReducer;

		dispatch({
			type: ActionTypes.SUBMIT_ENTITY_ACCESS_RIGHTS_BY_GROUP_REQUEST,
			loadingSubmit: true
		});

		const body = {
			accessRightsByGroup: {
				...fields
			}
		};
		let response;
		let new_access_rights = [...access_rights_groups];

		if(fields.id){
			let currIndex;
			// Getting index 
			access_rights_groups.map((access_right, index) => {
				if(access_right._id === fields.id){
					currIndex = index;
					return access_right;
				}
			});

			response = await API.access_rights_group.updateAccessRightsGroupById(fields.id, body);

			if(response.meta.code !== 200){
				return dispatch({
					type: ActionTypes.SUBMIT_ENTITY_ACCESS_RIGHTS_BY_GROUP_ERROR,
					payload: {
						loadingSubmit: false,
						meta: response.meta
					}
				});
			}

			const { access_rights_group } = response.data;
			new_access_rights[currIndex] = access_rights_group;

		} else {
			response = await API.access_rights_group.createAccessRightsGroup(body);
			if(response.meta.code !== 200){
				return dispatch({
					type: ActionTypes.SUBMIT_ENTITY_ACCESS_RIGHTS_BY_GROUP_ERROR,
					payload: {
						loadingSubmit: false,
						meta: response.meta
					}
				});
			};
			const { access_rights_group } = response.data;
			new_access_rights.push(access_rights_group);
		}

		dispatch({
			type: ActionTypes.SUBMIT_ENTITY_ACCESS_RIGHTS_BY_GROUP_SUCCESS,
			payload: {
				loadingSubmit: false,
				access_rights_groups: new_access_rights,
				meta: response.meta
			}
		});
	};
}

export function deleteAccessRightsGroupById(id){
	return async (dispatch, getState) => {
		const { access_rights_groups } = getState().entityDetailPage.entityAccessRightsByGroupReducer;
		dispatch({
			type: ActionTypes.DELETE_ENTITY_ACCESS_RIGHTS_BY_GROUP_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.access_rights_group.deleteAccessRightsGroupById({ id });

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.DELETE_ENTITY_ACCESS_RIGHTS_BY_GROUP_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const new_access_rights = access_rights_groups.filter( access_rights_group => access_rights_group._id !== id);

		dispatch({
			type: ActionTypes.DELETE_ENTITY_ACCESS_RIGHTS_BY_GROUP_SUCCESS,
			payload: {
				loading: false,
				access_rights_groups: new_access_rights,
				meta: response.meta
			}
		});
	};
}