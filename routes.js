import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import DashboardPage from './containers/DashboardPage';

/* containers */
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import CallbackCasPage from './containers/CallbackCasPage';
import AuthHelper from './helpers/auth';
import UnauthorizedPage from './containers/UnauthorizedPage';
import ExternalQrPage from './containers/ExternalQrPage';

/* layouts */
import BasicLayout from './layouts/basic-layout';
import NavigationLayout from './layouts/navigation-layout';
import BreadcrumbLayout from './layouts/breadcrumb-layout';

/* User Page */
import UserListPage from './containers/UserListPage';
import UserBasicPage from './containers/UserDetailPage/UserBasicPage';
import UserDetailPage from './containers/UserDetailPage';

// Entity Pages
import EntityListPage from './containers/EntityListPage';
import EntityDetailPage from './containers/EntityDetailPage';
import EntityBasicPage from './containers/EntityDetailPage/EntityBasicPage';

// Container List Page
import ControllerListPage from './containers/ControllerListPage';
import ControllerBasicPage from './containers/ControllerDetailPage/ControllerBasicPage';
import ControllerDetailPage from './containers/ControllerDetailPage';

// Admin Pages
import AdminListPage from './containers/AdminListPage';
import AdminDetailPage from './containers/AdminDetailPage';
import AdminBasicPage from './containers/AdminDetailPage/AdminBasicPage';

// Department Pages
import DepartmentListPage from './containers/DepartmentListPage';
import DepartmentDetailPage from './containers/DepartmentDetailPage';

// Location Pages
import LocationListPage from './containers/LocationListPage';
import LocationDetailPage from './containers/LocationDetailPage';
import LocationBasicPage from './containers/LocationDetailPage/LocationBasicPage';
import LocationReportPage from './containers/LocationDetailPage/LocationReportPage';

// Emergency Pages
import EmergencyListPage from './containers/EmergencyListPage';
import EmergencyDetailPage from './containers/EmergencyDetailPage';
import EmergencyBasicPage from './containers/EmergencyDetailPage/EmergencyBasicPage';

// Alerts Pages
import AlertListPage from './containers/AlertListPage';
import AlertDetailPage from './containers/AlertDetailPage';

// Group Page
import GroupListPage from './containers/GroupListPage';
import GroupDetailPage from './containers/GroupDetailPage';
import GroupBasicPage from './containers/GroupDetailPage/GroupBasicPage';

// Events List Page
import EventListPage from './containers/EventListPage';

// System Message List Page
import SystemMessageListPage from './containers/SystemMessageListPage';
import SystemMessageDetailPage from './containers/SystemMessageDetailPage';
import SystemMessageBasicPage from './containers/SystemMessageDetailPage/SystemMessageBasicPage';

import StatusListPage from './containers/StatusListPage';
import CallListPage from './containers/CallListPage';
import CallRoomPage from './containers/CallRoomPage';
import StatusDetailPage from './containers/StatusDetailPage';

// Agents Page
import AgentListPage from './containers/AgentListPage';
import AgentDetailPage from './containers/AgentDetailPage';
import AgentBasicPage from './containers/AgentDetailPage/AgentBasicPage';

// // Report Page
// import ReportListPage from './containers/ReportListPage/ReportListPage';

// // Emergency Report
// import EmergencyReportListPage from './containers/EmergencyReportListPage';

// // People Count Page
// import PeopleCountListPage from './containers/PeopleCountListPage';

// // Controller Report
// import ControllerReportListPage from './containers/ControllerReportListPage';

// Report List Page
import ReportListPage from './containers/ReportListPage';

//
const routes = [
	// General and Authentication
	{ path: '/unauthorized', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: UnauthorizedPage },
	{ path: '/callback/cas', exact: true, isPrivate: false, Layout: BasicLayout, layoutClass: 'narrow', Component: CallbackCasPage },
	{ path: '/login', exact: true, isPrivate: false, Layout: BasicLayout, Component: LoginPage },
	{ path: '/logout', exact: true, isPrivate: false, Layout: BasicLayout, Component: LogoutPage },
	{ path: '/', exact: true, isPrivate: true, Layout: NavigationLayout, Component: DashboardPage },

	// Dasboard page
	{ path: '/dashboard', exact: true, isPrivate: true, Layout: NavigationLayout, Component: DashboardPage },

	//Entities
	{ path: '/entities', exact: true, isPrivate: true, Layout: NavigationLayout, Component: EntityListPage },
	{ path: '/entities/id/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: EntityDetailPage },
	{ path: '/entities/id/access-rights-group', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: EntityDetailPage },
	{ path: '/entities/id/users', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: EntityDetailPage },
	{ path: '/entities/create', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: EntityBasicPage },

	// User Page
	{ path: '/users', exact: true, isPrivate: true, Layout: NavigationLayout, Component: UserListPage },
	{ path: '/users/create', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: UserBasicPage },
	{ path: '/users/id', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: UserDetailPage },
	{ path: '/users/id/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: UserDetailPage },
	{ path: '/users/id/auths', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: UserDetailPage },
	{ path: '/users/id/permission-histories', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: UserDetailPage },
	{ path: '/users/id/access-rights', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: UserDetailPage },

	// Admin Page
	{ path: '/admins', exact: true, isPrivate: true, Layout: NavigationLayout, Component: AdminListPage },
	{ path: '/admins/id/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: AdminDetailPage },
	{ path: '/admins/id/admin-roles', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: AdminDetailPage },
	// { path: '/admins/id/update-password', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: AdminDetailPage },
	{ path: '/admins/create', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: AdminBasicPage },

	// Department Page
	{ path: '/departments', exact: true, isPrivate: true, Layout: NavigationLayout, Component: DepartmentListPage },
	{ path: '/departments/id/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: DepartmentDetailPage },

	// Location Page
	{ path: '/locations', exact: true, isPrivate: true, Layout: NavigationLayout, Component: LocationListPage },
	{ path: '/locations/id/basic', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: LocationDetailPage },
	{ path: '/locations/create', exact: true, isPrivate: true, Layout: NavigationLayout, Component: LocationBasicPage },
	{ path: '/locations/id/access_rights_group', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: LocationDetailPage },
	{ path: '/locations/id/access-rights-users', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: LocationDetailPage },
	{ path: '/locations/id/access-rights-one-offs', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: LocationDetailPage },
	{ path: '/locations/id/doors', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: LocationDetailPage },
	{ path: '/locations/id/administrators', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: LocationDetailPage },
	{ path: '/locations/id/reports', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: LocationDetailPage },

	// // Controller Page
	// { path: '/controllers', exact: true, isPrivate: true, Layout: NavigationLayout, Component: ControllerListPage },
	// { path: '/controllers/create', exact: true, isPrivate: true, Layout: BreadcrumbLayout, Component: ControllerBasicPage },
	// { path: '/controllers/id', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: ControllerDetailPage },
	// { path: '/controllers/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: ControllerDetailPage },
	// { path: '/controllers/configuration', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: ControllerDetailPage },

	// Emergency Pages
	{ path: '/emergencies', exact: true, isPrivate: true, Layout: NavigationLayout, Component: EmergencyListPage },
	{ path: '/emergencies/id/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: EmergencyDetailPage },
	{ path: '/emergencies/create', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: EmergencyBasicPage },

	// Alert Pages
	{ path: '/alerts', exact: true, isPrivate: true, Layout: NavigationLayout, Component: AlertListPage },
	{ path: '/alerts/id/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: AlertDetailPage },

	// Group Pages
	{ path: '/groups', exact: true, isPrivate: true, Layout: NavigationLayout, Component: GroupListPage },
	{ path: '/groups/id/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: GroupDetailPage },
	{ path: '/groups/id/group-members', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: GroupDetailPage },
	{ path: '/groups/create', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: GroupBasicPage },

	// Events Page
	{ path: '/events', exact: true, isPrivate: true, Layout: NavigationLayout, Component: EventListPage },

	// System Messages Pages
	{ path: '/system-messages', exact: true, isPrivate: true, Layout: NavigationLayout, Component: SystemMessageListPage },
	{ path: '/system-messages/id/basic', exact: true, isPrivate: true, Layout: NavigationLayout, Component: SystemMessageDetailPage },
	{ path: '/system-messages/create', exact: true, isPrivate: true, Layout: NavigationLayout, Component: SystemMessageBasicPage },

	{ path: '/status', exact: true, isPrivate: true, Layout: NavigationLayout, Component: StatusListPage },
	{ path: '/security-features/id/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: StatusDetailPage },
	{ path: '/call-request', exact: true, isPrivate: true, Layout: NavigationLayout, Component: CallListPage },
	{ path: '/call-room/room', exact: true, isPrivate: false, Layout: BasicLayout, Component: CallRoomPage },

	// Agents Pages
	{ path: '/agents', exact: true, isPrivate: true, Layout: NavigationLayout, Component: AgentListPage },
	{ path: '/agents/id/basic', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: AgentDetailPage },
	{ path: '/agents/create', exact: false, isPrivate: true, Layout: BreadcrumbLayout, Component: AgentBasicPage },

	// External QR page
	{ path: '/external/p', exact: true, isPrivate: false, Layout: NavigationLayout, Component: ExternalQrPage },

	// Report List Page
	{ path: '/report', exact: true, isPrivate: true, Layout: NavigationLayout, Component: ReportListPage }


	// //Emergency Report
	// { path: '/emergency-reports', exact: true, isPrivate: true, Layout: NavigationLayout, Component: EmergencyReportListPage },

	// //Controller Report
	// { path: '/controller-reports', exact: true, isPrivate: true, Layout: NavigationLayout, Component: ControllerReportListPage },

	// //People Count Page
	// { path: '/people-count', exact: true, isPrivate: true, Layout: NavigationLayout, Component: PeopleCountListPage }

];

function getRedirectedPath(location) {
	if (location.pathname.split('?')[0] === '/login' && location.pathname.split('?').length > 1) {
		return location.pathname + location.search + location.hash;
	}

	// skip the redirection from these routes
	if (['/login', '/callback/cas', '/logout'].indexOf(location.pathname.split('?')[0]) !== -1) {
		return '/login';
	}
	return `/login?path=${location.pathname + location.search + location.hash}`;
}

const PrivateRoute = ({ layout: Layout, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (AuthHelper.isAuthenticated()) {
				return (
					<Layout>
						<Component {...props} />
					</Layout>
				);
			} else {
				return (
					<Redirect
						to={{
							pathname: getRedirectedPath(props.location),
							state: { from: props.location }
						}}
					/>
				);
			}
		}}
	/>
);

export class Routes extends Component {
	render() {
		const { location } = this.props;
		return (
			<Switch location={location}>
				{routes.map(({ path, exact, isPrivate, Layout, Component }) => {
					if (isPrivate) {
						return <PrivateRoute
							key={0}
							path={path}
							exact={exact}
							layout={Layout}
							component={Component}
						       />;
					} else {
						return (
							<Route
								key={0}
								path={path}
								exact={exact}
								render={props => (
									<Layout location={location}>
										<Component {...props} />
									</Layout>
								)}
							/>
						);
					}
				})}
				<Route render={props => (AuthHelper.isAuthenticated() ? <Redirect to={'/dashboard'} /> : <Redirect to={getRedirectedPath(props.location)} />)} />
			</Switch>
		);
	}
}

export default withRouter(Routes);
