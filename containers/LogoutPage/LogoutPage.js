import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../components/loading';

class LogoutPage extends Component {
	componentDidMount() {
		this.props.logout();
	}
	render() {
		return <Loading />;
	}
}

LogoutPage.propTypes = {
	logout: PropTypes.func.isRequired
};

LogoutPage.defaultProps = {};

export default LogoutPage;
