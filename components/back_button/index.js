import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class BackButton extends Component {
	onClick = () => {
		if (this.props.onClick) {
			this.props.onClick();
		}
	};
	render() {
		return (
			// eslint-disable-next-line
			<a onClick={this.onClick}>
				<Icon name="angle left" />
				Back
			</a>
		);
	}
}

BackButton.propTypes = {
	onClick: PropTypes.func
};

BackButton.defaultProps = {};

export default BackButton;
