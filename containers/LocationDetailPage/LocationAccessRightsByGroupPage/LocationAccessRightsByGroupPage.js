/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { DatePicker, Table, Input, Button, Modal, Row, Col, Form, Select, Divider, TimePicker, notification, Pagination } from 'antd';
import { PlusSquareFilled, SearchOutlined, MinusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';

import CommonEnum from '../../../constants/CommonEnum';

const { confirm } = Modal;

class LocationAccessRightsByGroupPage extends Component {
	formRef = React.createRef();

	state = {
		currentAccessRight: null,
		selected_date: null,
		modal: false,
		create: false,
		disabled: true,
		loadingSubmit: false
	}

	componentDidMount(){
		this.getLocationAccessRightsByGroupList();
		this.props.getLocationAccessRightsGroups();
	}
	
	showSuspendConfirm = (id, suspendFunction) => {
		confirm({
			title: 'Are you sure you want to suspend this access right?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				suspendFunction(id);
			},
			onCancel() {
			}
		});

	}

	showUnsuspendConfirm = (id, unsuspendFunction) => {
		confirm({
			title: 'Are you sure you want to reactivate this access right?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				unsuspendFunction(id);
			},
			onCancel() {
			}
		});
	}

	disableToday = (current) => {
		return current && current < moment().subtract(1, 'days');
	}

	disabledDates = (current) => {
		return current && current < moment(this.state.selected_date, 'YYYY-MM-DD');
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta, loadingSubmit: prevLoadingSubmit, limit, page, access_rights_groups: prevAccessRightsGroups } = prevProps.locationAccessRightsByGroupPageProps;
		const { meta, loadingSubmit, access_rights_groups } = this.props.locationAccessRightsByGroupPageProps;

		// const { groupIdFilter: prevGroupIdFilter } = prevState;
		// const { groupIdFilter: group_id } = this.state;

		// if (prevGroupIdFilter !== group_id) {
		// 	this.getLocationAccessRightsByGroupList(group_id, page, limit);
		// }

		if(meta !== prevMeta){
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if(type === 'success'){
				this.setState({
					currentAccessRight: {},
					modal: false,
					selected_date: null,
					disabled: true,
					create: false
				});
			}

		}

		if (loadingSubmit !== prevLoadingSubmit) {
			this.setState({
				loadingSubmit
			});
		}
	}

	checkFormValues = () => {
		const access_times = this.formRef.current.getFieldValue('access_times');
		if(
			this.formRef.current.getFieldValue('group') &&
			!_.isNil(this.formRef.current.getFieldValue('allow_holidays')) &&
			!_.isNil(this.formRef.current.getFieldValue('allow_emergency_access')) &&
			this.formRef.current.getFieldValue('validity_start') &&
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

	onSubmit(values){
		const { create, currentAccessRight } = this.state;
		const { limit, page } = this.props.locationAccessRightsByGroupPageProps || {};
		const { access_times: access_times_values, allow_holidays, status, group: group_id, allow_emergency_access, validity_start, validity_end } = values;
		const access_times = access_times_values.map( access_time => {
			const { days, time } = access_time;
			return({
				days,
				start_time: moment(time[0]).format('YYYY-MM-DDTHH:mm:ssZ'),
				end_time: moment(time[1]).format('YYYY-MM-DDTHH:mm:ssZ')
			});
		});
		const location_id = this.props.locationDetailPageProps.location._id;
		let fields = {
			group_id,
			location_id,
			allow_holidays,
			allow_emergency_access,
			validity_start,
			validity_end,
			access_times,
			status
		};
		if(create){
			this.props.onSubmit(fields);
			this.getLocationAccessRightsByGroupList(page, limit);
		} else {
			fields.updated_at = currentAccessRight.updated_at;
			fields.id = currentAccessRight.key;
			this.props.onSubmit(fields);
		}
	}

	renderModal(){
		const { 
			suspendAccessRightByGroup: onSuspend,
			reactivateAccessRightByGroup: onUnsuspend
		} = this.props;
		const { access_rights_groups, groups, loadingSubmit } = this.props.locationAccessRightsByGroupPageProps || {};
		const { modal, currentAccessRight, create } = this.state;
		const { access_times, allow_holidays, group_id, status, group_name, allow_emergency_access, validity_start, validity_end, key: _id } = currentAccessRight || {};
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
									group: group_id,
									allow_holidays,
									status: status ? status : 'enabled',
									access_times: initial_access_times,
									validity_start: validity_start ? moment(new Date(validity_start)) : null,
									validity_end: validity_end ? moment(new Date(validity_end)) : null,
									allow_emergency_access
								}
							}
							ref={this.formRef}
							onFinish={values => {
								this.onSubmit(values);
							}}
						>
							<Form.Item
								label="Group"
								name="group"
								onChange={this.checkFormValues}
								rules={[{ required: true, message: 'Group is missing' }]}
							>
								<Select
									onChange={this.checkFormValues}
								>
									{ groups && groups.length && groups.map((group, index) => {
										return(
											<Select.Option 
												key={index}
												value={group._id}
												disabled={access_rights_groups.filter(acr => acr.group_id._id === group._id).length > 0 ? true : false}
											> {group.name} </Select.Option>
										);
									})}
								</Select>
							</Form.Item>
							<Form.Item
								label="Allow access on public holiday"
								name="allow_holidays"
								onChange={this.checkFormValues}
								rules={[{ required: true, message: 'Value is missing' }]}
							>
								<Select
									onChange={this.checkFormValues}
								>
									<Select.Option value={true}> Allow </Select.Option>
									<Select.Option value={false}> Disallow </Select.Option>
								</Select>
							</Form.Item>
							<Form.Item
								label="Can Access During Emergency"
								name="allow_emergency_access"
								onChange={this.checkFormValues}
								rules={[{ required: true, message: 'Value is missing' }]}
							>
								<Select
									onChange={this.checkFormValues}
								>
									<Select.Option value={true}>Yes</Select.Option>
									<Select.Option value={false}>No</Select.Option>
								</Select>
							</Form.Item>
							{/* <Form.Item
								label="Status"
								name="status"
							>
								<Select
									disabled={true}
								>
									<Select.Option value="enabled"> Enabled </Select.Option>
									<Select.Option value="disabled"> Disabled </Select.Option>
								</Select>
							</Form.Item> */}
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
													<Select
														disabled={true}
													>
														<Select.Option value="enabled"> Enabled </Select.Option>
														<Select.Option value="disabled"> Disabled </Select.Option>
													</Select>
												</Form.Item>
							
											</Col>
											<Col span={7}>

												{ status === 'enabled' ? 

													<div>
														<Form.Item style={{ float: 'right' }}>
															<Button
																style={{ backgroundColor: '#e3ce14', color: 'white' }}
																onClick={ e => {
																	e.preventDefault();
																	this.showSuspendConfirm(_id, onSuspend);
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
																	this.showUnsuspendConfirm(_id, onUnsuspend);
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
								label="Valid From Date Time"
								name="validity_start"
								onChange={this.checkFormValues}
								rules={[{ required: true, message: 'Value is missing' }]}
							>
								<DatePicker
									style={{ width: '100%' }}
									format="YYYY-MM-DD"
									minuteStep={5}
									onChange={(value) => {
										this.formRef.current.setFieldsValue({ 'validity_end': null });
										this.setState({
											selected_date: value
										});
										this.checkFormValues();
									}}
									disabledDate={this.disableToday}
								/>
							</Form.Item>
							<Form.Item
								label="Valid Until Date Time"
								name="validity_end"
								onChange={this.checkFormValues}
							>
								<DatePicker 
									style={{ width: '100%' }}
									format="YYYY-MM-DD"
									minuteStep={5}
									onChange={this.checkFormValues}
									disabledDate={this.disabledDates}
								/>
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
															rules={[{ required: true, message: 'Missing value for Access days' }]}
															onChange={this.checkFormValues}
														>
															<Select
																mode="multiple"
																key={key}
																placeholder="Select days"
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
															rules={[{ required: true, message: 'Missing value for Access time' }]}
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
																current_selected_entities: this.state.current_selected_entities && this.state.current_selected_entities.length ? this.state.current_selected_entities && this.state.current_selected_entities.filter(id => id !== this.state.current_selected_entities[name]) : this.state.current_selected_entities
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
									disabled={this.state.disabled}
									type="primary"
									htmlType="submit"
									loading={loadingSubmit}
								>Save</Button>
								<Button
									style={{ marginRight: '15px', float: 'right' }}
									type="default"
									onClick={e => {
										e.preventDefault();
										this.setState({
											modal: false,
											selected_date: null,
											disabled: true,
											currentAccessRight: null,
											create: false
										});
									}}
								>Cancel</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Modal>
		);
	}

	getLocationAccessRightsByGroupList(page, limit){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && this.props.getLocationAccessRightsByGroupList({ location_id: query.id, page, limit });
	}

	renderTable(){
		const { access_rights_groups } = this.props.locationAccessRightsByGroupPageProps || {};
		const columns = [
			{
				title: 'Group Name',
				dataIndex: 'group_name',
				key: 'group_name'
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
						onClick={
							() => {
								this.setState({
									currentAccessRight: record,
									modal: true,
									create: false
								});
							}
						}
					>
						Edit
					</a>
			}
		];
		const data = [];
		access_rights_groups && access_rights_groups.length && access_rights_groups.forEach(access_rights_group => {
			const { _id, group_id: group, access_times, allow_holidays, status, updated_at, allow_emergency_access, validity_start, validity_end } = access_rights_group;
			const { name: group_name } = group;
			const access_hours = access_times && access_times.length && access_times.map(at => 
				<li>{at && at.days && at.days.join(' ')} ({ moment(new Date(at.start_time)).format('HH:mm a') } - {moment(new Date(at.end_time)).format('HH:mm a')})</li>	
			);
			data.push({
				group_id: group._id,
				allow_holidays,
				status,
				group_name,
				access_times,
				key: _id,
				updated_at,
				allow_emergency_access,
				validity_start,
				validity_end,
				access_hours: access_hours ? <ul>{access_hours}</ul> : null
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

	onSelectGroup = groupIdFilter => {
		this.setState({ groupIdFilter });
	}

	renderSearchBar(groups){
		return(
			<div style={{ display: 'flex' }}>
				<span> The specified groups in the list can access the location in different date and time. </span>

				{/* <Select
					placeholder="Group"
					defaultValue={undefined}
					allowClear={true}
					style={{ marginLeft: 'auto', marginRight: '10px', width: '200px' }}
					onChange={this.onSelectGroup}
				>
					{groups && groups.length && groups.map(group => {
						return (<Select.Option
							key={group._id}
							value={group.id}
						        > {group.name} </Select.Option>);
					})}
				</Select> */}

				<div
					className="component-buttons"
					style={{ marginLeft: 'auto' }}
				>
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

	render(){
		const { limit, page, total, groups } = this.props.locationAccessRightsByGroupPageProps;
		return(
			<div className="main-content">
				{this.renderSearchBar(groups)}
				<Divider />
				{this.renderTable()}
				<Pagination
					style={{ marginTop: '30px' }}
					showSizeChanger
					defaultPageSize={limit}
					current={page}
					total={total}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSizeOptions={['5', '10', '20', '50']}
					onChange={(page, pageSize) => this.getLocationAccessRightsByGroupList(page, pageSize)}
				/>
				{this.renderModal()}
			</div>
		);
	}
};

export default LocationAccessRightsByGroupPage;