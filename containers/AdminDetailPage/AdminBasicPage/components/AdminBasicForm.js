import React, { Component } from 'react';
import { Form, Input, Button, Select, Modal, Col, Row } from 'antd';
import { MinusCircleOutlined, PlusSquareFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import GeneralHelper from '../../../../helpers/general';

const { confirm } = Modal;


class AdminBasicForm extends Component {
  formRef = React.createRef();

	state = {
		disabled: true,
		status: 'enabled',
		loadingSubmit: false
	}


	manualSetState = (admin) => {
		if(!this.props.create){
			this.setState({
				status: admin.status
			}, () => {
				this.formRef.current.setFieldsValue({
					status: admin.status
				});
			});
		}
	}

	componentDidMount() {
		const { admin } = this.props;
		this.manualSetState(admin);
	}

	componentDidUpdate(prevProps, prevState){

		const { admin: prevAdmin, loadingSubmit: prevLoading } = prevProps;
		const { admin, loadingSubmit } = this.props;

		if(admin !== prevAdmin){
			this.manualSetState(admin);
		}

		if(loadingSubmit !== prevLoading){
			this.setState({
				loadingSubmit
			});
		}

	}

	

	showSuspendConfirm = (id, name, suspendFunction) => {
		confirm({
			title: `Are you sure you want to suspend ${name}?`,
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
			title: `Are you sure you want to unsuspend ${name}?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				unsuspendFunction(id);
			},
			onCancel() {
			}
		});
	}

	onSubmit(values){
		const { name, email } = values;
		
		const fields = {
			name: name.trim(),
			email: email.trim(),
			status: values.status ? values.status : this.state.status
		};

		this.props.onSubmit(fields);
	}

	checkFormValues = () => {
		const { create } = this.props;
		if(create) {
			if(
				this.formRef.current.getFieldValue('name') &&
				this.formRef.current.getFieldValue('email')
			){
				this.setState({
					disabled: false
				});
			} else {
				this.setState({
					disabled: true
				});
			}
		} else {
			if(
				this.formRef.current.getFieldValue('name') &&
				this.formRef.current.getFieldValue('email') &&
				this.formRef.current.getFieldValue('status')
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
	}

	renderForm = () => {
		const { create, admin, onSuspend, onUnsuspend, loadingSubmit } = this.props;
		const { _id, name, email, status } = admin || '';
		return (
			<Form
				layout="vertical"
				initialValues={{ 
					name,
					email,
					status
				}}
				ref={this.formRef}
				style={{ width: 400 }}
				onFinish={values => {
					this.onSubmit(values);
				}}
			>
				<Form.Item
					name="name"
					label="Name:"
					rules={[
						{
							required: true,
							pattern: new RegExp(
								/^[a-zA-Z- ]+$/i
							),
							message: 'Letters only'
						},
						{
							whitespace: true, message: 'Missing Value'
						},{ required: true, message: 'Name is missing' }]}
					onChange={this.checkFormValues}
				>
					<Input
						placeholder="Enter name..."
						disabled={create ? false : true}
					/>
				</Form.Item>
				<Form.Item
					name="email"
					label="Email:"
					rules={[
						{ required: true, type: 'email', message: 'Email is invalid' },
						{
							validator(_, value) {
								if (!value || GeneralHelper.isUstEmail(value)) {
									return Promise.resolve();
								}
								return Promise.reject('Please enter a valid ust email.');
							}
						}
					]}
					onChange={this.checkFormValues}
				>
					<Input
						placeholder="Enter email..."
						disabled={create ? false : true}
					/>
				</Form.Item>
				{
					!create ?
						<div>
							<p>Status</p>
							<Row>
								<Col span={17}>

									<Form.Item
										style={{ width: '100%' }}
										name="status"
									>
										<Input
											readOnly={true}
											value={this.state.status}
											style={{ width: '100%' }}
										/>
									</Form.Item>
							
								</Col>
								<Col span={7}>

									{ this.state.status === 'enabled' ? 

										<div>
											<Form.Item style={{ float: 'right' }}>
												<Button
													style={{ backgroundColor: '#e3ce14', color: 'white' }}
													onClick={ e => {
														e.preventDefault();
														this.showSuspendConfirm(_id, name, onSuspend);
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
														this.showUnsuspendConfirm(_id, name, onUnsuspend);
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
				<Form.Item style={{ float: 'right' }}>
					<Button
						size="middle"
						type="primary"
						htmlType="submit"
						style={{ width: 100, borderRadius: 3 }}
						loading={loadingSubmit}
						disabled={this.state.disabled}
					>Save</Button>
				</Form.Item>
			</Form>
		);
	}

	render(){
		const { admin, create } = this.props;
		return (
			<>
				{ admin && admin.name && this.renderForm(admin) }
				{ create && this.renderForm()}
			</>
		);
	}
}

export default AdminBasicForm;