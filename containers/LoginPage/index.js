import { connect } from 'react-redux';
import { onFieldChange, login, reset, resetMeta, showLoginForm, resetLocalStorage } from '../../actions/LoginPage';
import LoginPage from './LoginPage';

const mapsStateToProps = state => ({
	loginPageProps: state.loginPageReducer
});

const mapsDispatchToProps = dispatch => ({
	onFieldChange(fieldName, fieldValue) {
		dispatch(onFieldChange(fieldName, fieldValue));
	},
	login(opts) {
		dispatch(login(opts));
	},
	reset() {
		dispatch(reset());
	},
	resetMeta() {
		dispatch(resetMeta());
	},
	showLoginForm(opts) {
		dispatch(showLoginForm(opts));
	},
	resetLocalStorage() {
		dispatch(resetLocalStorage());
	}
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LoginPage);
