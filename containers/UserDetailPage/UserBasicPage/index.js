import { connect } from 'react-redux';
import { getUserById, navigateToUserListPage, onSubmit, getGroups, getDoors, resetMeta, resetPage, deleteUserById, suspendUserById, unsuspendSuspensionByUserId } from '../../../actions/UserDetailPage/UserBasicPage';
import UserBasicPage from './UserBasicPage';

const mapsStateToProps = state => ({ 
	userBasicPageProps: state.userDetailPage.userBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	getUserById(id) {
		dispatch(getUserById(id));
	},
	getGroups(){
		dispatch(getGroups());
	},
	getDoors(){
		dispatch(getDoors());
	},
	navigateToUserListPage(options) {
		dispatch(navigateToUserListPage(options));
	},
	onSubmit(fields) {
		dispatch(onSubmit(fields));
	},
	deleteUserById(id) {
		dispatch(deleteUserById(id));
	},
	suspendUserById(id, fields) {
		dispatch(suspendUserById(id, fields));
	},
	unsuspendSuspensionByUserId(id) {
		dispatch(unsuspendSuspensionByUserId(id));
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
)(UserBasicPage);
