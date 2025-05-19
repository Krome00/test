import React, { Component } from 'react';
import { Table, Divider, Badge } from 'antd';

import LabelHelper from '../../helpers/Label';

class DashboardPage extends Component {

	componentDidMount() {
		this.props.getDoorsByDepartmentId();
	}

	renderTable() {
		const { doors } = this.props.dashboardPageProps || {};
		const columns = [
			{
				title: 'Door',
				dataIndex: 'door_name',
				key: 'door_name'
			},
			{
				title: 'Location',
				dataIndex: 'location_name',
				key: 'location_name'
			},
			{
				title: 'Connection Status',
				dataIndex: 'status',
				key: 'status'
			}
		];
		const data = [];
		doors && doors.length && doors.map(door => {
			const { location_id: location, name: door_name, _id, status } = door;
			const { name: location_name } = location;

			data.push({
				door_name,
				location_name,
				status: <Badge
					status={status === 'enabled' ? 'success' : 'error'}
					text={LabelHelper.status(status)}
				        />,
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
					<h3>Dashboard</h3>
				</div>
				<Divider />
				{this.renderTable()}
			</div>
		);
	}
}

// Use redux's compose to use multiple
// HOC(Higher Order Component) wrappers
export default DashboardPage;
