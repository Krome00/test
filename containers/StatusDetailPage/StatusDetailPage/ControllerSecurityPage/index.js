import { connect } from 'react-redux';
import { getControllerById } from '../../../../actions/ControllerDetailPage/ControllerBasicPage';
import { getSecurityFeaturesByControllerId, onSubmit, resetMeta, resetPage, deleteSecurityFeatureById } from '../../../../actions/StatusDetailPage/ControllerSecurityPage';
import ControllerSecurityPage from './ControllerSecurityPage';

const mapsStateToProps = state => ({
	controllerSecurityPageProps: state.controllerDetailPage.controllerSecurityPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getSecurityFeaturesByControllerId(id, options){
		dispatch(getSecurityFeaturesByControllerId(id, options));
	},
	deleteSecurityFeatureById(id){
		dispatch(deleteSecurityFeatureById(id));
	},
	onSubmit(fields) {
		dispatch(onSubmit(fields));
	},
	getControllerById(id) {
		dispatch(getControllerById(id));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(ControllerSecurityPage);
