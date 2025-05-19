import { connect } from 'react-redux';
import { getControllerById, navigateToControllerListPage, resetMeta } from '../../actions/ControllerDetailPage/ControllerBasicPage';
import ControllerDetailPage from './ControllerDetailPage';

const mapsStateToProps = state => ({
	controllerDetailPageProps: state.controllerDetailPage.controllerBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getControllerById(id){
		dispatch(getControllerById(id));
	},
	navigateToControllerListPage(){
		dispatch(navigateToControllerListPage());
	},
	resetMeta(){
		dispatch(resetMeta());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(ControllerDetailPage);