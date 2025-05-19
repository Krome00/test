import React, { Component } from 'react';
import { Table, Divider, Badge, Pagination } from 'antd';

import LabelHelper from '../../helpers/Label';
import Loading from '../../components/loading';


class DepartmentListPage extends Component {

	componentDidMount(){
		this.props.getDepartmentList();
		this.props.resetDetailPage();
	}

	renderTable() {
		const { departments } = this.props.departmentListPageProps || {};
		let data = [];

		departments && departments.length && departments.map( department => {
			const { _id: id, name, status } = department;
			data.push({
				id,
				name,
				key: id,
				status: <Badge 
					status={status === 'enabled' ? 'success' : 'errror'} 
					text={LabelHelper.status(status)}
				        />
			});
		});

		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status'
			},
			{
				title: 'Action',
				key: 'action',
				render: (text, record) => 
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a
						onClick={ e=> {
							e.preventDefault();
							this.props.navigateToDetailPage(record.key);
						}}
					>
						View
					</a>
			}
		];

		return(
			<Table
				dataSource={data}
				columns={columns}
				pagination={false}
			/>
		);
	}
	
	render() {
		const { loading, limit, page, total } = this.props.departmentListPageProps;
		return (
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Departments</h3> 
				</div>
				<Divider/>
				<div
					style={{ textAlign: 'center' }}
				>
					{loading ? <Loading /> : this.renderTable()}
				</div>
				<Pagination
					style={{ marginTop: '30px' }}
					showSizeChanger
					pageSize={limit || 10}
					current={page}
					total={total}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSizeOptions={['5', '10', '20', '50']}
					onChange={(page, pageSize) => this.props.getDepartmentList({ page, limit: pageSize })}
				/>
			</div>
		);
	}
}

export default DepartmentListPage;