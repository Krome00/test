import { connect } from 'react-redux';
import { getAlertListByDepartmentId, navigateToDetailPage, getDoorsInAlerts, getLocationsInAlerts, resetMeta } from '../../actions/AlertListPage';
import AlertListPage from './AlertListPage';

const mapsStateToProps = state => ({
	alertListPageProps: state.alertListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getAlertListByDepartmentId(query){
		dispatch(getAlertListByDepartmentId(query));
	},
	getDoorsInAlerts(){
		dispatch(getDoorsInAlerts());
	},
	getLocationsInAlerts(){
		dispatch(getLocationsInAlerts());
	},
	navigateToDetailPage(id){
		dispatch(navigateToDetailPage(id));
	},
	resetMeta(){
		dispatch(resetMeta());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AlertListPage);