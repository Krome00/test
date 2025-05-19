import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography } from 'antd';
import Loading from '../../components/loading';
import DetailMenu from '../../components/DetailMenu';
import SystemMessageBasicPage from './SystemMessageBasicPage';

const { Header, Content } = Layout;
const { Title } = Typography;

class SystemMessageDetailPage extends Component {

	componentDidMount() {
		this.getSystemMessageById();
	}

	componentWillUnmount() {
		this.props.resetDetailPage();
	}

	getSystemMessageById() {
		const { location } = this.props;
		const  { query } = UrlParse(location.search, true);

		query && query.id && this.props.getSystemMessageById(query.id);
	}

	getSystemMessageDetailComponent = () => {
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch(true){
			case (pathname === 'basic'):
				return <SystemMessageBasicPage {...this.props} />;
			default:
				return this.props.navigateToListPage();
		}
	}

	render() {

		const { history, location } = this.props;
		const { loading, system_message, loadingSubmit } = this.props.systemMessageDetailPageProps;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/system-messages', content: 'System Messages', link: true, onClick: () => this.props.navigateToListPage() },
			{ key: 'Details', content: 'Details', active: true }
		];

		const page_detail_tabs = [
			{ title: 'Basic', path: `/system-messages/id/basic?id=${query.id}` }
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
					>
						{system_message && system_message.title}
					</Title>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					<DetailMenu 
						// group={group}
						tabs={page_detail_tabs}
						location={location}
						history={history}
					/>
					{this.getSystemMessageDetailComponent()}
				</Content>
			</React.Fragment>
		)
	}
};

export default SystemMessageDetailPage;
