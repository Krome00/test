import React, { Component } from 'react';
import { notification, Typography, Breadcrumb, Layout, Row } from 'antd';
import UrlParse from 'url-parse';
import AdminBasicForm from './components/AdminBasicForm';

const { Title } = Typography;
const { Header, Content } = Layout;

class AdminBasicPage extends Component {

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.adminDetailPageProps;
		const { meta } = this.props.adminDetailPageProps;
		if(meta !== prevMeta){
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
		}
	}

	createForm(settings){
		const { sections } = settings;
		const { loadingSubmit } = this.props.adminDetailPageProps && this.props.adminDetailPageProps;
		return(
			<React.Fragment>
				<Header 
					className="breadcrumb-header"
				>
					<Breadcrumb>
						{sections && sections.map( section => {
							return (
								<Breadcrumb.Item key={section.key}>
									{section.link ? 
									// eslint-disable-next-line jsx-a11y/anchor-is-valid
										<a
											href="#"
											onClick={section.onClick}
										>{section.content} </a> : section.content}
								</Breadcrumb.Item>
							);
						}) }
					</Breadcrumb>
					<Title
						level={5}
						style={{ paddingTop: 10 }}
					> Create Admin </Title>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					<div className="main-content">
						<Row justify="space-around">
							<AdminBasicForm 
								create={true}
								loadingSubmit={loadingSubmit}
								onSubmit={this.props.onSubmit}
							/>
						</Row>
					</div>
				</Content>
			</React.Fragment>
		);
	}

	updateForm(){
		const { admin, loadingSubmit } = this.props.adminDetailPageProps && this.props.adminDetailPageProps;

		return(
			<div className="main-content">
				<Row justify="space-around">
					{
						admin && admin.name &&
						<AdminBasicForm
							admin={admin}
							loadingSubmit={loadingSubmit}
							create={false}
							onSubmit={this.props.onSubmit}
							onSuspend={this.props.suspendAdminById}
							onUnsuspend={this.props.unsuspendAdminById}
						/>
					}
				</Row>
			</div>
		);
	}

	render(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/admins', content: 'Admins', link: true, onClick: this.props.navigateToListPage },
			{ key: 'Create', content: 'Create', active: true }
		];
		const settings = {
			sections,
			location, 
			query
		};
		return(
			<React.Fragment>
				{ query && query.id && this.updateForm() }
				{ !query.id && this.createForm(settings) }
			</React.Fragment>
		);
	}
}

export default AdminBasicPage;