/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './modules/App/components/DevTools';
import rootReducer from './reducers';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { logger } from './logger';

export function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(browserHistory)),
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
    // enhancers.push(applyMiddleware(logger));
  }

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
