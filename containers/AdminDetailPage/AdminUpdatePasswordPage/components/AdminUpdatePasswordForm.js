import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import UrlParse from 'url-parse';

class AdminUpdatePasswordForm extends Component {
  formRef = React.createRef();

	state = {
		disabled: true,
		current_selected_entities: []
	}

	onSubmit(values){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		this.props.onSubmit(query.id, values);
	}

	componentDidUpdate(prevProps, prevState){
		const { admin: prevAdmin } = prevProps;
		const { admin } = this.props;
		if(admin !== prevAdmin){
			const { selected_entities } = admin;
			const selected_entity_ids = selected_entities && selected_entities.length && selected_entities.map( selected_entity => {
				return selected_entity.entity_id._id;
			});
			this.setState({
				current_selected_entities: selected_entity_ids
			});
		}
	}

	checkFormValues = () => {
		if(
			this.formRef.current.getFieldValue('password') &&
			this.formRef.current.getFieldValue('new_password') &&
			this.formRef.current.getFieldValue('confirm_password')
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

	renderForm = () => {
		return (
			<Form
				layout="vertical"
				ref={this.formRef}
				style={{ width: 400 }}
				onFinish={values => {
					this.onSubmit(values);
				}}
			>
				<Form.Item
					name="password"
					label="Current Password"
					rules={[
						{ required: true, message: 'Password is missing' }
					]}
				>
					<Input.Password 
						onChange={this.checkFormValues}
					/>
				</Form.Item>
				<Form.Item
					name="new_password"
					label="New Password"
					rules={[
						{ required: true, message: 'New Password is missing' },
						{ min: 6, message: 'Password must be at least 6 characters' }
					]}
				>
					<Input.Password 
						onChange={this.checkFormValues}
					/>
				</Form.Item>
				<Form.Item
					name="confirm_password"
					label="Confirm Password"
					rules={[
						{ required: true, message: 'Confirmation Password is missing' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('new_password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The two passwords that you entered do not match!'));
							}
						})
					]}
				>
					<Input.Password 
						onChange={this.checkFormValues}
					/>
				</Form.Item>
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
		return (
			<>
				{ this.renderForm() }
			</>
		);
	}
}

export default AdminUpdatePasswordForm;