import { connect } from 'react-redux';
import { getEntityById, navigateToListPage, onSubmit, deleteEntityById, getEntityLocationList } from '../../actions/EntityDetailPage/EntityBasicPage';
import EntityDetailPage from './EntityDetailPage';

const mapsStateToProps = state => ({
	entityDetailPageProps: state.entityDetailPage.entityDetailPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEntityById(query){
		dispatch(getEntityById(query));
	},
	getEntityLocationList(){
		dispatch(getEntityLocationList());
	},
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	deleteEntityById(id){
		dispatch(deleteEntityById(id));
	},
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EntityDetailPage);