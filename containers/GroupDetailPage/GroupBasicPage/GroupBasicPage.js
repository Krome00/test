import React, { Component } from 'react';
import { Breadcrumb, Layout, Row, Typography, notification } from 'antd';
import UrlParse from 'url-parse';
import Loading from '../../../components/loading';
import GroupBasicForm from './components/GroupBasicForm';

const { Header, Content } = Layout;
const { Title } = Typography;

class GroupBasicPage extends Component {

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.groupBasicPageProps;
		const { meta } = this.props.groupBasicPageProps;

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
		const { group, loading, loadingSubmit } = this.props.groupBasicPageProps;
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/groups', content: 'Groups', link: true, onClick: () => this.props.navigateToGroupListPage() },
			{ key: 'Create', content: 'Create', active: true }
		];
		return (
			<React.Fragment>
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
							>Create Group</Title>
						</Header>
						<Content style={{ margin: '24px 16px 0' }}>
							<div className="main-content">
								<Row justify="space-around">
									<GroupBasicForm
										group={group}
										loadingSubmit={loadingSubmit}
										onSubmit={this.props.onSubmit}
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
							{!loading && (
								<GroupBasicForm
									group={group}
									loadingSubmit={loadingSubmit}
									onSubmit={this.props.onSubmit}
									onSuspend={this.props.suspendGroupById}
									onUnsuspend={this.props.unsuspendGroupById}
								/>
							)}
						</Row>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default GroupBasicPage;