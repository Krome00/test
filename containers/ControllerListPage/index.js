import { connect } from 'react-redux';
import {  getControllerList, navigateToDetailPage, navigateToAddPage, resetPage, resetMeta } from '../../actions/ControllerListPage';
import { resetPage as resetDetailsPage } from '../../actions/ControllerDetailPage/ControllerBasicPage';
import ControllerListPage from './ControllerListPage';

const mapsStateToProps = state => ({
	controllerListPageProps: state.controllerListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getControllerList(options) {
		dispatch(getControllerList(options));
	},
	navigateToDetailPage(options) {
		dispatch(navigateToDetailPage(options));
	},
	navigateToAddPage(options) {
		dispatch(navigateToAddPage(options));
	},
	resetPage() {
		dispatch(resetPage());
	},
	resetDetailsPage() {
	 	dispatch(resetDetailsPage());
	},
	resetMeta() {
		dispatch(resetMeta());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(ControllerListPage);