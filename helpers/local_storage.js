import _ from 'lodash';

const LocalStorageHelper = {
	getDepartment() {
		const department = localStorage.getItem('department');
		if (department) return department;

		const departments = JSON.parse(localStorage.getItem('smartdoor_admin_departments'));
		const newDepartment = JSON.stringify(departments && departments.length === 0 ? '' : departments[0]);
		localStorage.setItem('department', newDepartment);

		return newDepartment;
	},
	getDepartmentObject(department_id) {
		const departments = JSON.parse(localStorage.getItem('smartdoor_admin_departments'));
		return _.find(departments, ['_id', department_id]);
	},
	setDepartment(department_id) {
		const department = LocalStorageHelper.getDepartmentObject(department_id);
		localStorage.setItem('department', JSON.stringify(department));
	},
	getDepartmentId() {
		const departmentString = localStorage.getItem('department');
		const department = JSON.parse(departmentString);
		return department && department._id;
	},
	getEmail() {
		try {
			const jsonData = JSON.parse(localStorage.getItem('crf_admin'));
			return jsonData.admin;
		} catch (e) {

		}
		return '';
	},
	getAdminId() {
		const jsonData = JSON.parse(localStorage.getItem('smartdoor_admin'));
		return jsonData.admin._id;
	}
};

export default LocalStorageHelper;
