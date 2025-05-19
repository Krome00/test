import { connect } from 'react-redux';
import { getLocationList, navigateToAddPage, navigateToDetailPage, resetMeta } from '../../actions/LocationListPage';
import { resetPage } from '../../actions/LocationDetailPage/LocationBasicPage';
import LocationListPage from './LocationListPage';

const mapsStateToProps = state => ({
	locationListPageProps: state.locationListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getLocationList(query){
		dispatch(getLocationList(query));
	},
	navigateToAddPage(){
		dispatch(navigateToAddPage());
	},
	navigateToDetailPage(id){
		dispatch(navigateToDetailPage(id));
	},
	resetDetailPage(){
		dispatch(resetPage());
	},
	resetMeta(){
		dispatch(resetMeta());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LocationListPage);

