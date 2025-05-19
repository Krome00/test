import { connect } from 'react-redux';
import {
	getUserList,
	navigateToDetailPage,
	navigateToAddPage,
	resetPage,
	resetMeta
} from '../../actions/UserListPage';
import {
 	resetPage as resetDetailsPage
} from '../../actions/UserDetailPage/UserBasicPage';
import UserListPage from './UserListPage';

const mapsStateToProps = state => ({
	userListPageProps: state.userListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getUserList(query) {
		dispatch(getUserList(query));
	},
	navigateToDetailPage(options) {
		dispatch(navigateToDetailPage(options));
	},
	navigateToAddPage(options) {
		dispatch(navigateToAddPage(options));
	},
	resetPage() {
		dispatch(resetPage());
	},
	resetDetailsPage() {
	 	dispatch(resetDetailsPage());
	},
	resetMeta() {
		dispatch(resetMeta());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UserListPage);