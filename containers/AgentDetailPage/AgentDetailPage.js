import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography, Row, Col, Button, Modal, notification } from 'antd';

import DetailMenu from '../../components/DetailMenu';
import AgentBasicPage from './AgentBasicPage';
// import AgentDepartmentPage from './AgentDepartmentPage';
// import AdminUpdatePasswordPage from './AdminUpdatePasswordPage';

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

class AgentDetailPage extends Component {

	componentDidMount(){
		this.getAgentById();
	};

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.agentDetailPageProps;
		const { meta } = this.props.agentDetailPageProps;

		if( prevMeta !== meta ) {
			this.setState({
				...this.state,
				meta
			});
		}
	}
	getAgentById(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		query && this.props.getAgentById(query.id);
	}

	getAgentComponent(){
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length -1];

		switch(true){
			case(pathname === 'basic'):
				return <AgentBasicPage {...this.props} />;
				// case(pathname === 'admin-roles'):
				//  return <AgentDepartmentPage {...this.props} />;
				// case(pathname === 'update-password'):
				//  return <AdminUpdatePasswordPage {...this.props} />;
			default:
				this.props.navigateToListPage();
		}
	}

	render() {
        
		const { agent } = this.props.agentDetailPageProps && this.props.agentDetailPageProps;
		const { name } = agent || '';
		const { location, history } = this.props;
		const { query } = UrlParse(location.search, true);

		const sections = [
			{ key: '/agents', content: 'Agents', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Details', content: 'Details', active: true }
		];
		const page_detail_tabs = [
			{ title: 'Basic', path: `/agents/id/basic?id=${query.id}` }
			// { title: 'Administrated Departments', path: `/admins/id/admin-roles?id=${query.id}` }
			// { title: 'Update Password', path: `/admins/id/update-password?id=${query.id}` }
		];

		return(
			<React.Fragment>
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
							>Agent Detail - { agent && name }
							</Title>
						</Col>
					</Row>
                        
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					<DetailMenu
						tabs={page_detail_tabs}
						location={location}
						history={history}
					/>
					{this.getAgentComponent()}
				</Content>
			</React.Fragment>
		);
	}
};

export default AgentDetailPage;