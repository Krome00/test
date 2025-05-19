/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { notification, Button, Divider, Table, Form, Modal, Row, Col, Select, DatePicker, Input } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { PlusSquareFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import LabelHelper from '../../../helpers/Label';
import LocalStorageHelper from '../../../helpers/local_storage';
import CommonEnum from '../../../constants/CommonEnum';

const { Option } = Select;
const { confirm } = Modal;

class AdminDepartmentPage extends Component {
	formRef = React.createRef();

	state = {
		modalState: false,
		adminRolesData: {},
		admin_id: null,
		selected_date: null,
		start_date: null,
		end_date: null,
		status: null,
		disabled: true,
		loadingSubmit: false
	};

	setStatusValue = admin_role => {
		this.formRef.current.setFieldsValue({
			status: admin_role.status
		});
	};

	showSuspendConfirm = (id, suspendFunction) => {
		confirm({
			title: 'Are you sure you want to suspend this Department?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				suspendFunction(id);
			},
			onCancel() {}
		});
	};

	showUnsuspendConfirm = (id, unsuspendFunction) => {
		confirm({
			title: 'Are you sure you want to unsuspend this Department?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				unsuspendFunction(id);
			},
			onCancel() {}
		});
	};

	componentDidMount() {
		this.getAdminRolesByAdminId();
		this.props.getDepartments();
	}

	getAdminRolesByAdminId() {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		if (query.id) {
			query && this.props.getAdminRolesByAdminId(query.id);
			this.setState({ admin_id: query.id });
		}
	}

	checkFormValues = () => {
		if (
			this.formRef.current.getFieldValue('department_id') &&
			this.formRef.current.getFieldValue('start_date') &&
			this.formRef.current.getFieldValue('end_date')
		) {
			this.setState({
				disabled: false
			});
		} else {
			this.setState({
				disabled: true
			});
		}
	};

	componentWillUnmount() {
		this.props.resetPage();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, admin_roles: prevAdminRoles, loadingSubmit: prevLoadingSubmit } = prevProps.adminDepartmentPageProps;
		const { meta, admin_roles, loadingSubmit } = this.props.adminDepartmentPageProps;

		if (prevAdminRoles !== admin_roles) {
			this.setState({
				...this.state,
				admin_roles
			});
			
		}
		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if (type === 'success') {
				this.setState({
					modalState: false,
					adminRolesData: {},
					start_date: null,
					end_date: null,
					status: null,
					disabled: true
				});
				this.getAdminRolesByAdminId();
			}
			this.props.resetMeta();
		}

		if (loadingSubmit !== prevLoadingSubmit) {
			this.setState({
				loadingSubmit
			});
	  }
	}

	disableToday = current => {
		return current && current < moment().subtract(1, 'days');
	};

	disableDatesBefore = current => {
		return current && current < moment(this.state.selected_date, 'YYYY-MM-DD');
	};

	renderModal = () => {
		const { admin_type: adminTypeSelect } = CommonEnum;
		const { admin_roles, departments, loadingSubmit } = this.props.adminDepartmentPageProps;
		const { suspendAdminRoleById, unsuspendAdminRoleById } = this.props;
		const { modalState, adminRolesData, admin_id: stateAdminId, status: stateStatus } = this.state;
		const { _id, admin_id, admin_type, department_id, start_date, end_date, status, updated_at } = adminRolesData || {};

		return (
			<Modal
				title="Administrated Department"
				footer={null}
				destroyOnClose={true}
				onCancel={e => {
					e.preventDefault();
					this.setState({
						modalState: false,
						adminRolesData: {},
						status: null,
						disabled: true
					});
				}}
				visible={modalState}
			>
				<Row responsive="true">
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
									department_id: this.state.adminRolesData.department_id?._id,
									admin_type: 'department',
									start_date: start_date ? moment(start_date) : null,
									end_date: end_date ? moment(end_date) : null,
									status: stateStatus ? LabelHelper.status(stateStatus) : ''
								}
							}
							style={{ marginTop: '15px' }}
							onFinish={values => {
								console.log(values);
								const formatedValues = {
									department_id: values.department_id,
									admin_id: admin_id ? admin_id : stateAdminId,
									admin_type: values.admin_type,
									start_date: moment(values.start_date).format('YYYY-MM-DDTHH:mm:ssZ'),
									end_date: moment(values.end_date).format('YYYY-MM-DDTHH:mm:ssZ')
								};
								if (!_.isEmpty(adminRolesData)) {
									formatedValues._id = _id;
									formatedValues.updated_at = updated_at;
									this.props.onSubmit(formatedValues);
								} else {
									// Create
									this.props.onSubmit(formatedValues);
								}
							}}
							ref={this.formRef}
							layout="vertical"
						>
							<Form.Item
								name="department_id"
								label="Department"
								rules={[{ required: true, message: 'Department is missing' }]}
								onChange={this.checkFormValues}
							>
								<Select
									onChange={this.checkFormValues}
								>
									{departments &&
								departments.map((department, index) => {
									return (
										<Option
											disabled={admin_roles && admin_roles.length && admin_roles.some(dept => dept.department_id && dept.department_id._id === department._id)}
											key={index}
											value={departments[index]._id}
										>
											{departments[index].name}
										</Option>
									);
								})}
								</Select>
							</Form.Item>

							<Form.Item
								name="admin_type"
								label="Admin Type"
								rules={[{ required: true, message: 'Department is missing' }]}
								onChange={this.checkFormValues}
							>
								<Select
									disabled={true}
									onChange={this.checkFormValues}
								>
									{adminTypeSelect &&
										adminTypeSelect.map((adminType, index) => {
											if (adminType !== 'null' && adminType !== 'it_admin') {
												return (
													<Option
														key={index}
														value={adminType}
													>
														{LabelHelper.admin_role(adminType)}
													</Option>
												);
											}
										})}
								</Select>
							</Form.Item>

							<Row>
								<Col span={12}>
									<Form.Item
										name="start_date"
										label="Start date"
										rules={[{ required: true, message: 'Start Date is empty' }]}
										onChange={this.checkFormValues}
									>
										<DatePicker
											style={{ width: '95%' }}
											format="YYYY-MM-DD HH:mm"
											showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
											minuteStep={5}
											disabledDate={this.disableToday}
											onChange={value => {
												this.setState({
													selected_date: value
												});
												this.formRef.current.setFieldsValue({ end_date: null });

												this.checkFormValues();
											}}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="end_date"
										label="End date"
										rules={[{ required: true, message: 'End Date is empty' }]}
										onChange={this.checkFormValues}
									>
										<DatePicker
											style={{ width: '95%' }}
											format="YYYY-MM-DD HH:mm"
											showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
											disabledDate={this.disableDatesBefore}
											minuteStep={5}
											onChange={this.checkFormValues}
										/>
									</Form.Item>
								</Col>
							</Row>

							{!_.isEmpty(adminRolesData) ? (
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
											{stateStatus === 'enabled' ? (
												<div>
													<Form.Item style={{ float: 'right' }}>
														<Button
															style={{ backgroundColor: '#e3ce14', color: 'white' }}
															onClick={e => {
																e.preventDefault();
																this.showSuspendConfirm(_id, suspendAdminRoleById);
															}}
														>
															Suspend
														</Button>
													</Form.Item>
												</div>
											) : (
												<div>
													<Form.Item style={{ float: 'right' }}>
														<Button
															style={{ backgroundColor: '#ff4d4f', color: 'white' }}
															onClick={e => {
																e.preventDefault();
																this.showUnsuspendConfirm(_id, unsuspendAdminRoleById);
															}}
														>
															Reactivate
														</Button>
													</Form.Item>
												</div>
											)}
										</Col>
									</Row>
								</div>
							) : (
								''
							)}

							<Form.Item>
								<Button
									style={{ float: 'right' }}
									type="primary"
									htmlType="submit"
									loading={loadingSubmit}
									disabled={this.state.disabled}
								>
									Save
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Modal>
		);
	};

	render() {
		const { admin_roles } = this.props.adminDepartmentPageProps;
		const columns = [
			{
				title: 'Department',
				dataIndex: 'department'
			},
			{
				title: 'Role',
				dataIndex: 'role'
			},
			{
				title: 'Action',
				dataIndex: 'action'
			}
		];

		const data = [];
		// eslint-disable-next-line array-callback-return
		admin_roles && admin_roles.length && admin_roles.map(admin_role => {
			const { _id, department_id, admin_type, status } = admin_role;
			data.push({
				key: _id,
				department: department_id && department_id.name ? department_id.name : 'N/A',
				role: LabelHelper.admin_role(admin_type),
				action: (
					<a
						onClick={e => {
							e.preventDefault();
							this.setState({ modalState: true, adminRolesData: admin_role, status: status });
						}}
					>
							Edit
					</a>
				)
			});
		});

		return (
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span>Administrated Department</span>
					<div className="component-buttons">
						<span>
							<Button
								type="primary"
								icon={<PlusSquareFilled />}
								onClick={e => {
									e.preventDefault();
									this.setState({ modalState: true });
								}}
							> Add Department</Button>
						</span>
					</div>
				</div>
				<Divider />
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

export default AdminDepartmentPage;
