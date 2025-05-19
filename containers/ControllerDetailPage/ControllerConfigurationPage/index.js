import { connect } from 'react-redux';
import { navigateToControllerListPage, onSubmit, resetMeta, resetPage } from '../../../actions/ControllerDetailPage/ControllerConfigurationPage';
import ControllerConfigurationPage from './ControllerConfigurationPage';

const mapsStateToProps = state => ({ 
	controllerConfigurationPageProps: state.controllerDetailPage.controllerConfigurationPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	
	navigateToControllerListPage() {
		dispatch(navigateToControllerListPage());
	},
	onSubmit(fields) {
		dispatch(onSubmit(fields));
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
)(ControllerConfigurationPage);
