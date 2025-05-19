import React, { Component } from 'react';
import { notification, Typography, Breadcrumb, Layout, Row } from 'antd';
import UrlParse from 'url-parse';
import AdminUpdatePasswordForm from './components/AdminUpdatePasswordForm';

const { Title } = Typography;
const { Header, Content } = Layout;

class AdminUpdatePasswordPage extends Component {

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

	updateForm(){
		return (
			<div className="main-content">
				<Row justify="space-around">
					<AdminUpdatePasswordForm
						onSubmit={this.props.updateAdminPasswordById}
						{...this.props}
					/>
				</Row>
			</div>
		);
	}

	render(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		return(
			<React.Fragment>
				{ query && query.id && this.updateForm() }
			</React.Fragment>
		);
	}
}

export default AdminUpdatePasswordPage;