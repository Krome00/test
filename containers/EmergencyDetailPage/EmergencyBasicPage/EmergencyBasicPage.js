import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Row, Breadcrumb, Typography, Layout, notification } from 'antd';

import EmergencyBasicForm from './components/EmergencyBasicForm';

const { Header, Content } = Layout;
const { Title } = Typography;

class EmergencyBasicPage extends Component {

	componentDidMount(){
		this.props.getEmergencyDoorList();
		this.props.getEmergencyLocationList();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.emergencyDetailPageProps;
		const { meta } = this.props.emergencyDetailPageProps;
		if(meta && meta !== prevMeta){
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
		}
	}

	componentWillUnmount(){
		this.props.resetDetailPage();
	}

	onSubmit = (values) => {
		this.props.onSubmit(values);
	}


	createForm(settings){
		const { sections } = settings;
		const { doors, locations, loadingSubmit } = this.props.emergencyDetailPageProps && this.props.emergencyDetailPageProps;
		return(
			<React.Fragment>
				<Header 
					className="breadcrumb-header"
				>
					<Breadcrumb>
						{sections && sections.map( section => {
							return (
								<Breadcrumb.Item key={section.key}>
									{section.link ? 
									// eslint-disable-next-line jsx-a11y/anchor-is-valid
										<a
											href="#"
											onClick={section.onClick}
										>{section.content} </a> : section.content}
								</Breadcrumb.Item>
							);
						}) }
					</Breadcrumb>
					<Title
						level={5}
						style={{ paddingTop: 10 }}
					> Create Emergency </Title>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					<div className="main-content">
						<Row justify="space-around">
							<EmergencyBasicForm 
								loadingSubmit={loadingSubmit}
								create={true}
								doors={doors}
								locations={locations}
								onSubmit={this.onSubmit}
							/>
						</Row>
					</div>
				</Content>
			</React.Fragment>
		);
	}

	updateForm(){
		const { emergency, locations, doors, loadingSubmit } = this.props.emergencyDetailPageProps && this.props.emergencyDetailPageProps;
		const { location_ids, door_ids } = emergency || [];
		const suspend_item_type = location_ids ? 'location' : door_ids ? 'door' : '';
		return(
			<div className="main-content">
				<Row justify="space-around">
					{
						emergency && emergency.name &&
						<EmergencyBasicForm
							suspend_item_type={suspend_item_type}
							loadingSubmit={loadingSubmit}
							emergency={emergency}
							locations={locations}
							doors={doors}
							create={false}
							onSubmit={this.onSubmit}
							onDelete={this.props.deleteEmergencyById}
							onSuspend={this.props.suspendEmergencyById}
							onUnsuspend={this.props.unsuspendEmergencyById}
						/>
					}
				</Row>
			</div>
		);
	}

	render(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/emergencies', content: 'Emergencies', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Create', content: 'Create', active: true }
		];
		const settings = {
			sections,
			location,
			query
		};
		return(
			<React.Fragment>
				{ query && query.id && this.updateForm() }
				{ !query.id && this.createForm(settings) } 
			</React.Fragment>
		);
	}
};

export default EmergencyBasicPage;