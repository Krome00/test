/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table, Input, Button, Divider, Modal, Row, Col, Form, Radio, Pagination, notification } from 'antd';
import { SearchOutlined, PlusSquareFilled } from '@ant-design/icons';
import moment from 'moment';

import Loading from '../../components/loading';

class EmergencyListPage extends Component {

	state = { 
		nameFilter: ''
	}

	componentDidMount(){
		this.props.getEmergencyList();
		this.props.resetEmergencyDetailPage();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, limit } = prevProps.emergencyListPageProps;
		const { meta } = this.props.emergencyListPageProps;

		const { nameFilter: prevName } = prevState;
		const { nameFilter: name } = this.state;

		if (prevName !== name) {
			const query = { name, limit };
			this.props.getEmergencyList(query);
		}

		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if(type === 'success'){
				this.props.getEmergencyList();
			}
			this.props.resetMeta();
		}
	}

	showList = () => {
		const { emergencies } = this.props.emergencyListPageProps || {};
		const data = [];

		emergencies && emergencies.length && emergencies.forEach((emergency) => {
			const { name, suspend_start, suspend_end, _id, door_ids, suspended } = emergency;
			data.push({
				name, 
				suspend_start: moment(suspend_start).format('dddd, MMMM Do YYYY, h:mm:ss a'),
				suspend_end: moment(suspend_end).format('dddd, MMMM Do YYYY, h:mm:ss a'),
				type: door_ids && door_ids.length ? 'Door' : 'Location',
				key: _id
			});

		});

		return data;

	}

	renderSearchBar(){
		return(
			<div style={{ display: 'flex', marginBottom: '20px' }}>
				<div
					style={{ marginLeft: 'auto' }}
				>
					<Form
						onFinish={(values) => {
							this.setState({
								nameFilter: values.searchVal || ''
							});
						}}
						ref={this.formRef}
						layout="inline"
					>

						<Form.Item
							name="searchVal"
						>
							<Input
								placeholder="Search by name..."
							/>
						</Form.Item>

						<Form.Item
							name="primaryButton"
						>
							<Button
								type="primary"
								htmlType="submit"
							>Search</Button>
						</Form.Item>
						<Form.Item
							name="addButton"
						>
							<Button
								type="primary"
								icon={<PlusSquareFilled />}
								onClick={this.props.navigateToAddPage}
							>Add Emergency</Button>
						</Form.Item>
								
					</Form>
				</div>
			</div>
		);
	}

	renderTable(){
		const data = this.showList();
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Start Time',
				dataIndex: 'suspend_start',
				key: 'suspend_start'
			},
			{
				title: 'End Time',
				dataIndex: 'suspend_end',
				key: 'suspend_end'
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

		return(
			<Table
				pagination={false}
				dataSource={data}
				columns={columns}
			/>
		);
	}

	render(){
		const { loading, limit, page, total } = this.props.emergencyListPageProps;
		return(
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Emergencies</h3> 
				</div>
				<Divider/>
				{this.renderSearchBar()}
				<div
					style={{ textAlign: 'center' }}
				>
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
					onChange={(page, pageSize) => this.props.getEmergencyList({ page, limit: pageSize, name: this.state.nameFilter })}
				/>
			</div>
		);
	}
}

export default EmergencyListPage;