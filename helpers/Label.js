import _ from 'lodash';

const LabelHelper = {
	status(status) {
		switch(status) {
			case 'enabled':
				return 'Enabled';
			case 'disabled':
				return 'Disabled';
			case 'active':
				return 'Active';
			case 'inactive':
				return 'Inactive';
			case 'submitted':
				return 'Submitted';
			case 'approval_from_admin':
				return 'Approval from Admin';
			default:
		}
		return '';
	},
	entity_type_label(type) {
		switch(type){
			case 'group':
				return 'Group';
			case 'user_role':
				return 'User Role';
			case 'department':
				return 'Department';
			default:
				return type;
		}
	},
	securityFeatureAuthenticationMethod(auth) {
		switch(auth){
			case 'hkust_java_card':
				return 'HKUST Card';
			case 'hkust_card_and_pin':
				return 'HKUST Card with Card PIN';
			case 'hkust_qr_code':
				return 'HKUST QR Code';
			case 'face_detection':
				return 'Face Detection';
			case 'pin_code':
				return 'Master Pin';
			case 'custom_qr':
				return '(Advanced) Department QR Code';
			case 'mifare':
				return '(Advanced) Department IC Card';
			default:
				return auth;
		}
	},
	casUserType(casUserType) {
		switch (casUserType) {
			case 'staff':
				return 'Staff';
			case 'undergrad':
				return 'Undergraduate';
			case 'postgrad':
				return 'Postgraduate';
			case 'department':
				return 'Department';
			case 'emeritus':
				return 'Emeritus';
			case 'project':
				return 'Project';
			case 'family-google':
				return 'Family (Google Login)';
			default:
		}
		return '';
	},
	alert_status(status) {
		switch(status) {
			case 'acknowledged':
				return 'Acknowledged';
			case 'notified':
				return 'New';
			case 'Acknowledged':
				return 'acknowledged';
			case 'New':
				return 'notified';
			default:
				return status;
		}
	},
	admin_role(role) {
		switch(role) {
			case 'department':
				return 'Department Administrator';
			case 'it_admin':
				return 'IT Coordinator';
			case 'location':
				return 'Location Administrator';
			default:
				return role;
		}
	},
	user_type(type) {
		switch(type) {
			case 'internal':
				return 'Internal';
			case 'external':
				return 'External';
			default:
				return type;
		}
	},
	event_labels(type) {
		switch(type) {
			case 'time_in':
				return 'Time In';
			case 'time_out':
				return 'Time Out';
			case 'success':
				return 'Success';
			case 'failure':
				return 'Failure';
			default:
				return type;
		}
	},
	report_type(type) {
		switch(type) {
			case 'Controller Reports':
				return 'Controller Reports';
			case 'Events Reports':
				return 'Events Reports';
			case 'Emergencies Reports':
				return 'Emergencies Reports';
			case 'People Count Reports':
				return 'People Count Reports';
			default:
				return type;
		}
	}
};

export default LabelHelper;
