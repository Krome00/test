import { connect } from 'react-redux';
import { onSubmit, navigateToListPage, suspendDepartmentById, reactivateDepartmentById } from '../../../actions/DepartmentDetailPage/DepartmentDetailPage';
import DepartmentBasicPage from './DepartmentBasicPage';

const mapsStateToProps = state => ({
	departmentDetailPageProps: state.departmentDetailPage.departmentBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(DepartmentBasicPage);

