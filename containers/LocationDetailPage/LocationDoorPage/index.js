import { connect } from 'react-redux';
import { getDoorsByLocationId, onSubmit, deleteDoorById, resetMeta, resetPage, getControllerList } from '../../../actions/LocationDetailPage/LocationDoorPage';
import LocationDoorPage from './LocationDoorPage';

const mapsStateToProps = state => ({ 
	doorPageProps: state.locationDetailPage.doorPageReducer
});

const mapsDispatchToProps = dispatch => ({ 
	getControllerList(){
		dispatch(getControllerList());
	},
	getDoorsByLocationId(id){
		dispatch(getDoorsByLocationId(id));
	},
	onSubmit(fields) {
		dispatch(onSubmit(fields));
	},
	deleteDoorById(id) {
		dispatch(deleteDoorById(id));
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	resetPage() {
		dispatch(resetPage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LocationDoorPage);
