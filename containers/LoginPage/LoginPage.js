import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Alert, Form, Input, Button, Checkbox, Row, Col, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import Loading from '../../components/loading';
import GeneralHelper from '../../helpers/general';

class LoginPage extends Component {
	componentWillUnmount() {
		this.props.reset();
	}
	componentDidMount() {
		const query = GeneralHelper.queryStringToObject(this.props.location.search);
		this.props.resetLocalStorage();
		this.props.showLoginForm({
			path: _.get(query, 'path')
		});
	}
	componentDidUpdate(prevProps, prevState) {
		const { meta: prevMeta } = prevProps.loginPageProps;
		const { meta } = this.props.loginPageProps;

		if(meta && meta !== prevMeta) {
			this.props.resetMeta();
		}
	}
	onFieldChange = name => (e) => {
		this.props.onFieldChange(name, e.target.value);
	}
	onKeyPress = e => {
		if (e.key === 'Enter') {
			this.onSubmit();
		}
	}
	onSubmit = e => {
		const { username, password } = this.props.loginPageProps;
		const query = GeneralHelper.queryStringToObject(this.props.location.search);
		this.props.login({ username, password, query });
	}
	render() {
		const { loginPageProps } = this.props;
		const { username, password, loading, error } = loginPageProps;

		if (!loginPageProps.showLoginForm) {
			return (
				<Loading />
			);
		}

		return (
			<Row
				style={{
					height: '100vh'
				}}
			>
				<Col
					xs={22}
					sm={18}
					md={14}
					lg={10}
					xl={6}
					style={{ margin: 'auto' }}
				>
					<Card style={{ borderRadius: 3 }}>

						<h2 style={{ textAlign: 'center', padding: '10px 0 25px 0', color: '#034661' }} >Access Control System</h2>
						<h3 style={{ padding: '0 0 10px 0', color: '#034661' }}>Login</h3>

						<Form
							name="normal_login"
							onFinish={this.onSubmit}
							initialValues={{ remember: true }}
						>
							{
								error &&
								<Form.Item>
									<Alert
										message={error}
										type="error"
										showIcon
									/>
								</Form.Item>
							}
							<Form.Item
								name="username"
								value={username}
								onChange={this.onFieldChange('username')}
								rules={[{ required: true, message: 'Please enter a email.' }]}
							>
								<Input
									prefix={<MailOutlined className="site-form-item-icon" />}
									placeholder="Email"
								/>
							</Form.Item>
							<Form.Item
								name="password"
								value={password}
								onChange={this.onFieldChange('password')}
								rules={[{ required: true, message: 'Please enter a password.' }]}
							>
								<Input
									prefix={<LockOutlined className="site-form-item-icon" />}
									type="password"
									placeholder="Password"
								/>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									disabled={loading}
									block
									style={{ marginBottom: '5px' }}
									size="large"
								>
									Login
								</Button>

								<Button
									disabled={loading}
									block
									size="large"
									onClick={this.props.showLoginForm}
								>
									Login with cas
								</Button>
							</Form.Item>

							<Form.Item
								style={{ textAlign: 'center' }}
							>
								<a href="#">Forgot Password?</a>
							</Form.Item>

						</Form>

					</Card>
				</Col>
			</Row>
		);
	}
}

LoginPage.propTypes = {
	loginPageProps: PropTypes.object.isRequired,
	onFieldChange: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired
};

export default LoginPage;
