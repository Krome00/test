import React, { Component } from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';
import _ from 'lodash';
import { ExclamationCircleOutlined, MinusCircleOutlined, PlusSquareFilled } from '@ant-design/icons';

import CommonEnum from '../../../../constants/CommonEnum';
import LabelHelper from '../../../../helpers/Label';

const { confirm } = Modal;

class EntityBasicForm extends Component {
  formRef = React.createRef();

	state = {
		disabled: true
	}

	showSuspendConfirm = (id, name, suspendFunction) => {
		confirm({
			title: `Are you sure you want to suspend ${name} Entity?`,
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
			title: `Are you sure you want to unsuspend ${name} Entity?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				unsuspendFunction(id);
			},
			onCancel() {
			}
		});
	}

	componentDidMount() {
	}

	checkFormValues = () => {
		if(
			this.formRef.current.getFieldValue('name') &&
			this.formRef.current.getFieldValue('type') &&
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

	renderForm = (entity) => {
		const { _id, name, type, description, suspended } = entity || '';
		const { create, onSubmit, onUnsuspend, onSuspend } = this.props;
		return (
			<Form
				layout="vertical"
				initialValues={{ 
					name,
					type,
					description
				}}
				ref={this.formRef}
				style={{ width: 400 }}
				onFinish={values => {
					onSubmit(values);
				}}
			>
				<Form.Item
					name="name"
					label="Name:"
					rules={[{ required: true, message: 'Name is missing' }]}
					onChange={this.checkFormValues}
				>
					<Input
						placeholder="Enter name..."
						onChange={this.checkFormValues}
					/>
				</Form.Item>
				<Form.Item
					name="type"
					label="Type:"
					rules={[{ required: true, message: 'Type is missing' }]}
					onChange={this.checkFormValues}
				>
					<Select
						onChange={this.checkFormValues}
					>
						{CommonEnum.entity_types.map(type => 
							<Select.Option value={type}> {LabelHelper.entity_type_label(type)} </Select.Option>
						)}
					</Select>
				</Form.Item>
				<Form.Item
					name="description"
					label="Description:"
					onChange={this.checkFormValues}
				>
					<Input.TextArea 
						placeholder="Enter description.."
					/>
				</Form.Item>
				{ suspended ? 
					<div>
						<Form.Item style={{ float: 'left' }}>
							<Button
								size="middle"
								style={{ visibility: create ? 'hidden' : '', backgroundColor: '#e3ce14' }}
								onClick={ e => {
									e.preventDefault();
									this.showUnsuspendConfirm(_id, name, onUnsuspend);
								}}
							>
						Unsuspend
							</Button>
						</Form.Item>
					</div>
					:
					<div>
						<Form.Item style={{ float: 'left' }}>
							<Button
								size="middle"
								style={{ visibility: create ? 'hidden' : '', backgroundColor: '#ff4d4f' }}
								onClick={ e => {
									e.preventDefault();
									this.showSuspendConfirm(_id, name, onSuspend);
								}}
							>
						Suspend
							</Button>
						</Form.Item>
					</div>
				}
				<Form.Item style={{ float: 'right' }}>
					<Button
						size="middle"
						type="primary"
						htmlType="submit"
						style={{ width: 100, borderRadius: 3 }}
						disabled={this.state.disabled}
					>Save</Button>
				</Form.Item>
			</Form>
		);
	}

	render(){
		const { entity, create } = this.props;
		const { id, name, description, type } = entity || '';
		return (
			<>
				{ entity && entity.name && this.renderForm(entity) }
				{ create && this.renderForm()}
			</>
		);
	}
}

export default EntityBasicForm;