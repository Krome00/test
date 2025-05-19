import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Spinner from 'react-spinkit';
import { Spin } from 'antd';

export class Loading extends Component {
	render() {
		const { color, paddingTop } = this.props;
		const style = {
			width: 60,
			margin: '0 auto',
			paddingTop: paddingTop,
			paddingBottom: 100
		};
		return <Spin 
			// color={color}
			// fadeIn="none"
			// name="three-bounce"
			style={style}
		       />;
	}	
}

Loading.propTypes = {
	color: PropTypes.string,
	paddingTop: PropTypes.number
};

Loading.defaultProps = {
	color: '#444',
	paddingTop: 150
};

export default Loading;
