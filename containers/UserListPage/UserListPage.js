/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { notification, Select, Tabs, Badge, Button, Table, Radio, Form, Row, Col, Input, Pagination, Divider } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import LabelHelper from '../../helpers/Label';
import Loading from '../../components/loading';

const { TabPane } = Tabs;

class UserListPage extends Component {

	state = {
		userType: 'all', 
		searchValue: ''
	}

	componentDidMount(){
		const { location } = this.props;
		const { state } = location;

		this.setState({
			userType: state ? state : 'all'
		});

		this.props.resetDetailsPage();
		this.props.getUserList();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta, users: prevUsers, limit } = prevProps.userListPageProps;
		const { meta, users, total } = this.props.userListPageProps;

		const { userTypeFilter: prevType, statusFilter: prevStatus, searchValue: prevName } = prevState;
		const { userTypeFilter: type, statusFilter: status, searchValue: name } = this.state;

		if (prevType !== type || prevStatus !== status || prevName !== name) {
			const query = { status, name, limit };
			if (type) query.type = type;
			this.props.getUserList(query);
		}

		if(prevUsers !== users) {
			this.setState({
				...this.state,
				users,
				total 
			});
		}
		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if(type === 'success'){
				this.props.getUserList();
			}
			this.props.resetMeta();
		}
	}

	componentWillUnmount(){
		this.props.resetPage();
	}	
	
	showList = () => {
		const { users } = this.props.userListPageProps || {};
		const data = [];

		// eslint-disable-next-line array-callback-return
		users && users.length && users.map((user) => {
			const { name, email, _id: id, status, type } = user;
			data.push({
				name,
				email,
				type: LabelHelper.user_type(type),
				status: <Badge
					status={status === 'enabled' ? 'success' : 'error'}
					text={LabelHelper.status(status)}
				        />,
				key: id
			});	
		});

		return data;
	}

	onSelectStatus = statusFilter => {
		this.setState({ statusFilter });
	}
	
	onSelectType = userTypeFilter => {
		this.setState({ userTypeFilter });
	}

	renderSearchBar() {
		return(
			<div style={{ display: 'flex', marginBottom: '20px' }}>
				<div style={{ marginLeft: 'auto' }}>
					<Form
						onFinish={(values) => {
							const { nameValue } = values;
							this.setState({
								searchValue: nameValue || ''
							});
							
						}}
						ref={this.formRef}
						layout="inline"
					>
						<Form.Item
							name="userType"
							style={{ width: '130px' }}
						>
							<Select
								defaultValue = {undefined}
								allowClear={true}
								placeholder="User Type"
								onChange={this.onSelectType}
							>		
								<Select.Option value="internal"> Internal </Select.Option>
								<Select.Option value="external"> External </Select.Option>
							</Select>
						</Form.Item>

						<Form.Item
							name="status"
							style={{ width: '130px' }}
						>
							<Select
								defaultValue = {undefined}
								allowClear={true}
								placeholder="Status"
								onChange={this.onSelectStatus}
							>		
								<Select.Option value="enabled"> Enabled </Select.Option>
								<Select.Option value="disabled"> Disabled </Select.Option>
							</Select>
						</Form.Item>

						<Form.Item
							name="nameValue"
							style={{ width: '180px' }}
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
								onClick={this.onClickAddButton}
							>
								New User
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}

	onClickAddButton = () => {
		return this.props.navigateToAddPage();
	};

	render(){
		const { loading, limit, page, total } = this.props.userListPageProps;

		const data = this.showList();
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name'
			},
			{
				title: 'Email',
				dataIndex: 'email'
			},
			{
				title: 'User Type',
				dataIndex: 'type'
			},
			{
				title: 'Status',
				dataIndex: 'status'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				width: '10%',
				render: (text, record) => <a
					onClick={ e => {
						e.preventDefault();
						this.props.navigateToDetailPage({ user_id: record.key });
					}}
				                          > Edit </a>
			}
		];

		return (
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Users</h3> 
				</div>
				<Divider />
				{this.renderSearchBar()}
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
				/>
				<Pagination
					style={{ marginTop: '30px' }}
					showSizeChanger
					pageSize={limit || 10}
					current={page}
					total={total}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSizeOptions={['5', '10', '20', '50']}
					onChange={(page, pageSize) => {
						const { userTypeFilter, statusFilter: status, searchValue: name } = this.state;
						const query = { page, limit: pageSize, type: userTypeFilter, status, name };
						this.props.getUserList(query);
					}}
				/>
			</div>
		);
	}

}

export default UserListPage;