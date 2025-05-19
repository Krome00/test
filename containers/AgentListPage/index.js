import { connect } from 'react-redux';
import { getAgents, navigateToAddPage, navigateToDetailPage } from '../../actions/AgentListPage';
import { resetPage, resetMeta }  from '../../actions/AgentDetailPage/AgentBasicPage';
import AgentListPage from './AgentListPage';

const mapsStateToProps = state => ({
	agentListPageProps: state.agentListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getAgents(options){
		dispatch(getAgents(options));
	},
	navigateToAddPage(){
		dispatch(navigateToAddPage());
	},
	navigateToDetailPage(id){
		dispatch(navigateToDetailPage(id));
	},
	resetPage(){
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AgentListPage);