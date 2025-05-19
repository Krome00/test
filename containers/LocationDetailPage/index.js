import { connect } from 'react-redux';

import { getLocationById, getLocationEntities, navigateToListPage } from '../../actions/LocationDetailPage/LocationBasicPage';
import LocationDetailPage from './LocationDetailPage';

const mapsStateToProps = state => ({
	locationDetailPageProps: state.locationDetailPage.locationBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getLocationById(id){
		dispatch(getLocationById(id));
	},
	getLocationEntities(){
		dispatch(getLocationEntities());
	},
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LocationDetailPage);