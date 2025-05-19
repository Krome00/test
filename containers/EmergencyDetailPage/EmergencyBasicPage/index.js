import { connect } from 'react-redux';

import { getEmergencyDoorList, getEmergencyLocationList, suspendEmergencyById, onSubmit, deleteEmergencyById, unsuspendEmergencyById, resetDetailPage , navigateToListPage } from '../../../actions/EmergencyDetailPage/EmergencyBasicPage';
import EmergencyBasicPage from './EmergencyBasicPage';

const mapsStateToProps = state => ({
	emergencyDetailPageProps: state.emergencyDetailPage.emergencyBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEmergencyDoorList(){
		dispatch(getEmergencyDoorList());
	},
	getEmergencyLocationList(){
		dispatch(getEmergencyLocationList());
	},
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	unsuspendEmergencyById(id){
		dispatch(unsuspendEmergencyById(id));
	},
	deleteEmergencyById(id){
		dispatch(deleteEmergencyById(id));
	},
	suspendEmergencyById(id){
		dispatch(suspendEmergencyById(id));
	},
	resetDetailPage(){
		dispatch(resetDetailPage());
	},
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EmergencyBasicPage);
