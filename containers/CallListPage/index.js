import { connect } from 'react-redux';
import { getAllCallRequest, navigateToVideoCallRoom } from '../../actions/CallsListPage';
import CallListPage from './CallListPage';

const mapsStateToProps = state => ({ 
	callsPageProps: state.callsListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getAllCallRequest(){
		dispatch(getAllCallRequest());
	},
	navigateToVideoCallRoom(args){
		dispatch(navigateToVideoCallRoom(args));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(CallListPage);
