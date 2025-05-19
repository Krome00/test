import { connect } from 'react-redux';
import { onSubmit, navigateToListPage, deleteLocationById, getLocationEntities, suspendLocationById , unsuspendLocationById, resetPage } from '../../../actions/LocationDetailPage/LocationBasicPage';
import LocationBasicPage from './LocationBasicPage';

const mapsStateToProps = state => ({
	locationDetailPageProps: state.locationDetailPage.locationBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	deleteLocationById(id){
		dispatch(deleteLocationById(id));
	},
	suspendLocationById(id){
		dispatch(suspendLocationById(id));
	},
	unsuspendLocationById(id){
		dispatch(unsuspendLocationById(id));
	},
	getLocationEntities(){
		dispatch(getLocationEntities());
	},
	navigateToListPage(){
		dispatch(navigateToListPage());
	},
	resetPage(){
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LocationBasicPage);