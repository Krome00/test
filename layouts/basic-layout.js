import React, { Component } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

export class BasicLayout extends Component {
	render() {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Layout>
					<Content
						style={{
							// display: 'flex',
							// justifyContent: 'center',
							// alignItems: 'center',
							// height: '100vh'
						}}
					>
						<div style={{ background: '#edf0f6' }}>
							{this.props.children}
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default BasicLayout;
