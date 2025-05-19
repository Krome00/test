import React, { Component } from 'react';
import { Form, Input, Button, Modal, Select, InputNumber } from 'antd';
import _ from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LabelHelper from '../../../../helpers/Label';

const { confirm } = Modal;

class ControllerBasicForm extends Component {
	formRef = React.createRef();

	state = {
  		disabled: true
	}

	onSubmit = (values) => {
		this.props.onSubmit(values);
	}

	suspendField = (id) => {
		//deleting
		this.props.suspendControllerById(id);
		this.setState({
			...this.state,
			modal: false
		});
	}

	unsuspendField = (id) => {
		//deleting
		this.props.unsuspendControllerById(id);
		this.setState({
			...this.state,
			modal: false
		});
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

	checkFormValues = () => {
		if(
			this.formRef.current.getFieldValue('name') && 
			this.formRef.current.getFieldValue('status') &&
			this.formRef.current.getFieldValue('type') &&
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
		const { controller, loadingSubmit } = this.props;
		const { _id, name, status, type, description, suspended } = controller || '';
		return (
			<Form
				layout="vertical"
				initialValues={{ name, status: LabelHelper.status(status), type, description }}
				ref={this.formRef}
				onFinish={this.onSubmit}
				style={{ width: 400 }}
			>
				<Form.Item
					name="name" 
					label="Controller Name:"
					rules={[{ required: true, message: 'Controller Name is missing' }]}
					onChange={this.checkFormValues}
				>
					<Input 
						placeholder="Enter controller name.."
					/>
				</Form.Item>

				<Form.Item 
					name="status"
					label="Status:"
					rules={[{ required: true, message: 'Status is missing' }]}
				>
					<Select onChange={this.checkFormValues}>
						<Select.Option value="enabled">Enabled</Select.Option>
						<Select.Option value="disabled">Disabled</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					name="description"
					label="Description:"
					onChange={this.checkFormValues}
				>
					<Input.TextArea 
						placeholder="Enter desctiption.."
					/>
				</Form.Item>

				<Form.Item>
					<Button
						style={{ float: 'right' }}
						size="middle"
						type="primary"
						htmlType="submit"
						loading={loadingSubmit}
						disabled={this.state.disabled}
					>Save</Button>
					{ suspended ? 
						<div>
							<Button
								style={  _.isEmpty(controller) ? 
									{ display: 'none' } : 
									{ display: 'block', float: 'left', backgroundColor: '#e3ce14' }}
								onClick={(e) => {
									e.preventDefault();
									this.showUnsuspendConfirm(_id, name, this.unsuspendField);
								}}
							> Unsuspend </Button>
						</div>
						:
						<div>
							<Button
								style={  _.isEmpty(controller) ? 
									{ display: 'none' } : 
									{ display: 'block', float: 'left', backgroundColor: '#ff4d4f' }}
								onClick={(e) => {
									e.preventDefault();
									this.showSuspendConfirm(_id, name, this.suspendField);
								}}
							> Suspend </Button>
						</div>
					}
				</Form.Item>

			</Form>
		);
	}
}

export default ControllerBasicForm;