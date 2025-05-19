import { connect } from 'react-redux';
import { updateAdminPasswordById } from '../../../actions/AdminDetailPage/AdminBasicPage';
import AdminUpdatePasswordPage from './AdminUpdatePasswordPage';

const mapsStateToProps = state => ({
	adminDetailPageProps: state.adminDetailPage.adminBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	updateAdminPasswordById(id, fields){
		dispatch(updateAdminPasswordById(id, fields));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AdminUpdatePasswordPage);