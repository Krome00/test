import { connect } from 'react-redux';
import { navigateToUserListPage, getUserById, resetMeta, resetPage } from '../../actions/UserDetailPage/UserBasicPage';
import UserDetailPage from './UserDetailPage';

const mapsStateToProps = state => ({
	userDetailPageProps: state.userDetailPage.userBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getUserById(id){
		dispatch(getUserById(id));
	},
	navigateToUserListPage(options){
		dispatch(navigateToUserListPage(options));
	},
	resetMeta(){
		dispatch(resetMeta());
	},
	resetPage(){
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UserDetailPage);