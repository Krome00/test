import { connect } from 'react-redux';
import { authorizeWithTicket } from '../../actions/CallbackCasPage';
import CallbackCasPage from './CallbackCasPage';

const mapsStateToProps = state => ({
	callbackCasPageProps: state.callbackCasPageReducer
});

const mapsDispatchToProps = dispatch => ({
	authorizeWithTicket(param) {
		dispatch(authorizeWithTicket(param));
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(CallbackCasPage);
