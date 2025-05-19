import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { notification, Breadcrumb, Layout, Typography, Row } from 'antd';

import DepartmentBasicForm from './components/DepartmentBasicForm';


class DepartmentBasicPage extends Component {

	showForm(){
		const { department } = this.props.departmentDetailPageProps && this.props.departmentDetailPageProps;
		return(
			<div className="main-content">
				<Row justify="space-around">
					{
						department && department.name &&
						<DepartmentBasicForm
							department={department}
						/>
					}
				</Row>
			</div>
		);
	}

	render() {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		return(
			<React.Fragment>
				{ query && query.id && this.showForm() }
			</React.Fragment>
		);
	}
}

export default DepartmentBasicPage;