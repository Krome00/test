import { connect } from 'react-redux';
import { getGroupById, navigateToGroupListPage, onSubmit, resetMeta, resetPage, suspendGroupById, unsuspendGroupById } from '../../../actions/GroupDetailPage/GroupBasicPage';
import GroupBasicPage from './GroupBasicPage';

const mapsStateToProps = state => ({ 
	groupBasicPageProps: state.groupDetailPage.groupBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	getGroupById(id) {
		dispatch(getGroupById(id));
	},
	navigateToGroupListPage() {
		dispatch(navigateToGroupListPage());
	},
	onSubmit(fields) {
		dispatch(onSubmit(fields));
	},
	suspendGroupById(id, fields) {
		dispatch(suspendGroupById(id, fields));
	},
	unsuspendGroupById(id) {
		dispatch(unsuspendGroupById(id));
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
)(GroupBasicPage);
