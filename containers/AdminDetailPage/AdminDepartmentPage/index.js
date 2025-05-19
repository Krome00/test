import { connect } from 'react-redux';
import { getAdminRoleById, getAdminRolesByAdminId, onSubmit, suspendAdminRoleById, unsuspendAdminRoleById, resetMeta, resetPage, getDepartments } from '../../../actions/AdminDetailPage/AdminDepartmentPage';
import AdminDepartmentPage from './AdminDepartmentPage';

const mapsStateToProps = state => ({ 
	adminDepartmentPageProps: state.adminDetailPage.adminDepartmentPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	getAdminRoleById(id) {
		dispatch(getAdminRoleById(id));
	},
	getDepartments(){
		dispatch(getDepartments());
	},
	getAdminRolesByAdminId(id){
		dispatch(getAdminRolesByAdminId(id));
	},
	onSubmit(fields) {
		dispatch(onSubmit(fields));
	},
	suspendAdminRoleById(id) {
		dispatch(suspendAdminRoleById(id));
	},
	unsuspendAdminRoleById(id) {
		dispatch(unsuspendAdminRoleById(id));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AdminDepartmentPage);
