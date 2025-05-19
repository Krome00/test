import React, { Component } from 'react';
import { Table, Divider, Input, Button, Modal, Row, Col, Form, Radio, Badge } from 'antd';
import { SearchOutlined, PlusSquareFilled } from '@ant-design/icons';
import UrlParse from 'url-parse';
import { Pagination } from 'antd';
import LabelHelper from '../../helpers/Label';
import Loading from '../../components/loading';

class AgentListPage extends Component {

	componentDidMount() {
		this.props.resetPage();
		const { query } = UrlParse(this.props.location.search, true);
		const { search } = query;
		this.props.getAgents({ search });
	};
    
	showList = () => {
		const { agents } = this.props.agentListPageProps && this.props.agentListPageProps;
		const data = [];
		agents && agents.length && agents.map((agent) => {
			const { _id: id, name, email, status, last_login } = agent;
			// const { name: location } = location_id || {};
			data.push({
				name,
				email,
				status: <Badge 
					status={status === 'enabled' ? 'success' : 'error'} 
					text={LabelHelper.status(status)}
				        />,
				key: id
			});
		});
		return data;
	}

	onClickAddButton = () => {
		return this.props.navigateToAddPage();
	};


	renderTable() {
		const data = this.showList();
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email'
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status'
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
						Edit
					</a>

			}
		];

		
		return (
			<Table
				dataSource={data}
				columns={columns}
				pagination={false}
			/>
		);
		
	}

	onSelectStatus = statusValue => {
		this.setState({ statusValue });
	}

	render() {
		const { loading } = this.props.agentListPageProps;
		const { agentListPageProps } = this.props;
		const { page, limit, total } = agentListPageProps;

		return (
			<div className="main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Agents</h3>
				</div>
				<Divider/>
				<div style={{ display: 'flex', marginBottom: '25px' }}>
					<div
						className="component-buttons" 
						style={{ marginLeft: 'auto' }}
					>
						<span>
							<Button
								type="primary"
								icon={<PlusSquareFilled />}
								onClick={this.onClickAddButton}
							> Add Agent</Button>
						</span>
					</div>
				</div>
				<div
					style={{ textAlign: 'center' }}
				>
					{loading ? <Loading /> : this.renderTable()}
				
				</div>
				<Pagination
					style={{ marginTop: '30px' }}
					current={page}
					pageSize={limit || 10}
					showSizeChanger
					total={total}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSizeOptions={['5', '10', '20', '50']}
					onChange={(page, pageSize) => {
						this.props.getAgents({ page, limit: pageSize });
					}}
				/>
				
			</div>
		);
	}
}

export default AgentListPage;