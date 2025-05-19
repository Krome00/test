import React, { Component } from 'react';
import { Layout } from 'antd';
import Drawer from '../components/drawer';
import NavigationHeader from '../components/header';

const { Content, Footer } = Layout;

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
					<Content style={{ margin: '24px 16px 0' }}>
						{this.props.children}
					</Content>
					<Footer style={{ textAlign: 'center' }}>Copyright &copy; The Hong Kong University of Science and Technology. All rights reserved.</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default NavigationLayout;
