import { connect } from 'react-redux';
import { getDepartmentById, navigateToListPage } from '../../actions/DepartmentDetailPage/DepartmentDetailPage';

import DepartmentDetailPage from './DepartmentDetailPage';

const mapsStateToProps = state => ({
	departmentDetailPageProps: state.departmentDetailPage.departmentBasicPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getDepartmentById(id){
		dispatch(getDepartmentById(id));
	},
	navigateToListPage(){
		dispatch(navigateToListPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(DepartmentDetailPage);