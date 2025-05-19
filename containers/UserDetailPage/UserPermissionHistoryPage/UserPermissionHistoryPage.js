/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import moment from 'moment';
import { notification, Select, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


class UserPermissionHistoryPage extends Component {

	componentDidMount(){
		const { user } = this.props.userDetailPageProps && this.props.userDetailPageProps;
		const { _id: user_id } = user || '';

		this.props.getUserPermissionHistories(user_id);
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.userPermissionHistoryPageProps;
		const { meta } = this.props.userPermissionHistoryPageProps;

		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});

			this.props.resetMeta();
		}
	}

	componentWillUnmount(){
		this.props.resetPage();
	}

	showList = user_permission_histories => {
		const data = [];

		user_permission_histories && user_permission_histories.length && user_permission_histories.map(user_permission_history => {
			const { _id: id, start_at, end_at, description } = user_permission_history;

			data.push({
				start_at: moment(start_at).format('YYYY-MM-DD hh:mm A'),
				end_at: moment(end_at).format('YYYY-MM-DD hh:mm A'),
				description,
				key: id
			});
		});

		return data;

	}


	render(){
		const { user_permission_histories } = this.props.userPermissionHistoryPageProps && this.props.userPermissionHistoryPageProps;

		const columns = [
			{
				title: 'Start Time',
				dataIndex: 'start_at'
			},
			{
				title: 'End Time',
				dataIndex: 'end_at'
			},
			{
				title: 'Description',
				dataIndex: 'description',
				width: '40%'
			},
			{
				title: 'Action',
				dataIndex: 'action',
				width: '10%',
				render: (text, record) => <a
					onClick={ e => {
						e.preventDefault();
						this.props.navigateUserPermissionHistoryDetailPage({ id: record.key });
					}}
				                          > Edit </a>
			}
		];

		const data = this.showList(user_permission_histories);

		return (
			<div className="main-content">
				<div
					className="component-buttons"
					style={{ marginBottom: '15px', display: 'flex', justifyContent: 'flex-end' }}
				>
					<span style={{ marginRight: '10px' }}>
						<Select
							placeholder="Date ..."
							prefix={<SearchOutlined />}
						>
						</Select>
					</span>
					<span>
						<Button
							type="primary"
							size="middle"
							// onClick={(e) => {
							// 	e.preventDefault();
							// 	this.setState({
							// 		modalState: true
							// 	});
							// }}
						>Search</Button>
					</span>
				</div>
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
				/>
			</div>
		);
	};

}

export default UserPermissionHistoryPage;