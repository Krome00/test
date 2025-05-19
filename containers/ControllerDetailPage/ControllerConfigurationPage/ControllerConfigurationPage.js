import React, { Component } from 'react';
import { Breadcrumb, Layout, Row, notification } from 'antd';
import UrlParse from 'url-parse';
import Loading from '../../../components/loading';
import ControllerConfigurationForm from './components/ControllerConfigurationForm';

const { Header, Content } = Layout;

class ControllerConfigurationPage extends Component {

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.controllerConfigurationPageProps;
		const { meta } = this.props.controllerConfigurationPageProps;

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
		const { controller, loading, loadingSubmit } = this.props.controllerDetailPageProps;
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const sections = [
			{ key: '/controllers', content: 'Controllers', link: true, onClick: () => this.props.navigateToControllerListPage() },
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
						</Header>
						<Content style={{ margin: '24px 16px 0' }}>
							<div className="main-content">
								<Row justify="space-around">
									<ControllerConfigurationForm
										controller={controller}
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
								<ControllerConfigurationForm
									controller={controller}
									loadingSubmit={loadingSubmit}
									onSubmit={this.props.onSubmit}
								/>
							)}
						</Row>
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default ControllerConfigurationPage;