import React, { Component } from 'react';
import { Form, Input, Button, Modal, Select, Radio, Row, Col } from 'antd';
import _ from 'lodash';
import { ExclamationCircleOutlined, MinusCircleOutlined, PlusSquareFilled } from '@ant-design/icons';
import GeneralHelper from '../../../../helpers/general';
import LabelHelper from '../../../../helpers/Label';

const { confirm } = Modal;

class GroupBasicForm extends Component {
	formRef = React.createRef();

	state = {
		disabled: true,
		status: 'enabled'
	}

	manualSetState = () => {
		const { group } = this.props;
		if(!_.isEmpty(group)){
			this.setState({
				status: group.status
			}, () => {
				this.formRef.current.setFieldsValue({
					status: LabelHelper.status(group.status)
				});
			});
		}
	}

	showSuspendConfirm = (id, name, suspendFunction) => {
		confirm({
			title: `Are you sure you want to suspend ${name} Group?`,
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
			title: `Are you sure you want to reactivate ${name} Group?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				unsuspendFunction(id);
			},
			onCancel() {
			}
		});
	}

	componentDidMount() {
		this.manualSetState();
	}

	componentDidUpdate(prevProps, prevState){
		
		const { group: prevGroup } = prevProps;
		const { group } = this.props;
		if(group !== prevGroup){
			this.manualSetState();
		}

	}

	onSubmit = (values) => {
		const { name, description } = values;

		const formattedValues = {
			name: name.trim(),
			description: description ? description.trim() : description
		};

		this.props.onSubmit(formattedValues);
	}

	checkFormValues = () => {
		if(
			this.formRef.current.getFieldValue('name') &&
			this.formRef.current.getFieldValue('description') || 
			this.formRef.current.getFieldValue('description') === '' || 
			this.formRef.current.getFieldValue('description') === undefined
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

	render(){
		const { group, loadingSubmit, onUnsuspend, onSuspend } = this.props;
		const { _id, name, status, description } = group || '';
		return (
			<Form
				layout="vertical"
				initialValues={{ name, status, description }}
				ref={this.formRef}
				onFinish={this.onSubmit}
				style={{ width: 400 }}
			>
				<Form.Item
					name="name" 
					label="Name:"
					rules={[{ required: true, message: 'Name is missing' }]}
					onChange={this.checkFormValues}
				>
					<Input 
						placeholder="Enter name.."
					/>
				</Form.Item>

				{
					!_.isEmpty(group) ?
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
											value={LabelHelper.status(this.state.status)}
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

				<Form.Item
					name="description"
					label="Description:"
					onChange={this.checkFormValues}
				>
					<Input.TextArea 
						placeholder="Enter desctiption.."
					/>
				</Form.Item>

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
		);
	}
}

export default GroupBasicForm;