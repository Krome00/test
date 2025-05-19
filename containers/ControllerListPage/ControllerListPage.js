/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { notification, Button, Divider, Table, Modal, Row, Col, Form, Radio, Input } from 'antd';
import { PlusSquareFilled, SearchOutlined } from '@ant-design/icons';
import { filter } from 'lodash';
import LabelHelper from '../../helpers/Label';

const { confirm } = Modal;

class ControllerListPage extends Component {

	state = { 
		modalState: false,
		filterState: 'unsuspended'
	}

	componentDidMount(){
		this.props.getControllerList();
	}

	componentWillUnmount(){
		this.props.resetPage();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta, controllers: prevControllers } = prevProps.controllerListPageProps;
		const { meta, controllers } = this.props.controllerListPageProps;
  
		if( prevControllers !== controllers ) {
			this.setState({
				...this.state,
				controllers
			}, this.setState());
		}
		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if( type === 'success' ){
				this.setState({
					modalState: false,
					filterState: 'suspended'
				});
				this.props.getControllerList();
			}
			this.props.resetMeta();
		}
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
		const { controllers } = this.props.controllerListPageProps;
		const data = [];
		// eslint-disable-next-line array-callback-return
		controllers && controllers.length && controllers.map((controller) => {
			if(controller.suspended === status){
				
				data.push({
					controller_id: controller._id,
					name: controller.name,
					serial_number: controller.configuration ? controller.configuration.serial_number : '',
					type: controller.type,
					status: LabelHelper.status(controller.status),
					description: controller.description,
					action: (
						<a 
							onClick={
								(e) => {
									e.preventDefault();
									this.props.navigateToDetailPage({ controller_id: controller._id });
								}
							}
						>Edit</a>
					)
				});
			}else if(status === 'all'){
				data.push({
					controller_id: controller._id,
					name: controller.name,
					serial_number: controller.configuration ? controller.configuration.serial_number : '',
					type: controller.type,
					status: LabelHelper.status(controller.status),
					description: controller.description,
					action: (
						<a 
							onClick={
								(e) => {
									e.preventDefault();
									this.props.navigateToDetailPage({ controller_id: controller._id });
								}
							}
						>Edit</a>
					)
				});
			}
		});

		return data;

	}

	onClickAddButton = () => {
		return this.props.navigateToAddPage();
	};

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

	render(){
		const data = this.showList();
		const columns = [
			{
				title: 'Controller ID',
				dataIndex: 'controller_id'
			},
			{
				title: 'Name',
				dataIndex: 'name'
			},
			{
				title: 'Serial Number',
				dataIndex: 'serial_number'
			},
			{
				title: 'Status',
				dataIndex: 'status'
			},
			{
				title: 'Action',
				dataIndex: 'action'
			}
		];

		return (
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Controller</h3> 
				</div>
				<Divider/>
				<div style={{ display: 'flex', marginBottom: '25px' }}>
					<span style={{ marginRight: '10px' }}> 
						<Input
							placeholder="Search by Controller Name"
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
								icon={<PlusSquareFilled />}
								onClick={this.onClickAddButton}
							> New Controller</Button>
						</span>
					</div>
				</div>
				
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
				/>
				{this.renderModal()}
			</div>
		);
	}

}

export default ControllerListPage;