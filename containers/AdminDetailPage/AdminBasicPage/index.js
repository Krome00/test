import { connect } from 'react-redux';
import { onSubmit, suspendAdminById, unsuspendAdminById, navigateToListPage } from '../../../actions/AdminDetailPage/AdminBasicPage';
import AdminBasicPage from './AdminBasicPage';

const mapsStateToProps = state => ({
	adminDetailPageProps: state.adminDetailPage.adminBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	suspendAdminById(id, fields) {
		dispatch(suspendAdminById(id, fields));
	},
	unsuspendAdminById(id, fields) {
		dispatch(unsuspendAdminById(id, fields));
	},
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AdminBasicPage);