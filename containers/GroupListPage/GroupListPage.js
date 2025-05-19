/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table, Input, Button, Badge, Row, Col, Divider, Form, Radio, Modal, Pagination } from 'antd';
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons';
import LabelHelper from '../../helpers/Label';
import Loading from '../../components/loading';

class GroupListPage extends Component {

	state = {
		modalState: false,
		filterState: 'all',
		searchValue: ''
	}

	componentDidMount(){
		this.props.getGroups();
		this.props.resetDetailPage();
	}

	showList = () => {
		const { searchValue } = this.state;
		const { filterState } = this.state;
		// let suspendStatus;
		// if(filterState === 'suspended'){
		// 	suspendStatus = true;
		// }else if(filterState === 'unsuspended'){
		// 	suspendStatus = false;
		// }else if(filterState === 'all'){
		// 	suspendStatus = 'all';
		// }
		const { groups } = this.props.groupListPageProps || {};
		const data = [];
		// eslint-disable-next-line array-callback-return
		groups && groups.length && groups.map((group) => {
			const { status, _id: id, department_id, name } = group;
			if (searchValue !== '') {
				if (name.toLowerCase().includes(searchValue)) {
					data.push({
						name,
						status: <Badge 
							status={status === 'enabled' ? 'success' : 'error'} 
							text={LabelHelper.status(status)}
						        />,
						key: id
					});
				}
			}
			else if(status === filterState){
				data.push({
					name,
					status: <Badge 
						status={status === 'enabled' ? 'success' : 'error'} 
						text={LabelHelper.status(status)}
					        />,
					key: id
				});
			}else if(filterState === 'all'){
				data.push({
					name,
					status: <Badge 
						status={status === 'enabled' ? 'success' : 'error'} 
						text={LabelHelper.status(status)}
					        />,
					key: id
				});
			}
		});

		return data;

	}

	renderModal = () => {
		const { modalState, filterState } = this.state;

		return (
			<Modal
				title="Filter"
				footer={null}
				destroyOnClose={true}
				onCancel={(e) => {
					e.preventDefault();
					this.setState({
						modalState: false
					});
				}}
				visible={modalState}
			>
				<Row
					responsive="true"
				>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={24}
						xl={24}
					>
						<Form
							initialValues={
								{
									suspendedFilter: filterState
								}
							}
							style={{ marginTop: '15px' }}
							onFinish={(values) => {

								this.setState({
									filterState: values.suspendedFilter,
									modalState: false
								});

							}}
							ref={this.formRef}
							layout="vertical"
						>
							<Form.Item
								name="suspendedFilter"
								label="Status Filter"
							>
								<Radio.Group
									value={filterState}
								>
									<Radio value="enabled">Suspended</Radio>
									<Radio value="disabled">Unsuspended</Radio>
									<Radio value="all">All</Radio>
								</Radio.Group>
							</Form.Item>
							
							<Form.Item>
								<Button
									style={{ float: 'right' }}
									type="primary"
									htmlType="submit"
									disabled={this.state.disabled}
								>Filter</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Modal>
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
							this.props.navigateToDetailPage(record.key);
						}}
					>
						Edit
					</a>
			}
		];

		return(
			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
			/>
		);
	}

	render(){
		const { loading, limit, page, total } = this.props.groupListPageProps;
		return(
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Groups</h3> 
				</div>
				<Divider/>
				<div style={{ display: 'flex', marginBottom: '25px' }}>
					<div style={{ marginLeft: 'auto' }}>
						<Button
							type="primary"
							size="middle"
							icon={<PlusSquareFilled />}
							onClick={this.props.navigateToAddPage}
						>New Group</Button>
					</div>
				</div>
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
					onChange={(page, pageSize) => this.props.getGroups({ page, limit: pageSize })}
				/>
				{this.renderModal()}
			</div>
		);
	}
}

export default GroupListPage;