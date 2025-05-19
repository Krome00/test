import { connect } from 'react-redux';
import { onSubmit, suspendAgentById, unsuspendAgentById, navigateToListPage, getDoors } from '../../../actions/AgentDetailPage/AgentBasicPage';
import AgentBasicPage from './AgentBasicPage';

const mapsStateToProps = state => ({
	agentDetailPageProps: state.agentDetailPage.agentBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getDoors(){
		dispatch(getDoors());
	},
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	suspendAgentById(id, fields) {
		dispatch(suspendAgentById(id, fields));
	},
	unsuspendAgentById(id, fields) {
		dispatch(unsuspendAgentById(id, fields));
	},
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AgentBasicPage);