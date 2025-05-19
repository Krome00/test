import React, { Component } from 'react';
import { Table, Divider } from 'antd';
import io from 'socket.io-client';
import config from '../../config';

class CallListPage extends Component {

	componentDidMount() {
		this.props.getAllCallRequest();
		this.interval = setInterval(() => this.props.getAllCallRequest(), 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	configureSocket = (id) => {
		const socket = io.connect(config.socket.host, {
			path: config.socket.path
		});

		socket.on('connect', () => {
			socket.on('valid_connection', () => {
				console.log(`You are connected to Socket with id: ${socket.id}`);
			});
		});

		socket.emit('join-controller-channel', id);

		return socket;
	};

	AcceptCall = (controller) => {
		const socket = this.configureSocket(controller._id);

		socket.emit('callAcceptRequest', { controller_id: controller._id, signal: controller.key.signalData, from: controller.key.from });

		setTimeout(() => {
			window.open(`${config.admin}/call-room/room?id=${controller._id}`);
			window.location.reload(false);
		}, 2000);
		//this.props.navigateToVideoCallRoom({ controller_id: controller._id });
	}

	renderTable() {
		const { remote_call_requests: rcrs } = this.props.callsPageProps || {};
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
				key: 'action'
			}
		];
		const data = [];
		rcrs && rcrs.length && rcrs.map((item, index) => {
			const { _id, name, configuration } = item;
			data.push({
				name,
				address: `${configuration.ip_address}:${configuration.port_number}`,
				status: 'Active',
				key: _id,
				action: (
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a
						onClick={
							(e) => {
								e.preventDefault();
								data[index] = null;
								this.AcceptCall(item);
							}
						}
					>Answer</a>
				)
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
export default CallListPage;
