import { connect } from 'react-redux';
import {
	getMemberList,
	navigateToDetailPage,
	resetPage,
	resetMeta } from '../../../actions/GroupDetailPage/GroupMemberPage';
import {
 	resetPage as resetDetailsPage
} from '../../../actions/UserDetailPage/UserBasicPage';
import GroupMemberPage from './GroupMemberPage';

const mapsStateToProps = state => ({
	groupMemberPageProps: state.groupDetailPage.groupMemberPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getMemberList: id => {
		dispatch(getMemberList(id));
	},
	navigateToDetailPage(options) {
		dispatch(navigateToDetailPage(options));
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
)(GroupMemberPage);