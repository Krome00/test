import React, { Component } from 'react';
import { Form, Input, Button, Modal, Select, Col, Row } from 'antd';
import _ from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons';


class DepartmentBasicForm extends Component {
  formRef = React.createRef();

	state = {
		disabled: true
	}

	renderForm = (department) => {
		const { name, description } = department || '';
		return (
			<Form
				layout="vertical"
				initialValues={{ 
					name,
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
						disabled={this.state.disabled}
					/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Description:"
				>
					<Input.TextArea 
						placeholder="Enter desctiption.."
						disabled={this.state.disabled}
					/>
				</Form.Item>
			</Form>
		);
	}

	render(){
		const { department } = this.props;
		return (
			<>
				{ department && department.name && this.renderForm(department) }
			</>
		);
	}
}

export default DepartmentBasicForm;