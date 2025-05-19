import { connect } from 'react-redux';
import { getGroups, navigateToAddPage, navigateToDetailPage } from '../../actions/GroupListPage';
import { resetPage, resetMeta }  from '../../actions/GroupDetailPage/GroupBasicPage';
import GroupListPage from './GroupListPage';

const mapsStateToProps = state => ({
	groupListPageProps: state.groupListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getGroups (query){
		dispatch(getGroups(query));
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
)(GroupListPage);
