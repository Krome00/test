import moment from 'moment';
import config from './../config';

const AuthHelper = {
	isAuthenticated() {
		const jsonData = JSON.parse(localStorage.getItem('smartdoor_admin'));
		if (!jsonData) {
			return false;
		}

		const { token, last_login } = jsonData;
		const now = moment();

		if (token && last_login) {
			const tokenLifeInSeconds = now.diff(moment(last_login), 'seconds');
			return tokenLifeInSeconds < config.loginTimeout;
		}

		return false;
	}
};

export default AuthHelper;
