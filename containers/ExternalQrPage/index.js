import { connect } from 'react-redux';
import { getUserByAuthId } from '../../actions/ExternalQrPage';
import ExternalQrPage from './ExternalQrPage';

const mapsStateToProps = state => ({ 
	externalUserPageProps: state.externalUserPageReducer
});

const mapsDispatchToProps = dispatch => ({
	getUserByAuthId(args){
		dispatch(getUserByAuthId(args));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(ExternalQrPage);
