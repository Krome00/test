import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Row, Col, Layout, Typography, Breadcrumb } from 'antd';

import DetailMenu from '../../components/DetailMenu';
import DepartmentBasicPage from './DepartmentBasicPage';

const { Header, Content } = Layout;
const { Title } = Typography;

class DepartmentDetailPage extends Component {

	componentDidMount() {
		this.getDepartmentById();
	}

	getDepartmentById() {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query && this.props.getDepartmentById(query.id);
	}

	getDepartmentComponent() {
		const path = this.props.location.pathname.split('/');
		const pathname = path[path.length - 1];

		switch(true) {
			case(pathname === 'basic'):
				return <DepartmentBasicPage { ...this.props } />;
			default: 
				this.props.navigateToListPage();
		}
	}
	

	render(){
		const { department } = this.props.departmentDetailPageProps && this.props.departmentDetailPageProps;
		const { name } = department || {};
		const { location, history } = this.props;
		const { query } = UrlParse(location.search, true);


		const sections = [
			{ key: '/Departments', content: 'Departments', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Details', content: 'Details', active: true }
		];

		const page_detail_tabs = [
			{ title: 'Basic', path: `/departments/id/basic?id=${query.id}` }
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
							>Department Detail - { department && name }
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
					{this.getDepartmentComponent()}
				</Content>
			</React.Fragment>
		);
	};
}

export default DepartmentDetailPage;