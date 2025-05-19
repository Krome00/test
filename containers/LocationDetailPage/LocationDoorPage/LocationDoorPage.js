/* eslint-disable indent */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import UrlParse from 'url-parse';
import { notification, Badge, Divider, Table, Modal, Pagination } from 'antd';
import { PlusSquareFilled, ExclamationCircleOutlined } from '@ant-design/icons';

import LabelHelper from '../../../helpers/Label';

class LocationDoorPage extends Component {
	formDoorRef = React.createRef();

	state = {
		modalState: false,
		doorData: {},
		location_id: null
	};

	componentDidMount() {
		this.getDoorsByLocationId();
	}

	getDoorsByLocationId(page, limit) {
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		this.props.getControllerList();
		if (query.id) {
			query && this.props.getDoorsByLocationId({ location_id: query.id, page, limit });
			this.setState({ location_id: query.id });
		}
	}

	componentWillUnmount() {
		this.props.resetPage();
	}

	render() {
		const { doors, limit, page, total } = this.props.doorPageProps;
		const columns = [
			{
				title: 'Name',
				dataIndex: 'name'
			},
			{
				title: 'Status',
				dataIndex: 'status'
			}
		];

		const data = [];
		// eslint-disable-next-line array-callback-return
		doors && doors.length && doors.forEach(door => {
			data.push({
				key: door._id,
				name: door.name,
				status: <Badge
							status={door.status === 'enabled' ? 'success' : 'failure'}
							text={LabelHelper.status(door.status)}
				        />,
				action: (
					<a
						onClick={e => {
							e.preventDefault();
							this.setState({ modalState: true, doorData: door });
						}}
					>
						Edit
					</a>
				)
			});
		});

		return (
			<div className="main-content">
				<Divider />
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
				/>
				<Pagination
					style={{ marginTop: '30px' }}
					showSizeChanger
					defaultPageSize={limit}
					current={page}
					total={total}
					showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
					pageSizeOptions={['5', '10', '20', '50']}
					onChange={(page, pageSize) => this.getDoorsByLocationId(page, pageSize)}
				/>
			</div>
		);
	}
}

export default LocationDoorPage;
