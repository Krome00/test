import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography, Row, Col, Button, Modal, notification } from 'antd';

import DetailMenu from '../../components/DetailMenu';
import EntityBasicPage from './EntityBasicPage';
import EntityAccessRightsByGroupPage from './EntityAccessRightsByGroupPage';
import EntityUserPage from './EntityUserPage';

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

class EntityDetailPage extends Component {

	componentDidMount(){
		this.getEntityById();
		this.props.getEntityLocationList();
	};

	getEntityById(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && this.props.getEntityById({ entity_id: query.id });
	}

	getEntityComponent(){
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length -1];

		switch(true){
			case(pathname === 'basic'):
				return <EntityBasicPage {...this.props} />;
			case(pathname === 'access-rights-group'):
				return <EntityAccessRightsByGroupPage {...this.props} />;
			case(pathname === 'users'):
				return <EntityUserPage {...this.props} />;
			default:
				this.props.navigateToListPage();
		}
	}

	render() {
		const { entity } = this.props.entityDetailPageProps && this.props.entityDetailPageProps;
		const { location, history } = this.props;
		const { query } = UrlParse(location.search, true);

		const sections = [
			{ key: '/entities', content: 'Entities', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Details', content: 'Details', active: true }
		];
		const page_detail_tabs = [
			{ title: 'Basic', path: `/entities/id/basic?id=${query.id}` },
			{ title: 'Users', path: `/entities/id/users?id=${query.id}` },
			{ title: 'Access Rights (Entity)', path: `/entities/id/access-rights-group?id=${query.id}` }
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
							>Entity Detail - { entity && entity.name }
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
					{this.getEntityComponent()}
				</Content>
			</React.Fragment>
		);
	}
};

export default EntityDetailPage;