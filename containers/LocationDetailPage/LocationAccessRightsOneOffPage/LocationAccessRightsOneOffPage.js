/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { notification, Button, Divider, Table, Form, Modal, Row, Col, Select, DatePicker, Input, Pagination } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { PlusSquareFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import LabelHelper from '../../../helpers/Label';

const { Option } = Select;
const { confirm } = Modal;

class LocationAccessRightsOneOffPage extends Component {

	formRef = React.createRef();

	state = {
		modalState: false,
		accessRightsOneOffData: {},
		location_id: null,
		selected_date: null,
		status: null,
		disabled: true,
		loadingSubmit: false
	}

	showSuspendConfirm = (id, suspendFunction) => {
		confirm({
			title: 'Are you sure you want to suspend this access right?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				suspendFunction(id);
			},
			onCancel() {
			}
		});

	}

	showUnsuspendConfirm = (id, unsuspendFunction) => {
		confirm({
			title: 'Are you sure you want to reactivate this access right?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				unsuspendFunction(id);
			},
			onCancel() {
			}
		});
	}

	componentDidMount(){
		this.getAccessRightsOneOffsByLocationId();
		this.props.getUserList();
	}

	getAccessRightsOneOffsByLocationId(page, limit){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		if(query.id){
			query && this.props.getAccessRightsOneOffsByLocationId({ location_id: query.id, page, limit });
			this.setState({ location_id: query.id });
		}
		
	}

	checkFormValues = () => {
		if(
			this.formRef.current.getFieldValue('user_id') &&
			this.formRef.current.getFieldValue('start_time')&&
			this.formRef.current.getFieldValue('allow_emergency_access') !== undefined &&
			!_.isNil(this.formRef.current.getFieldValue('allow_emergency_access')) &&
			this.formRef.current.getFieldValue('end_time') 
		){
			this.setState({
				disabled: false
			});
		} else {
			this.setState({
				disabled: true
			});
		}
	}

	deleteField = (id) => {
		//deleting
		this.props.deleteAccessRightsOneOffById(id);
		this.getAccessRightsOneOffsByLocationId();
	}

	showDeleteConfirm = (id, name, deleteFunction) => {
		confirm({
			title: `Are you sure you want to delete the one off access rights for ${name}?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				deleteFunction(id);
			},
			onCancel() {
			}
		});
	}

	componentWillUnmount(){
  	this.props.resetPage();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta, access_rights_one_offs: prevAccessRightsOneOffs, loadingSubmit: prevLoadingSubmit } = prevProps.accessRightsOneOffPageProps;
		const { meta, access_rights_one_offs, loadingSubmit } = this.props.accessRightsOneOffPageProps;

		if( prevAccessRightsOneOffs !== access_rights_one_offs ) {
			this.setState({
				...this.state,
				access_rights_one_offs
			});
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
					accessRightsOneOffData: {},
					selected_date: null,
					selected_time: null,
					disabled: true,
					status: null
				});
				this.getAccessRightsOneOffsByLocationId();
			}
			this.props.resetMeta();
		}
		if (loadingSubmit !== prevLoadingSubmit) {
			this.setState({
				loadingSubmit
			});
		}
	}

	disableToday = (current) => {
		return current && current < moment().subtract(1, 'days');
	}

	disabledDates = (current) => {
		return current && current < moment(this.state.selected_date, 'YYYY-MM-DD');
	}

	renderModal = () => {
		const { users, loadingSubmit, page, limit } = this.props.accessRightsOneOffPageProps || {};
		const { reactivateAccessRightsByOneOffById, suspendAccessRightsByOneOffById } = this.props;
		const { modalState, accessRightsOneOffData, location_id: stateLocationId, status: stateStatus } = this.state;
		const { user_id, _id, location_id, start_time, end_time, allow_emergency_access, updated_at } = accessRightsOneOffData || {};

		return (
			<Modal
				title="Access Rights (One Off)"
				footer={null}
				destroyOnClose={true}
				onCancel={(e) => {
					e.preventDefault();
					this.setState({
						modalState: false,
						accessRightsOneOffData: {},
						disabled: true,
						status: null
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
									user_id: user_id && user_id._id,
									start_time: start_time ? moment(start_time) : null,
									status: stateStatus ? LabelHelper.status(stateStatus) : '',
									end_time: start_time ? moment(end_time) : null,
									allow_emergency_access
								}
							}
							style={{ marginTop: '15px' }}
							onFinish={(values) => {

								const formatedValues = {
									user_id: values.user_id,
									status: 'enabled',
									access_count: 30, 
									max_access_count: 30,
									location_id: location_id ? location_id : stateLocationId,
									start_time: moment(values.start_time).format('YYYY-MM-DDTHH:mm:ssZ'),
									end_time: moment(values.end_time).format('YYYY-MM-DDTHH:mm:ssZ'),
									allow_emergency_access: values.allow_emergency_access
								};


								if(!_.isEmpty(accessRightsOneOffData)) {
									formatedValues._id =_id;
									formatedValues.updated_at = updated_at;
									this.props.onSubmit(formatedValues);
								} else {
									// Create
									this.props.onSubmit(formatedValues);
									this.getAccessRightsOneOffsByLocationId(page, limit);
								}

							}}
							ref={this.formRef}
							layout="vertical"
						>
							<Form.Item
								name="user_id"
								label="User"
								rules={[{ required: true, message: 'User is missing' }]}
								onChange={this.checkFormValues}
							>
								<Select
									onChange={this.checkFormValues}
								>
									{users && users.map((user, index) => {
										return (
											<Option
												key={index}
												value={user._id}
											>{user.name}</Option>
										);
									})}
								</Select>
							</Form.Item>

							{
								!_.isEmpty(accessRightsOneOffData) ?
									<div>
										<p>Status</p>
										<Row>
											<Col span={17}>

												<Form.Item
													style={{ width: '100%' }}
													name="status"
												>
													<Input
														disabled
														style={{ width: '100%' }}
													/>
												</Form.Item>
										
											</Col>
											<Col span={7}>

												{ stateStatus === 'enabled' ? 

													<div>
														<Form.Item style={{ float: 'right' }}>
															<Button
																style={{ backgroundColor: '#e3ce14', color: 'white' }}
																onClick={ e => {
																	e.preventDefault();
																	this.showSuspendConfirm(_id, suspendAccessRightsByOneOffById);
																}}
															>
												Suspend
															</Button>
														</Form.Item>
													</div>

													:

													<div>
														<Form.Item style={{ float: 'right' }}>
															<Button
																style={{ backgroundColor: '#ff4d4f', color: 'white' }}
																onClick={ e => {
																	e.preventDefault();
																	this.showUnsuspendConfirm(_id, reactivateAccessRightsByOneOffById);
																}}
															>
												Reactivate
															</Button>
														</Form.Item>
													</div>

												}
										
											</Col>
										</Row>
									</div>

									:

									''
							}

							<Row>
								<Col span={12}>
									<Form.Item
										name="start_time"
										label="Start date"
										rules={[{ required: true, message: 'Start Date is empty' }]}
										onChange={this.checkFormValues}
									>
										<DatePicker 
											style={{ width: '95%' }}
											showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
											format="YYYY-MM-DD HH:mm"
											minuteStep={5}
											onChange={(value) => {
												this.formRef.current.setFieldsValue({ 'end_time': null });
												this.setState({
													selected_date: value
												});
												this.checkFormValues();
											}}
											disabledDate={this.disableToday}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="end_time"
										label="End date"
										rules={[{ required: true, message: 'End Date is empty' }]}
										onChange={this.checkFormValues}
									>
										<DatePicker 
											showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }}
											style={{ width: '95%' }}
											 format="YYYY-MM-DD HH:mm"
											minuteStep={5}
											onChange={this.checkFormValues}
											disabledDate={this.disabledDates}
										/>
									</Form.Item>
								</Col>
							</Row>

							<Form.Item
								label="Can Access During Emergency"
								name="allow_emergency_access"
								onChange={this.checkFormValues}
								rules={[{ required: true, message: 'Value is missing' }]}
							>
								<Select
									onChange={this.checkFormValues}
								>
									<Select.Option value={true}>Yes</Select.Option>
									<Select.Option value={false}>No</Select.Option>
								</Select>
							</Form.Item>
							
							<Form.Item>
								<Button
									style={{ float: 'right' }}
									type="primary"
									htmlType="submit"
									loading={loadingSubmit}
									disabled={this.state.disabled}
								>Save</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Modal>
		);
	}

	render(){
		const { access_rights_one_offs, limit, page, total } = this.props.accessRightsOneOffPageProps;
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
				title: 'Start Date',
				dataIndex: 'start_date_display'
			},
			{
				title: 'End Date',
				dataIndex: 'end_date_display'
			},
			{
				title: 'Action',
				dataIndex: 'action'
			}
		];

		const data = [];
		// eslint-disable-next-line array-callback-return
		access_rights_one_offs && access_rights_one_offs.length && access_rights_one_offs.map((access_rights_one_off) => {
			data.push({
				key: access_rights_one_off._id,
				name: access_rights_one_off.user_id.name,
				email: access_rights_one_off.user_id.email,
				start_date: access_rights_one_off.start_time,
				end_date: access_rights_one_off.end_time,
				start_date_display: moment(access_rights_one_off.start_time).format('MMMM Do YYYY, h:mm a'),
				end_date_display: moment(access_rights_one_off.end_time).format('MMMM Do YYYY, h:mm a'),
				action: (
					<a 
						onClick={
							(e) => {
								e.preventDefault();
								this.setState({ modalState: true, accessRightsOneOffData: access_rights_one_off, status: access_rights_one_off.status });
							}
						}
					>Edit</a>
				)
			});
		});

		return (
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span>Access Rights (One off)</span>
					<div className="component-buttons">
						<span>
							<Button
								type="primary"
								icon={<PlusSquareFilled />}
								onClick={(e) => {
									e.preventDefault();
									this.setState({ modalState: true });
								}}
							> Add access rights (One off)</Button>
						</span>
					</div>
				</div>
				<Divider/>
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
				/>
				<Pagination
					style={{ marginTop: '30px' }}
					showSizeChanger
					defaultPageSize={limit}
					current={page}
					total={total}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSizeOptions={['5', '10', '20', '50']}
					onChange={(page, pageSize) => this.getAccessRightsOneOffsByLocationId(page, pageSize)}
				/>
				{this.renderModal()}
			</div>
		);
	}

}

export default LocationAccessRightsOneOffPage;