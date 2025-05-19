import { push } from 'connected-react-router';
import * as ActionTypes from '../constants/ActionTypes';
import API from '../helpers/api';

export function getAgents({ page, limit }) {
	return async dispatch => {
		const optionsQuery = [`page=${page}`, `limit=${limit}`];
		dispatch(push(`/agents?${optionsQuery.join('&')}`));
		dispatch({
			type: ActionTypes.GET_AGENT_LIST_REQUEST,
			payload: {
				loading: true
			}
		});
        
		const response = await API.agents.getAgents({ page, limit });

		if (response.meta.code !== 200) {
			return dispatch({
				type: ActionTypes.GET_AGENT_LIST_ERROR,
				payload: {
					loading: false,
					meta: response.meta
				}
			});
		}

		const { agents } = response.data;
        
		dispatch({
			type: ActionTypes.GET_AGENT_LIST_SUCCESS,
			payload: {
				loading: false,
				agents,
				page: response.data.page,
				limit: response.data.limit,
				total: response.data.total,
				count: response.data.count
			}
		});
	};
}

export function navigateToAddPage(){
	return async dispatch => {
		dispatch(push('/agents/create'));
	};
}

export function navigateToDetailPage(id){
	return async dispatch => {
		dispatch(push(`/agents/id/basic?id=${id}`));
	};
}