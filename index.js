import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import WebFont from 'webfontloader';
import store, { history } from './store';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import './index.less';

WebFont.load({
	google: {
		families: ['Libre Franklin:300,400,500', 'Roboto', 'sans-serif']
	}
});

const alertOptions = {
	position: 'top center',
	timeout: 0,
	offset: '30px',
	transition: 'scale',
	zindex: 1001
};

ReactDOM.render(
	<Provider store={store()}>
		<AlertProvider 
			template={AlertTemplate}
			{...alertOptions}
		>
			<ConnectedRouter history={history}>
				<Routes />
			</ConnectedRouter>
		</AlertProvider>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
