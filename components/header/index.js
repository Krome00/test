import React, { Component } from 'react';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Select, Form, Popover } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import LocalStorageHelper from '../../helpers/local_storage';

import SocketHelper from '../../helpers/socket_helper';

const { Header } = Layout;
const { Option } = Select;

export class NavigationHeader extends Component {
	constructor(props) {
		super(props);
		this.socket = React.createRef();
		this.state = {
			selectedDepartment: null,
			optionsDepartment: null
		};

	}


	handleLanguageMenuClick = () => {};
	handleSettingMenuClick = () => {};
	handleLogout = () => {};

	getUsernameAvatar = (username, size = 'large') => {
		return (
			<div>
				<Avatar
					style={{
						backgroundColor: '#96CE56',
						verticalAlign: 'middle'
					}}
					size={size}
				>
					{username ? username.charAt(0).toUpperCase() : ''}
				</Avatar>
				<span style={{ paddingLeft: 20 }}>{username}</span>
			</div>
		);
	};

	componentDidMount = () => {
		const { _id } = JSON.parse(LocalStorageHelper.getDepartment());
		const departments = this.getDepartmentOptions();


		this.setState({
			selectedDepartment: departments.find(department => department._id === _id),
			optionsDepartment: departments
		});


		this.socket.current = SocketHelper.connect();

		this.socket.current.on('department-status-changed', (department) => {
			const departments = JSON.parse(localStorage.getItem('smartdoor_admin_departments'));
			const { selectedDepartment } = this.state;

			if (departments) {
				const foundIndex = departments.findIndex(dept => dept._id === department._id);
				departments[foundIndex] = {
					...departments[foundIndex],
					...department
				};

				localStorage.setItem('smartdoor_admin_departments', JSON.stringify(departments));
				this.setState({
					selectedDepartment: selectedDepartment._id === department._id ? departments[foundIndex] : selectedDepartment,
					optionsDepartment: this.getDepartmentOptions()
				});
			}
		});
	};

	componentDidUpdate(prevProps, prevState) {
		const { selectedDepartment, optionsDepartment } = this.state;
		const localDepartments = this.getDepartmentOptions();

		if (!_.isEqual(optionsDepartment, localDepartments)) {
			this.setState({
				selectedDepartment: localDepartments.find(department => department._id === selectedDepartment._id),
				optionsDepartment: localDepartments
			});
		}

		if (!this.isAccessible(selectedDepartment)) {
			const department = optionsDepartment && optionsDepartment.length && optionsDepartment.find(department => this.isAccessible(department));
			if (optionsDepartment && optionsDepartment.length && !department) {
				this.props.history.push('/login');
				return;
			}

			this.setState({
				selectedDepartment: department
			});
			LocalStorageHelper.setDepartment(department._id);
		}
	}

	onChangeDepartment = (e, data) => {
		const { value } = data;
		LocalStorageHelper.setDepartment(value);
		this.setState({
			selectedDepartment: JSON.parse(LocalStorageHelper.getDepartment())
		});
		this.props.history.push(`/dashboard?department=${value}`);
	}

	getDepartmentOptions = () => {
		try {
			const departments = JSON.parse(localStorage.getItem('smartdoor_admin_departments'));
			const optionsDepartments = departments.map(d => ({
				_id: d._id,
				name: d.name,
				status: d.status,
				admin_role_status: d.admin_role_status,
				start_date: d.start_date,
				end_date: d.end_date
			}));

			return _.sortBy(optionsDepartments, o => o.text);
		} catch (e) {

		}
		return [];
	}

	isAccessible = department => {
		const { status: department_status, admin_role_status, start_date, end_date } = department;
		const isBetween = moment().isBetween(moment(start_date), moment(end_date));

		return admin_role_status === 'enabled' && department_status === 'enabled' && isBetween;
	}
	signout = () => {
		this.props.history.push('/logout');
	};

	render() {

		const { selectedDepartment, optionsDepartment } = this.state;


		const smartdoorAdmin = JSON.parse(localStorage.getItem('smartdoor_admin'));
		const { admin: { name, email } } = smartdoorAdmin;
		// const department = JSON.parse(LocalStorageHelper.getDepartment());
		// const optionsDepartment = this.getDepartmentOptions();
		// const { id } = optionsDepartment.find(department => this.isAccessible(department)) || '';
		// if (!id) this.props.history.push('/login');
		const firstLetter = email.charAt(0);

		return (
			<Header
				trigger={null}
				className="header"
				style={{ background: '#fff', padding: 0 }}
			>
				<Form
					className ="select-lab-form"
					name="basic"
					mode="inline"
				>
					<Form.Item
					  className="header-lab-select"
						label="Select Department:"
					>
						<Select
							style={{
								minWidth: 250
							}}
							value={selectedDepartment?._id}
							onChange={this.onChangeDepartment}
						>
							{
								optionsDepartment && optionsDepartment.length && optionsDepartment.map((c, index) => {
									return <Option
										key={index}
										value={c._id}
										disabled={!this.isAccessible(c)}
									       >{c.name}</Option>;
								})
							}
						</Select>

					</Form.Item>

					<Popover
        				content={<a onClick={this.signout}>Logout</a>}>
						<Form.Item style={{ marginLeft: 'auto', marginRight: 20 }} >
							<Avatar style={{ color: '#FFFFFF', backgroundColor: '#236B8E', marginRight: 6 }}> {firstLetter.toUpperCase()}</Avatar>
							{email}
						</Form.Item>
					</Popover>

				</Form>
			</Header>

		);
	}
}

export default NavigationHeader;
