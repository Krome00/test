import { connect } from 'react-redux';
import { getControllerById, deleteControllerById, navigateToControllerListPage, onSubmit, suspendControllerById, unsuspendControllerById, resetMeta, resetPage } from '../../../actions/ControllerDetailPage/ControllerBasicPage';
import ControllerBasicPage from './ControllerBasicPage';

const mapsStateToProps = state => ({ 
	controllerBasicPageProps: state.controllerDetailPage.controllerBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	getControllerById(id) {
		dispatch(getControllerById(id));
	},
	navigateToControllerListPage() {
		dispatch(navigateToControllerListPage());
	},
	onSubmit(fields) {
		dispatch(onSubmit(fields));
	},
	deleteControllerById(id) {
		dispatch(deleteControllerById(id));
	},
	suspendControllerById(id){
		dispatch(suspendControllerById(id));
	},
	unsuspendControllerById(id){
		dispatch(unsuspendControllerById(id));
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
)(ControllerBasicPage);
