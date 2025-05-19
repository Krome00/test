import { connect } from 'react-redux';
import { getAccessRightsUsersByUserId, resetMeta, resetPage } from '../../../actions/UserDetailPage/UserAccessRightsPage';
import UserAccessRightsPage from './UserAccessRightsPage';

const mapsStateToProps = state => ({ 
	userAccessRightsPageProps: state.userDetailPage.userAccessRightsPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	getAccessRightsUsersByUserId(user_id) {
		dispatch(getAccessRightsUsersByUserId(user_id));
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
)(UserAccessRightsPage);
