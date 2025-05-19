import { connect } from 'react-redux';
import { getAdminById, navigateToListPage } from '../../actions/AdminDetailPage/AdminBasicPage';
import AdminDetailPage from './AdminDetailPage';

const mapsStateToProps = state => ({
	adminDetailPageProps: state.adminDetailPage.adminBasicPageReducer
});

const mapsDispatchToProps = dispatch => (
	{
		getAdminById(id){
			dispatch(getAdminById(id));
		},
		navigateToListPage(){
			dispatch(navigateToListPage());
		}
	}
);

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AdminDetailPage);
