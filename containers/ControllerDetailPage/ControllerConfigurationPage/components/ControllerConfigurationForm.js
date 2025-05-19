import React, { Component } from 'react';
import { Form, Input, Button, notification } from 'antd';

class ControllerConfigurationForm extends Component {

	formRef = React.createRef();

	state = {
  		disabled: true
	}

	onSubmit = (values) => {
		this.props.onSubmit(values);
		notification['success']({
			message: 'Success',
			placement: 'bottomRight'
		});

		this.props.resetMeta();
		
	}

	checkFormValues = () => {
		if(
			this.formRef.current.getFieldValue('ip_address') && 
			this.formRef.current.getFieldValue('port_number') &&
			this.formRef.current.getFieldValue('serial_number') &&
			this.formRef.current.getFieldValue('mac_address')
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
		const { configuration } = controller && controller.configuration ? controller : {};
		const { ip_address, port_number, serial_number, mac_address } = configuration || {};
		return (
			<Form
				layout="vertical"
				initialValues={{ 
					ip_address: ip_address ? ip_address : null, 
					port_number: port_number ? port_number: null, 
					serial_number: serial_number ? serial_number: null, 
					mac_address: mac_address ? mac_address : null 
				}}
				ref={this.formRef}
				onFinish={this.onSubmit}
				style={{ width: 400 }}
			>
				<Form.Item
					name="ip_address" 
					label="IP Address:"
					rules={[{ required: true, message: 'IP Address is missing' }]}
					onChange={this.checkFormValues}
				>
					<Input 
						placeholder="Enter ip address.."
						onChange={this.checkFormValues}
					/>
				</Form.Item>

				<Form.Item
					name="port_number" 
					label="Port Number:"
					rules={[{ required: true, message: 'Port Number is missing' }]}
					onChange={this.checkFormValues}
				>
					<Input 
						placeholder="Enter port number.."
						onChange={this.checkFormValues}
					/>
				</Form.Item>

				<Form.Item
					name="serial_number" 
					label="Serial Number:"
					rules={[{ required: true, message: 'Serial Number is missing' }]}
					onChange={this.checkFormValues}
				>
					<Input 
						placeholder="Enter serial number.."
						onChange={this.checkFormValues}
					/>
				</Form.Item>

				<Form.Item
					name="mac_address" 
					label="MAC Address:"
					rules={[{ required: true, message: 'MAC Address is missing' }]}
					onChange={this.checkFormValues}
				>
					<Input 
						placeholder="Enter MAC address.."
						onChange={this.checkFormValues}
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
				</Form.Item>

			</Form>
		);
	}
}

export default ControllerConfigurationForm;