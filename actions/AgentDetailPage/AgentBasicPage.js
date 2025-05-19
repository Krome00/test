import { push } from 'connected-react-router';
import * as ActionTypes from '../../constants/ActionTypes';
import API from '../../helpers/api';

export function getAgentById(id){
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_AGENT_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.agents.getAgentById(id);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.GET_AGENT_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		};

		const { agent } = response.data;

		dispatch({
			type: ActionTypes.GET_AGENT_BY_ID_SUCCESS,
			payload: {
				loading: false,
				agent
			}
		});
	};
}

export function getDoors() {
	return async dispatch => {
		dispatch({
			type: ActionTypes.GET_DOORS_FOR_AGENT_REQUEST,
			payload: {
				loadingGroups: true
			}
		});
		const smartdoorDepartment = JSON.parse(localStorage.getItem('department'));
		const { _id: depaId } = smartdoorDepartment;
		const response = await API.doors.getDoors();
		console.log(' hakkdddoooggg desponse', response)

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_DOORS_FOR_AGENT_ERROR,
				payload: {
					meta: response.meta,
					loadingGroups: false
				}
			});
		}
		const doors = [];
		const { data } = response;
		const { doors: doorsData } = data;
		console.log('doorsData',doorsData)

		doorsData && doorsData.length && doorsData.forEach((doorsData) => {
			const { created_at,
				created_by,
				department_id,
				door_open_interval_in_second,
				location_id,
				name,
				status,
				updated_at,
				_id } = doorsData;
			
			console.log('doors sa action',doorsData);
			if (department_id === depaId){
				doors.push({
					created_at,
					created_by,
					department_id,
					door_open_interval_in_second,
					location_id,
					name,
					status,
					updated_at,
					_id
				});

			}

		});

		
		dispatch({
			type: ActionTypes.GET_DOORS_FOR_AGENT_SUCCESS,
			payload: {
				doors,
				loadingGroups: false
			}
		});
	};
}


export function onSubmit(fields) {
	return async (dispatch, getState) => {
		const { agent } = getState().agentDetailPage.agentBasicPageReducer;

		dispatch({
			type: ActionTypes.SUBMIT_AGENT_REQUEST,
			payload: {
				loadingSubmit: true
			}
		});

		const body = {
			agent: {
				...fields
			}
		};

		let response;
		if(agent){
			body.agent.updated_at = agent.updated_at;
			response = await API.agents.updateAgentById(agent._id, body);
		} else {
			response = await API.agents.createAgent(body);
		}

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.SUBMIT_AGENT_ERROR,
				payload: {
					loadingSubmit: false,
					meta: response.meta
				}
			});
		}

		const { agent: newData } = response.data;
        
		dispatch({
			type: ActionTypes.SUBMIT_AGENT_SUCCESS,
			payload: {
				agent: newData,
				loadingSubmit: false,
				meta: response.meta
			}
		});

		dispatch(push(`/agents/id/basic?id=${newData._id}`));

	};
}

export function updateAgentPasswordById(id, fields) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UPDATE_AGENT_PASSWORD_REQUEST,
			payload: {
				loading: true
			}
		});

		const body = { agent: { ...fields } };

		const response = await API.agents.updateAgentPasswordById(id, body);

		if(response.meta.code !== 200){
			return dispatch({
				type: ActionTypes.UPDATE_AGENT_PASSWORD_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		dispatch({
			type: ActionTypes.UPDATE_AGENT_PASSWORD_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta
			}
		});
	};
}

export function suspendAgentById(id, fields) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.SUSPEND_AGENT_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.agents.suspendAgentById(id, fields);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.SUSPEND_AGENT_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { agent } = response.data;

		dispatch({
			type: ActionTypes.SUSPEND_AGENT_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta,
				agent
			}
		});
	};
}

export function unsuspendAgentById(id, fields) {
	return async dispatch => {
		dispatch({
			type: ActionTypes.UNSUSPEND_AGENT_BY_ID_REQUEST,
			payload: {
				loading: true
			}
		});

		const response = await API.agents.unsuspendAgentById(id, fields);

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.UNSUSPEND_AGENT_BY_ID_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { agent } = response.data;

		dispatch({
			type: ActionTypes.UNSUSPEND_AGENT_BY_ID_SUCCESS,
			payload: {
				loading: false,
				meta: response.meta,
				agent
			}
		});
	};
}


export function resetMeta(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_AGENT_DETAIL_META
		});
	};
}

export function resetPage(){
	return async dispatch => {
		dispatch({
			type: ActionTypes.RESET_AGENT_DETAIL_PAGE
		});
	};
}


export function navigateToListPage(){
	return async dispatch => {
		dispatch(push('/agents'));
	};
}