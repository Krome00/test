/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Divider, Table, Input, Button, Modal, Row, Col, Form, Radio } from 'antd';
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons';

import LabelHelper from '../../helpers/Label';

class EntityListPage extends Component {

	state = { 
		modalState: false,
		filterState: 'unsuspended'
	}

	componentDidMount(){
		this.props.getEntityList();
		this.props.resetDetailPage();
	};

	navigateToDetailPage(id){
		const query = {
			entity_id: id
		};
		this.props.navigateToDetailPage(query);
	}

	showList = () => {
		const { filterState } = this.state;
		let status;
		if(filterState === 'suspended'){
			status = true;
		}else if(filterState === 'unsuspended'){
			status = false;
		}else if(filterState === 'all'){
			status = 'all';
		}
		const { entities } = this.props.EntityListPageProps || {};
		const data = [];
		// eslint-disable-next-line array-callback-return
		entities && entities.length && entities.map((entity) => {
			const { name, type, _id: id, suspended } = entity;
			if(suspended === status){
				data.push({
					name,
					type: LabelHelper.entity_type_label(type),
					key: id
				});
			}else if(status === 'all'){
				data.push({
					name,
					type: LabelHelper.entity_type_label(type),
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
									<Radio value="suspended">Suspended</Radio>
									<Radio value="unsuspended">Unsuspended</Radio>
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

	renderTable() {
		const data = this.showList();
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Type',
				dataIndex: 'type',
				key: 'type'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				render: (text, record) => <a
					onClick={ e => {
						e.preventDefault();
						this.navigateToDetailPage(record.key);
					}}
				                          > Edit </a>
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

	renderSearchBar(){
		return(
			<div style={{ display: 'flex', marginBottom: '25px' }}>
				<span style={{ marginRight: '10px' }}> 
					<Input
						placeholder="Search by Entity Name"
						style={{ width: '100%' }}
						prefix={<SearchOutlined />}
					/>
				</span>
				<span> 
					<Button
						onClick={(e) => {
							e.preventDefault();
							this.setState({
								modalState: true
							});
						}}
					>Filter</Button>
				</span>
				<div
					className="component-buttons"
					style={{ marginLeft: 'auto' }}
				>
					<span>
						<Button
							type="primary"
							size="middle"
							icon={<PlusSquareFilled />}
							onClick={this.props.navigateToAddPage}
						>Create New Entity</Button>
					</span>
				</div>
			</div>
		);
	}

	render(){
		return(
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Entities</h3> 
				</div>
				<Divider/>
				{this.renderSearchBar()}
				{this.renderTable()}

				{this.renderModal()}
			</div>
		);
	}
}

export default EntityListPage;