/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Table, Input, Select, Button, Row, Col, Modal, Divider, Form, notification } from 'antd';
import { PlusSquareFilled, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class EntityUserPage extends Component {

	state = {
		modal: false
	}

	componentDidUpdate(prevProps, prevState){
		const { meta: prevMeta } = prevProps.entityUserPageProps;
		const { meta } = this.props.entityUserPageProps;
		if(meta !== prevMeta){
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			if(type === 'success'){
				this.setState({
					modal: false
				});
			}
		}
	}

	deleteField = (id) => {
		//deleting
		this.props.deleteUserEntityMappingById(id);
		this.setState({
			...this.state,
			modal: false
		});
	}

	showDeleteConfirm = (id, name, deleteFunction) => {
		confirm({
			title: `Are you sure you want to remove ${name} from this entity?`,
			icon: <ExclamationCircleOutlined />,
			onOk() {
				deleteFunction(id);
			},
			onCancel() {
			}
		});
	}

	componentDidMount(){
		this.getUsersByEntityId();
	}

	getUsersByEntityId(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);

		query.id && this.props.getUserEntityMappingByEntityId(query.id);
	}

	renderTable(){
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
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: (text, record) => 
					<a
						onClick={(e) => {
							const { key: id, name }  = record;
							e.preventDefault();
							this.showDeleteConfirm(id, name, this.deleteField);
						}
						}
					>
						Delete
					</a>
			}
		];

		const { users } = this.props.entityUserPageProps && this.props.entityUserPageProps;
		const data = [];
		users && users.length && users.map(user => {
			const { name, email } = user.user_id;
			const { _id: id } = user;
			data.push({
				name,
				email,
				key: id
			});
		});

		return(
			<Table
				pagination={false}
				dataSource={data}
				columns={columns}
			/>
		);
	}

	renderSearchBar(){
		return(
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
				<span> 
					<Input
						placeholder="Search by Name, Email"
						style={{ width: '100%' }}
						prefix={<SearchOutlined />}
					/>
				</span>
				<div className="component-buttons">
					<span>
						<Button
							type="primary"
							size="middle"
							icon={<PlusSquareFilled />}
							onClick={
								() => this.setState({
									modal: true
								})
							}
						>Add User</Button>
					</span>
				</div>
			</div>
		);
	}

	onSubmit(values){
		const { email } = values;
		const { entity: { _id: entity_id } } = this.props.entityDetailPageProps;
		const fields = {
			userEntityMapping: {
				email,
				entity_id
			}
		};

		this.props.createUserEntityMapping(fields);
	}

	renderModal(){
		const { modal } = this.state;
		return(
			<Modal
				destroyOnClose={true}
				closable={false}
				footer={false}
				visible={modal}
				width={500}
			>
				<Row
					responsive={true}
					gutter={24}
				>
					<Col
						xs={24} 
						sm={24} 
						md={24} 
						lg={24} 
						xl={24}
					>
						<h3> Add User </h3>
						<Divider />
						<Form 
							layout="vertical"
							onFinish={ values => {
								this.onSubmit(values);
							}}
						>
							<Form.Item
								label="Email"
								name="email"
							>
								<Input
									placeholder="Enter email..."
									style={{ width: '100%' }}
								/>
							</Form.Item>
							<Form.Item>
								<Button 
									style={{ float: 'right' }}
									type="primary"
									htmlType="submit"
								>Save</Button>
								<Button
									style={{ marginRight: '15px', float: 'right' }}
									type="default"
									onClick={e => {
										e.preventDefault();
										this.setState({
											modal: false
										});
									}}
								>Cancel</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Modal>
		);
	}

	render(){
		return(
			<div className="main-content">
				{this.renderSearchBar()}
				{this.renderTable()}
				{this.renderModal()}
			</div>
		);
	};
}

export default EntityUserPage;