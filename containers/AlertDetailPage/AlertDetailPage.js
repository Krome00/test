import React, { Component } from 'react';
import { 
	Row, 
	Col, 
	Layout, 
	Breadcrumb, 
	Typography, 
	Form, 
	Input,
	Divider,
	Button,
	Table,
	notification
} from 'antd';
import UrlParse from 'url-parse';
import moment from 'moment';
import _ from 'lodash';

import Loading from '../../components/loading';
import LabelHelper from '../../helpers/Label';
import LocalStorageHelper from '../../helpers/local_storage';

const { Header, Content } = Layout;
const { Title } = Typography;

class AlertDetailPage extends Component {

	componentDidMount() {
		this.getAlertDetails();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.alertDetailPageProps;
		const { meta } = this.props.alertDetailPageProps;
		if(meta !== prevMeta){
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
		}
	}

	getAlertDetails() {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && query.id && this.props.getAlertById(query.id);
	}

	renderForm() {
		const { alert, alert_admins, loadingSubmit, current_alert_admin } = this.props.alertDetailPageProps || {};
		const { 
			name: alert_name, 
			location_id: location, 
			door_id: door, 
			alert_type_id: alert_type, 
			alerted_at, 
			description,
			_id
		} = alert || {};
		const { name: location_name } = location || {};
		const { name: door_name } = door || {};
		const { name: alert_type_name } = alert_type || {};
		const descriptionString = `
			Location: ${location_name}
			Door: ${door_name}
			Time: ${moment(new Date(alerted_at)).format('MMMM Do YYYY, h:mm:ss a')}

			${description || ''}
		`;

		const { status } = current_alert_admin;

		return(
			<Form
				layout="vertical"
				initialValues={{ 
					alert_name,
					alert_type_name,
					description: descriptionString
				}}
				style={{ width: 400 }}
				onFinish={() => this.props.acknowledgeAlertById(_id)}
			>
				<Form.Item
					name="alert_name"
					label="Alert Name"
				>
					<Input disabled={true}/>
				</Form.Item>
				<Form.Item
					name="alert_type_name"
					label="Alert Type"
				>
					<Input disabled={true}/>
				</Form.Item>
				<Form.Item
					name="description"
					label="Description"
				>
					<Input.TextArea 
						disabled={true}
						rows={7}
						
					/>
				</Form.Item>
				<Form.Item
					status="status"
					label="Status"
				>
					<Input 
						disabled={true}
						value={LabelHelper.alert_status(status)}
				 />
				</Form.Item>
				<Form.Item
					style={{ display: status === 'notified' ? 'block' : 'none' }}
				>
					<Button
						style={{ float: 'right' }}
						size="middle"
						type="primary"
						htmlType="submit"
						loading={loadingSubmit}
					>Acknowledge</Button>
				</Form.Item>
			</Form>
		);

	}

	renderHeader() {
		const { alert } = this.props.alertDetailPageProps || {};
		const sections = [
			{ key: '/alerts', content: 'Alerts', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Details', content: 'Details', active: true }
		];
		
		return(
			<Header className="breadcrumb-header">
				<Row>
					<Col span={21}>
						<Breadcrumb>
							{sections && sections.map(section => {
								return (
									<Breadcrumb.Item key={section.key}>
										{section.link ? 
											// eslint-disable-next-line jsx-a11y/anchor-is-valid
											<a
												href="#"
												onClick={section.onClick}
											>{section.content}</a> : section.content}
									</Breadcrumb.Item>
								);
							})}
						</Breadcrumb>
						<Title
							level={5}
							style={{ paddingTop: 10 }}
						>
								Alert Detail - {alert.name}
						</Title>
					</Col>
				</Row>
			</Header>
		);
	}

	renderTable() {
		const { alert_admins } = this.props.alertDetailPageProps || {};
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Time Acknowledged',
				dataIndex: 'acknowledge_time',
				key: 'acknowledge_time'
			}
		];
		const data = [];
		alert_admins && alert_admins.length && alert_admins.map(alert_admin => {
			const { admin_id: admin, acknowledge_time, _id } = alert_admin;
			const { name } = admin;
			data.push({
				name,
				acknowledge_time: acknowledge_time ? moment(new Date(acknowledge_time)).format('MMMM Do YYYY, h:mm:ss a') : '',
				key: _id
			});
		});
		
		return(
			<Table
				pagination={false}
				dataSource={data}
				columns={columns}
			/>
		)
	}

	renderAlertDetails() {
		const { loading } = this.props.alertDetailPageProps || {};
		return(
			<Col 
				span={13} 
				flex="vertical"
			>
				<div className="main-content">
					Alert Details
					<Divider />
					<Row justify="space-around">
						{ loading && <Loading /> }
						{ !loading && this.renderForm() }
					</Row>
				</div>
			</Col>
		);
	}

	renderAlertAdminDetails() {
		return(
			<Col span={11} >
				<div className="main-content">
					List of Administrator
					<Divider />
					{this.renderTable()}
				</div>
			</Col>
		);
	}

	renderContent() {
		return(
			<Content style={{ margin: '24px 16px 0' }}>
				<Row 
					gutter={16} 
				>
					{this.renderAlertDetails()}
					{this.renderAlertAdminDetails()}
				</Row>
			</Content>
		);
	}

	render(){

		return (
			<React.Fragment>
				{this.renderHeader()}
				{this.renderContent()}
			</React.Fragment>
		);
	}
};

export default AlertDetailPage;