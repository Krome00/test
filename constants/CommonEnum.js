module.exports = {
	entity_types: ['group', 'user_role', 'department'],
	admin_type: ['location', 'department', 'it_admin'],
	days: [
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat',
		'Sun'
	],
	auth_types: [
		'rfid',
		'qr_code'
	],
	cas_user_types: [
		'staff',
		'undergrad',
		'postgrad',
		'department',
		'emeritus',
		'nansha-staff',
		'project',
		'affiliate',
		'family-google'
	],
	security_features_auth_type: [
		{
			name: 'HKUST Card',
			value: 'hkust_java_card'
		},
		{
			name: 'HKUST Card with Card PIN',
			value: 'hkust_java_card_and_pin'
		},
		{
			name: 'HKUST QR Code',
			value: 'hkust_qr_code'
		},
		{
			name: 'Face Detection',
			value: 'face_detection'
		},
		{
			name: 'Master Pin',
			value: 'pin_code'
		},
		{
			name: '(Advanced) Department QR Code',
			value: 'custom_qr'
		},
		{
			name: '(Advanced) Department IC Card',
			value: 'mifare'
		}
	]
};
