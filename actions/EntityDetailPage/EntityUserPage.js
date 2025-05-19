import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getUserEntityMappingByEntityId(entity_id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_USER_ENTITY_MAPPINGS_BY_ENTITY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.user_entity_mappings.getUserEntityMappingsByEntityId({ entity_id });
		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_USER_ENTITY_MAPPINGS_BY_ENTITY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { user_entity_mappings: users } = response.data;

		dispatch({
			type: ActionTypes.GET_USER_ENTITY_MAPPINGS_BY_ENTITY_ID_SUCCESS,
			payload: {
				loading: false,
				users
			}
		});
	};
}

export function createUserEntityMapping(fields){
	return async (dispatch, getState) => {
		const { users } = getState().entityDetailPage.entityUserPageReducer;
		dispatch({
			type: ActionTypes.CREATE_USER_ENTITY_MAPPING_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.user_entity_mappings.createUserEntityMapping(fields);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.CREATE_USER_ENTITY_MAPPING_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { user_entity_mapping: newData } = response.data;
		const updatedUsers = users.concat(newData);;
		
		dispatch({
			type: ActionTypes.CREATE_USER_ENTITY_MAPPING_SUCCESS,
			payload: {
				loading: false,
				users: updatedUsers,
				meta: response.meta
			}
		});
	};
}

export function deleteUserEntityMappingById(id){
	return async (dispatch, getState) => {
		const { users } = getState().entityDetailPage.entityUserPageReducer;

		dispatch({
			type: ActionTypes.DELETE_USER_ENTITY_MAPPING_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.user_entity_mappings.deleteUserEntityMappingById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.DELETE_USER_ENTITY_MAPPING_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const updatedData = users.filter(mapping => mapping._id !== id);

		dispatch({
			type: ActionTypes.DELETE_USER_ENTITY_MAPPING_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta,
				users: updatedData
			}
		});
	};
}