import { connect } from 'react-redux';
import { getUserPermissionHistories, getUserPermissionHistoryById, navigateToUserPermissionHistoryListPage, navigateUserPermissionHistoryDetailPage, resetMeta, resetPage } from '../../../actions/UserDetailPage/UserPermissionHistoryPage';
import UserPermissionHistoryPage from './UserPermissionHistoryPage';

const mapsStateToProps = state => ({
	userPermissionHistoryPageProps: state.userDetailPage.userPermissionHistoryPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getUserPermissionHistories(user_id) {
		dispatch(getUserPermissionHistories(user_id));
	},
	getUserPermissionHistoryById(id) {
		dispatch(getUserPermissionHistoryById(id));
	},
	navigateToUserPermissionHistoryListPage() {
		dispatch(navigateToUserPermissionHistoryListPage());
	},
	navigateUserPermissionHistoryDetailPage(id) {
		dispatch(navigateUserPermissionHistoryDetailPage(id));
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
)(UserPermissionHistoryPage);
