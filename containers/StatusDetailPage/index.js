import { connect } from 'react-redux';
import { getControllerById } from '../../actions/StatusDetailPage/ControllerSecurityPage';
import StatusDetailPage from './StatusDetailPage';

const mapsStateToProps = state => ({
	controllerDetailPageProps: state.controllerDetailPage.controllerBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getControllerById(id) {
		dispatch(getControllerById(id));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(StatusDetailPage);