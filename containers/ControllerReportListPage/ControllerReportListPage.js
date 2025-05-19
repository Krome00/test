// import React, { Component } from 'react';
// import moment from 'moment';
// import { Table, Divider, Button, Input, Select, DatePicker } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloudDownloadAlt, faDownload } from '@fortawesome/free-solid-svg-icons';

// import Loading from '../../components/loading';
// import LabelHelper from '../../helpers/Label';

// class ControllerReportListPage extends Component {

// 	componentDidMount(){
// 		this.props.getControllerReportList();
// 	}

// 	timeLabel = datetime => {
// 		let time = datetime.match(/\d\d:\d\d/)[0];

// 		switch(true) {
// 			case /^00/.test(time):
// 				return `12:${time.substring(3) - 12} AM`;

// 			case /^01/.test(time)
// 			|| /^02/.test(time)
// 			|| /^03/.test(time)
// 			|| /^04/.test(time)
// 			|| /^05/.test(time)
// 			|| /^06/.test(time)
// 			|| /^07/.test(time)
// 			|| /^08/.test(time)
// 			|| /^09/.test(time)
// 			|| /^10/.test(time)
// 			|| /^11/.test(time):
// 				return `${time} AM`;

// 			case /^12/.test(time):
// 				return `12:${time.substring(3) - 12} PM`;

// 			case /^13/.test(time)
// 			|| /^14/.test(time)
// 			|| /^15/.test(time)
// 			|| /^16/.test(time)
// 			|| /^17/.test(time)
// 			|| /^18/.test(time)
// 			|| /^19/.test(time)
// 			|| /^20/.test(time)
// 			|| /^21/.test(time):
// 				return `0${time.substring(0, 2) - 12}:${time.substring(3) - 12} PM`;

// 			case /^22/.test(time) || /^23/.test(time):
// 				return `0{time.substring(0, 2) - 12}:${time.substring(3) - 12} PM`;

// 			default:
// 				return time;
// 		}
// 	};

// 	renderTable() {
// 		const { controller_reports } = this.props.controllerReportListPageProps || {};
// 		let data = [];

// 		controller_reports  && controller_reports .length && controller_reports .map( controller_reports => {
// 			const { _id: id, user_id, location_id, door_id, time, controller_type, result } = controller_reports;
// 			data.push({
// 				id,
// 				name: user_id.name,
// 				location: location_id.name,
// 				door: door_id.name,
// 				time: moment(new Date(time)).format('hh:mm A'),
// 				emergency_type: LabelHelper.controller_reports_labels(controller_type),
// 				result: LabelHelper.controller_reports_labels(result),
// 				key: id
// 			});
// 		});

// 		const columns = [
// 			{
// 				title: 'Name',
// 				dataIndex: 'name',
// 				key: 'name'
// 			},
// 			{
// 				title: 'Controller Type',
// 				dataIndex: 'controller_type',
// 				key: 'controller_type'
// 			},
// 			{
// 				title: 'Time',
// 				dataIndex: 'time',
// 				key: 'time'
// 			},
// 			{
// 				title: 'Location',
// 				dataIndex: 'location',
// 				key: 'location'
// 			},
// 			{
// 				title: 'Door',
// 				dataIndex: 'door',
// 				key: 'door'
// 			},
// 			{
// 				title: 'Availability',
// 				dataIndex: 'availability',
// 				key: 'availabiltity'
// 			},
// 			{
// 				title: 'Action',
// 				key: 'action',
// 				width: '5%',
// 				render: (text, record) =>
// 					// eslint-disable-next-line jsx-a11y/anchor-is-valid
// 					<a
// 						// onClick={ e=> {
// 						// 	e.preventDefault();
// 						// 	this.props.navigateToDetailPage(record.key);
// 						// }}
// 					>
// 						<FontAwesomeIcon
// 							icon={faCloudDownloadAlt}
// 							fixedWidth
// 						/>
//                         Download
// 					</a>
// 			}
// 		];


// 		return(
// 			<Table
// 				dataSource={data}
// 				columns={columns}
// 				pagination={false}
// 			/>
// 		);
// 	}

// 	renderSearchBar() {
// 		return(
// 			<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px' }}>
// 				<span style={{ marginRight: '10px' }}>
// 					<Select
// 						placeholder="Date"
// 						prefix={<SearchOutlined />}
// 					>

// 					</Select>
// 				</span>
// 				<span style={{ marginRight: '10px' }}>
// 					<Select
// 						placeholder="Controller Type"
// 						prefix={<SearchOutlined />}
// 					>
// 						<Select.Option
// 							key="time_in"
// 							value="Time In"
// 						>Time In</Select.Option>
// 						<Select.Option
// 							key="time_out"
// 							value="Time Out"
// 						>Time Out</Select.Option>
// 					</Select>
// 				</span>
// 				<span style={{ marginRight: '10px' }}>
// 					<Input
// 						placeholder="Search by Name ..."
// 						style={{ width: '100%' }}
// 						prefix={<SearchOutlined />}
// 					/>
// 				</span>
// 				<span>
// 					<Button
// 						type="primary"
// 						size="middle"
// 						// onClick={(e) => {
// 						// 	e.preventDefault();
// 						// 	this.setState({
// 						// 		modalState: true
// 						// 	});
// 						// }}
// 					>Search</Button>
// 				</span>
// 				<div
// 					className="component-buttons"
// 					style={{ marginLeft: '10px', marginRight: '5px' }}
// 				>
// 					<span>
// 						<Button
// 							type="primary"
// 							size="middle"
// 							icon={<FontAwesomeIcon
// 								icon={faDownload}
// 								fixedWidth
// 							      />}
// 							// onClick={ this.props.navigateToAddPage }
// 						> {'\u00A0'} Download All</Button>
// 					</span>
// 				</div>
// 			</div>
// 		);
// 	}

// 	render() {
// 		const { loading } = this.props.controllerReportListPageProps;
// 		return (
// 			<div className="main-content">
// 				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
// 					<h3>Controller Reports</h3>
// 				</div>
// 				<Divider/>
// 				{this.renderSearchBar()}
// 				<div
// 					style={{ textAlign: 'center' }}
// 				>
// 					{loading ? <Loading /> : this.renderTable()}
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default ControllerReportListPage;
