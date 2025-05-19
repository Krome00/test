/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table, Input, Button, Badge, Row, Col, Divider, Form, Radio, Pagination, Select, notification } from 'antd';
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons';
import LabelHelper from '../../helpers/Label';
import Loading from '../../components/loading';

class AdminListPage extends Component {

	state = {
		userType: 'all',
		searchValue: ''
	}

	componentDidMount(){
		this.props.getAdminList();
		this.props.resetDetailPage();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, limit } = prevProps.adminListPageProps;
		const { meta } = this.props.adminListPageProps;

		const { statusValue: prevStatus, searchValue: prevName } = prevState;
		const { statusValue: status, searchValue: name } = this.state;

		if (prevStatus !== status || prevName !== name) {
			const query = { status, name, limit };
			this.props.getAdminList(query);
		}

		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if(type === 'success'){
				this.props.getAdminList();
			}
			this.props.resetMeta();
		}
	}

	showList = () => {
		const { admins } = this.props.adminListPageProps || {};
		const data = [];

		// eslint-disable-next-line array-callback-return
		admins && admins.length && admins.map((admin) => {
			const { status, _id: id, name, email, last_login } = admin;
			data.push({
				name,
				email,
				status: <Badge 
					status={status === 'enabled' ? 'success' : 'error'} 
					text={LabelHelper.status(status)}
				        />,
				key: id
			});
		});

		return data;

	}

	renderTable(){
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email'
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
						onClick={ e=> {
							e.preventDefault();
							this.props.navigateToDetailPage({ admin_id: record.key });
						}}
					>
						Edit
					</a>
			}
		];
		const data = this.showList();

		return(
			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
			/>
		);
	}

	onSelectStatus = statusValue => {
		this.setState({ statusValue });
	}

	renderSearchBar(){
		return(
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
				<div style={{ marginLeft: 'auto' }}>
					<Form
						onFinish={(values) => {
							this.setState({
								searchValue: values.searchVal || ''
							}, this.showList);
						}}
						ref={this.formRef}
						layout="inline"
					>
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
							>
								New Administrator
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		);
	}


	render(){
		const { loading, limit, page, total } = this.props.adminListPageProps;
		return(
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Admins</h3> 
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
					onChange={(page, pageSize) => {
						const { statusValue: status, searchValue: name } = this.state;
						const query = { page, limit: pageSize, status, name };
						this.props.getAdminList(query);
					}}
				/>
			</div>
		);
	}
}

export default AdminListPage;