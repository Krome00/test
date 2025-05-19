import React, { Component } from 'react';
import { Layout } from 'antd';
import Drawer from '../components/drawer';
import NavigationHeader from '../components/header';

const { Footer } = Layout;

export class NavigationLayout extends Component {
	state = {
		collapsed: false
	}

	handleOnCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		const { location, history } = this.props.children.props;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Drawer 
					location={location}
					history={history}
					collapsed={this.state.collapsed} 
					handleOnCollapse={() => this.handleOnCollapse()} 
				/>
				<Layout>
					<NavigationHeader
						location={location}
						history={history}
						collapsed={this.state.collapsed}
						handleOnCollapse={() => this.handleOnCollapse()} 
					/>
					{this.props.children}
					<Footer style={{ textAlign: 'center' }}>Copyright &copy; The Hong Kong University of Science and Technology. All rights reserved.</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default NavigationLayout;
