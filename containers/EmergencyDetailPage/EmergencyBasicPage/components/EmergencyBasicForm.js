import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, DatePicker, Select, notification, Modal } from 'antd';
import { MinusCircleOutlined, PlusSquareFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color';
import moment from 'moment';
import EmergencyBasicStyle from './EmergencyBasicStyle';

const { confirm } = Modal;

class EmergencyBasicForm extends Component {
	formRef = React.createRef();

	state = {
		disabled: true,
		current_selected_locations: [],
		current_selected_doors: [],
		doorOptions: [],
		selected_date: null,
		text_color: {
			r: '255',
			g: '255',
			b: '255',
			a: '100'
		},
		background_color: {
			r: '0',
			g: '0',
			b: '0',
			a: '100'
		},
		displayTextColor: false,
		displayBackgroundColor: false,
		loadingSubmit: false
	}

	handleTextClick = () => {
		this.setState({ displayTextColor: !this.state.displayTextColor });
	};

	setDoorOptions = (id) => {
		const { doors } = this.props;
		return doors.filter(door => door.location_id === id);
	}

	handleTextClose = () => {
		this.setState({ displayTextColor: false });
	};

	handleTextChange = (color) => {
		this.setState({ text_color: color.rgb });
	};

	handleBackgroundClick = () => {
		this.setState({ displayBackgroundColor: !this.state.displayBackgroundColor });
	};

	handleBackgroundClose = () => {
		this.setState({ displayBackgroundColor: false });
	};

	handleBackgroundChange = (color) => {
		this.setState({ background_color: color.rgb });
	};

	componentDidMount(){
		const { emergency } = this.props;
		const { location_ids, door_ids, message_background_color, message_text_color } = emergency || [];
		const doorOptions = (door_ids && door_ids.length && door_ids.map(door => this.setDoorOptions(door.location_id))) || [];
		const current_selected_doors = (door_ids && door_ids.length && door_ids.map(door => door._id)) || [];
		const current_selected_locations = (location_ids && location_ids.length && location_ids.map(loc => loc._id)) || [];
		this.setState({
			current_selected_doors,
			current_selected_locations,
			doorOptions,
			text_color: message_text_color ? JSON.parse(message_text_color) : null,
			background_color: message_background_color ? JSON.parse(message_background_color) : null
		});
	}

	componentDidUpdate(prevProps, prevState){
		const { loadingSubmit: prevLoadingSubmit } = prevProps;
		const { loadingSubmit } = this.props;

		if(loadingSubmit !== prevLoadingSubmit){
			this.setState({
				loadingSubmit
			});
		}
	}


	disableToday = (current) => {
		return current && current < moment().subtract(1, 'days');
	}

	disabledDates = (current) => {
		return current && current < moment(this.state.selected_date, 'YYYY-MM-DD HH:mm:ss');
	}

	doorLocationChecker = () => {
		let location, door;

		if (this.formRef.current.getFieldValue('selected_locations') &&
			this.formRef.current.getFieldValue('selected_locations').length)
			location = !this.formRef.current.getFieldValue('selected_locations').includes(undefined);
		else
			location = false;

		if (this.formRef.current.getFieldValue('selected_doors') &&
			this.formRef.current.getFieldValue('selected_doors').length)
			door = !this.formRef.current.getFieldValue('selected_doors').includes(undefined);
		else
			door = false;

		return door || location;
	}

	checkFormValues = () => {
		if(
			this.formRef.current.getFieldValue('name') &&
			this.formRef.current.getFieldValue('suspend_start') &&
			this.formRef.current.getFieldValue('suspend_end') &&
			this.formRef.current.getFieldValue('suspend_type') &&
			(this.formRef.current.getFieldValue('description') ||
			this.formRef.current.getFieldValue('description') === '' ||
			this.formRef.current.getFieldValue('description') === undefined) &&
			this.doorLocationChecker()
		){
			this.setState({
				disabled: false
			});
		}
		else {
			this.setState({
				disabled: true
			});
		}
	}

	showSuspendConfirm = (id, name, suspendFunction) => {
		confirm({
			title: `Are you sure you want to suspend ${name} Emergency?`,
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

	renderForm = (emergency) => {
		const { loadingSubmit } = this.props;
		const { _id, name, type, description, suspend_start: suspend_start_string, suspend_end: suspend_end_string, suspend_type, location_ids, door_ids, suspended } = emergency || '';
		const { create, onSubmit, onUnsuspend, onSuspend, locations, doors } = this.props;
		const selected_locations = location_ids && location_ids.length && location_ids.map(loc => { return { location: loc._id }; });
		const selected_doors = door_ids && door_ids.length && door_ids.map(door => { return {
			door: door._id,
			location: door.location_id
		};});

		return (
			<Form
				layout="vertical"
				initialValues={{
					name,
					type,
					description,
					suspend_start: suspend_start_string ? moment(suspend_start_string) : null,
					suspend_end: suspend_start_string ? moment(suspend_end_string) : null,
					suspend_type,
					selected_doors,
					selected_locations
				}}
				ref={this.formRef}
				style={{ width: 400 }}
				onFinish={values => {
					const { name, suspend_start, suspend_end, suspend_type, description, selected_locations: selected_location_objects, selected_doors: selected_door_objects } = values;
					const { text_color, background_color } = this.state;
					const selected_doors = selected_door_objects ? selected_door_objects.map(obj => obj.door) : [];
					const selected_locations = selected_location_objects ? selected_location_objects.map(obj => obj.location) : [];
					const body = {
						name: name.trim(),
						suspend_start,
						suspend_end,
						suspend_type,
						message_text_color: JSON.stringify(text_color),
						message_background_color: JSON.stringify(background_color),
						location_ids: selected_locations,
						door_ids: selected_doors,
						description: description ? description.trim() : description
					};
					onSubmit(body);

				}}
			>
				<Form.Item
					name="name"
					label="Title:"
					rules={[
						{
							required: true, message: 'Title is missing'
						},
						{
							whitespace: true, message: 'Title is missing'
						}
					]}
					onChange={this.checkFormValues}
				>
					<Input
						placeholder="Enter title..."
						onChange={this.checkFormValues}
					/>
				</Form.Item>
				<Row>
					<Col
						span={12}
					>
						<Form.Item
							name="suspend_start"
							label="Start Time:"
							rules={[{ required: true, message: 'Start Time is missing' }]}
						>
							<DatePicker
								showTime
								format={'YYYY/MM/DD HH:mm'}
								onChange={ (value) => {
									this.checkFormValues();
									this.setState({
										selected_date: value
									});
									this.formRef.current.setFieldsValue({ suspend_end: null });
								}}
								disabledDate={this.disableToday}
								minuteStep={5}
							/>
						</Form.Item>
					</Col>
					<Col
						span={12}
					>
						<Form.Item
							name="suspend_end"
							label="End Time:"
							style={{ paddingLeft: '15px' }}
							rules={[{ required: true, message: 'End Time is missing' }]}
						>
							<DatePicker
								showTime
								format={'YYYY/MM/DD HH:mm'}
								onChange={this.checkFormValues}
								disabledDate={this.disabledDates}
								minuteStep={5}
							/>
						</Form.Item>
					</Col>
				</Row>
				<Form.Item
					name="message_text_color"
					label="Message Text Color:"
					// rules={[{ required: true, message: 'Message Text Color is missing' }]}
				>
					<div
						style={ EmergencyBasicStyle.textStyles.swatch }
						onClick={ this.handleTextClick }
					>
						<div style={{ ...EmergencyBasicStyle.textStyles.color, background: this.state.text_color ? `rgba(${ this.state.text_color.r }, ${ this.state.text_color.g }, ${ this.state.text_color.b }, ${ this.state.text_color.a })` : 'rgba(255,255,255,100)' }} />
					</div>
					{ this.state.displayTextColor ? <div style={ EmergencyBasicStyle.textStyles.popover }>
						<div
							style={ EmergencyBasicStyle.textStyles.cover }
							onClick={ this.handleTextClose }
						/>
						<SketchPicker
							color={ this.state.text_color ? this.state.text_color : { r: '255', g: '255', b: '255', a: '100' } }
							onChange={ this.handleTextChange }
						/>
					</div> : null }
				</Form.Item>
				<Form.Item
					name="message_background_color"
					label="Message Background Color:"
					// rules={[{ required: true, message: 'Message Background Color is missing' }]}
				>
					<div
						style={ EmergencyBasicStyle.backgroundStyles.swatch }
						onClick={ this.handleBackgroundClick }
					>
						<div style={{ ...EmergencyBasicStyle.backgroundStyles.color, background: this.state.background_color ? `rgba(${ this.state.background_color.r }, ${ this.state.background_color.g }, ${ this.state.background_color.b }, ${ this.state.background_color.a })` : 'rgba(0,0,0,100)' }} />
					</div>
					{ this.state.displayBackgroundColor ? <div style={ EmergencyBasicStyle.backgroundStyles.popover }>
						<div
							style={ EmergencyBasicStyle.backgroundStyles.cover }
							onClick={ this.handleBackgroundClose }
						/>
						<SketchPicker
							color={ this.state.background_color ? this.state.background_color : { r: '0', g: '0', b: '0', a: '100' } }
							onChange={ this.handleBackgroundChange }
						/>
					</div> : null }
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
				<Form.Item
					name="suspend_type"
					label="Suspend Method"
					onChange={this.checkFormValues}
					rules={[{ required: true, message: 'Suspend Method is missing' }]}
				>
					<Select
						onChange={this.checkFormValues}
					>
						<Select.Option value="open"> Open </Select.Option>
						<Select.Option value="close"> Close </Select.Option>
					</Select>
				</Form.Item>
				<Form.List
					name="selected_locations"
				>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, fieldKey, ...restField }, index) => {
								return(
									<div
										key={key}
										style={{ display: 'flex', marginBottom: -20 }}
									>
										<Form.Item
											{...restField}
											name={[name, 'location']}
											fieldKey={[fieldKey, 'key']}
											label={index === 0 ? 'Location:' : ''}
											style={{ width: '100%', paddingRight: 10 }}
											rules={[{ required: true, message: 'Missing value' }]}
										>
											<Select
												key={key}
												onChange={(val) => {
													const filtered = [...this.state.current_selected_locations.filter(_id => _id !== this.state.current_selected_locations[name])];
													filtered.splice(name, 0, val);
													this.setState({
														current_selected_locations: [...filtered]
													});
													// this.checkFormValues();
													const filteredValues = this.formRef.current.getFieldValue('selected_doors') && this.formRef.current.getFieldValue('selected_doors').filter(obj => obj ? obj.location !== val : false);
													this.formRef.current.setFieldsValue({ 'selected_doors': filteredValues });
													this.checkFormValues();
												}}
											>
												{
													locations && locations.length && locations.map((location, index) => {
														return (
															<Select.Option
																key={index}
																value={location._id}
																disabled={this.state.current_selected_locations && this.state.current_selected_locations.includes(location._id) && this.state.current_selected_locations[name] !== location._id}
															>
																{location.name}
															</Select.Option>
														);
													})
												}
											</Select>
										</Form.Item>
										<MinusCircleOutlined
											onClick={() => {
												remove(name);
												// 	this.checkFormValues();
												this.setState({
													current_selected_locations: this.state.current_selected_locations.length ? this.state.current_selected_locations.filter(id => id !== this.state.current_selected_locations[name]) : this.state.current_selected_locations
												});
												this.checkFormValues();
											}}
											style={( index === 0 ? { marginTop: 38 } : { marginTop: 8 })}
										/>
									</div>
								);
							}
							)}

							<Form.Item
								style={{ marginTop: 10 }}
							>
								Add Location &nbsp;
								<PlusSquareFilled
									onClick={() => {
										add();
										this.checkFormValues();
									}}
									style={{ fontSize: '110%', backgroundColor: '#fff', color: '#0B3266', cursor: 'pointer' }}
								/>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.List
					name="selected_doors"
				>
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, fieldKey, ...restField }, index) => {
								return(
									<div
										key={key}
										style={{ display: 'flex', marginBottom: -20 }}
									>
										<Form.Item
											{...restField}
											name={[name, 'location']}
											fieldKey={[fieldKey, 'key']}
											label={index === 0 ? 'Locations:' : ''}
											style={{ width: '50%', paddingRight: 10 }}
											rules={[{ required: true, message: 'Missing value' }]}
										>
											<Select
												key={key}
												onChange={(val) => {
													const { doorOptions: newDoorOptions } = this.state;
													newDoorOptions[index] = this.setDoorOptions(val);
													this.setState({
														doorOptions: newDoorOptions
													});
													this.checkFormValues();
												}}
											>
												{
													locations && locations.length && locations.map((location, index) => {
														return (
															<Select.Option
																key={index}
																value={location._id}
																disabled={this.state.current_selected_locations.includes(location._id)}
															>
																{location.name}
															</Select.Option>
														);
													})
												}
											</Select>
										</Form.Item>
										<Form.Item
											{...restField}
											name={[name, 'door']}
											fieldKey={[fieldKey, 'key']}
											label={index === 0 ? 'Doors:' : ''}
											style={{ width: '50%', paddingRight: 10 }}
											rules={[{ required: true, message: 'Missing value' }]}
										>
											<Select
												key={key}
												onChange={val => {
													const { current_selected_doors } = this.state;
													current_selected_doors.push(val);
													this.setState({
														current_selected_doors
													});
													this.checkFormValues();
												}}
											>
												{
													this.state.doorOptions && this.state.doorOptions.length && this.state.doorOptions[index] && this.state.doorOptions[index].map((door, index) => {
														return (
															<Select.Option
																key={index}
																value={door._id}
																disabled={this.state.current_selected_doors.includes(door._id) && this.state.current_selected_doors[name] !== door._id}
															>
																{door.name}
															</Select.Option>
														);
													})
												}

											</Select>
										</Form.Item>
										<MinusCircleOutlined
											onClick={() => {
												remove(name);
												// 	this.checkFormValues();
												this.setState({
													current_selected_doors: this.state.current_selected_doors.length ? this.state.current_selected_doors.filter(id => id !== this.state.current_selected_doors[name]) : this.state.current_selected_doors
												});
												this.checkFormValues();
											}}
											style={( index === 0 ? { marginTop: 38 } : { marginTop: 8 })}
										/>
									</div>
								);
							}
							)}

							<Form.Item
								style={{ marginTop: 10 }}
							>
								Add Door &nbsp;
								<PlusSquareFilled
									onClick={() => {
										add();
										this.checkFormValues();
									}}
									style={{ fontSize: '110%', backgroundColor: '#fff', color: '#0B3266', cursor: 'pointer' }}
								/>
							</Form.Item>
						</>
					)}

				</Form.List>

				<Form.Item style={{ float: 'right' }}>
					<Button
						size="middle"
						type="primary"
						htmlType="submit"
						style={{ width: 100, borderRadius: 3 }}
						loading={this.props.loadingSubmit}
						disabled={this.state.disabled}
					>Save</Button>
				</Form.Item>
			</Form>
		);
	}

	render(){
		const { emergency, create } = this.props;
		return (
			<>
				{ emergency && emergency.name && this.renderForm(emergency) }
				{ create && this.renderForm()}
			</>
		);
	}

};

export default EmergencyBasicForm;
