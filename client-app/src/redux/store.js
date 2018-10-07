import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/root.reducer';

//Initialize our middleware and enhancers
const enhancerList = [];
const middlewareList = [thunk, logger];

const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(applyMiddleware(...middlewareList), ...enhancerList);

//Initialize store and export
const store = createStore(rootReducer, {}, composedEnhancer);

export default store