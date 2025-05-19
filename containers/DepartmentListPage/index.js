import { connect } from 'react-redux';

import { getDepartmentList, navigateToDetailPage } from '../../actions/DepartmentListPage';
import { resetPage } from '../../actions/DepartmentDetailPage/DepartmentDetailPage';
import DepartmentListPage from './DepartmentListPage';

const mapsStateToProps = state => ({
	departmentListPageProps: state.departmentListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getDepartmentList(query){
		dispatch(getDepartmentList(query));
	},
	navigateToDetailPage(id){
		dispatch(navigateToDetailPage(id));
	},
	resetDetailPage(){
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(DepartmentListPage);