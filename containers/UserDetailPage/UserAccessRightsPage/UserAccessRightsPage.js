/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import _ from 'lodash';
import UrlParse from 'url-parse';
import moment from 'moment';
import { notification, Select, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


class UserAccessRightsPage extends Component {

	componentDidMount(){
		this.getAccessRightsUsersByUserId();
	}

	componentWillUnmount(){
		this.props.resetPage();
	}

	getAccessRightsUsersByUserId = () => {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		query.id && this.props.getAccessRightsUsersByUserId(query.id);
	}
	
	showList = access_rights_users => {
		const data = [];

		access_rights_users && access_rights_users.length && access_rights_users.map(access_rights_user => {
			const { _id: id, location_id, access_times } = access_rights_user;

			let user_access_times = access_times.map(access_time => {
				return access_time;
			});

			let formatted_access_times = user_access_times.map((access_time, index) => {
				let { days, start_time, end_time } = access_time;

				let formatted_days = '';
				_.forEach(days, day => {
					formatted_days += day + ' ';
				});

				let formatted_access_time =
					<li>
						{formatted_days} ({moment(start_time).format('h:mm a')} - {moment(end_time).format('h:mm a')})
					</li>;

				return (
					<ul key={index}>
						{formatted_access_time}
					</ul>
				);
				
			});

			data.push({
				location: location_id.name,
				access_time: formatted_access_times,
				key: id
			});
		});

		return data;

	}


	render(){
		const { access_rights_users } = this.props.userAccessRightsPageProps && this.props.userAccessRightsPageProps;
	
		const columns = [
			{
				title: 'Location',
				dataIndex: 'location'
			},
			{
				title: 'Access Time',
				dataIndex: 'access_time'
			}
		];
		
		const data = this.showList(access_rights_users);

		return (
			<div className="main-content">
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
				/>
			</div>
		);
	};

}

export default UserAccessRightsPage;