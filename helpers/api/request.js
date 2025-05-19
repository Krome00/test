import _ from 'lodash';
import superagent from 'superagent';
import config from '../../config';
import LocalStorageHelper from '../local_storage';
import { history } from '../../store';

const getToken = () => localStorage.getItem('smartdoor_admin')
	? JSON.parse(localStorage.getItem('smartdoor_admin')).token
	: '';

const needLogout = (body) => {
	return [4031, 4032].indexOf(_.get(body, 'meta.code')) !== -1;
};

const handleReloginRedirect = () => {
	history.push(`/login?path=${history.location.pathname}${history.location.search}${history.location.hash}`);
};

export default {
	get(url, query = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.get(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Cache-Control', 'no-cache')
				.set('Pragma', 'no-cache')
				.set('Authorization', `Bearer ${getToken()}`)
				.set('Department-ID', LocalStorageHelper.getDepartmentId())
				.query(query)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					if (needLogout(result.body)) {
						handleReloginRedirect();
						return;
					}
					resolve(result.body);
				});
		});
	},
	post(url, body = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.post(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${getToken()}`)
				.set('Department-ID', LocalStorageHelper.getDepartmentId())
				.send(body)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					if (needLogout(result.body)) {
						handleReloginRedirect();
						return;
					}
					resolve(result.body);
				});
		});
	},
	put(url, body = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.put(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${getToken()}`)
				.set('Department-ID', LocalStorageHelper.getDepartmentId())
				.send(body)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					if (needLogout(result.body)) {
						handleReloginRedirect();
						return;
					}
					resolve(result.body);
				});
		});
	},
	patch(url, body = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.patch(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${getToken()}`)
				.set('Department-ID', LocalStorageHelper.getDepartmentId())
				.send(body)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					if (needLogout(result.body)) {
						handleReloginRedirect();
						return;
					}
					resolve(result.body);
				});
		});
	},
	delete(url, query = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.del(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${getToken()}`)
				.set('Department-ID', LocalStorageHelper.getDepartmentId())
				.query(query)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					if (needLogout(result.body)) {
						handleReloginRedirect();
						return;
					}
					resolve(result.body);
				});
		});
	},
	delete(url, query, body = {}) {
		return new Promise(function (resolve, reject) {
			superagent
				.del(`${config.api}${url}`)
				.set('Accept', 'application/json')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${getToken()}`)
				.set('Department-ID', LocalStorageHelper.getDepartmentId())
				.query(query)
				.send(body)
				.end((error, result) => {
					if (error) {
						return reject({
							error: error,
							result: result
						});
					}
					if (needLogout(result.body)) {
						handleReloginRedirect();
						return;
					}
					resolve(result.body);
				});
		});
	}
};
