import { connect } from 'react-redux';
import { getAllStatus, getControllers } from '../../actions/StatusListPage';
import StatusListPage from './StatusListPage';

const mapsStateToProps = state => ({ 
	dashboardPageProps: state.statusListPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getAllStatus(){
		dispatch(getAllStatus());
	},
	getControllers(){
		dispatch(getControllers());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(StatusListPage);
