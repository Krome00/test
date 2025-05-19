import { connect } from 'react-redux';

import { getEventsList } from '../../actions/EventListPage';
import EventListPage from './EventListPage';

const mapsStateToProps = state => ({
	eventListPageProps: state.eventListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEventsList(){
		dispatch(getEventsList());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EventListPage);
