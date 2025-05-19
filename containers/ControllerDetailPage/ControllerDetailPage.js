import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography } from 'antd';

import DetailMenu from '../../components/DetailMenu';
import ControllerBasicPage from './ControllerBasicPage';
import ControllerConfigurationPage from './ControllerConfigurationPage';

const { Header, Content } = Layout;
const { Title } = Typography;

class ControllerDetailPage extends Component {

	componentDidMount() {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		query.id && this.getControllerById();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta, controller: prevController } = prevProps.controllerDetailPageProps;
		const { meta, controller } = this.props.controllerDetailPageProps;

		if( prevController !== controller ) {
			this.setState({
				...this.state,
				controller
			});
		}
	}

	getControllerById = () => {
		const { query } = UrlParse(this.props.location.search, true);
		this.props.getControllerById(query.id);
	}

	getControllerDetailComponent = () => {
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch(true){
			case (pathname === 'basic'):
				return <ControllerBasicPage {...this.props} />;
			case (pathname === 'configuration'):
				return <ControllerConfigurationPage {...this.props} />;
			default:
				return this.props.navigateToControllerListPage();
		}
	}

	render() {
		
		const { history, location } = this.props;
		const { controller } = this.props.controllerDetailPageProps;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/controllers', content: 'Controllers', link: true, onClick: () => this.props.navigateToControllerListPage() },
			{ key: 'Details', content: 'Details', active: true }
		];

		const page_detail_tabs = [
			{ title: 'Basic', path: `/controllers/basic?id=${query.id}` },
			{ title: 'Configuration', path: `/controllers/configuration?id=${query.id}` }
		];
		
		return (
			<React.Fragment>
				<Header className="breadcrumb-header">
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
					>{controller && controller.name}
					</Title>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					<DetailMenu 
						tabs={page_detail_tabs}
						location={location}
						history={history}
					/>
					{this.getControllerDetailComponent()}
				</Content>
			</React.Fragment>
		);
	}
}

export default ControllerDetailPage;