import { connect } from 'react-redux';
import { getSystemMessageById, navigateToListPage, resetDetailPage } from '../../actions/SystemMessageDetailPage/SystemMessageBasicPage';
import SystemMessageDetailPage from './SystemMessageDetailPage';

const mapsStateToProps = state => ({
	systemMessageDetailPageProps: state.systemMessageDetailPage.systemMessageBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getSystemMessageById(id) {
		dispatch(getSystemMessageById(id));
	},
	navigateToListPage() {
		dispatch(navigateToListPage());
	},
	resetDetailPage() {
		dispatch(resetDetailPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(SystemMessageDetailPage);
