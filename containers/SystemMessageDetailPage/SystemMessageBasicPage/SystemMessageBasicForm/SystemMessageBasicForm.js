import React, { Component } from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import { SketchPicker } from 'react-color';
import { MinusCircleOutlined, PlusSquareFilled } from '@ant-design/icons';
import moment from 'moment';
import reactCSS from 'reactcss';

class SystemMessageBasicForm extends Component {
	formRef = React.createRef();

	state = {
		disabled: true,
		current_selected_locations: [],
		current_selected_doors: [],
		doorOptions: [],
		selected_date: null,
		background_color_picker: false,
		message_color_picker: false,
		message_color: {
			r: '0',
			g: '0',
			b: '0',
			a: '100'
		},
		background_color: {
			r: '241',
			g: '112',
			b: '19',
			a: '1'
		},
		displayMessageColor: false,
		displayBackgroundColor: false,
		loadingSubmit: false
	}

	handleClick = (key) => {
		const state = this.state;
		state[key] = !state[key];
		this.setState(state);
		console.log('state', this.state);
	};

	handleClose = (key) => {
		const state = this.state;
		state[key] = false;
		this.setState(state);
	};

	componentDidMount() {
		const { system_message } = this.props;
		const { door_ids, location_ids, message_text_color, message_background_color } = system_message || {};
		const doorOptions = (door_ids && door_ids.length && door_ids.map(door => this.setDoorOptions(door.location_id))) || [];

		const current_selected_doors = (door_ids && door_ids.length && door_ids.map(door => door._id)) || [];
		const current_selected_locations = (location_ids && location_ids.length && location_ids.map(loc => loc._id)) || [];
		const message_color = message_text_color ? JSON.parse(message_text_color) : null;
		const background_color = message_background_color ? JSON.parse(message_background_color) : null;
		this.setState({
			current_selected_doors,
			doorOptions,
			current_selected_locations,
			message_color,
			background_color
		});
	}

	setDoorOptions = (id) => {
		const { doors } = this.props;
		return doors.filter(door => door.location_id._id === id);
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

	onSubmit = (values) => {
		const {
			title,
			start_time,
			end_time,
			selected_locations: selected_location_objects,
			selected_doors: selected_door_objects
		} = values;
		const selected_locations = selected_location_objects ? selected_location_objects.map(obj => obj.location) : [];
		const selected_doors = selected_door_objects ? selected_door_objects.map(obj => obj.door) : [];
		const body = {
			title: title.trim(),
			start_time,
			end_time,
			message_text_color: JSON.stringify(this.state.message_color),
			message_background_color: JSON.stringify(this.state.background_color),
			location_ids: selected_locations,
			door_ids: selected_doors
		};

		this.props.onSubmit(body);
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
			this.formRef.current.getFieldValue('title') &&
			this.formRef.current.getFieldValue('start_time') &&
			this.formRef.current.getFieldValue('end_time') &&
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

	disableToday = (current) => {
		return current && current < moment().subtract(1, 'days');
	}

	disabledDates = (current) => {
		return current && current < moment(this.state.selected_date, 'YYYY-MM-DD HH:mm:ss');
	}

	renderForm = () => {
		const { loadingSubmit } = this.state;
		const { locations, system_message } = this.props;
		const { title, start_time, end_time, message_background_color, message_text_color, location_ids, door_ids } = system_message || {};
		const selected_locations = location_ids && location_ids.length && location_ids.map(loc => { return { location: loc._id }; });
		const selected_doors = door_ids && door_ids.length && door_ids.map(door => { return {
			door: door._id,
			location: door.location_id
		};});

		const background_styles = reactCSS({
			'default': {
				color: {
					width: '390px',
					height: '14px',
					borderRadius: '2px'
				},
				swatch: {
					padding: '5px',
					background: '#fff',
					borderRadius: '1px',
					boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
					display: 'inline-block',
					cursor: 'pointer'
				},
				popover: {
					position: 'absolute',
					zIndex: '2'
				},
				cover: {
					position: 'fixed',
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px'
				}
			}
		});

		const text_styles = reactCSS({
			'default': {
				color: {
					width: '390px',
					height: '14px',
					borderRadius: '2px'
				},
				swatch: {
					padding: '5px',
					background: '#fff',
					borderRadius: '1px',
					boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
					display: 'inline-block',
					cursor: 'pointer'
				},
				popover: {
					position: 'absolute',
					zIndex: '2'
				},
				cover: {
					position: 'fixed',
					top: '0px',
					right: '0px',
					bottom: '0px',
					left: '0px'
				}
			}
		});

		return (
			<Form
				layout="vertical"
				ref={this.formRef}
				style={{ width: 400 }}
				onFinish={values => {
					this.onSubmit(values);
				}}
				initialValues={{
					title,
					start_time: start_time ? moment(start_time) : null,
					end_time: end_time ? moment(end_time) : null,
					message_background_color,
					message_text_color,
					selected_locations,
					selected_doors
				}}
			>
				<Form.Item
					name="title"
					label="Title"
					rules={[
						{ required: true, message: 'Title is missing' },
						{ whitespace: true, message: 'Name is missing' }
					]}
				>
					<Input
						placeholder="Title here..."
						onChange={this.checkFormValues}
					/>
				</Form.Item>
				<Form.Item
					name="start_time"
					label="Start Time"
					rules={[{ required: true, message: 'Start Time is missing' }]}
				>
					<DatePicker
						style={{ width: '100%' }}
						showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
						format="YYYY-MM-DD HH:mm"
						minuteStep={5}
						onChange={(value) => {
							this.formRef.current.setFieldsValue({ 'end_time': null });
							this.setState({
								selected_date: value
							});
							this.checkFormValues();
						}}
						disabledDate={this.disableToday}
					/>
				</Form.Item>
				<Form.Item
					name="end_time"
					label="End Time"
					rules={[{ required: true, message: 'End Time is missing' }]}
				>
					<DatePicker
						showTime={{ defaultValue: moment('00:00:00', 'HH:mm') }}
						style={{ width: '100%' }}
					 	format="YYYY-MM-DD HH:mm"
						minuteStep={5}
						onChange={this.checkFormValues}
						disabledDate={this.disabledDates}
					/>
				</Form.Item>
				<Form.Item
					name="message_text_color"
					label="Message Text Color"
					rules={[{ required: false, message: 'Message Text Color is missing' }]}
				>
					 <div
						style={ text_styles.swatch }
						onClick={ () => this.handleClick('message_color_picker') }
					 >
						<div style={ { ...text_styles.color, background: this.state.message_color && this.state.message_color.rgb ? `rgba(${ this.state.message_color.rgb.r }, ${ this.state.message_color.rgb.g }, ${ this.state.message_color.rgb.b }, ${ this.state.message_color.rgb.a })` : 'rgba(0,0,0,100)' } } />
					</div>
					{ this.state.message_color_picker ? <div style={ text_styles.popover }>
						<div
							style={ text_styles.cover }
							onClick={ () => this.handleClose('message_color_picker') }
						/>
						<SketchPicker
							color={ this.state.message_color ? this.state.message_color : { r: '0', g: '0', b: '0', a: '100' } }
							onChange={ (color) => this.setState({ message_color: color }) }
						/>
					</div> : null }
				</Form.Item>
				<Form.Item
					name="message_background_color"
					label="Message Background Color"
					rules={[{ required: false, message: 'Message Background Color is missing'  }]}
				>
					<div
						style={ background_styles.swatch }
						onClick={ () => this.handleClick('background_color_picker') }
					>
						<div style={ { ...background_styles.color, background: this.state.background_color && this.state.background_color.rgb ? `rgba(${ this.state.background_color.rgb.r }, ${ this.state.background_color.rgb.g }, ${ this.state.background_color.rgb.b }, ${ this.state.background_color.rgb.a })` : 'rgba(241,112,19,1)' } } />
					</div>
					{ this.state.background_color_picker ? <div style={ background_styles.popover }>
						<div
							style={ background_styles.cover }
							onClick={ () => this.handleClose('background_color_picker') }
						/>
						<SketchPicker
							color={ this.state.background_color ? this.state.background_color : { r: '241', g: '112', b: '19', a: '1' } }
							onChange={ (color) => this.setState({ background_color: color })}
						/>
					</div> : null }
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
													this.checkFormValues();
													const filteredValues = this.formRef.current.getFieldValue('selected_doors') && this.formRef.current.getFieldValue('selected_doors').filter(obj => obj ? obj.location !== val : false);
													this.formRef.current.setFieldsValue({ 'selected_doors': filteredValues });
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
												this.checkFormValues();
												this.setState({
													current_selected_locations: this.state.current_selected_locations.length ? this.state.current_selected_locations.filter(id => id !== this.state.current_selected_locations[name]) : this.state.current_selected_locations
												});
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
												this.checkFormValues();
												this.setState({
													current_selected_doors: this.state.current_selected_doors.length ? this.state.current_selected_doors.filter(id => id !== this.state.current_selected_doors[name]) : this.state.current_selected_doors
												});
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

	render() {
		return(
			<div>
				{this.renderForm()}
			</div>
		);
	}
};

export default SystemMessageBasicForm;
