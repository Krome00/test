import React, { Component } from 'react';
import { Table, Divider, Input, Button, Form, Pagination, notification } from 'antd';
import moment from 'moment';
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons';

import Loading from '../../components/loading';

class SystemMessageListPage extends Component {

	state = { 
		titleFilter: ''
	}

	componentDidMount() {
		this.props.getSystemMessages();
		this.props.resetDetailPage();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, limit } = prevProps.systemMessageListPageProps;
		const { meta } = this.props.systemMessageListPageProps;

		const { titleFilter: prevTitle } = prevState;
		const { titleFilter: title } = this.state;

		if (prevTitle !== title) {
			const query = { title, limit };
			this.props.getSystemMessages(query);
		}

		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if(type === 'success'){
				this.props.getSystemMessages();
			}
			this.props.resetMeta();
		}
	}

	showList = () => {
		const { system_messages } = this.props.systemMessageListPageProps || {};
		const data = [];

		system_messages && system_messages.length && system_messages.forEach(system_message => {
			const { _id, title, start_time, end_time, door_ids, location_ids } = system_message;
			const doors = door_ids && door_ids.length && door_ids.map(door => <li>{door.name}</li>);
			const locations = location_ids && location_ids.length && location_ids.map(location => <li>{location.name}</li> );

			data.push({
				title,
				start_time: moment(new Date(start_time)).format('MMMM Do YYYY, h:mm:ss a'),
				end_time: moment(new Date(end_time)).format('MMMM Do YYYY, h:mm:ss a'),
				doors: doors ? <ul>{doors}</ul> : null,
				locations: locations ? <ul>{locations}</ul> : null,
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
								titleFilter: values.searchVal || ''
							}, this.showList);
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
							>Add System message</Button>
						</Form.Item>
								
					</Form>
				</div>
			</div>
		);
	}


	renderTable = () => {
		const data = this.showList();
		const columns = [
			{
				title: 'Title',
				dataIndex: 'title',
				key: 'title'
			},
			{
				title: 'Start Time',
				dataIndex: 'start_time',
				key: 'start_time'
			},
			{
				title: 'End Time',
				dataIndex: 'end_time',
				key: 'end_time'
			},
			{
				title: 'Locations',
				dataIndex: 'locations',
				key: 'locations'
			},
			{
				title: 'Doors',
				dataIndex: 'doors',
				key: 'doors'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => 
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a
						onClick={ e=> {
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

	render() {
		const { loading, limit, page, total } = this.props.systemMessageListPageProps;
		return(
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>System Messages</h3> 
				</div>
				<Divider />
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
					onChange={(page, pageSize) => this.props.getSystemMessages({ page, limit: pageSize, title: this.state.titleFilter })}
				/>
			</div>
		);
	}
};

export default SystemMessageListPage;
