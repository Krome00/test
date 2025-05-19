import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import rootReducer from './reducers';

const basename = process.env.NODE_ENV === 'development' ? '/' : '/wsdp/admin';

export const history = createBrowserHistory({ basename });

// Initialize store
let store;

// Return a function so we can configure it
export default () => {
	if (store) {
		return store;
	}

	const initialState = {};
	const enhancers = [];
	const middleware = [thunk, routerMiddleware(history)];

	if (['development', 'testing', 'testing2'].indexOf(process.env.NODE_ENV) !== -1) {
		const devToolsExtension = window.devToolsExtension;

		if (typeof devToolsExtension === 'function') {
			enhancers.push(devToolsExtension());
		}
	}

	// enhancers
	const composedEnhancers = compose(
		applyMiddleware(...middleware),
		...enhancers
	);

	// create store
	store = createStore(rootReducer(history), initialState, composedEnhancers);

	return store;
};
