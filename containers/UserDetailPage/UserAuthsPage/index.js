import { connect } from 'react-redux';
import { getUserAuthsByUserId, onSubmit, suspendUserAuthById, reactivateUserAuthById, resetMeta, resetPage } from '../../../actions/UserDetailPage/UserAuthenticationPage';
import UserAuthsPage from './UserAuthsPage';

const mapsStateToProps = state => ({
	userAuthsPageProps: state.userDetailPage.userAuthenticationPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getUserAuthsByUserId(query){
		dispatch(getUserAuthsByUserId(query));
	},
	onSubmit(fields){
		dispatch(onSubmit(fields));
	},
	suspendUserAuthById(query){
		dispatch(suspendUserAuthById(query));
	},
	reactivateUserAuthById(query){
		dispatch(reactivateUserAuthById(query));
	},
	resetPage(){
		dispatch(resetPage());
	},
	resetMeta(){
		dispatch(resetMeta());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(UserAuthsPage);
