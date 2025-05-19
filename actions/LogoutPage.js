import { push } from 'connected-react-router';
import API from '../helpers/api';

export function logout() {
	return async dispatch => {
		const res = await API.auth.logout();
		if (res.meta.code !== 200) {
			return;
		}
		localStorage.removeItem('smartdoor_admin');
		localStorage.removeItem('smartdoor_admin_departments');
		if (process.env.NODE_ENV === 'uat') {
			window.location.href = res.data.logout_url;
			return;
		}
		dispatch(push('/login'));
	};
}
