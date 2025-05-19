import { connect } from 'react-redux';
import { getAdminList, navigateToAddPage, navigateToDetailPage } from '../../actions/AdminListPage';
import { resetPage, resetMeta }  from '../../actions/AdminDetailPage/AdminBasicPage';
import AdminListPage from './AdminListPage';

const mapsStateToProps = state => ({
	adminListPageProps: state.adminListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getAdminList(query){
		dispatch(getAdminList(query));
	},
	resetDetailMeta(){
		dispatch(resetMeta());
	},
	resetDetailPage(){
		dispatch(resetPage());
	},
	navigateToAddPage(){
		dispatch(navigateToAddPage());
	},
	navigateToDetailPage(query){
		dispatch(navigateToDetailPage(query));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AdminListPage);
