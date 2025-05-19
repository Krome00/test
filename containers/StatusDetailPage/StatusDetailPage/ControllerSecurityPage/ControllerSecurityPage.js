/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { notification, Button, Divider, Table, Form, Modal, Row, Col, Select, InputNumber, TimePicker, Input, Space } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { PlusSquareFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import CommonEnum from '../../../../constants/CommonEnum';
import LabelHelper from '../../../../helpers/Label';
import Loading from '../../../../components/loading';

const { RangePicker } = TimePicker;
const { Option } = Select;
const { confirm } = Modal;

class ControllerSecurityPage extends Component {
  formSecurityRef = React.createRef();
  formSequenceRef = React.createRef();

	state = {
		modalState: false,
		sequenceModalState: false,
		selectedSequenceData: {},
		securityData: {},
		sequenceData: [],
		controller_id: null,
		disabledSecurityButton: true,
		disabledSequenceButton: true,
		loadings: [],
		saving: false
	}

	enterLoading = index => {
		this.setState(({ loadings }) => {
			const newLoadings = [...loadings];
			newLoadings[index] = true;

			return {
				loadings: newLoadings
			};
		});
		setTimeout(() => {
			this.setState(({ loadings }) => {
				const newLoadings = [...loadings];
				newLoadings[index] = false;

				return {
					loadings: newLoadings
				};
			});
		}, 1000);
	};

	showDeleteConfirm = (id, name, deleteFunction) => {
		confirm({
			title: `Are you sure you want to delete ${name}?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				deleteFunction(id);
			},
			onCancel() {
			}
		});
	}


	componentDidMount(){
		this.getSecurityByLocationId();
	}

	getSecurityByLocationId(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const { search, id } = query;

		this.props.getSecurityFeaturesByControllerId(id, { search });
		this.setState({ controller_id: id });
	}

	checkSecurityValues = () => {
		const { sequenceData } = this.state;
		if(
			!_.isEmpty(this.formSecurityRef.current.getFieldValue('schedule_date')) &&
			!_.isEmpty(this.formSecurityRef.current.getFieldValue('schedule_time')) &&
			this.formSecurityRef.current.getFieldValue('title') &&
			sequenceData.length >= 1 &&
			(this.formSecurityRef.current.getFieldValue('description') ||
			this.formSecurityRef.current.getFieldValue('description') === '' ||
			this.formSecurityRef.current.getFieldValue('description') === undefined)
		){
			this.setState({
				disabledSecurityButton: false
			});
		} else {
			this.setState({
				disabledSecurityButton: true
			});
		}
	}

	getAuthenticationTypes = () => {
		return CommonEnum.security_features_auth_type.map(sa => {
			return (
				<Option
					key={sa.value}
					value={sa.value}
					disabled={this.isMethodExists(sa.value)}
				>
					{sa.name}
				</Option>
			);
		});
	}

	checkSequenceValues = () => {
		const { sequenceData } = this.state;
		const tempSequence = sequenceData || [];

		if(
			//!tempSequence.some(s => s.step === this.formSequenceRef.current.getFieldValue('step')) &&
			this.formSequenceRef.current.getFieldValue('step') &&
			this.formSequenceRef.current.getFieldValue('method')
		){
			this.setState({
				disabledSequenceButton: false
			});
		} else {
			this.setState({
				disabledSequenceButton: true
			});
		}
	}

	resetDetailsPage = () => {
		//this.props.resetDetailsPage();
	}

	componentWillUnmount(){
		this.props.resetPage();
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('hello world', this.props);
		const { meta: prevMeta, security_features: prevSecurityFeatures, saving: prevLoading } = prevProps.controllerSecurityPageProps;
		const { meta, security_features, saving } = this.props.controllerSecurityPageProps;
		const { controller: prevController } = prevProps.controllerDetailPageProps;
		const { controller } = this.props.controllerDetailPageProps;

		if (prevController !== controller) {
			this.getSecurityByLocationId();
		}

		if(prevSecurityFeatures !== security_features) {
			this.setState({
				...this.state,
				security_features
			});
		}
		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if( type === 'success' ){
				this.setState({
					modalState: false,
					sequenceModalState: false,
					selectedSequenceData: {},
					securityData: {},
					sequenceData: []
				});
				this.getSecurityByLocationId();
			}
			this.props.resetMeta();
		}

		if(saving !== prevLoading){
			this.setState({
				saving
			});
		}
	}

	sequenceTable = (sequenceData) => {
		const sequenceColumns = [
			{
				title: 'Step #',
				dataIndex: 'step',
				defaultSortOrder: 'ascend',
				sorter: (a, b) => a.step - b.step
			},
			{
				title: 'Authentication Method',
				dataIndex: 'auth_method'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				render: (text, record) =>
					(<Space size="middle">
					  <a
					  	onClick={
								(e) => {
									e.preventDefault();
									this.setState({ sequenceModalState: true, selectedSequenceData: record });
								}
							}
					  >Edit</a>
					  <a
					  	onClick={
								(e) => {
									e.preventDefault();
									const newSequence = [...this.state.sequenceData];
									newSequence.splice(record.key, 1);
									this.setState({ disabledSecurityButton: false, sequenceData: newSequence }, () => {
										this.checkSecurityValues();
									});
								}
							}
					  >Delete</a>
					</Space>)
			}
		];

		const sequenceArr = [];
		// eslint-disable-next-line array-callback-return
		sequenceData && sequenceData.length && sequenceData.map((sd, index) => {
			sd.index = index;
			sequenceArr.push({
				key: index,
				step: sd.step,
				auth_method: LabelHelper.securityFeatureAuthenticationMethod(sd.authentication_method)
			});
		});

		return (
	<>
		<Table
			style={{ marginBottom: '10px' }}
			columns={sequenceColumns}
			dataSource={sequenceArr}
			pagination={false}
		/>

		<a
			onClick={ ((e) => {
				e.preventDefault();
				this.setState({ sequenceModalState: true });
			})
			}
		>
					Add Step
		</a>
	</>
		);

	}

	renderSecurityModal = () => {
		const { loadings } = this.state;
		const { security_features, loadingSecuritySubmit } = this.props.controllerSecurityPageProps;
		console.log('testt', this.props.controllerSecurityPageProps);
		const { modalState, securityData, controller_id: stateControllerId, sequenceData } = this.state;
		const { _id, schedule, start_at, end_at, controller_id, updated_at, title, description } = securityData || {};

		return (
			<Modal
				title="Adding security features"
				footer={null}
				destroyOnClose={true}
				onCancel={(e) => {
					e.preventDefault();
					this.setState({
						modalState: false,
						securityData: {},
						sequenceModalState: false,
						selectedSequenceData: {},
						disabledSecurityButton: true,
						sequenceData: []
					});
				}}
				visible={modalState}
			>
				<Row
					responsive="true"
				>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={24}
						xl={24}
					>
						<Form
							initialValues={
								{
									title,
									description,
									schedule_date: schedule,
									schedule_time: !_.isEmpty(securityData) ? [moment(start_at), moment(end_at)] : ''
								}
							}
							style={{ marginTop: '15px' }}
							onFinish={(values) => {
								const formattedSequence = sequenceData && sequenceData.length && sequenceData.map(sd => {
									return {
										step: sd.step,
										authentication_method: sd.authentication_method
									};
								});
								const formattedValues = {
									title: values.title,
									description: values.description,
									schedule: values.schedule_date,
									start_at: moment(values.schedule_time[0]).format('YYYY-MM-DDTHH:mm:ssZ'),
									end_at: moment(values.schedule_time[1]).format('YYYY-MM-DDTHH:mm:ssZ'),
									controller_id: controller_id ? controller_id : stateControllerId
								};

								if(!_.isEmpty(sequenceData)){
									formattedValues.sequence = formattedSequence;
								}

								if(!_.isEmpty(securityData)) {
									formattedValues._id =_id;
									formattedValues.updated_at = updated_at;
									this.props.onSubmit(formattedValues);
								} else {
									// Create
									this.props.onSubmit(formattedValues);
								}

							}}
							ref={this.formSecurityRef}
							layout="vertical"
						>

							<Form.Item
								name="title"
								label="Title:"
								rules={[{ required: true, message: 'Title is missing' }]}
								onChange={this.checkFormValues}
							>
								<Input
									placeholder="Enter title..."
									onChange={this.checkSecurityValues}
								/>
							</Form.Item>

							<Form.Item
								name="description"
								label="Description:"
								rules={[{ required: true, message: 'Title is missing' }]}
								onChange={this.checkSecurityValues}
							>
								<Input.TextArea
									placeholder="Enter desctiption.."
								/>
							</Form.Item>

							<p>Schedule</p>
							<Row>
								<Col span={12}>

									<Form.Item
										name="schedule_date"
										rules={[{ required: true, message: 'Schedule Date is empty' }]}
									>

										<Select
											mode = "multiple"
											style={{ width: '95%' }}
											allowClear
											placeholder="Select days"
											onChange={this.checkSecurityValues}
										>
											{
												CommonEnum.days.map((day, index) => (
													<Select.Option
														key={index}
														value={day}
													>{day}</Select.Option>
												))
											}
										</Select>

									</Form.Item>

								</Col>
								<Col span={12}>

									<Form.Item
										name="schedule_time"
										rules={[{ required: true, message: 'Schedule Time is empty' }]}
									>

										<RangePicker
											format="HH:mm"
											use12Hours={true}
											style={{ width: '100%' }}
											onChange={this.checkSecurityValues}
										/>

									</Form.Item>

								</Col>
							</Row>

							{
								this.sequenceTable(sequenceData)
							}


							<Form.Item>
								<Button
									style={{ float: 'right' }}
									type="primary"
									htmlType="submit"
									disabled={this.state.disabledSecurityButton}
									loading={loadingSecuritySubmit}
								>Save</Button>

								{/* Configure Delete button*/}
								{
									_id && (
										<Button
											style={{ float: 'left', marginTop: 15 }}
											type="danger"
											onClick={() => { this.showDeleteConfirm(_id, title, (_id)=>{this.props.deleteSecurityFeatureById(_id)}); }}
											loading={loadingSecuritySubmit}
										>Delete</Button>
									)
								}
								{/* Configure Delete button*/}

							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Modal>
		);
	}

	isMethodExists = method => {
		const { sequenceData } = this.state || {};

		return sequenceData?.some(mthd => mthd.authentication_method === method);
	}

	renderSequenceModal = () => {
		const { loadings } = this.state;
		const { sequenceModalState, selectedSequenceData, sequenceData } = this.state;
		const tempSequenceData = sequenceData ? [...sequenceData] : [];
		const { step, auth_method, key, _id } = selectedSequenceData || '';

		return (
			<Modal
				title="Adding authentication sequence"
				footer={null}
				destroyOnClose={true}
				onCancel={(e) => {
					e.preventDefault();

					this.setState({
						sequenceModalState: false,
						selectedSequenceData: {},
						disabledSequenceButton: true
					});
				}}
				visible={sequenceModalState}
			>
				<Row
					responsive="true"
				>
					<Col
						xs={24}
						sm={24}
						md={24}
						lg={24}
						xl={24}
					>
						<Form
							initialValues={
								{
									step: step,
									method: auth_method
								}
							}
							style={{ marginTop: '15px' }}
							onFinish={(values) => {
								const { step, method } = values;
								if (step === 1 && method === 'face_detection') {
									return notification.error({
										message: 'Face Detection cannot be the first step',
										placement: 'bottomRight'
									});;
								}
								if(!_.isEmpty(selectedSequenceData)){
									tempSequenceData[key] = {
										_id,
										key,
										step: values.step,
										authentication_method: values.method
									};
								}else{
									tempSequenceData.push({
										step: values.step,
										authentication_method: values.method
									});
								}

								this.setState({
									sequenceModalState: false,
									sequenceData: tempSequenceData,
									disabledSequenceButton: true
								});

								this.checkSecurityValues();
							}}
							ref={this.formSequenceRef}
							layout="vertical"
						>

							<Form.Item
								name="step"
								label="Step #"
								rules={[{ required: true, message: 'Step number is empty' }]}
							>

								<InputNumber
									onChange={this.checkSequenceValues}
									style={{ width: '100%' }}
								/>

							</Form.Item>


							<Form.Item
								name="method"
								label="Authentication Method"
								rules={[{ required: true, message: 'Authentication Method is empty' }]}
							>

								<Select
									onChange={this.checkSequenceValues}
								>
									{this.getAuthenticationTypes()}
								</Select>

							</Form.Item>

							<Form.Item>
								<Button
									style={{ float: 'right' }}
									type="primary"
									htmlType="submit"
									disabled={this.state.disabledSequenceButton}
									loading={loadings[0]}
									onClick={() => this.enterLoading(0)}
								>Save</Button>
							</Form.Item>
							
						</Form>
					</Col>
				</Row>

			</Modal>
		);
	}

	render(){
		const { page, limit, total, loadingSecurity } = this.props.controllerSecurityPageProps;
		const { security_features } = this.state;
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const { search } = query;

		const columns = [
			{
				title: 'Title',
				dataIndex: 'title'
			},
			{
				title: 'Description',
				dataIndex: 'description'
			},
			{
				title: 'Schedule',
				dataIndex: 'schedule'
			},
			{
				title: 'Sequence',
				dataIndex: 'sequence'
			},
			{
				title: 'Action',
				dataIndex: 'action'
			}
		];

		const data = [];
		// eslint-disable-next-line array-callback-return
		security_features && security_features.length && security_features.map((security_feature) => {
			data.push({
				key: security_feature._id || '',
				title: security_feature.title || '',
				description: security_feature.description || '',
				schedule: <>{security_feature.schedule.join(', ')}<br/>{moment(security_feature.start_at).format('HH:mm')}-{moment(security_feature.end_at).format('HH:mm')}</>,
				sequence: <ol>{security_feature.sequence.map(s => <li>{LabelHelper.securityFeatureAuthenticationMethod(s.authentication_method)}</li>)}</ol>,
				action: (
					<a
						onClick={
							(e) => {
								e.preventDefault();
								this.setState({ modalState: true, securityData: security_feature, sequenceData: security_feature.sequence });
							}
						}
					>Edit</a>
				)
			});
		});

		return (
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span>Security Features</span>
					<div className="component-buttons">
						<span>
							<Button
								type="primary"
								icon={<PlusSquareFilled />}
								onClick={(e) => {
									e.preventDefault();
									this.setState({ modalState: true });
								}}
							> Add a feature</Button>
						</span>
					</div>
				</div>
				<Divider/>
				{
					!loadingSecurity ?
						(
						<>
							<Table
								columns={columns}
								dataSource={data}
								pagination={false}
							/>
							{this.renderSecurityModal()}
							{this.renderSequenceModal()}
							<Pagination
								style={{ marginTop: '30px' }}
								current={page}
								pageSize={limit || 10}
								showSizeChanger
								total={total}
								showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
								pageSizeOptions={['5', '10', '20', '50']}
								onChange={(page, pageSize) => {
									this.getSecurityByLocationId();
								}}
							/>
						</>
						) :
						(
						<>
							<Loading />
						</>
						)
				}
			</div>
		);
	}

}

export default ControllerSecurityPage;