import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import auth from './auth/reducers'
import user from './user/reducers'

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  auth,
  user
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));