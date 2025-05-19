import { push } from 'connected-react-router';

export function navigateToListPage() {
	return async dispatch => {
		dispatch(push('/call-request'));
	};
}