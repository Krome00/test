import React, { Component } from 'react';
import { Form, Breadcrumb, Layout, Typography, Row, notification } from 'antd';
import UrlParse from 'url-parse';

import EntityBasicForm from './components/EntityBasicForm';

const { Header, Content } = Layout;
const { Title } = Typography;

class EntityBasicPage extends Component {

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.entityDetailPageProps;
		const { meta } = this.props.entityDetailPageProps;
		if(meta !== prevMeta){
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
		}
	}

	onDelete = id => {
		this.props.deleteEntityById(id);
	}
	
	onSubmit = values => {
		const { name, type, description } = values;
		
		const fields = {
			name,
			type, 
			description
		};
		
		this.props.onSubmit(fields);
	}

	createForm(settings){
		const { sections } = settings;

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
					> Create Entity </Title>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					<div className="main-content">
						<Row justify="space-around">
							<EntityBasicForm 
								create={true}
								onSubmit={this.onSubmit}
							/>
						</Row>
					</div>
				</Content>
			</React.Fragment>
		);
	}

	updateForm(){
		const { entity } = this.props.entityDetailPageProps && this.props.entityDetailPageProps;

		return(
			<div className="main-content">
				<Row justify="space-around">
					{
						entity && entity.name &&
						<EntityBasicForm
							entity={entity}
							create={false}
							onSubmit={this.onSubmit}
							onDelete={this.props.deleteEntityById}
							onSuspend={this.props.suspendEntityById}
							onUnsuspend={this.props.unsuspendEntityById}
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
			{ key: '/entities', content: 'Entities', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Create', content: 'Create', active: true }
		];
		const settings = {
			sections,
			location,
			query
		};


		return(
			<React.Fragment>
				{ query && query.id && this.updateForm()}
				{ !query.id && this.createForm(settings)}
			</React.Fragment>
		);
	};
};

export default EntityBasicPage;