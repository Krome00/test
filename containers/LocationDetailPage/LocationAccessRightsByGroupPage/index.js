import { connect } from 'react-redux';
import { getLocationAccessRightsByGroupList, onSubmit, getLocationAccessRightsGroups, suspendAccessRightByGroup, reactivateAccessRightByGroup } from '../../../actions/LocationDetailPage/LocationAccessRightsByGroupPage';
import LocationAccessRightsByGroupPage from './LocationAccessRightsByGroupPage';

const mapsStateToProps = state => ({
	locationAccessRightsByGroupPageProps: state.locationDetailPage.locationAccessRightsByGroupReducer
});

const mapsDispatchToProps = dispatch => ({
	getLocationAccessRightsByGroupList(query){
		dispatch(getLocationAccessRightsByGroupList(query));
	},
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	getLocationAccessRightsGroups(){
		dispatch(getLocationAccessRightsGroups());
	},
	suspendAccessRightByGroup(id){
		dispatch(suspendAccessRightByGroup(id));
	},
	reactivateAccessRightByGroup(id){
		dispatch(reactivateAccessRightByGroup(id));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LocationAccessRightsByGroupPage);