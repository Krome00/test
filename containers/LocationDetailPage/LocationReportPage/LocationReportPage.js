/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { Component } from 'react';
// import { Divider, Table } from 'antd';
// import { DownloadOutlined } from '@ant-design/icons';

import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { Tag, Row, Col, notification, Table, Typography, Divider, Select, Form, Button, Modal, Space } from 'antd';
import { SearchOutlined,DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';
import Papa from 'papaparse';
import XLSX from 'xlsx';
import LabelHelper from '../../../helpers/Label';


const { Title } = Typography;
const { Option } = Select;
const { Item } = Form;

class LocationReportPage extends Component {
  	formRef = React.createRef();
	state = {
		report_type: ''
	}
	componentWillUnmount() {
		this.props.reset();
	}

	getReportTypeName = (value) => {
		switch (value) {
			case 'location_reports':
				return 'Location Reports';
			default:
		}
		return 'Unknown';
	}
	componentDidUpdate(prevProps, prevState) {
		const {
			meta: prevMeta,
			hasDownloadSuccess: prev_hasDownloadSuccess
		} = prevProps.locationReportPageProps;
		const {
			meta,
			hasDownloadSuccess
		} = this.props.locationReportPageProps;

		if (meta && meta !== prevMeta) {
			const type = meta.code === 200 ? 'success' : 'error';
			notification[type]({
				message: meta.message,
				placement: 'bottomRight'
			});
			this.props.resetMeta();
		}

		// Download
		if (hasDownloadSuccess && hasDownloadSuccess !== prev_hasDownloadSuccess) {
			const { csv_string: downloadCsv } = this.props.locationReportPageProps;
			const { report_type } = this.state;
			if (downloadCsv) {
				const reportTypeName = this.getReportTypeName(report_type);
				this.downloadXlsx({
					csv: downloadCsv,
					fileName: `${reportTypeName} - ${moment().format('YYYY-MM-DD HH-mm-ss')}.xlsx`
				});

				// this.downloadCsv({
				// 	csv: downloadCsv,
				// 	fileName: `Reports - Booking ${reportTypeName} - ${moment().format('YYYY-MM-DD HH-mm-ss')}.csv`
				// });
			}
			this.setState({ report_type: '' });
		}
	}
	downloadXlsx = ({ csv, fileName }) => {
		const bookingSummaryCsvRows = (Papa.parse(csv)).data;

		const wb = XLSX.utils.book_new();

		// booking summary ws
		const bookingWs = XLSX.utils.aoa_to_sheet(bookingSummaryCsvRows);
		XLSX.utils.book_append_sheet(wb, bookingWs, 'Coupons');

		if (navigator && navigator.msSaveOrOpenBlob) {
			const data = XLSX.write(wb, {
				type: 'array',
				bookType: 'xlsx'
			});
			const blob = new Blob([data]);
			navigator.msSaveOrOpenBlob(blob, fileName);
			return;
		}

		// write to b64
		const fileBase64 = XLSX.write(wb, {
			type: 'base64',
			bookType: 'xlsx'
		});

		const encodedUri = encodeURI(`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileBase64}`);
		let a = document.createElement('a');
		document.body.appendChild(a);
		a.href = encodedUri;
		a.download = fileName;
		a.click();
	}
	downloadCsv = ({ csv, fileName }) => {
		if (navigator && navigator.msSaveBlob) {
			const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
			navigator.msSaveBlob(blob, fileName);
			return;
		}
		const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
		let a = document.createElement('a');
		document.body.appendChild(a);
		a.href = encodedUri;
		a.download = fileName;
		a.click();
	}
	confirmDownload = type => {
		if (window.confirm('Are you sure you want to download?')) {
			this.props.downloadReports(type);
			this.setState({ report_type: type });
		}
	}
	renderTable () {
		const { Column, ColumnGroup } = Table;
		const data = [
			{
				key: '1',
				reportName: 'Locations Report',
				report: 'location_reports'
			}
		];
		return(
			<Table dataSource={data}>
				<Column
					title="Report Name"
					dataIndex="reportName"
					key="reportName"
				/>
				<Column
					title="Action"
					key="action"
					render={(_, record) => (
						<Space size="middle">
							<a onClick={() => this.confirmDownload(record.report)}><DownloadOutlined /></a>
						</Space>
					)}
				/>
			</Table>
		);
	}
	render() {
		return (
			<div className = "main-content">
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 20px 0px 20px' }}>
					<h3>Reports</h3> 
				</div>
				<Divider />
				{this.renderTable()}
			</div>
		);
	}
  	// render(){
  	// 	const columns = [
  	// 		{
  	// 			title: 'Name',
  	// 			dataIndex: 'name'
  	// 		},
  	// 		{
  	// 			title: 'Action',
  	// 			dataIndex: 'action'
  	// 		}
  	// 	];

	// 	const data = [];
	// 	// eslint-disable-next-line array-callback-return
	// 	for(let i = 0; i < 3; i++){
	// 		data.push({
	// 			key: i,
	// 			name: `Location ${i}`,
	// 			action: 
	// 			(
	// 				<DownloadOutlined />
	// 			)
	// 		});
	// 	}

	// 	return (
	// 		<div className="main-content">
	// 			<Divider/>
	// 			<Table
	// 				columns={columns}
	// 				dataSource={data}
	// 				pagination={false}
	// 			/>
	// 		</div>
	// 	);
	// }

}

export default LocationReportPage;