import React, { Component } from 'react';
import { Table, Divider, Badge } from 'antd';
import ioClient from 'socket.io-client';

import LabelHelper from '../../helpers/Label';

class StatusListPage extends Component {
  
	componentDidMount() {
		this.props.getControllers();
		this.interval = setInterval(() => this.props.getAllStatus(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	renderTable() {
		const { controllers, alive_controllers } = this.props.dashboardPageProps || {};
		const columns = [
			{
				title: 'Controller',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Address',
				dataIndex: 'address',
				key: 'address'
			},
			{
				title: 'Connection Status',
				dataIndex: 'status',
				key: 'status'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => 
					<a
						onClick={ e=> {
							e.preventDefault();
							this.props.history.push(`/security-features/id/basic?id=${record.key}`)
						}}
					>
						View
					</a>
			}
		];
		const data = [];
		controllers && controllers.length && controllers.map(item => {
			const { _id, name, configuration } = item;

			data.push({
				name,
				address: `${configuration.ip_address && configuration.port_number ? `${configuration.ip_address}:${configuration.port_number}` : 'Not configured yet'}`, 
				status: alive_controllers ? 
					<Badge 
						status={alive_controllers.includes(_id) ? 'success' : 'error'} 
						text={alive_controllers.includes(_id) ? 'Connected' : 'Disconnected'}
					/>
					: 
					'Syncronizing',
				key: _id
			});
		});

		return (
			<Table
				pagination={false}
				dataSource={data}
				columns={columns}
			/>
		);
	}

	render() {

		return (
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Status</h3> 
				</div>
				<Divider />
				{this.renderTable()}
			</div>
		);
	}
}

// Use redux's compose to use multiple
// HOC(Higher Order Component) wrappers
export default StatusListPage;
