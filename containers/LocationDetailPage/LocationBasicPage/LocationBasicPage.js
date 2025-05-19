import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { notification, Breadcrumb, Layout, Typography, Row } from 'antd';

import LocationBasicForm from './components/LocationBasicForm';

const { Header, Content } = Layout;
const { Title } = Typography;

class LocationBasicPage extends Component {

	componentDidMount(){
		this.props.getLocationEntities();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.locationDetailPageProps;
		const { meta } = this.props.locationDetailPageProps;
		if(meta !== prevMeta){
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
		}
	}
	
	createForm(settings){
		const { sections } = settings;
		const { entities } = this.props.locationDetailPageProps || {};
		
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
					> Create Location </Title>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					<div className="main-content">
						<Row justify="space-around">
							<LocationBasicForm
								onSubmit={this.props.onSubmit}
								entities={entities}
								create={true}
							/>
						</Row>
					</div>
				</Content>
			</React.Fragment>
		);
	}

	updateForm(){
		const { location, entities } = this.props.locationDetailPageProps && this.props.locationDetailPageProps;
		return(
			<div className="main-content">
				<Row justify="space-around">
					{
						location && location.name &&
						<LocationBasicForm
							location={location}
							entities={entities}
							create={false}
							onSubmit={this.props.onSubmit}
							onDelete={this.props.deleteLocationById}
							onSuspend={this.props.suspendLocationById}
							onUnsuspend={this.props.unsuspendLocationById}
						/>
					}
				</Row>
			</div>
		);
	}

	render(){
		const { location: locationMeta } = this.props;
		const { query } = UrlParse(locationMeta.search, true);
		const sections = [
			{ key: '/locations', content: 'Locations', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Create', content: 'Create', active: true }
		];
		const settings = {
			sections,
			locationMeta,
			query
		};

		return(
			<React.Fragment>
				{ query && query.id && this.updateForm() }
				{ !query.id && this.createForm(settings)} 
			</React.Fragment>
		);
	}
}

export default LocationBasicPage;