import config from '../config';
import CommonEnum from '../constants/CommonEnum';
import LabelHelper from './Label';
import PermissionHelper from './permission';

const OptionHelper = {
	// do not include priority booker all
	userRoleTypes() {
		return CommonEnum.user_roles.map(value => ({
			value,
			text: LabelHelper.userRole(value)
		})).filter(o => o.value !== 'priority_booker_all_department');
	},
	adminRoleTypes() {
		return CommonEnum.admin_roles.map(value => ({
			value,
			text: LabelHelper.adminRole(value)
		}));
	},
	// return including priority booker all
	userRoleTypeWithPBA() {
		return CommonEnum.user_roles.map(value => ({
			value,
			text: LabelHelper.userRole(value)
		}));
	},
	groupTypes() {
		return [{
			value: 'department',
			text: 'All departments'
		}, {
			value: 'staff_group',
			text: 'All staff groups'
		}, {
			value: 'student_group',
			text: 'All student groups'
		}, {
			value: 'other',
			text: 'All other groups'
		}, {
			value: 'specific_group',
			text: 'Specific Group/Department'
		}];
	},
	userRoles() {
		return [{
			value: 'any',
			text: 'Any'
		}].concat(
			CommonEnum.user_roles_no_pb_all_department.map(value => ({
				value,
				text: LabelHelper.userRole(value)
			})).filter(o => PermissionHelper.isSuperUser() || (!PermissionHelper.isSuperUser() && o.value !== 'priority_booker_all_department'))
		);
	},
	casUserTypes() {
		return [{
			value: 'any',
			text: 'Any'
		}].concat(
			CommonEnum.cas_user_types.map(value => ({
				value,
				text: LabelHelper.casUserType(value)
			})).filter(o => o.text !== '')
		);
	},
	/*
	 * opts.all - if true, then have option 'All booking types'
	 * opts.blackout - if true, then have option 'blackout
	 */
	bookingTypes(opts) {
		opts = opts || {};

		let optionsTypes = [
			opts.all && { value: 'all', text: 'All booking types' }
		].concat(
			CommonEnum.booking_types.map(value => ({
				value,
				text: LabelHelper.bookingFormType(value)
			}))
		);

		if (!config.enable_feature.music_performance) {
			optionsTypes = optionsTypes.filter(o => o.value !== 'music_performance');
		}

		if (!opts.blackout) {
			optionsTypes = optionsTypes.filter(o => o.value !== 'blackout');
		}

		return optionsTypes;
	}
};

export default OptionHelper;
