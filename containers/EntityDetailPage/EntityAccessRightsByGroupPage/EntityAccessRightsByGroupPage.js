/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Table, Input, Button, Select, Divider, Form, Modal, Col, Row, TimePicker, notification } from 'antd';
import { SearchOutlined,PlusSquareFilled, MinusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import LabelHelper from '../../../helpers/Label';

import CommonEnum from '../../../constants/CommonEnum';

const { confirm } = Modal;

class EntityAccessRightsByGroupPage extends Component {

	formRef = React.createRef();

	state = {
		currentAccessRight: null,
		modal: false,
		create: false,
		disabled: true
	}

	componentDidMount(){
		this.getEntityAccessRightsByGroupList();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.entityAccessRightsByGroupPageProps;
		const { meta } = this.props.entityAccessRightsByGroupPageProps;
		if(meta !== prevMeta){
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
		}
	}

	checkFormValues = () => {
		const access_times = this.formRef.current.getFieldValue('access_times');
		if(
			this.formRef.current.getFieldValue('location') &&
			this.formRef.current.getFieldValue('allow_holidays') !== undefined &&
			this.formRef.current.getFieldValue('status') &&
			!access_times.includes(undefined)
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

	getEntityAccessRightsByGroupList(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && query.id && this.props.getEntityAccessRightsByGroupList({ entity_id: query.id });
	}

	showDeleteConfirm = (id, name, deleteFunction) => {
		confirm({
			title: `Are you sure you want to delete Access Rights to ${name} Location?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				deleteFunction(id);
			},
			onCancel() {
			}
		});
	}

	deleteField = (id) => {
		//deleting
		this.props.deleteAccessRightsGroupById(id);
		this.setState({
			...this.state,
			modal: false,
			disabled: true
		});
	}

	renderModal(){
		const { locations } = this.props.entityDetailPageProps || {};
		const { modal, currentAccessRight, create } = this.state;
		const { access_times, allow_holidays, location_id, status, location_name } = currentAccessRight || {};
		const initial_access_times = [];
		access_times && access_times.length && access_times.map(access_time => {
			const { days, start_time, end_time } = access_time;
			const time = [moment(start_time), moment(end_time)];
			initial_access_times.push({
				days,
				time: time
			});
		});

		return(
			<Modal
				destroyOnClose={true}
				closable={false}
				footer={null}
				visible={modal}
				width={650}
			>
				<Row
					responsive={true}
					gutter={24}
				>
					<Col
						xs={24} 
						sm={24} 
						md={24} 
						lg={24} 
						xl={24}
					>
						<h3> Add Access Right (By Group) </h3>
						<Divider />
						<Form
							layout="vertical"
							initialValues={
								{
									location: location_id,
									allow_holidays,
									status,
									access_times: initial_access_times
								}
							}
							onFinish={values => {
								this.onSubmit(values);
							}}
							ref={this.formRef}
						>
							<Form.Item
								label="Location"
								name="location"
								onChange={this.checkFormValues}
							>
								<Select
									onChange={this.checkFormValues}
								>
									{ locations && locations.length && locations.map(location => {
										return(
											<Select.Option value={location._id}> {location.name} </Select.Option>
										);
									})}
								</Select>
							</Form.Item>
							<Form.Item
								label="Allow access on public holiday"
								name="allow_holidays"
								onChange={this.checkFormValues}
							>
								<Select
									onChange={this.checkFormValues}
								>
									<Select.Option value={true}> Allow </Select.Option>
									<Select.Option value={false}> Disallow </Select.Option>
								</Select>
							</Form.Item>
							<Form.Item
								label="Status"
								name="status"
								onChange={this.checkFormValues}
							>
								<Select
									onChange={this.checkFormValues}
								>
									<Select.Option value="enabled"> Enabled </Select.Option>
									<Select.Option value="disabled"> Disabled </Select.Option>
								</Select>
							</Form.Item>
							<Form.List
								name="access_times"
								onChange={this.checkFormValues}
							>
								{(fields, { add, remove }) => (
									<>
										{fields.map(({ key, name, fieldKey, ...restField }, index) => {
											return(
												<div
													key={key}
													style={{ display: 'flex', marginBottom: -20 }}
												>
													<Col
														span={12}
													>
														<Form.Item
															{...restField}
															name={[name, 'days']}
															fieldKey={[fieldKey, 'key']}
															label={index === 0 ? 'Access Days' : ''}
															style={{ width: '100%' }}
															onChange={this.checkFormValues}
														>
															<Select
																mode="multiple"
																key={key}
																rules={[{ required: true, message: 'Missing value' }]}
																onChange={(val) => {
																	const filtered = this.state.current_selected_entities && this.state.current_selected_entities.length ? [...this.state.current_selected_entities.filter(permission => permission !== this.state.current_selected_entities)] : [];
																	filtered.splice(name, 0, val);
																	this.setState({
																		current_selected_entities: [...filtered]
																	});
																		
																	this.checkFormValues();
																}}
															>
																{
																	CommonEnum.days.map((day, index) => {
																		return (														
																			<Select.Option
																				key={index}
																				value={day}
																			>
																				{day}
																			</Select.Option>
																		);
																	})
																}
															</Select>
														</Form.Item>
													</Col>
													<Col
														span={12}
													>
														<Form.Item
															{...restField}
															name={[name, 'time']}
															fieldKey={[fieldKey, 'key']}
															label={index === 0 ? 'Time' : ''}
															style={{ width: '100%' }}
															onChange={this.checkFormValues}
														>
															<TimePicker.RangePicker 
																format="HH:mm"
																use12Hours={true}
																minuteStep={5}
																onChange={this.checkFormValues}
															/>
														</Form.Item>
													</Col>


													<MinusCircleOutlined
														onClick={() => {
															remove(name);
															this.setState({
																current_selected_entities: this.state.current_selected_entities && this.state.current_selected_entities.length ? this.state.current_selected_entities.filter(id => id !== this.state.current_selected_entities[name]) : this.state.current_selected_entities
															}, () => {
																this.checkFormValues();
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
								Add access time &nbsp;
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
							<Form.Item>
								<Button 
									style={{ float: 'right' }}
									type="primary"
									htmlType="submit"
									disabled={this.state.disabled}
								>Save</Button>
								<Button
									style={{ marginRight: '15px', float: 'right' }}
									type="default"
									onClick={e => {
										e.preventDefault();
										this.setState({
											modal: false,
											currentAccessRight: null,
											create: false,
											disabled: true
										});
									}}
								>Cancel</Button>
								<Button
									style={ { display: create ? 'none' : 'block', float: 'left' } }
									type="primary"
									onClick={(e) => {
										e.preventDefault();
										this.showDeleteConfirm(currentAccessRight.key, location_name, this.deleteField);
									}}
									danger
								> Delete </Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Modal>
		);
	}

	renderSearchBar(){
		return(
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
				<span> 
					<Input
						placeholder="Search by Location"
						style={{ width: '100%' }}
						prefix={<SearchOutlined />}
					/>
				</span>
				<div className="component-buttons">
					<span>
						<Button
							type="primary"
							size="middle"
							icon={<PlusSquareFilled />}
							onClick={ (e) => {
								e.preventDefault();
								this.setState({
									modal: true,
									create: true
								});
							}
							}
						>Add Access Rights</Button>
					</span>
				</div>
			</div>
		);
	}

	onSubmit(values){
		const { create, currentAccessRight } = this.state;
		const { access_times: access_times_values, allow_holidays, status, location: location_id } = values;
		const access_times = access_times_values.map( access_time => {
			const { days, time } = access_time;
			return({
				days,
				start_time: moment(time[0]).format('YYYY-MM-DDTHH:mm:ssZ'),
				end_time: moment(time[1]).format('YYYY-MM-DDTHH:mm:ssZ')
			});
		});
		const entity_id = this.props.entityDetailPageProps.entity._id;
		let fields = {
			entity_id,
			location_id,
			allow_holidays,
			access_times,
			status
		};
		if(create){
			this.props.onSubmit(fields);
		} else {
			fields.updated_at = currentAccessRight.updated_at;
			fields.id = currentAccessRight.key;
			this.props.onSubmit(fields);
		}
		this.setState({
			create: false,
			modal: false,
			disabled: true
		});
	}

	renderTable(){
		const { access_rights_groups } = this.props.entityAccessRightsByGroupPageProps && this.props.entityAccessRightsByGroupPageProps;
		const columns = [
			{
				title: 'Location',
				dataIndex: 'location_name',
				key: 'location_name'
			},
			{
				title: 'Access Hours',
				dataIndex: 'access_hours',
				key: 'access_hours'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => 
					<a
						onClick={ (e) => {
							e.preventDefault();
							this.setState({
								currentAccessRight: record,
								modal: true,
								create: false
							});
						}}
					>
						Edit
					</a>
			}
		];
		const data = [];
		access_rights_groups && access_rights_groups.length && access_rights_groups.map( access_rights_group => {
			const { _id, location_id: location, access_times, allow_holidays, status, updated_at } = access_rights_group;
			const { name: location_name } = location;
			data.push({
				location_id: location._id,
				allow_holidays,
				status,
				location_name,
				access_times,
				key: _id,
				updated_at
			});
		});

		return(
			<Table
				pagination={false}
				dataSource={data}
				columns={columns}
			/>
		);
	}

	render(){
		return(
			<div className="main-content">
				{this.renderSearchBar()}
				{this.renderTable()}
				{this.renderModal()}
			</div>
		);
	}
};

export default EntityAccessRightsByGroupPage;