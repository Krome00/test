import { connect } from 'react-redux';
import { getDoorsByDepartmentId } from '../../actions/DashboardPage';
import DashboardPage from './DashboardPage';

const mapsStateToProps = state => ({ 
	dashboardPageProps: state.dashboardPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getDoorsByDepartmentId(){
		dispatch(getDoorsByDepartmentId());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(DashboardPage);
