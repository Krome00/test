import { connect } from 'react-redux';
import { getAdminRolesByLocationId, onSubmit, suspendAdminRoleById, reactivateAdminRoleById } from '../../../actions/LocationDetailPage/LocationAdminRolesPage';
import { getAdminList } from '../../../actions/AdminListPage';
import LocationAdminRolesPage from './LocationAdminRolesPage';

const mapsStateToProps = state => ({ 
	locationAdminRolesPage: state.locationDetailPage.locationAdminRolesPageReducer,
	adminListPageProps: state.adminListPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	getAdminList(query){
		dispatch(getAdminList(query));
	},
	getAdminRolesByLocationId(query){
		dispatch(getAdminRolesByLocationId(query));
	},
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	suspendAdminRoleById(id){
		dispatch(suspendAdminRoleById(id));
	},
	reactivateAdminRoleById(id){
		dispatch(reactivateAdminRoleById(id));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LocationAdminRolesPage);
