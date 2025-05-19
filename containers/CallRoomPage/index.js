import { connect } from 'react-redux';
import { navigateToListPage } from '../../actions/CallRoomPage';
import CallRoomPage from './CallRoomPage';

const mapsStateToProps = state => ({ 
	callRoomPageProps: state.callRoomListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(CallRoomPage);
