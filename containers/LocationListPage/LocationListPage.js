import React, { Component } from 'react';
import { Table, Divider, Input, Button, Modal, Row, Col, Form, Radio, Pagination, Select, notification } from 'antd';
import { SearchOutlined, PlusSquareFilled } from '@ant-design/icons';

class LocationListPage extends Component {

	state = { 
		nameFilter: ''
	}

	componentDidMount(){
		this.props.getLocationList();
		this.props.resetDetailPage();
	}

	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta, limit } = prevProps.locationListPageProps;
		const { meta } = this.props.locationListPageProps;

		const { nameFilter: prevName } = prevState;
		const { nameFilter: name } = this.state;

		if (prevName !== name) {
			const query = { name, limit };
			this.props.getLocationList(query);
		}

		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error' ;
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if(type === 'success'){
				this.props.getLocationList();
			}
			this.props.resetMeta();
		}
	}

	showList = () => {
		const { locations } = this.props.locationListPageProps || {};
		const data = [];

		locations && locations.length && locations.forEach((location) => {
			const { _id, name, door_count } = location;

			data.push({
				name,
				door_count,
				key: _id
			});
		});

		return data;
	}

	renderTable(){
		const data = this.showList();
		
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Doors',
				dataIndex: 'door_count',
				key: 'door_count'
			},
			{
				title: 'Action',
				dataIndex: 'action',
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

	renderSearchBar(){
		return(
			<div style={{ display: 'flex', marginBottom: '25px' }}>
				<div style={{ marginLeft: 'auto' }}> 
					<Form
						onFinish={(values) => {
							this.setState({
								nameFilter: values.searchVal || ''
							});
						}}
						ref={this.formRef}
						layout="inline"
					>
						<Form.Item
							name="searchVal"
						>
							<Input
								placeholder="Search by name..."
							/>
						</Form.Item>

						<Form.Item
							name="primaryButton"
						>
							<Button
								type="primary"
								htmlType="submit"
							>Search</Button>
						</Form.Item>
								
					</Form>
				</div>
			</div>
		);
	}

	render(){
		const { limit, page, total } = this.props.locationListPageProps;
		return (
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Locations</h3> 
				</div>
				<Divider/>
				{this.renderSearchBar()}
				{this.renderTable()}
				<Pagination
					style={{ marginTop: '30px' }}
					showSizeChanger
					defaultPageSize={limit}
					current={page}
					total={total}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSizeOptions={['5', '10', '20', '50']}
					onChange={(page, pageSize) => this.props.getLocationList({ page, limit: pageSize, name: this.state.nameFilter })}
				/>
			</div>
		);
	}
}

export default LocationListPage;