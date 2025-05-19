/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table, Divider, Button, Input, Form, Select, Pagination, notification } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons';

import LabelHelper from '../../helpers/Label';
import Loading from '../../components/loading';

class AlertListPage extends Component {

	state = {
		nameFilter: ''
	}

	componentDidMount() {
		this.props.getAlertListByDepartmentId();
		this.props.getDoorsInAlerts();
		this.props.getLocationsInAlerts();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, limit } = prevProps.alertListPageProps;
		const { meta } = this.props.alertListPageProps;

		const { statusFilter: prevStatus, nameFilter: prevName, doorIdFilter: prevDoorIdFilter, locationIdFilter: prevLocationIdFilter } = prevState;
		const { statusFilter: status, nameFilter: name, doorIdFilter: door_id, locationIdFilter: location_id } = this.state;

		if (prevStatus !== status || prevName !== name || prevDoorIdFilter !== door_id || prevLocationIdFilter !== location_id) {
			const newStatus = LabelHelper.alert_status(status);
			const query = { status: newStatus, name, door_id, location_id, limit };

			this.props.getAlertListByDepartmentId(query);
		}

		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if(type === 'success'){
				this.props.getAlertListByDepartmentId();
			}
			this.props.resetMeta();
		}
	}

	showList = () => {
		const { alerts } = this.props.alertListPageProps;
		const data = [];

		alerts && alerts.length && alerts.forEach((alert) => {
			const { _id: key, name: alert_name, location_id, door_id, alerted_at, status } = alert;
			const { name: location_name } = location_id;
			const { name: door_name } = door_id;
			const time = moment(new Date(alerted_at)).format('MMMM Do YYYY, h:mm:ss a');
			
			data.push({ alert_name, time, status: LabelHelper.alert_status(status), key, location_name, door_name });
		});

		return data;
	}

	onSelectStatus = statusFilter => {
		this.setState({ statusFilter });
	}

	onSelectDoor = doorIdFilter => {
		this.setState({ doorIdFilter });
	}

	onSelectLocation = locationIdFilter => {
		this.setState({ locationIdFilter });
	}

	renderSearchBar(){
		const { doors, locations } = this.props.alertListPageProps || {};
		return(
			<div style={{ display: 'flex', marginBottom: '20px' }}>
				<div style={{ marginLeft: 'auto' }}>
					<Form
						onFinish={(values) => {
							const { name } = values;
							this.setState({
								nameFilter: name || ''
							});
						}}
						ref={this.formRef}
						layout="inline"
					>
						<Form.Item
							name="status"
							style={{ width: '130px' }}
						>
							<Select
								placeholder="Status"
								defaultValue = {undefined}
								allowClear={true}
								onChange={this.onSelectStatus}
							>
								<Select.Option value="Acknowledged"> Acknowledged </Select.Option>
								<Select.Option value="New"> New </Select.Option>
							</Select>
						</Form.Item>

						<Form.Item
							name="doors"
							style={{ minWidth: '130px' }}
						>
							<Select
								placeholder="Door"
								defaultValue = {undefined}
								allowClear={true}
								onChange={this.onSelectDoor}
							>
								{doors && doors.length && doors.map(door => 
									<Select.Option value={door._id}> {door.name} </Select.Option>
								)}
							</Select>
						</Form.Item>

						<Form.Item
							name="locations"
							style={{ minWidth: '130px' }}
						>
							<Select
								placeholder="Location"
								defaultValue = {undefined}
								allowClear={true}
								onChange={this.onSelectLocation}
							>
								{locations && locations.length && locations.map(location => 
									<Select.Option value={location._id}> {location.name} </Select.Option>
								)}

							</Select>
						</Form.Item>

						<Form.Item name="name">
							<Input placeholder="Search by name..."/>
						</Form.Item>

						<Form.Item name="primaryButton">
							<Button
								type="primary"
								htmlType="submit"
							>Search</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}

	renderTable() {
		const data = this.showList();

		const columns = [
			{
				title: 'Alert Name',
				dataIndex: 'alert_name',
				key: 'alert_name'
			},
			{
				title: 'Time',
				dataIndex: 'time',
				key: 'time'
			},
			{
				title: 'Location',
				dataIndex: 'location_name',
				key: 'location_name'
			},
			{
				title: 'Door',
				dataIndex: 'door_name',
				key: 'door_name'
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => 
					<a
						onClick={(e) => {
							e.preventDefault();
							this.props.navigateToDetailPage(record.key);
						}}
					>
						Edit
					</a>
			}
		];

		return (
			<Table
				pagination={false}
				dataSource={data}
				columns={columns}
			/>
		);
	}
	
	render() {
		const { loading, limit, page, total } = this.props.alertListPageProps;
		return(
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Alerts</h3> 
				</div>
				<Divider />
				{this.renderSearchBar()}
				<div style={{ textAlign: 'center' }}>
					{loading ? <Loading /> : this.renderTable()}
				</div>
				<Pagination
					style={{ marginTop: '30px' }}
					showSizeChanger
					pageSize={limit || 10}
					current={page}
					total={total}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSizeOptions={['5', '10', '20', '50']}
					onChange={(page, pageSize) => {
						const { statusFilter: status, nameFilter: name, doorIdFilter: door_id, locationIdFilter: location_id } = this.state;
						const newStatus = LabelHelper.alert_status(status);
						const query = { page, limit: pageSize, status: newStatus, name, door_id, location_id };
						this.props.getAlertListByDepartmentId(query);
					}
					}
				/>
			</div>
		);
	}
};

export default AlertListPage;