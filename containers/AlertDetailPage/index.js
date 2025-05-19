import { connect } from 'react-redux';
import { getAlertById, navigateToListPage, acknowledgeAlertById } from '../../actions/AlertDetailPage';
import AlertDetailPage from './AlertDetailPage';

const mapsStateToProps = state => ({
	alertDetailPageProps: state.alertDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getAlertById(id){
		dispatch(getAlertById(id));
	},
	acknowledgeAlertById(id){
		dispatch(acknowledgeAlertById(id));
	},
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(AlertDetailPage);