import { connect } from 'react-redux';
import { getAgentById, navigateToListPage } from '../../actions/AgentDetailPage/AgentBasicPage';
import AgentDetailPage from './AgentDetailPage';

const mapsStateToProps = state => ({
	agentDetailPageProps: state.agentDetailPage.agentBasicPageReducer
});

const mapsDispatchToProps = dispatch => (
	{
		getAgentById(id){
			dispatch(getAgentById(id));
		},
		navigateToListPage(){
			dispatch(navigateToListPage());
		}
	}
);

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AgentDetailPage);