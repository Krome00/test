import { connect } from 'react-redux';
import { navigateToAddPage, navigateToDetailPage, getSystemMessages, resetMeta } from '../../actions/SystemMessageListPage';
import { resetDetailPage } from '../../actions/SystemMessageDetailPage/SystemMessageBasicPage'
import SystemMessageListPage from './SystemMessageListPage';

const mapsStateToProps = state => ({
	systemMessageListPageProps: state.systemMessageListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getSystemMessages(query){
		dispatch(getSystemMessages(query));
	},
	navigateToAddPage(){
		dispatch(navigateToAddPage());
	},
	navigateToDetailPage(id){
		dispatch(navigateToDetailPage(id));
	},
	resetDetailPage(){
		dispatch(resetDetailPage());
	},
	resetMeta(){
		dispatch(resetMeta());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(SystemMessageListPage);
