import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Layout, Breadcrumb, Typography, Row, Col, Button, Modal, notification } from 'antd';

import DetailMenu from '../../components/DetailMenu';
import AdminBasicPage from './AdminBasicPage';
import AdminDepartmentPage from './AdminDepartmentPage';
import AdminUpdatePasswordPage from './AdminUpdatePasswordPage';

const { confirm } = Modal;
const { Header, Content } = Layout;
const { Title } = Typography;

class AdminDetailPage extends Component {

	componentDidMount(){
		this.getAdminById();
	};

	getAdminById(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && this.props.getAdminById(query.id);
	}

	getAdminComponent(){
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length -1];

		switch(true){
			case(pathname === 'basic'):
				return <AdminBasicPage {...this.props} />;
			case(pathname === 'admin-roles'):
				return <AdminDepartmentPage {...this.props} />;
			// case(pathname === 'update-password'):
			// 	return <AdminUpdatePasswordPage {...this.props} />;
			default:
				this.props.navigateToListPage();
		}
	}

	render() {
		const { admin } = this.props.adminDetailPageProps && this.props.adminDetailPageProps;
		const { name } = admin || '';
		const { location, history } = this.props;
		const { query } = UrlParse(location.search, true);

		const sections = [
			{ key: '/admins', content: 'Admins', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Details', content: 'Details', active: true }
		];
		const page_detail_tabs = [
			{ title: 'Basic', path: `/admins/id/basic?id=${query.id}` }
			// { title: 'Administrated Departments', path: `/admins/id/admin-roles?id=${query.id}` }
			// { title: 'Update Password', path: `/admins/id/update-password?id=${query.id}` }
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
							>Administrator Detail - { admin && name }
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
					{this.getAdminComponent()}
				</Content>
			</React.Fragment>
		);
	}
};

export default AdminDetailPage;