import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography, Row, Col, Modal } from 'antd';

import DetailMenu from '../../components/DetailMenu';
import LocationBasicPage from './LocationBasicPage';
import LocationAccessRightsByGroupPage from './LocationAccessRightsByGroupPage';
import LocationAccessRightsUserPage from './LocationAccessRightsUserPage';
import LocationAccessRightsOneOffPage from './LocationAccessRightsOneOffPage';
import LocationDoorPage from './LocationDoorPage';
import LocationAdminRolesPage from './LocationAdminRolesPage';
import LocationReportPage from './LocationReportPage';

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

class LocationDetailPage extends Component{

	componentDidMount(){
		this.getLocationById();
		this.props.getLocationEntities();
	}

	getLocationById(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && this.props.getLocationById(query.id);
	}

	getLocationComponent(){
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length -1];

		switch(true){
			case(pathname === 'basic'):
				return <LocationBasicPage {...this.props} />;
			case(pathname === 'access_rights_group'):
				return <LocationAccessRightsByGroupPage {...this.props} />;
			case(pathname === 'access-rights-users'):
				return <LocationAccessRightsUserPage {...this.props} />;
			case(pathname === 'access-rights-one-offs'):
				return <LocationAccessRightsOneOffPage {...this.props} />;
			case(pathname === 'doors'):
				return <LocationDoorPage {...this.props} />;
			case(pathname === 'administrators'):
				return <LocationAdminRolesPage {...this.props} />;
			case(pathname === 'reports'):
				return <LocationReportPage {...this.props} />;
			default:
				this.props.navigateToListPage();
		}
	}
	
	render(){
		const { location } = this.props.locationDetailPageProps && this.props.locationDetailPageProps;
		const { location: locationMeta , history } = this.props;
		const { query } = UrlParse(locationMeta.search, true);

		const sections = [
			{ key: '/locations', content: 'Locations', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Details', content: 'Details', active: true }
		];
		const page_detail_tabs = [
			{ title: 'Basic', path: `/locations/id/basic?id=${query.id}` },
			{ title: 'Access Rights by Group', path: `/locations/id/access_rights_group?id=${query.id}` },
			{ title: 'Access Rights by User', path: `/locations/id/access-rights-users?id=${query.id}` },
			{ title: 'Access Rights (One Off)', path: `/locations/id/access-rights-one-offs?id=${query.id}` },
			{ title: 'Doors', path: `/locations/id/doors?id=${query.id}` },
			{ title: 'Report', path: `/locations/id/reports?id=${query.id}` },
			{ title: 'Administrator', path: `/locations/id/administrators?id=${query.id}` }
			// { title: 'Alert Trigger', path: `#?id=${query.id}` }
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
							>Location Detail - { location && location.name }
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