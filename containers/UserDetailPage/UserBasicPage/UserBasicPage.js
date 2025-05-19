import React, { Component } from 'react';
import { Breadcrumb, Layout, Row, Typography, notification } from 'antd';
import UrlParse from 'url-parse';
import Loading from '../../../components/loading';
import LabelHelper from '../../../helpers/Label';
import UserBasicForm from './components/UserBasicForm';

const { Header, Content } = Layout;
const { Title } = Typography;

class UserBasicPage extends Component {

	componentDidMount(){
		this.props.getGroups();
		this.props.getDoors();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.userBasicPageProps;
		const { meta } = this.props.userBasicPageProps;

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
		const { user, groups, loadingGroups, loading, loadingSubmit, qrcode } = this.props.userBasicPageProps;
		const { location } = this.props;
		const { state: user_type } = location;
		const { query } = UrlParse(location.search, true);

		let type = user ? user.type : '';
		let sections;

		user || (sections = [
			{ key: '/users', content: 'Users', link: true, onClick: () => this.props.navigateToUserListPage({ state: user_type }) },
			{ key: 'Create', content: 'Create', active: true }
		]);

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
							>Create {LabelHelper.user_type(user_type)} User</Title>
						</Header>
						<Content style={{ margin: '24px 16px 0' }}>
							<div className="main-content">
								<Row justify="space-around">
									<UserBasicForm
										user={user}
										type={user_type}
										groups={groups}
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
								loading && loadingGroups && <Loading />
							}
							{!loading && !loadingGroups && (
								<UserBasicForm
									user={user}
									type={type}
									groups={groups}
									deleteUserById = {this.props.deleteUserById}
									loadingSubmit={loadingSubmit}
									onSubmit={this.props.onSubmit}
									onSuspend={this.props.suspendUserById}
									onUnsuspend={this.props.unsuspendSuspensionByUserId}
								/>
							)}
						</Row>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default UserBasicPage;