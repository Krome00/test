import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Table, Divider, Badge, Modal, Button, Input, Row, Col, Form, DatePicker, notification, Select, Pagination } from 'antd';
import { PlusSquareFilled, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import LabelHelper from '../../../helpers/Label';

const { confirm } = Modal;

class LocationAdminRolesPage extends Component {

	formRef = React.createRef();

	state = {
		modal: false,
		create: false,
		selected_date: null,
		current_admin_role: null,
		disableSave: true,
		loadingSubmit: false,
		disableUser: false

	}

	componentDidMount() {
		this.getAdminRoles();
		this.props.getAdminList();
	}

	showSuspendConfirm = (id, suspendFunction) => {
		confirm({
			title: 'Are you sure you want to suspend this admin role?',
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
			title: 'Are you sure you want to reactivate this admin role?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				unsuspendFunction(id);
			},
			onCancel() {
			}
		});
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta, loadingSubmit: prevLoadingSubmit } = prevProps.locationAdminRolesPage;
		const { meta, loadingSubmit } = this.props.locationAdminRolesPage;
		if(meta !== prevMeta){
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if(type === 'success') {
				this.setState({
					modal: false,
					selected_date: null,
					current_admin_role: null,
					disableSave: true,
					create: false
				});
			}
		}
		if (loadingSubmit !== prevLoadingSubmit) {
			this.setState({
				loadingSubmit
			});
		}
	}

	onSubmit = (values) => {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const { current_admin_role } = this.state;
		const { _id } = current_admin_role || {};
		const { email } = values;
		const fields = {
			...values,
			email: email.trim(),
			location_id: query.id
		};
		if(_id) {
			fields.id = _id;
		}
		this.props.onSubmit(fields);
	}

	getAdminRoles = () => {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		query && query.id && this.props.getAdminRolesByLocationId({ location_id: query.id });
	}

	disableToday = (current) => {
		return current && current < moment().subtract(1, 'days');
	}

	disabledDates = (current) => {
		return current && current < moment(this.state.selected_date, 'YYYY-MM-DD');
	}

	checkFormValues = () => {
		if(
			this.formRef.current.getFieldValue('email') &&
			this.formRef.current.getFieldValue('start_date') 
		) {
			this.setState({
				disableSave: false
			});
		} else {
			this.setState({
				disableSave: true
			});
		}
	}

	renderTable = () => {
		const { admin_roles } = this.props.locationAdminRolesPage || {};
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Email Address',
				dataIndex: 'email',
				key: 'email'
			},
			{
				title: 'Status',
				dataIndex: 'display_status',
				key: 'display_status'
			},
			{
				title: 'Admin Type',
				dataIndex: 'admin_type',
				key: 'admin_type'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => 
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a
						onClick={ e=> {
							this.setState({
								current_admin_role: record,
								modal: true
							});
						}}
					>
						View
					</a>

			}
		];
		const data = [];
		admin_roles && admin_roles.length && admin_roles.map(ar => {
			const { admin_id, _id, status, start_date, end_date, admin_type } = ar;
			const { name, email } = admin_id;
			data.push({
				name,
				email,
				key: _id,
				_id,
				start_date,
				end_date,
				admin_type: LabelHelper.admin_role(admin_type),
				status,
				display_status: <Badge
					status={status === 'enabled' ? 'success' : 'error'}
					text={LabelHelper.status(status)}
				                />
			});

			return true;
		});

		return (
			<Table
				pagination={false}
				dataSource={data}
				columns={columns}
			/>
		);
	}

	renderSearchBar = () => {
		return(
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				{/* <span> 
					<Input
						placeholder="Search by Name/Email"
						style={{ width: '100%' }}
						prefix={<SearchOutlined />}
					/>
				</span> */}
				<div
					className="component-buttons"
					style={{ marginLeft: 'auto' }}
				>
					<span>
						<Button
							type="primary"
							size="middle"
							icon={<PlusSquareFilled />}
							onClick={ (e) => {
								e.preventDefault();
								this.setState({
									modal: true,
									create: true,
									disableUser: false
								});
							}
							}
						>Add Administrator</Button>
					</span>
				</div>
			</div>
		);
	} 

	renderModal = () => {
		const { suspendAdminRoleById: onSuspend, reactivateAdminRoleById: onUnsuspend } = this.props;
		const { loadingSubmit } = this.props.locationAdminRolesPage;
		const { admins: admin_list } = this.props.adminListPageProps;
		const { current_admin_role, create, disableUser } = this.state;
		const { email, start_date, end_date, _id, status } = current_admin_role || {};
		const { modal } = this.state;

		return(
			<Modal
				destroyOnClose={true}
				closable={false}
				footer={null}
				visible={modal}
				width={650}
			>
				<Row
					response={true}
					gutter={24}
				>
					<Col
						xs={24} 
						sm={24} 
						md={24} 
						lg={24} 
						xl={24}
					>
						<h3> Add Location Administrator </h3>
						<Divider />
						<Form
							layout="vertical"
							onFinish={(values) => {
								this.setState({
									disableUser: true
								});
								
								this.onSubmit(values);
							}}
							ref={this.formRef}
							initialValues={{
								email,
								start_date: start_date ? moment(new Date(start_date)) : null,
								end_date: end_date ? moment(new Date(end_date)) : null,
								status: status ? status : 'enabled'
							}}
						>
							{
								disableUser && !create ?
									<div>
										<Form.Item
											label="User"
											name="email"
											placeholder="User"
											rules={[{ required: true, message: 'User is missing' }]}
											onChange={this.checkFormValues}
											disabled={true}
										>
											<Select
												placeholder="User"
												disabled={true}
											>
									
												{ admin_list && admin_list.length && admin_list.map( (admin_list, index) => 
													<Select.Option 
														value={admin_list.email}
														key={index}
													> {admin_list.name} </Select.Option>
												)}
											</Select>
										</Form.Item>
										<div>
											<p>Status</p>
											<Row>
												<Col span={17}>

													<Form.Item
														style={{ width: '100%' }}
														name="status"
													>
														<Select
															disabled={true}
														>
															<Select.Option value="enabled"> Enabled </Select.Option>
															<Select.Option value="disabled"> Disabled </Select.Option>
														</Select>
													</Form.Item>
							
												</Col>
												<Col span={7}>

													{ status === 'enabled' ? 

														<div>
															<Form.Item style={{ float: 'right' }}>
																<Button
																	style={{ backgroundColor: '#e3ce14', color: 'white' }}
																	onClick={ e => {
																		e.preventDefault();
																		this.showSuspendConfirm(_id, onSuspend);
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
																		this.showUnsuspendConfirm(_id, onUnsuspend);
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
										<Form.Item
											label="Start Date"
											name="start_date"
											rules={[{ required: true, message: 'Start Date is missing' }]}
											onChange={this.checkFormValues}
											disabled={true}
										>
											<DatePicker 
												disabled={true}
												style={{ width: '100%' }}
												format="YYYY-MM-DD"
												minuteStep={5}
												onChange={(value) => {
													this.formRef.current.setFieldsValue({ 'end_date': null });
													this.setState({
														selected_date: value
													});
													this.checkFormValues();
												}}
												disabledDate={this.disableToday}
											/>
										</Form.Item>
										<Form.Item
											label="End Date"
											name="end_date"
											onChange={this.checkFormValues}
											disabled={true}
										>
											<DatePicker 
												disabled={true}
												style={{ width: '100%' }}
												dformat="YYYY-MM-DD"
												minuteStep={5}
												onChange={this.checkFormValues}
												disabledDate={this.disabledDates}
											/>
										</Form.Item>

										<Form.Item>
											<Button
												style={{ marginRight: '15px', float: 'right' }}
												type="default"
												onClick={e => {
													e.preventDefault();
													this.setState({
														modal: false
													});
												}}
											>Done</Button>
										</Form.Item>


									</div> :
									<div>
										<Form.Item
											label="User"
											name="email"
											placeholder="User"
											rules={[{ required: true, message: 'User is missing' }]}
											onChange={this.checkFormValues}
										>
											<Select
												placeholder="User"
											>
									
												{ admin_list && admin_list.length && admin_list.map( (admin_list, index) => 
													<Select.Option 
														value={admin_list.email}
														key={index}
													> {admin_list.name} </Select.Option>
												)}
											</Select>
										</Form.Item>
										<Form.Item
											label="Start Date"
											name="start_date"
											rules={[{ required: true, message: 'Start Date is missing' }]}
											onChange={this.checkFormValues}
										>
											<DatePicker 
												style={{ width: '100%' }}
												format="YYYY-MM-DD"
												minuteStep={5}
												onChange={(value) => {
													this.formRef.current.setFieldsValue({ 'end_date': null });
													this.setState({
														selected_date: value
													});
													this.checkFormValues();
												}}
												disabledDate={this.disableToday}
											/>
										</Form.Item>
										<Form.Item
											label="End Date"
											name="end_date"
											onChange={this.checkFormValues}
										>
											<DatePicker 
												style={{ width: '100%' }}
												dformat="YYYY-MM-DD"
												minuteStep={5}
												onChange={this.checkFormValues}
												disabledDate={this.disabledDates}
											/>
										</Form.Item>
										<Form.Item>
											<Button 
												style={{ float: 'right' }}
												disabled={this.state.disableSave}
												type="primary"
												htmlType="submit"
												loading={loadingSubmit}
											>Save</Button>
											<Button
												style={{ marginRight: '15px', float: 'right' }}
												type="default"
												onClick={e => {
													e.preventDefault();
													this.setState({
														modal: false,
														disabled: true,
														create: false,
														selected_date: null,
														current_admin_role: null,
														disableSave: false
													});
												}}
											>Cancel</Button>
										</Form.Item>
									</div>
							}
							
							
						</Form>
					</Col>
				</Row>
			</Modal>
		);
	}

	render() {
		return(
			<div className="main-content">
				{this.renderSearchBar()}
				<Divider />
				{this.renderTable()}
				{this.renderModal()}
			</div>
		);
	}
};

export default LocationAdminRolesPage;