import { connect } from 'react-redux';
import { getUserEntityMappingByEntityId, createUserEntityMapping, deleteUserEntityMappingById } from '../../../actions/EntityDetailPage/EntityUserPage';

import EntityUserPage from './EntityUserPage';

const mapsStateToProps = state => ({
	entityUserPageProps: state.entityDetailPage.entityUserPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getUserEntityMappingByEntityId(id){
		dispatch(getUserEntityMappingByEntityId(id));
	},
	createUserEntityMapping(fields){
		dispatch(createUserEntityMapping(fields));
	},
	deleteUserEntityMappingById(fields){
		dispatch(deleteUserEntityMappingById(fields));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EntityUserPage);