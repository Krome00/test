import { connect } from 'react-redux';
import { getAccessRightsUserById, getAccessRightsUsersByLocationId, onSubmit, deleteAccessRightsUserById, resetMeta, resetPage, getUserList, suspendAccessRightsByUserById, reactivateAccessRightsByUserById } from '../../../actions/LocationDetailPage/LocationAccessRightsUserPage';
import LocationAccessRightsUserPage from './LocationAccessRightsUserPage';

const mapsStateToProps = state => ({ 
	accessRightsUserPageProps: state.locationDetailPage.accessRightsUserPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	getAccessRightsUserById(query) {
		dispatch(getAccessRightsUserById(query));
	},
	getUserList(){
		dispatch(getUserList());
	},
	getAccessRightsUsersByLocationId(query){
		dispatch(getAccessRightsUsersByLocationId(query));
	},
	onSubmit(fields) {
		dispatch(onSubmit(fields));
	},
	deleteAccessRightsUserById(id) {
		dispatch(deleteAccessRightsUserById(id));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(resetPage());
	},
	suspendAccessRightsByUserById(id) {
		dispatch(suspendAccessRightsByUserById(id));
	},
	reactivateAccessRightsByUserById(id) {
		dispatch(reactivateAccessRightsByUserById(id));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LocationAccessRightsUserPage);
