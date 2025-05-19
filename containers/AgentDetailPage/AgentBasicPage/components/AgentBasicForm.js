import React, { Component } from 'react';
import { Form, Input, Button, Select, Modal, Col, Row, notification } from 'antd';
import { MinusCircleOutlined, PlusSquareFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import GeneralHelper from '../../../../helpers/general';

const { confirm } = Modal;


class AgentBasicForm extends Component {
  formRef = React.createRef();

	state = {
		disabled: true,
		status: 'enabled',
		loadingSubmit: false,
		current_selected_doors: []
	}

	manualSetState = (agent) => {
		if(!this.props.create){
			this.setState({
				status: agent.status
			}, () => {
				this.formRef.current.setFieldsValue({
					status: agent.status
				});
			});
		}
	}

	componentDidMount() {
		const { agent } = this.props;
		this.manualSetState(agent);
		const { door_ids } = this.props.agent || '';
		if (door_ids) {
			this.setState({
				current_selected_doors: door_ids && door_ids.map(door_id => door_id._id)
			});
		}
	}

	componentDidUpdate(prevProps, prevState){

		const { agent: prevAgent, loadingSubmit: prevLoading } = prevProps;
		const { agent, loadingSubmit } = this.props;

		if(agent !== prevAgent){
			this.manualSetState(agent);
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
				this.formRef.current.getFieldValue('email') &&
				!this.formRef.current.getFieldValue('selected_doors').includes(undefined)
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
		// const { loadingSubmit } = this.state;
		// const { _id, name, email, status  } = agent || '';
		// const { create, onSubmit, onSuspend, onUnsuspend, locations } = this.props;
		const { create, agent, onSuspend, onUnsuspend, loadingSubmit, onSubmit, doors } = this.props;
		const { _id, name, email, status, door_ids } = agent || '';
		
		
		return (
			<Form
				layout="vertical"
				initialValues={{ 
					name,
					selected_doors: door_ids ? door_ids.map(door_id => {
						return { door: typeof(door_id._id) === 'undefined' ? door_id : door_id._id };
					}) : [],
					email,
					status
				}}
				ref={this.formRef}
				style={{ width: 400 }}
				// onFinish={values => {
				// 	this.onSubmit(values);
				// }}
				onFinish={values => {
					const { name, email, status, selected_doors } = values;
					
					const check_name = name.trim();
					if (check_name === '') {
						notification({
							message: 'Invalid Inputs',
							placement: 'bottomRight'
						});
					}
					else {
						const data = {
							name: check_name,
							door_ids: selected_doors  ? selected_doors.map(selected_doors  => 
								selected_doors.door) : [],
							email,
							status: 'enabled'
						};
						onSubmit(data);
					}
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
				<Form.List
					name="selected_doors"
				>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, fieldKey, ...restField }, index) => (
								
								<div
									key={key}
									style={{ display: 'flex', marginBottom: -20 }}
								>
									<Form.Item
										{...restField}
										name={[name, 'door']}
										fieldKey={[fieldKey, 'key']}
										label={index === 0 ? 'Door(s):' : ''}
										style={{ width: '100%', paddingRight: 10 }}
										rules={[{ required: true, message: 'Missing value' }]}
									>
										<Select
											key={key}
											onChange={(val) => {
												const filtered = [...this.state.current_selected_doors.filter(_id => _id !== this.state.current_selected_doors[name])];
												// filtered[name] = val;
												filtered.splice(name, 0, val);
												
												this.setState({
													current_selected_doors: [...filtered]
												});
												
												this.checkFormValues();
											} }
										>
											
											{doors && doors.length && doors.map((door, index) => {
												
												return (
													<Select.Option
														key={index}
														value={door._id}
														disabled={this.state.current_selected_doors.includes(door._id)  && this.state.current_selected_doors[name] !== door._id}
													>
														{door.name}

													</Select.Option>
												);
											
											})}
										</Select>
										
									</Form.Item>
									
									<MinusCircleOutlined
										onClick={() => {
											remove(name);
											this.checkFormValues();
											this.setState({
												current_selected_doors: this.state.current_selected_doors.length ? this.state.current_selected_doors.filter(id => id !== this.state.current_selected_doors[name]) : this.state.current_selected_doors
											});
										} }
										style={(index === 0 ? { marginTop: 38 } : { marginTop: 8 })}
									/>
								</div>
							))}

							<Form.Item 
                            	style={{ marginTop: 10 }}
							>
                                Add Doors &nbsp;
								<PlusSquareFilled 
                            		onClick={() => {
                            			add();
										this.setState({
											current_selected_doors: [...this.state.current_selected_doors, '']
										});
                            			this.checkFormValues();
                            		}}
                            		style={{ fontSize: '110%', backgroundColor: '#fff', color: '#0B3266', cursor: 'pointer' }}
								/>
							</Form.Item>
						</>
					)}
				</Form.List>
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
		const { agent, create } = this.props;
		return (
			<>
				{ agent && agent.name && this.renderForm(agent) }
				{ create && this.renderForm()}
			</>
		);
	}
}

export default AgentBasicForm;

