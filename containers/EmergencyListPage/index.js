import { connect } from 'react-redux';

import { getEmergencyList, navigateToAddPage, navigateToDetailPage, resetMeta } from '../../actions/EmergencyListPage';
import { resetDetailPage, resetDetailMeta } from '../../actions/EmergencyDetailPage/EmergencyBasicPage';
import EmergencyListPage from './EmergencyListPage';

const mapsStateToProps = state => ({
	emergencyListPageProps: state.emergencyListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEmergencyList(query){
		dispatch(getEmergencyList(query));
	},
	resetEmergencyDetailPage(){
		dispatch(resetDetailPage());
	},
	resetEmergencyDetailMeta(){
		dispatch(resetDetailMeta());
	},
	navigateToAddPage(){
		dispatch(navigateToAddPage());
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
)(EmergencyListPage);