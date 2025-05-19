/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Table, Button, Form, Modal, Select, Col, Row, Divider, Input, DatePicker, notification, Badge } from 'antd';
import { MinusCircleOutlined, PlusSquareFilled, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import moment from 'moment';
import config from '../../../config';

import LabelHelper from '../../../helpers/Label';

const { confirm } = Modal;

class UserAuthsPage extends Component {

	formRef = React.createRef();

	state = {
		uuid: null,
		currentAuth: {},
		user_id: null,
		modal: false,
		create: false,
		selected_date: null,
		status: null,
		disabled: true,
		loadingSubmit: false,
		selectedAuth: null,
		existingAuth: null
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta, loadingSubmit: prevLoadingSubmit } = prevProps.userAuthsPageProps;
		const { meta, loadingSubmit } = this.props.userAuthsPageProps;

		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if( type === 'success' ){
				this.setState({
					modal: false,
					currentAuth: {},
					create: false,
					selected_date: null,
					status: null,
					disabled: true,
					selectedAuth: null
				});
				this.getUserAuths();
			}
			this.props.resetMeta();
		}

		if (loadingSubmit !== prevLoadingSubmit) {
			this.setState({
				loadingSubmit
			});
		}
	};

	checkFormValues = () => {
		const { selectedAuth } = this.state;
		if(
			(
				(
					selectedAuth === 'mifare' &&
					this.formRef.current.getFieldValue('card_id') &&
					this.formRef.current.getFieldValue('card_reference')
				)

				||

				(
					selectedAuth === 'custom_qr' &&
					this.formRef.current.getFieldValue('qrcode_custom_payload')
				)
			)
			&&
			this.formRef.current.getFieldValue('name') &&
			this.formRef.current.getFieldValue('type') &&
			this.formRef.current.getFieldValue('start_at') &&
			this.formRef.current.getFieldValue('end_at') &&
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

	onChangeType = (value) => {
		this.setState({
			selectedAuth: value
		}, this.checkFormValues());
	}

	showSuspendConfirm = (id, suspendFunction) => {
		confirm({
			title: 'Are you sure you want to suspend this Custom Authentication?',
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
			title: 'Are you sure you want to reactivate this Custom Authentication?',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				unsuspendFunction(id);
			},
			onCancel() {
			}
		});
	}

	onSubmit(values){
		const { currentAuth } = this.state;
		const { _id, updated_at } = currentAuth || [];
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const { name, description, card_reference, card_id, type, end_at, start_at, qrcode_custom_payload } = values;

		const data = {
			card_id: card_id ? card_id.trim(): null,
			card_reference: card_reference ? card_reference.trim(): null,
			qrcode_custom_payload
		};

		const body = {
			name,
			description,
			data,
			type,
			user_id: query.id,
			end_at,
			start_at
		};

		if(_id && updated_at){
			body._id = _id;
			body.updated_at = updated_at;
		}

		this.props.onSubmit(body);
	}

	componentDidMount(){
		this.getUserAuths();
	}

	getUserAuths(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && query.id && this.props.getUserAuthsByUserId({ user_id: query.id });
		this.setState({
			user_id: query.id
		});
	}

	disableToday = (current) => {
		return current && current < moment().subtract(1, 'days');
	}

	disableDatesBefore = (current) => {
		return current && current < moment(this.state.selected_date, 'YYYY-MM-DD');
	}

	renderModal(){
		const { suspendUserAuthById, reactivateUserAuthById } = this.props;
		const { loadingSubmit } = this.props.userAuthsPageProps;
		const { modal, currentAuth, create, status: stateStatus, selectedAuth } = this.state;
		const { _id, name, description, type, start_at, end_at, card_id, card_reference, pin_code, qr_key_uuid, qrcode_custom_payload } = currentAuth || [];

		return(
			<Modal
				destroyOnClose={true}
				onCancel={e => {
					e.preventDefault();
					this.setState({
						currentAuth: {},
						user_id: null,
						modal: false,
						create: false,
						selected_date: null,
						status: null,
						disabled: true,
						selectedAuth: null
					});
				}}
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
						<h3> {create ? 'Add' : 'Edit' } Authentication Method </h3>
						<Divider />
						<Form
							layout="vertical"
							initialValues={{
								name,
								description,
								card_id,
								card_reference,
								pin_code,
								qrcode_custom_payload,
								type,
								status: stateStatus ? LabelHelper.status(stateStatus) : '',
								start_at: start_at ? moment(start_at) : null,
								end_at: end_at ? moment(end_at) : null
							}}
							onFinish={values => {
								this.onSubmit(values);
							}}
							ref={this.formRef}
						>
							<Form.Item
								name="name"
								label="Name:"
								rules={[{ required: true, message: 'Name is missing' }]}
							>
								<Input
									placeholder="Enter name..."
									onChange={this.checkFormValues}
								/>
							</Form.Item>

							<Form.Item
								label="Authentication Type"
								name="type"
								rules={[{ required: true, message: 'Authentication Type is missing' }]}
							>
								<Select
									onChange={this.onChangeType}
									disabled={!create}
								>
									<Select.Option value="custom_qr">{LabelHelper.securityFeatureAuthenticationMethod('custom_qr')}</Select.Option>
									<Select.Option value="mifare">{LabelHelper.securityFeatureAuthenticationMethod('mifare')}</Select.Option>
								</Select>
							</Form.Item>

							{
								selectedAuth === 'mifare' &&
									<div>
										<Form.Item
											label="Card ID"
											name="card_id"
											rules={[{ required: true, message: 'Card ID is missing' }]}
										>
											<Input
												onChange={this.checkFormValues}
												placeholder="Enter Card ID here"
											/>
										</Form.Item>
										<Form.Item
											label="Card Reference"
											name="card_reference"
											// rules={[{ required: true, message: 'Card reference is missing' }]}
										>
											<Input
												onChange={this.checkFormValues}
												placeholder="Enter Card Reference here"
											/>
										</Form.Item>
									</div>
							}

							{
								selectedAuth === 'custom_qr' &&
									<div>

										<Form.Item
											label="Custom payload"
											name="qrcode_custom_payload"
											rules={[{ required: true, message: 'Custom Payload is missing' }]}
										>
											<Input
												onChange={this.checkFormValues}
												placeholder="Enter custom payload.."
											/>
										</Form.Item>
									</div>
							}

							{
								!_.isEmpty(currentAuth) ?
									<div>
										<p>Status</p>
										<Row>
											<Col span={17}>

												<Form.Item
													style={{ width: '100%' }}
													name="status"
												>
													<Input
														disabled
														style={{ width: '100%' }}
													/>
												</Form.Item>

											</Col>
											<Col span={7}>

												{ stateStatus === 'enabled' ?

													<div>
														<Form.Item style={{ float: 'right' }}>
															<Button
																style={{ backgroundColor: '#e3ce14', color: 'white' }}
																onClick={ e => {
																	e.preventDefault();
																	this.showSuspendConfirm(_id, suspendUserAuthById);
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
																	this.showUnsuspendConfirm(_id, reactivateUserAuthById);
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
								label="Start Date"
								name="start_at"
								rules={[{ required: true, message: 'Start Date is missing' }]}
							>
								<DatePicker
									style={{ width: '100%' }}
									format="YYYY-MM-DD HH:mm"
									showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
									minuteStep={5}
									onChange={ (value) => {
										this.setState({
											selected_date: value
										});
										this.formRef.current.setFieldsValue({ end_date: null });
										this.checkFormValues();
									}}
								/>
							</Form.Item>
							<Form.Item
								label="End Date"
								name="end_at"
								rules={[{ required: true, message: 'End Date is missing' }]}
							>
								<DatePicker
									style={{ width: '100%' }}
									format="YYYY-MM-DD HH:mm"
									showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
									disabledDate={this.disableDatesBefore}
									minuteStep={5}
									onChange={this.checkFormValues}
								/>
							</Form.Item>
							<Form.Item
								style={{
									display: 'flex'
								}}
							>
								{ selectedAuth === 'custom_qr' && currentAuth ?
									<Button
										style={{ float: 'left' , background: currentAuth ? '#39d450' : this.state.disabled ? '' : '#1890ff' }}
										size="middle"
										type="primary"
										onClick={() =>  navigator.clipboard.writeText(`${config.qrcode_app}/custom?uuid=${qr_key_uuid}`)}
									>
									Copy QR Link
									</Button> :
									'' }
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
					</Col>
				</Row>
			</Modal>
		);
	}

	renderTable(){
		const { custom_authentication_method_to_user_maps } = this.props.userAuthsPageProps && this.props.userAuthsPageProps;
		const { uuid } = this.props.userAuthsPageProps;
		console.log(uuid);
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Description',
				dataIndex: 'description',
				key: 'description'
			},
			{
				title: 'Authentication Type',
				dataIndex: 'type',
				key: 'type'
			},
			{
				title: 'Start Date',
				dataIndex: 'start_at',
				key: 'start_at'
			},
			{
				title: 'End Date',
				dataIndex: 'end_at',
				key: 'end_at'
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action'
			}
		];

		let data = [];

		custom_authentication_method_to_user_maps && custom_authentication_method_to_user_maps.length && custom_authentication_method_to_user_maps.map(camtum => {
			data.push({
				key: camtum._id,
				name: camtum.name,
				description: camtum.description,
				type: LabelHelper.securityFeatureAuthenticationMethod(camtum.type),
				start_at: moment(camtum.start_at).format('MMMM DD, YYYY'),
				end_at: moment(camtum.end_at).format('MMMM DD, YYYY'),
				status: <Badge
					status={camtum.status === 'enabled' ? 'success' : 'error'}
					text={LabelHelper.status(camtum.status)}
				        />,
				action: (
					<a
						onClick={
							(e) => {
								e.preventDefault();
								this.setState({
									modal: true,
									currentAuth: camtum,
									status: camtum.status,
									selectedAuth: camtum.type
								});
							}
						}
					>Edit</a>
				)
			});
		});
		return(
			<Table
				pagination={false}
				columns={columns}
				dataSource={data}
			/>
		);
	}

	renderComponentButtons(){
		return(
			<div
				className="component-buttons"
				style={{ float: 'right' }}
			>
				<p>
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
					>Add Custom Auth</Button>
				</p>
			</div>
		);
	}

	render(){
		return(
			<div
				className="main-content"
			>
				{this.renderComponentButtons()}
				<Divider />
				{this.renderTable()}
				{this.renderModal()}
			</div>
		);
	}
}

export default UserAuthsPage;