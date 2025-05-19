import { connect } from 'react-redux';
import { getEntityList, navigateToAddPage, navigateToDetailPage } from '../../actions/EntityListPage';
import { resetPage } from '../../actions/EntityDetailPage/EntityBasicPage';
import EntityListPage from './EntityListPage';

const mapsStateToProps = state => ({
	EntityListPageProps: state.entityListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getEntityList(){
		dispatch(getEntityList());
	},
	navigateToAddPage(){
		dispatch(navigateToAddPage());
	},
	navigateToDetailPage(query){
		dispatch(navigateToDetailPage(query));
	},
	resetDetailPage(){
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(EntityListPage);