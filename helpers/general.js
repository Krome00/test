import _ from 'lodash';

const GeneralHelper = {
	isEmailValid(email) {
		const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailRegex.test(email);
	},
	isUstEmail(email) {
		if (!email || !GeneralHelper.isEmailValid(email)) {
			return false;
		}
		return _.endsWith(email, '@ust.hk') || _.endsWith(email, '.ust.hk');
	},
	// return true if all emails are hkust emails and there are at least 1 email
	validateUSTEmailsString(emailListString) {
		if (!emailListString) {
			return false;
		}
		const emails = _.compact(emailListString.split('\n').map(e => e.trim()));
		for (let i = 0; i < emails.length; i++) {
			if (!GeneralHelper.isUstEmail(emails[i])) {
				return false;
			}
		}
		return true;
	},
	queryStringToObject(queryString) {
		if (!queryString || !_.isString(queryString)) {
			return {};
		}
		if (queryString.indexOf('?') === 0) {
			queryString = queryString.substring(1);
		}
		try {
			return JSON.parse(
				'{"' +
					decodeURI(queryString)
						.replace(/"/g, '\\"')
						.replace(/&/g, '","')
						.replace(/=/g, '":"') +
					'"}'
			);
		} catch (e) {}
		return {};
	},
	getImageBasePath() {
		const path = process.env.NODE_ENV === 'development' ? '' : '/wsdp/admin';
		return path;
	}
};

export default GeneralHelper;
