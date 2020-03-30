import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({

});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));