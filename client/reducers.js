/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import auth from './modules/Auth/AuthReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import { routerReducer as routing } from 'react-router-redux';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  auth,
  posts,
  intl,
  routing,
});
