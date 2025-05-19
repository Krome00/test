import { connect } from 'react-redux';
import { getEmergencyById, navigateToListPage } from '../../actions/EmergencyDetailPage/EmergencyBasicPage';

import EmergencyDetailPage from './EmergencyDetailPage';

const mapsStateToProps = state => ({
	emergencyDetailPageProps: state.emergencyDetailPage.emergencyBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEmergencyById(id){
		dispatch(getEmergencyById(id));
	},
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EmergencyDetailPage);