import React, { Component } from 'react';
import { Form, Input, Button, Modal, Select, DatePicker, Row, Col, Divider } from 'antd';
import moment from 'moment';
import { CloseCircleOutlined, ExclamationCircleOutlined, PlusSquareFilled } from '@ant-design/icons';
import _ from 'lodash';
import GeneralHelper from '../../../../helpers/general';

const { confirm } = Modal;

class UserBasicForm extends Component {
	formRef = React.createRef();
	modalFormRef = React.createRef();

	state = {
		selected_group_options: [],
		statusModal: false,
		suspendModal: false,
		disabled: true,
		selected_date: null
	}
  
	componentDidMount() {
		const { user } = this.props && this.props;
		const { user_group_maps } = user || [];

		if(user_group_maps){
			this.setState({
				selected_group_options: user_group_maps && user_group_maps.map(user_group_map => user_group_map.group_id),
				selected_date: user && user.start_at
			});
		}

	}

	onSuspend = (id, fields) => {
		this.props.onSuspend(id, fields);
	}

	showUnsuspendConfirm = (id, name, onUnsuspend) => {
		const title = <p style={{ fontWeight: 'bold' }}>Confimation</p>;
		const content = <p>Are you sure you want to unsuspend user: {name}?</p>;

		confirm({
			title,
			icon: <ExclamationCircleOutlined />,
			centered: true,
			content,
			okText: 'Confirm',
			onOk() {
				onUnsuspend(id);
			},
			onCancel() {}
		});
	}

	deleteField = (id) => {
		//deleting
		this.props.deleteUserById(id);
		this.setState({
			...this.state,
			modal: false
		});
	}

	handleCancel = () => {
		this.setState({
			statusModal: false,
			suspendModal: false
		});
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
			this.formRef.current.getFieldValue('start_at') &&
			!this.formRef.current.getFieldValue('selected_groups').includes(undefined) &&
			(this.formRef.current.getFieldValue('end_at') || 
			this.formRef.current.getFieldValue('end_at') === '' || 
			this.formRef.current.getFieldValue('end_at') === undefined ||
			this.formRef.current.getFieldValue('end_at') === null)
		) {
			this.setState({
				disabled: false
			});
		} else {
			this.setState({
				disabled: true	
			});
		}
	}

	renderSuspendTemporaryModal = (id, name, onSuspend) => {
		return(
			<Modal
				title={`Suspend Temporary Detail - ${name}`}
				visible={this.state.suspendModal}
				centered
				onCancel={this.handleCancel}
				footer={null}
			>
				<Form
					layout="vertical"
					ref={this.modalFormRef}
					onFinish={values => {
						const { suspend_start, suspend_end } = values;
						const fields = {
							suspend_type: 'temporary',
							suspend_start: moment(suspend_start).format('YYYY-MM-DDTHH:mm:ssZ'),
							suspend_end: suspend_end ? moment(suspend_end).format('YYYY-MM-DDTHH:mm:ssZ') : undefined
						};

						this.setState({
							suspendModal: false
						});

						const title = <p style={{ fontWeight: 'bold' }}>Confimation</p>;
						const content = <p>Are you sure you want to suspend Temporary user: {name}? <br/><br/>
												Once suspended temporarily, the user will have their access
												rights revoked for a certain period of time.</p>;

						confirm({
							title,
							icon: <ExclamationCircleOutlined />,
							centered: true,
							content,
							okText: 'Confirm',
							onOk() {
								onSuspend(id, fields);
							},
							onCancel() {}
						});
					}}
				>
					<Row>
						<Col span={12}>
							<Form.Item
								name="suspend_start" 
								label="Start Date"
								rules={[{ required: true, message: 'Start date is missing' }]}
							>
								<DatePicker
									placeholder=""
									style={{ width: 200 }}
									showTime
									format={'YYYY/MM/DD HH:mm'}
									onChange={ (value) => {
										this.setState({
											selected_date: value
										});
										this.modalFormRef.current.setFieldsValue({ suspend_end: null });
									}}
									disabledDate={this.disableToday}
									minuteStep={5}
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="suspend_end" 
								label="End Time"
							>
								<DatePicker
									placeholder=""
									style={{ width: 200 }}
									showTime
									format={'YYYY/MM/DD HH:mm'}
									disabledDate={this.disabledDates}
									minuteStep={5}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Divider
						style={{ margin: 'auto' }}
					/>
					<Button
						size="middle"
						type="primary"
						htmlType="submit"
						style={{ display: 'flex', margin: '10px 10px  auto auto', borderRadius: 3 }}
					>Suspend Temporary</Button>
				</Form>
			</Modal>
		);
	}

	renderSuspendPermanentlyModal = (id, name, onSuspend) => {
		const fields = { suspend_type: 'permanent' };
		const title = <p style={{ fontWeight: 'bold' }}>Confimation</p>;
		const content = <p>Are you sure you want to suspend permanently user: {name}? <br/><br/>
								Once suspended permanently, the user will have their access
								rights revoked for an indefinite period of time.</p>;

		this.setState({
			statusModal: false
		});

		confirm({
			title,
			icon: <ExclamationCircleOutlined />,
			centered: true,
			content,
			okText: 'Confirm',
			onOk() {
				onSuspend(id, fields);
			},
			onCancel() {}
		});
	}

	showStatusModal = (id, name, onSuspend) => {
		return (
			<Modal
				title="Select Status"
				visible={this.state.statusModal}
				centered
				onCancel={this.handleCancel}
				footer={null}
			>
				<Button
					size="middle"
					type="primary"
					style={{ marginRight: '20px', borderRadius: 3, backgroundColor: '#f6c02b', borderColor: '#f6c02b' }}
					onClick={e => {
						e.preventDefault();
						this.setState({ 
							suspendModal: true,
							statusModal: false
						});
					}}
				>Suspend Temporary</Button>
				<Button
					size="middle"
					type="primary"
					style={{ borderRadius: 3, backgroundColor: '#f54d50', borderColor: '#f54d50' }}
					onClick={e => {
						e.preventDefault();
						this.renderSuspendPermanentlyModal(id, name, onSuspend);
					}}
				>Suspend Permanently</Button>
			</Modal>
		  );
	}

	render() {
		const { user, groups, type, onSubmit, loadingSubmit, onUnsuspend, onSuspend, qrcode } = this.props;
		const { _id: id, name, status, email, start_at, end_at, user_group_maps } = user || '';

		return (
			<React.Fragment>
				{this.renderSuspendTemporaryModal(id, name, onSuspend)}
				{this.showStatusModal(id, name, onSuspend)}	
				<Form
					layout="vertical"
					initialValues={{
						name,
						status,
						start_at: start_at ? moment(start_at) : '',
						end_at: end_at ? moment(end_at) : '',
						email,
						selected_groups: user_group_maps ? user_group_maps.map(user_group_map => {
							return { group: user_group_map.group_id };
						}) : []
					}}
					ref={this.formRef}
					onFinish={values => {
						const { email, start_at, end_at, updated_at, selected_groups } = values;
						const fields = {
							email,
							type: GeneralHelper.isUstEmail(email) ? 'internal' : 'external',
							start_at: moment(start_at).format('YYYY-MM-DDTHH:mm:ssZ'),
							end_at: end_at ? moment(end_at).format('YYYY-MM-DDTHH:mm:ssZ') : undefined,
							selected_groups: selected_groups ? selected_groups.map(selected_group => selected_group.group) : [],
							updated_at
						};
						onSubmit(fields);
					} }
					style={{ width: 400 }}
				>
					{user &&
						<Form.Item
							name="name"
							label="Name"
						>
							<Input
								disabled={true}
							/>
						</Form.Item>}

					<Form.Item
						name="email"
						label="Email"
						rules={[
							{ required: true, type: 'email', message: 'Email is invalid' }
							// {
							// 	validator(_, value) {
							// 		if (!value || GeneralHelper.isUstEmail(value)) {
							// 			return Promise.resolve();
							// 		}
							// 		return Promise.reject('Please enter a valid ust email.');
							// 	}
							// }
						]}
						onChange={this.checkFormValues}
					>
						<Input
							disabled={user ? true : false}
						/>
					</Form.Item>

					<Form.Item
						name="start_at"
						label="Start Time"
						rules={[
							{ required: true, message: 'Start time is missing' }
						]}
					>
						<DatePicker
							style={{ width: '95%' }}
							showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
							format="YYYY-MM-DD HH:mm"
							onChange={(value) => {
								this.formRef.current.setFieldsValue({ 'end_at': null });
								this.setState({
									selected_date: value
								});
								this.checkFormValues();
							}}
							disabledDate={this.disableToday}
							minuteStep={5}
						/>
					</Form.Item>

					<Form.Item
						name="end_at"
						label="End Time"
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

					{ user &&
						<Row>
							<Col
								span={user ? 17 : 24}
							>
								<Form.Item
									name="status"
									label="Suspend Status"
								>
									<Select
										disabled={user ? true : false}
									>
										<Select.Option value="enabled">Enabled</Select.Option>
										<Select.Option value="disabled">Disabled</Select.Option>
									</Select>
								</Form.Item>
							</Col>

							{user &&
								<Col
									span={5}
									style={{ marginTop: '31px' }}
								>
									<Button
										size="middle"
										type="primary"
										style={{ width: 100, marginLeft: '15px', borderRadius: 3, backgroundColor: status === 'enabled' ? '#f6c02b' : '#f54d50', borderColor: status === 'enabled' ? '#f6c02b' : '#f54d50' }}
										onClick={() => {
											status === 'enabled' ?
												this.setState({ statusModal: true }) :
												this.showUnsuspendConfirm(id, name, onUnsuspend);
										} }
									>{status === 'enabled' ? 'Suspend' : 'Reactivate'}</Button>
								</Col>}
						</Row>
					}
						
					<Form.List
						name="selected_groups"
					>
						{(fields, { add, remove }) => (
							<>
								<div
									style={{ marginBottom: 5 }}
								>
									Group(s)
								</div>
								{fields.map(({ key, name, fieldKey, ...restField }) => (
									<div
										key={key}
										style={{ display: 'inline-flex', marginBottom: -20, width: 400 }}
									>
										<Form.Item
											{...restField}
											name={[name, 'group']}
											fieldKey={[fieldKey, 'key']}
											style={{ width: '100%', paddingRight: 10 }}
										>
											<Select
												key={key}
												onChange={(val) => {
													const filtered = [...this.state.selected_group_options.filter(_id => _id !== this.state.selected_group_options[name])];
													filtered.splice(name, 0, val);
													this.setState({
														selected_group_options: [...filtered]
													});
													this.checkFormValues();
												} }
											>
												{
													groups && groups.length && groups.map((group, index) => {
														return (
															<Select.Option
																key={index}
																value={group._id}
																disabled={this.state.selected_group_options.includes(group._id) && this.state.selected_group_options[name] !== group._id}
															>{group.name}</Select.Option>
														);
													})
												}
											</Select>
										</Form.Item>
										<CloseCircleOutlined
											onClick={() => {
												remove(name);
												this.checkFormValues();
												this.setState({
													selected_group_options: this.state.selected_group_options.length ? this.state.selected_group_options.filter(_id => _id !== this.state.selected_group_options[name]) : this.state.selected_group_options
												});
											} }
											style={{ marginTop: 8, marginRight: 15, color: 'red' }}
										/>
									</div>
								))}
								<Form.Item style={{ marginTop: 5 }}>
									<PlusSquareFilled
										onClick={() => {
											add();
											this.checkFormValues();
										} }
										style={{ fontSize: '110%', backgroundColor: '#fff', color: '#0B3266', cursor: 'pointer' }} 
									/>
									&nbsp;Add Group
								</Form.Item>
							</>
						)}
					</Form.List>
					
					<Form.Item
						style={{
							display: 'flex'
						}}
					>
						<Button
							style={{ float: 'right' }}
							size="middle"
							type="primary"
							htmlType="submit"
							loading={loadingSubmit}
							disabled={this.state.disabled}
						>Save</Button>
					</Form.Item>
				</Form>
			</React.Fragment>
		);
	}
}

export default UserBasicForm;
