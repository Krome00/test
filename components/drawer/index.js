import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import URLParse from 'url-parse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faMapMarkerAlt, faUsers, faGamepad, faFolderOpen, faBell } from '@fortawesome/free-solid-svg-icons';

const { SubMenu } = Menu;
const { Sider } = Layout;

const rootSubmenuKeys = ['sub-controllers', 'sub-locations', 'sub-system-users', 'sub-reports'];

export class Drawer extends Component {
	state = {
		openKeys: []
	};

	componentDidMount() {
		this.getActiveSubmenu();
	}

	getActiveItem({ pathname, search }) {
		const { query } = URLParse(search, true);
		switch (true) {
			case /\/dashboard/.test(pathname):
				return ['dashboard'];
			case /\/alerts/.test(pathname):
				return ['alerts'];
			case /\/entities/.test(pathname):
				return ['entities'];
			case /\/users/.test(pathname):
				return ['users'];
			// case /\/controllers/.test(pathname):
			// 	return ['controllers'];
			case /\/admins/.test(pathname):
				return ['admins'];
			case /\/locations/.test(pathname):
				return ['locations'];
			case /\/emergencies/.test(pathname):
				return ['emergencies'];
			case /\/groups/.test(pathname):
				return ['groups'];
			case /\/departments/.test(pathname):
				return ['smartdoor_admin_departments'];
			case /\/events/.test(pathname):
				return ['events'];
			case /\/system-messages/.test(pathname):
				return ['system-messages'];
			case /\/status/.test(pathname):
				return ['status'];
			case /\/security-features/.test(pathname):
				return ['status'];
			case /\/call-request/.test(pathname):
				return ['call-request'];
			case /\/agents/.test(pathname):
				return ['agents'];
			default:
				return;
		}
	}

	getActiveSubmenu() {
		const pathname = this.props.location.pathname;
		switch (true) {
			case /\/users/.test(pathname) || /\/agents/.test(pathname):
				this.setState({
					openKeys: ['sub-system-users']
				});
				break;
			case /\/groups/.test(pathname) || /\/entities/.test(pathname) || /\/admins/.test(pathname) || /\/users/.test(pathname) || /\/visitors/.test(pathname) || /\/departments/.test(pathname):
				this.setState({
					openKeys: ['sub-system-users']
				});
				break;
			case /\/controllers/.test(pathname) || /\/emergencies/.test(pathname) || /\/system-messages/.test(pathname) || /\/status/.test(pathname) || /\/call-request/.test(pathname) || /\/security-features/.test(pathname):
				this.setState({
					openKeys: ['sub-controllers']
				});
				break;
			case /\/locations/.test(pathname):
				this.setState({
					openKeys: ['sub-locations']
				});
				break;
			case /\/events/.test(pathname):
				this.setState({
					openKeys: ['sub-reports']
				});
				break;
			default:
				break;
		}
	}

	onOpenChange = keys => {
		const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({
				openKeys: keys
			});
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : []
			});
		}
	};

	render() {
		const activeItem = this.getActiveItem({
			pathname: this.props.location.pathname,
			search: this.props.location.search
		});

		return (
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				onCollapse={this.props.handleOnCollapse}
				collapsed={this.props.collapsed}
				width="256"
			>
				<div className="menu-logo" />
				<Menu
					theme="dark"
					mode="inline"
					openKeys={this.state.openKeys}
					onOpenChange={this.onOpenChange}
					selectedKeys={activeItem}
				>
					<Menu.Item key="dashboard">
						<FontAwesomeIcon
							icon={faTachometerAlt}
							fixedWidth
						/>
						<span style={{ marginLeft: 10 }}>Dashboard</span>
						<Link to="/dashboard" />
					</Menu.Item>
					<Menu.Item key="alerts">
						<FontAwesomeIcon
							icon={faBell}
							fixedWidth
						/>
						<span style={{ marginLeft: 10 }}>Alerts</span>
						<Link to="/alerts" />
					</Menu.Item>
					<SubMenu
						key="sub-controllers"
						icon={<FontAwesomeIcon
							icon={faGamepad}
							fixedWidth
						      />}
						title="Controllers"
					>
						{/* <Menu.Item key="controllers">
							<span className="nav-text">Controllers</span>
							<Link to="/controllers" />
						</Menu.Item> */}
						<Menu.Item key="status">
							<span className="nav-text">Status</span>
							<Link to="/status" />
						</Menu.Item>
						<Menu.Item key="call-request">
							<span className="nav-text">Call Requests</span>
							<Link to="/call-request" />
						</Menu.Item>
						<Menu.Item key="emergencies">
							<span className="nav-text">Emergencies</span>
							<Link to="/emergencies" />
						</Menu.Item>
						<Menu.Item key="system-messages">
							<span className="nav-text">System Messages</span>
							<Link to="/system-messages" />
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub-locations"
						icon={<FontAwesomeIcon
							icon={faMapMarkerAlt}
							fixedWidth
						      />}
						title="Locations"
					>
						<Menu.Item key="locations">
							<span className="nav-text">Locations</span>
							<Link to="/locations" />
						</Menu.Item>
						<Menu.Item key="events">
							<span className="nav-text">Events</span>
							<Link to="/events" />
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub-system-users"
						icon={<FontAwesomeIcon
							icon={faUsers}
							fixedWidth
						      />}
						title="System Users"
					>
						<Menu.Item key="users">
							<span className="nav-text">Users</span>
							<Link to="/users" />
						</Menu.Item>
						<Menu.Item key="admins">
							<span className="nav-text">Administrators</span>
							<Link to="/admins" />
						</Menu.Item>
						{/* <Menu.Item key="departments">
							<span className="nav-text">Departments</span>
							<Link to="/departments" />
						</Menu.Item> */}
						<Menu.Item key="groups">
							<span className="nav-text">Groups</span>
							<Link to="/groups" />
						</Menu.Item>
						<Menu.Item key="agents">
							<span className="nav-text">Agents</span>
							<Link to="/agents" />
						</Menu.Item>
					</SubMenu>
					<Menu.Item key="report">
						<FontAwesomeIcon
							icon={faFolderOpen}
							fixedWidth
						/>
						<span style={{ marginLeft: 10 }}>Reports</span>
						<Link to="/report" />
					</Menu.Item>
					{/* <SubMenu
						key="sub-reports"
						icon={<FontAwesomeIcon
							icon={faFolderOpen}
							fixedWidth
						      />}
						title="Reports"
					>
						<Menu.Item key="report">
							<span className="nav-text">Reports</span>
							<Link to="/report" />
						</Menu.Item>
						<Menu.Item key="controllers">
							<span className="nav-text">Controllers</span>
							<Link to="/controller-reports" />
						</Menu.Item>
						<Menu.Item key="events">
							<span className="nav-text">Events</span>
							<Link to="/events" />
						</Menu.Item>
						<Menu.Item key="emergencies">
							<span className="nav-text">Emergencies</span>
							<Link to="/emergency-reports" />
						</Menu.Item>

						<Menu.Item key="people count">
							<span className="nav-text">People Count</span>
							<Link to="/people-count" />
						</Menu.Item>


					</SubMenu> */}
				</Menu>
			</Sider>
		);
	}
}

export default Drawer;
