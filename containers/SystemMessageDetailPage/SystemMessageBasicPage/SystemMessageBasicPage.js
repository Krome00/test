import React, { Component } from 'react';
import { Row, notification, Breadcrumb, Layout, Typography } from 'antd';
import UrlParse from 'url-parse';

import Loading from '../../../components/loading';
import SystemMessageBasicForm from './SystemMessageBasicForm/SystemMessageBasicForm';

const { Header, Content } = Layout;
const { Title } = Typography;

class SystemMessageBasicPage extends Component {

	componentDidMount() {
		this.props.getDoorsByDepartmentId();
		this.props.getLocationsByDepartmentId();
	}
	
	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.systemMessageBasicPageProps;
		const { meta } = this.props.systemMessageBasicPageProps;

		if(meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});

			this.props.resetMeta();
		}
	}

	render() {
		const { locations, doors, loading, system_message, loadingSubmit } = this.props.systemMessageBasicPageProps || {};
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/controllers', content: 'Controllers', link: true, onClick: () => this.props.navigateToListPage() },
			{ key: 'Create', content: 'Create', active: true }
		];
		return (
			<>
				{!query.id && (
					<React.Fragment>
						<Header 
							className="breadcrumb-header"
						>
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
							>Create System Message</Title>
						</Header>
						<Content style={{ margin: '24px 16px 0' }}>
							<div className="main-content">
								<Row justify="space-around">
									<SystemMessageBasicForm
										loadingSubmit={loadingSubmit}
										onSubmit={this.props.onSubmit}
										locations={locations}
										doors={doors}
									/>
								</Row>
							</div>
						</Content>
					</React.Fragment>
				)}
				{query.id && (
					<div className="main-content">
						<Row justify="space-around">
							{
								loading && <Loading />
							}
							{!loading && system_message && (
								<SystemMessageBasicForm
									locations={locations}
									system_message={system_message}
									loadingSubmit={loadingSubmit}
									onSubmit={this.props.onSubmit}
									doors={doors}
								/>
							)}
						</Row>
					</div>
				)}
			</>
		);
	}
};

export default SystemMessageBasicPage;
