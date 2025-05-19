import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import LoginPage from './LoginPage';

// Entity Page Reducers Import
import entityListPageReducer from './EntityListPage';
import entityDetailPageReducer from './EntityDetailPage/EntityBasicPage';
import entityAccessRightsByGroupReducer from './EntityDetailPage/EntityAccessRightsByGroupPage';
import entityUserPageReducer from './EntityDetailPage/EntityUsersPage';

// User Page Reducer Import
import userListPageReducer from './UserListPage';
import userBasicPageReducer from './UserDetailPage/UserBasicPage';
import userAuthenticationPageReducer from './UserDetailPage/UserAuthenticationPage';
import userPermissionHistoryPageReducer from './UserDetailPage/UserPermissionHistoryPage';
import userAccessRightsPageReducer from './UserDetailPage/UserAccessRightsPage';

// Access Rights Reducer Import
import accessRightsUserPageReducer from './LocationDetailPage/LocationAccessRightsUserPage';
import accessRightsOneOffPageReducer from './LocationDetailPage/LocationAccessRightsOneOffPage';
import doorPageReducer from './LocationDetailPage/LocationDoorPage';

//Controller Page Reducer Import
import controllerListPageReducer from './ControllerListPage';
import controllerBasicPageReducer from './ControllerDetailPage/ControllerBasicPage';
import controllerConfigurationPageReducer from './ControllerDetailPage/ControllerConfigurationPage';

// Admin Page Reducers
import adminListPageReducer from './AdminListPage';
import adminBasicPageReducer from './AdminDetailPage/AdminBasicPage';
import adminDepartmentPageReducer from './AdminDetailPage/AdminDepartmentPage';

// Department Page Reducers
import departmentListPageReducer from './DepartmentListPage';
import departmentBasicPageReducer from './DepartmentDetailPage/DepartmentBasicPage';

// Location Page Reducers
import locationListPageReducer from './LocationListPage';
import locationBasicPageReducer from './LocationDetailPage/LocationBasicPage';
import locationAccessRightsByGroupReducer from './LocationDetailPage/LocationAccessRightsByGroupPage';
import locationAdminRolesPageReducer from './LocationDetailPage/LocationAdminPage';
import locationReportPageReducer from './LocationDetailPage/LocationReportPage';

// Emergency Page Reducers
import emergencyListPageReducer from './EmergencyListPage';
import emergencyBasicPageReducer from './EmergencyDetailPage/EmergencyBasicPage';

// Alert Page Reducers
import alertListPageReducer from './AlertListPage';
import alertDetailPageReducer from './AlertDetailPage';

// Dashboard Page
import dashboardPageReducer from './DashboardPage';
import groupListPageReducer from './GroupListPage';
import groupBasicPageReducer from './GroupDetailPage/GroupBasicPage';
import groupMemberPageReducer from './GroupDetailPage/GroupMemberPage';

// System Message List Page reducer
import systemMessageListPageReducer from './SystemMessageListPage';
import systemMessageBasicPageReducer from './SystemMessageDetailPage/SystemMessageBasicPage';

import statusListPageReducer from './StatusListPage';
import callsListPageReducer from './CallListPage';
import controllerSecurityPageReducer from './ControllerDetailPage/ControllerSecurityPage';

// Agent Page reducer
import agentListPageReducer from './AgentListPage';
import agentBasicPageReducer from './AgentDetailPage/AgentBasicPage';

//ExternalQR
import ExternalQrPage from './ExternalQrPage';

// Reports
import reportPageReducer from './ReportListPage';
// Events
import eventListPageReducer from './EventListPage';
export default history =>
	combineReducers({
		router: connectRouter(history),
		loginPageReducer: LoginPage,
		entityListPageReducer,
		externalUserPageReducer: ExternalQrPage,
		entityDetailPage: combineReducers({
			entityDetailPageReducer,
			entityAccessRightsByGroupReducer,
			entityUserPageReducer
		}),
		userListPageReducer,
		userDetailPage: combineReducers({
			userBasicPageReducer,
			userAuthenticationPageReducer,
			userPermissionHistoryPageReducer,
			userAccessRightsPageReducer
		}),
		controllerListPageReducer,
		controllerDetailPage: combineReducers({
			controllerBasicPageReducer,
			controllerConfigurationPageReducer,
			controllerSecurityPageReducer
		}),
		adminListPageReducer,
		adminDetailPage: combineReducers({
			adminBasicPageReducer,
			adminDepartmentPageReducer
		}),
		departmentListPageReducer,
		departmentDetailPage: combineReducers({
			departmentBasicPageReducer
		}),
		locationListPageReducer,
		locationDetailPage: combineReducers({
			locationBasicPageReducer,
			locationAccessRightsByGroupReducer,
			accessRightsUserPageReducer,
			accessRightsOneOffPageReducer,
			locationAdminRolesPageReducer,
			doorPageReducer,
			locationReportPageReducer
		}),
		emergencyListPageReducer,
		emergencyDetailPage: combineReducers({
			emergencyBasicPageReducer
		}),
		alertListPageReducer,
		alertDetailPageReducer,
		dashboardPageReducer,
		groupListPageReducer,
		groupDetailPage: combineReducers({
			groupBasicPageReducer,
			groupMemberPageReducer
		}),
		systemMessageListPageReducer,
		systemMessageDetailPage: combineReducers({
			systemMessageBasicPageReducer
		}),
		statusListPageReducer,
		callsListPageReducer,
		agentListPageReducer,
		agentDetailPage: combineReducers({
			agentBasicPageReducer
	    }),
		reportPageReducer,
		eventListPageReducer
	});



