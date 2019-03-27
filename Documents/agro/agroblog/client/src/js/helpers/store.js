import { createStore,combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import promise from 'redux-promise-middleware';
import {logger} from "redux-logger";


export const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(logger, promise(), thunkMiddleware)
);
