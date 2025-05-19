import { connect } from 'react-redux';
import { getEntityAccessRightsByGroupList, deleteAccessRightsGroupById, onSubmit } from '../../../actions/EntityDetailPage/EntityAccessRightsByGroupPage';
import EntityAccessRightsByGroupPage from './EntityAccessRightsByGroupPage';

const mapsStateToProps = state => ({
	entityAccessRightsByGroupPageProps: state.entityDetailPage.entityAccessRightsByGroupReducer
});

const mapsDispatchToProps = dispatch => ({
	getEntityAccessRightsByGroupList(query){
		dispatch(getEntityAccessRightsByGroupList(query));
	},
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	deleteAccessRightsGroupById(id){
		dispatch(deleteAccessRightsGroupById(id));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EntityAccessRightsByGroupPage);