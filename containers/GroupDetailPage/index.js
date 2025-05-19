import { connect } from 'react-redux';
import { getGroupById, navigateToGroupListPage, resetMeta, resetPage } from '../../actions/GroupDetailPage/GroupBasicPage';
import GroupDetailPage from './GroupDetailPage';

const mapsStateToProps = state => ({
	groupDetailPageProps: state.groupDetailPage.groupBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getGroupById(id){
		dispatch(getGroupById(id));
	},
	navigateToGroupListPage(){
		dispatch(navigateToGroupListPage());
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
)(GroupDetailPage);