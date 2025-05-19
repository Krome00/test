import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import UrlParse from 'url-parse';

import { Row, Space, Spin } from 'antd';

import config from '../../config';

export default class ExternalQrPage extends Component {

	componentDidMount(){
		this.getExternalUserByAuthId();
	}

	async getExternalUserByAuthId(){
		const { location } = this.props;
		const { query } = UrlParse(location.search, true);
		const { uuid } = query;
		//QrKey uuid 
		if (uuid) this.props.getUserByAuthId(uuid);
	}

	renderQRCode = () => {
		const { external_user } = this.props.externalUserPageProps;
		const { qr_code } = external_user || {};
		return (
			<div>
				<QRCode
					id="QrCanvas"
					includeMargin={true}
					size={260}
					value={qr_code}
				/>
				{/* <p style={{ textAlign: 'center', margin: 0 }}>Valid Until<br/><span className="expiry-date">31 May 2022</span></p> */}
			</div>
		);
	}

	renderSuccess = () => {
		const { external_user } = this.props.externalUserPageProps;
		const { name, description } = external_user || {};
		return (
			<div
				className="bgimage card-container"
				hoverable
				style={{
					borderRadius: 23 }}
			>
				<Row className="context">
					<div className="qr-code-details">
						<span className="details-title-qr">
								QR Code
						</span>
						<br></br>
						<div className="render-code">
							{this.renderQRCode()}
						</div>
						<div className="qr-sub-container">
							<span className="qr-sub-field">
								This QR code is valid for 15 minutes. Referesh to get a new code.
							</span>
						</div>
					</div>

					<div className="information-details">
						<div className="title-container">
							<span className="details-title-information">
								Information
							</span>
						</div>
						<div className="sub-details-information">
							<span className="sub-field">
								Name:   
							</span>
							<span className="sub-field-value">
								{name}
							</span>
							<br></br>
							<span className="sub-field">
								Description:  
							</span>
							<span className="sub-field-value">
								{description}
							</span>
						</div>
					</div>
				</Row>

			</div>
		);
	}

	renderError = () => {
		return (
			<div
				className="bgimage card-container"
				hoverable
				style={{
					borderRadius: 23 }}
			>
				<div
					style={{
						textAlign: 'center',
						color: 'red',
						padding: '5em',
						fontSize: '2em'
					}}
				>
					Error
				</div>
			</div>
		);
	}


	render() {
		const { loadingExternal, external_user } = this.props.externalUserPageProps;
		console.log('this.props.externalUserPageProps', this.props.externalUserPageProps);
		return (
			<div className="wrapper">

				{ loadingExternal ?
					<div>
						<Space size="middle">
							<Spin size="large" />
						</Space>
					</div>
					:
					<div>
						{external_user ?
							<div>
								{this.renderSuccess()}
							</div>
							:
							<div>
								{this.renderError()}
							</div>
						}
					</div>
				}

			</div>
		);
	}
}