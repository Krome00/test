import { connect } from 'react-redux';
import { getLocationsByDepartmentId, getDoorsByDepartmentId, onSubmit, resetDetailMeta, navigateToListPage } from '../../../actions/SystemMessageDetailPage/SystemMessageBasicPage';
import SystemMessageBasicPage from './SystemMessageBasicPage';

const mapsStateToProps = state => ({
	systemMessageBasicPageProps: state.systemMessageDetailPage.systemMessageBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getLocationsByDepartmentId(){
		dispatch(getLocationsByDepartmentId());
	},
	getDoorsByDepartmentId(){
		dispatch(getDoorsByDepartmentId());
	},
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	resetMeta(){
		dispatch(resetDetailMeta());
	},
	navigateToListPage() {
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(SystemMessageBasicPage);
