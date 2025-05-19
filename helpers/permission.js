import LocalStorageHelper from './local_storage';

const PermissionHelper = {
	isSystemAdministratorOfGroup({ groupId }) {
		const groupIds = LocalStorageHelper.getSystemAdministratorGroupIds();
		return groupIds.indexOf(groupId) !== -1;
	},
	isFacilityAdministratorOfGroup({ groupId }) {
		const groupIds = LocalStorageHelper.getFacilityAdministratorGroupIds();
		return groupIds.indexOf(groupId) !== -1;
	},
	isSuperUser() {
		return LocalStorageHelper.getSimplifiedAdminRoles().indexOf('super_user') !== -1;
	},
	isSystemAdministrator() {
		return LocalStorageHelper.getSimplifiedAdminRoles().indexOf('system_administrator') !== -1;
	},
	isFacilityAdministrator() {
		return LocalStorageHelper.getSimplifiedAdminRoles().indexOf('facility_administrator') !== -1;
	},
	canEditRoom({ room }) {
		if (
			PermissionHelper.isSuperUser()
			|| PermissionHelper.isSystemAdministratorOfGroup({ groupId: room.group_id })
			|| PermissionHelper.isFacilityAdministratorOfGroup({ groupId: room.group_id })
		) {
			return true;
		}
		return false;
	},
	canAddRoom() {
		return (
			PermissionHelper.isSuperUser()
			|| PermissionHelper.isSystemAdministrator()
			|| PermissionHelper.isFacilityAdministrator()
		);
	}
};

export default PermissionHelper;
