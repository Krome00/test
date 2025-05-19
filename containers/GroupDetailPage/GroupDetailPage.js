import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography } from 'antd';
import DetailMenu from '../../components/DetailMenu';
import GroupBasicPage from './GroupBasicPage';
import GroupMembersPage from './GroupMemberPage';

const { Header, Content } = Layout;
const { Title } = Typography;

class GroupDetailPage extends Component {

	componentDidMount() {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		query.id && this.getGroupById();
	}

	componentWillUnmount(){
		this.props.resetPage();
	}

	componentDidUpdate(prevProps){
		const { meta: prevMeta, group: prevGroup } = prevProps.groupDetailPageProps;
		const { meta, group } = this.props.groupDetailPageProps;

		if( prevGroup !== group ) {
			this.setState({
				...this.state,
				group
			});
		}
	}

	getGroupById = () => {
		const { query } = UrlParse(this.props.location.search, true);
		this.props.getGroupById(query.id);
	}

	getGroupDetailComponent = () => {
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];
		switch(true){
			case (pathname === 'basic'):
				return <GroupBasicPage {...this.props} />;
			case (pathname === 'group-members'):
				return <GroupMembersPage {...this.props} />;
			default:
				return this.props.navigateToGroupListPage();
		}
	}

	render() {
		
		const { history, location } = this.props;
		const { group } = this.props.groupDetailPageProps;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/groups', content: 'Groups', link: true, onClick: () => this.props.navigateToGroupListPage() },
			{ key: '/group-members', content: 'Group Members', link: true, onClick: () => console.log('test fucking') },
			{ key: 'Details', content: 'Details', active: true }
		];

		const page_detail_tabs = [
			{ title: 'Basic', path: `/groups/id/basic?id=${query.id}` },
			{ title: 'Group Members', path: `/groups/id/group-members?id=${query.id}` }
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
					>{group && group.name}
					</Title>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					<DetailMenu 
						group={group}
						tabs={page_detail_tabs}
						location={location}
						history={history}
					/>
					{this.getGroupDetailComponent()}
				</Content>
			</React.Fragment>
		);
	}
}

export default GroupDetailPage;