import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography } from 'antd';
import DetailMenu from '../../components/DetailMenu';
import LabelHelper from '../../helpers/Label';
import UserBasicPage from './UserBasicPage';
import UserAuthsPage from './UserAuthsPage';
import UserPermissionHistoryPage from './UserPermissionHistoryPage';
import UserAccessRightsPage from './UserAccessRightsPage';


const { Header, Content } = Layout;
const { Title } = Typography;

class UserDetailPage extends Component {

	componentDidMount() {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		query.id && this.getUserById();
	}

	componentWillUnmount(){
		this.props.resetPage();
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta, user: prevUser } = prevProps.userDetailPageProps;
		const { meta, user } = this.props.userDetailPageProps;

		if( prevUser !== user ) {
			this.setState({
				...this.state,
				user
			});
		}
	}

	getUserById = () => {
		const { query } = UrlParse(this.props.location.search, true);
		this.props.getUserById(query.id);
	}

	getUserDetailComponent = () => {
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];

		switch(true){
			case (pathname === 'basic'):
				return <UserBasicPage {...this.props} />;
			case (pathname === 'auths'):
				return <UserAuthsPage {...this.props} />;
			case (pathname === 'permission-histories'):
				return <UserPermissionHistoryPage {...this.props} />;
			case (pathname === 'access-rights'):
				return <UserAccessRightsPage {...this.props} />;
			case (pathname === 'message'):
				return <UserAuthsPage {...this.props} />;
			default:
				return this.props.navigateToUserListPage();
		}
	}

	render() {
		const { history, location } = this.props;
		const { user } = this.props.userDetailPageProps && this.props.userDetailPageProps;
		const { query } = UrlParse(location.search, true);

		let type = user ? user.type : '';

		let sections;
		user && ( sections = [
			{ key: '/users', content: `${LabelHelper.user_type(type)} Users`, link: true, onClick: () => this.props.navigateToUserListPage({ state: type }) },
			{ key: 'Details', content: 'Details', active: true }
		]);

		const page_detail_tabs = [
			{ title: 'Basic', path: `/users/id/basic?id=${query.id}` },
			{ title: 'Custom Authentication', path: `/users/id/auths?id=${query.id}` },
			{ title: 'Permission History', path: `/users/id/permission-histories?id=${query.id}` },
			{ title: 'Access Rights', path: `/users/id/access-rights?id=${query.id}` }
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
					>{LabelHelper.user_type(type)} User Detail - {user && user.name}
					</Title>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					{page_detail_tabs && (
						<DetailMenu
							tabs={page_detail_tabs}
							location={location}
							history={history}
						/>
					)
					}
					{this.getUserDetailComponent()}
				</Content>
			</React.Fragment>
		);
	}
}

export default UserDetailPage;