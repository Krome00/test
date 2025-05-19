/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Avatar, Row, Col, Button, Layout, Spin } from 'antd';
import { UserOutlined,PhoneFilled ,LeftSquareOutlined, DropboxOutlined, UnlockOutlined } from '@ant-design/icons';
import './index.less';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';
// import { Row, Col, Card, Avatar, Form, Input } from 'antd';
import config from '../../config';

const { Header, Footer, Sider, Content } = Layout;

const Video = styled.video`
	height: 500px;
	width: 500px;
`;

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

function CallRoomPage(props) {
	const [yourID, setYourID] = useState('');
	const [partnerID, setPartnerID] = useState('');
	const [host, setHost] = useState(false);
	const [call, setCall] = useState(false);
	const [url, setURL] = useState('');
	const [stream, setStream] = useState();
	const [caller, setCaller] = useState('');
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);

	const userVideo = useRef();
	const partnerVideo = useRef();
	const socket = useRef();
	const params = useQuery();
	const history = useHistory();
	const peerRef = useRef();
	const callButton = useRef();

	useEffect(() => {
		setPartnerID(params.get('id'));
		if(params.get('host') === 'true') {
			setHost(true);
			setURL(params.get('url'));
		};

		socket.current = io.connect(config.socket.host, {
			path: config.socket.path
		});

		socket.current.emit('join-controller-channel', params.get('id'));

		navigator.mediaDevices.getUserMedia({ video: params.get('host') === 'true' ? true : false, audio: true }).then(stream => {
			setStream(stream);
			if (userVideo.current) {
				userVideo.current.srcObject = stream;
			}
		});

		socket.current.on('yourID', (id) => {
			setYourID(id);
		});

		if(!params.get('host')){
			socket.current.on('hey', (data) => {
				console.log('data', data);
				setCaller(data.from);
				setCallerSignal(data.signal);
			});
		}

		// setTimeout(() => {
		// 	console.log('@@@@!@!@!@@@');
		// 	callButton.current.click();
		// }, 5000);

		return () => {
			// Anything in here is fired on component unmount.
	  	};
		
	}, []);

	function callPeer(id) {
		setCall(true);
		const peer = new Peer({
			initiator: params.get('host') === 'true' ? true : false,
			trickle: false,
			stream: stream
		});

		peer.on('signal', data => {
			console.log('yourID', yourID);
			console.log('data', data);
			socket.current.emit('callUser', { userToCall: id, signalData: data, from: yourID, controller_id: params.get('id') });
		});

		peer.on('stream', stream => {
			if (partnerVideo.current) {
				partnerVideo.current.srcObject = stream;
			}
		});

		socket.current.on('callAccepted', signal => {
			setCallAccepted(true);
			peer.signal(signal);
		});

	}

	function openDoor(id) {
		socket.current.emit('openDoorRequest', { controller_id: id });
	}

	function acceptCall() {
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		});

		peer.on('signal', data => {
			socket.current.emit('acceptCall', { signal: data, to: caller });
		});

		peer.on('stream', stream => {
			partnerVideo.current.srcObject = stream;
		});
		peer.signal(callerSignal);

		peerRef.current = peer;
	}

	function leaveCall() {
		setCallEnded(true);
		if(peerRef.current){
			peerRef.current.destroy();
		}
		if(params.get('host') === 'true'){
			window.location.href = url;
			
		}else{
			window.close();
		}
	}

	let PartnerVideo;
	if (callAccepted) {
		PartnerVideo = (
			<Video
				playsInline
				ref={partnerVideo}
				autoPlay
			/>
		);
	}
	return (
		<Layout
			style={{
				backgroundColor: '#17171c',
				minHeight: '100vh'
			}}
		>
			<Header>
				<h1 style={{ color: '#fff', fontSize: '3.2em' }}>{host ? 'Controller' : 'Admin Host'}</h1>
			</Header>
			<Content>
				<div
					style={{
						paddingTop: '5em',
						minHeight: '100vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center'
					}}
				>
					{
						host ? 
							PartnerVideo ? 
								(
									<div>
										<Avatar
											shape="square"
											size={{ xs: 350, sm: 370, md: 400, lg: 420, xl: 450, xxl: 500 }}
											icon={<UserOutlined />}
										/>
										{PartnerVideo}
									</div>
	
								)
								:
								(
									<>
										<Avatar
											shape="square"
											size={{ xs: 350, sm: 370, md: 400, lg: 420, xl: 450, xxl: 500 }}
											icon={<UserOutlined />}
										/>
									</>
								)
						
							:
							PartnerVideo ? 
								PartnerVideo
								:
								(
									<>
										<Avatar
											shape="square"
											size={{ xs: 350, sm: 370, md: 400, lg: 420, xl: 450, xxl: 500 }}
											icon={<UserOutlined />}
										/>
									</>
								)
					}
			

					<div >
						{
							callerSignal && stream && caller && !host && !callAccepted ? 
								acceptCall()
								:
								(
									<div>
										{
											!host && !callAccepted && (
											<>

												<div
													style={{
														paddingTop: '1em',
														fontSize: '2em',
														color: 'white',
														display: 'flex',
														flexDirection: 'column',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												>
													Connecting to Controller....
												</div>

											</>
											)
										}
										{
											!host && callAccepted && !callEnded && (
											<>

												<div
													style={{
														paddingTop: '1em',
														fontSize: '2em',
														color: 'white',
														display: 'flex',
														flexDirection: 'column',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												>
													On Call....
												</div>

											</>
											)
										}
										{

											!host && (
												<div
													style={{
														paddingTop: '1em',
														display: 'flex',
														flexDirection: 'row',
														justifyContent: 'space-around'
													}}
												>
													
													<div
														style={{
															padding: '1em',
															display: 'flex',
															flexDirection: 'column',
															justifyContent: 'center',
															alignItems: 'center'
																
														}}
														onClick={() => {
															if(!host && callAccepted && partnerID) {
																openDoor(partnerID);
															}
														}}
													>
														<div>
															<UnlockOutlined
																style={{ fontSize: '7em', color: !host && callAccepted && partnerID ? '#3fcf25' : '#736e6a' }}
															/>
														</div>
														<div
															style={{ fontSize: '2em', color: '#fff' }}
														>
													Open
														</div>
													</div>

													
													

													<div
														style={{
															padding: '1em',
															display: 'flex',
															flexDirection: 'column',
															justifyContent: 'center',
															alignItems: 'center'
															
														}}
														onClick={() => {
															leaveCall();
														}}
													>
														<div>
															<LeftSquareOutlined
																style={{ fontSize: '7em', color: '#a63c30' }}
															/>
														</div>
														<div
															style={{ fontSize: '2em', color: '#fff' }}
														>
											Leave
														</div>
													</div>
												</div>
											)
										}

										{
											host && call && !callAccepted && <>
												<div
													style={{
														paddingTop: '1em',
														fontSize: '2em',
														color: 'white',
														display: 'flex',
														flexDirection: 'column',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												>
													Waiting for an Admin to Answer....
												</div>
											</>
										}

										{
											host && call && callAccepted && <>
												<div
													style={{
														paddingTop: '1em',
														fontSize: '2em',
														color: 'white',
														display: 'flex',
														flexDirection: 'column',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												>
													On Call...
												</div>
											</>
										}

										{
											host && !call && !callAccepted && <>
												<div
													style={{
														paddingTop: '1em',
														fontSize: '2em',
														color: 'white',
														display: 'flex',
														flexDirection: 'column',
														justifyContent: 'center',
														alignItems: 'center'
													}}
												>
													Please Click Call...
												</div>
											</>
										}

										{
											host && <>

												<div
													style={{
														background: 'transparent',
														border: 'none !important',
														fontSize: '0'
															
													}}
													ref={callButton}
													onClick={() => {
														if(yourID && host && !callAccepted) {
															callPeer(yourID);
														}
													}}
												>
													<div>
														<PhoneFilled
															style={{ fontSize: '7em', color: yourID && host && !callAccepted ? '#589e41' : '#4d524b' }}
														/>
													</div>
													<div
														style={{ fontSize: '2em', color: '#fff' }}
													>
											Call
													</div>
												</div>
										
												<div
													style={{
														paddingTop: '1em',
														display: 'flex',
														flexDirection: 'row',
														justifyContent: 'space-around'
														
													}}
												>
													

													<div
														style={{
															padding: '1em',
															display: 'flex',
															flexDirection: 'column',
															justifyContent: 'center',
															alignItems: 'center'
															
														}}
														onClick={() => {
															leaveCall();
														}}
													>
														<div>
															<LeftSquareOutlined
																style={{ fontSize: '7em', color: '#a63c30' }}
															/>
														</div>
														<div
															style={{ fontSize: '2em', color: '#fff' }}
														>
											Leave
														</div>
													</div>
												</div>
											</>
										}
									</div>
								)
						}
					</div>
				</div>
					
			</Content>
			<Footer></Footer>
		</Layout>
	);
}

export default CallRoomPage;