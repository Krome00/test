/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { notification, Button, Divider, Table, Form, Modal, Row, Col, Select, TimePicker, DatePicker, Input, Pagination } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { PlusSquareFilled, MinusCircleOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import LabelHelper from '../../../helpers/Label';
import CommonEnum from '../../../constants/CommonEnum';

const { Option } = Select;
const { confirm } = Modal;
const { RangePicker } = TimePicker;

class LocationAccessRightsUserPage extends Component {

	formRef = React.createRef();
	// filterRef = React.createRef();

	state = {
		modalState: false,
		selected_date: null,
		accessRightsUserData: {},
		location_id: null,
		status: null,
		disabled: true,
		loadingSubmit: false
	}

	componentDidMount(){
		this.getAccessRightsUsersByLocationId();
		this.props.getUserList();
	}

	getAccessRightsUsersByLocationId(page, limit){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		if(query.id){
			query && this.props.getAccessRightsUsersByLocationId({ location_id: query.id, page, limit });
			this.setState({ location_id: query.id });
		}
		
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

	disableToday = (current) => {
		return current && current < moment().subtract(1, 'days');
	}

	disabledDates = (current) => {
		return current && current < moment(this.state.selected_date, 'YYYY-MM-DD');
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

	checkFormValues = () => {
		const access_times = this.formRef.current.getFieldValue('access_times');
		if(
			this.formRef.current.getFieldValue('user_id') &&
			this.formRef.current.getFieldValue('allow_holidays') !== undefined &&
			!_.isNil(this.formRef.current.getFieldValue('allow_holidays')) &&
			this.formRef.current.getFieldValue('allow_emergency_access') !== undefined &&
			!_.isNil(this.formRef.current.getFieldValue('allow_emergency_access')) &&
			this.formRef.current.getFieldValue('validity_start') &&
			!access_times.includes(undefined)
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
		this.props.deleteAccessRightsUserById(id);
		this.getAccessRightsUsersByLocationId();
	}

	showDeleteConfirm = (id, name, deleteFunction) => {
		confirm({
			title: `Are you sure you want to delete the access rights for ${name}?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				deleteFunction(id);
			},
			onCancel() {
			}
		});
	}

	resetDetailsPage = () => {
		//this.props.resetDetailsPage();
	}

	componentWillUnmount(){
		this.props.resetPage();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta, access_rights_users: prevAccessRightsUsers, loadingSubmit: prevLoadingSubmit } = prevProps.accessRightsUserPageProps;
		const { meta, access_rights_users, loadingSubmit } = this.props.accessRightsUserPageProps;

		if( prevAccessRightsUsers !== access_rights_users ) {
			this.setState({
				...this.state,
				access_rights_users
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
					selected_date: null,
					accessRightsUserData: {},
					disabled: true,
					status: null
				});
				this.getAccessRightsUsersByLocationId();
				this.props.getUserList();
			}
			this.props.resetMeta();
		}
		if (loadingSubmit !== prevLoadingSubmit) {
			this.setState({
				loadingSubmit
			});
		}
	}

	renderModal = () => {
		const { users, access_rights_users, loadingSubmit, limit, page } = this.props.accessRightsUserPageProps;
		const { reactivateAccessRightsByUserById, suspendAccessRightsByUserById } = this.props;
		const { modalState, accessRightsUserData, location_id: stateLocationId, status: stateStatus } = this.state;
		const { user_id, _id, location_id, access_times, allow_holidays, updated_at, allow_emergency_access, validity_start, validity_end } = accessRightsUserData || {};
		const initial_access_times = [];
		access_times && access_times.length && access_times.map(access_time => {
			const { days, start_time, end_time } = access_time;
			const time = [moment(start_time), moment(end_time)];
			initial_access_times.push({
				days,
				time: time
			});
			return true;
		});
		

		return (
			<Modal
				title="Access Rights (by Users)"
				footer={null}
				closable={false}
				destroyOnClose={true}
				onCancel={(e) => {
					e.preventDefault();
					this.setState({
						modalState: false,
						selected_date: null,
						accessRightsUserData: {},
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
									allow_holidays,
									access_times: initial_access_times,
									status: stateStatus ? LabelHelper.status(stateStatus) : '',
									allow_emergency_access,
									validity_start: validity_start ? moment(new Date(validity_start)) : null,
									validity_end: validity_end ? moment(new Date(validity_end)) : null
								}
							}
							style={{ marginTop: '15px' }}
							onFinish={(values) => {

								const access_times = values.access_times.map((access_time) => {

									const { days, time } = access_time;
									return({
										days,
										start_time: moment(time[0]).format('YYYY-MM-DDTHH:mm:ssZ'),
										end_time: moment(time[1]).format('YYYY-MM-DDTHH:mm:ssZ')
									});

								});
								const formatedValues = {
									user_id: values.user_id,
									allow_holidays: values.allow_holidays,
									allow_emergency_access: values.allow_emergency_access,
									validity_start: values.validity_start,
									validity_end: values.validity_end,
									status: 'enabled',
									access_times,
									location_id: location_id ? location_id : stateLocationId
								};


								if(!_.isEmpty(accessRightsUserData)) {
									formatedValues._id =_id;
									formatedValues.updated_at = updated_at;
									this.props.onSubmit(formatedValues);
								} else {
									// Create
									this.props.onSubmit(formatedValues);
									this.getAccessRightsUsersByLocationId(page, limit);
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
												disabled={access_rights_users && access_rights_users.length && access_rights_users.filter(acr => acr.user_id._id === user._id).length > 0 ? true : false}
											>{user.name}</Option>
										);
									})}
								</Select>
							</Form.Item>

							{
								!_.isEmpty(accessRightsUserData) ?
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
																	this.showSuspendConfirm(_id, suspendAccessRightsByUserById);
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
																	this.showUnsuspendConfirm(_id, reactivateAccessRightsByUserById);
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

							<Form.Item
								label="Allow access on public holiday"
								name="allow_holidays"
								onChange={this.checkFormValues}
								rules={[{ required: true, message: 'Value is missing' }]}
							>
								<Select
									onChange={this.checkFormValues}
								>
									<Select.Option value={true}> Allow </Select.Option>
									<Select.Option value={false}> Disallow </Select.Option>
								</Select>
							</Form.Item>
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

							<Form.Item
								label="Valid From Date Time"
								name="validity_start"
								onChange={this.checkFormValues}
								rules={[{ required: true, message: 'Value is missing' }]}
							>
								<DatePicker
									style={{ width: '100%' }}
									format="YYYY-MM-DD"
									minuteStep={5}
									onChange={(value) => {
										this.formRef.current.setFieldsValue({ 'validity_end': null });
										this.setState({
											selected_date: value
										});
										this.checkFormValues();
									}}
									disabledDate={this.disableToday}
								/>
							</Form.Item>
							<Form.Item
								label="Valid Until Date Time"
								name="validity_end"
								onChange={this.checkFormValues}
							>
								<DatePicker 
									style={{ width: '100%' }}
									format="YYYY-MM-DD"
									minuteStep={5}
									onChange={this.checkFormValues}
									disabledDate={this.disabledDates}
								/>
							</Form.Item>


							<Form.List
								name="access_times"
								onChange={this.checkFormValues}
							>
								{(fields, { add, remove }) => (
									<>
										<div
											style={{ marginBottom: 5 }}
										><label
												style={{
													display: 'inline-block',
													marginRight: 4,
													color: '#ff4d4f',
													fontSize: 14,
													fontFamily: 'SimSun, sans-serif',
													lineHeight: 1,
													content: '*'
												}}
											>*</label> Access details: </div>
										{fields.map(({ key, name, fieldKey, ...restField }, index) => {
											return (
												<div
													key={key}
													style={{ display: 'flex', marginBottom: -20 }}
												>
													<Form.Item
														{...restField}
														name={[name, 'days']}
														style={{ width: '100%', paddingRight: 10 }}
														fieldKey={[fieldKey, 'days']}
														rules={[{ required: true, message: 'Missing value for Access days' }]}
														onChange={this.checkFormValues}
													>
														<Select
															mode = "multiple"
															allowClear
															placeholder="Select days"
															onChange={this.checkFormValues}
														>
															{
																CommonEnum.days.map((day, index) => (
																	<Select.Option
																		key={index}
																		value={day}
																	>{day}</Select.Option>
																))
															}
														</Select>
													</Form.Item>

													<Form.Item
														{...restField}
														name={[name, 'time']}
														style={{ width: '100%', paddingRight: 10 }}
														fieldKey={[fieldKey, 'time']}
														rules={[{ required: true, message: 'Missing value for Access time' }]}
														onChange={this.checkFormValues}
													>
														<RangePicker 
															format="HH:mm"
															use12Hours={true}
															minuteStep={5}
															onChange={this.checkFormValues}
														/>
													</Form.Item>

													<MinusCircleOutlined
														onClick={() => {
															remove(name);
															this.checkFormValues();
														}}
														style={{ marginTop: 8 }}
													/>
												</div>
											);
										}
										)}
										<Form.Item style={{ marginTop: 5 }}>
											Add Access Details &nbsp;
											<PlusSquareFilled
												onClick={() => {
													add();
													this.checkFormValues();
												}}
												style={{ fontSize: '110%', backgroundColor: '#fff', color: '#0B3266', cursor: 'pointer' }}
											/>
										</Form.Item>
									</>
								)}
							</Form.List>

							
							<Form.Item>
								<Button
									style={{ float: 'right' }}
									type="primary"
									htmlType="submit"
									loading={loadingSubmit}
									disabled={this.state.disabled}
								>Save</Button>

								<Button
									style={{ marginRight: '15px', float: 'right' }}
									type="default"
									onClick={e => {
										e.preventDefault();
										this.setState({
											modalState: false,
											selected_date: null,
											accessRightsUserData: null,
											create: false
										});
									}}
								>Cancel</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Modal>
		);
	}

	renderSearchBar = (access_rights_users) => {
		return(
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<span> The specified users in the list can access the location in different date and time. </span>
				{/* <Form
					ref={this.filterRef}
					onFinish={(values) => {
						const { name } = values;
					}}
				>
					<Form.Item
						name="name"
						style={{ marginLeft: 'auto', marginRight: '10px', width: '200px' }}
					>
						<Input
							placeholder="Search by Name"
							style={{ width: '100%', borderRadius: '5px' }}
							prefix={<SearchOutlined />}
						/>
					</Form.Item>

					<Form.Item
						className="component-buttons"
						style={{ marginRight: '10px' }}
					>
						<Button
							type="primary"
							htmlType="submit"
							onClick={this.onClickSearchButton}
						>Search</Button>
					</Form.Item>
				</Form> */}
				
				<div className="component-buttons">
					<span>
						<Button
							type="primary"
							icon={<PlusSquareFilled />}
							onClick={(e) => {
								e.preventDefault();
								this.setState({ modalState: true });
							}}
						> Add access rights (By User)</Button>
					</span>
				</div>
			</div>
		);
	}

	render(){
		const { access_rights_users, limit, page, total } = this.props.accessRightsUserPageProps;
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name'
			},
			{
				title: 'Access Hours',
				dataIndex: 'access_hours'
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

		const data = [];
		// eslint-disable-next-line array-callback-return
		access_rights_users && access_rights_users.length && access_rights_users.map((access_rights_user) => {
			const { access_times } = access_rights_user;
			const access_hours = access_times && access_times.length && access_times.map(at => 
				<li>{at && at.days && at.days.join(' ')} ({ moment(new Date(at.start_time)).format('HH:mm a') } - {moment(new Date(at.end_time)).format('HH:mm a')})</li>	
			);
			data.push({
				key: access_rights_user._id,
				name: access_rights_user.user_id.name,
				access_hours,
				status: LabelHelper.status(access_rights_user.status),
				action: (
					<a 
						onClick={
							(e) => {
								e.preventDefault();
								this.setState({ modalState: true, accessRightsUserData: access_rights_user, status: access_rights_user.status });
							}
						}
					>Edit</a>
				)
			});
		});

		return (
			<div className="main-content">
				{this.renderSearchBar(access_rights_users)}
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
					onChange={(page, pageSize) => this.getAccessRightsUsersByLocationId(page, pageSize)}
				/>
				{this.renderModal()}
			</div>
		);
	}

}

export default LocationAccessRightsUserPage;