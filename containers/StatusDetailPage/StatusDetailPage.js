import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography, Row, Col, Modal } from 'antd';

import DetailMenu from '../../components/DetailMenu';
import SecurityPage from './StatusDetailPage/ControllerSecurityPage';

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

class LocationDetailPage extends Component{

	componentDidMount(){
		this.getControllerById();
	}

	getControllerById(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && this.props.getControllerById(query.id);
	}

	getLocationComponent(){
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length -3];

		switch(true){
			case(pathname === 'security-features'):
				return <SecurityPage {...this.props} />;
			default:
				// this.props.navigateToListPage();
		}
	}
	
	render(){
		console.log('props', this.props);
		const { controller } = this.props.controllerDetailPageProps;
		const { location, history } = this.props;
		const { query } = UrlParse(location.search, true);

		const sections = [
			{ key: '/status', content: 'Status', link: true, onClick: () => this.props.history.push('/status') },
			{ key: 'Details', content: 'Details', active: true }
		];
		const page_detail_tabs = [
			{ title: 'Security Features', path: `/security-features/id/basic?id=${query.id}` }
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
							>Security Features - { controller && controller.name }
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
					{this.getLocationComponent()}
				</Content>
			</React.Fragment>
		);
	}
}

export default LocationDetailPage;