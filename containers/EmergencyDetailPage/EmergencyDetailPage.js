import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography, Row, Col, Button, Modal, notification } from 'antd';

import DetailMenu from '../../components/DetailMenu';
import EmergencyBasicPage from './EmergencyBasicPage';


const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

class EmergencyDetailPage extends Component {

	componentDidMount(){
		this.getEmergencyById();
	}

	getEmergencyById(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && this.props.getEmergencyById(query.id);
	}

	getEmergencyComponent(){
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length -1];

		switch(true){
			case(pathname === 'basic'):
				return <EmergencyBasicPage {...this.props} />;
			default:
				this.props.navigateToListPage();
		}
	}

	render(){
		const { emergency } = this.props.emergencyDetailPageProps && this.props.emergencyDetailPageProps;
		const { name } = emergency || '';
		const { location, history } = this.props;
		const { query } = UrlParse(location.search, true);

		const sections = [
			{ key: '/emergencies', content: 'Emergencies', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Details', content: 'Details', active: true }
		];

		const page_detail_tabs = [
			{ title: 'Basic', path: `/emergencyes/id/basic?id=${query.id}` }
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
							>Emergency Detail - { emergency && name }
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
					{this.getEmergencyComponent()}
				</Content>
			</React.Fragment>
		);
	}
}

export default EmergencyDetailPage;