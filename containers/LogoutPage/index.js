import { connect } from 'react-redux';
import { logout } from '../../actions/LogoutPage';
import LogoutPage from './LogoutPage';

function mapsStateToProps(state) {
	return {};
}

function mapsDispatchToProps(dispatch) {
	return {
		logout() {
			dispatch(logout());
		}
	};
}

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(LogoutPage);
