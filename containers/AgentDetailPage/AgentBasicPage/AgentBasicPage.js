import React, { Component } from 'react';
import { notification, Typography, Breadcrumb, Layout, Row } from 'antd';
import UrlParse from 'url-parse';
import doors from '../../../helpers/api/doors';
import AgentBasicForm from './components/AgentBasicForm';

const { Title } = Typography;
const { Header, Content } = Layout;

class AgentBasicPage extends Component {

	componentDidMount() {
		this.props.getDoors();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.agentDetailPageProps;
		const { meta } = this.props.agentDetailPageProps;
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
		const { loadingSubmit, doors, agent } = this.props.agentDetailPageProps && this.props.agentDetailPageProps;
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
					> Create Agent </Title>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					<div className="main-content">
						<Row justify="space-around">
							<AgentBasicForm 
								agent={agent}
								doors={doors}
								create={true}
								loadingSubmit={loadingSubmit}
								onSubmit={this.props.onSubmit}
							/>
						</Row>
					</div>
				</Content>
			</React.Fragment>
		);
	}

	updateForm(){
		const { agent, loadingSubmit, doors  } = this.props.agentDetailPageProps && this.props.agentDetailPageProps;

		return(
			<div className="main-content">
				<Row justify="space-around">
					{
						agent && agent.name &&
						<AgentBasicForm
                        	agent={agent}
							doors={doors}
                        	loadingSubmit={loadingSubmit}
                        	create={false}
                        	onSubmit={this.props.onSubmit}
                        	onSuspend={this.props.suspendAgentById}
                        	onUnsuspend={this.props.unsuspendAgentById}
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
			{ key: '/agents', content: 'Agents', link: true, onClick: this.props.navigateToListPage },
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
}

export default AgentBasicPage;