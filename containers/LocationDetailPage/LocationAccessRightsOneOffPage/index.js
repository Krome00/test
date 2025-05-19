import { connect } from 'react-redux';
import { getAccessRightsOneOffById, getAccessRightsOneOffsByLocationId, onSubmit, deleteAccessRightsOneOffById, resetMeta, resetPage, getUserList, suspendAccessRightsByOneOffById, reactivateAccessRightsByOneOffById } from '../../../actions/LocationDetailPage/LocationAccessRightsOneOffPage';
import LocationAccessRightsOneOffPage from './LocationAccessRightsOneOffPage';

const mapsStateToProps = state => ({ 
	accessRightsOneOffPageProps: state.locationDetailPage.accessRightsOneOffPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	getAccessRightsOneOffById(id) {
		dispatch(getAccessRightsOneOffById(id));
	},
	getUserList(){
		dispatch(getUserList());
	},
	getAccessRightsOneOffsByLocationId(query){
		dispatch(getAccessRightsOneOffsByLocationId(query));
	},
	onSubmit(fields) {
		dispatch(onSubmit(fields));
	},
	deleteAccessRightsOneOffById(id) {
		dispatch(deleteAccessRightsOneOffById(id));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(resetPage());
	},
	reactivateAccessRightsByOneOffById(id){
		dispatch(reactivateAccessRightsByOneOffById(id));
	},
	suspendAccessRightsByOneOffById(id){
		dispatch(suspendAccessRightsByOneOffById(id));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LocationAccessRightsOneOffPage);
