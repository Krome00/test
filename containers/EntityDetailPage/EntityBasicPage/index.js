import { connect } from 'react-redux';
import { onSubmit, suspendEntityById, unsuspendEntityById, resetPage } from '../../../actions/EntityDetailPage/EntityBasicPage';
import EntityBasicPage from './EntityBasicPage';

const mapsStateToProps = state => ({
	entityDetailPageProps: state.entityDetailPage.entityDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	suspendEntityById(id){
		dispatch(suspendEntityById(id));
	},
	unsuspendEntityById(id){
		dispatch(unsuspendEntityById(id));
	},
	resetPage(){
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EntityBasicPage);