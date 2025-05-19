import React, { Component } from 'react';
import { Form, Input, Button, Modal, Select, InputNumber, Row, Col } from 'antd';
import _ from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CommonEnum from '../../../../constants/CommonEnum';
import LabelHelper from '../../../../helpers/Label';

const { confirm } = Modal;

class EntityBasicForm extends Component {
  formRef = React.createRef();

	state = {
		disabled: true,
		enable_access_log: false,
		enable_max_user_admin: false,
		enable_max_users: false,
		department_owner: null,
		status: 'enabled'
	}

	manualSetState = (location) => {
		if(!this.props.create){
			this.setState({
				enable_access_log: location.enable_access_log,
				enable_max_user_admin: location.enable_max_user_admin,
				enable_max_users: location.enable_max_users,
				department_owner: location.department_id,
				status: location.status
			}, () => {
				this.formRef.current.setFieldsValue({
					status: LabelHelper.status(location.status)
				});
			});
		}
	}

	showSuspendConfirm = (id, name, suspendFunction) => {
		confirm({
			title: `Are you sure you want to suspend ${name} Location?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				suspendFunction(id);
			},
			onCancel() {
			}
		});

	}

	showUnsuspendConfirm = (id, name, unsuspendFunction) => {
		confirm({
			title: `Are you sure you want to unsuspend ${name} Location?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				unsuspendFunction(id);
			},
			onCancel() {
			}
		});
	}

	componentDidMount() {
		const { location } = this.props;
		this.manualSetState(location);
	}

	componentDidUpdate(prevProps, prevState){

		const { location: prevLocation } = prevProps;
		const { location } = this.props;
		if(location !== prevLocation){
			this.manualSetState(location);
		}

	}

	checkFormValues = () => {
		if(
			this.formRef.current.getFieldValue('name') &&
			this.formRef.current.getFieldValue('department_owner') &&
			this.formRef.current.getFieldValue('enable_access_log') &&
			this.formRef.current.getFieldValue('enable_max_user_admin') &&
			this.formRef.current.getFieldValue('enable_max_users') &&
			this.formRef.current.getFieldValue('description') || 
			this.formRef.current.getFieldValue('description') === '' || 
			this.formRef.current.getFieldValue('description') === undefined
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

	

	renderForm = (location) => {
		const { _id, name, access_log_retention, department_id, description, enable_access_log, enable_max_user_admin, enable_max_users, max_user_admin, max_users, status } = location || '';
		const { name: department_owner } = department_id;
		const { create, onSubmit, onUnsuspend, onSuspend, departments } = this.props;
		return (
			<Form
				layout="vertical"
				initialValues={{ 
					name,
					department_owner: department_owner ? department_owner : department_id,
					enable_access_log,
					access_log_retention,
					enable_max_user_admin,
					max_user_admin,
					enable_max_users,
					max_users,
					description
				}}
				ref={this.formRef}
				style={{ width: 400 }}
			>
				<Form.Item
					name="name"
					label="Name:"
					rules={[{ required: true, message: 'Name is missing' }]}
				>
					<Input
						placeholder="Enter name..."
						onChange={this.checkFormValues}
						// disabled={true}
					/>
				</Form.Item>
				<Form.Item
					name="department_owner"
					label="Department Owner:"
					rules={[{ required: true, message: 'Type is missing' }]}
				>
					<Input
						disabled={true}
					/>
				</Form.Item>

				<Form.Item
					name="enable_access_log"
					label="Enable Access Log:"
					rules={[{ required: true, message: 'Enable Access Log is missing' }]}
				>
					<Select
						onChange={(e) => {
							this.setState({
								enable_access_log: e
							}, () => {
								this.checkFormValues();
							});
						}}
						disabled={true}
					>
						<Select.Option value={true}>Yes</Select.Option>
						<Select.Option value={false}>No</Select.Option>
					</Select>
				</Form.Item>

				{ 
					this.state.enable_access_log ? 
						<div>
							<Form.Item
								name="access_log_retention"
								label="Access Log Retention:"
							>
								<Select
									mode="multiple"
									allowClear
									placeholder="Select days"
									disabled={true}
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
						</div>
						:
						''
				}

				<Form.Item
					name="enable_max_user_admin"
					label="Enable Maximum Number of Users and Admins in Location:"
					rules={[{ required: true, message: 'nable Maximum Number of Users and Admins in Location is missing' }]}
				>
					<Select
						onChange={(e) => {
							this.setState({
								enable_max_user_admin: e
							}, () => {
								this.checkFormValues();
							});
						}}
						disabled={true}
					>
						<Select.Option value={true}>Yes</Select.Option>
						<Select.Option value={false}>No</Select.Option>
					</Select>
				</Form.Item>

				{ 
					this.state.enable_max_user_admin ? 
						<div>
							<Form.Item
								style={{ width: '100%' }}
								name="max_user_admin"
								label="Maximum Number of Users and Admins in Location:"
							>
								<InputNumber
									style={{ width: '100%' }}
									placeholder="Enter Maximum Number of Users and Admins..."
									disabled={true}
								/>
							</Form.Item>
						</div>
						:
						''
				}

				<Form.Item
					name="enable_max_users"
					label="Enable Maximum Number of Users in Location:"
					rules={[{ required: true, message: 'nable Maximum Number of Users in Location is missing' }]}
				>
					<Select
						onChange={(e) => {
							this.setState({
								enable_max_users: e
							}, () => {
								this.checkFormValues();
							});
						}}
						disabled={true}
					>
						<Select.Option value={true}>Yes</Select.Option>
						<Select.Option value={false}>No</Select.Option>
					</Select>
				</Form.Item>

				{ 
					this.state.enable_max_users ? 
						<div>
							<Form.Item
								style={{ width: '100%' }}
								name="max_users"
								label="Maximum Number of Users and Admins in Location:"
							>
								<InputNumber
									style={{ width: '100%' }}
									placeholder="Enter Maximum Number of Users..."
									disabled={true}
								/>
							</Form.Item>
						</div>
						:
						''
				}

				{
					!create ?
						<div>
							<p>Status</p>
							<Row>
								<Col span={24}>

									<Form.Item
										style={{ width: '100%' }}
										name="status"
									>
										<Input
											readOnly={true}
											value="Sample Value"
											style={{ width: '100%' }}
											disabled={true}
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>

						:

						''
				}

				<Form.Item
					name="description"
					label="Description:"
					onChange={this.checkFormValues}
				>
					<Input.TextArea 
						placeholder="Enter desctiption.."
						disabled={true}
					/>
				</Form.Item>
			</Form>
		);
	}

	render(){
		const { location, create } = this.props;
		return (
			<>
				{ location && location.name && this.renderForm(location) }
				{ create && this.renderForm()}
			</>
		);
	}
}

export default EntityBasicForm;